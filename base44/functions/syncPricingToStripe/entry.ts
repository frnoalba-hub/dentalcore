import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';
import Stripe from 'npm:stripe';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

// CSV data
const csvData = `SKU,Product Name,MSRP,Selling Price
1006-1,"UC-CUT (Sonic GP Cutter)",,$599.00
1002-1,"UC-ONE (Ultrasonic Irrigation)",,$599.00
1005-1,"GP Cut & Fit (Standard)",,$80.00
1004-1,"EP Plugger Set",,$120.00
1003-1,"EP Suction System",,$60.00
MTA-1,"Endoseal MTA Sealer",,$90.00
MTA-3,"Endocem MTA Root Repair",,$90.00
TH-001,"Stronic Touch & Heat",,$449.00
A1004-V2,"AirPeak™ X600-S (KaVo Style)",,$333.33
A1005,"AirPeak™ X600-M (NSK Style)",,$333.33
A1018,"AirPeak™ X600-45 (Surgical)",,$569.00
A1004-V3,"AirPeak™ X600-Micro (KaVo)",,$499.00
A1009B,"AirPeak™ G100-LA (Low Speed)",,$106.00
A1012,"AirPeak™ G100-ST (Straight)",,$106.00
A1019,"iTesla Electric Motor System",,$1299.00
A1003,"iTesla™ G600-S (1:5 Red Band)",,$599.33
A1028,"iTesla™ G600-D (1:1 Blue Band)",,$399.00
A1020,"iTesla™ G500-R20 (20:1 Implant)",,$499.00
A1619,"STRONIC X150 Piezo Scaler",,$849.00
A1061,"STRONIC X300 Air Scaler",,$749.00
A1658,"AirPeak™ PRO200 Air Polisher",,$699.00
A1030,"McCare™ X Maintenance",,$1399.00
IPR-001,"AirPeak Automatic IPR",,$199.33
OS-SEAL-SYR,"OsseoSeal Prefilled Syringe",,$48.00
OS_0.5cc,"0.5cc",,$68.00
OS_1.0cc,"1.0cc (2×0.5cc)",,$100.00
OS-SEAL-PDR,"OsseoSeal Allograft Powder",,$115.00
OS_5.0cc,"5cc (2×2.5cc)",,$200.00
OS-SEAL-MEM,"OsseoSeal Collagen Membrane",,$75.00
OS2030,"20×30 mm",,$110.00
OS3040,"30×40 mm",,$150.00
OSTEO-PLUG,"OsteoGen Plug 10×20mm (Large)",,$579.00
HELI-1,"Curagen™ Collagen Wound Dressing Plug",,$110.00
M1042X,"ModuLite X Curing Light",,$466.00
1007-1,"EP CURE",,$649.00
1008-1,"EP Light Transilluminator",,$160.00
M1001,"SureTact G3 Matrix Kit",,$200.00
M1002,"SureTact G3 Rings (2pk)",,$86.65`;

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // Parse CSV
    const lines = csvData.split('\n').slice(1); // Skip header
    const priceData = lines
      .map(line => {
        const match = line.match(/^([^,]+),"([^"]+)",.*,(.*)$/);
        if (!match) return null;
        const [, sku, name, price] = match;
        const cleanPrice = price.replace('$', '').trim();
        return { sku: sku.trim(), name: name.trim(), price: cleanPrice };
      })
      .filter(Boolean);

    console.log(`Processing ${priceData.length} products`);

    // Get all products
    const existingProducts = await base44.asServiceRole.entities.Product.list();
    
    // Track updates and creates
    const updates = [];
    const stripeCreates = [];

    for (const item of priceData) {
      // Match by SKU or name
      const match = existingProducts.find(p => 
        p.id === item.sku || p.name?.toLowerCase() === item.name.toLowerCase()
      );

      if (match && match.price !== item.price) {
        // Update existing product
        await base44.asServiceRole.entities.Product.update(match.id, { price: item.price });
        updates.push({ id: match.id, name: item.name, price: item.price });
      } else if (!match) {
        // New product - prepare for Stripe
        stripeCreates.push(item);
      }
    }

    // Create Stripe products AND add new items to database
    const stripeProducts = [];
    for (const item of stripeCreates) {
      const product = await stripe.products.create({
        name: item.name,
        metadata: { sku: item.sku }
      });
      
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: Math.round(parseFloat(item.price) * 100),
        currency: 'usd'
      });
      
      // Also add to Product database
      await base44.asServiceRole.entities.Product.create({
        name: item.name,
        price: item.price,
        category: 'Dental Equipment',
        description: `${item.name} - SKU: ${item.sku}`,
        image: 'https://via.placeholder.com/300?text=Product'
      });
      
      stripeProducts.push({ sku: item.sku, name: item.name, stripeProductId: product.id, stripePriceId: price.id });
    }

    console.log(`Updated ${updates.length} products, created ${stripeProducts.length} Stripe products`);

    return Response.json({ 
      success: true, 
      updated: updates.length,
      stripeCreated: stripeProducts.length,
      details: { updates, stripeProducts }
    });
  } catch (error) {
    console.error('Sync error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});