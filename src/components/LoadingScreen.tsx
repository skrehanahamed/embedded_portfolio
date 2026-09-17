import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { preloadFullSite } from '../utils/preloadAssets';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [isFadingOut, setIsFadingOut] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    let isMounted = true;
    const startTime = Date.now();

    const finish = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      setIsFadingOut(true);
      setTimeout(() => {
        if (isMounted) onComplete();
      }, 400);
    };

    // Preload full site textures and warm browser GPU memory & Cache API
    preloadFullSite()
      .then(() => {
        // Ensure at least 850ms to enjoy the logo animation, then complete
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 850 - elapsed);
        setTimeout(finish, remaining);
      })
      .catch(() => {
        setTimeout(finish, 900);
      });

    // Safety timeout: Maximum 1500ms so slow networks never hang
    const maxTimer = setTimeout(finish, 1500);

    return () => {
      isMounted = false;
      clearTimeout(maxTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsFadingOut(true);
    setTimeout(onComplete, 160);
  };

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-[99999] flex items-center justify-center select-none cursor-pointer transition-all duration-500 ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      } ${
        isLight
          ? 'bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#F1F5F9]'
          : 'bg-gradient-to-b from-[#02050A] via-[#040812] to-[#010307]'
      }`}
      style={{
        backdropFilter: 'blur(20px)',
      }}
      aria-label="Loading logo"
    >
      {/* Ambient Breathing Glow Aura */}
      <div
        className="absolute w-72 h-72 sm:w-88 sm:h-88 rounded-full pointer-events-none blur-3xl transition-opacity duration-1000 animate-pulse"
        style={{
          background: isLight
            ? 'radial-gradient(circle, rgba(14, 165, 233, 0.25) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(21, 159, 255, 0.35) 0%, transparent 70%)',
        }}
      />

      {/* Center SK Logo Animation Unit */}
      <div className="relative flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center">
          {/* Outer Orbital Rotating Ring */}
          <svg
            className="w-36 h-36 sm:w-44 sm:h-44 animate-spin pointer-events-none"
            style={{ animationDuration: '8s' }}
            viewBox="0 0 160 160"
          >
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke={isLight ? 'rgba(14, 165, 233, 0.2)' : 'rgba(21, 159, 255, 0.25)'}
              strokeWidth="1.5"
              strokeDasharray="4 8"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke={isLight ? '#0284C7' : '#38BDF8'}
              strokeWidth="2.5"
              strokeDasharray="40 180"
              strokeLinecap="round"
            />
          </svg>

          {/* Counter-Rotating Inner Ring */}
          <svg
            className="absolute w-28 h-28 sm:w-36 sm:h-36 pointer-events-none"
            style={{ animation: 'spin-reverse 6s linear infinite' }}
            viewBox="0 0 140 140"
          >
            <circle
              cx="70"
              cy="70"
              r="60"
              fill="none"
              stroke={isLight ? 'rgba(203, 213, 225, 0.4)' : 'rgba(255, 255, 255, 0.1)'}
              strokeWidth="1.5"
              strokeDasharray="3 6"
            />
            <circle
              cx="70"
              cy="70"
              r="60"
              fill="none"
              stroke="url(#inner-ring-gradient)"
              strokeWidth="2"
              strokeDasharray="25 150"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="inner-ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
            </defs>
          </svg>

          {/* Central Pure "SK" Monogram with Shimmer Shine & Pulse */}
          <div className="absolute flex items-center justify-center">
            <div
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-700 animate-in zoom-in-75 ${
                isLight
                  ? 'bg-white/95 border border-slate-200/90 shadow-sky-500/15'
                  : 'bg-[#050C16]/95 border border-sky-500/40 shadow-[0_0_35px_rgba(21,159,255,0.35)]'
              }`}
            >
              <span
                className="font-heading font-black text-3xl sm:text-4xl tracking-tighter select-none"
                style={{
                  background: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 50%, #2563EB 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: isLight
                    ? 'drop-shadow(0 2px 8px rgba(2, 132, 199, 0.25))'
                    : 'drop-shadow(0 0 12px rgba(56, 189, 248, 0.6))',
                }}
              >
                SK
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
