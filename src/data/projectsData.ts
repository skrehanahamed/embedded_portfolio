export interface Project {
  id: string;
  title: string;
  subtitle: string;
  domain: string;
  hardwareTarget: string;
  description: string;
  image: string;
  projectType: 'OFFICIAL' | 'PERSONAL';
  companyOrContext: string;
  companyLogo: string;
  tags: string[];
  category: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  fullDetails: {
    role: string;
    clientOrContext: string;
    overview: string;
    responsibilities: string[];
    architecture: string;
    tools: string[];
    impact: string;
  };
}

export const projectsData: Project[] = [
  {
    id: "01",
    title: "AIDA R2 Digital Cockpit Platform",
    subtitle: "Dual-Domain Automotive Cockpit Integration",
    domain: "Dual-Domain Cockpit Architecture",
    hardwareTarget: "Qualcomm SA8155P • Renesas RH850",
    description: "Automotive BSP and RTOS integration bridging Green Hills Integrity on Renesas RH850 with Android Automotive OS on Qualcomm SA8155P for Stellantis production cockpits.",
    image: "/assets/projects/project_stellantis_aida.jpg",
    projectType: "OFFICIAL",
    companyOrContext: "Stellantis / Marelli",
    companyLogo: "/assets/logos/stellantis.png",
    tags: ["Green Hills RTOS", "Qualcomm SA8155P", "Renesas RH850", "Android BSP", "CAN/UDS", "CAPL"],
    category: ["ALL", "OFFICIAL", "AUTOMOTIVE", "EMBEDDED"],
    fullDetails: {
      role: "Senior Engineer",
      clientOrContext: "L&T Technology Services / Marelli / Stellantis",
      overview: "Developing automotive software for the Stellantis AIDA R2 platform, integrating Green Hills Integrity RTOS kernel on the Renesas RH850 MCU alongside Android Automotive kernel/BSP on Qualcomm SA8155P/SA6155P SoCs.",
      responsibilities: [
        "Developing and maintaining Embedded C/C++ components with Green Hills Integrity RTOS for vehicle domain control",
        "Performing software integration, debugging, log analysis, and defect investigation across Android, kernel, and RTOS components",
        "Developed CAPL scripts and Robot Framework automation for CAN/UDS test cases, improving validation test coverage",
        "Analyzing trace logs, timing constraints, and inter-process communication between domain controller and IVI head unit"
      ],
      architecture: "Dual-Domain Vehicle Architecture: Renesas RH850 (Safety/Vehicle domain, Green Hills Integrity RTOS) <-> IPC/CAN <-> Qualcomm SA8155P (IVI/Android Automotive kernel)",
      tools: ["Green Hills Integrity RTOS", "Qualcomm SA8155P SDK", "CANoe", "CAPL", "Robot Framework", "Lauterbach Trace32", "Git"],
      impact: "Significantly enhanced test automation coverage for CAN/UDS diagnostic test cases and reduced manual validation cycles for Stellantis cluster systems."
    }
  },
  {
    id: "02",
    title: "TRAVEO T2G Cluster Validation HIL",
    subtitle: "Automated CAN/UDS Diagnostic Framework",
    domain: "Cluster Diagnostics & HIL Automation",
    hardwareTarget: "Infineon TRAVEO T2G • Vector CANoe",
    description: "Automated validation suites and CAPL test modules for Japanese OEM instrument clusters, executing overnight regression runs with Robot Framework on HIL benches.",
    image: "/assets/projects/project_suzuki_wagonr.jpg",
    projectType: "OFFICIAL",
    companyOrContext: "Suzuki Motor Corp.",
    companyLogo: "/assets/logos/suzuki.png",
    tags: ["Infineon TRAVEO T2G", "Vector CANoe", "CAPL Scripts", "Robot Framework", "ISO 14229 UDS"],
    category: ["ALL", "OFFICIAL", "AUTOMOTIVE", "TOOLS & AUTOMATION"],
    fullDetails: {
      role: "Senior Engineer",
      clientOrContext: "Marelli / Suzuki Japan",
      overview: "Engineered automated diagnostic verification frameworks for next-generation Japanese Suzuki instrument cluster systems based on the Infineon TRAVEO T2G microcontroller platform.",
      responsibilities: [
        "Created comprehensive CAPL diagnostic test modules simulating vehicle speed, tell-tales, warnings, and fault injection",
        "Built Robot Framework automated test pipelines executing overnight regression testing on hardware test benches",
        "Verified ISO 14229 UDS services (ReadDataByIdentifier, RoutineControl, SecurityAccess, ClearDTC) over high-speed CAN",
        "Automated test reporting and defect logging integrated into continuous integration pipelines"
      ],
      architecture: "Hardware-in-the-Loop (HIL) Test Bench: Vector CANoe <-> CAN Bus Interface <-> Infineon TRAVEO T2G Cluster ECU <-> Robot Framework Automation Engine",
      tools: ["Vector CANoe", "CANalyzer", "CAPL", "Robot Framework", "Infineon TRAVEO T2G", "Python", "JIRA"],
      impact: "Reduced manual testing effort by over 70% and accelerated release cycles for Suzuki production cluster programs."
    }
  },
  {
    id: "03",
    title: "DART Lithography Diagnostics Engine",
    subtitle: "Modern C++14 EUV Tooling & Bazel Graph",
    domain: "Semiconductor EUV Tooling",
    hardwareTarget: "Extreme Ultraviolet Lithography (EUV)",
    description: "Diagnostic regression software for ASML EUV lithography machines. Refactored legacy C to Modern C++14 and migrated multi-component build architecture to Google Bazel.",
    image: "/assets/projects/project_asml_machine.jpg",
    projectType: "OFFICIAL",
    companyOrContext: "ASML Semiconductor",
    companyLogo: "/assets/logos/asml.png",
    tags: ["Modern C++11/14", "Google Bazel", "CMake", "Python Automation", "EUV Cleanroom Tooling"],
    category: ["ALL", "OFFICIAL", "EMBEDDED", "TOOLS & AUTOMATION"],
    fullDetails: {
      role: "Senior Engineer",
      clientOrContext: "Alten India / ASML (Offshore)",
      overview: "Re-architected and upgraded the DART (Diagnostic Automated Regression Testing) software system used in ASML extreme ultraviolet (EUV) semiconductor lithography equipment.",
      responsibilities: [
        "Refactored legacy C codebases to modern C++11/14 with strong typing, RAII memory management, and smart pointers",
        "Migrated the multi-component build architecture from CMake to Google Bazel, drastically cutting incremental compile times",
        "Developed Python test automation scripts for diagnostic fault log parsing and hardware state verification",
        "Executed root-cause defect analysis and integrated automated unit tests with Google Test (GTest)"
      ],
      architecture: "Distributed Diagnostics Architecture: Hardware Controller Interfaces <-> DART C++ Engine <-> Bazel Build Graph <-> Python Test Automation",
      tools: ["Modern C++11/14", "Google Bazel", "CMake", "Python", "GTest", "Git", "Linux"],
      impact: "Cut build compilation times by 45% and modernized critical lithography equipment diagnostic reliability for global chip fabrication."
    }
  },
  {
    id: "04",
    title: "Panoramic Digital Cockpit SWCs",
    subtitle: "AUTOSAR BSW & Application Components (ASIL-B)",
    domain: "AUTOSAR Classic & Functional Safety",
    hardwareTarget: "Infineon TRAVEO T2G • Vector DaVinci",
    description: "Safety-critical AUTOSAR SWCs (EPRNDL gear selector, SCPC, Headlamp control) for luxury panoramic displays meeting ISO 26262 ASIL-B compliance.",
    image: "/assets/projects/project_ford_lincoln.jpg",
    projectType: "OFFICIAL",
    companyOrContext: "Ford / Lincoln",
    companyLogo: "/assets/logos/ford.png",
    tags: ["AUTOSAR Classic", "Infineon TRAVEO T2G", "Vector DaVinci", "ISO 26262 ASIL-B", "MISRA C"],
    category: ["ALL", "OFFICIAL", "AUTOMOTIVE", "AUTOSAR", "EMBEDDED"],
    fullDetails: {
      role: "Project Engineer",
      clientOrContext: "Wipro / Ford Motor Company & Continental Tier-1",
      overview: "Engineered core AUTOSAR application software components (EPRNDL, SCPC, Headlamp) and configured MCAL, BSW, and RTE on Infineon TRAVEO T2G for Ford luxury vehicle platforms.",
      responsibilities: [
        "Implemented AUTOSAR application components (EPRNDL gear selection, SCPC, Headlamp control) per MISRA C and ISO 26262 ASIL-B",
        "Configured MCAL, BSW (COM, PDU Router, CanIf), and RTE using Vector DaVinci Developer & Configurator",
        "Conducted MCAL verification, CAN/CAN FD communication testing, UART debugging, and UDS diagnostics using Trace32",
        "Executed functional safety activities including TSR/SSR analysis, FMEA, and requirement traceability"
      ],
      architecture: "AUTOSAR Classic 4.x Architecture: Application SWCs <-> RTE <-> BSW (Services, Communication, Memory) <-> MCAL <-> Infineon TRAVEO T2G MCU",
      tools: ["Vector DaVinci Developer", "DaVinci Configurator", "Lauterbach Trace32", "CANoe", "Ceedling", "GTest"],
      impact: "Delivered safety-compliant ASIL-B instrument cluster software deployed across global Ford and Lincoln vehicle platforms with 0 critical defects."
    }
  },
  {
    id: "05",
    title: "Touchscreen Cockpit HMI & PDC",
    subtitle: "Scandinavian Center Display, PDC Radar & 60 FPS Qt",
    domain: "Automotive HMI & Sensor Telemetry",
    hardwareTarget: "Qt 6 / QML • CAN Bus Telemetry",
    description: "Touchscreen HMI cockpit featuring Park Distance Control (PDC) radar mapping, vehicle lighting state machines, and sub-50ms CAN bus vehicle state synchronisation.",
    image: "/assets/projects/project_volvo_hmi.jpg",
    projectType: "OFFICIAL",
    companyOrContext: "Volvo / Continental",
    companyLogo: "/assets/logos/volvo.png",
    tags: ["Qt 6 / QML", "C++ Backend", "Park Distance Radar", "CAN Bus Telemetry", "QNX / Android"],
    category: ["ALL", "OFFICIAL", "AUTOMOTIVE", "HMI / UI"],
    fullDetails: {
      role: "Project Engineer",
      clientOrContext: "Wipro / Continental Automotive",
      overview: "Designed and developed modern automotive touchscreen HMI applications for luxury cockpit systems, implementing vehicle controls, lighting state machines, and real-time sensor radar displays.",
      responsibilities: [
        "Developed modular Qt 6 / QML components with 60 FPS smooth micro-interactions",
        "Integrated C++ backend services handling CAN bus signal deserialization and vehicle state management",
        "Created Park Distance Control (PDC) radar visualization mapping multi-sensor proximity",
        "Implemented Headlamp Low Beam and Electronic PRNDL feedback triggers communicating over vehicle CAN"
      ],
      architecture: "Modern IVI Layer: Qt/QML User Interface <-> C++ Vehicle Controller Service <-> IPC / SocketCAN <-> Vehicle Gateway ECU",
      tools: ["Qt Creator", "QML", "C++", "CANoe", "Python CAN Log Analyzer", "Git"],
      impact: "Delivered highly intuitive, responsive automotive user interfaces with deterministic sub-50ms CAN latency response."
    }
  },
  {
    id: "06",
    title: "Virtual Body ECU & 3D Digital Twin",
    subtitle: "Bare-Metal ARM Cortex-M3 Firmware on QEMU + WebGL",
    domain: "Bare-Metal Firmware & Simulation",
    hardwareTarget: "ARM Cortex-M3 (QEMU) • Pure C",
    description: "Bare-metal automotive Body ECU simulation in pure C without an OS. Features 1ms SysTick superloop, register drivers, and 500kbps CAN bus telemetry with 3D WebGL twin.",
    image: "/assets/projects/project_virtual_ecu.jpg",
    projectType: "PERSONAL",
    companyOrContext: "Personal / GitHub",
    companyLogo: "/assets/logos/github.png",
    githubUrl: "https://github.com/skrehanahamed/virtual-body-ecu",
    tags: ["Bare-Metal C", "ARM Cortex-M3", "QEMU Simulation", "CAN Protocol 500k", "Three.js 3D Twin"],
    category: ["ALL", "PERSONAL", "EMBEDDED", "AUTOMOTIVE"],
    fullDetails: {
      role: "Creator & Firmware Engineer",
      clientOrContext: "Open Source Automotive Project (GitHub)",
      overview: "A complete bare-metal automotive Electronic Control Unit (ECU) simulation engineered in pure C running on QEMU ARM Cortex-M3 without an operating system, complete with register-level drivers and real-time telemetry.",
      responsibilities: [
        "Implemented real-time periodic superloop scheduler with 1ms SysTick time base and custom interrupt vector table",
        "Wrote bare-metal register drivers for UART0 serial communications, GPIO state control, and hardware timers",
        "Engineered standard 11-bit CAN bus broadcasting at 500 kbps (Engine state 0x100, Closures 0x101, Speed/RPM 0x180, Lights 0x200)",
        "Built an interactive 3D WebGL vehicle digital twin dashboard monitoring live sensor telemetry"
      ],
      architecture: "Bare-Metal Firmware Stack: Custom Vector Table <-> Linker Script <-> SysTick Scheduler <-> Register Drivers (UART/GPIO/Timers) <-> Virtual CAN Layer",
      tools: ["Bare-Metal C", "ARM-none-eabi Toolchain", "QEMU ARM", "Three.js / WebGL", "Makefile", "Git"],
      impact: "Fully functional bare-metal automotive ECU simulation runnable without physical hardware, with automated smoke tests."
    }
  },
  {
    id: "07",
    title: "Apex Horizon Automotive Head Unit",
    subtitle: "Production Digital Head Unit with Qt 6 & DRM/KMS",
    domain: "Direct DRM/KMS Automotive IVI",
    hardwareTarget: "Raspberry Pi 5 (BCM2712) • VideoCore VII",
    description: "Automotive digital head unit built on embedded Yocto Linux with direct VideoCore VII GPU rendering via DRM/KMS EGLFS at 60 FPS, PipeWire audio, and Android Auto.",
    image: "/assets/projects/project_apex_ivi.jpg",
    projectType: "PERSONAL",
    companyOrContext: "Personal / GitHub",
    companyLogo: "/assets/logos/github.png",
    githubUrl: "https://github.com/skrehanahamed/apex_IVI_midEnd_rasberryPi5",
    tags: ["Qt 6 Quick", "C++20", "Raspberry Pi 5", "DRM/KMS EGLFS", "Yocto Linux", "PipeWire"],
    category: ["ALL", "PERSONAL", "AUTOMOTIVE", "HMI / UI", "EMBEDDED"],
    fullDetails: {
      role: "Lead Systems & UI Architect",
      clientOrContext: "Personal Project (GitHub)",
      overview: "Production-grade automotive digital head unit designed for Raspberry Pi 5 (Quad-Core Cortex-A76 at 2.4 GHz) running embedded Yocto Linux, rendering directly to VideoCore VII GPU at 60 FPS with zero window manager overhead.",
      responsibilities: [
        "Architected fluid automotive 8-inch D-Audio interface using Qt 6 Quick and modern C++20",
        "Configured direct Linux DRM/KMS rendering via EGLFS eliminating Wayland/X11 latency",
        "Integrated PipeWire / WirePlumber audio pipeline and BlueZ 5 Bluetooth telephony with PBAP contact sync",
        "Implemented native Android Auto projection pipeline via AASDK"
      ],
      architecture: "Custom Automotive OS: Yocto Linux (meta-custom-rpi5) -> DRM/KMS VideoCore VII -> Qt 6 QML UI -> C++20 Hardware Abstraction",
      tools: ["Qt 6.7 LTS", "C++20", "Raspberry Pi 5 (BCM2712)", "PipeWire", "BlueZ 5", "CMake", "Yocto Project"],
      impact: "Deterministic 60 FPS automotive cockpit head unit running on consumer hardware with automotive-grade boot time and responsiveness."
    }
  },
  {
    id: "08",
    title: "Apex MidEnd Digital Cluster",
    subtitle: "Photorealistic Automotive HMI in Qt 6 Quick & Modern C++20",
    domain: "Digital Instrument Cluster HMI",
    hardwareTarget: "Qt 6 Quick • Modern C++20",
    description: "Automotive digital instrument cluster simulation modeling OEM cluster architecture, deterministic powertrain telemetry, and hardware-accelerated 60 FPS rendering.",
    image: "/assets/projects/project_apex_midend_cluster.jpg",
    projectType: "PERSONAL",
    companyOrContext: "Personal / GitHub",
    companyLogo: "/assets/logos/github.png",
    githubUrl: "https://github.com/skrehanahamed/Apex_MidEnd_Cluster",
    tags: ["Qt 6 Quick", "C++20", "Digital Cluster", "CAN Powertrain", "60 FPS HMI", "CMake"],
    category: ["ALL", "PERSONAL", "AUTOMOTIVE", "HMI / UI", "EMBEDDED"],
    fullDetails: {
      role: "Lead Cockpit HMI Architect",
      clientOrContext: "Personal Project (GitHub)",
      overview: "A production-grade, photorealistic automotive Human-Machine Interface (HMI) and digital cockpit simulation engineered using Qt 6 (QML / Qt Quick) and modern C++20.",
      responsibilities: [
        "Architected high-performance speedometer, tachometer, and ADAS visualization modules in Qt Quick",
        "Engineered deterministic vehicle telemetry state machine processing real-time powertrain updates",
        "Configured custom shader effects and hardware-accelerated 60 FPS rendering pipeline",
        "Integrated cross-platform build automation via CMake with modular C++20 domain services"
      ],
      architecture: "Automotive HMI Architecture: Qt 6 Quick QML Presentation Layer <-> C++20 Telemetry Bus Controller <-> IPC Telemetry Streamer",
      tools: ["Qt 6 Quick", "C++20", "QML", "CMake", "OpenGL / Metal", "Git"],
      impact: "Delivered deterministic 60 FPS photorealistic instrument cluster simulation modeling OEM production instrument clusters."
    }
  },
  {
    id: "09",
    title: "Apex EV Cluster & ECU Simulator",
    subtitle: "SUV EV Digital Instrument Cluster with Interactive Simulator",
    domain: "EV Powertrain & ADAS Simulation",
    hardwareTarget: "Modern C++17 • Qt 6.5+",
    description: "Next-generation SUV EV digital instrument cluster and interactive ECU simulator featuring dynamic drive modes, ADAS vehicle telemetry, and battery thermal management.",
    image: "/assets/projects/project_apex_ev_cluster.jpg",
    projectType: "PERSONAL",
    companyOrContext: "Personal / GitHub",
    companyLogo: "/assets/logos/github.png",
    githubUrl: "https://github.com/skrehanahamed/ApexECU_Cluster",
    tags: ["Qt 6.5+", "C++17", "EV Cluster", "ECU Simulator", "ADAS Radar", "CMake"],
    category: ["ALL", "PERSONAL", "AUTOMOTIVE", "HMI / UI"],
    fullDetails: {
      role: "Creator & Systems Engineer",
      clientOrContext: "Personal Project (GitHub)",
      overview: "An EV digital cockpit simulation suite featuring interactive ECU fault injection, dynamic powertrain drive modes (Eco/Sport/Comfort), and real-time battery thermal telemetry.",
      responsibilities: [
        "Implemented real-time ECU signal simulator injecting speed, RPM, battery SoC, and tire pressure (TPMS)",
        "Designed responsive instrument cluster layout with smooth gauge needle physics and warning tell-tales",
        "Integrated ADAS radar visualization showing leading vehicles and lane departure alerts",
        "Built automated CI build workflows verifying compilation on macOS, Linux, and Windows"
      ],
      architecture: "EV Cockpit Simulation: Interactive ECU Signal Generator <-> Signal Bus Router <-> Qt 6 Digital Cluster HMI Display",
      tools: ["Qt 6.5+", "Modern C++17", "QML", "CMake", "GitHub Actions CI", "Git"],
      impact: "Comprehensive multi-platform EV cluster simulator with automated continuous integration and interactive fault simulation."
    }
  },
  {
    id: "10",
    title: "Automotive Yocto Linux Distribution",
    subtitle: "Custom Scarthgap 5.0 LTS OS for Edge Compute",
    domain: "Embedded Linux & Custom BSP",
    hardwareTarget: "Yocto Scarthgap 5.0 • Kernel 6.6 LTS",
    description: "Custom production-ready Yocto Linux distribution (Scarthgap 5.0 LTS) and headless Qt 6.7 IVI platform for Raspberry Pi 5 with TigerVNC, auto-WiFi, and kiosk mode.",
    image: "/assets/projects/project_automotive_yocto.jpg",
    projectType: "PERSONAL",
    companyOrContext: "Personal / GitHub",
    companyLogo: "/assets/logos/github.png",
    githubUrl: "https://github.com/skrehanahamed/meta-custom-rpi5",
    tags: ["Yocto Scarthgap 5.0", "Raspberry Pi 5", "Linux 6.6 LTS", "Qt 6.7 LTS", "Docker Build", "ARM64"],
    category: ["ALL", "PERSONAL", "EMBEDDED", "AUTOMOTIVE"],
    fullDetails: {
      role: "Embedded Linux & BSP Architect",
      clientOrContext: "Personal Project (GitHub)",
      overview: "Custom Yocto Linux layer (meta-custom-rpi5) building a secure, lightweight automotive Linux OS for Raspberry Pi 5 (Quad-Core Cortex-A76) with optimized boot times and direct DRM/KMS graphics.",
      responsibilities: [
        "Created custom bitbake recipes for Qt 6.7 LTS, systemd services, and automated network configuration",
        "Configured reproducible containerized build environments using Docker and Poky build tools",
        "Integrated TigerVNC headless server, auto-WiFi provisioning, and direct framebuffer graphical output",
        "Packaged custom bootable WIC disk images with automated partitioning and rootfs verification"
      ],
      architecture: "Yocto Linux Stack: Poky Reference Distro -> meta-custom-rpi5 -> Linux 6.6 Kernel -> Qt 6.7 LTS Graphics Stack -> RPi5 BCM2712 SoC",
      tools: ["Yocto Project (Scarthgap)", "BitBake", "Docker", "Bash", "Linux Kernel", "Git"],
      impact: "Production-ready, reproducible embedded Linux OS for edge automotive computing and prototyping."
    }
  },
  {
    id: "11",
    title: "C++ SpeedTest & Hermetic Bazel Harness",
    subtitle: "Modern C++17 Network Performance Engine with GTests",
    domain: "High-Performance C++ & Build Systems",
    hardwareTarget: "Modern C++17 • Google Bazel 8.x",
    description: "High-performance internet speed measurement tool built with Modern C++17 and Google Bazel 8.x. Features 45+ unit and integration tests using Google Test with 48% line coverage.",
    image: "/assets/about/trait_semiconductor.jpg",
    projectType: "PERSONAL",
    companyOrContext: "Personal / GitHub",
    companyLogo: "/assets/logos/github.png",
    githubUrl: "https://github.com/skrehanahamed/Cpp_SpeedTest_Bazel_GTest",
    tags: ["Modern C++17", "Google Bazel 8.x", "Google Test (GTest)", "Network Benchmarks", "CI/CD"],
    category: ["ALL", "PERSONAL", "TOOLS & AUTOMATION", "EMBEDDED"],
    fullDetails: {
      role: "Software Engineer",
      clientOrContext: "Personal Project (GitHub)",
      overview: "Engineered a deterministic network benchmarking engine in Modern C++17 utilizing Google Bazel hermetic builds and comprehensive Google Test test suites.",
      responsibilities: [
        "Implemented high-precision latency and throughput measurement algorithms in C++17",
        "Architected hermetic multi-target build graph using Google Bazel 8.x (MODULE.bazel)",
        "Authored 45+ unit, integration, and server test suites using Google Test (GTest)",
        "Built automated coverage analysis generating detailed HTML reports and CI verification"
      ],
      architecture: "Hermetic Bazel Architecture: Bazel 8.x Build Graph -> C++17 Benchmark Engine -> GTest Test Runners -> Web GUI Client",
      tools: ["Modern C++17", "Google Bazel", "Google Test", "Python", "Linux / macOS", "Git"],
      impact: "Demonstrated production-grade Bazel dependency resolution, hermetic builds, and rigorous unit testing practices."
    }
  }
];
