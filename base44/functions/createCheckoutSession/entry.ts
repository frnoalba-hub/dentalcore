import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';
import Stripe from 'npm:stripe@14.19.0';

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"));

Deno.serve(async (req) => {
  try {
    const { items, origin, promos } = await req.json();

    if (!items || items.length === 0) {
      return Response.json({ error: 'No items provided' }, { status: 400 });
    }

    const line_items = items.map(item => {
    const rawPrice = typeof item.price === 'number' ? item.price : parseFloat(String(item.price).replace(/[^0-9.]/g, ''));
    const unitAmount = Math.round(rawPrice * 100);
    // Stripe requires absolute HTTPS URLs for images — filter out relative/local paths
    const validImage = item.image && item.image.startsWith('https://') ? [item.image] : [];
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: validImage,
        },
        unit_amount: unitAmount,
      },
      quantity: item.quantity,
    };
    });

    // Add promo discount line items (negative amounts not supported, use coupons)
    const discounts = [];
    const totalDiscount = (promos || []).reduce((s, p) => s + (p.discount || 0), 0);
    if (totalDiscount > 0) {
      const promoLabels = promos.filter(p => p.discount > 0).map(p => p.label).join(', ');
      const coupon = await stripe.coupons.create({
        amount_off: Math.round(totalDiscount * 100),
        currency: 'usd',
        name: promoLabels || 'Promotional Discount',
        duration: 'once',
      });
      discounts.push({ coupon: coupon.id });
    }

    const sessionParams = {
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${origin}?checkout=success`,
      cancel_url: `${origin}?checkout=cancel`,
      metadata: {
        base44_app_id: Deno.env.get("BASE44_APP_ID"),
        promos: JSON.stringify(promos || []),
      }
    };
    if (discounts.length > 0) sessionParams.discounts = discounts;

    const session = await stripe.checkout.sessions.create(sessionParams);

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});