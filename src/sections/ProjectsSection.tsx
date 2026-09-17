import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { GithubLogo } from '../components/Logos';
import { projectsData } from '../data/projectsData';
import type { Project } from '../data/projectsData';
import { ProjectModal } from '../components/ProjectModal';
import { useReveal } from '../hooks/useReveal';
import { useTheme } from '../context/ThemeContext';

interface ProjectsSectionProps {
  onNavigate?: (id: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onNavigate: _onNavigate }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [activeFilter, setActiveFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [slideDir, setSlideDir] = useState<'right' | 'left'>('right');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const headerRef = useReveal(0.1) as React.RefObject<HTMLDivElement>;

  const CARDS_PER_PAGE = 6;

  const filterTabs = [
    { id: 'ALL',                label: 'All' },
    { id: 'OFFICIAL',           label: 'Official (OEM)' },
    { id: 'PERSONAL',           label: 'Personal (GitHub)' },
    { id: 'INFOTAINMENT',       label: 'Cockpit & IVI' },
    { id: 'INSTRUMENT_CLUSTER', label: 'Cluster' },
    { id: 'AUTOMOTIVE_LINUX',   label: 'Yocto & RTOS' },
  ];

  const filteredProjects = projectsData.filter((p) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'OFFICIAL') return p.projectType === 'OFFICIAL';
    if (activeFilter === 'PERSONAL') return p.projectType === 'PERSONAL';

    if (activeFilter === 'INFOTAINMENT') {
      const kw = ['cockpit', 'ivi', 'hmi', 'head unit', 'infotainment'];
      return kw.some(
        (k) =>
          p.title.toLowerCase().includes(k) ||
          p.domain.toLowerCase().includes(k) ||
          p.subtitle.toLowerCase().includes(k) ||
          p.tags.some((t) => t.toLowerCase().includes(k)) ||
          p.category.includes('HMI / UI')
      );
    }

    if (activeFilter === 'INSTRUMENT_CLUSTER') {
      const kw = ['cluster', 'gauge', 'hil', 'traveo', 'speedometer', 'powertrain'];
      return kw.some(
        (k) =>
          p.title.toLowerCase().includes(k) ||
          p.domain.toLowerCase().includes(k) ||
          p.subtitle.toLowerCase().includes(k) ||
          p.tags.some((t) => t.toLowerCase().includes(k))
      );
    }

    if (activeFilter === 'AUTOMOTIVE_LINUX') {
      const kw = ['linux', 'yocto', 'rtos', 'bsp', 'bazel', 'qemu', 'arm', 'kernel', 'bare-metal'];
      return kw.some(
        (k) =>
          p.title.toLowerCase().includes(k) ||
          p.domain.toLowerCase().includes(k) ||
          p.subtitle.toLowerCase().includes(k) ||
          p.tags.some((t) => t.toLowerCase().includes(k)) ||
          p.category.includes('EMBEDDED')
      );
    }

    return p.category.includes(activeFilter);
  });

  const totalPages = Math.ceil(filteredProjects.length / CARDS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + CARDS_PER_PAGE);

  const handleFilterChange = (filterId: string) => {
    if (filterId === activeFilter) return;
    setSlideDir('right');
    setActiveFilter(filterId);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage) return;
    setSlideDir(newPage > currentPage ? 'right' : 'left');
    setCurrentPage(newPage);
  };

  return (
    <section
      id="projects"
      className={`relative w-full min-h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)] flex flex-col justify-between px-4 sm:px-6 lg:px-10 2xl:px-14 pb-2 sm:pb-3.5 select-none scroll-mt-16 border-t overflow-hidden transition-colors duration-300 ${
        isLight ? 'bg-[#F8FAFC] border-slate-200/80' : 'bg-[#020509] border-white/[0.04]'
      }`}
    >
      {/* Background Soft Glow */}
      <div
        className="absolute -top-32 left-1/3 w-[600px] h-[450px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(21,159,255,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1700px] 3xl:max-w-[2000px] mx-auto w-full h-full flex flex-col justify-between gap-1.5 lg:gap-2">
        
        {/* ══════════════════════════════════════════════════════
            UP PART: TOP HEADER (Borderless, Touching Upper Part)
        ══════════════════════════════════════════════════════ */}
        <div
          ref={headerRef}
          className="relative rounded-b-2xl overflow-hidden p-2.5 sm:p-4 lg:py-2.5 2xl:py-3.5 lg:px-6 shrink-0 -mt-px shadow-lg"
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
              alt="Automotive Mountain Drive"
              className="w-full h-full object-cover object-right brightness-105 contrast-110"
              draggable={false}
              loading="lazy"
              decoding="async"
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
            {/* Top row: Clean, focused Section Header */}
            <div className="flex flex-col justify-start space-y-0.5 max-w-3xl">
              <div className="flex items-center space-x-2 text-[9px] font-mono-tech text-sky-500 font-bold uppercase tracking-[0.22em]">
                <span>/ 03</span>
                <span className="w-6 h-[1px] bg-sky-500/60"></span>
                <span>PROJECTS</span>
              </div>

              <div className="flex flex-wrap items-baseline gap-x-2.5">
                <h2
                  className={`text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-black font-heading leading-tight ${
                    isLight ? 'text-slate-950' : 'text-white'
                  }`}
                  style={{
                    textShadow: isLight
                      ? '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 12px rgba(255, 255, 255, 0.9)'
                      : '0 2px 8px rgba(0, 0, 0, 0.7)',
                  }}
                >
                  Real Projects.{' '}
                  <span
                    style={{
                      background: 'linear-gradient(90deg,#4FC3FF 0%,#159FFF 55%,#0077CC 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Real Impact.
                  </span>
                </h2>
              </div>

              <p
                className={`hidden sm:block text-[11px] lg:text-[11.5px] 2xl:text-[13px] leading-relaxed line-clamp-1 sm:line-clamp-2 ${
                  isLight ? 'text-slate-900 font-medium' : 'text-[#CAD5E2]'
                }`}
                style={{
                  textShadow: isLight ? '0 1px 2px rgba(255, 255, 255, 0.95)' : 'none',
                }}
              >
                A showcase of my work in automotive infotainment, instrument cluster systems, and embedded software. From low-level drivers to high-level HMI, these projects reflect my passion for building smarter, safer, and better driving experiences.
              </p>
            </div>

            {/* Bottom Row: Filter Tabs (Clean, borderless pills) */}
            <div className="flex items-center overflow-x-auto gap-2 sm:gap-2.5 pt-1.5 pb-1 no-scrollbar w-full">
              {filterTabs.map((tab) => {
                const isActive = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleFilterChange(tab.id)}
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

        {/* ══════════════════════════════════════════════════════
            MIDDLE: DYNAMIC HARDWARE-ACCELERATED PROJECT CARDS
            Smoothly fills available vertical space on M4 Mac & 4K
        ══════════════════════════════════════════════════════ */}
        <div className="relative flex-1 min-h-0 flex flex-col justify-between py-1 lg:py-1.5 overflow-hidden w-full">
          {/* Small Sleek Left Side Arrow (Borderless) */}
          {totalPages > 1 && (
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`hidden md:flex absolute -left-4 lg:-left-6 z-20 w-8 h-8 rounded-full items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed shadow-xl transition-all cursor-pointer hover:scale-110 active:scale-95 ${
                isLight ? 'bg-white text-slate-800 border border-slate-200' : 'bg-[#08101A]/95 text-gray-200 hover:text-white border border-white/10'
              }`}
              title="Previous Projects"
              aria-label="Previous Projects"
            >
              <ChevronLeft className="w-4 h-4 text-sky-400" />
            </button>
          )}

          {/* 3x2 Grid: Dynamic 2-row grid filling 100% of available height on desktop */}
          <div
            key={`${activeFilter}-${currentPage}`}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-2.5 sm:gap-3 lg:gap-3 xl:gap-3.5 2xl:gap-4 w-full flex-1 min-h-0 overflow-hidden ${
              slideDir === 'right' ? 'animate-slide-right' : 'animate-slide-left'
            }`}
          >
            {currentProjects.length === 0 ? (
              <div className="col-span-full row-span-full flex flex-col items-center justify-center p-8 text-center space-y-3">
                <p className={`text-sm font-medium ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
                  No projects currently found in this category.
                </p>
                <button
                  onClick={() => handleFilterChange('ALL')}
                  className="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold shadow-md cursor-pointer hover:bg-sky-500 transition-colors"
                >
                  View All Projects
                </button>
              </div>
            ) : (
              currentProjects.map((p) => {
              return (
                <div
                  key={p.id}
                  className={`group rounded-xl lg:rounded-2xl overflow-hidden flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1 cursor-pointer h-auto lg:h-full min-h-0 ${
                    isLight
                      ? 'border border-slate-200/90 hover:border-sky-500/60 shadow-[0_4px_16px_rgba(15,23,42,0.06)] hover:shadow-[0_8px_30px_rgba(2,132,199,0.15)]'
                      : 'border border-sky-500/20 hover:border-sky-400/60 shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_30px_rgba(21,159,255,0.18)]'
                  }`}
                  style={{
                    background: isLight
                      ? '#FFFFFF'
                      : 'linear-gradient(135deg, rgba(8, 16, 26, 0.95) 0%, rgba(4, 9, 16, 0.98) 100%)',
                  }}
                  onClick={() => setSelectedProject(p)}
                >
                  {/* Image Header: Pure Inside Cockpit/Cluster Visual */}
                  <div className={`relative w-full h-[74px] sm:h-[80px] lg:h-[40%] xl:h-[42%] min-h-[72px] lg:min-h-[85px] shrink-0 overflow-hidden ${
                    isLight ? 'bg-slate-100' : 'bg-[#03070D]'
                  }`}>
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      draggable={false}
                      loading="lazy"
                      decoding="async"
                    />
                    {/* Dark gradient overlay for text legibility */}
                    <div className={`absolute inset-0 pointer-events-none ${
                      isLight
                        ? 'bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent'
                        : 'bg-gradient-to-t from-[#040912] via-transparent to-[#040912]/50'
                    }`} />

                    {/* Top Left: Clean Authentic Company Logo Pill (Borderless) */}
                    <div className="absolute top-1.5 left-1.5 z-10">
                      <div className="flex items-center justify-center px-2 py-0.5 rounded-md shadow-sm bg-white/95 border-0">
                        <img
                          src={p.companyLogo}
                          alt={p.companyOrContext}
                          className="h-3 sm:h-3.5 2xl:h-4 max-w-[55px] 2xl:max-w-[65px] object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card Body: Dynamically filling remaining card height */}
                  <div className={`p-2.5 sm:p-3 lg:p-3 xl:p-3.5 2xl:p-4 flex flex-col justify-between flex-1 min-h-0 ${
                    isLight
                      ? 'bg-gradient-to-b from-white to-slate-50'
                      : 'bg-gradient-to-b from-[#060D17] to-[#040810]'
                  }`}>
                    <div className="space-y-1">
                      {/* Top: Project Title on Left, ID on Right (Same Line) */}
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className={`font-heading font-bold text-[13px] sm:text-[13.5px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] leading-snug tracking-tight truncate transition-colors ${
                          isLight ? 'text-slate-900 group-hover:text-sky-600' : 'text-white group-hover:text-sky-400'
                        }`}>
                          {p.title}
                        </h3>
                        <span className="font-mono-tech text-[10.5px] 2xl:text-xs font-bold text-sky-400 shrink-0">
                          {p.id}
                        </span>
                      </div>

                      {/* Description: Comfortably displays on M4 and wide displays */}
                      <p className={`text-[10.5px] sm:text-[11px] lg:text-[11.5px] xl:text-[12px] 2xl:text-[13px] leading-[1.45] line-clamp-2 lg:line-clamp-2 xl:line-clamp-3 font-normal ${
                        isLight ? 'text-slate-600' : 'text-[#92A3B5]'
                      }`}>
                        {p.description}
                      </p>
                    </div>

                    {/* Bottom: Tags on Left, Details on Right (With hairline border and safe spacing) */}
                    <div className={`flex items-center justify-between gap-3 pt-1.5 lg:pt-2 border-t min-w-0 ${
                      isLight ? 'border-slate-200/80' : 'border-white/[0.06]'
                    }`}>
                      <div className="flex items-center min-w-0 overflow-hidden mr-2">
                        {p.tags.slice(0, 2).map((t, idx) => (
                          <span
                            key={idx}
                            className={`text-[9.5px] font-mono-tech whitespace-nowrap flex items-center shrink-0 ${
                              isLight ? 'text-slate-500' : 'text-[#7C8E9F]'
                            }`}
                          >
                            {idx > 0 && <span className={`mx-1.5 ${isLight ? 'text-slate-300' : 'text-white/20'}`}>•</span>}
                            <span>{t}</span>
                          </span>
                        ))}
                        {p.tags.length > 2 && (
                          <span className="text-sky-500 font-mono-tech text-[9px] font-bold ml-1.5 shrink-0">
                            +{p.tags.length - 2}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-auto">
                        {p.githubUrl && (
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={`inline-flex items-center gap-1 font-mono-tech text-[9.5px] transition-colors ${
                              isLight ? 'text-purple-600 hover:text-purple-800' : 'text-purple-300 hover:text-white'
                            }`}
                            title="View Source Code on GitHub"
                          >
                            <GithubLogo className="w-3 h-3" />
                            <span>Code</span>
                          </a>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(p);
                          }}
                          className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 font-mono-tech text-[10px] font-bold transition-colors shrink-0"
                        >
                          <span>Specs</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }))}
          </div>

          {/* Small Sleek Right Side Arrow (Borderless) */}
          {totalPages > 1 && (
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`hidden md:flex absolute -right-4 lg:-right-6 z-20 w-8 h-8 rounded-full items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed shadow-xl transition-all cursor-pointer hover:scale-110 active:scale-95 ${
                isLight ? 'bg-white text-slate-800 border border-slate-200' : 'bg-[#08101A]/95 text-gray-200 hover:text-white border border-white/10'
              }`}
              title="Next Projects"
              aria-label="Next Projects"
            >
              <ChevronRight className="w-4 h-4 text-sky-400" />
            </button>
          )}

          {/* Page Indicators (Useful on mobile, tablet & desktop) */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-2 z-10">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                const isCurrent = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      isCurrent
                        ? 'w-6 bg-sky-500 shadow-[0_0_8px_rgba(21,159,255,0.8)]'
                        : (isLight ? 'w-2 bg-slate-300 hover:bg-slate-400' : 'w-2 bg-white/20 hover:bg-white/40')
                    }`}
                    aria-label={`Go to page ${pageNum}`}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* ══════════════════════════════════════════════════════
            DOWN PART: MOUNTAIN HIGHWAY FOOTER CARD
        ══════════════════════════════════════════════════════ */}
        <div
          className={`relative rounded-2xl overflow-hidden px-5 sm:px-8 py-3 sm:py-3.5 2xl:py-4.5 flex items-center justify-between gap-4 shrink-0 shadow-lg ${
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
            <p className={`font-heading italic text-xs sm:text-[14px] 2xl:text-[16px] font-black leading-snug drop-shadow-sm ${
              isLight ? 'text-slate-950' : 'text-white'
            }`}>
              &ldquo;Small features.<br className="hidden sm:inline" /> Big journeys.&rdquo;
            </p>
            <div className="w-8 h-[2px] bg-[#159FFF] mt-1.5 rounded-full shadow-[0_0_8px_#159FFF]" />
          </div>

          {/* Center: Clean Prominent Stats */}
          <div className="relative z-10 flex items-center space-x-6 sm:space-x-10 text-center">
            <div>
              <span className={`block text-sm sm:text-base 2xl:text-xl font-black font-heading leading-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                11+
              </span>
              <span className={`text-[8.5px] sm:text-[9.5px] 2xl:text-xs font-mono-tech uppercase tracking-wider ${
                isLight ? 'text-slate-700 font-semibold' : 'text-gray-300'
              }`}>
                Projects Delivered
              </span>
            </div>
            <div className={`w-[1px] h-6 ${isLight ? 'bg-slate-300' : 'bg-white/20'}`} />
            <div>
              <span className={`block text-sm sm:text-base 2xl:text-xl font-black font-heading leading-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                100%
              </span>
              <span className={`text-[8.5px] sm:text-[9.5px] 2xl:text-xs font-mono-tech uppercase tracking-wider ${
                isLight ? 'text-slate-700 font-semibold' : 'text-gray-300'
              }`}>
                Passion Driven
              </span>
            </div>
            <div className={`w-[1px] h-6 ${isLight ? 'bg-slate-300' : 'bg-white/20'}`} />
            <div>
              <span className="block text-sm sm:text-base 2xl:text-xl font-black font-heading text-sky-500 leading-tight">
                ∞
              </span>
              <span className={`text-[8.5px] sm:text-[9.5px] 2xl:text-xs font-mono-tech uppercase tracking-wider ${
                isLight ? 'text-slate-700 font-semibold' : 'text-gray-300'
              }`}>
                Still Building
              </span>
            </div>
          </div>

          {/* Right: GitHub Action Link (Matching Reference Image) */}
          <div className="relative z-10">
            <a
              href="https://github.com/skrehanahamed?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-[13px] 2xl:text-sm font-mono-tech font-bold transition-all hover:scale-[1.03] active:scale-[0.97] cursor-pointer shadow-lg ${
                isLight
                  ? 'text-sky-700 bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/50 hover:border-sky-400'
                  : 'text-white bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/50 hover:border-sky-400/80 hover:shadow-[0_0_24px_rgba(21,159,255,0.4)]'
              }`}
            >
              <GithubLogo className="w-4 h-4 text-sky-400" />
              <span>View More on GitHub</span>
              <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
            </a>
          </div>
        </div>

      </div>



      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
