import React, { useState, useEffect, useRef } from 'react';
import {
  Code2,
  Cpu,
  Layers,
  Wrench,
  Settings,
  Monitor,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { skillCategories } from '../data/skillsData';
import { SkillLogo } from '../components/SkillLogos';
import { useTheme } from '../context/ThemeContext';

interface SkillsSectionProps {
  onNavigate: (sectionId: string) => void;
}

const SkillProgressBar: React.FC<{
  name: string;
  level: number;
  inView: boolean;
  hasAnimatedOnce: boolean;
  delay?: number;
  isLight?: boolean;
}> = ({ name, level, inView, hasAnimatedOnce, delay = 0, isLight = false }) => {
  const [currentLevel, setCurrentLevel] = useState(() => (hasAnimatedOnce ? level : 0));

  useEffect(() => {
    if (hasAnimatedOnce) {
      setCurrentLevel(level);
      return;
    }

    if (!inView) {
      setCurrentLevel(0);
      return;
    }

    let raf: number;
    let start: number | null = null;
    const duration = 1000;
    const timer = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCurrentLevel(Math.round(eased * level));
        if (progress < 1) {
          raf = requestAnimationFrame(step);
        }
      };
      raf = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [level, inView, hasAnimatedOnce, delay]);

  const displayLevel = hasAnimatedOnce ? level : currentLevel;

  return (
    <div className="space-y-0.5 group/skill">
      <div className="flex items-center justify-between text-[11.5px] sm:text-xs leading-none">
        <div className="flex items-center space-x-1.5 min-w-0">
          <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
            <SkillLogo name={name} isLight={isLight} className="w-3.5 h-3.5 object-contain transition-transform duration-300 group-hover/skill:scale-110" />
          </div>
          <span className={`font-medium truncate ${isLight ? 'text-slate-900 font-bold' : 'text-gray-200'}`}>
            {name}
          </span>
        </div>
        <span className={`font-mono-tech font-bold text-[11px] sm:text-xs pl-1.5 tabular-nums ${
          isLight ? 'text-sky-600 font-bold' : 'text-sky-400'
        }`}>
          {displayLevel}%
        </span>
      </div>

      <div className={`w-full h-1 rounded-full overflow-hidden ${
        isLight ? 'bg-slate-200/70' : 'bg-white/[0.06]'
      }`}>
        <div
          className={`h-full rounded-full transition-all ease-out ${
            isLight
              ? 'bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 shadow-xs'
              : 'bg-gradient-to-r from-blue-600 via-sky-400 to-sky-300 progress-glow'
          }`}
          style={{ width: `${displayLevel}%`, transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      </div>
    </div>
  );
};

export const SkillsSection: React.FC<SkillsSectionProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [slideDir, setSlideDir] = useState<'right' | 'left'>('right');
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const [hasAnimatedOnce, setHasAnimatedOnce] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          // Complete animation sequence once after entry
          setTimeout(() => {
            setHasAnimatedOnce(true);
          }, 1400);
          obs.disconnect(); // Fire only once
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Count-up hook — runs once on view
  function useCountUp(target: number, duration = 1200, delay = 0, enabled = true) {
    const [value, setValue] = useState(0);
    useEffect(() => {
      if (!enabled) return;
      let raf: number;
      let start: number | null = null;
      const id = setTimeout(() => {
        const step = (ts: number) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / duration, 1);
          const eased = 1 - Math.pow(2, -10 * p); // easeOutExpo
          setValue(Math.round(eased * target));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      }, delay);
      return () => { clearTimeout(id); cancelAnimationFrame(raf); };
    }, [target, duration, delay, enabled]);
    return value;
  }

  const techCount   = useCountUp(10, 1000, 300, inView);
  const domainCount = useCountUp(3, 800, 500, inView);

  const FILTER_TABS = [
    { id: 'all', label: 'All' },
    { id: 'programming', label: 'Programming' },
    { id: 'automotive', label: 'Automotive' },
    { id: 'tools', label: 'Tools & IDEs' },
    { id: 'build', label: 'Build & DevOps' },
    { id: 'os', label: 'Operating Systems' },
    { id: 'other', label: 'Other' },
  ];

  const handleTabClick = (newId: string) => {
    if (newId === activeFilter) return;
    const oldIdx = FILTER_TABS.findIndex((t) => t.id === activeFilter);
    const newIdx = FILTER_TABS.findIndex((t) => t.id === newId);
    setSlideDir(newIdx >= oldIdx ? 'right' : 'left');
    setActiveFilter(newId);
  };

  const getCategoryIcon = (iconName: string, light = isLight) => {
    const iconStyle = { color: light ? '#0284C7' : '#38BDF8' };
    switch (iconName) {
      case 'code':
        return <Code2 className="w-4 h-4" style={iconStyle} />;
      case 'cpu':
        return <Cpu className="w-4 h-4" style={iconStyle} />;
      case 'layers':
        return <Layers className="w-4 h-4" style={iconStyle} />;
      case 'wrench':
        return <Wrench className="w-4 h-4" style={iconStyle} />;
      case 'settings':
        return <Settings className="w-4 h-4" style={iconStyle} />;
      case 'monitor':
        return <Monitor className="w-4 h-4" style={iconStyle} />;
      default:
        return <Code2 className="w-4 h-4" style={iconStyle} />;
    }
  };

  // Render content based on active filter so screen is ALWAYS balanced across 3 columns
  const renderFilteredContent = () => {
    if (activeFilter === 'programming') {
      const progCat = skillCategories.find((c) => c.id === 'programming')!;
      const frameCat = skillCategories.find((c) => c.id === 'frameworks')!;

      return (
        <div
          key={activeFilter}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5 lg:gap-4 flex-1 min-h-fit items-stretch ${
            slideDir === 'right' ? 'animate-slide-right' : 'animate-slide-left'
          }`}
        >
          {/* Card 1: Programming Languages */}
          <div className="glass-panel rounded-xl p-3 border border-sky-500/40 flex flex-col justify-between relative overflow-hidden shadow-lg">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-500 via-sky-400 to-transparent" />
            <div>
              <div className={`flex items-center justify-between pb-2 border-b mb-2 ${isLight ? 'border-slate-200/80' : 'border-white/[0.06]'}`}>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-xs"
                    style={{
                      backgroundColor: isLight ? '#E0F2FE' : 'rgba(8, 47, 73, 0.8)',
                    }}
                  >
                    <Code2 className="w-4 h-4" style={{ color: isLight ? '#0284C7' : '#38BDF8' }} />
                  </div>
                  <h3 className={`font-heading font-bold text-sm sm:text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>{progCat.title}</h3>
                </div>
                <span className={`text-xs font-mono-tech px-2 py-0.5 rounded-md border ${
                  isLight ? 'bg-sky-50 text-sky-700 border-sky-200 font-bold' : 'text-sky-400 bg-sky-500/15 border-sky-500/30'
                }`}>
                  {progCat.skills.length} Skills
                </span>
              </div>
              <div className="space-y-2">
                {progCat.skills.map((skill, sIdx) => (
                  <SkillProgressBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    inView={inView}
                    hasAnimatedOnce={hasAnimatedOnce}
                    delay={sIdx * 60}
                    isLight={isLight}
                  />
                ))}
              </div>
            </div>
            <div className={`pt-2 mt-2 border-t text-xs font-mono-tech flex justify-between ${
              isLight ? 'border-slate-200/80 text-slate-600' : 'border-white/[0.04] text-gray-400'
            }`}>
              <span>Primary Stack</span>
              <span className={isLight ? 'text-sky-700 font-bold' : 'text-sky-400'}>Embedded & Automotive C++</span>
            </div>
          </div>

          {/* Card 2: Frameworks & Libraries */}
          <div className="glass-panel rounded-xl p-3 border border-sky-500/40 flex flex-col justify-between relative overflow-hidden shadow-lg">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-500 via-sky-400 to-transparent" />
            <div>
              <div className={`flex items-center justify-between pb-2 border-b mb-2 ${isLight ? 'border-slate-200/80' : 'border-white/[0.06]'}`}>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-xs"
                    style={{
                      backgroundColor: isLight ? '#E0F2FE' : 'rgba(8, 47, 73, 0.8)',
                    }}
                  >
                    <Layers className="w-4 h-4" style={{ color: isLight ? '#0284C7' : '#38BDF8' }} />
                  </div>
                  <h3 className={`font-heading font-bold text-sm sm:text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>{frameCat.title}</h3>
                </div>
                <span className={`text-xs font-mono-tech px-2 py-0.5 rounded-md border ${
                  isLight ? 'bg-sky-50 text-sky-700 border-sky-200 font-bold' : 'text-sky-400 bg-sky-500/15 border-sky-500/30'
                }`}>
                  {frameCat.skills.length} Skills
                </span>
              </div>
              <div className="space-y-2">
                {frameCat.skills.map((skill, sIdx) => (
                  <SkillProgressBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    inView={inView}
                    hasAnimatedOnce={hasAnimatedOnce}
                    delay={sIdx * 60}
                    isLight={isLight}
                  />
                ))}
              </div>
            </div>
            <div className={`pt-2 mt-2 border-t text-xs font-mono-tech flex justify-between ${
              isLight ? 'border-slate-200/80 text-slate-600' : 'border-white/[0.04] text-gray-400'
            }`}>
              <span>HMI & Test Frameworks</span>
              <span className={isLight ? 'text-sky-700 font-bold' : 'text-sky-400'}>Qt / QML & Unit Testing</span>
            </div>
          </div>

          {/* Card 3: Language Practices & Standards */}
          <div className="glass-panel rounded-xl p-3 border border-sky-500/40 flex flex-col justify-between relative overflow-hidden shadow-lg">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-500 via-sky-400 to-transparent" />
            <div>
              <div className={`flex items-center justify-between pb-2 border-b mb-2 ${isLight ? 'border-slate-200/80' : 'border-white/[0.06]'}`}>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-xs"
                    style={{
                      backgroundColor: isLight ? '#E0F2FE' : 'rgba(8, 47, 73, 0.8)',
                    }}
                  >
                    <Sparkles className="w-4 h-4" style={{ color: isLight ? '#0284C7' : '#38BDF8' }} />
                  </div>
                  <h3 className={`font-heading font-bold text-sm sm:text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>Coding Standards & Architecture</h3>
                </div>
                <span className={`text-xs font-mono-tech px-2 py-0.5 rounded-md border ${
                  isLight ? 'bg-sky-50 text-sky-700 border-sky-200 font-bold' : 'text-sky-400 bg-sky-500/15 border-sky-500/30'
                }`}>
                  Best Practices
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className={`p-2 rounded-lg border space-y-0.5 ${
                  isLight ? 'bg-slate-100/90 border-slate-200/90' : 'bg-white/[0.03] border-white/[0.06]'
                }`}>
                  <span className={`font-bold text-xs sm:text-[13px] block ${isLight ? 'text-sky-700' : 'text-sky-300'}`}>Modern C++ (14/17/20)</span>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700 font-medium' : 'text-gray-300'}`}>
                    Deterministic memory management, RAII, move semantics, smart pointers, and concurrency for safety-critical targets.
                  </p>
                </div>
                <div className={`p-2 rounded-lg border space-y-0.5 ${
                  isLight ? 'bg-slate-100/90 border-slate-200/90' : 'bg-white/[0.03] border-white/[0.06]'
                }`}>
                  <span className={`font-bold text-xs sm:text-[13px] block ${isLight ? 'text-sky-700' : 'text-sky-300'}`}>MISRA C / C++ Compliance</span>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700 font-medium' : 'text-gray-300'}`}>
                    Strict adherence to MISRA guidelines, avoiding undefined behaviors, pointer arithmetic safety, and static analysis verification.
                  </p>
                </div>
                <div className={`p-2 rounded-lg border space-y-0.5 ${
                  isLight ? 'bg-slate-100/90 border-slate-200/90' : 'bg-white/[0.03] border-white/[0.06]'
                }`}>
                  <span className={`font-bold text-xs sm:text-[13px] block ${isLight ? 'text-sky-700' : 'text-sky-300'}`}>Automated Unit Testing</span>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700 font-medium' : 'text-gray-300'}`}>
                    Test-driven development using Google Test (GTest) for desktop logic and Ceedling (Unity/CMock) for target MCUs.
                  </p>
                </div>
              </div>
            </div>
            <div className={`pt-2 mt-2 border-t text-xs font-mono-tech flex justify-between ${
              isLight ? 'border-slate-200/80 text-slate-600' : 'border-white/[0.04] text-gray-400'
            }`}>
              <span>Domain Focus</span>
              <span className={isLight ? 'text-sky-700 font-bold' : 'text-sky-400'}>Robust & Clean Architecture</span>
            </div>
          </div>
        </div>
      );
    }

    if (activeFilter === 'other') {
      return (
        <div
          key={activeFilter}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5 lg:gap-4 flex-1 min-h-fit items-stretch ${
            slideDir === 'right' ? 'animate-slide-right' : 'animate-slide-left'
          }`}
        >
          {/* Card 1: Core Engineering Methodologies */}
          <div className="glass-panel rounded-xl p-3 border border-sky-500/40 flex flex-col justify-between relative overflow-hidden shadow-lg">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-500 via-sky-400 to-transparent" />
            <div>
              <div className={`flex items-center justify-between pb-2 border-b mb-2 ${isLight ? 'border-slate-200/80' : 'border-white/[0.06]'}`}>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-xs"
                    style={{
                      backgroundColor: isLight ? '#E0F2FE' : 'rgba(8, 47, 73, 0.8)',
                    }}
                  >
                    <Lightbulb className="w-4 h-4" style={{ color: isLight ? '#0284C7' : '#38BDF8' }} />
                  </div>
                  <h3 className={`font-heading font-bold text-sm sm:text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>Engineering Methodologies</h3>
                </div>
                <span className={`text-xs font-mono-tech px-2 py-0.5 rounded-md border ${
                  isLight ? 'bg-sky-50 text-sky-700 border-sky-200 font-bold' : 'text-sky-400 bg-sky-500/15 border-sky-500/30'
                }`}>
                  4 Practices
                </span>
              </div>
              <div className="space-y-2">
                {[
                  { name: 'Problem Solving', desc: 'Root cause analysis, fault isolation in mixed hardware/software environments.' },
                  { name: 'Debugging & Diagnostics', desc: 'Hardware breakpointing via Lauterbach Trace32, GDB, JTAG, and logic analyzers.' },
                  { name: 'Software Design', desc: 'Layered architecture (BSW/RTE/SWC), state machines, design patterns & clean interfaces.' },
                  { name: 'System Integration', desc: 'End-to-end bring-up between IVI HMI (Qualcomm) and Vehicle Body MCU (Renesas).' },
                ].map((item, idx) => (
                  <div key={idx} className={`p-2 rounded-lg border space-y-0.5 ${
                    isLight ? 'bg-slate-100/90 border-slate-200/90' : 'bg-white/[0.03] border-white/[0.06]'
                  }`}>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${isLight ? 'text-sky-600' : 'text-sky-400'}`} />
                      <span className={`font-bold text-xs sm:text-[13px] ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.name}</span>
                    </div>
                    <p className={`text-xs leading-relaxed pl-5 ${isLight ? 'text-slate-700 font-medium' : 'text-gray-300'}`}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={`pt-2 mt-2 border-t text-xs font-mono-tech flex justify-between ${
              isLight ? 'border-slate-200/80 text-slate-600' : 'border-white/[0.04] text-gray-400'
            }`}>
              <span>Domain Discipline</span>
              <span className={isLight ? 'text-sky-700 font-bold' : 'text-sky-400'}>Embedded Rigor</span>
            </div>
          </div>

          {/* Card 2: Quality, Process & ASPICE */}
          <div className="glass-panel rounded-xl p-3 border border-sky-500/40 flex flex-col justify-between relative overflow-hidden shadow-lg">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-500 via-sky-400 to-transparent" />
            <div>
              <div className={`flex items-center justify-between pb-2 border-b mb-2 ${isLight ? 'border-slate-200/80' : 'border-white/[0.06]'}`}>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-xs"
                    style={{
                      backgroundColor: isLight ? '#E0F2FE' : 'rgba(8, 47, 73, 0.8)',
                    }}
                  >
                    <ShieldCheck className="w-4 h-4" style={{ color: isLight ? '#0284C7' : '#38BDF8' }} />
                  </div>
                  <h3 className={`font-heading font-bold text-sm sm:text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>Quality, V&V & ASPICE</h3>
                </div>
                <span className={`text-xs font-mono-tech px-2 py-0.5 rounded-md border ${
                  isLight ? 'bg-sky-50 text-sky-700 border-sky-200 font-bold' : 'text-sky-400 bg-sky-500/15 border-sky-500/30'
                }`}>
                  Compliance
                </span>
              </div>
              <div className="space-y-2">
                {[
                  { name: 'ASPICE Process (SWE.4/5/6)', desc: 'Unit testing, integration verification, and qualification testing aligned with Automotive SPICE.' },
                  { name: 'V&V / System Testing', desc: 'Vector CANoe test automation, CAPL scripting, fault injection, and HIL test execution.' },
                  { name: 'Requirement Analysis', desc: 'Requirement-to-code traceability via Polarion, DOORS, and Jira.' },
                  { name: 'Team Collaboration & Agile', desc: 'Scrum ceremonies, cross-functional OEM/Tier-1 coordination, and sprint execution.' },
                ].map((item, idx) => (
                  <div key={idx} className={`p-2 rounded-lg border space-y-0.5 ${
                    isLight ? 'bg-slate-100/90 border-slate-200/90' : 'bg-white/[0.03] border-white/[0.06]'
                  }`}>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${isLight ? 'text-sky-600' : 'text-sky-400'}`} />
                      <span className={`font-bold text-xs sm:text-[13px] ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.name}</span>
                    </div>
                    <p className={`text-xs leading-relaxed pl-5 ${isLight ? 'text-slate-700 font-medium' : 'text-gray-300'}`}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={`pt-2 mt-2 border-t text-xs font-mono-tech flex justify-between ${
              isLight ? 'border-slate-200/80 text-slate-600' : 'border-white/[0.04] text-gray-400'
            }`}>
              <span>Standard</span>
              <span className={isLight ? 'text-sky-700 font-bold' : 'text-sky-400'}>Automotive SPICE Level 2/3</span>
            </div>
          </div>

          {/* Card 3: Semiconductor Hardware & Silicon View */}
          <div className="glass-panel rounded-xl p-3 border border-sky-500/40 flex flex-col justify-between relative overflow-hidden shadow-lg">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-500 via-sky-400 to-transparent" />
            <div>
              <div className={`flex items-center justify-between pb-2 border-b mb-2 ${isLight ? 'border-slate-200/80' : 'border-white/[0.06]'}`}>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-xs"
                    style={{
                      backgroundColor: isLight ? '#E0F2FE' : 'rgba(8, 47, 73, 0.8)',
                    }}
                  >
                    <Cpu className="w-4 h-4" style={{ color: isLight ? '#0284C7' : '#38BDF8' }} />
                  </div>
                  <h3 className={`font-heading font-bold text-sm sm:text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>Silicon & Target Hardware</h3>
                </div>
                <span className={`text-xs font-mono-tech px-2 py-0.5 rounded-md border ${
                  isLight ? 'bg-sky-50 text-sky-700 border-sky-200 font-bold' : 'text-sky-400 bg-sky-500/15 border-sky-500/30'
                }`}>
                  Hardware Targets
                </span>
              </div>

              {/* TRAVEO II Photo Banner */}
              <div className={`relative rounded-lg overflow-hidden border ${isLight ? 'border-slate-200 shadow-sm' : 'border-white/10'} h-28 mb-2 shadow-md`}>
                <img
                  src={isLight ? "/assets/skills/microchip_light.jpg" : "/assets/skills/microchip.jpg"}
                  alt="Infineon TRAVEO II MCU"
                  className="w-full h-full object-cover object-center brightness-95 contrast-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${isLight ? 'from-slate-900/80' : 'from-[#020509]/90'} via-transparent to-transparent pointer-events-none`} />
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="text-[10px] sm:text-xs font-mono-tech text-gray-300 uppercase block">TARGET SILICON</span>
                  <span className="text-xs sm:text-sm font-black text-sky-400 leading-tight block">Infineon TRAVEO™ II & Renesas RH850</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-gray-300">
                <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-gray-300">Infineon TRAVEO II (CYT4BF)</span>
                  <span className="font-mono-tech text-sky-400 font-bold text-xs">ARM Cortex-M7</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-gray-300">Renesas RH850 (F1KM)</span>
                  <span className="font-mono-tech text-sky-400 font-bold text-xs">V850 / 32-bit MCU</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-gray-300">Qualcomm Snapdragon SA8155P</span>
                  <span className="font-mono-tech text-sky-400 font-bold text-xs">Kryo / Android HMI</span>
                </div>
              </div>
            </div>
            <div className="pt-2 mt-2 border-t border-white/[0.04] text-xs font-mono-tech text-gray-400 flex justify-between">
              <span>Hardware Platforms</span>
              <span className="text-sky-400">Auto & Semi</span>
            </div>
          </div>
        </div>
      );
    }

    // Default 'All' view (or tools / automotive / build / os):
    // If a specific category tab is selected, show that category + 2 related cards to keep 3 columns filled!
    let displayCategories = skillCategories;
    if (activeFilter === 'automotive') {
      displayCategories = [
        skillCategories.find((c) => c.id === 'automotive')!,
        skillCategories.find((c) => c.id === 'tools')!,
        skillCategories.find((c) => c.id === 'os')!,
      ];
    } else if (activeFilter === 'tools') {
      displayCategories = [
        skillCategories.find((c) => c.id === 'tools')!,
        skillCategories.find((c) => c.id === 'build')!,
        skillCategories.find((c) => c.id === 'frameworks')!,
      ];
    } else if (activeFilter === 'build') {
      displayCategories = [
        skillCategories.find((c) => c.id === 'build')!,
        skillCategories.find((c) => c.id === 'tools')!,
        skillCategories.find((c) => c.id === 'os')!,
      ];
    } else if (activeFilter === 'os') {
      displayCategories = [
        skillCategories.find((c) => c.id === 'os')!,
        skillCategories.find((c) => c.id === 'programming')!,
        skillCategories.find((c) => c.id === 'build')!,
      ];
    }

    return (
      <div
        key={activeFilter}
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5 lg:gap-4 flex-1 min-h-fit items-stretch ${
          slideDir === 'right' ? 'animate-slide-right' : 'animate-slide-left'
        }`}
      >
        {displayCategories.map((category) => (
          <div
            key={category.id}
            className={`glass-panel rounded-xl p-2.5 sm:p-3 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden group shadow-sm ${
              activeFilter === category.id
                ? 'border-sky-400 ring-1 ring-sky-400/40 shadow-[0_0_15px_rgba(21,159,255,0.25)]'
                : 'border-white/[0.07] hover:border-sky-500/40'
            }`}
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-sky-500/60 via-sky-500/20 to-transparent" />

            <div>
              {/* Category Header */}
              <div className={`flex items-center justify-between pb-1.5 border-b mb-2 ${isLight ? 'border-slate-200/80' : 'border-white/[0.04]'}`}>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 shadow-xs"
                    style={{
                      backgroundColor: isLight ? '#E0F2FE' : 'rgba(8, 47, 73, 0.8)',
                    }}
                  >
                    {getCategoryIcon(category.icon, isLight)}
                  </div>
                  <h3 className={`font-heading font-bold text-sm sm:text-base leading-none ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {category.title}
                  </h3>
                </div>
                {activeFilter === category.id && (
                  <span className={`text-xs font-mono-tech px-2 py-0.5 rounded border ${
                    isLight ? 'bg-sky-50 text-sky-700 border-sky-200 font-bold' : 'text-sky-400 bg-sky-500/20 border-sky-500/40'
                  }`}>
                    Selected
                  </span>
                )}
              </div>

              {/* Skills List with Authentic Logos & Glowing Bars */}
              <div className="space-y-2">
                {category.skills.map((skill, sIdx) => (
                  <SkillProgressBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    inView={inView}
                    hasAnimatedOnce={hasAnimatedOnce}
                    delay={sIdx * 60}
                    isLight={isLight}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={`relative w-full min-h-[calc(100vh-4rem)] h-auto py-4 sm:py-6 lg:py-6 2xl:py-8 px-3 sm:px-6 lg:px-10 2xl:px-14 ${isLight ? 'bg-[#F8FAFC]' : 'bg-[#020509]'} flex flex-col justify-between select-none scroll-mt-16 transition-colors duration-300 border-t ${isLight ? 'border-slate-200/80' : 'border-white/[0.04]'}`}
    >
      {/* Ambient background glow */}
      <div
        className="absolute -top-32 left-1/3 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: isLight ? 'radial-gradient(ellipse, rgba(14,165,233,0.08) 0%, transparent 70%)' : 'radial-gradient(ellipse, rgba(21,159,255,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1700px] 3xl:max-w-[2000px] mx-auto w-full flex-1 flex flex-col justify-between gap-3 sm:gap-4 lg:gap-5">
        
        {/* ══════════════════════════════════════════════════════
            TOP HEADER (Single Tab, Borderless, Full-Span Car Background Like Experience)
        ══════════════════════════════════════════════════════ */}
        <div
          className="relative rounded-b-2xl overflow-hidden p-3 sm:p-3.5 lg:py-2.5 2xl:py-3.5 lg:px-6 shrink-0 -mt-px shadow-lg"
          style={{
            background: isLight
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.82) 0%, rgba(241, 245, 249, 0.75) 100%)'
              : 'linear-gradient(135deg, rgba(8, 16, 26, 0.82) 0%, rgba(4, 9, 16, 0.88) 100%)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          {/* Full-width vehicle visual background - Spans the entire upper container */}
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
            <img
              src={isLight ? "/assets/skills/car_rear_light.jpg" : "/assets/skills/car_rear.jpg"}
              alt="Automotive Skills View"
              className="w-full h-full object-cover object-center lg:object-right brightness-105 contrast-110"
              draggable={false}
            />
            {/* Soft fade gradients for readability while keeping the car dramatically visible */}
            <div className={`absolute inset-0 bg-gradient-to-r ${isLight ? 'from-white/95 via-white/70 via-45% to-white/20' : 'from-[#020509]/95 via-[#020509]/65 via-45% to-[#020509]/20'} pointer-events-none`} />
            <div className={`absolute inset-0 bg-gradient-to-t ${isLight ? 'from-white/80 via-transparent to-white/30' : 'from-[#020509]/80 via-transparent to-[#020509]/30'} pointer-events-none`} />
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
                    SKILLS
                  </span>
                </div>
                <div className="flex flex-wrap items-baseline gap-x-2.5">
                  <h2
                    className={`text-lg sm:text-xl lg:text-2xl font-black font-heading ${isLight ? 'text-slate-950' : 'text-white'} leading-tight`}
                    style={{
                      textShadow: isLight
                        ? '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 12px rgba(255, 255, 255, 0.9)'
                        : '0 2px 8px rgba(0, 0, 0, 0.7)',
                    }}
                  >
                    Skills That{' '}
                    <span className={isLight ? 'text-sky-600' : 'text-sky-400'}>
                      Drive Progress.
                    </span>
                  </h2>
                </div>
                <p
                  className={`hidden sm:block text-xs sm:text-[13px] ${isLight ? 'text-slate-900 font-medium' : 'text-[#CAD5E2] font-normal'} leading-snug line-clamp-1`}
                  style={{
                    textShadow: isLight ? '0 1px 2px rgba(255, 255, 255, 0.95)' : 'none',
                  }}
                >
                  A blend of embedded systems knowledge, automotive domain expertise and modern development tools.
                </p>
              </div>

              {/* Right Tagline Block */}
              <div className="hidden md:flex flex-col items-end justify-center text-right space-y-0.5 relative z-10 pr-1 flex-shrink-0">
                <div
                  className={`flex items-center gap-1.5 text-[9.5px] sm:text-[10.5px] font-mono-tech tracking-widest ${isLight ? 'text-slate-900' : 'text-gray-200'} uppercase font-bold`}
                  style={{ textShadow: isLight ? '0 1px 2px rgba(255, 255, 255, 0.95)' : 'none' }}
                >
                  <span>LEARN</span>
                  <span>•</span>
                  <span>BUILD</span>
                  <span>•</span>
                  <span
                    className="font-black"
                    style={{
                      color: isLight ? '#0284C7' : '#38BDF8',
                      textShadow: isLight ? '0 1px 2px rgba(0, 0, 0, 0.6)' : 'none',
                    }}
                  >
                    IMPROVE
                  </span>
                  <span>•</span>
                  <span className={isLight ? 'text-slate-950 font-black' : 'text-white font-black'}>REPEAT</span>
                </div>
                <div
                  className={`text-xs sm:text-[13.5px] font-heading italic font-black leading-tight ${isLight ? 'text-slate-950' : 'text-white drop-shadow-md'}`}
                  style={{
                    textShadow: isLight ? '0 1px 3px rgba(255, 255, 255, 0.95)' : 'none',
                  }}
                >
                  &ldquo;Better Vehicles. Brighter Journeys.&rdquo;
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

            {/* Bottom Row: Category Filter Tabs (Clean, borderless pills matching Projects and Experience) */}
            <div className="flex items-center overflow-x-auto gap-2 pt-1 pb-0.5 no-scrollbar w-full">
              {FILTER_TABS.map((tab) => {
                const isActive = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs sm:text-[12.5px] 2xl:text-[13px] font-mono-tech transition-all duration-200 whitespace-nowrap cursor-pointer shrink-0 border-0 ${
                      isActive
                        ? 'bg-sky-600 text-white font-bold shadow-md shadow-sky-600/30'
                        : isLight
                          ? 'bg-white/90 hover:bg-white text-slate-800 font-bold shadow-sm'
                          : 'bg-white/[0.06] hover:bg-white/[0.12] text-gray-200 font-semibold'
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT (3 COLUMNS BALANCED IN ALL FILTER STATES) ── */}
        {renderFilteredContent()}

        {/* ══════════════════════════════════════════════════════
            DOWN PART: MOUNTAIN HIGHWAY FOOTER CARD
        ══════════════════════════════════════════════════════ */}
        <div
          className={`relative rounded-2xl overflow-hidden px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-4 shrink-0 shadow-lg mt-2 sm:mt-3 ${
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
              &ldquo;Precision code.<br className="hidden sm:inline" /> Driven to innovate.&rdquo;
            </p>
            <div className="w-8 h-[2px] bg-[#159FFF] mt-1 rounded-full shadow-[0_0_8px_#159FFF]" />
          </div>

          {/* Center: Clean Prominent Stats */}
          <div className="relative z-10 flex items-center space-x-5 sm:space-x-8 text-center">
            <div>
              <span className={`block text-sm sm:text-base 2xl:text-lg font-black font-heading leading-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {techCount}+
              </span>
              <span className={`text-[8.5px] sm:text-[9.5px] font-mono-tech uppercase tracking-wider ${
                isLight ? 'text-slate-700 font-semibold' : 'text-gray-300'
              }`}>
                Technologies
              </span>
            </div>
            <div className={`w-[1px] h-5 sm:h-6 ${isLight ? 'bg-slate-300' : 'bg-white/20'}`} />
            <div>
              <span className={`block text-sm sm:text-base 2xl:text-lg font-black font-heading leading-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {domainCount}+
              </span>
              <span className={`text-[8.5px] sm:text-[9.5px] font-mono-tech uppercase tracking-wider ${
                isLight ? 'text-slate-700 font-semibold' : 'text-gray-300'
              }`}>
                Core Domains
              </span>
            </div>
            <div className={`w-[1px] h-5 sm:h-6 ${isLight ? 'bg-slate-300' : 'bg-white/20'}`} />
            <div>
              <span className="block text-sm sm:text-base 2xl:text-lg font-black font-heading text-sky-500 leading-tight">
                ∞
              </span>
              <span className={`text-[8.5px] sm:text-[9.5px] font-mono-tech uppercase tracking-wider ${
                isLight ? 'text-slate-700 font-semibold' : 'text-gray-300'
              }`}>
                Curiosity
              </span>
            </div>
          </div>

          {/* Right: Action Button */}
          <div className="relative z-10 flex-shrink-0">
            <button
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-[12.5px] font-mono-tech font-bold transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-md text-white bg-sky-600 hover:bg-sky-500 shadow-sky-600/30 whitespace-nowrap"
            >
              <span>Explore My Projects</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
