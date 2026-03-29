import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Package, Truck, CheckCircle, Clock, MapPin, ArrowLeft, Loader2, AlertCircle, Box } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { companyInfo } from '@/components/dentalcore/productsData';
import OrderStatusTimeline from '@/components/order/OrderStatusTimeline';
import OrderDetails from '@/components/order/OrderDetails';

const STEPS = ['confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered'];

export default function OrderTracking() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLookup = async (e) => {
    e.preventDefault();
    setError('');
    setOrder(null);
    setLoading(true);
    try {
      const res = await base44.functions.invoke('lookupOrder', {
        order_id: orderId.trim(),
        email: email.trim(),
      });
      setOrder(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const currentStep = order ? STEPS.indexOf(order.status) : -1;

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* Header */}
      <div className="bg-[#111] text-white">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link to="/" className="text-xs font-semibold tracking-widest uppercase text-white/60 hover:text-white flex items-center gap-2 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Store
          </Link>
          <span className="text-lg font-bold tracking-widest uppercase">
            {companyInfo.logoText}<span className="text-accent">.</span>
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-medium tracking-tighter uppercase text-[#111] mb-3">
            Track Your Order
          </h1>
          <p className="text-sm text-[#111]/50 font-body max-w-lg">
            Enter your order ID and the email address used at checkout to view your delivery status.
          </p>
        </motion.div>

        {/* Lookup Form */}
        <motion.form
          onSubmit={handleLookup}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 mb-12"
        >
          <div>
            <label className="text-[10px] uppercase tracking-widest font-semibold text-[#111]/40 mb-1.5 block">Order ID</label>
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. CTX-10042"
              required
              className="w-full bg-transparent border border-[#111]/20 focus:border-[#111] px-4 py-3 text-sm font-body text-[#111] placeholder:text-[#111]/30 outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest font-semibold text-[#111]/40 mb-1.5 block">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full bg-transparent border border-[#111]/20 focus:border-[#111] px-4 py-3 text-sm font-body text-[#111] placeholder:text-[#111]/30 outline-none transition-colors"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto bg-[#111] text-white px-8 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-accent transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              Track
            </button>
          </div>
        </motion.form>

        {/* Error */}
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 p-4 border border-red-200 bg-red-50 mb-8">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-sm font-body text-red-700">{error}</p>
          </motion.div>
        )}

        {/* Results */}
        {order && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            {/* Status Banner */}
            <div className="bg-[#111] text-white p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Order</p>
                  <p className="text-2xl font-semibold tracking-tight">{order.order_id}</p>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 bg-white/10 border border-white/10">
                  {currentStep >= 4 ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Package className="w-5 h-5 text-accent" />}
                  <span className="text-sm font-semibold uppercase tracking-wider">
                    {order.status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <OrderStatusTimeline currentStep={currentStep} steps={STEPS} />

            {/* Order Details */}
            <OrderDetails order={order} />
          </motion.div>
        )}

        {/* Contact */}
        {!order && !error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="border-t border-[#111]/10 pt-8 mt-8">
            <p className="text-sm text-[#111]/50 font-body">
              Need help? Contact us at{' '}
              <a href={`mailto:${companyInfo.email}`} className="text-accent hover:underline">{companyInfo.email}</a>
              {' '}or call{' '}
              <a href={`tel:${companyInfo.phone}`} className="text-accent hover:underline">{companyInfo.phone}</a>
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}