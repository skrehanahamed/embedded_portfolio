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
          className="relative rounded-b-2xl overflow-hidden p-3 sm:p-3.5 lg:py-2.5 2xl:py-3.5 lg:px-6 shrink-0 -mt-px shadow-lg"
          style={{
            background: isLight
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.82) 0%, rgba(248, 250, 252, 0.75) 100%)'
              : 'linear-gradient(135deg, rgba(8, 16, 26, 0.82) 0%, rgba(4, 9, 16, 0.88) 100%)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
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

          <div className="relative z-10 flex flex-col gap-1.5 lg:gap-2">
            {/* Top row: Clean, focused Section Header with Title on Left, Brand Tagline on Right */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex flex-col justify-start space-y-0.5 max-w-2xl lg:max-w-3xl">
                <div
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-mono-tech font-bold uppercase tracking-[0.22em] shadow-xs mb-0.5 w-fit"
                  style={{
                    background: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.06)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                  }}
                >
                  <span
                    style={{
                      color: isLight ? '#0284C7' : '#38BDF8',
                      textShadow: isLight ? '0 1px 2px rgba(0, 0, 0, 0.5)' : 'none',
                    }}
                  >
                    EXPERIENCE
                  </span>
                </div>

                <div className="flex flex-wrap items-baseline gap-x-2.5">
                  <h2
                    className={`text-lg sm:text-xl lg:text-2xl font-black font-heading leading-tight ${
                      isLight ? 'text-slate-950' : 'text-white'
                    }`}
                    style={{
                      textShadow: isLight
                        ? '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 12px rgba(255, 255, 255, 0.9)'
                        : '0 2px 8px rgba(0, 0, 0, 0.7)',
                    }}
                  >
                    My Professional{' '}
                    <span className={isLight ? 'text-sky-600' : 'text-sky-400'}>
                      Journey.
                    </span>
                  </h2>
                </div>

                <p
                  className={`hidden sm:block text-xs sm:text-[13px] ${
                    isLight ? 'text-slate-900 font-medium' : 'text-[#CAD5E2] font-normal'
                  } leading-snug line-clamp-1`}
                  style={{
                    textShadow: isLight ? '0 1px 2px rgba(255, 255, 255, 0.95)' : 'none',
                  }}
                >
                  A journey of continuous learning, real-world impact, and building smarter automotive & semiconductor experiences.
                </p>
              </div>

              {/* Right Tagline Block */}
              <div className="hidden md:flex flex-col items-end justify-center text-right space-y-0.5 relative z-10 pr-1 flex-shrink-0">
                <div
                  className={`flex items-center gap-1.5 text-[9.5px] sm:text-[10.5px] font-mono-tech tracking-widest ${isLight ? 'text-slate-900' : 'text-gray-200'} uppercase font-bold`}
                  style={{ textShadow: isLight ? '0 1px 2px rgba(255, 255, 255, 0.95)' : 'none' }}
                >
                  <span>DRIVE</span>
                  <span>•</span>
                  <span>DELIVER</span>
                  <span>•</span>
                  <span
                    className="font-black"
                    style={{
                      color: isLight ? '#0284C7' : '#38BDF8',
                      textShadow: isLight ? '0 1px 2px rgba(0, 0, 0, 0.6)' : 'none',
                    }}
                  >
                    INNOVATE
                  </span>
                  <span>•</span>
                  <span className={isLight ? 'text-slate-950 font-black' : 'text-white font-black'}>LEAD</span>
                </div>
                <div
                  className={`text-xs sm:text-[13.5px] font-heading italic font-black leading-tight ${isLight ? 'text-slate-950' : 'text-white drop-shadow-md'}`}
                  style={{
                    textShadow: isLight ? '0 1px 3px rgba(255, 255, 255, 0.95)' : 'none',
                  }}
                >
                  &ldquo;Different Roads. Same Passion.&rdquo;
                </div>
                <span
                  className="text-[9.5px] font-mono-tech font-black tracking-widest uppercase"
                  style={{
                    color: isLight ? '#0284C7' : '#38BDF8',
                    textShadow: isLight ? '0 1px 2px rgba(0, 0, 0, 0.6)' : 'none',
                  }}
                >
                  SK REHAN AHAMED
                </span>
              </div>
            </div>

            {/* Bottom Row: The 4 Experience Stats (Clean, borderless pills matching filter tabs) */}
            <div className="flex items-center overflow-x-auto gap-2 pt-1 pb-0.5 no-scrollbar w-full">
              {topStats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-[12.5px] 2xl:text-[13px] font-mono-tech transition-all duration-200 whitespace-nowrap shrink-0 border-0 flex items-center gap-2 ${
                    isLight
                      ? 'bg-white/90 text-slate-800 font-bold shadow-sm'
                      : 'bg-white/[0.06] text-gray-200 font-semibold'
                  }`}
                >
                  <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${
                    isLight ? 'text-sky-600' : 'text-sky-400'
                  }`}>
                    {stat.icon}
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className={`font-black font-heading leading-none ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}>
                      {stat.value}
                    </span>
                    <span className={`text-[10px] sm:text-[11px] font-medium leading-none ${
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
                        <span
                          className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono-tech font-bold flex-shrink-0 shadow-2xs"
                          style={{
                            backgroundColor: isLight ? '#DCFCE7' : 'rgba(6, 78, 59, 0.55)',
                            color: isLight ? '#15803D' : '#34D399',
                          }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
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

        {/* ══════════════════════════════════════════════════════
            DOWN PART: MOUNTAIN HIGHWAY FOOTER CARD
        ══════════════════════════════════════════════════════ */}
        <div
          className={`relative rounded-2xl overflow-hidden px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-4 shrink-0 shadow-lg ${
            isLight ? 'border border-slate-200/90' : 'border border-sky-500/30'
          }`}
          style={{
            background: isLight
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(248, 250, 252, 0.98) 100%)'
              : 'linear-gradient(135deg, rgba(5, 12, 20, 0.85) 0%, rgba(3, 7, 13, 0.95) 100%)',
          }}
        >
          {/* Mountain Highway Road Background */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img
              src={isLight ? "/assets/projects/footer_mountain_road_light.jpg" : "/assets/projects/footer_mountain_road.jpg"}
              alt="Mountain Highway Road"
              className={`w-full h-full object-cover object-[center_50%] ${
                isLight ? 'brightness-105 contrast-110 opacity-95' : 'brightness-100 contrast-110 opacity-70'
              }`}
              draggable={false}
              loading="lazy"
              decoding="async"
            />
            {/* Vignette so road & mountains shine while stats & action button stay crisp */}
            <div
              className={`absolute inset-0 ${
                isLight
                  ? 'bg-gradient-to-r from-white/95 via-white/85 to-white/95'
                  : 'bg-gradient-to-r from-black/95 via-black/85 to-[#03080F]/95'
              }`}
            />
          </div>

          {/* Left: Quote with Cyan Dash Underneath */}
          <div className="relative z-10 text-left">
            <p className={`font-heading italic text-xs sm:text-[14px] 2xl:text-[15px] font-black leading-snug drop-shadow-sm ${
              isLight ? 'text-slate-950' : 'text-white'
            }`}>
              &ldquo;Different roads.<br className="hidden sm:inline" /> Same passion.&rdquo;
            </p>
            <div className="w-8 h-[2px] bg-[#159FFF] mt-1 rounded-full shadow-[0_0_8px_#159FFF]" />
          </div>

          {/* Center: Clean Prominent Stats */}
          <div className="relative z-10 flex items-center space-x-5 sm:space-x-8 text-center">
            <div>
              <span className={`block text-sm sm:text-base 2xl:text-lg font-black font-heading leading-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                4+
              </span>
              <span className={`text-[8.5px] sm:text-[9.5px] font-mono-tech uppercase tracking-wider ${
                isLight ? 'text-slate-700 font-semibold' : 'text-gray-300'
              }`}>
                Years Experience
              </span>
            </div>
            <div className={`w-[1px] h-5 sm:h-6 ${isLight ? 'bg-slate-300' : 'bg-white/20'}`} />
            <div>
              <span className={`block text-sm sm:text-base 2xl:text-lg font-black font-heading leading-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                10+
              </span>
              <span className={`text-[8.5px] sm:text-[9.5px] font-mono-tech uppercase tracking-wider ${
                isLight ? 'text-slate-700 font-semibold' : 'text-gray-300'
              }`}>
                Global Stakeholders
              </span>
            </div>
            <div className={`w-[1px] h-5 sm:h-6 ${isLight ? 'bg-slate-300' : 'bg-white/20'}`} />
            <div>
              <span className="block text-sm sm:text-base 2xl:text-lg font-black font-heading text-sky-500 leading-tight">
                3
              </span>
              <span className={`text-[8.5px] sm:text-[9.5px] font-mono-tech uppercase tracking-wider ${
                isLight ? 'text-slate-700 font-semibold' : 'text-gray-300'
              }`}>
                Automotive Platforms
              </span>
            </div>
          </div>

          {/* Right: Action Button */}
          <div className="relative z-10 flex-shrink-0">
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-[12.5px] font-mono-tech font-bold transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-md text-white bg-sky-600 hover:bg-sky-500 shadow-sky-600/30 whitespace-nowrap"
            >
              <span>Let's Build What's Next</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
