export interface SkillItem {
  name: string;
  level: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  categoryTag: string;
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    title: "Programming Languages",
    icon: "code",
    categoryTag: "PROGRAMMING",
    skills: [
      { name: "C", level: 90 },
      { name: "C++", level: 85 },
      { name: "Python", level: 75 },
      { name: "QML / Qt (C++/QML)", level: 70 },
      { name: "SQL / PL/SQL", level: 65 },
    ]
  },
  {
    id: "automotive",
    title: "Automotive & Embedded",
    icon: "cpu",
    categoryTag: "AUTOMOTIVE",
    skills: [
      { name: "AUTOSAR (Classic)", level: 85 },
      { name: "Embedded C", level: 85 },
      { name: "ISO 26262 (FuSa)", level: 75 },
      { name: "MISRA C/C++", level: 75 },
      { name: "CAN / CANoe", level: 80 },
      { name: "UDS / Diagnostics", level: 70 },
      { name: "MCAL / CDD / RTE", level: 75 },
    ]
  },
  {
    id: "frameworks",
    title: "Frameworks & Libraries",
    icon: "layers",
    categoryTag: "TOOLS & IDES",
    skills: [
      { name: "Qt / QML", level: 75 },
      { name: "QWidgets", level: 70 },
      { name: "Google Test (GTest)", level: 70 },
      { name: "Ceedling (Unity, CMock)", level: 65 },
      { name: "STL (C++)", level: 75 },
    ]
  },
  {
    id: "tools",
    title: "Tools & IDEs",
    icon: "wrench",
    categoryTag: "TOOLS & IDES",
    skills: [
      { name: "DaVinci Developer", level: 80 },
      { name: "DaVinci Configurator Pro", level: 75 },
      { name: "Vector CANoe", level: 85 },
      { name: "Lauterbach Trace32", level: 70 },
      { name: "Qt Creator", level: 75 },
      { name: "VS Code", level: 80 },
    ]
  },
  {
    id: "build",
    title: "Build, CI/CD & Version Control",
    icon: "settings",
    categoryTag: "BUILD & DEVOPS",
    skills: [
      { name: "CMake", level: 75 },
      { name: "Bazel", level: 70 },
      { name: "Jenkins", level: 70 },
      { name: "Docker", level: 65 },
      { name: "Git", level: 80 },
      { name: "ClearCase / Perforce", level: 70 },
    ]
  },
  {
    id: "os",
    title: "Operating Systems & Platforms",
    icon: "monitor",
    categoryTag: "OPERATING SYSTEMS",
    skills: [
      { name: "Linux (Ubuntu)", level: 80 },
      { name: "QNX", level: 70 },
      { name: "Windows", level: 75 },
      { name: "Android (HMI)", level: 65 },
      { name: "Yocto (Learning)", level: 60 },
      { name: "RTOS (Concepts)", level: 60 },
    ]
  }
];

export const otherSkills = [
  "Problem Solving",
  "Debugging",
  "Software Design",
  "System Integration",
  "Requirement Analysis",
  "V&V / Testing",
  "Documentation",
  "Team Collaboration",
  "Agile / ASPICE (SWE4/5/6)"
];
