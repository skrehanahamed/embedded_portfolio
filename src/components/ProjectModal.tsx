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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Modern Seamless Modal Dialog with Subtle Cyan Glass Border */}
      <div
        className="relative w-full max-w-3xl rounded-2xl overflow-hidden z-10 my-auto shadow-[0_25px_80px_rgba(0,0,0,0.9)] max-h-[90vh] flex flex-col"
        style={{
          background: 'linear-gradient(180deg, #09121E 0%, #050B13 50%, #03060B 100%)',
          border: '1px solid rgba(21, 159, 255, 0.28)',
          boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.12), 0 25px 80px rgba(0, 0, 0, 0.85)',
        }}
      >
        {/* Modern Header with Border Divider */}
        <div className="px-6 py-4 flex items-center justify-between gap-4 shrink-0 border-b border-white/[0.08] bg-[#071322]/40">
          <div className="flex items-center gap-3 min-w-0">
            {/* Company Logo Pill with Border */}
            <div className="px-2.5 py-1 rounded-lg bg-white/95 border border-white/20 shadow-sm shrink-0">
              <img
                src={project.companyLogo}
                alt={project.companyOrContext}
                className="h-3.5 max-w-[62px] object-contain"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono-tech font-bold text-sky-400">
                  PROJECT {project.id}
                </span>
                <span className="text-white/20">•</span>
                <span className="text-[10px] font-mono-tech text-gray-400 uppercase tracking-wider truncate">
                  {project.domain}
                </span>
              </div>
              <h2 className="font-heading font-bold text-base sm:text-lg text-white leading-tight tracking-tight truncate">
                {project.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] hover:border-purple-400/40 text-white text-xs font-mono-tech transition-all cursor-pointer"
                title="View Code on GitHub"
              >
                <GithubLogo className="w-3.5 h-3.5 text-purple-300" />
                <span className="hidden sm:inline">GitHub</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.08] border border-transparent hover:border-white/10 transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 custom-scrollbar">
          {/* Visual Snapshot with Subtle Frame Border */}
          <div className="relative w-full h-44 sm:h-56 rounded-xl overflow-hidden bg-[#020508] border border-white/[0.08] shadow-inner">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050B13] via-transparent to-transparent pointer-events-none" />
            
            {/* Quick Context Strip with Borders */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono-tech text-gray-300">
              <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-gray-200 shadow-sm">
                {project.fullDetails.role} • {project.fullDetails.clientOrContext}
              </span>
              <span className="hidden sm:inline-block px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-sky-500/20 text-sky-400 shadow-sm">
                {project.hardwareTarget}
              </span>
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-1.5 p-4 rounded-xl bg-white/[0.015] border border-white/[0.06]">
            <h3 className="font-heading text-xs font-bold text-gray-300 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38BDF8]" />
              <span>Project Overview</span>
            </h3>
            <p className="text-xs sm:text-[13px] text-[#A5B6C8] leading-relaxed">
              {project.fullDetails.overview}
            </p>
          </div>

          {/* System Architecture with Blueprint Glass Border */}
          <div className="space-y-1.5 p-4 rounded-xl bg-sky-950/15 border border-sky-500/20">
            <h3 className="font-heading text-xs font-bold text-sky-400 uppercase tracking-widest flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-sky-400" />
              <span>System Architecture &amp; Data Pipeline</span>
            </h3>
            <p className="text-xs text-gray-300 font-mono-tech leading-relaxed">
              {project.fullDetails.architecture}
            </p>
          </div>

          {/* Core Engineering Contributions */}
          <div className="space-y-2 p-4 rounded-xl bg-white/[0.015] border border-white/[0.06]">
            <h3 className="font-heading text-xs font-bold text-gray-300 uppercase tracking-widest flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              <span>Key Responsibilities &amp; Engineering Solutions</span>
            </h3>
            <div className="space-y-2 pt-1">
              {project.fullDetails.responsibilities.map((resp, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-[12.5px] text-[#9FB0C2] leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400/80 mt-1.5 shrink-0" />
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills & Validation Tools with Logos and Refined Borders */}
          <div className="space-y-2.5 p-4 rounded-xl bg-white/[0.015] border border-white/[0.06]">
            <h3 className="font-heading text-xs font-bold text-gray-300 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
              <span>Technologies &amp; Validation Tools</span>
            </h3>
            <div className="flex flex-wrap gap-2 pt-1">
              {allSkills.map((skill, idx) => {
                const logo = getSkillLogo(skill);
                return (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-sky-400/40 hover:bg-white/[0.06] text-xs font-mono-tech text-gray-200 transition-all cursor-default shadow-sm"
                  >
                    {logo && (
                      <img
                        src={logo}
                        alt={skill}
                        className="w-4 h-4 object-contain shrink-0"
                      />
                    )}
                    <span>{skill}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Impact Statement with Soft Border */}
          <div className="p-3.5 rounded-xl bg-emerald-950/15 border border-emerald-500/20 text-xs">
            <div className="text-[#8899AA]">
              <span className="text-emerald-400 font-bold font-mono-tech uppercase tracking-wider mr-1.5">Business Impact:</span>
              <span className="text-gray-200">{project.fullDetails.impact}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
