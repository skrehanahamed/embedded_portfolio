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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#02070D]/85 backdrop-blur-xl border-b border-white/[0.06] shadow-xl shadow-black/50 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-3 text-left group focus:outline-none cursor-pointer"
          aria-label="SK Rehan Ahamed Home"
        >
          <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-xl overflow-hidden border border-blue-500/40 group-hover:border-blue-400 shadow-md shadow-blue-500/10 group-hover:shadow-blue-500/30 transition-all duration-300 flex-shrink-0 bg-[#050B12] flex items-center justify-center">
            <img
              src="/favicon.svg"
              alt="SK Logo"
              className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-200"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs md:text-sm font-bold tracking-wider text-[#F4F7FA] font-heading leading-tight group-hover:text-sky-300 transition-colors">
              SK REHAN AHAMED
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
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-1.5 text-[#9BA8B5] hover:text-[#F4F7FA] hover:bg-white/[0.04] rounded-lg transition-colors"
            >
              <GithubLogo className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-1.5 text-[#9BA8B5] hover:text-[#F4F7FA] hover:bg-white/[0.04] rounded-lg transition-colors"
            >
              <LinkedinLogo className="w-4 h-4" />
            </a>
            <a
              href="mailto:rehan.embedded@gmail.com"
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

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center space-x-3">
          <button
            onClick={() => handleNavClick('contact')}
            className="text-xs font-semibold text-sky-400 px-2 py-1"
          >
            Connect →
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="p-2 text-gray-300 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[58px] bg-[#02060A]/95 backdrop-blur-2xl z-40 border-t border-white/10 px-6 py-8 flex flex-col justify-between">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-lg font-heading font-medium tracking-wide py-2.5 border-b border-white/[0.04] ${
                  activeSection === item.id ? 'text-sky-400 pl-2' : 'text-[#8B98A5]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-white">
                <GithubLogo className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-white">
                <LinkedinLogo className="w-5 h-5" />
              </a>
              <a href="mailto:rehan.embedded@gmail.com" className="p-2 text-gray-400 hover:text-white">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <button
              onClick={() => handleNavClick('contact')}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-500/20"
            >
              Let's Connect →
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
