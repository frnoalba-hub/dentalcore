import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePageSeo } from '@/hooks/usePageSeo';

export default function PageNotFound() {
  const location = useLocation();

  usePageSeo({ variant: 'notFound' });

  return (
    <main className="min-h-screen bg-[#FDFDFD] flex items-center justify-center px-6 pt-[var(--site-header-height)]">
      <div className="max-w-xl w-full text-center py-24">
        <p className="text-xs uppercase tracking-[0.25em] text-[#111]/35 font-semibold mb-4">
          Error 404
        </p>
        <h1 className="text-6xl lg:text-8xl font-medium tracking-tighter uppercase text-[#111] mb-6">
          Page <span className="text-accent">Not Found</span>
        </h1>
        <p className="text-sm text-[#111]/50 font-body leading-relaxed mb-10 break-all">
          We couldn&apos;t find <span className="font-medium text-[#111]/70">{location.pathname}</span>.
          It may have been moved or no longer exists.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#111] text-white text-xs font-semibold uppercase tracking-[0.14em] hover:bg-accent transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Store
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 border border-[#111] text-[#111] text-xs font-semibold uppercase tracking-[0.14em] hover:bg-[#111] hover:text-white transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
