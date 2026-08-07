export type SignCategory = "mandatory" | "warning" | "prohibitory" | "informatory" | "signal";
import { signPhoto } from "./sign-images";

export type SignFilter = SignCategory | "parking" | "speed" | "safety";

export type Sign = {
  id: string;
  category: SignCategory;
  name: { en: string; ml: string };
  meaning: { en: string; ml: string };
  explanation: { en: string; ml: string };
  example: { en: string; ml: string };
  /** Inline SVG markup — keeps signs crisp at any zoom level */
  svg: string;
  keywords?: string[];
  whereUsed?: { en: string; ml: string };
  whyImportant?: { en: string; ml: string };
  drivingTips?: { en: string[]; ml: string[] };
  commonMistakes?: { en: string[]; ml: string[] };
  keralaTestNote?: { en: string; ml: string };
  memoryTrick?: { en: string; ml: string };
  relatedSignIds?: string[];
  quiz?: {
    question: { en: string; ml: string };
    options: { en: string[]; ml: string[] };
    answer: number;
    explanation: { en: string; ml: string };
  };
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
    svg: signPhoto("turn-left"),
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
    svg: signPhoto("turn-right"),
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
    svg: signPhoto("go-straight"),
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
    svg: signPhoto("sound-horn"),
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
    svg: signPhoto("cycle-track"),
  },
  {
    id: "bus-lane",
    category: "mandatory",
    name: { en: "Bus Lane", ml: "ബസ് ലെയ്ൻ" },
    meaning: { en: "Lane reserved for buses", ml: "ബസുകൾക്കായി മാറ്റിവച്ച ലെയ്ൻ" },
    explanation: {
      en: "Only buses may use this lane during the hours shown.",
      ml: "കാണിച്ച സമയങ്ങളിൽ ബസുകൾക്ക് മാത്രമേ ഈ ലെയ്ൻ ഉപയോഗിക്കാൻ കഴിയൂ.",
    },
    example: { en: "City bus corridors.", ml: "നഗര ബസ് ഇടനാഴികൾ." },
    svg: signPhoto("bus-lane"),
  },
  {
    id: "ahead-or-left",
    category: "mandatory",
    name: { en: "Ahead or Turn Left", ml: "നേരെ അല്ലെങ്കിൽ ഇടത്തേക്ക്" },
    meaning: { en: "Go straight or turn left only", ml: "നേരെ പോകുക അല്ലെങ്കിൽ ഇടത്തേക്ക് മാത്രം" },
    explanation: {
      en: "Right turn and U-turn are not permitted here.",
      ml: "വലത്തേക്കുള്ള തിരിവും U-ടേണും ഇവിടെ അനുവദനീയമല്ല.",
    },
    example: { en: "T-junctions with a one-way arm.", ml: "ഏക-ദിശ ശാഖയുള്ള T-ജംഗ്ഷനുകൾ." },
    svg: signPhoto("ahead-or-left"),
  },
  {
    id: "ahead-or-right",
    category: "mandatory",
    name: { en: "Ahead or Turn Right", ml: "നേരെ അല്ലെങ്കിൽ വലത്തേക്ക്" },
    meaning: { en: "Go straight or turn right only", ml: "നേരെ പോകുക അല്ലെങ്കിൽ വലത്തേക്ക് മാത്രം" },
    explanation: {
      en: "Left turn is not allowed beyond this sign.",
      ml: "ഈ ബോർഡിന് ശേഷം ഇടത്തേക്ക് തിരിയാൻ പാടില്ല.",
    },
    example: { en: "Junctions with a restricted left arm.", ml: "ഇടത് ശാഖ നിയന്ത്രിത ജംഗ്ഷനുകൾ." },
    svg: signPhoto("ahead-or-right"),
  },
  {
    id: "left-ahead",
    category: "mandatory",
    name: { en: "Left Turn Ahead", ml: "മുന്നിൽ ഇടത് തിരിവ്" },
    meaning: { en: "The road turns left ahead", ml: "മുന്നിൽ റോഡ് ഇടത്തേക്ക് തിരിയുന്നു" },
    explanation: {
      en: "Prepare to take the compulsory left turn a short distance ahead.",
      ml: "അല്പം മുന്നിലുള്ള നിർബന്ധിത ഇടത് തിരിവിന് തയ്യാറാകുക.",
    },
    example: { en: "Approach to one-way loops.", ml: "ഏക-ദിശ ലൂപ്പുകളിലേക്കുള്ള സമീപനം." },
    svg: signPhoto("left-ahead"),
  },
  {
    id: "right-ahead",
    category: "mandatory",
    name: { en: "Right Turn Ahead", ml: "മുന്നിൽ വലത് തിരിവ്" },
    meaning: { en: "The road turns right ahead", ml: "മുന്നിൽ റോഡ് വലത്തേക്ക് തിരിയുന്നു" },
    explanation: {
      en: "Slow down and take the compulsory right turn ahead.",
      ml: "വേഗത കുറച്ച് മുന്നിലുള്ള നിർബന്ധിത വലത് തിരിവ് എടുക്കുക.",
    },
    example: { en: "Diverted road sections.", ml: "വഴിതിരിച്ചുവിട്ട റോഡ് ഭാഗങ്ങൾ." },
    svg: signPhoto("right-ahead"),
  },
  {
    id: "cycle-pedestrian-path",
    category: "mandatory",
    name: { en: "Cycle & Pedestrian Path", ml: "സൈക്കിൾ & കാൽനട പാത" },
    meaning: {
      en: "Separate lanes for pedestrians and cycles",
      ml: "കാൽനടയാത്രക്കാർക്കും സൈക്കിളിനും വെവ്വേറെ വഴി",
    },
    explanation: {
      en: "Walk on the pedestrian half and cycle on the cycle half; motor vehicles are not allowed.",
      ml: "കാൽനടക്കാർ ഒരു വശത്തും സൈക്കിൾ മറുവശത്തും; മോട്ടോർ വാഹനങ്ങൾ അനുവദനീയമല്ല.",
    },
    example: { en: "Shared urban footpaths.", ml: "നഗരത്തിലെ പങ്കിട്ട നടപ്പാതകൾ." },
    svg: signPhoto("cycle-pedestrian-path"),
  },
  {
    id: "pedestrians-only",
    category: "mandatory",
    name: { en: "Pedestrians Only", ml: "കാൽനടയാത്രക്കാർക്ക് മാത്രം" },
    meaning: { en: "Route reserved for pedestrians", ml: "കാൽനടയാത്രക്കാർക്കായുള്ള വഴി" },
    explanation: {
      en: "No vehicles may use this path — walking only.",
      ml: "ഈ വഴിയിൽ വാഹനങ്ങൾ പാടില്ല — നടത്തം മാത്രം.",
    },
    example: { en: "Market walkways and plazas.", ml: "മാർക്കറ്റ് നടപ്പാതകളും പ്ലാസകളും." },
    svg: signPhoto("pedestrians-only"),
  },
  {
    id: "min-speed-30",
    category: "mandatory",
    name: { en: "Minimum Speed 30", ml: "കുറഞ്ഞ വേഗത 30" },
    meaning: { en: "Do not drive slower than 30 km/h", ml: "30 km/h-ൽ കുറഞ്ഞ വേഗതയിൽ ഓടിക്കരുത്" },
    explanation: {
      en: "Slow vehicles block the flow; use another lane or road if you cannot keep this speed.",
      ml: "വേഗത കുറഞ്ഞ വാഹനങ്ങൾ ഗതാഗതം തടസ്സപ്പെടുത്തും; ഈ വേഗത നിലനിർത്താനാകില്ലെങ്കിൽ മറ്റു വഴി ഉപയോഗിക്കുക.",
    },
    example: { en: "Tunnels and flyovers.", ml: "ടണലുകളും ഫ്ലൈഓവറുകളും." },
    svg: signPhoto("min-speed-30"),
  },
  {
    id: "min-speed-50",
    category: "mandatory",
    name: { en: "Minimum Speed 50", ml: "കുറഞ്ഞ വേഗത 50" },
    meaning: { en: "Do not drive slower than 50 km/h", ml: "50 km/h-ൽ കുറഞ്ഞ വേഗതയിൽ ഓടിക്കരുത്" },
    explanation: {
      en: "Applies to express lanes where slow-moving vehicles are unsafe.",
      ml: "വേഗത കുറഞ്ഞ വാഹനങ്ങൾ അപകടകരമാകുന്ന എക്സ്പ്രസ് ലെയ്നുകളിൽ ബാധകം.",
    },
    example: { en: "Expressway fast lanes.", ml: "എക്സ്പ്രസ്‌വേ ഫാസ്റ്റ് ലെയ്നുകൾ." },
    svg: signPhoto("min-speed-50"),
  },
  {
    id: "pass-either-side",
    category: "mandatory",
    name: { en: "Pass Either Side", ml: "ഏതു വശത്തുകൂടിയും കടക്കാം" },
    meaning: { en: "You may pass on either side", ml: "ഇരു വശത്തുകൂടിയും കടന്നുപോകാം" },
    explanation: {
      en: "An obstruction ahead can be passed on the left or the right.",
      ml: "മുന്നിലുള്ള തടസ്സം ഇടതോ വലതോ വശത്തുകൂടി കടക്കാം.",
    },
    example: { en: "Traffic islands and medians.", ml: "ട്രാഫിക് ദ്വീപുകളും മീഡിയനുകളും." },
    svg: signPhoto("pass-either-side"),
  },
  {
    id: "mini-roundabout",
    category: "mandatory",
    name: { en: "Mini Roundabout", ml: "മിനി റൗണ്ടബൗട്ട്" },
    meaning: { en: "Small roundabout ahead", ml: "മുന്നിൽ ചെറിയ റൗണ്ടബൗട്ട്" },
    explanation: {
      en: "Go around the marking clockwise and give way to traffic from the right.",
      ml: "അടയാളത്തിന് ചുറ്റും ഘടികാരദിശയിൽ പോകുക, വലത്തുനിന്ന് വരുന്ന വാഹനങ്ങൾക്ക് വഴി നൽകുക.",
    },
    example: { en: "Small town crossings.", ml: "ചെറിയ പട്ടണ ജംഗ്ഷനുകൾ." },
    svg: signPhoto("mini-roundabout"),
  },
  {
    id: "snow-chains",
    category: "mandatory",
    name: { en: "Snow Chains Compulsory", ml: "സ്നോ ചെയിൻ നിർബന്ധം" },
    meaning: { en: "Tyre chains must be fitted", ml: "ടയറിൽ ചെയിൻ ഘടിപ്പിക്കണം" },
    explanation: {
      en: "Used on snow-bound hill roads; vehicles without chains must not proceed.",
      ml: "മഞ്ഞുമൂടിയ മലയോര റോഡുകളിൽ; ചെയിൻ ഇല്ലാത്ത വാഹനങ്ങൾ മുന്നോട്ട് പോകരുത്.",
    },
    example: { en: "High-altitude winter roads.", ml: "ഉയർന്ന പ്രദേശങ്ങളിലെ ശൈത്യകാല റോഡുകൾ." },
    svg: signPhoto("snow-chains"),
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
    svg: signPhoto("no-entry"),
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
    svg: signPhoto("no-parking"),
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
    svg: signPhoto("no-horn"),
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
    svg: signPhoto("no-overtaking"),
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
    svg: signPhoto("speed-limit-50"),
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
    svg: signPhoto("no-u-turn"),
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
    svg: signPhoto("keep-left"),
  },
  {
    id: "no-heavy-vehicles",
    category: "prohibitory",
    name: { en: "Heavy Vehicles Prohibited", ml: "ഹെവി വാഹനങ്ങൾ നിരോധിതം" },
    meaning: { en: "Trucks and lorries prohibited", ml: "ട്രക്കുകളും ലോറികളും നിരോധിതം" },
    explanation: { en: "Weight / size restricted road.", ml: "ഭാരം/വലിപ്പം നിയന്ത്രിത റോഡ്." },
    example: { en: "Narrow town centres.", ml: "ഇടുങ്ങിയ ടൗൺ കേന്ദ്രങ്ങൾ." },
    svg: signPhoto("no-truck"),
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
    svg: signPhoto("no-cycle"),
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
  {
    id: "stop",
    category: "prohibitory",
    name: { en: "Stop", ml: "നിർത്തുക" },
    meaning: { en: "Come to a complete stop", ml: "പൂർണ്ണമായി നിർത്തുക" },
    explanation: {
      en: "Stop before the line, check all directions and move only when safe.",
      ml: "ലൈനിന് മുമ്പ് നിർത്തി എല്ലാദിശയും നോക്കി സുരക്ഷിതമെങ്കിൽ മാത്രം നീങ്ങുക.",
    },
    example: {
      en: "Minor roads joining busy main roads.",
      ml: "പ്രധാന റോഡിലേക്ക് ചേരുന്ന ചെറിയ റോഡുകൾ.",
    },
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path d="M72 16h56l40 40v88l-40 40H72l-40-40V56z" fill="#e01f1f"/><text x="100" y="118" font-size="42" font-weight="900" font-family="Inter, Arial, sans-serif" fill="#fff" text-anchor="middle">STOP</text></svg>`,
  },
  {
    id: "give-way",
    category: "prohibitory",
    name: { en: "Give Way", ml: "വഴി നൽകുക" },
    meaning: { en: "Yield to traffic on the main road", ml: "പ്രധാന റോഡിലെ വാഹനങ്ങൾക്ക് മുൻഗണന" },
    explanation: {
      en: "Slow down and allow vehicles or pedestrians with priority to pass first.",
      ml: "വേഗത കുറച്ച് മുൻഗണനയുള്ള വാഹനങ്ങൾക്കും കാൽനടക്കാർക്കും ആദ്യം വഴിനൽകുക.",
    },
    example: {
      en: "Roundabout entries and side roads.",
      ml: "റൗണ്ടബൗട്ട് പ്രവേശനങ്ങളും സൈഡ് റോഡുകളും.",
    },
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><polygon points="100,178 184,32 16,32" fill="#fff" stroke="#e01f1f" stroke-width="16" stroke-linejoin="round"/></svg>`,
  },
  {
    id: "one-way",
    category: "informatory",
    name: { en: "One Way", ml: "ഒറ്റ ദിശ" },
    meaning: { en: "Traffic moves in one direction only", ml: "ഗതാഗതം ഒരേയൊരു ദിശയിൽ മാത്രം" },
    explanation: {
      en: "Enter and drive only in the arrow direction; never reverse into oncoming flow.",
      ml: "അമ്പിന്റെ ദിശയിൽ മാത്രം പ്രവേശിച്ച് ഓടിക്കുക; എതിർദിശയിലേക്ക് പോകരുത്.",
    },
    example: { en: "City streets with limited width.", ml: "ഇടുങ്ങിയ നഗര റോഡുകൾ." },
    svg: infoRect(`<path d="M40 88 H125 V60 L165 100 L125 140 V112 H40 Z" fill="#fff"/>`),
  },
  {
    id: "keep-right",
    category: "mandatory",
    name: { en: "Keep Right", ml: "വലതുവശം പാലിക്കുക" },
    meaning: { en: "Pass on the right side of divider", ml: "ഡിവൈഡറിന്റെ വലത്തുകൂടി പോകുക" },
    explanation: {
      en: "Follow the arrow to avoid islands, barriers or temporary works.",
      ml: "ട്രാഫിക് ദ്വീപുകൾ, തടസ്സങ്ങൾ എന്നിവ ഒഴിവാക്കാൻ അമ്പ് പിന്തുടരുക.",
    },
    example: {
      en: "Temporary diversions and islands.",
      ml: "താൽക്കാലിക ഡൈവർഷനുകളും ട്രാഫിക് ദ്വീപുകളും.",
    },
    svg: signPhoto("keep-right"),
  },
  {
    id: "height-limit",
    category: "prohibitory",
    name: { en: "Height Limit", ml: "ഉയരപരിധി" },
    meaning: {
      en: "Vehicles above shown height prohibited",
      ml: "കാണിച്ച ഉയരത്തിന് മുകളിലുള്ള വാഹനങ്ങൾക്ക് വിലക്ക്",
    },
    explanation: {
      en: "Do not enter if your vehicle or load exceeds the posted clearance.",
      ml: "വാഹനമോ ചരക്കോ കാണിച്ച ഉയരത്തെക്കാൾ കൂടുതലെങ്കിൽ പ്രവേശിക്കരുത്.",
    },
    example: { en: "Underpasses and low bridges.", ml: "അണ്ടർപാസുകളും താഴ്ന്ന പാലങ്ങളും." },
    svg: signPhoto("height-limit"),
  },
  {
    id: "width-limit",
    category: "prohibitory",
    name: { en: "Width Limit", ml: "വീതിപരിധി" },
    meaning: {
      en: "Vehicles above shown width prohibited",
      ml: "കാണിച്ച വീതിക്ക് മുകളിലുള്ള വാഹനങ്ങൾക്ക് വിലക്ക്",
    },
    explanation: {
      en: "Wide vehicles must choose another route before a narrow bridge or lane.",
      ml: "വീതിയേറിയ വാഹനങ്ങൾ ഇടുങ്ങിയ പാലം/റോഡിന് മുമ്പ് മറ്റുവഴി തിരഞ്ഞെടുക്കണം.",
    },
    example: {
      en: "Narrow bridges and market lanes.",
      ml: "ഇടുങ്ങിയ പാലങ്ങളും മാർക്കറ്റ് റോഡുകളും.",
    },
    svg: signPhoto("width-limit"),
  },
  {
    id: "weight-limit",
    category: "prohibitory",
    name: { en: "Weight Limit", ml: "ഭാരപരിധി" },
    meaning: {
      en: "Vehicles above shown weight prohibited",
      ml: "കാണിച്ച ഭാരത്തിന് മുകളിലുള്ള വാഹനങ്ങൾക്ക് വിലക്ക്",
    },
    explanation: {
      en: "Protects weak bridges, culverts and roads from overloaded vehicles.",
      ml: "ദുർബല പാലങ്ങളും കല്വർട്ടുകളും ഓവർലോഡ് വാഹനങ്ങളിൽ നിന്ന് സംരക്ഷിക്കുന്നു.",
    },
    example: { en: "Old bridges and village roads.", ml: "പഴയ പാലങ്ങളും ഗ്രാമ റോഡുകളും." },
    svg: signPhoto("load-limit"),
  },
  {
    id: "roundabout",
    category: "mandatory",
    name: { en: "Roundabout", ml: "റൗണ്ടബൗട്ട്" },
    meaning: {
      en: "Move around the central island in the indicated direction",
      ml: "സെൻട്രൽ ഐലൻഡിന് ചുറ്റും നിർദ്ദേശിച്ച ദിശയിൽ പോകുക",
    },
    explanation: {
      en: "Give way to traffic already in the circle and signal before exiting.",
      ml: "വൃത്തത്തിനുള്ളിലുള്ള വാഹനങ്ങൾക്ക് വഴിനൽകി പുറത്തുകടക്കുമ്പോൾ സിഗ്നൽ നൽകുക.",
    },
    example: { en: "Large town junctions.", ml: "വലിയ പട്ടണ ജംഗ്ഷനുകൾ." },
    svg: mandatoryCircle(
      `<path d="M100 52a48 48 0 1 1-42 72" fill="none" stroke="#fff" stroke-width="16" stroke-linecap="round"/><path d="M54 124l-8-36 34 13z" fill="#fff"/>`,
    ),
  },
  {
    id: "no-bus",
    category: "prohibitory",
    name: { en: "Buses Prohibited", ml: "ബസ് നിരോധിതം" },
    meaning: { en: "Buses are not allowed", ml: "ബസുകൾ അനുവദനീയമല്ല" },
    explanation: {
      en: "Buses must take an alternative route beyond this sign.",
      ml: "ഈ അടയാളത്തിന് അപ്പുറം ബസുകൾ മറ്റുവഴി തിരഞ്ഞെടുക്കണം.",
    },
    example: { en: "Narrow town roads.", ml: "ഇടുങ്ങിയ ടൗൺ റോഡുകൾ." },
    svg: signPhoto("no-bus"),
  },
  {
    id: "no-motor-vehicles",
    category: "prohibitory",
    name: { en: "Motor Vehicles Prohibited", ml: "മോട്ടോർ വാഹനങ്ങൾ നിരോധിതം" },
    meaning: { en: "No motorised vehicles allowed", ml: "മോട്ടോർ വാഹനങ്ങൾ അനുവദനീയമല്ല" },
    explanation: {
      en: "Only pedestrians and non-motorised traffic may proceed.",
      ml: "കാൽനടക്കാർക്കും മോട്ടോർ ഇതര വാഹനങ്ങൾക്കും മാത്രം.",
    },
    example: { en: "Pedestrian plazas.", ml: "കാൽനട മേഖലകൾ." },
    svg: signPhoto("no-motor-vehicles"),
  },
  {
    id: "no-bullock-cart",
    category: "prohibitory",
    name: { en: "Bullock Carts Prohibited", ml: "കാളവണ്ടി നിരോധിതം" },
    meaning: { en: "Bullock carts are not allowed", ml: "കാളവണ്ടികൾ അനുവദനീയമല്ല" },
    explanation: {
      en: "Slow animal-drawn carts must not use this road.",
      ml: "മൃഗങ്ങൾ വലിക്കുന്ന വണ്ടികൾ ഈ റോഡിൽ പാടില്ല.",
    },
    example: { en: "High-speed corridors.", ml: "ഉയർന്ന വേഗ പാതകൾ." },
    svg: signPhoto("no-bullock-cart"),
  },
  {
    id: "no-bullock-handcart",
    category: "prohibitory",
    name: { en: "Bullock & Hand Carts Prohibited", ml: "കാളവണ്ടിയും കൈവണ്ടിയും നിരോധിതം" },
    meaning: { en: "Both bullock and hand carts prohibited", ml: "കാളവണ്ടിയും കൈവണ്ടിയും നിരോധിതം" },
    explanation: {
      en: "Neither animal carts nor hand carts may enter.",
      ml: "കാളവണ്ടിക്കും കൈവണ്ടിക്കും പ്രവേശനമില്ല.",
    },
    example: { en: "Busy city roads.", ml: "തിരക്കേറിയ നഗര റോഡുകൾ." },
    svg: signPhoto("no-bullock-handcart"),
  },
  {
    id: "no-handcart",
    category: "prohibitory",
    name: { en: "Hand Carts Prohibited", ml: "കൈവണ്ടി നിരോധിതം" },
    meaning: { en: "Hand carts are not allowed", ml: "കൈവണ്ടികൾ അനുവദനീയമല്ല" },
    explanation: {
      en: "Push carts must not use this stretch.",
      ml: "തള്ളുവണ്ടികൾ ഈ ഭാഗത്ത് പാടില്ല.",
    },
    example: { en: "Main market roads.", ml: "പ്രധാന മാർക്കറ്റ് റോഡുകൾ." },
    svg: signPhoto("no-handcart"),
  },
  {
    id: "no-tonga",
    category: "prohibitory",
    name: { en: "Tongas Prohibited", ml: "ടോംഗ നിരോധിതം" },
    meaning: { en: "Horse carriages are not allowed", ml: "കുതിരവണ്ടികൾ അനുവദനീയമല്ല" },
    explanation: {
      en: "Horse-drawn carriages must take another route.",
      ml: "കുതിരവണ്ടികൾ മറ്റുവഴി പോകണം.",
    },
    example: { en: "Highways.", ml: "ഹൈവേകൾ." },
    svg: signPhoto("no-tonga"),
  },
  {
    id: "no-left-turn",
    category: "prohibitory",
    name: { en: "Left Turn Prohibited", ml: "ഇടത്തേക്ക് തിരിയരുത്" },
    meaning: { en: "You must not turn left", ml: "ഇടത്തേക്ക് തിരിയാൻ പാടില്ല" },
    explanation: {
      en: "Continue straight or take a permitted turn.",
      ml: "നേരെ പോകുക അല്ലെങ്കിൽ അനുവദനീയമായ വഴി എടുക്കുക.",
    },
    example: { en: "One-way junctions.", ml: "ഏക-ദിശ ജംഗ്ഷനുകൾ." },
    svg: signPhoto("no-left-turn"),
  },
  {
    id: "no-right-turn",
    category: "prohibitory",
    name: { en: "Right Turn Prohibited", ml: "വലത്തേക്ക് തിരിയരുത്" },
    meaning: { en: "You must not turn right", ml: "വലത്തേക്ക് തിരിയാൻ പാടില്ല" },
    explanation: {
      en: "Right turns are banned to avoid conflicting traffic.",
      ml: "എതിർ ഗതാഗതം ഒഴിവാക്കാൻ വലത്തേക്ക് തിരിയൽ വിലക്കിയിരിക്കുന്നു.",
    },
    example: { en: "Busy divided roads.", ml: "തിരക്കേറിയ വിഭജിത റോഡുകൾ." },
    svg: signPhoto("no-right-turn"),
  },
  {
    id: "no-stopping",
    category: "prohibitory",
    name: { en: "No Stopping", ml: "നിർത്തൽ നിരോധനം" },
    meaning: { en: "Stopping is prohibited", ml: "നിർത്തൽ നിരോധിച്ചിരിക്കുന്നു" },
    explanation: {
      en: "You may not stop at all, even to drop passengers.",
      ml: "യാത്രക്കാരെ ഇറക്കാൻ പോലും നിർത്താൻ പാടില്ല.",
    },
    example: { en: "Tunnels and bridges.", ml: "തുരങ്കങ്ങളും പാലങ്ങളും." },
    svg: signPhoto("no-stopping"),
  },
  {
    id: "no-standing",
    category: "prohibitory",
    name: { en: "No Standing", ml: "കാത്തുനിൽക്കൽ നിരോധനം" },
    meaning: { en: "Waiting with the vehicle is prohibited", ml: "വാഹനവുമായി കാത്തുനിൽക്കാൻ പാടില്ല" },
    explanation: {
      en: "Only immediate boarding or alighting is allowed.",
      ml: "ഉടനടി കയറ്റം/ഇറക്കം മാത്രം അനുവദനീയം.",
    },
    example: { en: "Bus stop areas.", ml: "ബസ് സ്റ്റോപ്പ് ഭാഗങ്ങൾ." },
    svg: signPhoto("no-standing"),
  },
  {
    id: "axle-load-limit",
    category: "prohibitory",
    name: { en: "Axle Load Limit", ml: "ആക്സിൽ ഭാരപരിധി" },
    meaning: { en: "Axle load above shown limit prohibited", ml: "കാണിച്ച ആക്സിൽ ഭാരത്തിന് മുകളിൽ വിലക്ക്" },
    explanation: {
      en: "Protects pavements and bridges from heavy axle loads.",
      ml: "കനത്ത ആക്സിൽ ഭാരത്തിൽ നിന്ന് റോഡും പാലവും സംരക്ഷിക്കുന്നു.",
    },
    example: { en: "Weak bridges.", ml: "ദുർബല പാലങ്ങൾ." },
    svg: signPhoto("axle-load-limit"),
  },
  {
    id: "length-limit",
    category: "prohibitory",
    name: { en: "Length Limit", ml: "നീളപരിധി" },
    meaning: { en: "Vehicles longer than shown prohibited", ml: "കാണിച്ച നീളത്തിന് മുകളിലുള്ള വാഹനങ്ങൾക്ക് വിലക്ക്" },
    explanation: {
      en: "Long vehicles cannot negotiate the road ahead.",
      ml: "നീളമുള്ള വാഹനങ്ങൾക്ക് മുന്നിലെ റോഡ് കടക്കാനാവില്ല.",
    },
    example: { en: "Sharp hairpin bends.", ml: "മൂർച്ചയേറിയ ഹെയർപിൻ വളവുകൾ." },
    svg: signPhoto("length-limit"),
  },
  {
    id: "no-vehicles-both-ways",
    category: "prohibitory",
    name: { en: "Vehicles Prohibited in Both Directions", ml: "ഇരുദിശയിലും വാഹനം നിരോധിതം" },
    meaning: { en: "No vehicle may pass in either direction", ml: "ഒരു ദിശയിലും വാഹനം കടക്കരുത്" },
    explanation: {
      en: "The road is closed to all vehicular traffic.",
      ml: "റോഡ് എല്ലാ വാഹന ഗതാഗതത്തിനും അടച്ചിരിക്കുന്നു.",
    },
    example: { en: "Closed roads and repair zones.", ml: "അടച്ച റോഡുകളും അറ്റകുറ്റപ്പണി മേഖലകളും." },
    svg: signPhoto("no-vehicles-both-ways"),
  },
  {
    id: "one-way-a",
    category: "prohibitory",
    name: { en: "No Entry from This Direction", ml: "ഈ ദിശയിൽ പ്രവേശനമില്ല" },
    meaning: { en: "Entry against the flow is prohibited", ml: "ഗതാഗത ദിശക്ക് എതിരെ പ്രവേശനം പാടില്ല" },
    explanation: {
      en: "Traffic may travel only in the permitted direction.",
      ml: "അനുവദനീയ ദിശയിൽ മാത്രം സഞ്ചരിക്കാം.",
    },
    example: { en: "One-way city streets.", ml: "ഏക-ദിശ നഗര റോഡുകൾ." },
    svg: signPhoto("one-way-a"),
  },
  {
    id: "one-way-b",
    category: "prohibitory",
    name: { en: "One Way Traffic Only", ml: "ഏക-ദിശ ഗതാഗതം മാത്രം" },
    meaning: { en: "Opposing movement is prohibited", ml: "എതിർദിശയിലെ സഞ്ചാരം നിരോധിതം" },
    explanation: {
      en: "Only one direction of travel is permitted here.",
      ml: "ഇവിടെ ഒരു ദിശയിലെ യാത്ര മാത്രം അനുവദനീയം.",
    },
    example: { en: "Narrow lanes.", ml: "ഇടുങ്ങിയ റോഡുകൾ." },
    svg: signPhoto("one-way-b"),
  },
  {
    id: "no-pedestrians",
    category: "prohibitory",
    name: { en: "Pedestrians Prohibited", ml: "കാൽനടക്കാർ നിരോധിതം" },
    meaning: { en: "Pedestrians may not use this road", ml: "കാൽനടക്കാർക്ക് ഈ റോഡ് ഉപയോഗിക്കാനാവില്ല" },
    explanation: {
      en: "Walkers must use the service road or footpath.",
      ml: "നടക്കുന്നവർ സർവീസ് റോഡ്/നടപ്പാത ഉപയോഗിക്കണം.",
    },
    example: { en: "Expressways and flyovers.", ml: "എക്സ്പ്രസ്‌വേകളും മേൽപ്പാലങ്ങളും." },
    svg: signPhoto("no-pedestrians"),
  },
  {
    id: "straight-prohibited",
    category: "prohibitory",
    name: { en: "Straight Ahead Prohibited", ml: "നേരെ പോകൽ നിരോധനം" },
    meaning: { en: "You must not proceed straight", ml: "നേരെ മുന്നോട്ട് പോകാൻ പാടില്ല" },
    explanation: {
      en: "Take a permitted left or right turn instead.",
      ml: "അനുവദനീയമായ ഇടത്/വലത് വഴി എടുക്കുക.",
    },
    example: { en: "T-junctions.", ml: "T-ജംഗ്ഷനുകൾ." },
    svg: signPhoto("straight-prohibited"),
  },
  {
    id: "overtaking-curve-prohibited",
    category: "prohibitory",
    name: { en: "Overtaking Prohibited (Curve)", ml: "വളവിൽ ഓവർടേക്കിങ് നിരോധനം" },
    meaning: { en: "No overtaking on the curve ahead", ml: "മുന്നിലെ വളവിൽ ഓവർടേക്ക് ചെയ്യരുത്" },
    explanation: {
      en: "Visibility is limited; stay in your lane.",
      ml: "കാഴ്ച പരിമിതമാണ്; സ്വന്തം ലെയിനിൽ തുടരുക.",
    },
    example: { en: "Hill roads.", ml: "മലയോര റോഡുകൾ." },
    svg: signPhoto("overtaking-curve-prohibited"),
  },
  {
    id: "no-parking-footpath",
    category: "prohibitory",
    name: { en: "No Parking on Footpath", ml: "നടപ്പാതയിൽ പാർക്കിങ് ഇല്ല" },
    meaning: { en: "Parking on the footpath is prohibited", ml: "നടപ്പാതയിൽ പാർക്ക് ചെയ്യരുത്" },
    explanation: {
      en: "Keep the footpath clear for pedestrians.",
      ml: "കാൽനടക്കാർക്കായി നടപ്പാത ഒഴിവാക്കി ഇടുക.",
    },
    example: { en: "Town centres.", ml: "ടൗൺ കേന്ദ്രങ്ങൾ." },
    svg: signPhoto("no-parking-footpath"),
  },
  {
    id: "no-parking-half-footpath",
    category: "prohibitory",
    name: { en: "No Parking Half on Footpath", ml: "പകുതി നടപ്പാതയിൽ പാർക്കിങ് ഇല്ല" },
    meaning: { en: "Partial footpath parking is prohibited", ml: "പകുതി നടപ്പാതയിൽ പാർക്കിങ് നിരോധിതം" },
    explanation: {
      en: "Do not park with wheels on the footpath.",
      ml: "ചക്രങ്ങൾ നടപ്പാതയിൽ കയറ്റി പാർക്ക് ചെയ്യരുത്.",
    },
    example: { en: "Shopping streets.", ml: "ഷോപ്പിങ് റോഡുകൾ." },
    svg: signPhoto("no-parking-half-footpath"),
  },
  {
    id: "stop-police",
    category: "prohibitory",
    name: { en: "Stop - Police", ml: "നിർത്തുക - പോലീസ്" },
    meaning: { en: "Stop for police checking", ml: "പോലീസ് പരിശോധനയ്ക്കായി നിർത്തുക" },
    explanation: {
      en: "Come to a complete halt and follow the officer's directions.",
      ml: "പൂർണ്ണമായി നിർത്തി ഉദ്യോഗസ്ഥന്റെ നിർദ്ദേശം പാലിക്കുക.",
    },
    example: { en: "Police check posts.", ml: "പോലീസ് ചെക്ക് പോസ്റ്റുകൾ." },
    svg: signPhoto("stop-police"),
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

const categoryWords = (category: SignCategory) =>
  category === "prohibitory" ? "regulatory, mandatory, safety" : category;

export const enrichedSign = (
  sign: Sign,
): Required<
  Pick<
    Sign,
    | "keywords"
    | "whereUsed"
    | "whyImportant"
    | "drivingTips"
    | "commonMistakes"
    | "keralaTestNote"
    | "memoryTrick"
    | "relatedSignIds"
    | "quiz"
  >
> => ({
  keywords: [sign.name.en, sign.meaning.en, categoryWords(sign.category), sign.example.en]
    .join(" ")
    .toLowerCase()
    .split(/[\s,/-]+/),
  whereUsed: sign.whereUsed ?? sign.example,
  whyImportant: sign.whyImportant ?? {
    en: `${sign.name.en} prevents confusion and helps drivers react early in Kerala's busy mixed traffic.`,
    ml: `${sign.name.ml} തിരക്കേറിയ കേരള റോഡുകളിൽ ഡ്രൈവർമാർ നേരത്തേ പ്രതികരിക്കാൻ സഹായിക്കുന്നു.`,
  },
  drivingTips: sign.drivingTips ?? {
    en: [
      sign.explanation.en,
      "Check mirrors, reduce speed early and obey the sign before you reach it.",
    ],
    ml: [
      sign.explanation.ml,
      "മിറർ പരിശോധിച്ച് വേഗത മുൻകൂട്ടി കുറച്ച് ചിഹ്നം എത്തും മുമ്പ് പാലിക്കുക.",
    ],
  },
  commonMistakes: sign.commonMistakes ?? {
    en: [
      "Not reducing speed early enough.",
      "Remembering the picture but forgetting the required driver action.",
    ],
    ml: ["വേഗത നേരത്തേ കുറയ്ക്കാത്തത്.", "ചിത്രം ഓർത്തിട്ടും ചെയ്യേണ്ട നടപടി മറക്കുന്നത്."],
  },
  keralaTestNote: sign.keralaTestNote ?? {
    en: `In the Kerala learner test, focus on the sign shape, colour and the exact meaning: ${sign.meaning.en}.`,
    ml: `കേരള ലേണർ ടെസ്റ്റിൽ രൂപം, നിറം, കൃത്യമായ അർത്ഥം ശ്രദ്ധിക്കുക: ${sign.meaning.ml}.`,
  },
  memoryTrick: sign.memoryTrick ?? {
    en: `${sign.category === "warning" ? "Triangle means think ahead" : sign.category === "informatory" ? "Blue board gives useful information" : sign.category === "mandatory" ? "Blue circle means must do" : "Red circle means restriction"}: ${sign.name.en}.`,
    ml: `${sign.category === "warning" ? "ത്രികോണം മുന്നറിയിപ്പ്" : sign.category === "informatory" ? "നീല ബോർഡ് വിവരം" : sign.category === "mandatory" ? "നീല വൃത്തം നിർബന്ധം" : "ചുവന്ന വൃത്തം നിയന്ത്രണം"}: ${sign.name.ml}.`,
  },
  relatedSignIds:
    sign.relatedSignIds ??
    SIGNS.filter((s) => s.id !== sign.id && s.category === sign.category)
      .slice(0, 3)
      .map((s) => s.id),
  quiz: sign.quiz ?? {
    question: {
      en: `What should you do when you see the ${sign.name.en} sign?`,
      ml: `${sign.name.ml} കണ്ടാൽ എന്ത് ചെയ്യണം?`,
    },
    options: {
      en: [
        sign.meaning.en,
        "Ignore it if the road is empty",
        "Increase speed",
        "Stop only at night",
      ],
      ml: [
        sign.meaning.ml,
        "റോഡ് ശൂന്യമെങ്കിൽ അവഗണിക്കുക",
        "വേഗത കൂട്ടുക",
        "രാത്രിയിൽ മാത്രം നിർത്തുക",
      ],
    },
    answer: 0,
    explanation: sign.explanation,
  },
});

export const getSign = (id: string) => SIGNS.find((s) => s.id === id);
export const getRelatedSigns = (sign: Sign) =>
  enrichedSign(sign)
    .relatedSignIds.map((id) => getSign(id))
    .filter(Boolean) as Sign[];
