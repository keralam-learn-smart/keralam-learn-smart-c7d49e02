export type SignalKind = "solid" | "arrow" | "pedestrian" | "flashing";

export type TrafficSignal = {
  id: string;
  kind: SignalKind;
  name: { en: string; ml: string };
  meaning: { en: string; ml: string };
  usage: { en: string; ml: string };
  learnerQ: { q: { en: string; ml: string }; a: { en: string; ml: string } };
  svg: string;
};

const box = (r: string, y: string, g: string, extra = "") => `
<svg viewBox="0 0 120 260" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="10" width="80" height="240" rx="14" fill="#1f1f1f"/>
  <circle cx="60" cy="55" r="24" fill="${r}"/>
  <circle cx="60" cy="130" r="24" fill="${y}"/>
  <circle cx="60" cy="205" r="24" fill="${g}"/>
  ${extra}
</svg>`;

const arrowBox = (dir: "left" | "right" | "up") => {
  const arrow =
    dir === "left"
      ? '<path d="M75 130 H45 M55 118 L45 130 L55 142" stroke="#0f0" stroke-width="6" fill="none" stroke-linecap="round"/>'
      : dir === "right"
        ? '<path d="M45 130 H75 M65 118 L75 130 L65 142" stroke="#0f0" stroke-width="6" fill="none" stroke-linecap="round"/>'
        : '<path d="M60 145 V115 M48 125 L60 113 L72 125" stroke="#0f0" stroke-width="6" fill="none" stroke-linecap="round"/>';
  return `
<svg viewBox="0 0 120 260" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="10" width="80" height="240" rx="14" fill="#1f1f1f"/>
  <circle cx="60" cy="55" r="24" fill="#3a3a3a"/>
  <circle cx="60" cy="130" r="24" fill="#062a06"/>
  ${arrow}
  <circle cx="60" cy="205" r="24" fill="#3a3a3a"/>
</svg>`;
};

const pedBox = (color: string, figure: "walk" | "stand") => `
<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="100" height="160" rx="12" fill="#1f1f1f"/>
  ${
    figure === "walk"
      ? `<g fill="${color}"><circle cx="60" cy="45" r="10"/><path d="M52 55 L 48 100 L 40 140 h8 l 6 -30 l 8 20 l 10 30 h8 l -12 -40 l -4 -30 l 12 -25 l -8 -8 z"/></g>`
      : `<g fill="${color}"><circle cx="60" cy="50" r="10"/><rect x="52" y="62" width="16" height="55" rx="4"/><rect x="52" y="117" width="7" height="35"/><rect x="61" y="117" width="7" height="35"/></g>`
  }
</svg>`;

export const SIGNALS: TrafficSignal[] = [
  {
    id: "red",
    kind: "solid",
    name: { en: "Red Signal — Stop", ml: "ചുവന്ന സിഗ്നൽ — നിർത്തുക" },
    meaning: {
      en: "Come to a complete halt behind the stop line.",
      ml: "സ്റ്റോപ്പ് ലൈനിന് പിന്നിൽ പൂർണ്ണമായി നിർത്തുക.",
    },
    usage: {
      en: "Every signalised junction across Kerala.",
      ml: "കേരളത്തിലെ എല്ലാ സിഗ്നൽ ജംഗ്ഷനുകളിലും.",
    },
    learnerQ: {
      q: {
        en: "Can you turn left on red in Kerala?",
        ml: "കേരളത്തിൽ ചുവപ്പിൽ ഇടത്തേക്ക് തിരിയാമോ?",
      },
      a: {
        en: "Only if a ‘Free Left’ sign is displayed. Otherwise you must stop.",
        ml: "‘Free Left’ അടയാളമുള്ളപ്പോൾ മാത്രം. ഇല്ലെങ്കിൽ നിർത്തണം.",
      },
    },
    svg: box("#ff2a2a", "#3a3a3a", "#3a3a3a"),
  },
  {
    id: "yellow",
    kind: "solid",
    name: { en: "Yellow Signal — Prepare to Stop", ml: "മഞ്ഞ സിഗ്നൽ — നിർത്താൻ തയ്യാറാകുക" },
    meaning: {
      en: "Stop before the line unless doing so is unsafe.",
      ml: "സുരക്ഷിതമല്ലാത്ത അവസ്ഥയിലല്ലാതെ ലൈനിന് മുൻപ് നിർത്തുക.",
    },
    usage: { en: "Transition between green and red.", ml: "പച്ചയ്ക്കും ചുവപ്പിനും ഇടയിൽ." },
    learnerQ: {
      q: {
        en: "Yellow just came on and you're at the line. What do you do?",
        ml: "മഞ്ഞ വന്നപ്പോൾ നിങ്ങൾ ലൈനിലാണ്. എന്ത് ചെയ്യും?",
      },
      a: {
        en: "Cross safely — hard braking may cause a rear collision.",
        ml: "സുരക്ഷിതമായി കടക്കുക — പെട്ടെന്നുള്ള ബ്രേക്ക് പിന്നിലുള്ള വാഹനത്തിന് ഇടിക്ക് കാരണമാകാം.",
      },
    },
    svg: box("#3a3a3a", "#ffd400", "#3a3a3a"),
  },
  {
    id: "green",
    kind: "solid",
    name: { en: "Green Signal — Go", ml: "പച്ച സിഗ്നൽ — പോകുക" },
    meaning: {
      en: "Proceed if the path is clear and your direction is permitted.",
      ml: "വഴി തെളിഞ്ഞെങ്കിൽ, ദിശ അനുവദനീയമെങ്കിൽ പോകുക.",
    },
    usage: {
      en: "Signals a permission — not a right of way over pedestrians.",
      ml: "അനുമതി മാത്രം — കാൽനടയാത്രക്കാർക്ക് മുകളിലുള്ള അവകാശം അല്ല.",
    },
    learnerQ: {
      q: { en: "Is green a right of way?", ml: "പച്ച എന്നത് പ്രഥമ അവകാശമാണോ?" },
      a: {
        en: "No. You must still yield to pedestrians and emergency vehicles.",
        ml: "അല്ല. കാൽനടയാത്രക്കാർക്കും അടിയന്തിര വാഹനങ്ങൾക്കും വഴി നൽകണം.",
      },
    },
    svg: box("#3a3a3a", "#3a3a3a", "#16c75a"),
  },
  {
    id: "arrow-left",
    kind: "arrow",
    name: { en: "Green Left Arrow", ml: "പച്ച ഇടത് അമ്പടയാളം" },
    meaning: {
      en: "You may turn left even if the main signal is red.",
      ml: "പ്രധാന സിഗ്നൽ ചുവപ്പാണെങ്കിലും ഇടത്തേക്ക് തിരിയാം.",
    },
    usage: { en: "Dedicated left filter lanes.", ml: "സമർപ്പിത ഇടത് ഫിൽട്ടർ ലെയ്നുകൾ." },
    learnerQ: {
      q: {
        en: "Only the left arrow is green. Can you go straight?",
        ml: "ഇടത് അമ്പടയാളം മാത്രം പച്ചയാണ്. നേരെ പോകാമോ?",
      },
      a: {
        en: "No — the arrow permits left turn only.",
        ml: "ഇല്ല — ഇടത് തിരിവിന് മാത്രം അനുമതി.",
      },
    },
    svg: arrowBox("left"),
  },
  {
    id: "arrow-right",
    kind: "arrow",
    name: { en: "Green Right Arrow", ml: "പച്ച വലത് അമ്പടയാളം" },
    meaning: {
      en: "You may turn right — oncoming traffic is held.",
      ml: "വലത്തേക്ക് തിരിയാം — എതിര വാഹനങ്ങൾ നിർത്തിയിരിക്കുന്നു.",
    },
    usage: { en: "Protected right-turn phase.", ml: "സംരക്ഷിത വലത് തിരിവ്." },
    learnerQ: {
      q: { en: "Must you still watch for pedestrians?", ml: "കാൽനടയാത്രക്കാരെ ശ്രദ്ധിക്കണോ?" },
      a: {
        en: "Yes — pedestrians always have priority in the crosswalk.",
        ml: "അതെ — സീബ്ര ക്രോസിംഗിൽ കാൽനടക്കാർക്ക് എപ്പോഴും മുൻഗണന.",
      },
    },
    svg: arrowBox("right"),
  },
  {
    id: "arrow-up",
    kind: "arrow",
    name: { en: "Green Straight Arrow", ml: "പച്ച നേര അമ്പടയാളം" },
    meaning: {
      en: "Proceed straight only. Turns are prohibited.",
      ml: "നേരെ മാത്രം പോകുക. തിരിവുകൾ പാടില്ല.",
    },
    usage: {
      en: "Multi-phase junctions with separate turn arrows.",
      ml: "പ്രത്യേക തിരിവ് അമ്പടയാളമുള്ള ബഹു-ഘട്ട ജംഗ്ഷനുകൾ.",
    },
    learnerQ: {
      q: {
        en: "Can you make a U-turn on a straight arrow?",
        ml: "നേര അമ്പടയാളത്തിൽ U-ടേൺ എടുക്കാമോ?",
      },
      a: {
        en: "No — U-turns require a right-turn phase or ‘U-turn allowed’ sign.",
        ml: "ഇല്ല — വലത് തിരിവ് ഘട്ടം അല്ലെങ്കിൽ ‘U-turn’ അടയാളം വേണം.",
      },
    },
    svg: arrowBox("up"),
  },
  {
    id: "ped-walk",
    kind: "pedestrian",
    name: { en: "Pedestrian — Walk", ml: "കാൽനടയാത്രക്കാർ — നടക്കുക" },
    meaning: { en: "Pedestrians may cross the road.", ml: "കാൽനടയാത്രക്കാർക്ക് റോഡ് കടക്കാം." },
    usage: {
      en: "Signal-controlled pedestrian crossings.",
      ml: "സിഗ്നൽ ക്രമീകരിച്ച കാൽനട ക്രോസിംഗുകൾ.",
    },
    learnerQ: {
      q: {
        en: "Drivers see red — pedestrians see walk. Who has priority?",
        ml: "ഡ്രൈവർക്ക് ചുവപ്പ്, കാൽനടയാത്രക്കാർക്ക് നടക്കുക. ആർക്ക് മുൻഗണന?",
      },
      a: {
        en: "Pedestrians. Vehicles must remain stopped until the crossing clears.",
        ml: "കാൽനടയാത്രക്കാർ. ക്രോസിംഗ് കാലിയാകുന്നതുവരെ വാഹനങ്ങൾ നിർത്തണം.",
      },
    },
    svg: pedBox("#16c75a", "walk"),
  },
  {
    id: "ped-stand",
    kind: "pedestrian",
    name: { en: "Pedestrian — Wait", ml: "കാൽനടയാത്രക്കാർ — കാത്തിരിക്കുക" },
    meaning: {
      en: "Pedestrians must not start crossing.",
      ml: "കാൽനടയാത്രക്കാർ റോഡ് കടക്കാൻ തുടങ്ങരുത്.",
    },
    usage: {
      en: "Vehicles are moving through the junction.",
      ml: "വാഹനങ്ങൾ ജംഗ്ഷനിലൂടെ പോകുന്നു.",
    },
    learnerQ: {
      q: { en: "Can pedestrians already midway continue?", ml: "പകുതി കടന്നവർക്ക് തുടരാമോ?" },
      a: {
        en: "Yes — drivers must let them finish crossing safely.",
        ml: "അതെ — അവർ സുരക്ഷിതമായി കടക്കാൻ ഡ്രൈവർ അനുവദിക്കണം.",
      },
    },
    svg: pedBox("#ff2a2a", "stand"),
  },
  {
    id: "flash-yellow",
    kind: "flashing",
    name: { en: "Flashing Yellow — Caution", ml: "മിന്നുന്ന മഞ്ഞ — ജാഗ്രത" },
    meaning: {
      en: "Slow down, proceed with caution — no need to stop.",
      ml: "വേഗത കുറയ്ക്കുക, ജാഗ്രതയോടെ പോകുക — നിർത്തേണ്ട.",
    },
    usage: { en: "Off-peak hours or low-traffic junctions.", ml: "കുറഞ്ഞ ഗതാഗതം ഉള്ള സമയങ്ങളിൽ." },
    learnerQ: {
      q: {
        en: "Do you have right of way over cross traffic on flashing yellow?",
        ml: "മിന്നുന്ന മഞ്ഞയിൽ കുറുകെ വാഹനത്തിന് മേലെ അവകാശം ഉണ്ടോ?",
      },
      a: {
        en: "You have priority but must still yield to any conflicting vehicle already in the intersection.",
        ml: "മുൻഗണനയുണ്ട്, പക്ഷേ ജംഗ്ഷനിൽ ഇതിനകം ഉള്ള വാഹനത്തിന് വഴി നൽകണം.",
      },
    },
    svg: box(
      "#3a3a3a",
      "#ffd400",
      "#3a3a3a",
      '<circle cx="60" cy="130" r="30" fill="none" stroke="#ffd400" stroke-width="3" opacity="0.5"/>',
    ),
  },
  {
    id: "flash-red",
    kind: "flashing",
    name: { en: "Flashing Red — Stop", ml: "മിന്നുന്ന ചുവപ്പ് — നിർത്തുക" },
    meaning: {
      en: "Treat exactly like a STOP sign — halt, then proceed if safe.",
      ml: "STOP അടയാളമായി കണക്കാക്കുക — നിർത്തി, സുരക്ഷിതമെങ്കിൽ പോകുക.",
    },
    usage: { en: "Railway crossings, damaged signals.", ml: "റെയിൽവേ ക്രോസിംഗ്, തകരാർ സിഗ്നൽ." },
    learnerQ: {
      q: {
        en: "May you roll through if the road is clear?",
        ml: "റോഡ് കാലിയാണെങ്കിൽ നിർത്താതെ പോകാമോ?",
      },
      a: { en: "No — a full stop is mandatory.", ml: "ഇല്ല — പൂർണ്ണ നിർത്തൽ നിർബന്ധം." },
    },
    svg: box(
      "#ff2a2a",
      "#3a3a3a",
      "#3a3a3a",
      '<circle cx="60" cy="55" r="30" fill="none" stroke="#ff2a2a" stroke-width="3" opacity="0.5"/>',
    ),
  },
];

export const SIGNAL_GROUP: { kind: SignalKind; en: string; ml: string }[] = [
  { kind: "solid", en: "Solid Signals", ml: "സ്ഥിര സിഗ്നലുകൾ" },
  { kind: "arrow", en: "Arrow Signals", ml: "അമ്പടയാള സിഗ്നലുകൾ" },
  { kind: "pedestrian", en: "Pedestrian Signals", ml: "കാൽനട സിഗ്നലുകൾ" },
  { kind: "flashing", en: "Flashing Signals", ml: "മിന്നുന്ന സിഗ്നലുകൾ" },
];
