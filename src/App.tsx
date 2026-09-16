import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ScrollRail } from './components/ScrollRail';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { SkillsSection } from './sections/SkillsSection';
import { ContactSection } from './sections/ContactSection';


export function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'experience', 'skills', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

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
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (sectionId === 'about') {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        const navHeight = 70;
        const targetTop = element.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#03070B] text-[#F5F7FA] selection:bg-blue-600 selection:text-white">
      {/* Sticky Global Navigation */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Global Unified Scroll Rail */}
      <ScrollRail activeSection={activeSection} onNavigate={handleNavigate} />


      {/* Main Sections matching Screenshots */}
      <main className="w-full flex flex-col">
        <HeroSection onNavigate={handleNavigate} />
        <AboutSection onNavigate={handleNavigate} />
        <ProjectsSection onNavigate={handleNavigate} />
        <ExperienceSection onNavigate={handleNavigate} />
        <SkillsSection onNavigate={handleNavigate} />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
