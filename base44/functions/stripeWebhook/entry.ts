import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';
import Stripe from 'npm:stripe@14.19.0';

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!);
const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

function generateOrderId(): string {
  // Unambiguous alphabet (no 0/O, 1/I/L) — 8 chars ≈ 1.1e12 combinations,
  // not enumerable through the public lookupOrder endpoint.
  const alphabet = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  let id = '';
  for (const b of bytes) id += alphabet[b % alphabet.length];
  return `CTX-${id}`;
}

Deno.serve(async (req) => {
  try {
    if (!endpointSecret) {
      console.error('STRIPE_WEBHOOK_SECRET is not configured — rejecting webhook');
      return Response.json({ error: 'Webhook not configured' }, { status: 500 });
    }

    const body = await req.text();

    const sig = req.headers.get('stripe-signature');
    if (!sig) {
      return Response.json({ error: 'Missing stripe-signature header' }, { status: 400 });
    }
    const event: Stripe.Event = stripe.webhooks.constructEvent(body, sig, endpointSecret);

    if (event.type !== 'checkout.session.completed') {
      return Response.json({ received: true });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status !== 'paid') {
      console.log(`Session ${session.id} not paid yet, skipping`);
      return Response.json({ received: true });
    }

    // Retrieve line items from the session
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });

    const items = lineItems.data.map(li => ({
      name: li.description || 'Item',
      quantity: li.quantity || 1,
      price: (li.amount_total || 0) / 100 / (li.quantity || 1),
    }));

    const total = (session.amount_total || 0) / 100;
    const customerEmail = session.customer_details?.email || '';
    const customerName = session.customer_details?.name || '';

    const base44 = createClientFromRequest(req);

    await base44.asServiceRole.entities.Order.create({
      order_id: session.metadata?.order_id || generateOrderId(),
      email: customerEmail.toLowerCase(),
      customer_name: customerName,
      status: 'confirmed',
      items,
      total,
    });

    console.log(`Order created for ${customerEmail} — session ${session.id}`);

    return Response.json({ received: true });
  } catch (error) {
    console.error('stripeWebhook error:', error);
    return Response.json({ error: error.message }, { status: 400 });
  }
});
