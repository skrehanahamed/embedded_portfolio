import React, { useState, useEffect } from 'react';
import { Mail, Menu, X } from 'lucide-react';
import { GithubLogo, LinkedinLogo } from './Logos';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scrolling when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navContainerRef = React.useRef<HTMLDivElement>(null);
  const navItemRefs = React.useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Smoothly reposition the sliding active indicator whenever activeSection changes or viewport resizes
  useEffect(() => {
    const updateIndicator = () => {
      const activeBtn = navItemRefs.current[activeSection];
      const container = navContainerRef.current;
      if (activeBtn && container) {
        const containerRect = container.getBoundingClientRect();
        const btnRect = activeBtn.getBoundingClientRect();
        setIndicatorStyle({
          left: btnRect.left - containerRect.left,
          width: btnRect.width,
          opacity: 1,
        });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeSection]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`site-nav fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3.5 sm:py-4 ${
          isScrolled
            ? (isLight
                ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-md shadow-slate-900/5'
                : 'bg-[#02070D]/85 backdrop-blur-xl border-b border-white/[0.06] shadow-xl shadow-black/50')
            : (isLight
                ? 'bg-white/75 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none border-b border-slate-200/50 lg:border-none'
                : 'bg-transparent')
        }`}
      >
        <div className="max-w-7xl xl:max-w-[90rem] 2xl:max-w-[106.25rem] 3xl:max-w-[125rem] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between">
          {/* Left: Brand Identity */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2.5 sm:space-x-3 text-left group focus:outline-none cursor-pointer shrink-0"
          >
            <div className={`text-xl sm:text-2xl md:text-3xl font-black font-heading tracking-tight ${
              isLight ? 'text-slate-900' : 'text-[#F4F7FA]'
            } group-hover:text-[#159FFF] transition-colors`}>
              SK
            </div>
            <div className="flex flex-col">
              <span className={`text-[0.6875rem] sm:text-xs md:text-sm font-bold tracking-wider ${
                isLight ? 'text-slate-900' : 'text-[#F4F7FA]'
              } font-heading leading-tight`}>
                REHAN AHAMED
              </span>
              <span className={`text-[0.46875rem] sm:text-[0.5rem] md:text-[0.5625rem] tracking-widest ${
                isLight ? 'text-slate-600' : 'text-[#9BA8B5]'
              } font-medium uppercase font-mono-tech`}>
                EMBEDDED | AUTOMOTIVE | C++
              </span>
            </div>
          </button>

          {/* Center: Desktop Navigation Links with Smooth Gliding Indicator */}
          <div
            ref={navContainerRef}
            className="relative hidden lg:flex items-center space-x-3.5 xl:space-x-8"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    navItemRefs.current[item.id] = el;
                  }}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 text-xs xl:text-sm font-medium tracking-wide transition-colors duration-200 focus:outline-none cursor-pointer whitespace-nowrap ${
                    isActive
                      ? (isLight ? 'text-sky-600 font-bold' : 'text-[#F4F7FA] font-bold')
                      : (isLight ? 'text-slate-700 hover:text-slate-950 font-semibold' : 'text-[#9BA8B5] hover:text-[#F4F7FA]')
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Smooth Gliding Active Indicator Bar */}
            <span
              className="absolute -bottom-1 h-[0.15625rem] bg-[#159FFF] shadow-[0_0_10px_#159FFF] rounded-full pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                transform: `translateX(${indicatorStyle.left}px)`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
              }}
            />
          </div>

          {/* Right: Clean Social Icons + Compact Connect Link */}
          <div className="hidden lg:flex items-center space-x-2.5 lg:space-x-3 xl:space-x-4 shrink-0">
            <div className="flex items-center space-x-2 lg:space-x-2.5">
              <a
                href="https://github.com/skrehanahamed"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={`p-1.5 ${isLight ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-100' : 'text-[#9BA8B5] hover:text-[#F4F7FA] hover:bg-white/[0.04]'} rounded-lg transition-colors`}
              >
                <GithubLogo className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/sk-rehan-ahamed-23a4a922b"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={`p-1.5 ${isLight ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-100' : 'text-[#9BA8B5] hover:text-[#F4F7FA] hover:bg-white/[0.04]'} rounded-lg transition-colors`}
              >
                <LinkedinLogo className="w-4 h-4" />
              </a>
              <a
                href="mailto:skrehanahamed5@gmail.com"
                aria-label="Email"
                className={`p-1.5 ${isLight ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-100' : 'text-[#9BA8B5] hover:text-[#F4F7FA] hover:bg-white/[0.04]'} rounded-lg transition-colors`}
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* Dark / Light Theme Toggle (Desktop) */}
            <ThemeToggle className="ml-1" />

            <button
              onClick={() => handleNavClick('contact')}
              className={`px-3 lg:px-4 py-1.5 rounded-lg border ${
                isLight
                  ? 'border-sky-500/50 bg-sky-50 hover:bg-sky-100 text-sky-700'
                  : 'border-[#159FFF]/40 hover:border-[#159FFF] bg-[#159FFF]/10 hover:bg-[#159FFF]/20 text-[#F4F7FA]'
              } text-xs font-semibold tracking-wide transition-all duration-200 shadow-[0_0_12px_rgba(21,159,255,0.15)] ml-1 cursor-pointer whitespace-nowrap`}
            >
              Let's Connect →
            </button>
          </div>

          {/* Mobile Menu Toggle (3-line hamburger with borderless current section text + theme toggle) */}
          <div className="lg:hidden flex items-center space-x-2 sm:space-x-3">
            <ThemeToggle />
            <span className={`${isLight ? 'text-slate-900' : 'text-white'} mobile-current-section font-heading font-black text-xs uppercase tracking-widest select-none`}>
              {activeSection}
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className={`p-2 ${isLight ? 'text-slate-900 hover:text-sky-600' : 'text-white hover:text-sky-400'} active:scale-95 transition-all cursor-pointer focus:outline-none border-0 bg-transparent`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Standalone Fullscreen Drawer Overlay
          Rendered OUTSIDE <nav> to prevent backdrop-filter / transform containing block issues when scrolled */}
      {mobileMenuOpen && (
        <div className={`lg:hidden fixed inset-0 z-[100] ${
          isLight ? 'bg-white/98 text-slate-900' : 'bg-[#02060A]/98 text-white'
        } backdrop-blur-2xl flex flex-col justify-between p-6 overflow-y-auto animate-in fade-in duration-200`}>
          {/* Header inside drawer */}
          <div className={`flex items-center justify-between pb-4 border-b ${isLight ? 'border-slate-200' : 'border-white/[0.08]'} shrink-0`}>
            <div className="flex items-center space-x-3">
              <div className={`text-2xl font-black font-heading tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                SK
              </div>
              <div className="flex flex-col">
                <span className={`text-xs font-bold tracking-wider ${isLight ? 'text-slate-900' : 'text-white'} font-heading leading-tight`}>
                  REHAN AHAMED
                </span>
                <span className={`text-[0.5rem] tracking-widest ${isLight ? 'text-slate-500' : 'text-[#9BA8B5]'} font-medium uppercase font-mono-tech`}>
                  EMBEDDED | AUTOMOTIVE | C++
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <ThemeToggle showLabel />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className={`p-2 ${isLight ? 'text-slate-700 hover:text-sky-600' : 'text-white hover:text-sky-400'} active:scale-95 transition-all cursor-pointer focus:outline-none`}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Navigation Items List: Centered, responsive colors, perfectly spaced */}
          <div className="flex flex-col space-y-1.5 py-6 my-auto">
            <div className={`text-[0.625rem] font-mono-tech uppercase tracking-[0.25em] ${isLight ? 'text-slate-400' : 'text-white/50'} mb-2 pl-3`}>
              SECTIONS
            </div>
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between text-left py-3.5 px-3.5 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? (isLight ? 'bg-sky-50 text-sky-700 font-black border border-sky-300/80 shadow-xs' : 'bg-white/[0.08] text-white font-black border border-white/10')
                      : (isLight ? 'bg-transparent hover:bg-slate-100 active:bg-slate-200 text-slate-800 font-semibold border border-transparent' : 'bg-transparent hover:bg-white/[0.04] active:bg-white/[0.08] text-white/80 font-semibold border border-transparent')
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        isActive
                          ? (isLight ? 'bg-sky-600 shadow-[0_0_10px_rgba(2,132,199,0.5)] scale-110' : 'bg-white shadow-[0_0_10px_#ffffff] scale-110')
                          : (isLight ? 'bg-slate-300' : 'bg-white/20')
                      }`}
                    />
                    <span
                      className={`text-xl font-heading tracking-wide transition-colors ${
                        isActive
                          ? (isLight ? 'text-sky-700 font-black' : 'text-white font-black')
                          : (isLight ? 'text-slate-800 hover:text-sky-600 font-semibold' : 'text-white/80 hover:text-white font-semibold')
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  <span className={`font-mono-tech text-xs ${isLight ? (isActive ? 'text-sky-700 font-bold' : 'text-slate-400') : 'text-white/50'}`}>0{idx + 1}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom Controls: Socials + Connect */}
          <div className={`pt-5 border-t ${isLight ? 'border-slate-200' : 'border-white/[0.08]'} flex items-center justify-between gap-3 shrink-0`}>
            <div className="flex items-center space-x-3">
              <a
                href="https://github.com/skrehanahamed"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={`p-2 ${isLight ? 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200' : 'text-gray-400 hover:text-white bg-white/[0.04]'} rounded-lg transition-colors`}
              >
                <GithubLogo className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/sk-rehan-ahamed-23a4a922b"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={`p-2 ${isLight ? 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200' : 'text-gray-400 hover:text-white bg-white/[0.04]'} rounded-lg transition-colors`}
              >
                <LinkedinLogo className="w-5 h-5" />
              </a>
              <a
                href="mailto:skrehanahamed5@gmail.com"
                aria-label="Email"
                className={`p-2 ${isLight ? 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200' : 'text-gray-400 hover:text-white bg-white/[0.04]'} rounded-lg transition-colors`}
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <button
              onClick={() => handleNavClick('contact')}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-500/20 cursor-pointer"
            >
              Let's Connect →
            </button>
          </div>
        </div>
      )}
    </>
  );
};
