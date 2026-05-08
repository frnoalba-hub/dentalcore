import Stripe from 'npm:stripe@14.19.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!);
const MERCHANT_ID = 5783084810;

function addBusinessDays(start: Date, businessDays: number): string {
  const d = new Date(start);
  let added = 0;
  while (added < businessDays) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) added += 1;
  }
  return d.toISOString().slice(0, 10);
}

Deno.serve(async (req) => {
  try {
    const { sessionId } = await req.json();
    if (!sessionId || typeof sessionId !== 'string' || !sessionId.startsWith('cs_')) {
      return Response.json({ error: 'Valid Stripe checkout session ID is required.' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid') {
      return Response.json({ error: 'Checkout session is not paid.' }, { status: 400 });
    }

    const email = session.customer_details?.email;
    if (!email) {
      return Response.json({ error: 'Customer email is unavailable for this session.' }, { status: 400 });
    }

    const country =
      session.shipping_details?.address?.country ||
      session.customer_details?.address?.country ||
      'US';

    return Response.json({
      merchant_id: MERCHANT_ID,
      order_id: session.metadata?.order_id || session.id,
      email,
      delivery_country: country,
      // Same-day processing + next-business-day shipping + up to 10 business days transit.
      estimated_delivery_date: addBusinessDays(new Date(), 11),
    });
  } catch (error) {
    console.error('getGoogleCustomerReviewOptIn error:', error);
    const message = error instanceof Error ? error.message : String(error);
    return Response.json({ error: message }, { status: 500 });
  }
});
