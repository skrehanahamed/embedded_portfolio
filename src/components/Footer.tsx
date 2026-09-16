import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubLogo, LinkedinLogo } from './Logos';


export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#020407] border-t border-white/[0.06] py-12 px-6 md:px-12 text-[#8B98A5]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left: Brand Identity */}
        <div className="text-center md:text-left space-y-1">
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <span className="text-xl font-black font-heading text-white tracking-wider">
              SK
            </span>
            <span className="text-sm font-bold font-heading text-white tracking-wider">
              REHAN AHAMED
            </span>
          </div>
          <p className="text-xs text-gray-400 font-mono-tech">
            Embedded Developer &nbsp;·&nbsp; Automotive Enthusiast
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-gray-400 hover:text-white hover:border-sky-500/30 transition-colors"
          >
            <GithubLogo className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-gray-400 hover:text-white hover:border-sky-500/30 transition-colors"
          >
            <LinkedinLogo className="w-4 h-4" />
          </a>

          <a
            href="mailto:rehan.embedded@gmail.com"
            aria-label="Email"
            className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-gray-400 hover:text-white hover:border-sky-500/30 transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Copyright & Back to Top */}
        <div className="flex items-center space-x-6">
          <div className="text-center md:text-right text-xs space-y-1">
            <p className="text-gray-300 italic font-medium">
              &ldquo;Designed for a Smarter Tomorrow.&rdquo;
            </p>
            <p className="text-gray-400 font-mono-tech text-[11px]">
              &copy; 2026 SK Rehan Ahamed. All rights reserved.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="p-3 rounded-xl bg-sky-950/60 border border-sky-500/30 text-sky-400 hover:text-white hover:bg-sky-600 hover:border-sky-400 transition-all duration-200 shadow-lg shadow-sky-500/10 focus:outline-none"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
