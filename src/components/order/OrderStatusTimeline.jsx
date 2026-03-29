import { Package, Clock, Truck, MapPin, CheckCircle } from 'lucide-react';

const stepConfig = [
  { label: 'Confirmed', icon: CheckCircle },
  { label: 'Processing', icon: Clock },
  { label: 'Shipped', icon: Package },
  { label: 'Out for Delivery', icon: Truck },
  { label: 'Delivered', icon: MapPin },
];

export default function OrderStatusTimeline({ currentStep }) {
  return (
    <div className="mb-10">
      <h3 className="text-[10px] uppercase tracking-widest font-semibold text-[#111]/40 mb-6">Delivery Progress</h3>

      {/* Desktop */}
      <div className="hidden md:flex items-start justify-between relative">
        {/* Background line */}
        <div className="absolute top-5 left-0 right-0 h-px bg-[#111]/10" />
        {/* Active line */}
        <div
          className="absolute top-5 left-0 h-px bg-[#111] transition-all duration-700"
          style={{ width: `${(currentStep / (stepConfig.length - 1)) * 100}%` }}
        />

        {stepConfig.map((step, i) => {
          const Icon = step.icon;
          const active = i <= currentStep;
          return (
            <div key={i} className="flex flex-col items-center relative z-10 flex-1">
              <div className={`w-10 h-10 flex items-center justify-center border-2 transition-colors ${
                active ? 'bg-[#111] border-[#111] text-white' : 'bg-white border-[#111]/15 text-[#111]/30'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className={`mt-3 text-[10px] font-semibold uppercase tracking-widest ${
                active ? 'text-[#111]' : 'text-[#111]/30'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-0">
        {stepConfig.map((step, i) => {
          const Icon = step.icon;
          const active = i <= currentStep;
          const isLast = i === stepConfig.length - 1;
          return (
            <div key={i} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 flex items-center justify-center border-2 flex-shrink-0 ${
                  active ? 'bg-[#111] border-[#111] text-white' : 'bg-white border-[#111]/15 text-[#111]/30'
                }`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                {!isLast && (
                  <div className={`w-px h-8 ${active && i < currentStep ? 'bg-[#111]' : 'bg-[#111]/10'}`} />
                )}
              </div>
              <span className={`text-xs font-semibold uppercase tracking-widest pt-1.5 ${
                active ? 'text-[#111]' : 'text-[#111]/30'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}