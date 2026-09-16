import React, { useState } from 'react';
import { ArrowRight, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { GithubLogo } from '../components/Logos';
import { projectsData } from '../data/projectsData';
import type { Project } from '../data/projectsData';
import { ProjectModal } from '../components/ProjectModal';
import { useReveal } from '../hooks/useReveal';

interface ProjectsSectionProps {
  onNavigate?: (id: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onNavigate: _onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [slideDir, setSlideDir] = useState<'right' | 'left'>('right');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const headerRef = useReveal(0.1) as React.RefObject<HTMLDivElement>;

  const CARDS_PER_PAGE = 6;

  const filterTabs = [
    { id: 'ALL',                label: 'All' },
    { id: 'OFFICIAL',           label: 'Official (Company)' },
    { id: 'PERSONAL',           label: 'Personal (GitHub)' },
    { id: 'AUTOMOTIVE',         label: 'Automotive' },
    { id: 'EMBEDDED',           label: 'Embedded' },
    { id: 'AUTOSAR',            label: 'AUTOSAR' },
    { id: 'HMI / UI',           label: 'HMI / UI' },
    { id: 'TOOLS & AUTOMATION', label: 'Tools & Automation' },
  ];

  const handleFilterChange = (tabId: string) => {
    if (tabId === activeFilter) return;
    const oldIdx = filterTabs.findIndex((t) => t.id === activeFilter);
    const newIdx = filterTabs.findIndex((t) => t.id === tabId);
    setSlideDir(newIdx >= oldIdx ? 'right' : 'left');
    setActiveFilter(tabId);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage) return;
    setSlideDir(newPage > currentPage ? 'right' : 'left');
    setCurrentPage(newPage);
  };

  const filteredProjects = projectsData.filter((p) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'OFFICIAL') return p.projectType === 'OFFICIAL';
    if (activeFilter === 'PERSONAL') return p.projectType === 'PERSONAL';
    return p.category.includes(activeFilter);
  });

  const totalPages = Math.ceil(filteredProjects.length / CARDS_PER_PAGE) || 1;
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE
  );

  return (
    <section
      id="projects"
      className="relative w-full h-auto lg:h-[calc(100vh-4rem)] lg:max-h-[calc(100vh-4rem)] pt-14 sm:pt-16 lg:pt-0 pb-2 sm:pb-2.5 lg:pb-3 px-4 sm:px-8 lg:px-12 bg-[#020509] flex flex-col justify-between overflow-hidden select-none scroll-mt-16"
    >
      {/* Ambient background glow */}
      <div
        className="absolute -top-32 left-1/3 w-[600px] h-[450px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(21,159,255,0.08) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-between gap-2 lg:gap-2.5">

        {/* ══════════════════════════════════════════════════════
            UP PART: TOP HEADER (Borderless, Touching Upper Part)
        ══════════════════════════════════════════════════════ */}
        <div
          ref={headerRef}
          className="reveal-left relative rounded-b-2xl overflow-hidden p-3.5 sm:p-4 lg:py-3 lg:px-6 shrink-0 -mt-px"
          style={{
            background: 'linear-gradient(135deg, rgba(8, 16, 26, 0.85) 0%, rgba(4, 9, 16, 0.9) 100%)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          {/* Right vehicle visual background - CLEARLY VISIBLE WITH VIBRANT TAILLIGHTS */}
          <div className="absolute top-0 right-0 bottom-0 w-full md:w-[58%] lg:w-[52%] opacity-90 md:opacity-95 pointer-events-none overflow-hidden">
            <img
              src="/assets/skills/car_rear.jpg"
              alt="Automotive Mountain Drive"
              className="w-full h-full object-cover object-right brightness-105 contrast-110"
              draggable={false}
            />
            {/* Soft fade only on the far left side */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#050C16] via-[#050C16]/50 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050C16]/40 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="relative z-10 flex flex-col gap-1.5 lg:gap-2">
            {/* Top row: Clean, focused Section Header (No redundant experience stats) */}
            <div className="flex flex-col justify-start space-y-0.5 max-w-3xl">
              <div className="flex items-center space-x-2 text-[9px] font-mono-tech text-sky-400 font-semibold uppercase tracking-[0.22em]">
                <span>/ 03</span>
                <span className="w-6 h-[1px] bg-sky-400/60"></span>
                <span>PROJECTS</span>
              </div>

              <div className="flex flex-wrap items-baseline gap-x-2.5">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-black font-heading text-white leading-tight">
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

              <p className="text-[11px] lg:text-[11.5px] text-[#9BA8B5] leading-relaxed line-clamp-1 sm:line-clamp-2">
                A showcase of my work in automotive infotainment, instrument cluster systems, and embedded software. From low-level drivers to high-level HMI, these projects reflect my passion for building smarter, safer, and better driving experiences.
              </p>
            </div>

            {/* Bottom Row: Filter Tabs (Pro Text-Only Navigation, No Borders, No Background Boxes) */}
            <div className="flex items-center overflow-x-auto gap-5 sm:gap-7 pt-1 pb-1 no-scrollbar">
              {filterTabs.map((tab) => {
                const isActive = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleFilterChange(tab.id)}
                    className={`relative py-1 text-[11px] sm:text-[12px] font-mono-tech transition-colors whitespace-nowrap cursor-pointer bg-transparent border-0 outline-none ${
                      isActive
                        ? 'text-white font-bold'
                        : 'text-[#8091A2] hover:text-white font-medium'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#159FFF] shadow-[0_0_8px_#159FFF]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            MIDDLE: 6 COMPACT BOXES WITH SLEEK GLASS BORDER
            Exact glass border styling matching reference image!
        ══════════════════════════════════════════════════════ */}
        <div className={`relative flex-1 min-h-0 flex flex-col ${currentProjects.length < 6 ? 'justify-start pt-2' : 'justify-center my-auto'}`}>
          {/* Small Sleek Left Side Arrow (Borderless) */}
          {totalPages > 1 && (
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="hidden md:flex absolute -left-4 lg:-left-6 z-20 w-8 h-8 rounded-full items-center justify-center text-gray-200 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed shadow-xl transition-all cursor-pointer hover:scale-110 active:scale-95"
              style={{
                background: 'rgba(8, 16, 26, 0.9)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: 'none',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.6)',
              }}
              title="Previous Projects"
              aria-label="Previous Projects"
            >
              <ChevronLeft className="w-4 h-4 text-sky-400" />
            </button>
          )}

          {/* 3x2 Grid: Tight, uniform row and column spacing with smooth slide transition */}
          <div
            key={`${activeFilter}-${currentPage}`}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 w-full ${
              slideDir === 'right' ? 'animate-slide-right' : 'animate-slide-left'
            }`}
          >
            {currentProjects.map((p) => {
              return (
                <div
                  key={p.id}
                  className="group rounded-xl lg:rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 cursor-pointer h-[194px] sm:h-[198px] lg:h-[204px]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(8, 16, 26, 0.8) 0%, rgba(4, 9, 16, 0.9) 100%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(21, 159, 255, 0.22)',
                    boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.12), 0 6px 20px 0 rgba(0, 0, 0, 0.35)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(21, 159, 255, 0.55)';
                    e.currentTarget.style.boxShadow = 'inset 0 1px 0 0 rgba(21, 159, 255, 0.35), 0 10px 28px 0 rgba(21, 159, 255, 0.18)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(21, 159, 255, 0.22)';
                    e.currentTarget.style.boxShadow = 'inset 0 1px 0 0 rgba(255, 255, 255, 0.12), 0 6px 20px 0 rgba(0, 0, 0, 0.35)';
                  }}
                  onClick={() => setSelectedProject(p)}
                >
                  {/* Image Header: Pure Inside Cockpit/Cluster Visual */}
                  <div className="relative w-full h-[78px] sm:h-[82px] lg:h-[84px] shrink-0 overflow-hidden bg-[#03070D]">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      draggable={false}
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040912] via-transparent to-[#040912]/40 pointer-events-none" />

                    {/* Top Left: Authentic Company PNG Logo Pill */}
                    <div className="absolute top-1.5 left-1.5 z-10">
                      <div
                        className="flex items-center justify-center px-2 py-0.5 rounded-md shadow-md"
                        style={{
                          background: 'rgba(255, 255, 255, 0.95)',
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)',
                        }}
                      >
                        <img
                          src={p.companyLogo}
                          alt={p.companyOrContext}
                          className="h-3 sm:h-3.5 max-w-[58px] object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card Body: Roomy, Well-Formatted, Matching Reference Image */}
                  <div className="p-3 sm:p-3.5 flex flex-col justify-between flex-1 min-h-0 bg-gradient-to-b from-[#060D17] to-[#040810]">
                    <div className="space-y-1 sm:space-y-1.5">
                      {/* Top: Project Title on Left, ID on Right (Same Line) */}
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-heading font-bold text-[13.5px] sm:text-[14px] text-white group-hover:text-sky-400 transition-colors leading-snug tracking-tight truncate">
                          {p.title}
                        </h3>
                        <span className="font-mono-tech text-[11px] font-bold text-sky-400 shrink-0">
                          {p.id}
                        </span>
                      </div>

                      {/* Generous Description with Room to Breathe */}
                      <p className="text-[#92A3B5] text-[11px] sm:text-[11.5px] leading-[1.45] line-clamp-2 sm:line-clamp-3 font-normal">
                        {p.description}
                      </p>
                    </div>

                    {/* Bottom: Tags on Left, Details on Right (With hairline border and safe spacing) */}
                    <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/[0.06] min-w-0">
                      <div className="flex items-center min-w-0 overflow-hidden mr-2">
                        {p.tags.slice(0, 2).map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[9.5px] font-mono-tech text-[#7C8E9F] whitespace-nowrap flex items-center shrink-0"
                          >
                            {idx > 0 && <span className="text-white/20 mx-1.5">•</span>}
                            <span>{t}</span>
                          </span>
                        ))}
                        {p.tags.length > 2 && (
                          <span className="text-sky-400/90 font-mono-tech text-[9px] font-bold ml-1.5 shrink-0">
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
                            className="inline-flex items-center gap-1 text-purple-300 hover:text-white font-mono-tech text-[9.5px] transition-colors"
                            title="View Source Code on GitHub"
                          >
                            <GithubLogo className="w-3 h-3" />
                            <span>Code</span>
                            <ExternalLink className="w-2 h-2 opacity-60" />
                          </a>
                        )}

                        <button
                          onClick={() => setSelectedProject(p)}
                          className="inline-flex items-center gap-1 font-mono-tech text-[10.5px] font-bold text-sky-400 hover:text-sky-300 group-hover:translate-x-0.5 transition-all cursor-pointer whitespace-nowrap"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Small Sleek Right Side Arrow (Borderless) */}
          {totalPages > 1 && (
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="hidden md:flex absolute -right-4 lg:-right-6 z-20 w-8 h-8 rounded-full items-center justify-center text-gray-200 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed shadow-xl transition-all cursor-pointer hover:scale-110 active:scale-95"
              style={{
                background: 'rgba(8, 16, 26, 0.9)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: 'none',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.6)',
              }}
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
                        ? 'w-6 bg-sky-400 shadow-[0_0_8px_rgba(21,159,255,0.8)]'
                        : 'w-2 bg-white/20 hover:bg-white/40'
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
            (Exact Visual Match to Reference Image with Mountain Road Photo)
        ══════════════════════════════════════════════════════ */}
        {/* ══════════════════════════════════════════════════════
            DOWN PART: MOUNTAIN HIGHWAY FOOTER CARD
            (Enlarged and refined with prominent road visuals)
        ══════════════════════════════════════════════════════ */}
        <div
          className="relative rounded-2xl overflow-hidden px-5 sm:px-8 py-3.5 sm:py-4 lg:py-4.5 flex items-center justify-between gap-4 shrink-0"
          style={{
            border: '1px solid rgba(21, 159, 255, 0.28)',
            boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.18), 0 10px 36px rgba(0, 0, 0, 0.55)',
          }}
        >
          {/* Mountain Highway Road Background with Center Road & Mountains - Enhanced visibility */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img
              src="/assets/projects/footer_mountain_road.jpg"
              alt="Mountain Highway Road at Twilight"
              className="w-full h-full object-cover object-[center_50%] brightness-100 contrast-110"
              draggable={false}
            />
            {/* Soft dark vignette so road & mountains shine while stats & action button stay crisp */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-[#03080F]/90" />
          </div>

          {/* Left: Quote with Cyan Dash Underneath */}
          <div className="relative z-10 text-left">
            <p className="font-heading italic text-xs sm:text-[14px] lg:text-[15px] font-bold text-white leading-snug drop-shadow-md">
              &ldquo;Small features.<br className="hidden sm:inline" /> Big journeys.&rdquo;
            </p>
            <div className="w-8 h-[2px] bg-[#159FFF] mt-1.5 rounded-full shadow-[0_0_8px_#159FFF]" />
          </div>

          {/* Center: Clean Prominent Stats */}
          <div className="relative z-10 flex items-center space-x-6 sm:space-x-10 text-center">
            <div>
              <span className="block text-sm sm:text-base lg:text-lg font-black font-heading text-white leading-tight">
                11+
              </span>
              <span className="text-[8.5px] sm:text-[9.5px] font-mono-tech text-gray-300 uppercase tracking-wider">
                Projects Delivered
              </span>
            </div>
            <div className="w-[1px] h-6 bg-white/20" />
            <div>
              <span className="block text-sm sm:text-base lg:text-lg font-black font-heading text-white leading-tight">
                100%
              </span>
              <span className="text-[8.5px] sm:text-[9.5px] font-mono-tech text-gray-300 uppercase tracking-wider">
                Passion Driven
              </span>
            </div>
            <div className="w-[1px] h-6 bg-white/20" />
            <div>
              <span className="block text-sm sm:text-base lg:text-lg font-black font-heading text-sky-400 leading-tight">
                ∞
              </span>
              <span className="text-[8.5px] sm:text-[9.5px] font-mono-tech text-gray-300 uppercase tracking-wider">
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
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-[13px] font-mono-tech font-bold text-white transition-all hover:scale-[1.03] active:scale-[0.97] cursor-pointer shadow-lg"
              style={{
                background: 'rgba(21, 159, 255, 0.25)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: '1px solid rgba(21, 159, 255, 0.55)',
                boxShadow: '0 0 20px rgba(21, 159, 255, 0.3)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 28px rgba(21, 159, 255, 0.55)')}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 20px rgba(21, 159, 255, 0.3)')}
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
