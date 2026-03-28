import kecMainLogo from '../../assets/kec_main_logo.png';
import kecAccreditationLogos from '../../assets/kec_accreditation_logos.png';

export const KingstonLogo = ({ className = "", iconSize = 48, textColor = "text-brand-accent", variant = "default" }) => {
  const isSmall = variant === "small";

  if (variant === "banner") {
    return (
      <div className={`flex flex-col gap-10 w-full ${className}`}>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-8 border-b border-white/10">
          <div className="flex items-center gap-8 group">
            <img 
              src={kecMainLogo} 
              alt="Kingston Engineering College" 
              className="h-32 w-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
          
          <div className="flex items-center justify-center lg:justify-end">
            <img 
              src={kecAccreditationLogos} 
              alt="Accreditation Logos" 
              className="h-16 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity" 
            />
          </div>
        </div>
        
        <div className="max-w-4xl animate-in slide-in-from-left duration-1000">
          <h2 className="text-5xl font-black text-white leading-tight mb-6 tracking-tighter">
            Empowering <span className="text-brand-accent italic underline decoration-brand-accent/30 underline-offset-8">Excellence</span> <br />
            Since 2008
          </h2>
          <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-2xl">
            Access the Unified Academic Operating System for Kingston Engineering College. Synchronized with Institutional Nodes.
          </p>
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
