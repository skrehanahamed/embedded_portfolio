import React from 'react';

interface SkillLogoProps {
  name: string;
  className?: string;
  isLight?: boolean;
}

export const SkillLogo: React.FC<SkillLogoProps> = ({ name, className = "w-4 h-4", isLight = false }) => {
  const n = name.toLowerCase().trim();

  // 1. MISRA C/C++ (Must check before generic C++)
  if (n.includes('misra')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <rect x="22" y="16" width="84" height="96" rx="10" fill={isLight ? "#F0F9FF" : "#0F172A"} />
        <rect x="42" y="8" width="44" height="16" rx="4" fill="#0284C7" />
        <path d="M40 46 H88 M40 64 H88 M40 82 H72" stroke={isLight ? "#64748B" : "#94A3B8"} strokeWidth="6" strokeLinecap="round" />
        <circle cx="86" cy="84" r="16" fill="#10B981" />
        <path d="M78 84 L83 89 L94 78" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // 2. Vector CANoe / Vector (Must check before generic CAN)
  if (n.includes('vector')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <rect width="128" height="128" rx="24" fill={isLight ? "#FFF1F2" : "#1A050C"} />
        {/* Official Vector Red Chevrons */}
        <polygon points="24,96 24,114 88,64 24,14 24,32 64,64" fill="#B70032" />
        <polygon points="56,96 56,114 120,64 56,14 56,32 96,64" fill="#E11D48" />
      </svg>
    );
  }

  // 3. Qt Creator (Must check before generic Qt)
  if (n.includes('creator')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <rect width="128" height="128" rx="26" fill={isLight ? "#F0FDF4" : "#142D1C"} />
        <path d="M52 38 C37 38 27 49 27 64 C27 79 38 90 53 90 C58 90 63 88 67 85 L76 94 L83 87 L75 79 C78 74 80 69 80 64 C80 49 69 38 52 38 Z M52 50 C61 50 67 56 67 64 C67 72 61 78 52 78 C44 78 39 72 39 64 C39 56 44 50 52 50 Z" fill="#41CD52" />
        <circle cx="94" cy="56" r="14" fill="#41CD52" />
      </svg>
    );
  }

  // 4. QML / Qt / QWidgets (Must check before C++ to handle "QML / Qt (C++/QML)")
  if (n.includes('qt') || n.includes('qml') || n.includes('qwidgets')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <rect width="128" height="128" rx="26" fill="#41CD52" />
        <path d="M52 38 C37 38 27 49 27 64 C27 79 38 90 53 90 C58 90 63 88 67 85 L76 94 L83 87 L75 79 C78 74 80 69 80 64 C80 49 69 38 52 38 Z M52 50 C61 50 67 56 67 64 C67 72 61 78 52 78 C44 78 39 72 39 64 C39 56 44 50 52 50 Z" fill="#FFFFFF" />
        <path d="M96 52 H85 V64 H96 V74 H85 V88 H74 V42 H96 Z" fill="#FFFFFF" />
      </svg>
    );
  }

  // 5. DaVinci Developer
  if (n.includes('davinci developer')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <rect width="128" height="128" rx="24" fill={isLight ? "#FFF7ED" : "#2A1505"} />
        <circle cx="48" cy="64" r="24" fill="none" stroke="#F97316" strokeWidth="10" />
        <circle cx="80" cy="64" r="24" fill="none" stroke="#FB923C" strokeWidth="10" />
        <polygon points="64,28 88,64 64,100 40,64" fill="#F97316" opacity="0.75" />
      </svg>
    );
  }

  // 6. DaVinci Configurator Pro
  if (n.includes('davinci configurator') || n.includes('configurator')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <rect width="128" height="128" rx="24" fill={isLight ? "#ECFDF5" : "#062B1D"} />
        <polygon points="64,16 112,64 64,112 16,64" fill="#059669" />
        <polygon points="64,34 94,64 64,94 34,64" fill="#34D399" />
        <circle cx="64" cy="64" r="12" fill={isLight ? "#ECFDF5" : "#FFFFFF"} />
      </svg>
    );
  }

  // 7. Lauterbach Trace32
  if (n.includes('trace32') || n.includes('lauterbach')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <rect width="128" height="128" rx="24" fill={isLight ? "#EFF6FF" : "#0A1F38"} />
        <polygon points="64,18 102,110 78,110 64,74 50,110 26,110" fill="#2563EB" />
        <polygon points="64,42 74,68 54,68" fill={isLight ? "#EFF6FF" : "#0A1F38"} />
        <rect x="42" y="74" width="44" height="10" fill="#F8AB39" />
      </svg>
    );
  }

  // 8. Google Test (GTest)
  if (n.includes('google') || n.includes('gtest')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <path d="M52 14 H76 V40 L108 96 C114 106 106 118 94 118 H34 C22 118 14 106 20 96 L52 40 Z" fill={isLight ? "#F1F5F9" : "#1E293B"} />
        <path d="M30 98 L46 72 H82 L98 98 C102 106 96 114 88 114 H40 C32 114 26 106 30 98 Z" fill="#34A853" />
        <circle cx="56" cy="88" r="6" fill="#FBBC05" />
        <circle cx="74" cy="98" r="4" fill="#EA4335" />
        <circle cx="68" cy="78" r="5" fill="#FFFFFF" />
      </svg>
    );
  }

  // 9. Ceedling (Unity, CMock)
  if (n.includes('ceedling') || n.includes('unity') || n.includes('cmock')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <circle cx="64" cy="64" r="58" fill={isLight ? "#ECFDF5" : "#063D2B"} />
        <path d="M64 104 V54" stroke={isLight ? "#059669" : "#A7F3D0"} strokeWidth="8" strokeLinecap="round" />
        <path d="M64 64 C64 40 88 36 94 36 C94 58 76 68 64 64 Z" fill="#34D399" />
        <path d="M64 78 C64 60 44 56 38 56 C38 74 54 82 64 78 Z" fill="#10B981" />
      </svg>
    );
  }

  // 10. AUTOSAR (Classic)
  if (n.includes('autosar')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <polygon points="64,6 118,36 118,92 64,122 10,92 10,36" fill={isLight ? "#FFF7ED" : "#1E293B"} />
        <path d="M26 44 L64 24 L102 44 L64 64 Z" fill="#F97316" />
        <path d="M26 62 L64 42 L102 62 L64 82 Z" fill="#EA580C" />
        <path d="M26 80 L64 60 L102 80 L64 100 Z" fill="#C2410C" />
      </svg>
    );
  }

  // 11. ISO 26262 (FuSa)
  if (n.includes('26262') || n.includes('fusa')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <path d="M64 8 L112 28 V68 C112 94 92 116 64 124 C36 116 16 94 16 68 V28 Z" fill={isLight ? "#2563EB" : "#1D4ED8"} />
        <path d="M42 64 L56 78 L86 48" fill="none" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // 12. UDS / Diagnostics
  if (n.includes('uds') || n.includes('diagnostic')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <circle cx="64" cy="64" r="58" fill={isLight ? "#ECFEFF" : "#082E38"} />
        <path d="M24 64 H44 L54 36 L68 92 L80 52 L90 64 H104" fill="none" stroke={isLight ? "#0284C7" : "#22D3EE"} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // 13. MCAL / CDD / RTE
  if (n.includes('mcal') || n.includes('cdd') || n.includes('rte')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <rect x="16" y="20" width="96" height="22" rx="6" fill="#38BDF8" />
        <rect x="16" y="52" width="96" height="22" rx="6" fill="#0284C7" />
        <rect x="16" y="84" width="96" height="22" rx="6" fill="#0369A1" />
        <rect x="4" y="26" width="12" height="10" rx="2" fill="#94A3B8" />
        <rect x="4" y="58" width="12" height="10" rx="2" fill="#94A3B8" />
        <rect x="4" y="90" width="12" height="10" rx="2" fill="#94A3B8" />
        <rect x="112" y="26" width="12" height="10" rx="2" fill="#94A3B8" />
        <rect x="112" y="58" width="12" height="10" rx="2" fill="#94A3B8" />
        <rect x="112" y="90" width="12" height="10" rx="2" fill="#94A3B8" />
      </svg>
    );
  }

  // 14. CAN / CANoe (Waveform for CAN protocol)
  if (n.includes('can') || n.includes('canoe')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <rect width="128" height="128" rx="20" fill={isLight ? "#FFF1F2" : "#1F0C14"} />
        <path d="M12 44 H36 L48 24 H76 L88 44 H116" fill="none" stroke={isLight ? "#0284C7" : "#38BDF8"} strokeWidth="7" strokeLinecap="round" />
        <path d="M12 84 H36 L48 104 H76 L88 84 H116" fill="none" stroke="#F43F5E" strokeWidth="7" strokeLinecap="round" />
      </svg>
    );
  }

  // 15. CMake
  if (n.includes('cmake')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <polygon points="64,2 2,126 70,66" fill="#064F8C"/>
        <polygon points="126,126 38,92 2,126" fill="#249847"/>
        <polygon points="128,124 64,4 74,108" fill="#BE2128"/>
        <polygon points="72,104 68,68 42,92" fill="#CDCDCE"/>
      </svg>
    );
  }

  // 16. Bazel
  if (n.includes('bazel')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <polygon points="32,0 64,32 32,64 0,32" fill="#76D275"/>
        <polygon points="0,32 0,64 32,96 32,64" fill="#43A047"/>
        <polygon points="96,0 128,32 96,64 64,32" fill="#76D275"/>
        <polygon points="128,32 128,64 96,96 96,64" fill="#43A047"/>
        <polygon points="64,32 96,64 64,96 32,64" fill="#43A047"/>
        <polygon points="64,96 64,128 32,96 32,64" fill="#00701A"/>
        <polygon points="64,96 96,64 96,96 64,128" fill="#004300"/>
      </svg>
    );
  }

  // 17. Jenkins
  if (n.includes('jenkins')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <circle cx="64" cy="64" r="58" fill="#D33833" />
        <ellipse cx="64" cy="52" rx="30" ry="34" fill="#F0D6B2" />
        <ellipse cx="64" cy="24" rx="36" ry="14" fill="#24292E" />
        <rect x="36" y="10" width="56" height="16" rx="4" fill="#24292E" />
        <polygon points="52,86 76,86 64,94" fill="#D33833" />
        <polygon points="52,102 76,102 64,94" fill="#D33833" />
        <circle cx="64" cy="94" r="4" fill="#FFFFFF" />
      </svg>
    );
  }

  // 18. Docker
  if (n.includes('docker')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <path d="M124 58 C118 58 114 62 112 66 C102 64 92 68 88 74 C60 74 44 94 36 94 C20 94 12 84 8 84 C4 96 14 116 46 116 C84 116 114 96 120 72 C124 72 128 66 124 58 Z" fill="#2496ED"/>
        <rect x="42" y="52" width="12" height="10" fill="#2496ED" stroke="#0B132B" strokeWidth="1.5" />
        <rect x="58" y="52" width="12" height="10" fill="#2496ED" stroke="#0B132B" strokeWidth="1.5" />
        <rect x="74" y="52" width="12" height="10" fill="#2496ED" stroke="#0B132B" strokeWidth="1.5" />
        <rect x="58" y="38" width="12" height="10" fill="#2496ED" stroke="#0B132B" strokeWidth="1.5" />
        <rect x="74" y="38" width="12" height="10" fill="#2496ED" stroke="#0B132B" strokeWidth="1.5" />
        <circle cx="106" cy="78" r="3" fill="#0B132B" />
      </svg>
    );
  }

  // 19. ClearCase / Perforce
  if (n.includes('clearcase') || n.includes('perforce')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <rect width="128" height="128" rx="24" fill={isLight ? "#EFF6FF" : "#041B3B"} />
        <circle cx="46" cy="64" r="28" fill="none" stroke="#00A3E0" strokeWidth="10" />
        <circle cx="82" cy="64" r="28" fill="none" stroke={isLight ? "#0284C7" : "#FFFFFF"} strokeWidth="10" />
      </svg>
    );
  }

  // 20. Git
  if (n.includes('git')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <rect x="18" y="18" width="92" height="92" rx="20" transform="rotate(45 64 64)" fill="#F05032"/>
        <circle cx="44" cy="64" r="9" fill="#FFFFFF"/>
        <circle cx="84" cy="44" r="9" fill="#FFFFFF"/>
        <circle cx="84" cy="84" r="9" fill="#FFFFFF"/>
        <path d="M44 64 H72 C78 64 84 58 84 52 V44 M72 64 V84" fill="none" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round"/>
      </svg>
    );
  }

  // 21. VS Code
  if (n.includes('vscode') || n.includes('vs code')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <path d="M96 122 L124 108 V20 L96 6 L38 52 L18 36 L4 46 L26 64 L4 82 L18 92 L38 76 Z" fill="#007ACC"/>
        <path d="M96 122 L38 76 L96 6 Z" fill="#1F8AD2" opacity={isLight ? 0.9 : 0.8}/>
        <path d="M96 6 L124 20 V108 L96 122 Z" fill="#0065A9"/>
        <path d="M4 82 L18 92 L38 76 L26 64 Z" fill="#007ACC"/>
      </svg>
    );
  }

  // 22. Linux (Ubuntu)
  if (n.includes('linux') || n.includes('ubuntu')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <circle cx="64" cy="64" r="60" fill="#E95420" />
        <circle cx="64" cy="64" r="44" fill="#FFFFFF" />
        <circle cx="64" cy="64" r="32" fill="#E95420" />
        <circle cx="28" cy="64" r="9" fill="#E95420" stroke="#FFFFFF" strokeWidth="4" />
        <circle cx="82" cy="33" r="9" fill="#E95420" stroke="#FFFFFF" strokeWidth="4" />
        <circle cx="82" cy="95" r="9" fill="#E95420" stroke="#FFFFFF" strokeWidth="4" />
      </svg>
    );
  }

  // 23. QNX
  if (n.includes('qnx')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <rect width="128" height="128" rx="24" fill={isLight ? "#EFF6FF" : "#021A38"} />
        <circle cx="60" cy="58" r="32" fill="none" stroke={isLight ? "#0284C7" : "#00A8FF"} strokeWidth="12" />
        <path d="M72 74 L102 104" stroke={isLight ? "#0284C7" : "#00A8FF"} strokeWidth="14" strokeLinecap="round" />
      </svg>
    );
  }

  // 24. Windows
  if (n.includes('windows')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <polygon points="12,22 56,16 56,60 12,60" fill="#00A4EF" />
        <polygon points="64,15 116,8 116,60 64,60" fill="#00A4EF" />
        <polygon points="12,68 56,68 56,112 12,106" fill="#00A4EF" />
        <polygon points="64,68 116,68 116,120 64,113" fill="#00A4EF" />
      </svg>
    );
  }

  // 25. Android (HMI)
  if (n.includes('android')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <path d="M32 64 C32 46 46 32 64 32 C82 32 96 46 96 64 Z" fill="#3DDC84" />
        <line x1="44" y1="36" x2="34" y2="18" stroke="#3DDC84" strokeWidth="6" strokeLinecap="round" />
        <line x1="84" y1="36" x2="94" y2="18" stroke="#3DDC84" strokeWidth="6" strokeLinecap="round" />
        <circle cx="48" cy="50" r="4.5" fill="#FFFFFF" />
        <circle cx="80" cy="50" r="4.5" fill="#FFFFFF" />
        <rect x="32" y="70" width="64" height="42" rx="10" fill="#3DDC84" />
      </svg>
    );
  }

  // 26. Yocto
  if (n.includes('yocto')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <rect width="128" height="128" rx="24" fill={isLight ? "#FEFCE8" : "#241F0A"} />
        <circle cx="64" cy="64" r="38" fill="none" stroke="#FDB913" strokeWidth="8" strokeDasharray="14 8" />
        <circle cx="64" cy="64" r="20" fill="#FDB913" />
        <circle cx="64" cy="64" r="8" fill={isLight ? "#FEFCE8" : "#241F0A"} />
      </svg>
    );
  }

  // 27. RTOS (Concepts)
  if (n.includes('rtos')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <rect width="128" height="128" rx="24" fill={isLight ? "#F0FDFA" : "#082529"} />
        <circle cx="64" cy="64" r="42" fill="none" stroke={isLight ? "#0D9488" : "#00E5FF"} strokeWidth="6" />
        <line x1="64" y1="64" x2="64" y2="34" stroke={isLight ? "#0D9488" : "#00E5FF"} strokeWidth="8" strokeLinecap="round" />
        <line x1="64" y1="64" x2="88" y2="64" stroke={isLight ? "#0284C7" : "#38BDF8"} strokeWidth="6" strokeLinecap="round" />
        <circle cx="64" cy="64" r="8" fill={isLight ? "#0D9488" : "#00E5FF"} />
      </svg>
    );
  }

  // 28. SQL / PL/SQL
  if (n.includes('sql')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <ellipse cx="64" cy="28" rx="46" ry="16" fill="#0284C7" />
        <ellipse cx="64" cy="28" rx="38" ry="12" fill="#38BDF8" />
        <path d="M18 28 V60 C18 69 38 76 64 76 C90 76 110 69 110 60 V28 C110 37 90 44 64 44 C38 44 18 37 18 28 Z" fill="#0369A1" />
        <ellipse cx="64" cy="60" rx="46" ry="16" fill="#0284C7" />
        <path d="M18 60 V92 C18 101 38 108 64 108 C90 108 110 101 110 92 V60 C110 69 90 76 64 76 C38 76 18 69 18 60 Z" fill="#075985" />
        <ellipse cx="64" cy="92" rx="46" ry="16" fill="#0284C7" />
      </svg>
    );
  }

  // 29. Python
  if (n.includes('python')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <path d="M63 3C37 3 38 14 38 14L38 26L64 26L64 30L23 30C23 30 3 28 3 55C3 82 20 81 20 81L28 81L28 69C28 55 40 54 40 54L65 54C65 54 75 54 75 44L75 14C75 14 77 3 63 3Z" fill="#3776AB"/>
        <path d="M65 125C91 125 90 114 90 114L90 102L64 102L64 98L105 98C105 98 125 100 125 73C125 46 108 47 108 47L100 47L100 59C100 73 88 74 88 74L63 74C63 74 53 74 53 84L53 114C53 114 51 125 65 125Z" fill="#FFD438"/>
        <circle cx="49" cy="15" r="4.5" fill="#FFFFFF"/>
        <circle cx="79" cy="113" r="4.5" fill="#3776AB"/>
      </svg>
    );
  }

  // 30. C++ / STL
  if (n.includes('c++') || n.includes('stl')) {
    return (
      <svg className={className} viewBox="0 0 128 128" fill="none">
        <polygon points="64,4 116,34 116,94 64,124 12,94 12,34" fill="#00599C" />
        <polygon points="64,14 107,39 107,89 64,114 21,89 21,39" fill={isLight ? "#0284C7" : "#004482"} />
        <path d="M60 48 C55 43 47 43 41 46 C34 50 31 59 31 64 C31 70 34 78 41 82 C47 85 55 85 60 80 L54 74 C51 77 47 78 44 75 C40 73 39 67 39 64 C39 60 41 55 44 53 C47 50 51 51 54 54 Z" fill="#FFFFFF" />
        <path d="M69 61 H74 V56 H77 V61 H82 V64 H77 V69 H74 V64 H69 Z" fill={isLight ? "#0284C7" : "#659AD2"} />
        <path d="M87 61 H92 V56 H95 V61 H100 V64 H95 V69 H92 V64 H87 Z" fill={isLight ? "#0284C7" : "#659AD2"} />
      </svg>
    );
  }

  // 31. C Language / Embedded C
  if (n === 'c' || n === 'embedded c' || n === 'embedded') {
    return (
      <svg className={className} viewBox="0 0 128 128" fill="none">
        <polygon points="64,4 116,34 116,94 64,124 12,94 12,34" fill="#00599C" />
        <polygon points="64,14 107,39 107,89 64,114 21,89 21,39" fill={isLight ? "#0284C7" : "#0A3F6E"} />
        <path d="M85 45 C78 38 68 38 60 42 C50 47 46 59 46 64 C46 71 50 82 60 86 C68 90 78 89 85 82 L77 74 C73 78 67 79 63 76 C57 73 56 67 56 64 C56 60 58 55 63 52 C68 49 73 50 77 54 Z" fill="#FFFFFF" />
      </svg>
    );
  }

  // Default fallback if no match
  return (
    <svg className={className} viewBox="0 0 128 128">
      <circle cx="64" cy="64" r="56" fill="#0284C7" />
      <polygon points="64,24 76,52 106,56 84,76 90,106 64,90 38,106 44,76 22,56 52,52" fill="#FFFFFF" />
    </svg>
  );
};
