import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Mail, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    setErrorMsg('');

    const existing = await base44.entities.NewsletterSubscriber.filter({ email });
    if (existing.length > 0) {
      setStatus('success');
      return;
    }

    await base44.entities.NewsletterSubscriber.create({ email, subscribed: true });
    setStatus('success');
    setEmail('');
  };

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 text-green-400">
        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
        <span className="text-sm font-medium">You're subscribed! We'll keep you updated.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <span className="text-xs text-white/40 uppercase tracking-widest block mb-4">Newsletter</span>
      <p className="text-sm text-white/60 mb-4 font-body">
        Get product updates, promotions & clinical tips delivered to your inbox.
      </p>
      <div className="flex">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full bg-white/5 border border-white/10 text-white text-sm pl-10 pr-4 py-3 placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-white text-[#111] px-5 py-3 text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {status === 'loading' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>Subscribe <ArrowRight className="w-3.5 h-3.5" /></>
          )}
        </button>
      </div>
      {errorMsg && <p className="text-red-400 text-xs mt-2">{errorMsg}</p>}
    </form>
  );
}