import React, { useEffect, useState } from 'react';

interface ScrollRailProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

interface SectionInfo {
  id: string;
  num: string;
  name: string;
}

const SECTIONS: SectionInfo[] = [
  { id: 'home', num: '01', name: 'Home' },
  { id: 'about', num: '02', name: 'About' },
  { id: 'projects', num: '03', name: 'Projects' },
  { id: 'experience', num: '04', name: 'Experience' },
  { id: 'skills', num: '05', name: 'Skills' },
  { id: 'contact', num: '06', name: 'Contact' },
];

export const ScrollRail: React.FC<ScrollRailProps> = ({ activeSection, onNavigate }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = Math.min(1, Math.max(0, scrollY / docHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentIndex = Math.max(0, SECTIONS.findIndex((s) => s.id === activeSection));
  const currentSection = SECTIONS[currentIndex] || SECTIONS[0];
  const nextSection = SECTIONS[(currentIndex + 1) % SECTIONS.length];

  const handleNext = () => {
    if (currentIndex === SECTIONS.length - 1) {
      onNavigate('home');
    } else {
      onNavigate(nextSection.id);
    }
  };

  // Dial travels down the 88px track smoothly
  const dotTopPercent = Math.min(92, Math.max(4, scrollProgress * 92));

  return (
    <aside
      aria-label="Scroll Navigation Rail"
      className="hidden xl:flex fixed right-3 xl:right-4 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-2.5 select-none pointer-events-auto"
    >
      {/* Dynamic Section Number */}
      <button
        onClick={() => onNavigate(currentSection.id)}
        className="font-mono-tech text-[10.5px] text-[#9BA8B5] hover:text-[#159FFF] font-bold tracking-wider transition-colors cursor-pointer"
        title={`Current: ${currentSection.name}`}
      >
        {currentSection.num}
      </button>

      {/* Dynamic Dial & Vertical Track */}
      <div
        className="relative w-px h-24 bg-gradient-to-b from-[#159FFF] via-[#159FFF]/35 to-transparent cursor-pointer"
        onClick={handleNext}
        title="Click to advance"
      >
        {/* Subtle section ticks */}
        {SECTIONS.map((sec, idx) => {
          const tickPct = (idx / (SECTIONS.length - 1)) * 92 + 4;
          const isActive = idx === currentIndex;
          return (
            <div
              key={sec.id}
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(sec.id);
              }}
              style={{ top: `${tickPct}%` }}
              className={`absolute -left-[1.5px] w-1 h-0.5 rounded-full transition-colors ${
                isActive ? 'bg-[#159FFF]' : 'bg-slate-600/50 hover:bg-slate-400'
              }`}
              title={`Go to ${sec.name}`}
            />
          );
        })}

        {/* Glowing Dial Dot */}
        <div
          className="absolute -left-[3.5px] w-2 h-2 rounded-full bg-[#159FFF] border border-white/60 shadow-[0_0_12px_#159FFF] transition-all duration-150 ease-out"
          style={{ top: `${dotTopPercent}%` }}
        />
      </div>

      {/* Vertical Text */}
      <div className="py-1" style={{ writingMode: 'vertical-rl' }}>
        <span className="font-mono-tech text-[8.5px] tracking-[0.25em] uppercase text-[#9BA8B5] rotate-180">
          SCROLL TO EXPLORE
        </span>
      </div>

      {/* Mouse Pill Button */}
      <button
        onClick={handleNext}
        className="w-4 h-6 rounded-full border border-[#9BA8B5]/50 hover:border-[#159FFF]/80 hover:bg-[#159FFF]/10 flex items-start justify-center pt-0.5 cursor-pointer transition-all"
        title={`Scroll to ${nextSection.name}`}
      >
        <span className="w-1 h-1.5 bg-[#159FFF] rounded-full animate-bounce" />
      </button>
    </aside>
  );
};
