import React from 'react';
import { Briefcase, Building2, Car, Code2, ArrowRight } from 'lucide-react';
import { experienceData } from '../data/experienceData';
import { useTheme } from '../context/ThemeContext';

interface ExperienceSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

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
      value: '3',
      label: 'Auto Platforms'
    },
    {
      icon: <Code2 className="w-3.5 h-3.5 text-sky-400" />,
      value: '6+',
      label: 'Production Feats'
    }
  ];

  return (
    <section
      id="experience"
      className={`relative w-full min-h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)] flex flex-col justify-between px-4 sm:px-6 lg:px-10 2xl:px-14 pb-2 sm:pb-3 select-none scroll-mt-16 border-t overflow-hidden transition-colors duration-300 ${
        isLight ? 'bg-[#F8FAFC] border-slate-200/80' : 'bg-[#020509] border-white/[0.04]'
      }`}
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
            background: isLight
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(248, 250, 252, 0.98) 100%)'
              : 'linear-gradient(135deg, rgba(8, 16, 26, 0.95) 0%, rgba(4, 9, 16, 0.98) 100%)',
            borderBottom: isLight ? '1px solid rgba(226, 232, 240, 0.95)' : '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          {/* Vehicle visual background - FULL SPAN with no visible seam or cut-off edge */}
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
            <img
              src={isLight ? "/assets/skills/car_rear_light.jpg" : "/assets/skills/car_rear.jpg"}
              alt="Automotive Experience Journey"
              className="w-full h-full object-cover object-right brightness-105 contrast-110"
              draggable={false}
            />
            {/* Seamless gradient mask - keeps vehicle clearly visible on the right while ensuring text readability on the left */}
            <div
              className={`absolute inset-0 pointer-events-none ${
                isLight
                  ? 'bg-gradient-to-r from-white/95 via-white/70 via-45% to-white/20'
                  : 'bg-gradient-to-r from-[#050C16]/95 via-[#050C16]/65 via-45% to-[#050C16]/20'
              }`}
            />
            <div
              className={`absolute inset-0 pointer-events-none ${
                isLight
                  ? 'bg-gradient-to-t from-white/80 via-transparent to-white/30'
                  : 'bg-gradient-to-t from-[#050C16]/80 via-transparent to-[#050C16]/30'
              }`}
            />
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
                <h2
                  className={`text-lg sm:text-xl lg:text-2xl font-black font-heading leading-tight ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                  style={{
                    textShadow: isLight
                      ? '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 12px rgba(255, 255, 255, 0.9)'
                      : '0 2px 8px rgba(0, 0, 0, 0.7)',
                  }}
                >
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
                <span
                  className={`inline-block text-[11px] sm:text-[12px] font-heading italic font-extrabold ${
                    isLight ? 'text-slate-950' : 'text-white drop-shadow-sm'
                  }`}
                  style={{
                    textShadow: isLight ? '0 1px 3px rgba(255, 255, 255, 0.95)' : 'none',
                  }}
                >
                  &ldquo;Different Roads. Same Passion.&rdquo;
                </span>
              </div>
              <p
                className={`text-[10.5px] lg:text-[11px] leading-snug line-clamp-1 ${
                  isLight ? 'text-slate-800 font-medium' : 'text-[#9BA8B5]'
                }`}
                style={{
                  textShadow: isLight ? '0 1px 2px rgba(255, 255, 255, 0.95)' : 'none',
                }}
              >
                A journey of continuous learning, real-world impact, and building smarter automotive & semiconductor experiences.
              </p>
            </div>

            {/* Lower: The 4 Experience Stats (Placed a little down on the left, leaving the car on the right 100% visible) */}
            <div className="flex items-center flex-wrap gap-2 pt-0.5">
              {topStats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl transition-colors shadow-sm ${
                    isLight
                      ? 'bg-white/95 border border-slate-200/90 hover:border-sky-500/50'
                      : 'bg-black/50 backdrop-blur-md border border-white/10 hover:border-sky-500/40'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 ${
                    isLight ? 'bg-sky-50 border border-sky-200' : 'bg-sky-950/80 border border-sky-500/30'
                  }`}>
                    {stat.icon}
                  </div>
                  <div className="flex items-baseline gap-1.5 min-w-0">
                    <span className={`text-xs font-black font-heading leading-none ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}>
                      {stat.value}
                    </span>
                    <span className={`text-[9px] font-medium leading-none whitespace-nowrap ${
                      isLight ? 'text-slate-600' : 'text-[#9BA8B5]'
                    }`}>
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── VERTICAL TIMELINE: 1 BY 1 ROW-BY-ROW (COMPACT & BALANCED) ── */}
        <div className="flex-1 min-h-0 flex flex-col justify-between gap-2.5 sm:gap-3 overflow-y-auto no-scrollbar pr-0.5">
          {experienceData.map((item, idx) => (
            <div
              key={item.id}
              className="flex flex-col lg:flex-row items-stretch gap-2.5 sm:gap-3 w-full flex-1 min-h-0"
            >
              {/* Left Timeline Year & Continuous Rail Node (Desktop) */}
              <div className="hidden lg:flex items-center justify-end gap-2.5 w-24 xl:w-28 shrink-0 relative select-none pr-1">
                {/* Continuous Vertical Rail Line */}
                <div
                  className={`absolute right-[7px] w-px pointer-events-none ${
                    isLight ? 'bg-sky-500/35' : 'bg-sky-400/35'
                  } ${
                    idx === 0
                      ? 'top-1/2 bottom-0'
                      : idx === experienceData.length - 1
                      ? 'top-0 bottom-1/2'
                      : 'top-0 bottom-0'
                  }`}
                />

                {/* Year and Period Text */}
                <div className="flex flex-col text-right">
                  <span className={`text-sm sm:text-base font-black font-heading tracking-wide leading-none ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    {item.period.split(' ')[0]}
                  </span>
                  <span
                    className={`text-[10px] font-mono-tech mt-1 leading-none ${
                      item.current
                        ? (isLight ? 'text-emerald-600 font-bold' : 'text-emerald-400 font-bold')
                        : (isLight ? 'text-slate-500' : 'text-gray-400')
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
              <div className={`flex-1 lg:flex-[1.4] rounded-2xl p-3 sm:p-3.5 border transition-all flex flex-col justify-between shadow-md relative overflow-hidden min-w-0 ${
                isLight
                  ? 'bg-white/95 border-slate-200/90 hover:border-sky-500/50 shadow-slate-900/5'
                  : 'glass-panel border-white/[0.07] hover:border-sky-500/40'
              }`}>
                {/* Subtle top accent line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] ${
                    item.current
                      ? 'bg-gradient-to-r from-emerald-500 via-sky-500 to-transparent'
                      : 'bg-gradient-to-r from-sky-500/60 via-sky-500/20 to-transparent'
                  }`}
                />

                <div>
                  {/* Top Bar: Company Logo + Title + Current Tag */}
                  <div className={`flex items-center justify-between gap-2 pb-2 border-b ${
                    isLight ? 'border-slate-100' : 'border-white/[0.04]'
                  }`}>
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-lg p-0.5 flex items-center justify-center flex-shrink-0 shadow-sm border ${
                        isLight ? 'bg-white border-slate-200' : 'bg-white border-white/20'
                      }`}>
                        <img
                          src={item.companyLogo}
                          alt={item.company}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className={`text-xs sm:text-[13.5px] font-bold font-heading truncate leading-tight ${
                            isLight ? 'text-slate-900' : 'text-white'
                          }`}>
                            {item.company}
                          </h3>
                          <span className={`text-[10px] font-heading font-bold px-2 py-0.5 rounded-md ${
                            isLight ? 'bg-sky-50 text-sky-800 border border-sky-200 shadow-xs' : 'bg-sky-950/70 text-sky-300 border border-sky-500/30'
                          }`}>
                            {item.clientText}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[10.5px]">
                          <span className={`font-bold leading-tight ${
                            isLight ? 'text-sky-700' : 'text-sky-400'
                          }`}>
                            {item.role}
                          </span>
                          <span className={`font-mono-tech text-[9.5px] ${
                            isLight ? 'text-slate-500' : 'text-gray-400'
                          }`}>
                            &bull; {item.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`lg:hidden text-[10px] font-mono-tech font-bold ${
                        isLight ? 'text-slate-600' : 'text-gray-400'
                      }`}>
                        {item.period.split(' ')[0]}
                      </span>
                      {item.current && (
                        <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 text-[9.5px] font-mono-tech font-bold flex-shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Current</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Mobile-Only Project Visual Strip (Guarantees AIDA R2 photo & name are NEVER vanished on mobile!) */}
                  <div className="block md:hidden mt-2 mb-1.5 rounded-xl overflow-hidden relative shadow-sm">
                    <div className="relative h-20 w-full overflow-hidden">
                      <img
                        src={item.visual.image}
                        alt={item.visual.caption}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/20" />
                      <div className="absolute inset-0 p-2 flex flex-col justify-between">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2 bg-white/95 px-2.5 py-1 rounded-md shadow-sm">
                            {item.clientLogos.map((logo, lIdx) => (
                              <img
                                key={lIdx}
                                src={logo}
                                alt="Client Logo"
                                className="h-3.5 max-w-[55px] object-contain"
                              />
                            ))}
                          </div>
                        </div>
                        <div>
                          <p
                            className="text-xs font-black leading-tight photo-caption-title"
                            style={{
                              color: '#FFFFFF',
                              textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(0, 0, 0, 0.9)',
                            }}
                          >
                            {item.visual.caption}
                          </p>
                          <p
                            className="text-[9.5px] font-mono-tech truncate font-bold photo-caption-sub"
                            style={{
                              color: '#38BDF8',
                              textShadow: '0 1px 4px rgba(0, 0, 0, 0.9)',
                            }}
                          >
                            {item.visual.subCaption}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bullet Responsibilities from resume */}
                  <ul className="space-y-1 my-1.5">
                    {item.bullets.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className={`flex items-start space-x-2 text-[10.5px] sm:text-[11px] leading-snug ${
                          isLight ? 'text-slate-700' : 'text-gray-300'
                        }`}
                      >
                        <span className="w-1 h-1 rounded-full bg-sky-500 flex-shrink-0 mt-1.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Chips */}
                <div className={`pt-1.5 border-t flex flex-wrap gap-1 ${
                  isLight ? 'border-slate-100' : 'border-white/[0.04]'
                }`}>
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className={`px-2 py-0.5 rounded-md text-[9px] font-mono-tech ${
                        isLight
                          ? 'bg-slate-100 text-slate-800 border border-slate-200/80 font-medium'
                          : 'bg-white/[0.03] text-gray-300 border border-white/[0.05]'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Desktop & Tablet Visual Showcase Card with guaranteed minimum height so photo & title NEVER vanish */}
              <div className={`hidden md:flex flex-1 lg:max-w-xs xl:max-w-sm relative rounded-2xl overflow-hidden flex-col justify-end group shadow-md min-h-[145px] lg:min-h-[145px] xl:min-h-[155px] min-w-0 border ${
                isLight ? 'border-slate-300/90 shadow-slate-900/5' : 'glass-panel border-white/[0.08]'
              }`}>
                <img
                  src={item.visual.image}
                  alt={item.visual.caption}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Deep multi-stop bottom gradient for 100% crisp text readability across all lighting */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/25 pointer-events-none" />

                {/* Brand Overlay Content - Clean, High Contrast & 100% Readable */}
                <div className="relative z-10 p-3 sm:p-3.5 space-y-2 w-full">
                  <div className="flex items-center">
                    {/* Clean white badge for client logos */}
                    <div className="flex items-center gap-2.5 bg-white/95 px-3 py-1.5 rounded-xl shadow-lg border border-white/60 backdrop-blur-md">
                      {item.clientLogos.map((logo, lIdx) => (
                        <img
                          key={lIdx}
                          src={logo}
                          alt="Client Logo"
                          className="h-4 sm:h-5 max-w-[80px] object-contain"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <p
                      className="text-xs sm:text-[13.5px] font-black tracking-wide leading-tight photo-caption-title"
                      style={{
                        color: '#FFFFFF',
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(0, 0, 0, 0.9)',
                      }}
                    >
                      {item.visual.caption}
                    </p>
                    <p
                      className="text-[10px] sm:text-[11px] font-mono-tech truncate font-bold photo-caption-sub"
                      style={{
                        color: '#38BDF8',
                        textShadow: '0 1px 4px rgba(0, 0, 0, 0.9)',
                      }}
                    >
                      {item.visual.subCaption}
                    </p>
                  </div>
                  <div className="w-10 h-[2.5px] bg-sky-400 shadow-[0_0_8px_#38bdf8] mt-0.5 rounded-full" />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* ── BOTTOM FOOTER BANNER ── */}
        <div className={`relative rounded-xl overflow-hidden px-4 py-1.5 sm:px-5 sm:py-2 flex-shrink-0 border ${
          isLight ? 'border-slate-200/90 shadow-sm' : 'border-white/[0.08]'
        }`}>
          <img
            src={isLight ? "/assets/projects/footer_mountain_road_light.jpg" : "/assets/projects/footer_mountain_road.jpg"}
            alt="Mountain Road Panorama"
            className={`absolute inset-0 w-full h-full object-cover ${isLight ? 'opacity-65 brightness-105 contrast-105' : 'opacity-40'}`}
          />
          <div className={`absolute inset-0 ${
            isLight
              ? 'bg-gradient-to-r from-white/90 via-white/60 to-white/90'
              : 'bg-gradient-to-r from-[#02060A]/90 via-[#02060A]/60 to-[#02060A]/90'
          }`} />

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
            {/* Left Quote */}
            <div className="flex items-center gap-3">
              <span
                className={`text-xs sm:text-[13px] italic font-black leading-tight ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}
                style={{
                  textShadow: isLight ? '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.85)' : 'none',
                }}
              >
                &ldquo;Every Experience Adds a New Mile to the Journey.&rdquo;
              </span>
              <div className="hidden md:block w-8 h-[1px] bg-sky-400/60" />
            </div>

            {/* Center Stats */}
            <div className="hidden lg:flex items-center gap-5 text-center">
              <div>
                <span
                  className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}
                  style={{ textShadow: isLight ? '0 1px 3px rgba(255, 255, 255, 0.95)' : 'none' }}
                >
                  6+
                </span>{' '}
                <span
                  className={`text-[9.5px] font-mono-tech ${isLight ? 'text-slate-800 font-bold' : 'text-gray-400'}`}
                  style={{ textShadow: isLight ? '0 1px 2px rgba(255, 255, 255, 0.95)' : 'none' }}
                >
                  Features
                </span>
              </div>
              <div className={`w-1 h-1 rounded-full ${isLight ? 'bg-slate-300' : 'bg-slate-700'}`} />
              <div>
                <span
                  className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}
                  style={{ textShadow: isLight ? '0 1px 3px rgba(255, 255, 255, 0.95)' : 'none' }}
                >
                  10+
                </span>{' '}
                <span
                  className={`text-[9.5px] font-mono-tech ${isLight ? 'text-slate-800 font-bold' : 'text-gray-400'}`}
                  style={{ textShadow: isLight ? '0 1px 2px rgba(255, 255, 255, 0.95)' : 'none' }}
                >
                  Global Stakeholders
                </span>
              </div>
              <div className={`w-1 h-1 rounded-full ${isLight ? 'bg-slate-300' : 'bg-slate-700'}`} />
              <div>
                <span
                  className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}
                  style={{ textShadow: isLight ? '0 1px 3px rgba(255, 255, 255, 0.95)' : 'none' }}
                >
                  3
                </span>{' '}
                <span
                  className={`text-[9.5px] font-mono-tech ${isLight ? 'text-slate-800 font-bold' : 'text-gray-400'}`}
                  style={{ textShadow: isLight ? '0 1px 2px rgba(255, 255, 255, 0.95)' : 'none' }}
                >
                  Automotive Platforms
                </span>
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
