import { useState, useEffect, useCallback } from 'react';
import { useTheme } from './context/ThemeContext';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { ScrollRail } from './components/ScrollRail';
import { MobilePageNav } from './components/MobilePageNav';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { SkillsSection } from './sections/SkillsSection';
import { ContactSection } from './sections/ContactSection';

const sectionIds = ['home', 'about', 'projects', 'experience', 'skills', 'contact'];

export function App() {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const finishLoading = useCallback(() => setIsLoading(false), []);

  // Track the section crossing the reading line, including sections taller
  // than the screen. Keep all pages mounted so resizing preserves their state.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const readingLine = window.innerHeight * 0.35;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= readingLine) current = id;
      }
      setActiveSection(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  const handleNavigate = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      block: 'start',
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };

  return (
    <div className={`relative min-h-screen ${theme === 'light' ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#03070B] text-[#F5F7FA]'} selection:bg-blue-600 selection:text-white transition-colors duration-300`}>
      {isLoading && <LoadingScreen onComplete={finishLoading} />}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
      <ScrollRail activeSection={activeSection} onNavigate={handleNavigate} />
      <main className="portfolio-pages w-full flex flex-col">
        <HeroSection onNavigate={handleNavigate} />
        <AboutSection onNavigate={handleNavigate} />
        <ProjectsSection onNavigate={handleNavigate} />
        <ExperienceSection onNavigate={handleNavigate} />
        <SkillsSection onNavigate={handleNavigate} />
        <ContactSection />
      </main>
      <MobilePageNav activeSection={activeSection} onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
