import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MobilePageNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

interface SectionMeta {
  id: string;
  num: string;
  name: string;
}

const SECTIONS: SectionMeta[] = [
  { id: 'home',       num: '01', name: 'Home' },
  { id: 'about',      num: '02', name: 'About' },
  { id: 'projects',   num: '03', name: 'Projects' },
  { id: 'experience', num: '04', name: 'Experience' },
  { id: 'skills',     num: '05', name: 'Skills' },
  { id: 'contact',    num: '06', name: 'Contact' },
];

export const MobilePageNav: React.FC<MobilePageNavProps> = ({ activeSection, onNavigate }) => {
  const currentIndex = Math.max(0, SECTIONS.findIndex((s) => s.id === activeSection));
  const currentSection = SECTIONS[currentIndex] || SECTIONS[0];
  const prevSection = currentIndex > 0 ? SECTIONS[currentIndex - 1] : null;
  const nextSection = currentIndex < SECTIONS.length - 1 ? SECTIONS[currentIndex + 1] : null;

  const handlePrev = () => {
    if (prevSection) {
      onNavigate(prevSection.id);
    }
  };

  const handleNext = () => {
    if (nextSection) {
      onNavigate(nextSection.id);
    }
  };

  return (
    <div className="lg:hidden w-full px-4 py-3 mt-4 bg-transparent">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        {/* Left Arrow / Previous Page (Borderless, pure white text) */}
        <button
          onClick={handlePrev}
          disabled={!prevSection}
          className={`flex items-center gap-1.5 py-2 px-2 text-xs font-bold font-mono-tech transition-all cursor-pointer border-0 bg-transparent ${
            prevSection
              ? 'text-white hover:text-sky-400 active:scale-95'
              : 'opacity-20 text-gray-500 cursor-not-allowed'
          }`}
          aria-label={prevSection ? `Go to previous page: ${prevSection.name}` : 'No previous page'}
        >
          <ChevronLeft className="w-4 h-4 text-white" />
          <span className="hidden sm:inline">{prevSection ? prevSection.name : 'Prev'}</span>
          <span className="sm:hidden">Prev</span>
        </button>

        {/* Center: Current Page in Crisp White (Borderless) */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2 text-xs font-mono-tech">
            <span className="text-white font-black tracking-wide">{currentSection.num}</span>
            <span className="text-white/40">/</span>
            <span className="text-white/60">06</span>
            <span className="text-white font-heading font-black tracking-widest text-xs uppercase ml-1">
              {currentSection.name}
            </span>
          </div>

          {/* Sleek mini progress dots */}
          <div className="flex items-center gap-1.5 pt-0.5">
            {SECTIONS.map((sec, idx) => (
              <button
                key={sec.id}
                onClick={() => onNavigate(sec.id)}
                className={`h-1 rounded-full transition-all duration-300 border-0 ${
                  idx === currentIndex
                    ? 'w-5 bg-white shadow-[0_0_8px_#ffffff]'
                    : 'w-1.5 bg-white/25 hover:bg-white/50'
                }`}
                title={sec.name}
                aria-label={`Jump to ${sec.name}`}
              />
            ))}
          </div>
        </div>

        {/* Right Arrow / Next Page (Borderless, pure white text) */}
        <button
          onClick={handleNext}
          disabled={!nextSection}
          className={`flex items-center gap-1.5 py-2 px-2 text-xs font-bold font-mono-tech transition-all cursor-pointer border-0 bg-transparent ${
            nextSection
              ? 'text-white hover:text-sky-400 active:scale-95'
              : 'opacity-20 text-gray-500 cursor-not-allowed'
          }`}
          aria-label={nextSection ? `Go to next page: ${nextSection.name}` : 'No next page'}
        >
          <span className="hidden sm:inline">{nextSection ? nextSection.name : 'Next'}</span>
          <span className="sm:hidden">Next</span>
          <ChevronRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};
