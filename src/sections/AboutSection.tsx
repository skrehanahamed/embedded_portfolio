import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Cpu, Lightbulb, TrendingUp, Download } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/* ── intersection-observer fade-in hook ── */
function useFadeIn(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── tech logo list (from resume) ── */
const TECH: { name: string; src: string }[] = [
  { name: 'Embedded C',      src: '/assets/logos/c.svg'              },
  { name: 'C++11/14',        src: '/assets/logos/cpp.svg'            },
  { name: 'Python',          src: '/assets/logos/python.svg'         },
  { name: 'AUTOSAR',         src: '/assets/logos/autosar.svg'        },
  { name: 'Vector',          src: '/assets/logos/vector.svg'         },
  { name: 'CANoe',           src: '/assets/logos/canoe.svg'          },
  { name: 'Trace32',         src: '/assets/logos/trace32.svg'        },
  { name: 'Qt / QML',        src: '/assets/logos/qt.svg'             },
  { name: 'Android',         src: '/assets/logos/android.svg'        },
  { name: 'Linux / RTOS',    src: '/assets/logos/linux.svg'          },
  { name: 'Qualcomm',        src: '/assets/logos/qualcomm.svg'       },
  { name: 'Bazel',           src: '/assets/logos/bazel.svg'          },
  { name: 'CMake',           src: '/assets/logos/cmake.svg'          },
  { name: 'Docker',          src: '/assets/logos/docker.svg'         },
  { name: 'Git',             src: '/assets/logos/git.svg'            },
  { name: 'GitHub',          src: '/assets/logos/github.svg'         },
  { name: 'Jenkins',         src: '/assets/logos/jenkins.svg'        },
  { name: 'Robot Framework', src: '/assets/logos/robotframework.svg' },
  { name: 'Infineon',        src: '/assets/logos/infineon.svg'       },
  { name: 'Renesas',         src: '/assets/logos/renesas.svg'        },
  { name: 'Bash',            src: '/assets/logos/bash.svg'           },
  { name: 'VS Code',         src: '/assets/logos/vscode.svg'         },
];

interface AboutSectionProps {
  onNavigate?: (id: string) => void;
}

/* ─────────────────────────────────────────────
   ABOUT SECTION
───────────────────────────────────────────── */
export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate: _onNavigate }) => {
  const hero    = useFadeIn(0.08);
  const journey = useFadeIn(0.08);
  const tech    = useFadeIn(0.08);

  const journeyCards = [
    {
      image: '/assets/about/trait_semiconductor.jpg',
      icon: <Cpu className="w-4 h-4 text-[#159FFF]" />,
      title: 'Auto & Semiconductor',
      desc: 'Expertise bridging automotive embedded software (IVI, clusters) with semiconductor silicon validation and firmware.',
    },
    {
      image: '/assets/about/trait_problem_solver.jpg',
      icon: <Lightbulb className="w-4 h-4 text-[#159FFF]" />,
      title: 'Problem Solver',
      desc: 'Breaking down complex low-level engineering challenges and crafting clean, robust C/C++ solutions.',
    },
    {
      image: '/assets/about/trait_future_ready.jpg',
      icon: <TrendingUp className="w-4 h-4 text-[#159FFF]" />,
      title: 'Future Ready',
      desc: 'Continuously mastering cutting-edge automotive standards, modern tooling, and connected SDV technologies.',
    },
  ];

  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section
      id="about"
      className={`relative w-full min-h-[calc(100vh-64px)] flex flex-col justify-center py-4 lg:py-5 2xl:py-6 px-6 md:px-10 lg:px-12 2xl:px-14 overflow-hidden border-t scroll-mt-20 transition-colors duration-300 ${
        isLight ? 'bg-[#F8FAFC] border-slate-200/80' : 'bg-[#02060A] border-white/[0.03]'
      }`}
    >
      {/* Subtle ambient background glow */}
      <div
        className="absolute -top-32 left-1/3 w-[600px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(21,159,255,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl xl:max-w-[1380px] 2xl:max-w-[1520px] mx-auto w-full space-y-3 lg:space-y-3.5 2xl:space-y-4">

        {/* ══════════════════════════════════════════════════════
            TOP ROW: Portrait (left) | Bio + Mountain Highway Quote (right)
        ══════════════════════════════════════════════════════ */}
        <div
          ref={hero.ref}
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-4.5 2xl:gap-5 items-stretch"
          style={{
            opacity: hero.visible ? 1 : 0,
            transform: hero.visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.65s ease, transform 0.65s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* ── Portrait (left 3 cols) ── */}
          <div
            className={`lg:col-span-3 relative rounded-2xl overflow-hidden group flex items-center justify-center min-h-[240px] sm:min-h-[260px] lg:min-h-[270px] 2xl:min-h-[295px] max-h-[310px] ${
              isLight ? 'bg-white' : 'bg-[#050B13]'
            }`}
            style={{
              background: isLight
                ? 'rgba(255, 255, 255, 0.92)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
              backdropFilter: 'blur(20px)',
              border: isLight ? '1px solid rgba(203, 213, 225, 0.85)' : '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: isLight ? '0 8px 32px 0 rgba(15, 23, 42, 0.06)' : '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
            }}
          >
            <img
              src="/assets/hero/image.png"
              alt="SK Rehan Ahamed"
              className="w-full h-full object-cover object-[center_12%] group-hover:scale-102 transition-transform duration-700 min-h-[240px] sm:min-h-[260px] lg:min-h-[270px] 2xl:min-h-[295px] max-h-[310px]"
              draggable={false}
            />
            {/* gradient overlay at bottom for quote readability */}
            <div
              className={`absolute inset-0 pointer-events-none ${
                isLight
                  ? 'bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent'
                  : 'bg-gradient-to-t from-[#02060A]/95 via-[#02060A]/20 to-transparent'
              }`}
            />

            {/* Italic quote overlay bottom-left */}
            <div className="absolute bottom-3 left-3.5 2xl:bottom-4 2xl:left-4 z-10 pointer-events-none">
              <p
                className="font-heading italic text-white/95 text-[13px] 2xl:text-[14px] leading-tight font-semibold"
                style={{ textShadow: '0 2px 14px rgba(0,0,0,0.9)' }}
              >
                Same Passion,<br />New Roads.
              </p>
            </div>

            {/* Corner tech reticle */}
            <div
              className="absolute top-2.5 right-2.5 w-3.5 h-3.5 opacity-60 pointer-events-none"
              style={{ borderTop: '2px solid #159FFF', borderRight: '2px solid #159FFF' }}
            />
          </div>

          {/* ── Same Portion: Bio (left) + Mountain Highway with Quote (right) (9 cols) ── */}
          <div
            className="lg:col-span-9 rounded-2xl relative overflow-hidden flex flex-col lg:flex-row items-stretch min-h-[240px] sm:min-h-[260px] lg:min-h-[270px] 2xl:min-h-[295px] max-h-[310px]"
            style={{
              background: isLight
                ? 'rgba(255, 255, 255, 0.94)'
                : 'linear-gradient(135deg, rgba(8, 16, 26, 0.75) 0%, rgba(4, 9, 16, 0.85) 100%)',
              backdropFilter: 'blur(20px)',
              border: isLight ? '1px solid rgba(203, 213, 225, 0.85)' : '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: isLight ? '0 8px 32px 0 rgba(15, 23, 42, 0.06)' : '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
            }}
          >
            {/* Mountain highway scenic road background on the right side */}
            <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[50%] pointer-events-none overflow-hidden">
              <img
                src={isLight ? "/assets/about/mountain_highway_light.jpg" : "/assets/about/mountain_highway.jpg"}
                alt="Mountain Highway Road"
                className={`w-full h-full object-cover object-right-bottom ${isLight ? 'opacity-100 contrast-110 saturate-110' : 'opacity-85'}`}
                draggable={false}
              />
              {/* Soft fade masks so image dissolves naturally into background on the left and protects quote text */}
              <div
                className={`absolute inset-0 pointer-events-none ${
                  isLight
                    ? 'bg-gradient-to-r from-white via-white/40 via-30% to-transparent'
                    : 'bg-gradient-to-r from-[#050C16] via-[#050C16]/50 via-30% to-[#050C16]/15'
                }`}
              />
              <div
                className={`absolute inset-0 pointer-events-none ${
                  isLight
                    ? 'bg-gradient-to-t from-white/60 via-transparent to-transparent'
                    : 'bg-gradient-to-t from-[#02060A]/85 via-transparent to-[#02060A]/30'
                }`}
              />
            </div>

            {/* Bio portion (left ~60%) */}
            <div className="relative z-10 lg:w-[60%] p-5 sm:p-5.5 2xl:p-6 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-4 h-[2px] bg-[#159FFF] rounded-full" />
                <span className={`font-mono-tech text-[9.5px] 2xl:text-[10px] tracking-[0.25em] uppercase font-semibold ${
                  isLight ? 'text-slate-500' : 'text-[#9BA8B5]'
                }`}>
                  ABOUT ME
                </span>
              </div>

              <h2 className={`font-heading font-black text-[22px] sm:text-[25px] 2xl:text-[28px] leading-[1.14] mb-2 ${
                isLight ? 'text-slate-900' : 'text-[#F4F7FA]'
              }`}>
                Turning Ideas<br />
                Into{' '}
                <span
                  style={{
                    background: 'linear-gradient(90deg,#4FC3FF 0%,#159FFF 55%,#0077CC 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Smarter Experiences
                </span>
              </h2>

              <p className={`text-[11.5px] sm:text-[12px] 2xl:text-[12.5px] leading-[1.55] 2xl:leading-[1.6] mb-1.5 ${
                isLight ? 'text-slate-700 font-medium' : 'text-[#9BA8B5]'
              }`}>
                I'm SK Rehan Ahamed, an Embedded C/C++ Developer with a strong focus on
                Automotive Software, Infotainment Systems, and Cluster Applications. I build
                production-grade, reliable embedded software that makes connected mobility smarter and
                safer for the future.
              </p>
              <p className={`text-[11.5px] sm:text-[12px] 2xl:text-[12.5px] leading-[1.55] 2xl:leading-[1.6] mb-2.5 ${
                isLight ? 'text-slate-700 font-medium' : 'text-[#9BA8B5]'
              }`}>
                From writing low-level code to creating intuitive HMI experiences, I enjoy solving
                complex problems and learning new technologies that make vehicles smarter and
                safer for the future.
              </p>

              <div className={`flex items-center gap-1.5 text-[11px] 2xl:text-[12px] ${
                isLight ? 'text-slate-700 font-medium' : 'text-[#9BA8B5]'
              }`}>
                <MapPin className="w-3.5 h-3.5 text-[#159FFF]" />
                <span>Bangalore, India</span>
              </div>
            </div>

            {/* Subtle vertical separator line */}
            <div className={`hidden lg:block w-[1px] h-[65%] my-auto self-center z-10 ${
              isLight ? 'bg-slate-200' : 'bg-white/[0.08]'
            }`} />

            {/* Quote portion over the highway image (right ~40%) */}
            <div className="relative z-10 lg:w-[40%] p-5 sm:p-5.5 2xl:p-6 flex flex-col justify-between">
              <div>
                <span className="font-serif text-[#159FFF] text-3xl 2xl:text-4xl leading-none font-bold block mb-1.5 opacity-95 select-none">
                  “
                </span>
                <p
                  className={`font-heading italic text-[16px] sm:text-[17.5px] 2xl:text-[19px] font-black leading-[1.28] ${
                    isLight ? 'text-slate-950' : 'text-[#F4F7FA] drop-shadow-lg'
                  }`}
                  style={{
                    textShadow: isLight
                      ? '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 12px rgba(255, 255, 255, 0.9)'
                      : '0 2px 14px rgba(0, 0, 0, 0.85)',
                  }}
                >
                  Better Vehicles.<br />Brighter Journeys.”
                </p>
              </div>

              <div className="pt-3">
                <div className="w-7 h-[2px] bg-[#159FFF] rounded-full mb-1.5 shadow-[0_0_8px_#159FFF]" />
                <p
                  className={`font-mono-tech text-[9px] 2xl:text-[10px] tracking-[0.2em] uppercase font-bold ${
                    isLight ? 'text-slate-900' : 'text-[#CAD5E2]'
                  }`}
                  style={{
                    textShadow: isLight ? '0 1px 2px rgba(255, 255, 255, 0.95)' : 'none',
                  }}
                >
                  SK REHAN AHAMED
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            MY JOURNEY SECTION: Left intro | Right 3 Glass Trait Cards
        ══════════════════════════════════════════════════════ */}
        <div
          ref={journey.ref}
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-4.5 2xl:gap-5 items-stretch"
          style={{
            opacity: journey.visible ? 1 : 0,
            transform: journey.visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.65s ease 0.08s, transform 0.65s cubic-bezier(0.16,1,0.3,1) 0.08s',
          }}
        >
          {/* Left: Driven by Curiosity */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-4 h-[2px] bg-[#159FFF] rounded-full" />
              <span className="font-mono-tech text-[9.5px] 2xl:text-[10px] tracking-[0.25em] uppercase text-[#9BA8B5]">
                MY JOURNEY
              </span>
            </div>
            <h3 className="font-heading font-black text-[20px] sm:text-[23px] 2xl:text-[25px] leading-[1.15] text-[#F4F7FA] mb-1.5 2xl:mb-2">
              Driven by<br />
              <span
                style={{
                  background: 'linear-gradient(90deg,#4FC3FF,#159FFF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Curiosity
              </span>
            </h3>
            <p className={`text-[11px] sm:text-[11.5px] 2xl:text-[12px] leading-[1.55] 2xl:leading-[1.6] mb-2.5 2xl:mb-3 ${
              isLight ? 'text-slate-600' : 'text-[#9BA8B5]'
            }`}>
              My journey in tech started with a simple curiosity — how things work. Over time, that
              curiosity turned into a passion for embedded systems and the automotive world. I've
              worked on real projects for global OEMs, contributed to features used in real vehicles,
              and continue to explore new tools and technologies to grow every day.
            </p>
            <a
              href="/SK_Rehan_Ahamed_Resume.pdf"
              download="SK_Rehan_Ahamed_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 2xl:px-4 2xl:py-2 rounded-xl text-[11px] 2xl:text-[12px] font-semibold transition-all w-fit cursor-pointer group hover:scale-[1.03] active:scale-[0.97] ${
                isLight ? 'text-slate-800' : 'text-[#F4F7FA]'
              }`}
              style={{
                background: isLight ? 'rgba(2,132,199,0.08)' : 'rgba(21,159,255,0.08)',
                backdropFilter: 'blur(12px)',
                border: isLight ? '1px solid rgba(2,132,199,0.3)' : '1px solid rgba(21,159,255,0.3)',
                boxShadow: isLight ? '0 4px 16px rgba(2,132,199,0.08)' : '0 4px 16px rgba(21,159,255,0.1)',
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 24px rgba(21,159,255,0.25)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = isLight ? '0 4px 16px rgba(2,132,199,0.08)' : '0 4px 16px rgba(21,159,255,0.1)')}
            >
              <Download className="w-3.5 h-3.5 text-[#159FFF] group-hover:translate-y-0.5 transition-transform" />
              Download Resume
            </a>
          </div>

          {/* Right: 3 Proper Glass Trait Cards matching reference */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3 2xl:gap-3.5 items-stretch">
            {journeyCards.map((c, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden p-3 sm:p-3.5 2xl:p-3.5 flex flex-col justify-between gap-2 2xl:gap-2.5 group transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: isLight
                    ? 'rgba(255, 255, 255, 0.94)'
                    : 'linear-gradient(135deg, rgba(8, 16, 26, 0.7) 0%, rgba(4, 9, 16, 0.8) 100%)',
                  backdropFilter: 'blur(16px)',
                  border: isLight ? '1px solid rgba(203, 213, 225, 0.85)' : '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: isLight ? '0 8px 30px 0 rgba(15, 23, 42, 0.06)' : '0 8px 32px 0 rgba(0, 0, 0, 0.35)',
                  transitionDelay: `${i * 60}ms`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(21, 159, 255, 0.35)';
                  e.currentTarget.style.boxShadow = '0 12px 36px 0 rgba(21, 159, 255, 0.14)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = isLight ? 'rgba(203, 213, 225, 0.85)' : 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.boxShadow = isLight ? '0 8px 30px 0 rgba(15, 23, 42, 0.06)' : '0 8px 32px 0 rgba(0, 0, 0, 0.35)';
                }}
              >
                {/* Visual Image Header */}
                <div className={`relative w-full h-16 sm:h-17 2xl:h-19 rounded-xl overflow-hidden ${
                  isLight ? 'bg-slate-100' : 'bg-[#03070D]'
                }`}>
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    draggable={false}
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className={`absolute inset-0 pointer-events-none ${
                    isLight
                      ? 'bg-gradient-to-t from-slate-900/35 via-transparent to-transparent'
                      : 'bg-gradient-to-t from-[#040910] via-transparent to-transparent opacity-80'
                  }`} />

                  {/* Floating glass icon badge */}
                  <div className={`absolute top-2 left-2 w-6 h-6 2xl:w-6.5 2xl:h-6.5 rounded-lg backdrop-blur-md flex items-center justify-center shadow-md ${
                    isLight
                      ? 'bg-white/95 border border-sky-400/40 text-sky-600'
                      : 'bg-[#02060A]/80 border border-[#159FFF]/30'
                  }`}>
                    {c.icon}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <p className={`font-heading font-bold text-[12.5px] 2xl:text-[13.5px] mb-0.5 group-hover:text-[#159FFF] transition-colors ${
                    isLight ? 'text-slate-900' : 'text-[#F4F7FA]'
                  }`}>
                    {c.title}
                  </p>
                  <p className={`text-[10.5px] 2xl:text-[11px] leading-relaxed ${
                    isLight ? 'text-slate-700 font-medium' : 'text-[#9BA8B5]'
                  }`}>
                    {c.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            TECH I WORK WITH: Single Proper Glass Bar with Smooth Sliding Marquee
        ══════════════════════════════════════════════════════ */}
        <div
          ref={tech.ref}
          className="rounded-2xl px-4 sm:px-5 2xl:px-6 py-2 2xl:py-2.5 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{
            background: isLight
              ? 'rgba(255, 255, 255, 0.94)'
              : 'linear-gradient(135deg, rgba(8, 16, 26, 0.65) 0%, rgba(4, 9, 16, 0.75) 100%)',
            backdropFilter: 'blur(20px)',
            border: isLight ? '1px solid rgba(203, 213, 225, 0.85)' : '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: isLight ? '0 8px 32px 0 rgba(15, 23, 42, 0.06)' : '0 8px 32px 0 rgba(0, 0, 0, 0.35)',
            opacity: tech.visible ? 1 : 0,
            transform: tech.visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
          }}
        >
          {/* Left: Section Label */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-4 h-[2px] bg-[#159FFF] rounded-full" />
            <span className={`font-mono-tech text-[9.5px] sm:text-[10px] 2xl:text-[10.5px] tracking-[0.22em] uppercase font-semibold whitespace-nowrap ${
              isLight ? 'text-slate-600' : 'text-[#9BA8B5]'
            }`}>
              TECH I WORK WITH
            </span>
          </div>

          {/* Center: Smooth Sliding Logo Marquee */}
          <div className="flex-1 w-full md:w-auto relative overflow-hidden py-0.5 px-3">
            {/* Fade masks at edges for seamless loop */}
            <div
              className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
              style={{
                background: isLight
                  ? 'linear-gradient(to right, rgba(255,255,255,0.95), transparent)'
                  : 'linear-gradient(to right, rgba(6,12,20,0.9), transparent)',
              }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
              style={{
                background: isLight
                  ? 'linear-gradient(to left, rgba(255,255,255,0.95), transparent)'
                  : 'linear-gradient(to left, rgba(6,12,20,0.9), transparent)',
              }}
            />

            <div
              className="flex gap-6 2xl:gap-7 items-center"
              style={{
                animation: 'marquee 36s linear infinite',
                width: 'max-content',
              }}
            >
              {[...TECH, ...TECH].map((t, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center flex-shrink-0 group cursor-pointer relative py-0.5"
                  title={t.name}
                >
                  <img
                    src={t.src}
                    alt={t.name}
                    className="h-5 sm:h-5.5 2xl:h-6 w-auto max-w-[56px] 2xl:max-w-[62px] object-contain opacity-85 group-hover:opacity-100 group-hover:scale-115 transition-all duration-200"
                    draggable={false}
                  />
                  {/* Hover tooltip */}
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-none px-2 py-0.5 rounded bg-[#081421] border border-[#159FFF]/30 text-[9px] font-mono-tech text-[#159FFF] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-30 shadow-lg">
                    {t.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: and more ... */}
          <span className="font-mono-tech text-[9.5px] 2xl:text-[10px] text-[#9BA8B5]/60 italic whitespace-nowrap flex-shrink-0">
            and more ...
          </span>
        </div>

      </div>


    </section>
  );
};
