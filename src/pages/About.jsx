import { Link } from 'react-router-dom';
import { companyInfo } from '@/components/dentalcore/productsData';

export default function About() {
  return (
    <main className="min-h-screen bg-[#FDFDFD]" style={{ paddingTop: 'var(--site-header-height)' }}>
      {/* Hero */}
      <section className="bg-[#111] text-white py-20 lg:py-28">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/35 font-semibold mb-4 flex items-center gap-3">
            <span className="inline-block w-6 h-px bg-white/25" />
            About Us
          </p>
          <h1 className="text-5xl lg:text-7xl font-medium tracking-tighter uppercase leading-[1.05] text-white">
            About <span className="text-accent">Coretix</span>
          </h1>
          <p className="mt-6 text-base lg:text-lg text-white/55 font-body max-w-2xl leading-relaxed">
            Precision dental supplies engineered for clinical professionals across the United States.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Who we are */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#111]/35 font-semibold mb-5 flex items-center gap-3">
                <span className="inline-block w-6 h-px bg-[#111]/25" />
                Who We Are
              </p>
              <h2 className="text-3xl lg:text-4xl font-medium tracking-tighter uppercase leading-tight text-[#111] mb-6">
                Built for Dental Professionals
              </h2>
              <div className="space-y-4 text-base text-[#111]/65 font-body leading-relaxed">
                <p>
                  Coretix Dental Supplies is a Sacramento-based distributor of premium dental instruments and
                  clinical consumables, serving general practitioners, oral surgeons, periodontists, and
                  group dental organizations across the United States.
                </p>
                <p>
                  We specialize in handpieces, surgical supplies, bone grafting materials, and restorative
                  accessories — curating only the products that meet our strict clinical and durability
                  standards. Every item in our catalog is selected to support efficient workflows, patient
                  comfort, and reliable long-term outcomes.
                </p>
                <p>
                  Our team combines deep industry knowledge with direct manufacturer relationships,
                  allowing us to offer competitive pricing without compromising on quality. Whether you
                  run a single-chair practice or a multi-location DSO, Coretix provides the supplies
                  and support you need to operate at your best.
                </p>
                <p>
                  We pride ourselves on responsive service — real humans answer the phone, orders ship
                  fast, and our clinical support team is available to help match the right products to
                  your procedures. From our headquarters in Sacramento, CA, we serve dental professionals
                  nationwide with the precision and reliability that modern dentistry demands.
                </p>
              </div>
            </div>

            {/* What we offer */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#111]/35 font-semibold mb-5 flex items-center gap-3">
                <span className="inline-block w-6 h-px bg-[#111]/25" />
                What We Offer
              </p>
              <h2 className="text-3xl lg:text-4xl font-medium tracking-tighter uppercase leading-tight text-[#111] mb-6">
                Our Product Range
              </h2>
              <div className="space-y-4 text-base text-[#111]/65 font-body leading-relaxed mb-8">
                <p>
                  Our catalog spans the full spectrum of clinical needs: high-torque handpieces and curing
                  lights, PTFE collagen membranes and bone graft materials, matrix systems and surgical
                  retraction tools, and much more.
                </p>
                <p>
                  Featured product lines include the SureTact G3 sectional matrix system, OsseoSeal
                  collagen membranes, the iTesla G600-S electric handpiece, ModuLite X curing light, and
                  AirPeak pneumatic couplers — all available for direct purchase with fast US shipping.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-px bg-[#E5E5E5] border border-[#E5E5E5] rounded-card overflow-hidden">
                {[
                  { label: 'Handpieces', desc: 'Air & electric' },
                  { label: 'Surgical Supplies', desc: 'Membranes, grafts' },
                  { label: 'Curing Lights', desc: 'LED & multi-mode' },
                  { label: 'Matrix Systems', desc: 'Sectional & tofflemire' },
                ].map(({ label, desc }) => (
                  <div key={label} className="bg-white px-5 py-5">
                    <p className="text-sm font-semibold text-[#111] uppercase tracking-tight">{label}</p>
                    <p className="text-xs text-[#111]/45 mt-1 font-body">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA bar */}
          <div className="mt-20 border-t border-[#E5E5E5] pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-lg font-medium text-[#111] uppercase tracking-tight">
                Ready to stock your practice?
              </p>
              <p className="text-sm text-[#111]/50 font-body mt-1">
                Browse our full catalog or get in touch with our sales team.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/"
                className="inline-block px-6 py-3 bg-[#111] text-white text-xs font-semibold uppercase tracking-[0.14em] hover:bg-accent transition-colors"
              >
                Shop Catalog
              </Link>
              <Link
                to="/contact"
                className="inline-block px-6 py-3 border border-[#111] text-[#111] text-xs font-semibold uppercase tracking-[0.14em] hover:bg-[#111] hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}