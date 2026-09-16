import React from 'react';
import {
  CLogo,
  CppLogo,
  PythonLogo,
  AutosarLogo,
  QtLogo,
  LinuxLogo,
  CanoeLogo,
  GitLogo,
  DockerLogo,
  JenkinsLogo,
  CMakeLogo,
  BazelLogo
} from './Logos';

export const TechStrip: React.FC = () => {
  const technologies = [
    { name: 'C', component: <CLogo className="w-6 h-6 md:w-7 md:h-7" /> },
    { name: 'C++', component: <CppLogo className="w-6 h-6 md:w-7 md:h-7" /> },
    { name: 'Python', component: <PythonLogo className="w-6 h-6 md:w-7 md:h-7" /> },
    { name: 'AUTOSAR', component: <AutosarLogo /> },
    { name: 'Qt', component: <QtLogo className="w-6 h-6 md:w-7 md:h-7" /> },
    { name: 'Linux', component: <LinuxLogo className="w-6 h-6 md:w-7 md:h-7" /> },
    { name: 'CANoe', component: <CanoeLogo /> },
    { name: 'Git', component: <GitLogo className="w-6 h-6 md:w-7 md:h-7" /> },
    { name: 'Docker', component: <DockerLogo className="w-6 h-6 md:w-7 md:h-7" /> },
    { name: 'Jenkins', component: <JenkinsLogo className="w-6 h-6 md:w-7 md:h-7" /> },
    { name: 'CMake', component: <CMakeLogo className="w-6 h-6 md:w-7 md:h-7" /> },
    { name: 'Bazel', component: <BazelLogo /> },
  ];

  return (
    <div className="w-full glass-panel rounded-2xl p-4 md:px-8 md:py-5 flex flex-col md:flex-row items-center justify-between gap-4 border border-white/[0.06]">
      {/* Left Label */}
      <div className="flex-shrink-0 text-[11px] font-mono-tech tracking-widest text-[#8B98A5] uppercase font-bold pr-4 md:border-r md:border-white/10">
        TECH I WORK WITH
      </div>

      {/* Center Icons List */}
      <div className="flex-1 flex flex-wrap items-center justify-center md:justify-around gap-4 md:gap-6">
        {technologies.map((tech, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center p-2 rounded-xl hover:bg-white/[0.06] hover:scale-110 transition-all duration-200 cursor-pointer group relative"
            title={tech.name}
          >
            {tech.component}
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 text-[10px] text-sky-300 px-2 py-0.5 rounded pointer-events-none whitespace-nowrap z-20 border border-sky-500/30 font-mono-tech">
              {tech.name}
            </span>
          </div>
        ))}
      </div>

      {/* Right "and more..." */}
      <div className="flex-shrink-0 text-xs text-[#6F8294] font-mono-tech italic">
        and more...
      </div>
    </div>
  );
};
