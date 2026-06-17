export type SignCategory =
  | "mandatory"
  | "warning"
  | "prohibitory"
  | "informatory"
  | "signal";

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
    <polygon points="100,15 190,180 10,180" fill="#fff" stroke="#d61f1f" stroke-width="14" stroke-linejoin="round"/>
    <g transform="translate(0,8)">${inner}</g>
  </svg>`;

const mandatoryCircle = (inner: string, color = "#0a47a3") =>
  `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="92" fill="${color}"/>
    <circle cx="100" cy="100" r="92" fill="none" stroke="#fff" stroke-width="6"/>
    ${inner}
  </svg>`;

const prohibitoryCircle = (inner: string) =>
  `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="92" fill="#fff"/>
    <circle cx="100" cy="100" r="92" fill="none" stroke="#d61f1f" stroke-width="14"/>
    ${inner}
  </svg>`;

const infoRect = (inner: string, bg = "#0a47a3") =>
  `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="188" height="188" rx="10" fill="${bg}"/>
    <rect x="6" y="6" width="188" height="188" rx="10" fill="none" stroke="#fff" stroke-width="6"/>
    ${inner}
  </svg>`;

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
    svg: warningTri(`<path d="M70 150 Q 70 80 120 80 L 110 65 L 150 90 L 110 115 L 120 100 Q 95 100 95 150 Z" fill="#000"/>`),
  },
  {
    id: "left-hand-curve",
    category: "warning",
    name: { en: "Left Hand Curve", ml: "ഇടത് വളവ്" },
    meaning: { en: "Sharp left turn ahead", ml: "മുന്നിൽ ഇടത് വളവ്" },
    explanation: { en: "Slow down before entering the curve.", ml: "വളവിലേക്ക് കടക്കും മുമ്പ് വേഗത കുറയ്ക്കുക." },
    example: { en: "Hairpin bends in Munnar.", ml: "മൂന്നാറിലെ ഹെയർപിൻ വളവുകൾ." },
    svg: warningTri(`<path d="M130 150 Q 130 80 80 80 L 90 65 L 50 90 L 90 115 L 80 100 Q 105 100 105 150 Z" fill="#000"/>`),
  },
  {
    id: "narrow-road",
    category: "warning",
    name: { en: "Narrow Road Ahead", ml: "ഇടുങ്ങിയ റോഡ്" },
    meaning: { en: "Road narrows on both sides", ml: "റോഡ് ഇരുവശത്തും ഇടുങ്ങുന്നു" },
    explanation: { en: "Be ready to give way and watch for oncoming vehicles.", ml: "എതിരെവരുന്ന വാഹനങ്ങൾക്ക് വഴി നൽകാൻ തയ്യാറാകുക." },
    example: { en: "Old bridges, village roads.", ml: "പഴയ പാലങ്ങൾ, ഗ്രാമീണ റോഡുകൾ." },
    svg: warningTri(`<path d="M70 60 L 95 100 L 70 150 M130 60 L 105 100 L 130 150" stroke="#000" stroke-width="10" fill="none"/>`),
  },
  {
    id: "pedestrian-crossing",
    category: "warning",
    name: { en: "Pedestrian Crossing", ml: "കാൽനടയാത്രക്കാർ കടക്കുന്ന സ്ഥലം" },
    meaning: { en: "Pedestrians may cross here", ml: "ഇവിടെ കാൽനടയാത്രക്കാർ കടക്കാം" },
    explanation: { en: "Reduce speed and give priority to pedestrians.", ml: "വേഗത കുറയ്ക്കുക, കാൽനടയാത്രക്കാർക്ക് മുൻഗണന നൽകുക." },
    example: { en: "Near schools, hospitals, markets.", ml: "സ്കൂൾ, ആശുപത്രി, ചന്തകൾക്ക് സമീപം." },
    svg: warningTri(`<g fill="#000"><circle cx="80" cy="70" r="10"/><path d="M70 85 h20 v40 l-8 35 h-6 l-2 -25 -2 25 h-6 l-8 -35z"/><rect x="115" y="110" width="40" height="6"/><rect x="115" y="125" width="40" height="6"/><rect x="115" y="140" width="40" height="6"/></g>`),
  },
  {
    id: "school-ahead",
    category: "warning",
    name: { en: "School Ahead", ml: "സ്കൂൾ" },
    meaning: { en: "School zone — children present", ml: "സ്കൂൾ മേഖല — കുട്ടികൾ" },
    explanation: { en: "Drive at very low speed. Honking forbidden in many school zones.", ml: "വളരെ കുറഞ്ഞ വേഗതയിൽ ഓടിക്കുക. ഹോൺ നിരോധിച്ചിരിക്കാം." },
    example: { en: "All schools in Kerala display this sign.", ml: "കേരളത്തിലെ എല്ലാ സ്കൂളുകൾക്കും ഈ അടയാളം." },
    svg: warningTri(`<g fill="#000"><circle cx="85" cy="80" r="9"/><path d="M75 95 h20 v25 h-20z M70 120 l-6 30 h6 l4 -20 4 20 h6 l-6 -30z"/><circle cx="120" cy="80" r="9"/><path d="M110 95 h20 v25 h-20z M105 120 l-6 30 h6 l4 -20 4 20 h6 l-6 -30z"/></g>`),
  },
  {
    id: "speed-breaker",
    category: "warning",
    name: { en: "Speed Breaker", ml: "സ്പീഡ് ബ്രേക്കർ" },
    meaning: { en: "Hump on the road ahead", ml: "മുന്നിൽ കുട്ടി" },
    explanation: { en: "Slow to <20 km/h before crossing.", ml: "മുറിച്ചുകടക്കും മുമ്പ് വേഗത 20 km/h ന് താഴെ കുറയ്ക്കുക." },
    example: { en: "Before junctions and zebra crossings.", ml: "ജംഗ്ഷനുകൾക്കും സീബ്ര ക്രോസിങ്ങിനും മുന്നിൽ." },
    svg: warningTri(`<path d="M40 140 Q 100 70 160 140 Z" fill="#000"/>`),
  },
  {
    id: "cross-road",
    category: "warning",
    name: { en: "Cross Road", ml: "ക്രോസ് റോഡ്" },
    meaning: { en: "Four-way intersection ahead", ml: "നാല് വശ ജംഗ്ഷൻ" },
    explanation: { en: "Slow down, check all directions, and follow priority rules.", ml: "വേഗത കുറയ്ക്കുക, എല്ലാ ദിശകളും പരിശോധിക്കുക." },
    example: { en: "Common at urban junctions.", ml: "നഗര ജംഗ്ഷനുകളിൽ സാധാരണം." },
    svg: warningTri(`<g stroke="#000" stroke-width="16" fill="none"><path d="M100 50 V 170"/><path d="M40 110 H 160"/></g>`),
  },
  {
    id: "slippery-road",
    category: "warning",
    name: { en: "Slippery Road", ml: "വഴുവഴുപ്പുള്ള റോഡ്" },
    meaning: { en: "Road may be slippery", ml: "റോഡ് വഴുവഴുപ്പുള്ളതാകാം" },
    explanation: { en: "Reduce speed, avoid sudden braking and sharp steering.", ml: "വേഗത കുറയ്ക്കുക, പെട്ടെന്നുള്ള ബ്രേക്ക് ഒഴിവാക്കുക." },
    example: { en: "Frequent during Kerala monsoon.", ml: "കേരള മൺസൂൺ കാലത്ത് പതിവ്." },
    svg: warningTri(`<g fill="none" stroke="#000" stroke-width="10"><rect x="60" y="60" width="80" height="100" rx="8"/><path d="M70 90 q 30 -20 60 0 M70 130 q 30 -20 60 0"/></g>`),
  },

  // ---------------- MANDATORY (blue circles) ----------------
  {
    id: "turn-left",
    category: "mandatory",
    name: { en: "Turn Left", ml: "ഇടത്തേക്ക് തിരിയുക" },
    meaning: { en: "You must turn left", ml: "ഇടത്തേക്ക് തിരിയണം" },
    explanation: { en: "All vehicles must turn left at this point.", ml: "എല്ലാ വാഹനങ്ങളും ഇടത്തേക്ക് തിരിയണം." },
    example: { en: "One-way junctions.", ml: "ഏക-ദിശ ജംഗ്ഷനുകൾ." },
    svg: mandatoryCircle(`<path d="M140 90 H 90 V 70 L 55 100 L 90 130 V 110 H 140 Z" fill="#fff"/>`),
  },
  {
    id: "turn-right",
    category: "mandatory",
    name: { en: "Turn Right", ml: "വലത്തേക്ക് തിരിയുക" },
    meaning: { en: "You must turn right", ml: "വലത്തേക്ക് തിരിയണം" },
    explanation: { en: "All vehicles must turn right at this point.", ml: "എല്ലാ വാഹനങ്ങളും വലത്തേക്ക് തിരിയണം." },
    example: { en: "Mandatory right at intersections.", ml: "നിർബന്ധിത വലത് തിരിവ്." },
    svg: mandatoryCircle(`<path d="M60 90 H 110 V 70 L 145 100 L 110 130 V 110 H 60 Z" fill="#fff"/>`),
  },
  {
    id: "go-straight",
    category: "mandatory",
    name: { en: "Go Straight", ml: "നേരെ പോകുക" },
    meaning: { en: "Proceed straight only", ml: "നേരെ മാത്രം പോകുക" },
    explanation: { en: "Turning is not allowed here — straight only.", ml: "തിരിയാൻ പാടില്ല — നേരെ മാത്രം." },
    example: { en: "After a junction with restricted turns.", ml: "നിയന്ത്രിത തിരിവുള്ള ജംഗ്ഷൻ." },
    svg: mandatoryCircle(`<path d="M100 50 L 130 90 H 115 V 150 H 85 V 90 H 70 Z" fill="#fff"/>`),
  },
  {
    id: "horn",
    category: "mandatory",
    name: { en: "Sound Horn", ml: "ഹോൺ മുഴക്കുക" },
    meaning: { en: "Compulsory to sound horn", ml: "ഹോൺ നിർബന്ധം" },
    explanation: { en: "Use horn to warn of your presence, e.g. on blind curves.", ml: "നിങ്ങളുടെ സാന്നിധ്യം അറിയിക്കാൻ ഹോൺ ഉപയോഗിക്കുക." },
    example: { en: "Hilly area sharp bends.", ml: "മലയോര വളവുകൾ." },
    svg: mandatoryCircle(`<path d="M60 100 L 95 80 L 95 120 Z M105 70 q 30 30 0 60" fill="#fff" stroke="#fff" stroke-width="6"/>`),
  },
  {
    id: "compulsory-cycle-track",
    category: "mandatory",
    name: { en: "Compulsory Cycle Track", ml: "നിർബന്ധിത സൈക്കിൾ ട്രാക്ക്" },
    meaning: { en: "Cyclists must use this track", ml: "സൈക്കിൾ യാത്രക്കാർ ഈ ട്രാക്ക് ഉപയോഗിക്കണം" },
    explanation: { en: "Only cyclists allowed.", ml: "സൈക്കിൾ യാത്രക്കാർക്ക് മാത്രം." },
    example: { en: "Dedicated cycle lanes.", ml: "സമർപ്പിത സൈക്കിൾ ലെയ്നുകൾ." },
    svg: mandatoryCircle(`<g fill="none" stroke="#fff" stroke-width="8"><circle cx="75" cy="125" r="22"/><circle cx="135" cy="125" r="22"/><path d="M75 125 L 105 75 L 130 125"/><path d="M95 75 H 120"/></g>`),
  },

  // ---------------- PROHIBITORY (red circles) ----------------
  {
    id: "no-entry",
    category: "prohibitory",
    name: { en: "No Entry", ml: "പ്രവേശനം ഇല്ല" },
    meaning: { en: "Entry is prohibited", ml: "പ്രവേശനം നിരോധിച്ചിരിക്കുന്നു" },
    explanation: { en: "No vehicle may enter the road beyond this sign.", ml: "ഈ അടയാളത്തിന് അപ്പുറം ഒരു വാഹനത്തിനും പ്രവേശിക്കാൻ കഴിയില്ല." },
    example: { en: "One-way street entry.", ml: "ഏക-ദിശ പാത." },
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="100" r="92" fill="#d61f1f"/><rect x="40" y="88" width="120" height="24" fill="#fff"/></svg>`,
  },
  {
    id: "no-parking",
    category: "prohibitory",
    name: { en: "No Parking", ml: "പാർക്കിങ് അനുവദനീയമല്ല" },
    meaning: { en: "Parking prohibited", ml: "പാർക്കിങ് നിരോധിച്ചിരിക്കുന്നു" },
    explanation: { en: "You may stop briefly to pick up/drop passengers but not park.", ml: "യാത്രക്കാരെ കയറ്റാനോ ഇറക്കാനോ കുറച്ച് സമയത്തേക്ക് നിർത്താം, പക്ഷേ പാർക്ക് ചെയ്യാൻ പാടില്ല." },
    example: { en: "Near hospital gates.", ml: "ആശുപത്രി ഗേറ്റിന് സമീപം." },
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="100" r="92" fill="#0a47a3"/><circle cx="100" cy="100" r="92" fill="none" stroke="#d61f1f" stroke-width="14"/><text x="100" y="135" font-size="110" font-weight="900" font-family="Inter, sans-serif" fill="#fff" text-anchor="middle">P</text><line x1="40" y1="40" x2="160" y2="160" stroke="#d61f1f" stroke-width="14"/></svg>`,
  },
  {
    id: "no-horn",
    category: "prohibitory",
    name: { en: "Horn Prohibited", ml: "ഹോൺ നിരോധനം" },
    meaning: { en: "Use of horn is prohibited", ml: "ഹോൺ ഉപയോഗം നിരോധിച്ചിരിക്കുന്നു" },
    explanation: { en: "Silent zone — no honking. Near hospitals & schools.", ml: "ശാന്ത മേഖല — ഹോൺ മുഴക്കരുത്." },
    example: { en: "Outside hospitals.", ml: "ആശുപത്രികൾക്ക് പുറത്ത്." },
    svg: prohibitoryCircle(`<g fill="#000"><path d="M55 100 L 95 80 L 95 120 Z"/><path d="M105 75 q 25 25 0 50" fill="none" stroke="#000" stroke-width="6"/></g><line x1="40" y1="40" x2="160" y2="160" stroke="#d61f1f" stroke-width="14"/>`),
  },
  {
    id: "no-overtaking",
    category: "prohibitory",
    name: { en: "Overtaking Prohibited", ml: "ഓവർടേക്കിങ് നിരോധനം" },
    meaning: { en: "Overtaking is prohibited", ml: "ഓവർടേക്കിങ് നിരോധിച്ചിരിക്കുന്നു" },
    explanation: { en: "No overtaking until the next sign cancels this.", ml: "അടുത്ത അടയാളം റദ്ദാക്കുന്നതുവരെ ഓവർടേക്കിങ് പാടില്ല." },
    example: { en: "On hilly/curvy roads.", ml: "മലയോര വളവുള്ള റോഡുകൾ." },
    svg: prohibitoryCircle(`<g><rect x="50" y="80" width="55" height="55" rx="6" fill="#000"/><rect x="95" y="60" width="55" height="55" rx="6" fill="#d61f1f"/></g>`),
  },
  {
    id: "speed-limit-50",
    category: "prohibitory",
    name: { en: "Speed Limit 50", ml: "വേഗപരിധി 50" },
    meaning: { en: "Maximum speed 50 km/h", ml: "പരമാവധി വേഗത 50 km/h" },
    explanation: { en: "Do not exceed 50 km/h beyond this sign.", ml: "ഈ അടയാളത്തിന് അപ്പുറം 50 km/h ന് മുകളിൽ ഓടിക്കരുത്." },
    example: { en: "City limits.", ml: "നഗര പരിധി." },
    svg: prohibitoryCircle(`<text x="100" y="135" font-size="84" font-weight="900" font-family="Inter, sans-serif" fill="#000" text-anchor="middle">50</text>`),
  },
  {
    id: "no-u-turn",
    category: "prohibitory",
    name: { en: "U-Turn Prohibited", ml: "U-ടേൺ നിരോധനം" },
    meaning: { en: "Taking a U-turn is not allowed", ml: "U-ടേൺ അനുവദനീയമല്ല" },
    explanation: { en: "Continue forward — no U-turn at this point.", ml: "മുന്നോട്ട് തുടരുക — ഇവിടെ U-ടേൺ പാടില്ല." },
    example: { en: "Divided highways.", ml: "വിഭജിത ഹൈവേകൾ." },
    svg: prohibitoryCircle(`<path d="M65 140 V 95 a 35 35 0 0 1 70 0 V 140 h-18 V 95 a 17 17 0 0 0 -34 0 V 140 Z" fill="#000"/><line x1="40" y1="40" x2="160" y2="160" stroke="#d61f1f" stroke-width="14"/>`),
  },

  // ---------------- INFORMATORY (blue rectangles) ----------------
  {
    id: "hospital",
    category: "informatory",
    name: { en: "Hospital", ml: "ആശുപത്രി" },
    meaning: { en: "Hospital nearby", ml: "ആശുപത്രി സമീപം" },
    explanation: { en: "Drive silently. Watch for ambulances.", ml: "ശാന്തമായി ഓടിക്കുക. ആംബുലൻസ് ശ്രദ്ധിക്കുക." },
    example: { en: "Outside major hospitals.", ml: "പ്രധാന ആശുപത്രികൾക്ക് പുറത്ത്." },
    svg: infoRect(`<g fill="#fff"><rect x="80" y="50" width="40" height="100"/><rect x="50" y="80" width="100" height="40"/></g>`),
  },
  {
    id: "petrol-pump",
    category: "informatory",
    name: { en: "Petrol Pump", ml: "പെട്രോൾ പമ്പ്" },
    meaning: { en: "Fuel station ahead", ml: "ഇന്ധന സ്റ്റേഷൻ" },
    explanation: { en: "Indicates a petrol/diesel station nearby.", ml: "സമീപത്ത് പെട്രോൾ/ഡീസൽ പമ്പ് സൂചിപ്പിക്കുന്നു." },
    example: { en: "On highways.", ml: "ഹൈവേകളിൽ." },
    svg: infoRect(`<g fill="#fff"><rect x="60" y="60" width="50" height="100"/><rect x="60" y="60" width="50" height="20"/><circle cx="85" cy="100" r="8" fill="#0a47a3"/><path d="M120 80 v 60 a 10 10 0 0 0 10 10 h 5 v -45 h -5" fill="none" stroke="#fff" stroke-width="6"/></g>`),
  },
  {
    id: "first-aid-post",
    category: "informatory",
    name: { en: "First Aid Post", ml: "പ്രഥമ ശുശ്രൂഷ കേന്ദ്രം" },
    meaning: { en: "First aid available", ml: "പ്രഥമ ശുശ്രൂഷ ലഭ്യം" },
    explanation: { en: "Emergency first aid post nearby.", ml: "സമീപത്ത് അടിയന്തിര പ്രഥമ ശുശ്രൂഷ കേന്ദ്രം." },
    example: { en: "Long highway stretches.", ml: "നീണ്ട ഹൈവേകൾ." },
    svg: infoRect(`<rect x="35" y="35" width="130" height="130" fill="#fff" rx="6"/><g fill="#d61f1f"><rect x="85" y="55" width="30" height="90"/><rect x="55" y="85" width="90" height="30"/></g>`, "#0a47a3"),
  },
  {
    id: "parking",
    category: "informatory",
    name: { en: "Parking", ml: "പാർക്കിങ്" },
    meaning: { en: "Parking allowed", ml: "പാർക്കിങ് അനുവദനീയം" },
    explanation: { en: "Designated parking area.", ml: "നിശ്ചയിച്ച പാർക്കിങ് മേഖല." },
    example: { en: "Public buildings.", ml: "പൊതു കെട്ടിടങ്ങൾ." },
    svg: infoRect(`<text x="100" y="145" font-size="140" font-weight="900" font-family="Inter, sans-serif" fill="#fff" text-anchor="middle">P</text>`),
  },
  {
    id: "eating-place",
    category: "informatory",
    name: { en: "Eating Place", ml: "ഭക്ഷണശാല" },
    meaning: { en: "Restaurant ahead", ml: "ഭക്ഷണശാല" },
    explanation: { en: "Indicates a restaurant or food court.", ml: "ഭക്ഷണശാല സൂചിപ്പിക്കുന്നു." },
    example: { en: "Highway dhabas.", ml: "ഹൈവേ ധാബകൾ." },
    svg: infoRect(`<g fill="#fff" stroke="#fff" stroke-width="6"><path d="M70 50 v 60 a 12 12 0 0 0 24 0 v -60 M82 50 v 60 M70 75 h 24" fill="none"/><path d="M130 50 v 100 M118 50 q 0 30 24 30 v 70" fill="none"/></g>`),
  },

  // ---------------- SIGNALS ----------------
  {
    id: "signal-red",
    category: "signal",
    name: { en: "Red Signal", ml: "ചുവന്ന സിഗ്നൽ" },
    meaning: { en: "Stop — do not proceed", ml: "നിർത്തുക — മുന്നോട്ട് പോകരുത്" },
    explanation: { en: "Stop at the stop line. Proceeding through red is a serious offence.", ml: "സ്റ്റോപ്പ് ലൈനിൽ നിർത്തുക. ചുവന്ന സിഗ്നൽ കടക്കൽ ഗുരുതര കുറ്റമാണ്." },
    example: { en: "All signalised junctions.", ml: "എല്ലാ സിഗ്നൽ ജംഗ്ഷനുകൾ." },
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect x="60" y="10" width="80" height="180" rx="14" fill="#1f1f1f"/><circle cx="100" cy="50" r="22" fill="#ff2a2a"/><circle cx="100" cy="50" r="22" fill="url(#g1)"/><defs><radialGradient id="g1"><stop offset="0" stop-color="#fff" stop-opacity="0.5"/><stop offset="1" stop-color="#ff2a2a" stop-opacity="0"/></radialGradient></defs><circle cx="100" cy="100" r="22" fill="#3a3a3a"/><circle cx="100" cy="150" r="22" fill="#3a3a3a"/></svg>`,
  },
  {
    id: "signal-yellow",
    category: "signal",
    name: { en: "Yellow Signal", ml: "മഞ്ഞ സിഗ്നൽ" },
    meaning: { en: "Prepare to stop", ml: "നിർത്താൻ തയ്യാറാകുക" },
    explanation: { en: "Stop before the line unless you cannot do so safely.", ml: "സുരക്ഷിതമായി കഴിയില്ലെങ്കിലല്ലാതെ ലൈനിന് മുമ്പ് നിർത്തുക." },
    example: { en: "Between green and red.", ml: "പച്ച-ചുവപ്പ് ഇടയിൽ." },
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect x="60" y="10" width="80" height="180" rx="14" fill="#1f1f1f"/><circle cx="100" cy="50" r="22" fill="#3a3a3a"/><circle cx="100" cy="100" r="22" fill="#ffd400"/><circle cx="100" cy="150" r="22" fill="#3a3a3a"/></svg>`,
  },
  {
    id: "signal-green",
    category: "signal",
    name: { en: "Green Signal", ml: "പച്ച സിഗ്നൽ" },
    meaning: { en: "Proceed if safe", ml: "സുരക്ഷിതമെങ്കിൽ പോകുക" },
    explanation: { en: "Proceed straight, left or right if path is clear and your direction is permitted.", ml: "വഴി തെളിയുകയും ദിശ അനുവദനീയവുമെങ്കിൽ പോകുക." },
    example: { en: "Most junctions.", ml: "മിക്ക ജംഗ്ഷനുകൾ." },
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect x="60" y="10" width="80" height="180" rx="14" fill="#1f1f1f"/><circle cx="100" cy="50" r="22" fill="#3a3a3a"/><circle cx="100" cy="100" r="22" fill="#3a3a3a"/><circle cx="100" cy="150" r="22" fill="#16c75a"/></svg>`,
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