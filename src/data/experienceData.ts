export interface ExperienceItem {
  id: string;
  period: string;
  company: string;
  companyLogo: string;
  role: string;
  location: string;
  dates: string;
  current: boolean;
  clientText: string;
  clientLogos: string[];
  bullets: string[];
  tags: string[];
  visual: {
    image: string;
    caption: string;
    subCaption: string;
  };
}

export const experienceData: ExperienceItem[] = [
  {
    id: "01",
    period: "2026 – Present",
    company: "L&T Technology Services (LTTS)",
    companyLogo: "/assets/logos/ltts.png",
    role: "Senior Engineer",
    location: "Bangalore, India",
    dates: "Mar 2026 – Present",
    current: true,
    clientText: "Stellantis / Marelli",
    clientLogos: ["/assets/logos/stellantis.png", "/assets/logos/marelli.png"],
    bullets: [
      "Stellantis AIDA R2 digital cockpit integration across Android Automotive OS & Integrity RTOS on Qualcomm SA8155P.",
      "Developing Embedded C/C++ vehicle domain components on Renesas RH850 MCU.",
      "Built automated CAN/UDS diagnostic test suites with CAPL scripts and Robot Framework."
    ],
    tags: ["Green Hills RTOS", "Qualcomm SA8155P", "Renesas RH850", "Android BSP", "CAN/UDS", "CAPL"],
    visual: {
      image: "/assets/projects/project_stellantis_aida.jpg",
      caption: "Stellantis AIDA R2 Cockpit",
      subCaption: "Dual-Domain Integrity RTOS + Android"
    }
  },
  {
    id: "02",
    period: "2025 – 2026",
    company: "Alten India",
    companyLogo: "/assets/logos/alten.png",
    role: "Senior Engineer",
    location: "Bangalore, India",
    dates: "Nov 2025 – Mar 2026",
    current: false,
    clientText: "ASML Semiconductor",
    clientLogos: ["/assets/logos/asml.png"],
    bullets: [
      "Modernized ASML's EUV lithography DART diagnostic tooling from legacy C to Modern C++11/14.",
      "Migrated multi-component build architecture to Google Bazel, cutting incremental compile times.",
      "Engineered Python test automation for diagnostic log analysis, hardware verification & GTest."
    ],
    tags: ["Modern C++11/14", "Google Bazel", "CMake", "Python Automation", "GTest", "Linux"],
    visual: {
      image: "/assets/projects/project_asml_machine.jpg",
      caption: "ASML EUV Lithography Tooling",
      subCaption: "Modern C++14 Diagnostics & Bazel Graph"
    }
  },
  {
    id: "03",
    period: "2022 – 2025",
    company: "Wipro Technologies",
    companyLogo: "/assets/logos/wipro.png",
    role: "Project Engineer",
    location: "Kolkata, India",
    dates: "Apr 2022 – Nov 2025",
    current: false,
    clientText: "Ford Motor Co. & Continental",
    clientLogos: ["/assets/logos/ford.png", "/assets/logos/continental.png"],
    bullets: [
      "Developed AUTOSAR Classic SWCs (EPRNDL, SCPC, Headlamp) on Infineon TRAVEO T2G (ISO 26262 ASIL-B).",
      "Configured MCAL, BSW, and RTE layers using Vector DaVinci Developer & Configurator.",
      "Executed CAN/CAN FD verification, Trace32 debugging, UDS diagnostics & Ceedling unit tests."
    ],
    tags: ["AUTOSAR Classic", "Infineon TRAVEO", "Vector DaVinci", "ISO 26262", "Trace32", "CANoe"],
    visual: {
      image: "/assets/projects/project_ford_lincoln.jpg",
      caption: "Ford & Continental Panoramic Cockpit",
      subCaption: "ASIL-B Safety-Critical SWCs & DaVinci Stack"
    }
  }
];
