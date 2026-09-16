import React, { useState, useEffect, useRef } from "react";
import { Shield, Layers, Building2, Cpu, Play, ArrowRight, Globe, X, Compass } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   COUNT-UP HOOK  (easeOutExpo, staggered delay)
───────────────────────────────────────────────────────────── */
function useCountUp(target: number, delay = 300) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    const duration = 1400;
    const id = setTimeout(() => {
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        setValue(Math.round(eased * target));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => { clearTimeout(id); cancelAnimationFrame(raf); };
  }, [target, delay]);
  return value;
}

/* ─────────────────────────────────────────────────────────────
   SHOOTING STARS  — canvas confined to top 45% (sky region)
───────────────────────────────────────────────────────────── */
const ShootingStars: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Star = {
      x: number; y: number;
      len: number;          // trail length px
      speed: number;        // px per frame
      angle: number;        // radians (mostly diagonal)
      alpha: number;        // current opacity
      life: number;         // 0→1
      maxLife: number;      // total frames
      active: boolean;
    };

    const MAX = 5;
    const mkStar = (): Star => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.5,   // sky top-half only
      len: Math.random() * 90 + 50,
      speed: Math.random() * 3.5 + 2.5,
      angle: (Math.PI / 180) * (30 + Math.random() * 20), // 30–50° downward
      alpha: 0,
      life: 0,
      maxLife: Math.floor(Math.random() * 55 + 45),
      active: true,
    });

    const stars: Star[] = [];
    // Stagger initial spawns so they don't all fire at once
    let spawnTimer = 0;
    const SPAWN_INTERVAL = 90; // frames between new stars

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      spawnTimer++;
      if (spawnTimer >= SPAWN_INTERVAL && stars.filter(s => s.active).length < MAX) {
        stars.push(mkStar());
        spawnTimer = 0;
      }

      stars.forEach((s, i) => {
        if (!s.active) return;
        s.life++;
        const progress = s.life / s.maxLife;

        // Fade in first 20%, fade out last 25%
        if (progress < 0.2)       s.alpha = progress / 0.2;
        else if (progress > 0.75) s.alpha = (1 - progress) / 0.25;
        else                      s.alpha = 1;

        // Move along angle
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;

        // Draw trail gradient
        const tailX = s.x - Math.cos(s.angle) * s.len;
        const tailY = s.y - Math.sin(s.angle) * s.len;
        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(0.6, `rgba(200,230,255,${s.alpha * 0.35})`);
        grad.addColorStop(1, `rgba(255,255,255,${s.alpha * 0.9})`);

        ctx.save();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        // Bright head dot
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha * 0.95})`;
        ctx.fill();
        ctx.restore();

        if (s.life >= s.maxLife) {
          stars.splice(i, 1);
          spawnTimer = SPAWN_INTERVAL - 15; // spawn next soon
        }
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  // Only covers the sky region: top-left where clouds actually are
  return (
    <canvas
      ref={canvasRef}
      className="absolute left-0 top-0 pointer-events-none z-[2]"
      style={{ width: "55%", height: "38%" }}
    />
  );
};



/* ─────────────────────────────────────────────────────────────
   MAIN HERO SECTION
───────────────────────────────────────────────────────────── */
interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  /* mount trigger */
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  /* GPU parallax via CSS vars + rAF LERP */
  useEffect(() => {
    let raf: number, tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const loop = () => {
      cx += (tx - cx) * 0.055;
      cy += (ty - cy) * 0.055;
      heroRef.current?.style.setProperty("--mx", cx.toFixed(4));
      heroRef.current?.style.setProperty("--my", cy.toFixed(4));
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  const domains = ["AUTOSAR", "HMI / IVI", "INSTRUMENT CLUSTER", "VEHICLE NETWORKS", "DIAGNOSTICS", "VALIDATION & TESTING"];

  const yearsCount    = useCountUp(4,  380);
  const projectsCount = useCountUp(5,  540);
  const companiesCount= useCountUp(3,  700);

  const stats = [
    { icon: Shield,   value: `${yearsCount}+`,   label: "Years Experience", section: "experience" },
    { icon: Layers,   value: `${projectsCount}+`, label: "Projects Worked",  section: "projects"   },
    { icon: Building2,value: `${companiesCount}`, label: "Companies",        section: "experience" },
    { icon: Cpu,      value: "Auto & Semi",        label: "Domain Focus",    section: "skills"     },
  ];

  /* stagger helper */
  const fadeIn = (delay: number, extra = "") =>
    ({
      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0)" : "translateY(18px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms${extra ? `, ${extra}` : ""}`,
    } as React.CSSProperties);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative w-full h-screen min-h-[700px] flex flex-col overflow-hidden bg-[#02070D] select-none"
      style={{ "--mx": "0", "--my": "0" } as React.CSSProperties}
    >
      {/* ── BACKGROUND: parallax image ── */}
      <div
        className="absolute inset-0 w-full h-full z-0 pointer-events-none will-change-transform"
        style={{ transform: "translate3d(calc(var(--mx)*-10px),calc(var(--my)*-6px),0) scale(1.05)" }}
      >
        <img
          src="/assets/hero/hero_home_bg.png"
          alt="Cinematic Automotive Background"
          className="w-full h-full object-cover object-center"
          draggable={false}
        />
      </div>

      {/* ── VIGNETTES ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-[#02070D]/80 via-transparent to-[#02070D]/88" />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-r from-[#02070D]/78 via-transparent to-[#02070D]/18" />

      {/* ── SHOOTING STARS (sky region only) ── */}
      <ShootingStars />

      {/* ── NAVBAR SPACER ── */}
      <div className="h-[72px] flex-shrink-0 z-10" />

      {/* ════════ MAIN LAYOUT ════════ */}
      <div className="relative z-10 flex-1 flex flex-col max-w-[1400px] mx-auto w-full px-6 md:px-10 lg:px-14">

        {/* UPPER ROW */}
        <div className="flex items-start justify-between gap-4 pt-3 flex-1">

          {/* ── LEFT COPY ── */}
          <div
            className="flex flex-col items-start text-left max-w-[430px] xl:max-w-[470px] will-change-transform"
            style={{
              transform: `translate3d(calc(var(--mx)*-3px),calc(var(--my)*-2px),0)`,
              ...fadeIn(0, "transform 0.2s cubic-bezier(0.16,1,0.3,1)"),
            }}
          >
            {/* Tagline with animated cursor */}
            <div style={fadeIn(60)} className="flex items-center gap-2 font-mono-tech text-[10.5px] tracking-[0.22em] uppercase font-semibold text-slate-400 mt-1">
              <span className="text-[#159FFF] font-black">//</span>
              <span>AUTOMOTIVE SOFTWARE ENGINEER</span>
              <span className="w-[6px] h-[13px] bg-[#159FFF] opacity-80" style={{ animation: "blink 1.1s step-end infinite" }} />
            </div>

            {/* Heading */}
            <div style={fadeIn(140)}>
              <h1
                className="font-heading font-black text-[40px] sm:text-[50px] lg:text-[58px] xl:text-[64px] tracking-tight leading-[1.0] mt-3 text-white"
                style={{ textShadow: "0 2px 40px rgba(2,7,13,0.55)" }}
              >
                FROM CODE
                <br />
                TO{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg,#6DD5FF 0%,#159FFF 45%,#0066BB 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 0 22px rgba(21,159,255,0.55))",
                  }}
                >
                  REAL ROADS
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p style={fadeIn(220)} className="text-slate-300/90 text-[13px] sm:text-[14px] font-normal max-w-sm mt-3 leading-relaxed">
              Building software that powers smarter, safer and more connected vehicles.
            </p>

            {/* Tech tags — shimmer hover */}
            <div style={fadeIn(300)} className="flex items-center flex-wrap gap-x-2 gap-y-1 text-[11px] font-mono-tech tracking-wider text-slate-400 uppercase mt-3.5">
              {["C/C++", "AUTOSAR", "EMBEDDED", "HMI", "CAN"].map((tag, i, arr) => (
                <React.Fragment key={tag}>
                  <span className="hover:text-[#159FFF] transition-colors duration-200 cursor-default">{tag}</span>
                  {i < arr.length - 1 && <span className="text-[#159FFF] font-bold opacity-60">•</span>}
                </React.Fragment>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={fadeIn(390)} className="flex items-center gap-3 mt-5">
              <button
                onClick={() => onNavigate("projects")}
                className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-[#0088FF] to-[#159FFF] text-white font-semibold text-[13px] tracking-wide shadow-[0_0_26px_rgba(21,159,255,0.52)] hover:shadow-[0_0_36px_rgba(21,159,255,0.72)] hover:scale-[1.04] active:scale-[0.97] transition-all flex items-center gap-2 cursor-pointer overflow-hidden group"
              >
                {/* Shimmer sweep on hover */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="relative">Explore My Work</span>
                <ArrowRight className="relative w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={() => setShowreelOpen(true)}
                className="px-5 py-2.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 hover:border-[#159FFF]/55 text-white font-medium text-[13px] tracking-wide transition-all flex items-center gap-2 shadow-lg cursor-pointer group"
              >
                <Play className="w-3.5 h-3.5 fill-white group-hover:fill-[#159FFF] transition-colors" />
                <span>Watch Showreel</span>
              </button>
            </div>

            {/* Cluster image */}
            <div style={fadeIn(500)} className="mt-6 flex-shrink-0">
              <img
                src="/assets/hero/cluster_hud.png"
                alt="Instrument Cluster HUD"
                className="block object-contain"
                style={{ maxHeight: 128, minWidth: 270 }}
                draggable={false}
              />
            </div>
          </div>

          {/* ── CENTER (car in bg) ── */}
          <div className="flex-1" />

          {/* ── RIGHT: Blueprint HUD + Taglines ── */}
          <div
            className="hidden lg:flex flex-col items-end justify-between h-full pb-2 will-change-transform"
            style={{
              transform: `translate3d(calc(var(--mx)*3px),calc(var(--my)*2px),0)`,
              ...fadeIn(180, "transform 0.2s cubic-bezier(0.16,1,0.3,1)"),
            }}
          >
            {/* IDEAS ENGINEERED + Wireframe HUD */}
            <div className="flex items-center gap-4 mt-1">
              <div className="flex flex-col items-end text-right">
                <p className="font-heading font-bold text-[10px] xl:text-[11px] tracking-[0.2em] text-[#F4F7FA] uppercase leading-[1.65]">
                  IDEAS<br />ENGINEERED<br />FOR A BRIGHTER<br />TOMORROW
                </p>
                <div className="w-8 h-[2px] bg-[#159FFF] shadow-[0_0_8px_#159FFF] rounded-full mt-1.5" />
              </div>

              {/* Wireframe panel — no box, floats */}
              <div
                className="relative p-3 flex items-center gap-2 animate-float"
                style={{ transform: "perspective(900px) rotateY(-4deg)" }}
              >
                {/* Wireframe car */}
                <div className="relative w-[155px] xl:w-[185px] h-[78px] xl:h-[92px] flex items-center justify-center flex-shrink-0">
                  <div className="absolute top-0.5 left-1 font-mono-tech text-[7px] text-[#159FFF]/55 tracking-wider pointer-events-none">
                    + CAD // ISO-3/4
                  </div>
                  <img
                    src="/assets/hero/wireframe_car_transparent.png"
                    alt="3D Wireframe SUV"
                    className="w-full h-full object-contain select-none pointer-events-none"
                    style={{
                      mixBlendMode: "screen",
                      filter: "drop-shadow(0 0 14px rgba(21,159,255,0.65))",
                      animation: "wirePulse 4s ease-in-out infinite",
                    }}
                    draggable={false}
                  />
                </div>

                {/* Divider */}
                <div className="w-px h-20 xl:h-24 bg-gradient-to-b from-transparent via-[#159FFF]/28 to-transparent flex-shrink-0" />

                {/* Domain list — each item fades in with stagger */}
                <div className="flex flex-col gap-1.5 pr-2">
                  {domains.map((d, i) => (
                    <span
                      key={d}
                      className="font-heading font-bold text-[9px] xl:text-[9.5px] tracking-[0.14em] text-[#F4F7FA]/85 hover:text-[#39B8FF] transition-colors duration-200 cursor-default"
                      style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "translateX(0)" : "translateX(10px)",
                        transition: `opacity 0.5s ease ${400 + i * 70}ms, transform 0.5s ease ${400 + i * 70}ms`,
                      }}
                    >
                      {d}
                    </span>
                  ))}
                  <div className="w-7 h-[2px] bg-[#159FFF] rounded-full mt-0.5 shadow-[0_0_6px_#159FFF]" />
                </div>
              </div>
            </div>

            {/* BETTER VEHICLES. BRIGHTER JOURNEYS. */}
            <div
              className="text-right mt-auto mb-4"
              style={{
                opacity: mounted ? 1 : 0,
                transition: "opacity 0.8s ease 600ms",
              }}
            >
              <p
                className="font-heading font-black text-[22px] xl:text-[26px] leading-[1.1] tracking-tight text-[#F4F7FA]"
                style={{ textShadow: "0 0 30px rgba(2,7,13,0.8)" }}
              >
                BETTER<br />VEHICLES.<br />
                <span style={{ color: "#9BA8B5" }}>BRIGHTER<br />JOURNEYS.</span>
              </p>
              <div className="w-10 h-[2px] bg-[#159FFF] rounded-full mt-2 ml-auto shadow-[0_0_8px_rgba(21,159,255,0.6)]" />
            </div>
          </div>
        </div>

        {/* ── STATS BAR ── */}
        <div
          className="w-full pb-3 mt-2"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.75s ease 700ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) 700ms",
          }}
        >
          <div
            className="rounded-xl px-5 sm:px-6 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3"
            style={{
              background: "rgba(5,11,19,0.72)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center justify-between md:justify-start gap-5 sm:gap-8 lg:gap-10 w-full md:w-auto overflow-x-auto">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <button
                    key={i}
                    onClick={() => onNavigate(stat.section)}
                    className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-white/[0.04] transition-all group text-left cursor-pointer focus:outline-none flex-shrink-0"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#159FFF]/10 border border-[#159FFF]/25 flex items-center justify-center text-[#159FFF] group-hover:scale-110 group-hover:border-[#159FFF]/60 group-hover:shadow-[0_0_12px_rgba(21,159,255,0.4)] transition-all flex-shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[15px] font-extrabold font-heading text-[#F4F7FA] group-hover:text-[#159FFF] leading-tight transition-colors tabular-nums">
                        {stat.value}
                      </div>
                      <div className="text-[9.5px] font-mono-tech text-[#9BA8B5] flex items-center gap-1">
                        <span>{stat.label}</span>
                        <ArrowRight className="w-2.5 h-2.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#159FFF]" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="hidden md:block w-px h-7 bg-white/10 flex-shrink-0" />
            <div className="text-right flex-shrink-0">
              <p className="text-[12px] font-medium text-[#9BA8B5] italic tracking-wide">
                &ldquo;Code today.<br className="hidden sm:block" /> Cleaner roads tomorrow.&rdquo;
              </p>
              <div className="w-8 h-[2px] bg-[#159FFF] rounded-full mt-1.5 ml-auto" />
            </div>
          </div>
        </div>

        {/* ── BOTTOM ROW ── */}
        <div
          className="w-full flex items-center justify-between pb-2 text-[10px] font-mono-tech text-[#9BA8B5]"
          style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.8s ease 900ms" }}
        >
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center w-5 h-5 rounded-full bg-[#081421] border border-[#159FFF]/35">
              <Compass className="w-3 h-3 text-[#159FFF] animate-[spin_12s_linear_infinite]" />
              <span className="absolute inset-0 rounded-full border border-[#159FFF]/20 animate-ping" />
            </div>
            <div>
              <div className="text-[#F4F7FA] text-[10px] font-semibold tracking-wider uppercase leading-tight">ALWAYS LEARNING</div>
              <div className="text-[8.5px] text-[#9BA8B5] tracking-wider uppercase leading-tight">ALWAYS BUILDING</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe className="w-3 h-3 text-[#159FFF]" />
            <span>Kolkata</span>
            <span className="text-slate-700">→</span>
            <span>Bangalore</span>
            <span className="text-slate-700">→</span>
            <span className="text-[#F4F7FA] font-medium">Global</span>
          </div>
        </div>
      </div>



      {/* ── SHOWREEL MODAL ── */}
      {showreelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4">
          <div
            className="relative w-full max-w-3xl rounded-2xl p-6"
            style={{
              background: "rgba(5,11,19,0.92)",
              border: "1px solid rgba(21,159,255,0.35)",
              boxShadow: "0 0 60px rgba(21,159,255,0.18)",
            }}
          >
            <button onClick={() => setShowreelOpen(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-[#159FFF] font-mono-tech text-[10.5px] tracking-wider uppercase mb-3">
              <span>// AUTOMOTIVE SOFTWARE SHOWREEL</span>
            </div>
            <h3 className="text-xl font-bold font-heading text-white mb-4">Next-Gen Vehicle Systems & AUTOSAR Integration</h3>
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black/80 border border-white/10 flex items-center justify-center">
              <img src="/assets/skills/car_rear.jpg" alt="Automotive" className="w-full h-full object-cover opacity-55" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
              <div className="absolute flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-[#159FFF] flex items-center justify-center text-[#159FFF] mb-3 shadow-[0_0_24px_rgba(21,159,255,0.5)] animate-pulse">
                  <Play className="w-6 h-6 fill-[#159FFF] ml-1" />
                </div>
                <p className="text-white font-heading font-semibold text-lg">Automotive Systems Showcase</p>
                <p className="text-slate-400 text-xs mt-1 max-w-sm font-mono-tech">Demonstrating Instrument Cluster rendering, CANoe bus simulation, and AUTOSAR Classic stack execution.</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs font-mono-tech text-slate-400">Resolution: 4K UHD • QNX / AUTOSAR</span>
              <button onClick={() => setShowreelOpen(false)} className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer">
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
