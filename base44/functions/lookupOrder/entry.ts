import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { order_id, email } = await req.json();

    if (!order_id || !email) {
      return Response.json({ error: 'Order ID and email are required.' }, { status: 400 });
    }

    const orders = await base44.asServiceRole.entities.Order.filter({
      order_id: order_id.trim().toUpperCase(),
      email: email.trim().toLowerCase()
    });

    if (!orders || orders.length === 0) {
      return Response.json({ error: 'No order found. Please check your order ID and email.' }, { status: 404 });
    }

    const order = orders[0];
    // Return only safe fields
    return Response.json({
      order_id: order.order_id,
      status: order.status,
      customer_name: order.customer_name,
      items: order.items,
      total: order.total,
      tracking_number: order.tracking_number,
      carrier: order.carrier,
      estimated_delivery: order.estimated_delivery,
      shipped_date: order.shipped_date,
      created_date: order.created_date,
    });
  } catch (error) {
    console.error('lookupOrder error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});