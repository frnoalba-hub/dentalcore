import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

type CartItemInput = {
  id?: unknown;
  name?: unknown;
  quantity?: unknown;
  unitPrice?: unknown;
};

function cleanText(value: unknown, maxLen = 500): string {
  return String(value ?? '').trim().slice(0, maxLen);
}

function cleanOptionalDate(value: unknown): string | null {
  const v = cleanText(value, 20);
  if (!v) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return null;
  return v;
}

function toNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  const n = Number(String(value ?? '').replace(/[^0-9.-]/g, ''));
  return Number.isFinite(n) ? n : null;
}

function toPositiveInt(value: unknown): number | null {
  const n = Math.floor(Number(value));
  if (!Number.isFinite(n) || n < 1) return null;
  return Math.min(n, 9999);
}

function buildRequestId() {
  const now = new Date();
  const stamp = now.toISOString().replace(/[-:TZ.]/g, '').slice(0, 14);
  const suffix = crypto.randomUUID().slice(0, 8).toUpperCase();
  return `QR-${stamp}-${suffix}`;
}

function sanitizeCartItems(rawItems: unknown) {
  if (!Array.isArray(rawItems)) return [];
  const cleaned = rawItems
    .map((raw): { id: string; name: string; quantity: number; unitPrice?: number } | null => {
      const item = raw as CartItemInput;
      const id = cleanText(item.id, 80);
      const name = cleanText(item.name, 200);
      const quantity = toPositiveInt(item.quantity);
      if (!name || !quantity) return null;
      const unitPrice = toNumber(item.unitPrice);
      const cleanedItem: { id: string; name: string; quantity: number; unitPrice?: number } = {
        id,
        name,
        quantity,
      };
      if (unitPrice != null) cleanedItem.unitPrice = unitPrice;
      return cleanedItem;
    })
    .filter((item): item is { id: string; name: string; quantity: number; unitPrice?: number } => Boolean(item));
  return cleaned.slice(0, 100);
}

Deno.serve(async (req) => {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const contactName = cleanText(body.contactName, 120);
    const officeName = cleanText(body.officeName, 180);
    const email = cleanText(body.email, 180).toLowerCase();
    const phone = cleanText(body.phone, 60);
    const needBy = cleanOptionalDate(body.needBy);
    const requestDetails = cleanText(body.requestDetails, 5000);
    const notes = cleanText(body.notes, 4000);
    const source = cleanText(body.source, 80) || 'request_quote_page';
    const sourcePageUrl = cleanText(body.sourcePageUrl, 1000);
    const estimatedTotal = toNumber(body.estimatedTotal);
    const quantity = toPositiveInt(body.quantity);
    const cartItems = sanitizeCartItems(body.cartItems);

    const productRaw = (body.product ?? null) as Record<string, unknown> | null;
    const productId = cleanText(productRaw?.id, 120);
    const productName = cleanText(productRaw?.name, 250);
    const productSku = cleanText(productRaw?.sku, 120);
    const variantId = cleanText(productRaw?.variantId, 120);
    const variantName = cleanText(productRaw?.variantName, 250);

    if (!contactName) {
      return Response.json({ error: 'Contact name is required.' }, { status: 400 });
    }
    if (!email && !phone) {
      return Response.json({ error: 'Email or phone is required.' }, { status: 400 });
    }
    if (!requestDetails) {
      return Response.json({ error: 'Request details are required.' }, { status: 400 });
    }

    const requestId = buildRequestId();
    const base44 = createClientFromRequest(req);

    const quoteRecord = await base44.asServiceRole.entities.QuoteRequest.create({
      request_id: requestId,
      status: 'new',
      source: source || null,
      source_page_url: sourcePageUrl || null,
      contact_name: contactName,
      office_name: officeName || null,
      email: email || null,
      phone: phone || null,
      need_by: needBy,
      request_details: requestDetails,
      notes: notes || null,
      product_id: productId || null,
      product_name: productName || null,
      product_sku: productSku || null,
      variant_id: variantId || null,
      variant_name: variantName || null,
      quantity: quantity || null,
      cart_items: cartItems,
      estimated_total: estimatedTotal,
    });

    const salesEmail = Deno.env.get('SALES_CONTACT_EMAIL') || 'sales@dentalcoreinstruments.com';
    const lines = [
      `New quote request: ${requestId}`,
      '',
      `Contact: ${contactName}`,
      `Office: ${officeName || '-'}`,
      `Email: ${email || '-'}`,
      `Phone: ${phone || '-'}`,
      `Need-by: ${needBy || '-'}`,
      '',
      `Source: ${source}`,
      `Source page: ${sourcePageUrl || '-'}`,
      '',
      'Request details:',
      requestDetails,
      '',
      `Additional notes: ${notes || '-'}`,
      '',
      `Single product: ${productName || '-'}${productSku ? ` (${productSku})` : ''}`,
      `Variant: ${variantName || '-'}`,
      `Quantity: ${quantity || '-'}`,
      `Estimated total: ${estimatedTotal != null ? `$${estimatedTotal.toFixed(2)}` : '-'}`,
      '',
      `Cart items: ${cartItems.length}`,
      ...cartItems.map((item) => `- ${item.name} x${item.quantity}${item.unitPrice != null ? ` ($${item.unitPrice.toFixed(2)})` : ''}`),
    ].join('\n');

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: salesEmail,
      subject: `Quote Request ${requestId}`,
      body: lines,
    });

    return Response.json({
      success: true,
      requestId,
      id: quoteRecord?.id || null,
    });
  } catch (error) {
    console.error('submitQuoteRequest error:', error);
    const message = error instanceof Error ? error.message : String(error);
    return Response.json({ error: message }, { status: 500 });
  }
});
