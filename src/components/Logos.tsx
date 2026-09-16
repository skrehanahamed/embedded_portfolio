import React from 'react';

// Tech Strip Logos
export const CLogo: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M115.4 30.7L67.1 2.9c-1.9-1.1-4.3-1.1-6.2 0L12.6 30.7c-1.9 1.1-3.1 3.2-3.1 5.4v55.8c0 2.2 1.2 4.3 3.1 5.4l48.3 27.8c1.9 1.1 4.3 1.1 6.2 0l48.3-27.8c1.9-1.1 3.1-3.2 3.1-5.4V36.1c0-2.2-1.2-4.3-3.1-5.4z" fill="#004482"/>
    <path d="M115.4 30.7L67.1 2.9c-1.9-1.1-4.3-1.1-6.2 0L12.6 30.7c-1.9 1.1-3.1 3.2-3.1 5.4v55.8c0 2.2 1.2 4.3 3.1 5.4l48.3 27.8c1.9 1.1 4.3 1.1 6.2 0l48.3-27.8c1.9-1.1 3.1-3.2 3.1-5.4V36.1c0-2.2-1.2-4.3-3.1-5.4z" fill="#1B598E" opacity="0.3"/>
    <path d="M64 25.8c-21.1 0-38.2 17.1-38.2 38.2S42.9 102.2 64 102.2c13.7 0 25.8-7.2 32.5-18.1l-14.7-8.5c-4 6.3-10.7 10.3-17.8 10.3-12.1 0-21.9-9.8-21.9-21.9S51.9 42.1 64 42.1c7.4 0 14.1 4.2 18 10.7l14.7-8.5C89.9 33.1 77.8 25.8 64 25.8z" fill="#FFFFFF"/>
  </svg>
);

export const CppLogo: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M115.4 30.7L67.1 2.9c-1.9-1.1-4.3-1.1-6.2 0L12.6 30.7c-1.9 1.1-3.1 3.2-3.1 5.4v55.8c0 2.2 1.2 4.3 3.1 5.4l48.3 27.8c1.9 1.1 4.3 1.1 6.2 0l48.3-27.8c1.9-1.1 3.1-3.2 3.1-5.4V36.1c0-2.2-1.2-4.3-3.1-5.4z" fill="#00599C"/>
    <path d="M64 25.8c-21.1 0-38.2 17.1-38.2 38.2S42.9 102.2 64 102.2c13.7 0 25.8-7.2 32.5-18.1l-14.7-8.5c-4 6.3-10.7 10.3-17.8 10.3-12.1 0-21.9-9.8-21.9-21.9S51.9 42.1 64 42.1c7.4 0 14.1 4.2 18 10.7l14.7-8.5C89.9 33.1 77.8 25.8 64 25.8z" fill="#FFFFFF"/>
    <path d="M89 57.5h5v-5h3v5h5v3h-5v5h-3v-5h-5v-3zM107 57.5h5v-5h3v5h5v3h-5v5h-3v-5h-5v-3z" fill="#00B4D8"/>
  </svg>
);

export const PythonLogo: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M63.6 5.8c-18.4 0-24.8 8.1-24.8 17v12.4h25.4v3.6H29.4C13.8 38.8 5 47.9 5 63.5c0 15.6 13.1 22.8 24.4 22.8h7.9v-11.2c0-12.8 11-23.7 24.4-23.7h23.7V38.8h.1c0-11-9.2-19.4-23.9-23.9v-9.1zm-8.8 8.9c3 0 5.4 2.4 5.4 5.4s-2.4 5.4-5.4 5.4-5.4-2.4-5.4-5.4 2.4-5.4 5.4-5.4z" fill="#3776AB"/>
    <path d="M64.4 122.2c18.4 0 24.8-8.1 24.8-17V92.8H63.8v-3.6h34.8c15.6 0 24.4-9.1 24.4-24.7 0-15.6-13.1-22.8-24.4-22.8h-7.9v11.2c0 12.8-11 23.7-24.4 23.7H43v14.6h-.1c0 11 9.2 19.4 23.9 23.9v9.1zm8.8-8.9c-3 0-5.4-2.4-5.4-5.4s2.4-5.4 5.4-5.4 5.4 2.4 5.4 5.4-2.4 5.4-5.4 5.4z" fill="#FFD43B"/>
  </svg>
);

export const AutosarLogo: React.FC<{ className?: string }> = ({ className = "h-6" }) => (
  <div className={`flex items-center space-x-1 font-bold tracking-wider text-white ${className}`}>
    <span className="font-heading tracking-widest text-[15px] font-black text-white">AUT</span>
    <span className="relative flex items-center justify-center w-5 h-5 rounded-full border border-sky-400 bg-sky-500/20 text-[10px] text-sky-400 font-bold">
      <span className="absolute -top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-sky-300 animate-pulse"></span>
      S
    </span>
    <span className="font-heading tracking-widest text-[15px] font-black text-white">AR</span>
  </div>
);

export const QtLogo: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <div className={`${className} rounded-lg bg-[#41CD52] flex items-center justify-center text-white font-bold text-xs tracking-tight shadow-sm`}>
    Qt
  </div>
);

export const LinuxLogo: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="55" rx="32" ry="38" fill="#111827"/>
    <ellipse cx="50" cy="62" rx="20" ry="24" fill="#FFFFFF"/>
    <ellipse cx="42" cy="40" rx="4" ry="6" fill="#FFFFFF"/>
    <ellipse cx="58" cy="40" rx="4" ry="6" fill="#FFFFFF"/>
    <circle cx="43" cy="40" r="2.5" fill="#111827"/>
    <circle cx="57" cy="40" r="2.5" fill="#111827"/>
    <polygon points="46,47 54,47 50,56" fill="#F59E0B"/>
    <ellipse cx="32" cy="90" rx="14" ry="6" fill="#F59E0B"/>
    <ellipse cx="68" cy="90" rx="14" ry="6" fill="#F59E0B"/>
  </svg>
);

export const CanoeLogo: React.FC<{ className?: string }> = ({ className = "h-5" }) => (
  <div className={`flex items-center space-x-1.5 ${className}`}>
    <div className="w-4 h-4 rounded-full bg-red-600 flex items-center justify-center text-[9px] font-black text-white">V</div>
    <span className="font-heading font-bold tracking-wider text-sm text-gray-200">CANoe</span>
  </div>
);

export const GitLogo: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M124.7 57.2L70.8 3.3c-4.4-4.4-11.6-4.4-16 0L39.1 19.1l20.3 20.3c4.7-1.6 10.2-.5 13.9 3.2 3.7 3.7 4.8 9.2 3.2 13.9l19.5 19.5c4.7-1.6 10.2-.5 13.9 3.2 5.3 5.3 5.3 14 0 19.3-5.3 5.3-14 5.3-19.3 0-4-4-4.9-9.8-2.8-14.7L69.8 66.1v34.4c1.7 1 3.2 2.5 4.1 4.4 3.3 6.7.6 14.9-6.1 18.2-6.7 3.3-14.9.6-18.2-6.1-3.3-6.7-.6-14.9 6.1-18.2 2.6-1.3 5.6-1.7 8.4-1.1V63.9c-2.8.6-5.8.2-8.4-1.1-4.7-2.3-7.5-7.1-7.2-12.3L28.1 30.1 3.3 54.9c-4.4 4.4-4.4 11.6 0 16l53.9 53.9c4.4 4.4 11.6 4.4 16 0l51.5-51.5c4.4-4.5 4.4-11.7 0-16.1z" fill="#F05032"/>
  </svg>
);

export const DockerLogo: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M123.6 57.3c-2.6-1.9-8.4-3.3-13-1.6-.9-7.2-6.2-12.9-6.2-12.9s-5.6 5.8-5.8 14.8c-3.5 2-8.4 2.1-11.3.8-3.7-1.7-6.2-5.7-6.2-5.7s-5.3 13.8 6.5 23.6c-4.3 2.1-11.8 3.5-19.1 3.5H7.7c-4 0-7.2 3.2-7.2 7.2 0 17.6 13.8 40.7 49.3 40.7 39.4 0 58.7-24 64.9-46.7 8.3-.9 11.7-6.2 12.3-7.7-.3-.6-1.5-4.2-3.4-6z" fill="#2496ED"/>
    <rect x="25" y="47" width="10" height="9" rx="1.5" fill="#2496ED"/>
    <rect x="38" y="47" width="10" height="9" rx="1.5" fill="#2496ED"/>
    <rect x="51" y="47" width="10" height="9" rx="1.5" fill="#2496ED"/>
    <rect x="38" y="35" width="10" height="9" rx="1.5" fill="#2496ED"/>
    <rect x="51" y="35" width="10" height="9" rx="1.5" fill="#2496ED"/>
    <rect x="64" y="35" width="10" height="9" rx="1.5" fill="#2496ED"/>
  </svg>
);

export const JenkinsLogo: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <div className={`${className} rounded-full bg-[#D33833]/15 border border-[#D33833]/40 flex items-center justify-center p-0.5`}>
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
      <circle cx="50" cy="50" r="45" fill="#F0D6B7"/>
      <ellipse cx="50" cy="35" rx="25" ry="18" fill="#111827"/>
      <rect x="42" y="28" width="16" height="18" fill="#D33833"/>
      <circle cx="42" cy="46" r="3" fill="#111827"/>
      <circle cx="58" cy="46" r="3" fill="#111827"/>
      <path d="M40 60 Q50 72 60 60" stroke="#111827" strokeWidth="3" fill="none"/>
    </svg>
  </div>
);

export const CMakeLogo: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <polygon points="50,10 88,88 12,88" fill="#064F8C"/>
    <polygon points="50,10 65,70 20,40" fill="#239243"/>
    <polygon points="88,88 50,55 35,88" fill="#D12026"/>
  </svg>
);

export const BazelLogo: React.FC<{ className?: string }> = ({ className = "h-5" }) => (
  <div className={`flex items-center space-x-1.5 ${className}`}>
    <div className="w-4 h-4 bg-[#43A047] rounded flex items-center justify-center text-white font-black text-[9px]">b</div>
    <span className="font-heading font-semibold text-gray-200 text-sm">bazel</span>
  </div>
);

// Company Logos for Experience
export const LTTSLogo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <div className={`${className} rounded-xl bg-[#00478F] flex items-center justify-center text-white font-bold p-1 shadow-md`}>
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
      <circle cx="50" cy="50" r="44" stroke="#FFFFFF" strokeWidth="5"/>
      <text x="50" y="58" fill="#FFFFFF" fontSize="32" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">L&amp;T</text>
    </svg>
  </div>
);

export const AltenLogo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <div className={`${className} rounded-xl bg-white flex flex-col items-center justify-center p-1.5 shadow-md`}>
    <div className="w-5 h-5 bg-[#E2001A] flex items-center justify-center text-white font-black text-[11px] rounded-sm">A</div>
    <span className="text-[8px] font-bold text-gray-900 tracking-wider">ALTEN</span>
  </div>
);

export const WiproLogo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <div className={`${className} rounded-xl bg-white flex flex-col items-center justify-center p-1 shadow-md`}>
    <div className="flex items-center justify-center space-x-0.5">
      <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
    </div>
    <span className="text-[9px] font-bold text-gray-800 tracking-tight mt-0.5">wipro</span>
  </div>
);

export const VolkswagenLogo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="46" stroke="#FFFFFF" strokeWidth="4"/>
    <circle cx="50" cy="50" r="40" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.4"/>
    <path d="M30 32 L44 76 L50 60 L56 76 L70 32" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M42 32 L50 52 L58 32" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ASMLLogo: React.FC<{ className?: string }> = ({ className = "h-6" }) => (
  <span className={`font-heading text-xl font-black tracking-widest text-[#00A3E0] ${className}`}>
    ASML
  </span>
);

export const FordLogo: React.FC<{ className?: string }> = ({ className = "h-6" }) => (
  <div className={`px-2 py-0.5 rounded-full bg-[#002C6C] border border-blue-400/40 inline-flex items-center ${className}`}>
    <span className="font-script text-white text-base leading-none font-bold tracking-wide">Ford</span>
  </div>
);

export const ContinentalLogo: React.FC<{ className?: string }> = ({ className = "h-5" }) => (
  <span className={`font-heading text-sm font-bold tracking-wider text-[#FFA500] ${className}`}>
    Continental
  </span>
);

export const GithubLogo: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const LinkedinLogo: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

