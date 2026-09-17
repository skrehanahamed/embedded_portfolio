import { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { ScrollRail } from './components/ScrollRail';
import { MobilePageNav } from './components/MobilePageNav';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { SkillsSection } from './sections/SkillsSection';
import { ContactSection } from './sections/ContactSection';

export function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 1024);
  const rafScrollRef = useRef<number>(0);

  // Responsive screen-size tracking
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Throttled scroll observer on desktop to avoid layout thrashing and eliminate scroll lag
  useEffect(() => {
    if (isMobile) return;

    const sections = ['home', 'about', 'projects', 'experience', 'skills', 'contact'];

    const handleScroll = () => {
      if (rafScrollRef.current) return;
      rafScrollRef.current = requestAnimationFrame(() => {
        rafScrollRef.current = 0;
        const scrollPosition = window.scrollY + 220;

        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafScrollRef.current) cancelAnimationFrame(rafScrollRef.current);
    };
  }, [isMobile]);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);

    if (isMobile) {
      // Mobile: switch active page view and scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Desktop: smooth scroll into the targeted section
    const element = document.getElementById(sectionId);
    if (element) {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (sectionId === 'about') {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        const navHeight = 64;
        const targetTop = Math.max(0, element.getBoundingClientRect().top + window.scrollY - navHeight);
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#03070B] text-[#F5F7FA] selection:bg-blue-600 selection:text-white">
      {/* Sticky Global Navigation with 3-line hamburger on mobile */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Global Unified Scroll Rail (Desktop only) */}
      {!isMobile && (
        <ScrollRail activeSection={activeSection} onNavigate={handleNavigate} />
      )}

      {/* Main Content Area */}
      {isMobile ? (
        /* Mobile: Dedicated 1-page at a time with smooth page transition + bottom Prev/Next navigation */
        <main className="w-full min-h-[calc(100vh-60px)] pt-[56px] flex flex-col justify-between overflow-x-hidden">
          <div key={activeSection} className="flex-1 w-full flex flex-col justify-center animate-mobile-page overflow-x-hidden">
            {activeSection === 'home' && <HeroSection onNavigate={handleNavigate} />}
            {activeSection === 'about' && <AboutSection onNavigate={handleNavigate} />}
            {activeSection === 'projects' && <ProjectsSection onNavigate={handleNavigate} />}
            {activeSection === 'experience' && <ExperienceSection onNavigate={handleNavigate} />}
            {activeSection === 'skills' && <SkillsSection onNavigate={handleNavigate} />}
            {activeSection === 'contact' && <ContactSection />}
          </div>

          {/* End of every page on mobile: Left & Right arrows to navigate previous / next page */}
          <MobilePageNav activeSection={activeSection} onNavigate={handleNavigate} />
        </main>
      ) : (
        /* Desktop: Unified continuous scrolling view (Beautiful on desktop & mobile desktop mode) */
        <main className="w-full flex flex-col overflow-x-hidden">
          <HeroSection onNavigate={handleNavigate} />
          <AboutSection onNavigate={handleNavigate} />
          <ProjectsSection onNavigate={handleNavigate} />
          <ExperienceSection onNavigate={handleNavigate} />
          <SkillsSection onNavigate={handleNavigate} />
          <ContactSection />
        </main>
      )}
    </div>
  );
}

export default App;
