import React, { useState, useEffect } from 'react';
import { Mail, Menu, X } from 'lucide-react';
import { GithubLogo, LinkedinLogo } from './Logos';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#02070D]/85 backdrop-blur-xl border-b border-white/[0.06] shadow-xl shadow-black/50 py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1700px] 3xl:max-w-[2000px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left: Brand Identity */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 text-left group focus:outline-none cursor-pointer"
          >
            <div className="text-2xl md:text-3xl font-black font-heading tracking-tight text-[#F4F7FA] group-hover:text-[#159FFF] transition-colors">
              SK
            </div>
            <div className="flex flex-col">
              <span className="text-xs md:text-sm font-bold tracking-wider text-[#F4F7FA] font-heading leading-tight">
                REHAN AHAMED
              </span>
              <span className="text-[8px] md:text-[9px] tracking-widest text-[#9BA8B5] font-medium uppercase font-mono-tech">
                EMBEDDED | AUTOMOTIVE | C++
              </span>
            </div>
          </button>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-9">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 text-xs md:text-sm font-medium tracking-wide transition-all duration-200 focus:outline-none cursor-pointer ${
                    isActive ? 'text-[#F4F7FA]' : 'text-[#9BA8B5] hover:text-[#F4F7FA]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#159FFF] shadow-[0_0_8px_#159FFF] rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Clean Social Icons + Compact Connect Link */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <a
                href="https://github.com/skrehanahamed"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-1.5 text-[#9BA8B5] hover:text-[#F4F7FA] hover:bg-white/[0.04] rounded-lg transition-colors"
              >
                <GithubLogo className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/sk-rehan-ahamed-23a4a922b"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-1.5 text-[#9BA8B5] hover:text-[#F4F7FA] hover:bg-white/[0.04] rounded-lg transition-colors"
              >
                <LinkedinLogo className="w-4 h-4" />
              </a>
              <a
                href="mailto:skrehanahamed5@gmail.com"
                aria-label="Email"
                className="p-1.5 text-[#9BA8B5] hover:text-[#F4F7FA] hover:bg-white/[0.04] rounded-lg transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={() => handleNavClick('contact')}
              className="px-4 py-1.5 rounded-lg border border-[#159FFF]/40 hover:border-[#159FFF] bg-[#159FFF]/10 hover:bg-[#159FFF]/20 text-xs font-semibold text-[#F4F7FA] tracking-wide transition-all duration-200 shadow-[0_0_12px_rgba(21,159,255,0.15)] ml-2 cursor-pointer"
            >
              Let's Connect →
            </button>
          </div>

          {/* Mobile Menu Toggle (3-line hamburger with borderless current section text) */}
          <div className="lg:hidden flex items-center space-x-3">
            <span className="text-white font-heading font-black text-xs uppercase tracking-widest select-none">
              {activeSection}
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-2 text-white active:scale-95 transition-all cursor-pointer focus:outline-none border-0 bg-transparent"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Standalone Fullscreen Drawer Overlay
          Rendered OUTSIDE <nav> to prevent backdrop-filter / transform containing block issues when scrolled */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-[#02060A]/98 backdrop-blur-2xl flex flex-col justify-between p-6 overflow-y-auto animate-in fade-in duration-200">
          {/* Header inside drawer */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] shrink-0">
            <div className="flex items-center space-x-3">
              <div className="text-2xl font-black font-heading tracking-tight text-white">
                SK
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold tracking-wider text-white font-heading leading-tight">
                  REHAN AHAMED
                </span>
                <span className="text-[8px] tracking-widest text-[#9BA8B5] font-medium uppercase font-mono-tech">
                  EMBEDDED | AUTOMOTIVE | C++
                </span>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-white hover:text-sky-400 active:scale-95 transition-all cursor-pointer focus:outline-none"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Navigation Items List: Centered, pure white, perfectly spaced and never cut off */}
          <div className="flex flex-col space-y-1.5 py-6 my-auto">
            <div className="text-[10px] font-mono-tech uppercase tracking-[0.25em] text-white/50 mb-2 pl-3">
              SECTIONS
            </div>
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between text-left py-3.5 px-3.5 rounded-xl transition-all cursor-pointer border-0 ${
                    isActive ? 'bg-white/[0.08]' : 'bg-transparent hover:bg-white/[0.04] active:bg-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`w-2 h-2 rounded-full transition-all ${
                        isActive ? 'bg-white shadow-[0_0_10px_#ffffff] scale-125' : 'bg-white/20'
                      }`}
                    />
                    <span
                      className={`text-xl font-heading tracking-wide transition-colors ${
                        isActive ? 'text-white font-black' : 'text-white/80 hover:text-white font-semibold'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  <span className="font-mono-tech text-xs text-white/50">0{idx + 1}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom Controls: Socials + Connect */}
          <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center space-x-3">
              <a
                href="https://github.com/skrehanahamed"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 text-gray-400 hover:text-white bg-white/[0.04] rounded-lg transition-colors"
              >
                <GithubLogo className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/sk-rehan-ahamed-23a4a922b"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 text-gray-400 hover:text-white bg-white/[0.04] rounded-lg transition-colors"
              >
                <LinkedinLogo className="w-5 h-5" />
              </a>
              <a
                href="mailto:skrehanahamed5@gmail.com"
                aria-label="Email"
                className="p-2 text-gray-400 hover:text-white bg-white/[0.04] rounded-lg transition-colors"
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
