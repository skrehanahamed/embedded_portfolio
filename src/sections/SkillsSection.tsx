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
import { skillCategories, otherSkills } from '../data/skillsData';
import { SkillLogo } from '../components/SkillLogos';

interface SkillsSectionProps {
  onNavigate: (sectionId: string) => void;
}

const SkillProgressBar: React.FC<{
  name: string;
  level: number;
  inView: boolean;
  hasAnimatedOnce: boolean;
  delay?: number;
}> = ({ name, level, inView, hasAnimatedOnce, delay = 0 }) => {
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
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs sm:text-[13px] leading-none">
        <div className="flex items-center space-x-2 min-w-0">
          <SkillLogo name={name} className="w-4 h-4 object-contain flex-shrink-0" />
          <span className="font-medium text-gray-200 truncate">{name}</span>
        </div>
        <span className="font-mono-tech font-bold text-sky-400 text-xs pl-1.5 tabular-nums">
          {displayLevel}%
        </span>
      </div>

      <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-600 via-sky-400 to-sky-300 progress-glow transition-all duration-300 ease-out"
          style={{ width: `${displayLevel}%` }}
        />
      </div>
    </div>
  );
};

export const SkillsSection: React.FC<SkillsSectionProps> = ({ onNavigate }) => {
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

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Code2 className="w-4 h-4 text-sky-400" />;
      case 'cpu':
        return <Cpu className="w-4 h-4 text-sky-400" />;
      case 'layers':
        return <Layers className="w-4 h-4 text-sky-400" />;
      case 'wrench':
        return <Wrench className="w-4 h-4 text-sky-400" />;
      case 'settings':
        return <Settings className="w-4 h-4 text-sky-400" />;
      case 'monitor':
        return <Monitor className="w-4 h-4 text-sky-400" />;
      default:
        return <Code2 className="w-4 h-4 text-sky-400" />;
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
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 flex-1 min-h-0 items-stretch ${
            slideDir === 'right' ? 'animate-slide-right' : 'animate-slide-left'
          }`}
        >
          {/* Card 1: Programming Languages */}
          <div className="glass-panel rounded-xl p-3 border border-sky-500/40 flex flex-col justify-between relative overflow-hidden shadow-lg">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-500 via-sky-400 to-transparent" />
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-950/80 border border-sky-500/40 flex items-center justify-center">
                    <Code2 className="w-4 h-4 text-sky-400" />
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-white">{progCat.title}</h3>
                </div>
                <span className="text-xs font-mono-tech text-sky-400 bg-sky-500/15 px-2 py-0.5 rounded-md border border-sky-500/30">
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
                  />
                ))}
              </div>
            </div>
            <div className="pt-2 mt-2 border-t border-white/[0.04] text-xs font-mono-tech text-gray-400 flex justify-between">
              <span>Primary Stack</span>
              <span className="text-sky-400">Embedded & Automotive C++</span>
            </div>
          </div>

          {/* Card 2: Frameworks & Libraries */}
          <div className="glass-panel rounded-xl p-3 border border-sky-500/40 flex flex-col justify-between relative overflow-hidden shadow-lg">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-500 via-sky-400 to-transparent" />
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-950/80 border border-sky-500/40 flex items-center justify-center">
                    <Layers className="w-4 h-4 text-sky-400" />
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-white">{frameCat.title}</h3>
                </div>
                <span className="text-xs font-mono-tech text-sky-400 bg-sky-500/15 px-2 py-0.5 rounded-md border border-sky-500/30">
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
                  />
                ))}
              </div>
            </div>
            <div className="pt-2 mt-2 border-t border-white/[0.04] text-xs font-mono-tech text-gray-400 flex justify-between">
              <span>HMI & Test Frameworks</span>
              <span className="text-sky-400">Qt / QML & Unit Testing</span>
            </div>
          </div>

          {/* Card 3: Language Practices & Standards */}
          <div className="glass-panel rounded-xl p-3 border border-sky-500/40 flex flex-col justify-between relative overflow-hidden shadow-lg">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-500 via-sky-400 to-transparent" />
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-950/80 border border-sky-500/40 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-sky-400" />
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-white">Coding Standards & Architecture</h3>
                </div>
                <span className="text-xs font-mono-tech text-sky-400 bg-sky-500/15 px-2 py-0.5 rounded-md border border-sky-500/30">
                  Best Practices
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] space-y-0.5">
                  <span className="font-bold text-sky-300 text-xs sm:text-[13px] block">Modern C++ (14/17/20)</span>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Deterministic memory management, RAII, move semantics, smart pointers, and concurrency for safety-critical targets.
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] space-y-0.5">
                  <span className="font-bold text-sky-300 text-xs sm:text-[13px] block">MISRA C / C++ Compliance</span>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Strict adherence to MISRA guidelines, avoiding undefined behaviors, pointer arithmetic safety, and static analysis verification.
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] space-y-0.5">
                  <span className="font-bold text-sky-300 text-xs sm:text-[13px] block">Automated Unit Testing</span>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Test-driven development using Google Test (GTest) for desktop logic and Ceedling (Unity/CMock) for target MCUs.
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-2 mt-2 border-t border-white/[0.04] text-xs font-mono-tech text-gray-400 flex justify-between">
              <span>Domain Focus</span>
              <span className="text-sky-400">Robust & Clean Architecture</span>
            </div>
          </div>
        </div>
      );
    }

    if (activeFilter === 'other') {
      return (
        <div
          key={activeFilter}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 flex-1 min-h-0 items-stretch ${
            slideDir === 'right' ? 'animate-slide-right' : 'animate-slide-left'
          }`}
        >
          {/* Card 1: Core Engineering Methodologies */}
          <div className="glass-panel rounded-xl p-3 border border-sky-500/40 flex flex-col justify-between relative overflow-hidden shadow-lg">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-500 via-sky-400 to-transparent" />
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-950/80 border border-sky-500/40 flex items-center justify-center">
                    <Lightbulb className="w-4 h-4 text-sky-400" />
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-white">Engineering Methodologies</h3>
                </div>
                <span className="text-xs font-mono-tech text-sky-400 bg-sky-500/15 px-2 py-0.5 rounded-md border border-sky-500/30">
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
                  <div key={idx} className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                      <span className="font-bold text-white text-xs sm:text-[13px]">{item.name}</span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed pl-5">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-2 mt-2 border-t border-white/[0.04] text-xs font-mono-tech text-gray-400 flex justify-between">
              <span>Domain Discipline</span>
              <span className="text-sky-400">Embedded Rigor</span>
            </div>
          </div>

          {/* Card 2: Quality, Process & ASPICE */}
          <div className="glass-panel rounded-xl p-3 border border-sky-500/40 flex flex-col justify-between relative overflow-hidden shadow-lg">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-500 via-sky-400 to-transparent" />
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-950/80 border border-sky-500/40 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-sky-400" />
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-white">Quality, V&V & ASPICE</h3>
                </div>
                <span className="text-xs font-mono-tech text-sky-400 bg-sky-500/15 px-2 py-0.5 rounded-md border border-sky-500/30">
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
                  <div key={idx} className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                      <span className="font-bold text-white text-xs sm:text-[13px]">{item.name}</span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed pl-5">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-2 mt-2 border-t border-white/[0.04] text-xs font-mono-tech text-gray-400 flex justify-between">
              <span>Standard</span>
              <span className="text-sky-400">Automotive SPICE Level 2/3</span>
            </div>
          </div>

          {/* Card 3: Semiconductor Hardware & Silicon View */}
          <div className="glass-panel rounded-xl p-3 border border-sky-500/40 flex flex-col justify-between relative overflow-hidden shadow-lg">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-500 via-sky-400 to-transparent" />
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-950/80 border border-sky-500/40 flex items-center justify-center">
                    <Cpu className="w-4 h-4 text-sky-400" />
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-white">Silicon & Target Hardware</h3>
                </div>
                <span className="text-xs font-mono-tech text-sky-400 bg-sky-500/15 px-2 py-0.5 rounded-md border border-sky-500/30">
                  Hardware Targets
                </span>
              </div>

              {/* TRAVEO II Photo Banner */}
              <div className="relative rounded-lg overflow-hidden border border-white/10 h-28 mb-2 shadow-md">
                <img
                  src="/assets/skills/microchip.jpg"
                  alt="Infineon TRAVEO II MCU"
                  className="w-full h-full object-cover object-center brightness-95 contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020509]/90 via-transparent to-transparent pointer-events-none" />
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
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5 flex-1 min-h-0 items-stretch ${
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
              <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.04] mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-sky-950/80 border border-sky-500/30 flex items-center justify-center flex-shrink-0 shadow-sm">
                    {getCategoryIcon(category.icon)}
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-white leading-none">
                    {category.title}
                  </h3>
                </div>
                {activeFilter === category.id && (
                  <span className="text-xs font-mono-tech text-sky-400 bg-sky-500/20 px-2 py-0.5 rounded border border-sky-500/40">
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
      className="relative w-full h-auto lg:h-[calc(100vh-4rem)] lg:max-h-[calc(100vh-4rem)] pt-14 sm:pt-16 lg:pt-0 pb-2 sm:pb-2.5 px-3 sm:px-6 lg:px-10 bg-[#020509] flex flex-col justify-between overflow-y-auto lg:overflow-hidden select-none scroll-mt-16"
    >
      {/* Ambient background glow */}
      <div
        className="absolute -top-32 left-1/3 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(21,159,255,0.08) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-between gap-1.5 sm:gap-2">
        
        {/* ══════════════════════════════════════════════════════
            TOP HEADER (Single Tab, Borderless, Full-Span Car Background Like Experience)
        ══════════════════════════════════════════════════════ */}
        <div
          className="relative rounded-b-2xl overflow-hidden p-3 sm:p-3.5 lg:py-3 lg:px-6 shrink-0 -mt-px shadow-lg"
          style={{
            background: 'linear-gradient(135deg, rgba(8, 16, 26, 0.85) 0%, rgba(4, 9, 16, 0.9) 100%)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: 'none',
          }}
        >
          {/* Full-width vehicle visual background - Spans the entire upper container */}
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
            <img
              src="/assets/skills/car_rear.jpg"
              alt="Automotive Skills View"
              className="w-full h-full object-cover object-center lg:object-right brightness-105 contrast-110"
              draggable={false}
            />
            {/* Soft fade gradients for readability while keeping the car dramatically visible */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#020509] via-[#020509]/75 md:via-[#020509]/45 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020509]/60 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="relative z-10 flex flex-col justify-between gap-2 max-w-full">
            {/* Upper: Title & Subtitle + Right Manifesto */}
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-0.5 max-w-xl">
                <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-mono-tech text-sky-400 font-semibold uppercase tracking-[0.22em]">
                  <span>/ 04</span>
                  <span className="w-5 h-[1px] bg-sky-400/60" />
                  <span>SKILLS</span>
                </div>
                <div className="flex items-baseline gap-2.5">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-black font-heading text-white leading-tight">
                    Skills That{' '}
                    <span
                      style={{
                        background: 'linear-gradient(90deg,#4FC3FF 0%,#159FFF 55%,#0077CC 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      Drive Progress.
                    </span>
                  </h2>
                </div>
                <p className="text-xs sm:text-[13px] text-[#9BA8B5] leading-snug line-clamp-1">
                  A blend of embedded systems knowledge, automotive domain expertise and modern development tools to build better, smarter and safer vehicles for tomorrow.
                </p>
              </div>

              {/* Right Tagline from reference */}
              <div className="hidden md:flex flex-col items-end justify-center text-right space-y-0.5 relative z-10 pr-1 flex-shrink-0">
                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono-tech tracking-widest text-gray-300 uppercase font-semibold">
                  <span>LEARN</span>
                  <span>•</span>
                  <span>BUILD</span>
                  <span>•</span>
                  <span className="text-sky-400">IMPROVE</span>
                  <span>•</span>
                  <span className="text-white">REPEAT</span>
                </div>
                <div className="text-xs sm:text-[13px] italic text-[#CAD5E2] font-medium leading-none">
                  &ldquo;Better Vehicles. Brighter Journeys.&rdquo;
                </div>
                <span className="text-[10px] font-mono-tech text-sky-400/90 tracking-widest uppercase">
                  SK REHAN AHAMED
                </span>
              </div>
            </div>

            {/* Lower: Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5 py-0.5">
              {FILTER_TABS.map((tab) => {
                const isActive = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`px-3 py-1 rounded-xl text-xs sm:text-[13px] font-heading font-medium transition-all duration-300 cursor-pointer whitespace-nowrap shadow-sm ${
                      isActive
                        ? 'bg-sky-500/25 text-white border border-sky-400/70 shadow-[0_0_12px_rgba(21,159,255,0.3)] scale-[1.02]'
                        : 'bg-black/50 backdrop-blur-md text-gray-300 hover:text-white hover:bg-white/[0.08] border border-white/10 hover:border-sky-500/40'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT (3 COLUMNS BALANCED IN ALL FILTER STATES) ── */}
        {renderFilteredContent()}

        {/* ── ROW 3: OTHER SKILLS (LEFT) + SILICON CHIP MACRO CARD (RIGHT) - ONLY ON 'ALL' FILTER ── */}
        {activeFilter === 'all' && (
          <div
            key="skills-all-footer-row"
            className={`grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-2.5 flex-shrink-0 ${
              slideDir === 'right' ? 'animate-slide-right' : 'animate-slide-left'
            }`}
          >
            {/* Left: Other Skills Pill Tags */}
            <div className="lg:col-span-2 glass-panel rounded-xl px-3 py-2 border border-white/[0.06] flex flex-col justify-center gap-1.5 overflow-hidden">
              <div className="flex items-center gap-1.5 text-sky-400 font-heading text-xs sm:text-sm font-bold">
                <Lightbulb className="w-4 h-4 text-sky-400" />
                <span>Other Skills</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {otherSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    onClick={() => handleTabClick('other')}
                    className="px-2.5 py-1 rounded-md text-xs font-medium text-gray-200 bg-white/[0.04] border border-white/[0.08] hover:border-sky-500/40 hover:text-sky-300 transition-all cursor-pointer"
                    title="Click to view full engineering practices breakdown"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Silicon Chip Macro Card (Infineon TRAVEO II) */}
            <div className="relative rounded-xl overflow-hidden border border-white/[0.08] p-2.5 flex items-center justify-between shadow-md">
              <img
                src="/assets/skills/microchip.jpg"
                alt="Infineon TRAVEO II Silicon Architecture"
                className="absolute inset-0 w-full h-full object-cover object-center brightness-90 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#030914]/90 via-[#030914]/70 to-transparent pointer-events-none" />

              <div className="relative z-10 space-y-0.5 max-w-[210px]">
                <span className="text-[10px] sm:text-xs font-mono-tech text-gray-300 tracking-wider uppercase block">
                  TECHNOLOGY BUILDS VEHICLES.
                </span>
                <span className="text-xs sm:text-sm font-heading font-black text-sky-400 leading-tight block">
                  PEOPLE DRIVE CHANGE.
                </span>
                <div className="w-6 h-[1.5px] bg-sky-400/80 mt-0.5" />
              </div>
            </div>
          </div>
        )}

        {/* ── BOTTOM FOOTER BANNER ── */}
        <div className="relative rounded-xl overflow-hidden border border-white/[0.08] px-3 py-1.5 sm:px-4 sm:py-2 flex-shrink-0">
          <img
            src="/assets/projects/footer_mountain_road.jpg"
            alt="Mountain Road Panorama"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020509] via-[#020509]/85 to-[#020509]" />

          <div className="relative z-10 flex items-center justify-between gap-2">
            {/* Left Quote */}
            <div className="flex items-center gap-2.5">
              <span className="text-xs sm:text-sm italic font-medium text-white leading-tight">
                Always Learning. <span className="text-sky-400 not-italic font-bold">Always Building.</span>
              </span>
              <div className="hidden md:block w-6 h-[1px] bg-sky-400/60" />
            </div>

            {/* Center Stats */}
            <div className="hidden sm:flex items-center gap-5 text-center">
              <div>
                <span className="text-sm sm:text-base font-bold text-white">{techCount}+</span>{' '}
                <span className="text-xs font-mono-tech text-gray-400">Technologies</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-700" />
              <div>
                <span className="text-sm sm:text-base font-bold text-white">{domainCount}+</span>{' '}
                <span className="text-xs font-mono-tech text-gray-400">Domains</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-700" />
              <div>
                <span className="text-sm sm:text-base font-bold text-sky-400">∞</span>{' '}
                <span className="text-xs font-mono-tech text-gray-400">Curiosity</span>
              </div>
            </div>

            {/* Right Button */}
            <button
              onClick={() => onNavigate('projects')}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md shadow-sky-600/30 transition-all cursor-pointer flex-shrink-0"
            >
              <span>Explore My Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
