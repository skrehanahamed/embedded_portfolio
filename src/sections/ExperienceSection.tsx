import React from 'react';
import { Briefcase, Building2, Car, Code2, ArrowRight } from 'lucide-react';
import { experienceData } from '../data/experienceData';

interface ExperienceSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onNavigate }) => {
  const topStats = [
    {
      icon: <Briefcase className="w-3.5 h-3.5 text-sky-400" />,
      value: '4+',
      label: 'Years Exp'
    },
    {
      icon: <Building2 className="w-3.5 h-3.5 text-sky-400" />,
      value: '3',
      label: 'Companies'
    },
    {
      icon: <Car className="w-3.5 h-3.5 text-sky-400" />,
      value: 'Auto & Semi',
      label: 'Domain Focus'
    },
    {
      icon: <Code2 className="w-3.5 h-3.5 text-sky-400" />,
      value: 'C/C++',
      label: 'Core Dev'
    }
  ];

  return (
    <section
      id="experience"
      className="relative w-full min-h-[calc(100vh-4rem)] h-auto py-8 sm:py-10 lg:py-12 px-4 sm:px-8 lg:px-12 2xl:px-16 bg-[#02060A] flex flex-col justify-between select-none scroll-mt-20 border-t border-white/[0.04]"
    >
      {/* Ambient background glow */}
      <div
        className="absolute -top-32 left-1/3 w-[600px] h-[450px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(21,159,255,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1700px] 3xl:max-w-[2000px] mx-auto w-full h-full flex flex-col justify-between gap-2 lg:gap-2.5">
        
        {/* ══════════════════════════════════════════════════════
            TOP HEADER (Single Tab, Borderless, Like Projects Part)
        ══════════════════════════════════════════════════════ */}
        <div
          className="relative rounded-b-2xl overflow-hidden p-3.5 sm:p-4 lg:py-2.5 2xl:py-3.5 lg:px-6 shrink-0 -mt-px shadow-lg"
          style={{
            background: 'linear-gradient(135deg, rgba(8, 16, 26, 0.95) 0%, rgba(4, 9, 16, 0.98) 100%)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          {/* Right vehicle visual background - CLEARLY VISIBLE WITH VIBRANT TAILLIGHTS */}
          <div className="absolute top-0 right-0 bottom-0 w-full md:w-[58%] lg:w-[50%] opacity-90 md:opacity-95 pointer-events-none overflow-hidden">
            <img
              src="/assets/skills/car_rear.jpg"
              alt="Automotive Experience Journey"
              className="w-full h-full object-cover object-right brightness-105 contrast-110"
              draggable={false}
            />
            {/* Soft fade only on the far left side */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#050C16] via-[#050C16]/50 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050C16]/40 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="relative z-10 flex flex-col justify-between gap-2 max-w-2xl">
            {/* Upper: Title & Subtitle */}
            <div className="space-y-0.5">
              <div className="flex items-center space-x-2 text-[9px] font-mono-tech text-sky-400 font-semibold uppercase tracking-[0.22em]">
                <span>/ 04</span>
                <span className="w-6 h-[1px] bg-sky-400/60" />
                <span>EXPERIENCE</span>
              </div>
              <div className="flex items-baseline gap-2.5">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-black font-heading text-white leading-tight">
                  My Professional{' '}
                  <span
                    style={{
                      background: 'linear-gradient(90deg,#4FC3FF 0%,#159FFF 55%,#0077CC 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Journey.
                  </span>
                </h2>
                <span className="hidden sm:inline-block text-[11px] italic text-[#9BA8B5] font-medium">
                  &ldquo;Different Roads. Same Passion.&rdquo;
                </span>
              </div>
              <p className="text-[10.5px] lg:text-[11px] text-[#9BA8B5] leading-snug line-clamp-1">
                A journey of continuous learning, real-world impact, and building smarter automotive & semiconductor experiences.
              </p>
            </div>

            {/* Lower: The 4 Experience Stats (Placed a little down on the left, leaving the car on the right 100% visible) */}
            <div className="flex items-center flex-wrap gap-2 pt-0.5">
              {topStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 hover:border-sky-500/40 transition-colors shadow-sm"
                >
                  <div className="w-5 h-5 rounded-md bg-sky-950/80 border border-sky-500/30 flex items-center justify-center flex-shrink-0">
                    {stat.icon}
                  </div>
                  <div className="flex items-baseline gap-1.5 min-w-0">
                    <span className="text-xs font-black font-heading text-white leading-none">
                      {stat.value}
                    </span>
                    <span className="text-[9px] text-[#9BA8B5] font-medium leading-none whitespace-nowrap">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── VERTICAL TIMELINE: 1 BY 1 ROW-BY-ROW (COMPACT & BALANCED) ── */}
        <div className="flex-1 min-h-0 flex flex-col justify-between gap-2 overflow-y-auto no-scrollbar pr-0.5">
          {experienceData.map((item, idx) => (
            <div
              key={item.id}
              className="flex flex-col lg:flex-row items-stretch gap-2.5 sm:gap-3 w-full flex-1 min-h-0"
            >
              {/* Left Timeline Year & Continuous Rail Node (Compact, tight to the left) */}
              <div className="hidden lg:flex items-center justify-end gap-2.5 w-24 xl:w-28 shrink-0 relative select-none pr-1">
                {/* Continuous Vertical Rail Line */}
                <div
                  className={`absolute right-[7px] w-px bg-sky-400/35 pointer-events-none ${
                    idx === 0
                      ? 'top-1/2 bottom-0'
                      : idx === experienceData.length - 1
                      ? 'top-0 bottom-1/2'
                      : 'top-0 bottom-0'
                  }`}
                />

                {/* Year and Period Text */}
                <div className="flex flex-col text-right">
                  <span className="text-sm sm:text-base font-black font-heading text-white tracking-wide leading-none">
                    {item.period.split(' ')[0]}
                  </span>
                  <span
                    className={`text-[10px] font-mono-tech mt-1 leading-none ${
                      item.current ? 'text-emerald-400 font-bold' : 'text-gray-400'
                    }`}
                  >
                    {item.period.split(' ').slice(1).join(' ')}
                  </span>
                </div>

                {/* Timeline Glowing Node & Short Pointer */}
                <div className="relative z-10 flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full flex items-center justify-center ${
                      item.current
                        ? 'bg-emerald-400 shadow-[0_0_10px_#34d399]'
                        : 'bg-sky-400 shadow-[0_0_10px_#38bdf8]'
                    }`}
                  >
                    <div className="w-1 h-1 rounded-full bg-white" />
                  </div>
                  {/* Subtle pointer line toward card */}
                  <div
                    className={`w-2 h-[1px] ${
                      item.current
                        ? 'bg-gradient-to-r from-emerald-400 to-transparent'
                        : 'bg-gradient-to-r from-sky-400 to-transparent'
                    }`}
                  />
                </div>
              </div>

              {/* Center: Main Role Card */}
              <div className="flex-1 lg:flex-[1.4] glass-panel rounded-2xl p-3 sm:p-3.5 border border-white/[0.07] hover:border-sky-500/40 transition-all flex flex-col justify-between shadow-md relative overflow-hidden min-w-0">
                {/* Subtle top accent line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[1.5px] ${
                    item.current
                      ? 'bg-gradient-to-r from-emerald-500 via-sky-500 to-transparent'
                      : 'bg-gradient-to-r from-sky-500/50 via-sky-500/20 to-transparent'
                  }`}
                />

                <div>
                  {/* Top Bar: Company Logo + Title + Current Tag */}
                  <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-white/[0.04]">
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-white p-0.5 flex items-center justify-center flex-shrink-0 shadow-sm border border-white/20">
                        <img
                          src={item.companyLogo}
                          alt={item.company}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xs sm:text-[13.5px] font-bold font-heading text-white truncate leading-tight">
                            {item.company}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 text-[10.5px]">
                          <span className="font-semibold text-sky-400 leading-tight">
                            {item.role}
                          </span>
                          <span className="text-gray-500 font-mono-tech text-[9.5px]">
                            &bull; {item.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {item.current && (
                      <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 text-[9.5px] font-mono-tech font-bold flex-shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Current</span>
                      </span>
                    )}
                  </div>

                  {/* Bullet Responsibilities from resume */}
                  <ul className="space-y-1 my-1.5">
                    {item.bullets.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="flex items-start space-x-2 text-[10.5px] sm:text-[11px] text-gray-300 leading-snug"
                      >
                        <span className="w-1 h-1 rounded-full bg-sky-400 flex-shrink-0 mt-1.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Chips */}
                <div className="pt-1.5 border-t border-white/[0.04] flex flex-wrap gap-1">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md text-[9px] font-mono-tech bg-white/[0.03] text-gray-300 border border-white/[0.05]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Visual Showcase Card — hidden on mobile to save space */}
              <div className="hidden md:flex flex-1 lg:max-w-xs xl:max-w-sm relative rounded-2xl overflow-hidden glass-panel border border-white/[0.08] flex-col justify-end group shadow-md min-h-[105px] lg:min-h-0 min-w-0">
                <img
                  src={item.visual.image}
                  alt={item.visual.caption}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Deep bottom gradient for ultra-crisp text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#02060A]/95 via-[#02060A]/55 to-black/20" />

                {/* Brand Overlay Content - High Visibility */}
                <div className="relative z-10 p-2.5 sm:p-3 space-y-1.5">
                  <div className="flex items-center">
                    {/* Clean white badge for client logos */}
                    <div className="flex items-center gap-2.5 bg-white/95 px-3 py-1.5 rounded-xl shadow-lg border border-white/40">
                      {item.clientLogos.map((logo, lIdx) => (
                        <img
                          key={lIdx}
                          src={logo}
                          alt="Client Logo"
                          className="h-5 sm:h-5.5 max-w-[80px] object-contain"
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs sm:text-[12.5px] font-bold text-white tracking-wide leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      {item.visual.caption}
                    </p>
                    <p className="text-[10px] text-sky-300 font-mono-tech truncate opacity-95 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                      {item.visual.subCaption}
                    </p>
                  </div>
                  <div className="w-10 h-[2px] bg-sky-400 shadow-[0_0_8px_#38bdf8] mt-0.5" />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* ── BOTTOM FOOTER BANNER ── */}
        <div className="relative rounded-xl overflow-hidden border border-white/[0.08] px-4 py-1.5 sm:px-5 sm:py-2 flex-shrink-0">
          <img
            src="/assets/projects/footer_mountain_road.jpg"
            alt="Mountain Road Panorama"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#02060A] via-[#02060A]/85 to-[#02060A]" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2">
            {/* Left Quote */}
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-[13px] italic font-medium text-white leading-tight">
                &ldquo;Every Experience Adds a New Mile to the Journey.&rdquo;
              </span>
              <div className="hidden md:block w-8 h-[1px] bg-sky-400/60" />
            </div>

            {/* Center Stats */}
            <div className="hidden lg:flex items-center gap-5 text-center">
              <div>
                <span className="text-xs font-bold text-white">6+</span>{' '}
                <span className="text-[9.5px] font-mono-tech text-gray-400">Features</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-700" />
              <div>
                <span className="text-xs font-bold text-white">10+</span>{' '}
                <span className="text-[9.5px] font-mono-tech text-gray-400">Global Stakeholders</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-700" />
              <div>
                <span className="text-xs font-bold text-white">3</span>{' '}
                <span className="text-[9.5px] font-mono-tech text-gray-400">Automotive Platforms</span>
              </div>
            </div>

            {/* Right CTA */}
            <button
              onClick={() => onNavigate('contact')}
              className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold tracking-wide shadow-md shadow-sky-600/30 transition-all cursor-pointer flex-shrink-0"
            >
              <span>Let's Build What's Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
