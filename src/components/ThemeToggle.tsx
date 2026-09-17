import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    toggleTheme({
      x: Math.round(rect.left + rect.width / 2),
      y: Math.round(rect.top + rect.height / 2),
    });
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      aria-label={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      className={`relative inline-flex items-center gap-2 p-1.5 sm:p-2 rounded-xl transition-all duration-300 cursor-pointer group active:scale-95 ${
        isLight
          ? 'bg-slate-200/80 hover:bg-slate-300/80 text-amber-600 border border-slate-300/80 shadow-sm hover:shadow-md'
          : 'bg-white/[0.06] hover:bg-white/[0.12] text-sky-400 border border-white/10 shadow-sm hover:shadow-md hover:border-sky-400/40'
      } ${className}`}
    >
      <div className="relative w-4 h-4 sm:w-4.5 sm:h-4.5 flex items-center justify-center overflow-hidden">
        {isLight ? (
          <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-500 transition-transform duration-500 rotate-0 hover:rotate-90 scale-100" />
        ) : (
          <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-sky-400 transition-transform duration-500 -rotate-12 hover:rotate-0 scale-100" />
        )}
      </div>

      {showLabel && (
        <span className={`text-xs font-heading font-semibold transition-colors ${
          isLight ? 'text-slate-800' : 'text-slate-200'
        }`}>
          {isLight ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
};
