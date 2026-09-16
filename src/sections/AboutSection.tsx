import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Cpu, Lightbulb, TrendingUp, Download } from 'lucide-react';

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

  return (
    <section
      id="about"
      className="relative w-full min-h-[calc(100vh-64px)] flex flex-col justify-center py-6 lg:py-8 px-6 md:px-12 bg-[#02060A] overflow-hidden border-t border-white/[0.03] scroll-mt-20"
    >
      {/* Subtle ambient background glow */}
      <div
        className="absolute -top-32 left-1/3 w-[600px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(21,159,255,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto w-full space-y-4 lg:space-y-5">

        {/* ══════════════════════════════════════════════════════
            TOP ROW: Portrait (left) | Bio + Darkened Highway Quote (right)
        ══════════════════════════════════════════════════════ */}
        <div
          ref={hero.ref}
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch"
          style={{
            opacity: hero.visible ? 1 : 0,
            transform: hero.visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.65s ease, transform 0.65s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* ── Portrait (left 3 cols) ── */}
          <div
            className="lg:col-span-3 relative rounded-2xl overflow-hidden group flex items-center justify-center bg-[#050B13]"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
              minHeight: 280,
              maxHeight: 320,
            }}
          >
            <img
              src="/assets/hero/image.png"
              alt="SK Rehan Ahamed"
              className="w-full h-full object-cover object-[center_12%] group-hover:scale-102 transition-transform duration-700"
              style={{ minHeight: 280, maxHeight: 320 }}
              draggable={false}
            />
            {/* dark gradient overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#02060A]/95 via-[#02060A]/20 to-transparent pointer-events-none" />

            {/* Italic quote overlay bottom-left */}
            <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
              <p
                className="font-heading italic text-white/95 text-[14px] leading-tight font-semibold"
                style={{ textShadow: '0 2px 14px rgba(0,0,0,0.9)' }}
              >
                Same Passion,<br />New Roads.
              </p>
            </div>

            {/* Corner tech reticle */}
            <div
              className="absolute top-3 right-3 w-4 h-4 opacity-60 pointer-events-none"
              style={{ borderTop: '2px solid #159FFF', borderRight: '2px solid #159FFF' }}
            />
          </div>

          {/* ── Same Portion: Bio (left) + Darkened Highway with Quote (right) (9 cols) ── */}
          <div
            className="lg:col-span-9 rounded-2xl relative overflow-hidden flex flex-col lg:flex-row items-stretch"
            style={{
              background: 'linear-gradient(135deg, rgba(8, 16, 26, 0.75) 0%, rgba(4, 9, 16, 0.85) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
              minHeight: 280,
              maxHeight: 320,
            }}
          >
            {/* Mountain highway scenic road background on the right side */}
            <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[48%] pointer-events-none overflow-hidden">
              <img
                src="/assets/about/mountain_highway.jpg"
                alt="Mountain Highway Road"
                className="w-full h-full object-cover object-right-bottom opacity-65"
                draggable={false}
              />
              {/* Fade masks so image dissolves seamlessly into dark background on the left */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#050C16] via-[#050C16]/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02060A]/95 via-transparent to-[#02060A]/40" />
            </div>

            {/* Bio portion (left ~60%) */}
            <div className="relative z-10 lg:w-[60%] p-6 sm:p-7 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-[2px] bg-[#159FFF] rounded-full" />
                <span className="font-mono-tech text-[10px] tracking-[0.25em] uppercase text-[#9BA8B5]">
                  ABOUT ME
                </span>
              </div>

              <h2 className="font-heading font-black text-[25px] sm:text-[30px] leading-[1.14] text-[#F4F7FA] mb-2.5">
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

              <p className="text-[#9BA8B5] text-[12.5px] sm:text-[13px] leading-[1.65] mb-2">
                I'm SK Rehan Ahamed, an Embedded C/C++ Developer with a strong focus on
                automotive infotainment and instrument cluster systems. I love building real-world
                solutions that blend software, hardware and user experience — especially in the
                automotive domain.
              </p>
              <p className="text-[#9BA8B5] text-[12.5px] sm:text-[13px] leading-[1.65] mb-3">
                From writing low-level code to creating intuitive HMI experiences, I enjoy solving
                complex problems and learning new technologies that make vehicles smarter and
                safer for the future.
              </p>

              <div className="flex items-center gap-2 text-[#9BA8B5] text-[12px]">
                <MapPin className="w-3.5 h-3.5 text-[#159FFF]" />
                <span>Bangalore, India</span>
              </div>
            </div>

            {/* Subtle vertical separator line */}
            <div className="hidden lg:block w-[1px] h-[65%] bg-white/[0.08] my-auto self-center z-10" />

            {/* Quote portion over the highway image (right ~40%) */}
            <div className="relative z-10 lg:w-[40%] p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <span className="font-serif text-[#159FFF] text-4xl leading-none font-bold block mb-2 opacity-95 select-none">
                  “
                </span>
                <p
                  className="font-heading italic text-[17px] sm:text-[19px] font-bold text-[#F4F7FA] leading-[1.3] drop-shadow-lg"
                  style={{ textShadow: '0 2px 14px rgba(0,0,0,0.85)' }}
                >
                  Better Vehicles.<br />Brighter Journeys.”
                </p>
              </div>

              <div className="pt-4">
                <div className="w-8 h-[2px] bg-[#159FFF] rounded-full mb-2 shadow-[0_0_8px_#159FFF]" />
                <p className="font-mono-tech text-[9.5px] tracking-[0.2em] text-[#9BA8B5] uppercase">
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
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch"
          style={{
            opacity: journey.visible ? 1 : 0,
            transform: journey.visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.65s ease 0.08s, transform 0.65s cubic-bezier(0.16,1,0.3,1) 0.08s',
          }}
        >
          {/* Left: Driven by Curiosity */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-[2px] bg-[#159FFF] rounded-full" />
              <span className="font-mono-tech text-[10px] tracking-[0.25em] uppercase text-[#9BA8B5]">
                MY JOURNEY
              </span>
            </div>
            <h3 className="font-heading font-black text-[23px] sm:text-[27px] leading-[1.15] text-[#F4F7FA] mb-2">
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
            <p className="text-[#9BA8B5] text-[12px] sm:text-[12.5px] leading-[1.65] mb-3">
              My journey in tech started with a simple curiosity — how things work. Over time, that
              curiosity turned into a passion for embedded systems and the automotive world. I've
              worked on real projects for global OEMs, contributed to features used in real vehicles,
              and continue to explore new tools and technologies to grow every day.
            </p>
            <a
              href="/assets/about/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-semibold text-[#F4F7FA] transition-all w-fit cursor-pointer group hover:scale-[1.03] active:scale-[0.97]"
              style={{
                background: 'rgba(21,159,255,0.08)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(21,159,255,0.3)',
                boxShadow: '0 4px 16px rgba(21,159,255,0.1)',
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 24px rgba(21,159,255,0.25)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(21,159,255,0.1)')}
            >
              <Download className="w-3.5 h-3.5 text-[#159FFF] group-hover:translate-y-0.5 transition-transform" />
              Download Resume
            </a>
          </div>

          {/* Right: 3 Proper Glass Trait Cards matching reference */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5 items-stretch">
            {journeyCards.map((c, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden p-3.5 sm:p-4 flex flex-col justify-between gap-3 group transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(135deg, rgba(8, 16, 26, 0.7) 0%, rgba(4, 9, 16, 0.8) 100%)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.35)',
                  transitionDelay: `${i * 60}ms`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(21, 159, 255, 0.35)';
                  e.currentTarget.style.boxShadow = '0 12px 36px 0 rgba(21, 159, 255, 0.14)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.35)';
                }}
              >
                {/* Visual Image Header */}
                <div className="relative w-full h-20 rounded-xl overflow-hidden bg-[#03070D]">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    draggable={false}
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040910] via-transparent to-transparent opacity-80 pointer-events-none" />

                  {/* Floating glass icon badge */}
                  <div className="absolute top-2 left-2 w-7 h-7 rounded-lg bg-[#02060A]/80 backdrop-blur-md border border-[#159FFF]/30 flex items-center justify-center shadow-md">
                    {c.icon}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <p className="font-heading font-bold text-[14px] text-[#F4F7FA] mb-1 group-hover:text-[#159FFF] transition-colors">
                    {c.title}
                  </p>
                  <p className="text-[#9BA8B5] text-[11.5px] leading-relaxed">
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
          className="rounded-2xl px-5 sm:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{
            background: 'linear-gradient(135deg, rgba(8, 16, 26, 0.65) 0%, rgba(4, 9, 16, 0.75) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.35)',
            opacity: tech.visible ? 1 : 0,
            transform: tech.visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
          }}
        >
          {/* Left: Section Label */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-5 h-[2px] bg-[#159FFF] rounded-full" />
            <span className="font-mono-tech text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-[#9BA8B5] font-semibold whitespace-nowrap">
              TECH I WORK WITH
            </span>
          </div>

          {/* Center: Smooth Sliding Logo Marquee */}
          <div className="flex-1 w-full md:w-auto relative overflow-hidden py-1 px-4">
            {/* Fade masks at edges for seamless loop */}
            <div
              className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to right, rgba(6,12,20,0.9), transparent)' }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to left, rgba(6,12,20,0.9), transparent)' }}
            />

            <div
              className="flex gap-7 items-center"
              style={{
                animation: 'marquee 36s linear infinite',
                width: 'max-content',
              }}
            >
              {[...TECH, ...TECH].map((t, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center flex-shrink-0 group cursor-pointer relative py-1"
                  title={t.name}
                >
                  <img
                    src={t.src}
                    alt={t.name}
                    className="h-6 sm:h-7 w-auto max-w-[64px] object-contain opacity-85 group-hover:opacity-100 group-hover:scale-115 transition-all duration-200"
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
          <span className="font-mono-tech text-[10px] text-[#9BA8B5]/60 italic whitespace-nowrap flex-shrink-0">
            and more ...
          </span>
        </div>

      </div>


    </section>
  );
};
