import React, { useEffect } from 'react';
import { X, ArrowUpRight, Cpu, Layers } from 'lucide-react';
import { GithubLogo } from './Logos';
import type { Project } from '../data/projectsData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

// Maps tech/skill names to authentic vector/PNG logos in public/assets/logos/
const getSkillLogo = (skill: string): string | null => {
  const s = skill.toLowerCase().trim();
  if (s.includes('c++')) return '/assets/logos/cpp.svg';
  if (s === 'c' || s.includes('bare-metal c') || s.includes('pure c') || s.includes('misra c')) return '/assets/logos/c.svg';
  if (s.includes('python')) return '/assets/logos/python.svg';
  if (s.includes('autosar')) return '/assets/logos/autosar.svg';
  if (s.includes('qt')) return '/assets/logos/qt.svg';
  if (s.includes('yocto') || s.includes('linux')) return '/assets/logos/linux.svg';
  if (s.includes('canoe') || s.includes('canalyzer')) return '/assets/logos/canoe.svg';
  if (s.includes('can') || s.includes('uds') || s.includes('vector') || s.includes('davinci')) return '/assets/logos/vector.svg';
  if (s.includes('cmake')) return '/assets/logos/cmake.svg';
  if (s.includes('bazel')) return '/assets/logos/bazel.svg';
  if (s.includes('docker')) return '/assets/logos/docker.svg';
  if (s.includes('jenkins')) return '/assets/logos/jenkins.svg';
  if (s.includes('git') && !s.includes('digital')) return '/assets/logos/git.svg';
  if (s.includes('robot framework')) return '/assets/logos/robotframework.svg';
  if (s.includes('trace32') || s.includes('lauterbach')) return '/assets/logos/trace32.svg';
  if (s.includes('infineon') || s.includes('traveo')) return '/assets/logos/infineon.svg';
  if (s.includes('qualcomm') || s.includes('sa8155p') || s.includes('sa6155p')) return '/assets/logos/qualcomm.svg';
  if (s.includes('renesas') || s.includes('rh850')) return '/assets/logos/renesas.svg';
  if (s.includes('android')) return '/assets/logos/android.svg';
  if (s.includes('bash')) return '/assets/logos/bash.svg';
  if (s.includes('vscode')) return '/assets/logos/vscode.svg';
  return null;
};

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  // Combine unique tags and tools for full skill coverage
  const allSkills = Array.from(new Set([...project.tags, ...project.fullDetails.tools]));

  return (
    <div className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-2.5 pt-2.5 sm:p-4 lg:p-6 overflow-x-hidden overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modern Responsive Modal Dialog (Top-anchored on mobile, centered on desktop) */}
      <div
        className="relative w-full max-w-2xl lg:max-w-3xl rounded-2xl overflow-hidden z-10 shadow-[0_25px_80px_rgba(0,0,0,0.9)] max-h-[93vh] sm:max-h-[90vh] flex flex-col border border-sky-500/30 mt-0 sm:my-auto overflow-x-hidden"
        style={{
          background: 'linear-gradient(180deg, #09121E 0%, #050B13 50%, #03060B 100%)',
          boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.12), 0 25px 80px rgba(0, 0, 0, 0.85)',
        }}
      >
        {/* Modal Header - Compact & Crisp */}
        <div className="px-3.5 py-3 sm:px-6 sm:py-4 flex items-center justify-between gap-3 shrink-0 border-b border-white/[0.08] bg-[#071322]/90">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            {/* Company Logo Pill */}
            <div className="px-2 py-1 rounded-lg bg-white/95 border border-white/20 shadow-sm shrink-0">
              <img
                src={project.companyLogo}
                alt={project.companyOrContext}
                className="h-3 sm:h-3.5 max-w-[54px] sm:max-w-[62px] object-contain"
                loading="lazy"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[9.5px] sm:text-[10px] font-mono-tech font-bold text-sky-400 shrink-0">
                  PROJECT {project.id}
                </span>
                <span className="text-white/20">•</span>
                <span className="text-[9.5px] sm:text-[10px] font-mono-tech text-gray-300 uppercase tracking-wider truncate">
                  {project.domain}
                </span>
              </div>
              <h2 className="font-heading font-bold text-sm sm:text-base lg:text-lg text-white leading-snug tracking-tight line-clamp-1 sm:line-clamp-2">
                {project.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-white text-[11px] sm:text-xs font-mono-tech transition-all cursor-pointer"
                title="View Code on GitHub"
              >
                <GithubLogo className="w-3.5 h-3.5 text-purple-300" />
                <span className="hidden sm:inline">Code</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] transition-all cursor-pointer focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body with smooth vertical-only touch scrolling */}
        <div className="p-3.5 sm:p-6 overflow-y-auto overflow-x-hidden overscroll-contain space-y-3.5 sm:space-y-4 custom-scrollbar flex-1 touch-pan-y break-words">
          {/* Visual Snapshot (Compact on mobile so project info is immediately visible) */}
          <div className="relative w-full h-24 sm:h-44 lg:h-52 rounded-xl overflow-hidden bg-[#020508] border border-white/[0.08] shadow-inner shrink-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050B13] via-transparent to-transparent pointer-events-none" />
            
            {/* Quick Context Strip with safe wrapping */}
            <div className="absolute bottom-1.5 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 flex flex-wrap items-center gap-1.5 text-[9.5px] sm:text-[11px] font-mono-tech text-gray-300">
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-black/85 backdrop-blur-md border border-white/10 text-white shadow-sm truncate max-w-full">
                {project.fullDetails.role} • {project.fullDetails.clientOrContext}
              </span>
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-black/85 backdrop-blur-md border border-sky-500/30 text-sky-400 shadow-sm truncate">
                {project.hardwareTarget}
              </span>
            </div>
          </div>

          {/* Project Overview */}
          <div className="space-y-1.5 p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <h3 className="font-heading text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38BDF8]" />
              <span>Project Overview</span>
            </h3>
            <p className="text-xs sm:text-[13px] text-gray-200 leading-relaxed font-normal">
              {project.fullDetails.overview}
            </p>
          </div>

          {/* System Architecture */}
          <div className="space-y-1.5 p-3.5 sm:p-4 rounded-xl bg-sky-950/20 border border-sky-500/25">
            <h3 className="font-heading text-xs font-bold text-sky-400 uppercase tracking-widest flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-sky-400" />
              <span>System Architecture &amp; Data Pipeline</span>
            </h3>
            <p className="text-xs sm:text-[12.5px] text-gray-200 font-mono-tech leading-relaxed">
              {project.fullDetails.architecture}
            </p>
          </div>

          {/* Key Engineering Solutions */}
          <div className="space-y-2 p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <h3 className="font-heading text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              <span>Key Responsibilities &amp; Engineering Solutions</span>
            </h3>
            <div className="space-y-2 pt-1">
              {project.fullDetails.responsibilities.map((resp, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-[12.5px] text-gray-300 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies & Tools */}
          <div className="space-y-2 p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <h3 className="font-heading text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
              <span>Technologies &amp; Validation Tools</span>
            </h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
              {allSkills.map((skill, idx) => {
                const logo = getSkillLogo(skill);
                return (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono-tech text-white transition-all cursor-default"
                  >
                    {logo && (
                      <img
                        src={logo}
                        alt={skill}
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain shrink-0"
                        loading="lazy"
                      />
                    )}
                    <span>{skill}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Business Impact */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs sm:text-[12.5px]">
            <div className="text-gray-300 leading-relaxed">
              <span className="text-emerald-400 font-bold font-mono-tech uppercase tracking-wider mr-1.5">Business Impact:</span>
              <span className="text-white">{project.fullDetails.impact}</span>
            </div>
          </div>

          {/* Mobile Bottom Close Button for easy thumb reach */}
          <div className="pt-2 sm:hidden">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 active:scale-98 transition-all cursor-pointer"
            >
              Close Project Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
