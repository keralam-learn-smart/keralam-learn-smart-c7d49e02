export type SignCategory = "mandatory" | "warning" | "prohibitory" | "informatory" | "signal";

export type Sign = {
  id: string;
  category: SignCategory;
  name: { en: string; ml: string };
  meaning: { en: string; ml: string };
  explanation: { en: string; ml: string };
  example: { en: string; ml: string };
  /** Inline SVG markup — keeps signs crisp at any zoom level */
  svg: string;
};

// Reusable SVG primitives for Kerala RTO-style signs
const warningTri = (inner: string) =>
  `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <polygon points="100,14 192,182 8,182" fill="#fff" stroke="#e01f1f" stroke-width="16" stroke-linejoin="round"/>
    <g transform="translate(0,10)">${inner}</g>
  </svg>`;

const mandatoryCircle = (inner: string, color = "#1157c9") =>
  `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="94" fill="${color}"/>
    ${inner}
  </svg>`;

const prohibitoryCircle = (inner: string) =>
  `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="94" fill="#fff"/>
    <circle cx="100" cy="100" r="86" fill="none" stroke="#e01f1f" stroke-width="16"/>
    ${inner}
  </svg>`;

const infoRect = (inner: string, bg = "#1157c9") =>
  `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="192" height="192" rx="8" fill="${bg}"/>
    ${inner}
  </svg>`;

// Red diagonal strike used on prohibitory signs (top-left to bottom-right)
const prohibitSlash = `<line x1="42" y1="42" x2="158" y2="158" stroke="#e01f1f" stroke-width="16" stroke-linecap="round"/>`;

export const SIGNS: Sign[] = [
  // ---------------- WARNING (triangles) ----------------
  {
    id: "right-hand-curve",
    category: "warning",
    name: { en: "Right Hand Curve", ml: "വലത് വളവ്" },
    meaning: { en: "Sharp right turn ahead", ml: "മുന്നിൽ വലത് വളവ്" },
    explanation: {
      en: "Reduce speed and stay in your lane. The road curves sharply to the right after a short distance.",
      ml: "വേഗത കുറയ്ക്കുക, നിങ്ങളുടെ ലെയ്നിൽ തുടരുക. അല്പദൂരത്തിന് ശേഷം റോഡ് വലത്തേക്ക് വളയും.",
    },
    example: { en: "Commonly seen on Western Ghats roads.", ml: "പശ്ചിമഘട്ട റോഡുകളിൽ സാധാരണം." },
    svg: warningTri(
      `<path d="M85 160 V115 Q85 80 120 80 L120 65 L155 92 L120 118 V102 Q100 102 100 130 V160 Z" fill="#000"/>`,
    ),
  },
  {
    id: "left-hand-curve",
    category: "warning",
    name: { en: "Left Hand Curve", ml: "ഇടത് വളവ്" },
    meaning: { en: "Sharp left turn ahead", ml: "മുന്നിൽ ഇടത് വളവ്" },
    explanation: {
      en: "Slow down before entering the curve.",
      ml: "വളവിലേക്ക് കടക്കും മുമ്പ് വേഗത കുറയ്ക്കുക.",
    },
    example: { en: "Hairpin bends in Munnar.", ml: "മൂന്നാറിലെ ഹെയർപിൻ വളവുകൾ." },
    svg: warningTri(
      `<path d="M115 160 V115 Q115 80 80 80 L80 65 L45 92 L80 118 V102 Q100 102 100 130 V160 Z" fill="#000"/>`,
    ),
  },
  {
    id: "narrow-road",
    category: "warning",
    name: { en: "Narrow Road Ahead", ml: "ഇടുങ്ങിയ റോഡ്" },
    meaning: { en: "Road narrows on both sides", ml: "റോഡ് ഇരുവശത്തും ഇടുങ്ങുന്നു" },
    explanation: {
      en: "Be ready to give way and watch for oncoming vehicles.",
      ml: "എതിരെവരുന്ന വാഹനങ്ങൾക്ക് വഴി നൽകാൻ തയ്യാറാകുക.",
    },
    example: { en: "Old bridges, village roads.", ml: "പഴയ പാലങ്ങൾ, ഗ്രാമീണ റോഡുകൾ." },
    svg: warningTri(
      `<path d="M65 60 L95 105 L65 160 M135 60 L105 105 L135 160" stroke="#000" stroke-width="12" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`,
    ),
  },
  {
    id: "pedestrian-crossing",
    category: "warning",
    name: { en: "Pedestrian Crossing", ml: "കാൽനടയാത്രക്കാർ കടക്കുന്ന സ്ഥലം" },
    meaning: { en: "Pedestrians may cross here", ml: "ഇവിടെ കാൽനടയാത്രക്കാർ കടക്കാം" },
    explanation: {
      en: "Reduce speed and give priority to pedestrians.",
      ml: "വേഗത കുറയ്ക്കുക, കാൽനടയാത്രക്കാർക്ക് മുൻഗണന നൽകുക.",
    },
    example: { en: "Near schools, hospitals, markets.", ml: "സ്കൂൾ, ആശുപത്രി, ചന്തകൾക്ക് സമീപം." },
    svg: warningTri(
      `<g fill="#000"><circle cx="82" cy="72" r="11"/><path d="M70 90 q 12 -8 24 0 l -4 40 l 6 25 h -8 l -6 -22 l -6 22 h -8 l 6 -25 z"/><g stroke="#000" stroke-width="4"><line x1="115" y1="120" x2="150" y2="120"/><line x1="115" y1="135" x2="150" y2="135"/><line x1="115" y1="150" x2="150" y2="150"/></g></g>`,
    ),
  },
  {
    id: "school-ahead",
    category: "warning",
    name: { en: "School Ahead", ml: "സ്കൂൾ" },
    meaning: { en: "School zone — children present", ml: "സ്കൂൾ മേഖല — കുട്ടികൾ" },
    explanation: {
      en: "Drive at very low speed. Honking forbidden in many school zones.",
      ml: "വളരെ കുറഞ്ഞ വേഗതയിൽ ഓടിക്കുക. ഹോൺ നിരോധിച്ചിരിക്കാം.",
    },
    example: {
      en: "All schools in Kerala display this sign.",
      ml: "കേരളത്തിലെ എല്ലാ സ്കൂളുകൾക്കും ഈ അടയാളം.",
    },
    svg: warningTri(
      `<g fill="#000"><circle cx="80" cy="78" r="10"/><path d="M68 92 h24 l -3 34 l 5 26 h -7 l -6 -22 l -6 22 h -7 l 5 -26 z"/><circle cx="125" cy="78" r="10"/><path d="M113 92 h24 l -3 34 l 5 26 h -7 l -6 -22 l -6 22 h -7 l 5 -26 z"/></g>`,
    ),
  },
  {
    id: "speed-breaker",
    category: "warning",
    name: { en: "Speed Breaker", ml: "സ്പീഡ് ബ്രേക്കർ" },
    meaning: { en: "Hump on the road ahead", ml: "മുന്നിൽ കുട്ടി" },
    explanation: {
      en: "Slow to <20 km/h before crossing.",
      ml: "മുറിച്ചുകടക്കും മുമ്പ് വേഗത 20 km/h ന് താഴെ കുറയ്ക്കുക.",
    },
    example: {
      en: "Before junctions and zebra crossings.",
      ml: "ജംഗ്ഷനുകൾക്കും സീബ്ര ക്രോസിങ്ങിനും മുന്നിൽ.",
    },
    svg: warningTri(`<path d="M35 155 Q 100 55 165 155 Z" fill="#000"/>`),
  },
  {
    id: "cross-road",
    category: "warning",
    name: { en: "Cross Road", ml: "ക്രോസ് റോഡ്" },
    meaning: { en: "Four-way intersection ahead", ml: "നാല് വശ ജംഗ്ഷൻ" },
    explanation: {
      en: "Slow down, check all directions, and follow priority rules.",
      ml: "വേഗത കുറയ്ക്കുക, എല്ലാ ദിശകളും പരിശോധിക്കുക.",
    },
    example: { en: "Common at urban junctions.", ml: "നഗര ജംഗ്ഷനുകളിൽ സാധാരണം." },
    svg: warningTri(
      `<g fill="#000"><rect x="88" y="55" width="24" height="115"/><rect x="40" y="103" width="120" height="24"/></g>`,
    ),
  },
  {
    id: "slippery-road",
    category: "warning",
    name: { en: "Slippery Road", ml: "വഴുവഴുപ്പുള്ള റോഡ്" },
    meaning: { en: "Road may be slippery", ml: "റോഡ് വഴുവഴുപ്പുള്ളതാകാം" },
    explanation: {
      en: "Reduce speed, avoid sudden braking and sharp steering.",
      ml: "വേഗത കുറയ്ക്കുക, പെട്ടെന്നുള്ള ബ്രേക്ക് ഒഴിവാക്കുക.",
    },
    example: { en: "Frequent during Kerala monsoon.", ml: "കേരള മൺസൂൺ കാലത്ത് പതിവ്." },
    svg: warningTri(
      `<g fill="#000"><path d="M70 60 h60 q10 0 10 12 v88 q0 10 -10 10 h-60 q-10 0 -10 -10 v-88 q0 -12 10 -12z M60 90 q 40 -25 80 0 v 12 q -40 -25 -80 0z M60 130 q 40 -25 80 0 v 12 q -40 -25 -80 0z" fill-rule="evenodd" fill="#000"/></g>`,
    ),
  },

  // ---------------- MANDATORY (blue circles) ----------------
  {
    id: "turn-left",
    category: "mandatory",
    name: { en: "Turn Left", ml: "ഇടത്തേക്ക് തിരിയുക" },
    meaning: { en: "You must turn left", ml: "ഇടത്തേക്ക് തിരിയണം" },
    explanation: {
      en: "All vehicles must turn left at this point.",
      ml: "എല്ലാ വാഹനങ്ങളും ഇടത്തേക്ക് തിരിയണം.",
    },
    example: { en: "One-way junctions.", ml: "ഏക-ദിശ ജംഗ്ഷനുകൾ." },
    svg: mandatoryCircle(`<path d="M145 88 H100 V65 L55 100 L100 135 V112 H145 Z" fill="#fff"/>`),
  },
  {
    id: "turn-right",
    category: "mandatory",
    name: { en: "Turn Right", ml: "വലത്തേക്ക് തിരിയുക" },
    meaning: { en: "You must turn right", ml: "വലത്തേക്ക് തിരിയണം" },
    explanation: {
      en: "All vehicles must turn right at this point.",
      ml: "എല്ലാ വാഹനങ്ങളും വലത്തേക്ക് തിരിയണം.",
    },
    example: { en: "Mandatory right at intersections.", ml: "നിർബന്ധിത വലത് തിരിവ്." },
    svg: mandatoryCircle(`<path d="M55 88 H100 V65 L145 100 L100 135 V112 H55 Z" fill="#fff"/>`),
  },
  {
    id: "go-straight",
    category: "mandatory",
    name: { en: "Go Straight", ml: "നേരെ പോകുക" },
    meaning: { en: "Proceed straight only", ml: "നേരെ മാത്രം പോകുക" },
    explanation: {
      en: "Turning is not allowed here — straight only.",
      ml: "തിരിയാൻ പാടില്ല — നേരെ മാത്രം.",
    },
    example: { en: "After a junction with restricted turns.", ml: "നിയന്ത്രിത തിരിവുള്ള ജംഗ്ഷൻ." },
    svg: mandatoryCircle(`<path d="M100 50 L138 92 H115 V150 H85 V92 H62 Z" fill="#fff"/>`),
  },
  {
    id: "horn",
    category: "mandatory",
    name: { en: "Sound Horn", ml: "ഹോൺ മുഴക്കുക" },
    meaning: { en: "Compulsory to sound horn", ml: "ഹോൺ നിർബന്ധം" },
    explanation: {
      en: "Use horn to warn of your presence, e.g. on blind curves.",
      ml: "നിങ്ങളുടെ സാന്നിധ്യം അറിയിക്കാൻ ഹോൺ ഉപയോഗിക്കുക.",
    },
    example: { en: "Hilly area sharp bends.", ml: "മലയോര വളവുകൾ." },
    svg: mandatoryCircle(
      `<g fill="#fff"><path d="M55 88 h30 l30 -22 v68 l-30 -22 h-30 z"/><path d="M120 78 q22 22 0 44" fill="none" stroke="#fff" stroke-width="7"/><path d="M132 68 q34 32 0 64" fill="none" stroke="#fff" stroke-width="7"/></g>`,
    ),
  },
  {
    id: "compulsory-cycle-track",
    category: "mandatory",
    name: { en: "Compulsory Cycle Track", ml: "നിർബന്ധിത സൈക്കിൾ ട്രാക്ക്" },
    meaning: {
      en: "Cyclists must use this track",
      ml: "സൈക്കിൾ യാത്രക്കാർ ഈ ട്രാക്ക് ഉപയോഗിക്കണം",
    },
    explanation: { en: "Only cyclists allowed.", ml: "സൈക്കിൾ യാത്രക്കാർക്ക് മാത്രം." },
    example: { en: "Dedicated cycle lanes.", ml: "സമർപ്പിത സൈക്കിൾ ലെയ്നുകൾ." },
    svg: mandatoryCircle(
      `<g fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><circle cx="68" cy="132" r="22"/><circle cx="132" cy="132" r="22"/><path d="M68 132 L96 82 L128 132"/><path d="M86 82 h22"/><path d="M96 82 L110 108"/></g>`,
    ),
  },

  // ---------------- PROHIBITORY (red circles) ----------------
  {
    id: "no-entry",
    category: "prohibitory",
    name: { en: "No Entry", ml: "പ്രവേശനം ഇല്ല" },
    meaning: { en: "Entry is prohibited", ml: "പ്രവേശനം നിരോധിച്ചിരിക്കുന്നു" },
    explanation: {
      en: "No vehicle may enter the road beyond this sign.",
      ml: "ഈ അടയാളത്തിന് അപ്പുറം ഒരു വാഹനത്തിനും പ്രവേശിക്കാൻ കഴിയില്ല.",
    },
    example: { en: "One-way street entry.", ml: "ഏക-ദിശ പാത." },
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="100" r="94" fill="#e01f1f"/><rect x="38" y="88" width="124" height="24" rx="2" fill="#fff"/></svg>`,
  },
  {
    id: "no-parking",
    category: "prohibitory",
    name: { en: "No Parking", ml: "പാർക്കിങ് അനുവദനീയമല്ല" },
    meaning: { en: "Parking prohibited", ml: "പാർക്കിങ് നിരോധിച്ചിരിക്കുന്നു" },
    explanation: {
      en: "You may stop briefly to pick up/drop passengers but not park.",
      ml: "യാത്രക്കാരെ കയറ്റാനോ ഇറക്കാനോ കുറച്ച് സമയത്തേക്ക് നിർത്താം, പക്ഷേ പാർക്ക് ചെയ്യാൻ പാടില്ല.",
    },
    example: { en: "Near hospital gates.", ml: "ആശുപത്രി ഗേറ്റിന് സമീപം." },
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="100" r="94" fill="#1157c9"/><circle cx="100" cy="100" r="86" fill="none" stroke="#e01f1f" stroke-width="16"/><text x="100" y="138" font-size="115" font-weight="900" font-family="Inter, Arial, sans-serif" fill="#fff" text-anchor="middle">P</text><line x1="42" y1="42" x2="158" y2="158" stroke="#e01f1f" stroke-width="16" stroke-linecap="round"/></svg>`,
  },
  {
    id: "no-horn",
    category: "prohibitory",
    name: { en: "Horn Prohibited", ml: "ഹോൺ നിരോധനം" },
    meaning: { en: "Use of horn is prohibited", ml: "ഹോൺ ഉപയോഗം നിരോധിച്ചിരിക്കുന്നു" },
    explanation: {
      en: "Silent zone — no honking. Near hospitals & schools.",
      ml: "ശാന്ത മേഖല — ഹോൺ മുഴക്കരുത്.",
    },
    example: { en: "Outside hospitals.", ml: "ആശുപത്രികൾക്ക് പുറത്ത്." },
    svg: prohibitoryCircle(
      `<g fill="#000"><path d="M55 88 h28 l28 -22 v68 l-28 -22 h-28 z"/><path d="M118 82 q20 18 0 36" fill="none" stroke="#000" stroke-width="6"/><path d="M130 72 q30 28 0 56" fill="none" stroke="#000" stroke-width="6"/></g>${prohibitSlash}`,
    ),
  },
  {
    id: "no-overtaking",
    category: "prohibitory",
    name: { en: "Overtaking Prohibited", ml: "ഓവർടേക്കിങ് നിരോധനം" },
    meaning: { en: "Overtaking is prohibited", ml: "ഓവർടേക്കിങ് നിരോധിച്ചിരിക്കുന്നു" },
    explanation: {
      en: "No overtaking until the next sign cancels this.",
      ml: "അടുത്ത അടയാളം റദ്ദാക്കുന്നതുവരെ ഓവർടേക്കിങ് പാടില്ല.",
    },
    example: { en: "On hilly/curvy roads.", ml: "മലയോര വളവുള്ള റോഡുകൾ." },
    svg: prohibitoryCircle(
      `<g><path d="M52 140 v-30 q0 -18 18 -18 h30 v-6 l14 12 -14 12 v-6 h-30 q-6 0 -6 6 v30 z" fill="#000"/><path d="M60 82 h48 v42 h-48 z" fill="#000" opacity="0"/><g fill="#000"><rect x="46" y="112" width="54" height="30" rx="4"/><circle cx="58" cy="146" r="6"/><circle cx="90" cy="146" r="6"/></g><g fill="#e01f1f"><rect x="96" y="86" width="54" height="30" rx="4"/><circle cx="108" cy="120" r="6"/><circle cx="140" cy="120" r="6"/></g></g>`,
    ),
  },
  {
    id: "speed-limit-50",
    category: "prohibitory",
    name: { en: "Speed Limit 50", ml: "വേഗപരിധി 50" },
    meaning: { en: "Maximum speed 50 km/h", ml: "പരമാവധി വേഗത 50 km/h" },
    explanation: {
      en: "Do not exceed 50 km/h beyond this sign.",
      ml: "ഈ അടയാളത്തിന് അപ്പുറം 50 km/h ന് മുകളിൽ ഓടിക്കരുത്.",
    },
    example: { en: "City limits.", ml: "നഗര പരിധി." },
    svg: prohibitoryCircle(
      `<text x="100" y="132" font-size="82" font-weight="900" font-family="Inter, Arial, sans-serif" fill="#000" text-anchor="middle">50</text>`,
    ),
  },
  {
    id: "no-u-turn",
    category: "prohibitory",
    name: { en: "U-Turn Prohibited", ml: "U-ടേൺ നിരോധനം" },
    meaning: { en: "Taking a U-turn is not allowed", ml: "U-ടേൺ അനുവദനീയമല്ല" },
    explanation: {
      en: "Continue forward — no U-turn at this point.",
      ml: "മുന്നോട്ട് തുടരുക — ഇവിടെ U-ടേൺ പാടില്ല.",
    },
    example: { en: "Divided highways.", ml: "വിഭജിത ഹൈവേകൾ." },
    svg: prohibitoryCircle(
      `<path d="M62 150 V95 a38 38 0 0 1 76 0 V115 l12 0 -22 22 -22 -22 12 0 V95 a20 20 0 0 0 -40 0 V150 Z" fill="#000"/>${prohibitSlash}`,
    ),
  },

  // ---------------- INFORMATORY (blue rectangles) ----------------
  {
    id: "hospital",
    category: "informatory",
    name: { en: "Hospital", ml: "ആശുപത്രി" },
    meaning: { en: "Hospital nearby", ml: "ആശുപത്രി സമീപം" },
    explanation: {
      en: "Drive silently. Watch for ambulances.",
      ml: "ശാന്തമായി ഓടിക്കുക. ആംബുലൻസ് ശ്രദ്ധിക്കുക.",
    },
    example: { en: "Outside major hospitals.", ml: "പ്രധാന ആശുപത്രികൾക്ക് പുറത്ത്." },
    svg: infoRect(
      `<text x="100" y="150" font-size="150" font-weight="900" font-family="Inter, Arial, sans-serif" fill="#fff" text-anchor="middle">H</text>`,
    ),
  },
  {
    id: "petrol-pump",
    category: "informatory",
    name: { en: "Petrol Pump", ml: "പെട്രോൾ പമ്പ്" },
    meaning: { en: "Fuel station ahead", ml: "ഇന്ധന സ്റ്റേഷൻ" },
    explanation: {
      en: "Indicates a petrol/diesel station nearby.",
      ml: "സമീപത്ത് പെട്രോൾ/ഡീസൽ പമ്പ് സൂചിപ്പിക്കുന്നു.",
    },
    example: { en: "On highways.", ml: "ഹൈവേകളിൽ." },
    svg: infoRect(
      `<g fill="#fff"><rect x="50" y="55" width="70" height="110" rx="4"/><rect x="58" y="65" width="54" height="34" fill="#1157c9"/><path d="M120 90 h14 q6 0 6 6 v50 q0 6 6 6 t6 -6 v-30 h-8" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/><circle cx="152" cy="86" r="6"/></g>`,
    ),
  },
  {
    id: "first-aid-post",
    category: "informatory",
    name: { en: "First Aid Post", ml: "പ്രഥമ ശുശ്രൂഷ കേന്ദ്രം" },
    meaning: { en: "First aid available", ml: "പ്രഥമ ശുശ്രൂഷ ലഭ്യം" },
    explanation: {
      en: "Emergency first aid post nearby.",
      ml: "സമീപത്ത് അടിയന്തിര പ്രഥമ ശുശ്രൂഷ കേന്ദ്രം.",
    },
    example: { en: "Long highway stretches.", ml: "നീണ്ട ഹൈവേകൾ." },
    svg: infoRect(
      `<rect x="30" y="30" width="140" height="140" fill="#fff" rx="4"/><g fill="#e01f1f"><rect x="86" y="50" width="28" height="100"/><rect x="50" y="86" width="100" height="28"/></g>`,
      "#1157c9",
    ),
  },
  {
    id: "parking",
    category: "informatory",
    name: { en: "Parking", ml: "പാർക്കിങ്" },
    meaning: { en: "Parking allowed", ml: "പാർക്കിങ് അനുവദനീയം" },
    explanation: { en: "Designated parking area.", ml: "നിശ്ചയിച്ച പാർക്കിങ് മേഖല." },
    example: { en: "Public buildings.", ml: "പൊതു കെട്ടിടങ്ങൾ." },
    svg: infoRect(
      `<text x="100" y="150" font-size="150" font-weight="900" font-family="Inter, Arial, sans-serif" fill="#fff" text-anchor="middle">P</text>`,
    ),
  },
  {
    id: "eating-place",
    category: "informatory",
    name: { en: "Eating Place", ml: "ഭക്ഷണശാല" },
    meaning: { en: "Restaurant ahead", ml: "ഭക്ഷണശാല" },
    explanation: { en: "Indicates a restaurant or food court.", ml: "ഭക്ഷണശാല സൂചിപ്പിക്കുന്നു." },
    example: { en: "Highway dhabas.", ml: "ഹൈവേ ധാബകൾ." },
    svg: infoRect(
      `<g fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"><path d="M68 45 v40 a10 10 0 0 0 20 0 v-40"/><path d="M78 45 v55 v55"/><path d="M132 45 c-14 0 -14 40 0 40 v70"/></g>`,
    ),
  },

  // ---------------- SIGNALS ----------------
  {
    id: "signal-red",
    category: "signal",
    name: { en: "Red Signal", ml: "ചുവന്ന സിഗ്നൽ" },
    meaning: { en: "Stop — do not proceed", ml: "നിർത്തുക — മുന്നോട്ട് പോകരുത്" },
    explanation: {
      en: "Stop at the stop line. Proceeding through red is a serious offence.",
      ml: "സ്റ്റോപ്പ് ലൈനിൽ നിർത്തുക. ചുവന്ന സിഗ്നൽ കടക്കൽ ഗുരുതര കുറ്റമാണ്.",
    },
    example: { en: "All signalised junctions.", ml: "എല്ലാ സിഗ്നൽ ജംഗ്ഷനുകൾ." },
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect x="60" y="10" width="80" height="180" rx="14" fill="#1f1f1f"/><circle cx="100" cy="50" r="22" fill="#ff2a2a"/><circle cx="100" cy="50" r="22" fill="url(#g1)"/><defs><radialGradient id="g1"><stop offset="0" stop-color="#fff" stop-opacity="0.5"/><stop offset="1" stop-color="#ff2a2a" stop-opacity="0"/></radialGradient></defs><circle cx="100" cy="100" r="22" fill="#3a3a3a"/><circle cx="100" cy="150" r="22" fill="#3a3a3a"/></svg>`,
  },
  {
    id: "signal-yellow",
    category: "signal",
    name: { en: "Yellow Signal", ml: "മഞ്ഞ സിഗ്നൽ" },
    meaning: { en: "Prepare to stop", ml: "നിർത്താൻ തയ്യാറാകുക" },
    explanation: {
      en: "Stop before the line unless you cannot do so safely.",
      ml: "സുരക്ഷിതമായി കഴിയില്ലെങ്കിലല്ലാതെ ലൈനിന് മുമ്പ് നിർത്തുക.",
    },
    example: { en: "Between green and red.", ml: "പച്ച-ചുവപ്പ് ഇടയിൽ." },
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect x="60" y="10" width="80" height="180" rx="14" fill="#1f1f1f"/><circle cx="100" cy="50" r="22" fill="#3a3a3a"/><circle cx="100" cy="100" r="22" fill="#ffd400"/><circle cx="100" cy="150" r="22" fill="#3a3a3a"/></svg>`,
  },
  {
    id: "signal-green",
    category: "signal",
    name: { en: "Green Signal", ml: "പച്ച സിഗ്നൽ" },
    meaning: { en: "Proceed if safe", ml: "സുരക്ഷിതമെങ്കിൽ പോകുക" },
    explanation: {
      en: "Proceed straight, left or right if path is clear and your direction is permitted.",
      ml: "വഴി തെളിയുകയും ദിശ അനുവദനീയവുമെങ്കിൽ പോകുക.",
    },
    example: { en: "Most junctions.", ml: "മിക്ക ജംഗ്ഷനുകൾ." },
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect x="60" y="10" width="80" height="180" rx="14" fill="#1f1f1f"/><circle cx="100" cy="50" r="22" fill="#3a3a3a"/><circle cx="100" cy="100" r="22" fill="#3a3a3a"/><circle cx="100" cy="150" r="22" fill="#16c75a"/></svg>`,
  },
  // ---------------- Additional Kerala MVD signs ----------------
  {
    id: "railway-crossing-gate",
    category: "warning",
    name: { en: "Railway Crossing (Gated)", ml: "റെയിൽവേ ക്രോസിംഗ് (ഗേറ്റ്)" },
    meaning: { en: "Guarded level crossing ahead", ml: "കാവലുള്ള ലെവൽ ക്രോസിംഗ്" },
    explanation: {
      en: "Slow down and be ready to stop at the closed gate.",
      ml: "വേഗത കുറയ്ക്കുക, അടച്ച ഗേറ്റിൽ നിർത്താൻ തയ്യാറാകുക.",
    },
    example: { en: "Suburban railway lines in Kerala.", ml: "കേരളത്തിലെ സബർബൻ റെയിൽവേ പാതകൾ." },
    svg: warningTri(
      `<g fill="#000"><rect x="45" y="70" width="10" height="60"/><rect x="145" y="70" width="10" height="60"/><rect x="45" y="70" width="110" height="10"/><rect x="45" y="120" width="110" height="10"/><rect x="90" y="135" width="20" height="30"/></g>`,
    ),
  },
  {
    id: "railway-crossing-nogate",
    category: "warning",
    name: { en: "Railway Crossing (Ungated)", ml: "റെയിൽവേ ക്രോസിംഗ് (ഗേറ്റില്ലാത്ത)" },
    meaning: { en: "Unguarded level crossing", ml: "കാവലില്ലാത്ത ലെവൽ ക്രോസിംഗ്" },
    explanation: {
      en: "Stop, look both ways for trains, then cross carefully.",
      ml: "നിർത്തി രണ്ട് വശവും നോക്കി സൂക്ഷ്മമായി കടക്കുക.",
    },
    example: { en: "Interior village crossings.", ml: "ഗ്രാമീണ ക്രോസിംഗുകൾ." },
    svg: warningTri(
      `<g fill="none" stroke="#000" stroke-width="12" stroke-linecap="round"><path d="M55 145 L145 65"/><path d="M55 65 L145 145"/></g>`,
    ),
  },
  {
    id: "roadwork-ahead",
    category: "warning",
    name: { en: "Road Work Ahead", ml: "റോഡ് ജോലി" },
    meaning: { en: "Men at work / construction", ml: "പണി നടക്കുന്നു" },
    explanation: {
      en: "Slow down, watch for workers, machinery and lane changes.",
      ml: "വേഗത കുറയ്ക്കുക, തൊഴിലാളികളും യന്ത്രങ്ങളും ലെയ്ൻ മാറ്റങ്ങളും ശ്രദ്ധിക്കുക.",
    },
    example: { en: "PWD road resurfacing zones.", ml: "PWD റോഡ് പുനർനിർമ്മാണ മേഖലകൾ." },
    svg: warningTri(
      `<g fill="#000"><circle cx="90" cy="72" r="10"/><path d="M78 88 h24 l -3 32 l 6 30 h -8 l -6 -22 l -6 22 h -8 l 6 -30 z"/><path d="M108 110 l 40 -20 l 4 8 l -40 20 z"/><rect x="132" y="90" width="12" height="18" rx="2"/></g>`,
    ),
  },
  {
    id: "hospital-info",
    category: "informatory",
    name: { en: "Hospital Zone", ml: "ആശുപത്രി മേഖല" },
    meaning: { en: "Hospital nearby — silent zone", ml: "സമീപം ആശുപത്രി — ശാന്ത മേഖല" },
    explanation: {
      en: "No horn, moderate speed, give way to ambulances.",
      ml: "ഹോൺ ഇല്ല, മിതമായ വേഗത, ആംബുലൻസിന് വഴി.",
    },
    example: { en: "Medical College roads.", ml: "മെഡിക്കൽ കോളേജ് റോഡുകൾ." },
    svg: infoRect(
      `<text x="100" y="150" font-size="150" font-weight="900" font-family="Inter, Arial, sans-serif" fill="#fff" text-anchor="middle">H</text>`,
    ),
  },
  {
    id: "bus-stop",
    category: "informatory",
    name: { en: "Bus Stop", ml: "ബസ് സ്റ്റോപ്പ്" },
    meaning: { en: "Public bus stop ahead", ml: "പൊതു ബസ് സ്റ്റോപ്പ്" },
    explanation: {
      en: "Watch for stopping buses and boarding passengers.",
      ml: "നിർത്തുന്ന ബസുകളും യാത്രക്കാരും ശ്രദ്ധിക്കുക.",
    },
    example: { en: "KSRTC stops.", ml: "KSRTC സ്റ്റോപ്പുകൾ." },
    svg: infoRect(
      `<g fill="#fff"><rect x="45" y="45" width="110" height="100" rx="10"/><rect x="55" y="58" width="90" height="34" fill="#1157c9"/><rect x="60" y="100" width="26" height="30" fill="#1157c9"/><rect x="114" y="100" width="26" height="30" fill="#1157c9"/><circle cx="65" cy="150" r="10"/><circle cx="135" cy="150" r="10"/></g>`,
    ),
  },
  {
    id: "toll-plaza",
    category: "informatory",
    name: { en: "Toll Plaza Ahead", ml: "ടോൾ പ്ലാസ" },
    meaning: { en: "Toll payment point on highway", ml: "ഹൈവേയിൽ ടോൾ ശേഖരണം" },
    explanation: {
      en: "Slow down, choose correct FASTag/cash lane.",
      ml: "വേഗത കുറയ്ക്കുക, ശരിയായ FASTag/നാണയ ലെയ്ൻ തിരഞ്ഞെടുക്കുക.",
    },
    example: { en: "NH-66 toll plazas.", ml: "NH-66 ടോൾ പ്ലാസകൾ." },
    svg: infoRect(
      `<g fill="#fff"><rect x="35" y="55" width="130" height="18" rx="2"/><rect x="45" y="73" width="16" height="80"/><rect x="139" y="73" width="16" height="80"/><rect x="80" y="88" width="40" height="52" rx="2"/><rect x="88" y="98" width="24" height="16" fill="#1157c9"/></g>`,
    ),
  },
  {
    id: "highway-exit",
    category: "informatory",
    name: { en: "Highway Exit", ml: "ഹൈവേ എക്സിറ്റ്" },
    meaning: { en: "Upcoming exit ramp", ml: "വരാനുള്ള എക്സിറ്റ് റാമ്പ്" },
    explanation: {
      en: "Move to left lane in advance if you plan to exit.",
      ml: "എക്സിറ്റ് എടുക്കാൻ ഉദ്ദേശിക്കുന്നെങ്കിൽ മുൻകൂട്ടി ഇടതു ലെയ്നിലേക്ക്.",
    },
    example: { en: "Expressway ramps.", ml: "എക്സ്പ്രസ്‌വേ റാമ്പുകൾ." },
    svg: infoRect(
      `<g fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"><path d="M55 40 v90 q0 32 32 32 h58"/><path d="M132 148 l22 14 -22 14"/></g>`,
    ),
  },
  {
    id: "u-turn-allowed",
    category: "mandatory",
    name: { en: "U-Turn Allowed", ml: "U-ടേൺ അനുവദനീയം" },
    meaning: { en: "You may take a U-turn here", ml: "ഇവിടെ U-ടേൺ എടുക്കാം" },
    explanation: {
      en: "Only where marked; check for oncoming traffic first.",
      ml: "അടയാളപ്പെടുത്തിയ സ്ഥലത്ത് മാത്രം; ആദ്യം എതിര വാഹനങ്ങൾ ശ്രദ്ധിക്കുക.",
    },
    example: { en: "Divided highways.", ml: "വിഭജിത ഹൈവേകൾ." },
    svg: mandatoryCircle(
      `<path d="M62 150 V95 a38 38 0 0 1 76 0 V115 l14 0 -24 24 -24 -24 14 0 V95 a20 20 0 0 0 -40 0 V150 Z" fill="#fff"/>`,
    ),
  },
  {
    id: "keep-left",
    category: "mandatory",
    name: { en: "Keep Left", ml: "ഇടതുവശം പാലിക്കുക" },
    meaning: { en: "Pass on the left side of divider", ml: "ഡിവൈഡറിന്റെ ഇടത്തുകൂടി പോകുക" },
    explanation: {
      en: "Used at road islands and dividers.",
      ml: "റോഡ് ദ്വീപുകളിലും ഡിവൈഡറുകളിലും.",
    },
    example: { en: "Traffic islands.", ml: "ട്രാഫിക് ദ്വീപുകൾ." },
    svg: mandatoryCircle(`<path d="M135 55 L55 100 L135 145 Z" fill="#fff"/>`),
  },
  {
    id: "no-heavy-vehicles",
    category: "prohibitory",
    name: { en: "Heavy Vehicles Prohibited", ml: "ഹെവി വാഹനങ്ങൾ നിരോധിതം" },
    meaning: { en: "Trucks and lorries prohibited", ml: "ട്രക്കുകളും ലോറികളും നിരോധിതം" },
    explanation: { en: "Weight / size restricted road.", ml: "ഭാരം/വലിപ്പം നിയന്ത്രിത റോഡ്." },
    example: { en: "Narrow town centres.", ml: "ഇടുങ്ങിയ ടൗൺ കേന്ദ്രങ്ങൾ." },
    svg: prohibitoryCircle(
      `<g fill="#000"><rect x="42" y="98" width="72" height="34" rx="3"/><path d="M114 108 h20 l16 14 v10 h-36 z"/><circle cx="66" cy="140" r="10"/><circle cx="98" cy="140" r="10"/><circle cx="138" cy="140" r="10"/></g>${prohibitSlash}`,
    ),
  },
  {
    id: "no-cycle",
    category: "prohibitory",
    name: { en: "Cycles Prohibited", ml: "സൈക്കിൾ നിരോധിതം" },
    meaning: { en: "Bicycles are not allowed", ml: "സൈക്കിളുകൾ അനുവദനീയമല്ല" },
    explanation: {
      en: "Cyclists must take an alternative route.",
      ml: "സൈക്കിൾ യാത്രക്കാർ മറ്റ് വഴി തിരഞ്ഞെടുക്കണം.",
    },
    example: { en: "Expressways.", ml: "എക്സ്പ്രസ്‌വേകൾ." },
    svg: prohibitoryCircle(
      `<g fill="none" stroke="#000" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><circle cx="68" cy="132" r="22"/><circle cx="132" cy="132" r="22"/><path d="M68 132 L96 82 L128 132"/><path d="M86 82 h22"/></g>${prohibitSlash}`,
    ),
  },
  {
    id: "speed-limit-30",
    category: "prohibitory",
    name: { en: "Speed Limit 30", ml: "വേഗപരിധി 30" },
    meaning: { en: "Maximum speed 30 km/h", ml: "പരമാവധി വേഗത 30 km/h" },
    explanation: {
      en: "Applies in schools, hospitals & narrow streets.",
      ml: "സ്കൂൾ, ആശുപത്രി, ഇടുങ്ങിയ റോഡുകളിൽ.",
    },
    example: { en: "School zones.", ml: "സ്കൂൾ മേഖലകൾ." },
    svg: prohibitoryCircle(
      `<text x="100" y="132" font-size="82" font-weight="900" font-family="Inter, Arial, sans-serif" fill="#000" text-anchor="middle">30</text>`,
    ),
  },
  {
    id: "tourist-info",
    category: "informatory",
    name: { en: "Tourist Information", ml: "ടൂറിസ്റ്റ് വിവരം" },
    meaning: { en: "Tourist info centre ahead", ml: "സമീപം ടൂറിസ്റ്റ് കേന്ദ്രം" },
    explanation: { en: "Kerala Tourism assistance point.", ml: "കേരള ടൂറിസം സഹായ കേന്ദ്രം." },
    example: { en: "Munnar, Alappuzha entry points.", ml: "മൂന്നാർ, ആലപ്പുഴ പ്രവേശന ഭാഗങ്ങൾ." },
    svg: infoRect(
      `<text x="100" y="152" font-size="150" font-weight="900" font-family="Inter, Arial, sans-serif" fill="#fff" text-anchor="middle">i</text>`,
    ),
  },
];

export const SIGN_CATEGORIES: { value: SignCategory | "all"; en: string; ml: string }[] = [
  { value: "all", en: "All", ml: "എല്ലാം" },
  { value: "warning", en: "Warning", ml: "മുന്നറിയിപ്പ്" },
  { value: "mandatory", en: "Mandatory", ml: "നിർബന്ധിത" },
  { value: "prohibitory", en: "Prohibitory", ml: "നിരോധന" },
  { value: "informatory", en: "Informatory", ml: "വിവര" },
  { value: "signal", en: "Signals", ml: "സിഗ്നലുകൾ" },
];

export const getSign = (id: string) => SIGNS.find((s) => s.id === id);
