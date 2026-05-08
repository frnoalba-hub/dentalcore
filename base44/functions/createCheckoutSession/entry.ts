import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';
import Stripe from 'npm:stripe@14.19.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!);

/** Same IDs as `src/components/store/promoEngine.jsx` — discounts computed only here for Stripe. */
const B2G1_IDS = new Set([
  'TH-001',
  'A1004-V3',
  'A1009B',
  'A1012',
  'A1003',
  'A1061',
  'A1658',
  'IPR-001',
  'M1042X',
  'M1002',
]);
const AIRPEAK_BUNDLE_IDS = new Set(['A1004-V2', 'A1005']);
const SURETACT_KIT_ID = 'M1001';

type LineInput = { id: string; quantity: number };

type PricedLine = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type ProductRow = {
  id: string;
  name?: string;
  price?: string | number;
  image?: string;
  variants?: Array<{ id: string; name?: string; price?: string | number; image?: string }>;
};

function parsePrice(price: string | number | undefined): number {
  if (typeof price === 'number' && !Number.isNaN(price)) return price;
  return parseFloat(String(price ?? '').replace(/[^0-9.]/g, '')) || 0;
}

function clampQty(q: unknown): number {
  const n = Math.floor(Number(q));
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.min(n, 99);
}

function isAllowedOrigin(origin: string): boolean {
  try {
    const u = new URL(origin);
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return false;
    const host = u.hostname.toLowerCase();
    const envList = Deno.env.get('CHECKOUT_ALLOWED_ORIGINS')?.split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean) ?? [];
    const defaults = [
      'localhost',
      '127.0.0.1',
      'www.dentalcoreinstruments.com',
      'dentalcoreinstruments.com',
    ];
    const allowed = new Set([...defaults, ...envList]);
    return allowed.has(host);
  } catch {
    return false;
  }
}

function generateOrderId(): string {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `CTX-${num}`;
}

function buildProductIndex(products: ProductRow[]): Map<string, { name: string; price: number; image: string }> {
  const byId = new Map<string, { name: string; price: number; image: string }>();
  for (const p of products) {
    if (!p?.id) continue;
    const baseImage = String(p.image ?? '');
    const baseName = String(p.name ?? 'Product');
    byId.set(p.id, {
      name: baseName,
      price: parsePrice(p.price),
      image: baseImage,
    });
    for (const v of p.variants ?? []) {
      if (!v?.id) continue;
      const vName = `${baseName} — ${String(v.name ?? 'Option')}`;
      byId.set(v.id, {
        name: vName,
        price: parsePrice(v.price),
        image: String(v.image || baseImage),
      });
    }
  }
  return byId;
}

/** Local-only variant SKUs (see `productsData.jsx`) used when Base44 catalog has not synced rows yet. */
function mergeStaticCatalogFallbacks(index: Map<string, { name: string; price: number; image: string }>) {
  const staticRows: Record<string, { name: string; price: number; image: string }> = {
    '1002-1': {
      name: 'UC-ONE (Ultrasonic Irrigation)',
      price: 599,
      image: '/products/UC_ONE_Ultasonic_Irrigation_1002-1.png',
    },
    '1002-Full-Kit': {
      name: 'UC-ONE Full Kit (Ultrasonic Irrigation)',
      price: 699,
      image: '/products/UC_ONE_CONTENTS.png',
    },
  };
  for (const [id, row] of Object.entries(staticRows)) {
    if (!index.has(id)) index.set(id, row);
  }
}

function normalizeLineInputs(body: Record<string, unknown>): LineInput[] {
  const raw = body.lineItems ?? body.items;
  if (!Array.isArray(raw) || raw.length === 0) return [];
  const merged = new Map<string, number>();
  for (const row of raw) {
    if (!row || typeof row !== 'object') continue;
    const r = row as Record<string, unknown>;
    const id = String(r.id ?? '').trim();
    if (!id) continue;
    const q = clampQty(r.quantity);
    merged.set(id, (merged.get(id) ?? 0) + q);
  }
  return [...merged.entries()].map(([id, qty]) => ({ id, quantity: clampQty(qty) }));
}

function calculatePromos(items: PricedLine[]): { promos: Array<{ label: string; discount: number; tag?: string; info?: string }>; totalDiscount: number } {
  const promos: Array<{ label: string; discount: number; tag?: string; info?: string }> = [];

  const b2g1Items = items.filter((i) => B2G1_IDS.has(i.id));
  for (const item of b2g1Items) {
    const freeCount = Math.floor(item.quantity / 3);
    if (freeCount > 0) {
      const unitPrice = item.price;
      promos.push({
        label: `Buy 2 Get 1 Free — ${item.name}`,
        discount: freeCount * unitPrice,
        tag: 'B2G1',
      });
    }
  }

  const airpeakItems = items.filter((i) => AIRPEAK_BUNDLE_IDS.has(i.id));
  const totalAirpeakQty = airpeakItems.reduce((s, i) => s + i.quantity, 0);
  const bundles = Math.floor(totalAirpeakQty / 3);
  if (bundles > 0) {
    const originalPerUnit = 599;
    const savings = bundles * (3 * originalPerUnit - 1000);
    if (savings > 0) {
      promos.push({
        label: `AirPeak™ 3 + Coupler Bundle ×${bundles}`,
        discount: 0,
        tag: 'BUNDLE',
        info: `Saves $${savings.toFixed(0)} vs retail`,
      });
    }
  }

  const kitItem = items.find((i) => i.id === SURETACT_KIT_ID);
  if (kitItem && kitItem.quantity >= 2) {
    const pairs = Math.floor(kitItem.quantity / 2);
    const unitPrice = kitItem.price;
    const normalPairCost = pairs * 2 * unitPrice;
    const promoPairCost = pairs * 400;
    const discount = normalPairCost - promoPairCost;
    if (discount > 0) {
      promos.push({
        label: 'SureTact G3 Kit — 2 for $400',
        discount,
        tag: 'BUNDLE',
      });
    }
  }

  const totalDiscount = promos.reduce((s, p) => s + (p.discount || 0), 0);
  return { promos, totalDiscount };
}

Deno.serve(async (req) => {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const origin = String(body.origin ?? '').trim();
    const orderNotes = String(body.orderNotes ?? '').trim().slice(0, 500) || null;
    if (!origin || !isAllowedOrigin(origin)) {
      return Response.json({ error: 'Invalid or disallowed checkout origin' }, { status: 400 });
    }

    const lineInputs = normalizeLineInputs(body);
    if (lineInputs.length === 0) {
      return Response.json({ error: 'No valid line items (id + quantity required)' }, { status: 400 });
    }

    const base44 = createClientFromRequest(req);
    const productRows = (await base44.asServiceRole.entities.Product.list()) as ProductRow[];
    const index = buildProductIndex(productRows);
    mergeStaticCatalogFallbacks(index);

    const pricedLines: PricedLine[] = [];
    for (const line of lineInputs) {
      const row = index.get(line.id);
      if (!row) {
        return Response.json(
          { error: `Product unavailable for checkout: ${line.id}. Refresh the catalog or contact sales.` },
          { status: 400 },
        );
      }
      pricedLines.push({
        id: line.id,
        name: row.name,
        price: row.price,
        image: row.image,
        quantity: line.quantity,
      });
    }

    const { promos, totalDiscount } = calculatePromos(pricedLines);

    const line_items = pricedLines.map((item) => {
      const unitAmount = Math.round(item.price * 100);
      const validImage: string[] = [];
      if (item.image) {
        if (item.image.startsWith('https://')) {
          validImage = [item.image];
        } else if (item.image.startsWith('/') && origin) {
          validImage = [`${origin.replace(/\/$/, '')}${item.image}`];
        }
      }
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

    const discounts: { coupon: string }[] = [];
    if (totalDiscount > 0) {
      const promoLabels = promos.filter((p) => p.discount > 0).map((p) => p.label).join(', ');
      const coupon = await stripe.coupons.create({
        amount_off: Math.round(totalDiscount * 100),
        currency: 'usd',
        name: promoLabels || 'Promotional Discount',
        duration: 'once',
      });
      discounts.push({ coupon: coupon.id });
    }

    const publicOrderId = generateOrderId();

    const sessionParams: Stripe.Checkout.SessionCreateParams & { discounts?: { coupon: string }[] } = {
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      shipping_address_collection: { allowed_countries: ['US'] },
      shipping_options: [{
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 0, currency: 'usd' },
          display_name: 'Free Standard Shipping',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 3 },
            maximum: { unit: 'business_day', value: 10 },
          },
        },
      }],
      success_url: `${origin.replace(/\/$/, '')}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin.replace(/\/$/, '')}/?checkout=cancel`,
      metadata: {
        base44_app_id: Deno.env.get('BASE44_APP_ID') ?? '',
        order_id: publicOrderId,
        promos: JSON.stringify(promos),
        ...(orderNotes ? { order_notes: orderNotes } : {}),
      },
    };
    if (discounts.length > 0) sessionParams.discounts = discounts;

    const session = await stripe.checkout.sessions.create(sessionParams);
    return Response.json({ url: session.url });
  } catch (error: unknown) {
    console.error('Checkout error:', error);
    const message = error instanceof Error ? error.message : String(error);
    return Response.json({ error: message }, { status: 500 });
  }
});
