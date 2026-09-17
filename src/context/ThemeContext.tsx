import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeCoords {
  x: number;
  y: number;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (coords?: ThemeCoords) => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'portfolio-theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
      body.classList.add('light');
      body.classList.remove('dark');
      root.style.colorScheme = 'light';
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      body.classList.add('dark');
      body.classList.remove('light');
      root.style.colorScheme = 'dark';
    }

    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = (coords?: ThemeCoords) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const root = typeof document !== 'undefined' ? document.documentElement : null;

    // 1. Chrome / Safari / Edge: View Transitions API for high-end circular ripple expansion
    if (
      root &&
      'startViewTransition' in document &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      const x = coords?.x ?? window.innerWidth / 2;
      const y = coords?.y ?? 36;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      // Temporarily silence per-element CSS transitions so GPU compositor animates at 60/120fps with zero lag
      root.classList.add('theme-transitioning');

      const transition = (
        document as unknown as {
          startViewTransition: (cb: () => void) => {
            ready: Promise<void>;
            finished: Promise<void>;
          };
        }
      ).startViewTransition(() => {
        setThemeState(nextTheme);
      });

      const isMobileDevice = window.innerWidth < 768;
      const animDuration = isMobileDevice ? 340 : 380;

      transition.ready
        .then(() => {
          const anim = document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: animDuration,
              easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
              pseudoElement: '::view-transition-new(root)',
            }
          );

          anim.onfinish = () => {
            root.classList.remove('theme-transitioning');
          };
        })
        .catch(() => {
          root.classList.remove('theme-transitioning');
        });

      transition.finished
        .catch(() => {})
        .finally(() => {
          root.classList.remove('theme-transitioning');
        });

      return;
    }

    // 2. Mobile / Fallback: GPU-accelerated lightweight expanding radial overlay
    if (root && typeof document !== 'undefined') {
      const x = coords?.x ?? window.innerWidth / 2;
      const y = coords?.y ?? 36;

      root.classList.add('theme-transitioning');

      const ripple = document.createElement('div');
      ripple.className = 'theme-transition-ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.backgroundColor = nextTheme === 'light' ? '#F8FAFC' : '#02050A';
      document.body.appendChild(ripple);

      setThemeState(nextTheme);

      setTimeout(() => {
        ripple.remove();
        root.classList.remove('theme-transitioning');
      }, 420);
      return;
    }

    setThemeState(nextTheme);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
