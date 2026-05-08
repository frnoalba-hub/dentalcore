import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const payload = await req.json();
    const { event, data, old_data } = payload;

    const base44 = createClientFromRequest(req);

    // Determine which email to send
    if (event.type === 'create') {
      // New order confirmation
      const order = data;
      if (!order?.email) {
        console.log('No email on order, skipping');
        return Response.json({ skipped: true });
      }

      const itemsList = (order.items || [])
        .map(item => `• ${item.quantity}x ${item.name} — $${Number(item.price).toFixed(2)}`)
        .join('\n');

      await base44.asServiceRole.integrations.Core.SendEmail({
        to: order.email,
        subject: `Order Confirmed — ${order.order_id}`,
        body: `Hi ${order.customer_name || 'there'},

Thank you for your order! We've received it and it's being processed.

Order ID: ${order.order_id}
Status: Confirmed

Items:
${itemsList || 'See your order for details'}

Total: $${Number(order.total || 0).toFixed(2)}

You can track your order at any time here:
https://www.dentalcoreinstruments.com/track-order

Questions? Reply to this email or contact us at sales@dentalcoreinstruments.com

— The Coretix Team`,
      });

      console.log(`Confirmation email sent to ${order.email} for order ${order.order_id}`);

    } else if (event.type === 'update') {
      // Shipped status update
      const order = data;
      const wasShipped = old_data?.status !== 'shipped' && order?.status === 'shipped';

      if (!wasShipped) {
        console.log('Status not changed to shipped, skipping');
        return Response.json({ skipped: true });
      }

      if (!order?.email) {
        console.log('No email on order, skipping');
        return Response.json({ skipped: true });
      }

      const trackingInfo = order.tracking_number
        ? `Tracking Number: ${order.tracking_number}${order.carrier ? ` (${order.carrier})` : ''}`
        : 'Tracking details will be updated shortly.';

      const deliveryInfo = order.estimated_delivery
        ? `Estimated Delivery: ${order.estimated_delivery}`
        : '';

      await base44.asServiceRole.integrations.Core.SendEmail({
        to: order.email,
        subject: `Your Order Has Shipped — ${order.order_id}`,
        body: `Hi ${order.customer_name || 'there'},

Great news! Your order is on its way.

Order ID: ${order.order_id}
Status: Shipped 🚚

${trackingInfo}
${deliveryInfo}

Track your order here:
https://www.dentalcoreinstruments.com/track-order

Questions? Contact us at sales@dentalcoreinstruments.com

— The Coretix Team`,
      });

      console.log(`Shipped email sent to ${order.email} for order ${order.order_id}`);
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('sendOrderEmails error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});