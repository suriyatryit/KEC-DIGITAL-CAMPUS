import React from 'react';

export const KingstonLogo = ({ className = "", iconSize = 48, textColor = "text-[#E31E24]", variant = "default" }) => {
  const isSmall = variant === "small";

  if (variant === "banner") {
    return (
      <div className={`flex flex-col lg:flex-row items-center justify-between gap-6 w-full ${className}`}>
        <div className="flex items-center gap-6">
          {/* Building Icon */}
          <div className="text-[#E31E24] shrink-0">
            <svg width={iconSize * 1.5} height={iconSize * 1.5} viewBox="0 0 100 100" fill="currentColor">
              {/* Roof */}
              <polygon points="50,10 95,40 5,40" />
              <rect x="5" y="40" width="90" height="6" />
              {/* Columns */}
              <rect x="15" y="50" width="12" height="30" rx="1" />
              <rect x="35" y="50" width="12" height="30" rx="1" />
              <rect x="55" y="50" width="12" height="30" rx="1" />
              <rect x="75" y="50" width="12" height="30" rx="1" />
              {/* Base */}
              <rect x="5" y="80" width="90" height="6" rx="1" />
              <rect x="2" y="86" width="96" height="6" rx="1" />
              {/* Pediment circle with K */}
              <circle cx="50" cy="28" r="7" fill="white" />
              <text x="50" y="32" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#E31E24">K</text>
            </svg>
          </div>
          {/* Text block */}
          <div className="text-[#E31E24]">
            <h1 className="text-2xl sm:text-4xl font-black leading-tight tracking-tight uppercase drop-shadow-sm">KINGSTON ENGINEERING COLLEGE</h1>
            <h2 className="text-lg sm:text-2xl font-bold leading-tight opacity-90">(AN AUTONOMOUS INSTITUTION)</h2>
            <p className="text-[11px] sm:text-xs font-semibold leading-normal mt-2 opacity-80 max-w-2xl italic text-gray-700">
              (Approved by AICTE &amp; Council of Architecture, New Delhi, Affiliated to Anna University, Chennai,<br />
              Accredited with &lsquo;A&rsquo; Grade by NAAC, Recognized Institution under section 2(f) &amp; 12(B) of UGC act, 1956)<br />
              Chittoor Main Road, Vellore, Tamil Nadu - 632059.
            </p>
          </div>
        </div>
        
        {/* Accreditation Icons Placeholder (Right Side) */}
        <div className="hidden xl:flex items-center gap-4 opacity-70 p-4 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full border-2 border-[#E31E24] flex items-center justify-center font-bold text-[8px] text-center p-1">NBA</div>
             <div className="w-10 h-10 rounded-full border-2 border-[#E31E24] flex items-center justify-center font-bold text-[8px] text-center p-1">NAAC</div>
             <div className="w-10 h-10 rounded-full border-2 border-[#E31E24] flex items-center justify-center font-bold text-[8px] text-center p-1">AICTE</div>
             <div className="w-10 h-10 rounded-full border-2 border-[#E31E24] flex items-center justify-center font-bold text-[8px] text-center p-1">UGC</div>
             <div className="w-10 h-10 rounded-full border-2 border-[#E31E24] flex items-center justify-center font-bold text-[8px] text-center p-1">Startup TN</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="text-[#E31E24] shrink-0">
        <svg width={isSmall ? iconSize : iconSize * 1.2} height={isSmall ? iconSize * 0.8 : iconSize} viewBox="0 0 100 100" fill="currentColor">
          <polygon points="50,10 95,40 5,40" />
          <rect x="5" y="40" width="90" height="6" />
          <rect x="15" y="50" width="12" height="30" />
          <rect x="35" y="50" width="12" height="30" />
          <rect x="55" y="50" width="12" height="30" />
          <rect x="75" y="50" width="12" height="30" />
          <rect x="5" y="80" width="90" height="6" />
        </svg>
      </div>
      <div className="flex flex-col">
        <h1 className={`${isSmall ? 'text-lg' : 'text-xl'} font-black text-inherit leading-none uppercase tracking-tighter`}>KINGSTON</h1>
        <p className={`${isSmall ? 'text-[8px]' : 'text-[10px]'} font-bold opacity-80 uppercase tracking-widest`}>Engineering College</p>
      </div>
    </div>
  );
};
