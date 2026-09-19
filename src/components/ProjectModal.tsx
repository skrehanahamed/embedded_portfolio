import React, { useEffect } from 'react';
import { X, ArrowUpRight, Cpu, Layers } from 'lucide-react';
import { GithubLogo } from './Logos';
import { useTheme } from '../context/ThemeContext';
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
  const { theme } = useTheme();
  const isLight = theme === 'light';

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
        className={`fixed inset-0 transition-opacity ${
          isLight ? 'bg-slate-900/60 backdrop-blur-md' : 'bg-black/85 backdrop-blur-md'
        }`}
        onClick={onClose}
      />

      {/* Modern Responsive Modal Dialog (Top-anchored on mobile, centered on desktop) */}
      <div
        className={`relative w-full max-w-2xl lg:max-w-3xl rounded-2xl overflow-hidden z-10 max-h-[93vh] sm:max-h-[90vh] flex flex-col mt-0 sm:my-auto overflow-x-hidden transition-colors ${
          isLight
            ? 'bg-white border border-slate-200 shadow-2xl'
            : 'border border-sky-500/30 shadow-[0_25px_80px_rgba(0,0,0,0.9)]'
        }`}
        style={
          isLight
            ? {
                background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
                boxShadow: '0 25px 60px -12px rgba(15, 23, 42, 0.25)',
              }
            : {
                background: 'linear-gradient(180deg, #09121E 0%, #050B13 50%, #03060B 100%)',
                boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.12), 0 25px 80px rgba(0, 0, 0, 0.85)',
              }
        }
      >
        {/* Modal Header - Compact & Crisp */}
        <div className={`px-3.5 py-3 sm:px-6 sm:py-4 flex items-center justify-between gap-3 shrink-0 border-b ${
          isLight ? 'border-slate-200 bg-slate-50/90' : 'border-white/[0.08] bg-[#071322]/90'
        }`}>
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            {/* Company Logo Pill */}
            <div className={`px-2 py-1 rounded-lg shadow-sm shrink-0 ${
              isLight ? 'bg-white border border-slate-200' : 'bg-white/95 border border-white/20'
            }`}>
              <img
                src={project.companyLogo}
                alt={project.companyOrContext}
                className="h-3 sm:h-3.5 max-w-[3.375rem] sm:max-w-[3.875rem] object-contain"
                loading="lazy"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className={`text-[0.59375rem] sm:text-[0.625rem] font-mono-tech font-bold ${
                  isLight ? 'text-sky-600' : 'text-sky-400'
                } shrink-0`}>
                  PROJECT {project.id}
                </span>
                <span className={isLight ? 'text-slate-300' : 'text-white/20'}>•</span>
                <span className={`text-[0.59375rem] sm:text-[0.65625rem] font-heading font-bold uppercase tracking-wider ${
                  isLight ? 'text-slate-800' : 'text-slate-200'
                }`}>
                  {project.companyOrContext}
                </span>
                <span className={isLight ? 'text-slate-300' : 'text-white/20'}>•</span>
                <span className={`text-[0.59375rem] sm:text-[0.625rem] font-mono-tech uppercase tracking-wider truncate ${
                  isLight ? 'text-slate-600 font-semibold' : 'text-gray-300'
                }`}>
                  {project.domain}
                </span>
              </div>
              <h2 className={`font-heading font-bold text-sm sm:text-base lg:text-lg leading-snug tracking-tight line-clamp-1 sm:line-clamp-2 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
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
                className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 rounded-lg border text-[0.6875rem] sm:text-xs font-mono-tech transition-all cursor-pointer ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200/80 border-slate-200 text-slate-800'
                    : 'bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.08] text-white'
                }`}
                title="View Code on GitHub"
              >
                <GithubLogo className={`w-3.5 h-3.5 ${isLight ? 'text-purple-600' : 'text-purple-300'}`} />
                <span className="hidden sm:inline">Code</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>
            )}

            <button
              onClick={onClose}
              className={`p-1.5 rounded-lg transition-all cursor-pointer focus:outline-none ${
                isLight
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
                  : 'text-gray-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12]'
              }`}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body with smooth vertical-only touch scrolling */}
        <div className="p-3.5 sm:p-6 overflow-y-auto overflow-x-hidden overscroll-contain space-y-3.5 sm:space-y-4 custom-scrollbar flex-1 touch-pan-y break-words">
          {/* Visual Snapshot (Compact on mobile so project info is immediately visible) */}
          <div className={`relative w-full h-28 sm:h-44 lg:h-52 rounded-xl overflow-hidden shadow-inner shrink-0 ${
            isLight ? 'bg-slate-100 border border-slate-200' : 'bg-[#020508] border border-white/[0.08]'
          }`}>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />

            {/* High-Contrast Multi-Stop Gradient Scrim behind the text */}
            <div className={`absolute inset-0 pointer-events-none ${
              isLight
                ? 'bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent'
                : 'bg-gradient-to-t from-[#02050A]/95 via-[#02050A]/35 to-transparent'
            }`} />

            {/* Top Left on photo: Prominent Company & Client Pill */}
            <div className="absolute top-2 left-2 z-10">
              <div className={`flex items-center gap-2 px-2.5 py-1 rounded-lg shadow-md backdrop-blur-md ${
                isLight
                  ? 'bg-white/95 border border-slate-300 text-slate-950 font-bold'
                  : 'bg-black/85 border border-white/20 text-white font-medium'
              }`}>
                <img
                  src={project.companyLogo}
                  alt={project.companyOrContext}
                  className="h-3 sm:h-3.5 max-w-[3.125rem] object-contain shrink-0"
                />
                <span className="text-[0.65625rem] sm:text-[0.71875rem] font-heading tracking-tight leading-none">
                  {project.companyOrContext}
                </span>
              </div>
            </div>
            
            {/* Quick Context Strip in Front of Photo with High Contrast in Light & Dark Mode */}
            <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 flex flex-wrap items-center gap-1.5 text-[0.625rem] sm:text-[0.71875rem] font-mono-tech z-10">
              <span className={`px-2.5 py-1 rounded-lg shadow-md backdrop-blur-md truncate max-w-full font-bold ${
                isLight
                  ? 'bg-white/95 border border-slate-300 text-slate-950'
                  : 'bg-black/90 border border-white/20 text-white'
              }`}>
                {project.fullDetails.role} • {project.fullDetails.clientOrContext}
              </span>
              <span className={`px-2.5 py-1 rounded-lg shadow-md backdrop-blur-md truncate font-bold ${
                isLight
                  ? 'bg-sky-50/95 border border-sky-300 text-sky-800'
                  : 'bg-sky-950/90 border border-sky-500/40 text-sky-300'
              }`}>
                {project.hardwareTarget}
              </span>
            </div>
          </div>

          {/* Project Overview */}
          <div className={`space-y-1.5 p-3 sm:p-4 rounded-xl border ${
            isLight ? 'bg-white border-slate-200/90 shadow-xs' : 'bg-white/[0.03] border-white/[0.06]'
          }`}>
            <h3 className={`font-heading text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shadow-[0_0_8px_#0ea5e9]" />
              <span>Project Overview</span>
            </h3>
            <p className={`text-xs sm:text-[0.8125rem] leading-relaxed font-normal ${
              isLight ? 'text-slate-700' : 'text-gray-200'
            }`}>
              {project.fullDetails.overview}
            </p>
          </div>

          {/* System Architecture */}
          <div className={`space-y-1.5 p-3.5 sm:p-4 rounded-xl border ${
            isLight ? 'bg-sky-50/75 border-sky-200' : 'bg-sky-950/20 border-sky-500/25'
          }`}>
            <h3 className={`font-heading text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${
              isLight ? 'text-sky-700 font-bold' : 'text-sky-400'
            }`}>
              <Cpu className={`w-3.5 h-3.5 ${isLight ? 'text-sky-600' : 'text-sky-400'}`} />
              <span>System Architecture &amp; Data Pipeline</span>
            </h3>
            <p className={`text-xs sm:text-[0.78125rem] font-mono-tech leading-relaxed ${
              isLight ? 'text-slate-800' : 'text-gray-200'
            }`}>
              {project.fullDetails.architecture}
            </p>
          </div>

          {/* Key Engineering Solutions */}
          <div className={`space-y-2 p-3.5 sm:p-4 rounded-xl border ${
            isLight ? 'bg-white border-slate-200/90 shadow-xs' : 'bg-white/[0.03] border-white/[0.06]'
          }`}>
            <h3 className={`font-heading text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              <Layers className={`w-3.5 h-3.5 ${isLight ? 'text-sky-600' : 'text-sky-400'}`} />
              <span>Key Responsibilities &amp; Engineering Solutions</span>
            </h3>
            <div className="space-y-2 pt-1">
              {project.fullDetails.responsibilities.map((resp, idx) => (
                <div key={idx} className={`flex items-start gap-2.5 text-xs sm:text-[0.78125rem] leading-relaxed ${
                  isLight ? 'text-slate-700' : 'text-gray-300'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies & Tools */}
          <div className={`space-y-2 p-3.5 sm:p-4 rounded-xl border ${
            isLight ? 'bg-white border-slate-200/90 shadow-xs' : 'bg-white/[0.03] border-white/[0.06]'
          }`}>
            <h3 className={`font-heading text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              <span>Technologies &amp; Validation Tools</span>
            </h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
              {allSkills.map((skill, idx) => {
                const logo = getSkillLogo(skill);
                return (
                  <div
                    key={idx}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border text-xs font-mono-tech transition-all cursor-default ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-800 shadow-xs font-medium'
                        : 'bg-white/[0.04] border-white/[0.08] text-white'
                    }`}
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
          <div className={`p-3 sm:p-3.5 rounded-xl border text-xs sm:text-[0.78125rem] ${
            isLight ? 'bg-emerald-50/75 border-emerald-200' : 'bg-emerald-950/20 border-emerald-500/30'
          }`}>
            <div className="leading-relaxed">
              <span className={`font-bold font-mono-tech uppercase tracking-wider mr-1.5 ${
                isLight ? 'text-emerald-700' : 'text-emerald-400'
              }`}>
                Business Impact:
              </span>
              <span className={isLight ? 'text-slate-900 font-medium' : 'text-white'}>
                {project.fullDetails.impact}
              </span>
            </div>
          </div>

          {/* Mobile Bottom Close Button for easy thumb reach */}
          <div className="pt-2 sm:hidden">
            <button
              onClick={onClose}
              className={`w-full py-2.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wider active:scale-98 transition-all cursor-pointer ${
                isLight
                  ? 'text-slate-800 bg-slate-200 hover:bg-slate-300'
                  : 'text-white bg-white/10 hover:bg-white/20'
              }`}
            >
              Close Project Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
