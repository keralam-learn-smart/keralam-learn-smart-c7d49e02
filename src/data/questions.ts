import { SIGNS } from "./signs";

export type Question = {
  id: string;
  category: string; // category slug
  signId?: string; // optional reference to a sign for image display
  question: { en: string; ml: string };
  options: { en: string; ml: string }[]; // length 4
  correct: number; // 0-3
  explanation: { en: string; ml: string };
};

// Helper to build a sign-based question
const sq = (
  id: string,
  signId: string,
  qEn: string,
  qMl: string,
  opts: [string, string][],
  correct: number,
  expEn: string,
  expMl: string,
): Question => ({
  id,
  category: "traffic-signs",
  signId,
  question: { en: qEn, ml: qMl },
  options: opts.map(([en, ml]) => ({ en, ml })),
  correct,
  explanation: { en: expEn, ml: expMl },
});

export const QUESTIONS: Question[] = [
  // --- TRAFFIC SIGNS (sign images displayed) ---
  sq("q-sign-1", "no-entry", "What does this sign mean?", "ഈ അടയാളത്തിന്റെ അർത്ഥം എന്താണ്?",
    [["No Entry", "പ്രവേശനം ഇല്ല"], ["No Parking", "പാർക്കിങ് ഇല്ല"], ["No Horn", "ഹോൺ ഇല്ല"], ["Stop", "നിർത്തുക"]],
    0, "Red circle with white bar = No Entry for all vehicles.", "വെളുത്ത വരയുള്ള ചുവന്ന വൃത്തം = പ്രവേശനം നിരോധനം."),
  sq("q-sign-2", "no-parking", "This sign indicates:", "ഈ അടയാളം സൂചിപ്പിക്കുന്നത്:",
    [["No Stopping", "നിർത്തരുത്"], ["No Parking", "പാർക്കിങ് നിരോധനം"], ["Parking", "പാർക്കിങ്"], ["Tow zone", "ടോ സോൺ"]],
    1, "Crossed-out P inside a red circle = parking prohibited.", "ക്രോസ്ഡ് P = പാർക്കിങ് നിരോധനം."),
  sq("q-sign-3", "speed-limit-50", "This sign means:", "ഈ അടയാളത്തിന്റെ അർത്ഥം:",
    [["Minimum speed 50", "ഏറ്റവും കുറഞ്ഞ വേഗത 50"], ["Maximum speed 50 km/h", "പരമാവധി വേഗത 50 km/h"], ["Distance 50 km", "ദൂരം 50 km"], ["Speed breaker in 50 m", "50m ൽ സ്പീഡ് ബ്രേക്കർ"]],
    1, "Red-bordered numeric sign sets a maximum speed limit.", "ചുവന്ന അരികുള്ള സംഖ്യ പരമാവധി വേഗപരിധി സൂചിപ്പിക്കുന്നു."),
  sq("q-sign-4", "pedestrian-crossing", "Approaching this sign you must:", "ഈ അടയാളം കണ്ടാൽ:",
    [["Speed up", "വേഗത വർദ്ധിപ്പിക്കുക"], ["Honk continuously", "തുടർച്ചയായി ഹോൺ"], ["Slow down and give priority to pedestrians", "വേഗത കുറയ്ക്കുക, കാൽനടക്കാർക്ക് മുൻഗണന"], ["Stop completely", "പൂർണ്ണമായും നിർത്തുക"]],
    2, "Warning sign: pedestrians may cross — yield to them.", "മുന്നറിയിപ്പ്: കാൽനടക്കാർക്ക് മുൻഗണന നൽകുക."),
  sq("q-sign-5", "school-ahead", "This sign warns of:", "ഈ അടയാളം മുന്നറിയിപ്പ് നൽകുന്നത്:",
    [["Hospital", "ആശുപത്രി"], ["School zone", "സ്കൂൾ മേഖല"], ["Playground", "കളിസ്ഥലം"], ["Park", "പാർക്ക്"]],
    1, "Indicates a school nearby. Drive very slowly.", "സ്കൂൾ സമീപം. വളരെ പതുക്കെ ഓടിക്കുക."),
  sq("q-sign-6", "no-overtaking", "This sign means:", "ഈ അടയാളത്തിന്റെ അർത്ഥം:",
    [["Overtaking allowed", "ഓവർടേക്കിങ് അനുവദനീയം"], ["Overtaking prohibited", "ഓവർടേക്കിങ് നിരോധനം"], ["Two-way traffic", "ഇരുവശ ഗതാഗതം"], ["Narrow road", "ഇടുങ്ങിയ റോഡ്"]],
    1, "Two cars (red ahead) inside red circle = no overtaking.", "ഓവർടേക്കിങ് നിരോധനം."),
  sq("q-sign-7", "no-u-turn", "This sign means:", "ഈ അടയാളത്തിന്റെ അർത്ഥം:",
    [["U-turn allowed", "U-ടേൺ അനുവദനീയം"], ["U-turn prohibited", "U-ടേൺ നിരോധനം"], ["Right turn only", "വലത് തിരിവ് മാത്രം"], ["Roundabout", "റൗണ്ടെബൗട്ട്"]],
    1, "Red diagonal line over a U-turn arrow = U-turn forbidden.", "U-ടേൺ പാടില്ല."),
  sq("q-sign-8", "horn", "This blue circular sign indicates:", "ഈ നീല വൃത്താകൃതിയിലെ അടയാളം:",
    [["No Horn", "ഹോൺ നിരോധനം"], ["Sound horn compulsory", "ഹോൺ നിർബന്ധം"], ["Quiet zone", "ശാന്ത മേഖല"], ["School zone", "സ്കൂൾ മേഖല"]],
    1, "Blue mandatory sign — you must sound your horn.", "നീല നിർബന്ധിത അടയാളം — ഹോൺ മുഴക്കണം."),
  sq("q-sign-9", "speed-breaker", "This sign warns of:", "മുന്നറിയിപ്പ്:",
    [["Bumpy road", "ബമ്പി റോഡ്"], ["Speed breaker (hump)", "സ്പീഡ് ബ്രേക്കർ"], ["Hill ahead", "മല"], ["Bridge", "പാലം"]],
    1, "Slow to below 20 km/h before crossing the hump.", "കടക്കും മുമ്പ് 20 km/h ന് താഴെ വേഗത കുറയ്ക്കുക."),
  sq("q-sign-10", "slippery-road", "This sign warns of:", "മുന്നറിയിപ്പ്:",
    [["Wet paint", "നനഞ്ഞ പെയിന്റ്"], ["Slippery road", "വഴുവഴുപ്പുള്ള റോഡ്"], ["Loose gravel", "അയഞ്ഞ കല്ലുകൾ"], ["Construction", "നിർമ്മാണം"]],
    1, "Wavy lines = slippery surface. Avoid sudden braking.", "വളഞ്ഞ വരകൾ = വഴുവഴുപ്പുള്ള ഉപരിതലം."),
  sq("q-sign-11", "narrow-road", "This sign means:", "അർത്ഥം:",
    [["Road narrows ahead", "റോഡ് ഇടുങ്ങുന്നു"], ["Wide road ahead", "വീതിയേറിയ റോഡ്"], ["Junction", "ജംഗ്ഷൻ"], ["Bridge", "പാലം"]],
    0, "Be ready to give way to oncoming vehicles.", "എതിരെ വാഹനങ്ങൾക്ക് വഴി നൽകുക."),
  sq("q-sign-12", "cross-road", "This sign indicates:", "സൂചിപ്പിക്കുന്നത്:",
    [["Hospital", "ആശുപത്രി"], ["First aid", "പ്രഥമ ശുശ്രൂഷ"], ["Cross road ahead", "ക്രോസ് റോഡ്"], ["No entry", "പ്രവേശനം ഇല്ല"]],
    2, "Four-way intersection — slow down and check all directions.", "നാല്-വശ ജംഗ്ഷൻ."),
  sq("q-sign-13", "hospital", "This blue informatory sign means:", "ഈ നീല വിവര അടയാളം:",
    [["First aid", "പ്രഥമ ശുശ്രൂഷ"], ["Hospital", "ആശുപത്രി"], ["Pharmacy", "മരുന്നുകട"], ["Doctor", "ഡോക്ടർ"]],
    1, "Indicates a hospital nearby. Drive silently.", "ആശുപത്രി — ശാന്തമായി ഓടിക്കുക."),
  sq("q-sign-14", "petrol-pump", "This sign indicates:", "സൂചിപ്പിക്കുന്നത്:",
    [["Service centre", "സർവീസ് കേന്ദ്രം"], ["Petrol pump", "പെട്രോൾ പമ്പ്"], ["Repair shop", "റിപ്പയർ ഷോപ്പ്"], ["Toll plaza", "ടോൾ"]],
    1, "Fuel station nearby.", "ഇന്ധന സ്റ്റേഷൻ സമീപം."),
  sq("q-sign-15", "first-aid-post", "Red cross on white background indicates:", "വെള്ളയിൽ ചുവന്ന ക്രോസ്:",
    [["Church", "പള്ളി"], ["First aid post", "പ്രഥമ ശുശ്രൂഷ കേന്ദ്രം"], ["Hospital only", "ആശുപത്രി മാത്രം"], ["Pharmacy", "മരുന്നുകട"]],
    1, "Emergency first aid is available.", "അടിയന്തിര പ്രഥമ ശുശ്രൂഷ ലഭ്യം."),
  sq("q-sign-16", "right-hand-curve", "This sign warns of:", "മുന്നറിയിപ്പ്:",
    [["Left curve", "ഇടത് വളവ്"], ["Right curve", "വലത് വളവ്"], ["Hairpin bend", "ഹെയർപിൻ"], ["U-turn", "U-ടേൺ"]],
    1, "Reduce speed before the right hand curve.", "വലത് വളവിന് മുമ്പ് വേഗത കുറയ്ക്കുക."),
  sq("q-sign-17", "turn-left", "This mandatory sign means:", "നിർബന്ധിത അടയാളം:",
    [["Turn left ahead", "ഇടത്തേക്ക് തിരിയുക"], ["Keep left", "ഇടത് വശം ചേർന്ന്"], ["Left curve", "ഇടത് വളവ്"], ["Left lane closed", "ഇടത് ലെയ്ൻ അടച്ചു"]],
    0, "All vehicles must turn left.", "എല്ലാ വാഹനങ്ങളും ഇടത്തേക്ക് തിരിയണം."),
  sq("q-sign-18", "go-straight", "This sign means:", "അർത്ഥം:",
    [["No entry", "പ്രവേശനം ഇല്ല"], ["Go straight only", "നേരെ മാത്രം"], ["One way", "ഒരു വശം"], ["Dead end", "അവസാനം"]],
    1, "Proceed straight — turning is not allowed here.", "നേരെ പോകുക, തിരിയാൻ പാടില്ല."),
  sq("q-sign-19", "parking", "This blue 'P' sign means:", "ഈ നീല 'P':",
    [["No parking", "പാർക്കിങ് ഇല്ല"], ["Parking allowed", "പാർക്കിങ് അനുവദനീയം"], ["Pedestrians only", "കാൽനടക്കാർ മാത്രം"], ["Police station", "പോലീസ് സ്റ്റേഷൻ"]],
    1, "Designated parking area.", "നിശ്ചയിച്ച പാർക്കിങ് മേഖല."),
  sq("q-sign-20", "signal-red", "What should you do at a red signal?", "ചുവന്ന സിഗ്നൽ കണ്ടാൽ:",
    [["Slow down and proceed", "വേഗത കുറച്ച് പോകുക"], ["Stop at the stop line", "സ്റ്റോപ് ലൈനിൽ നിർത്തുക"], ["Honk and cross", "ഹോൺ മുഴക്കി കടക്കുക"], ["Turn left freely", "ഇടത് സ്വതന്ത്രമായി തിരിയുക"]],
    1, "Red = full stop at the stop line. Crossing red is a serious offence.", "ചുവപ്പ് = പൂർണ്ണ നിർത്തൽ."),
  sq("q-sign-21", "signal-yellow", "Yellow signal means:", "മഞ്ഞ സിഗ്നൽ:",
    [["Go faster", "വേഗത വർദ്ധിപ്പിക്കുക"], ["Prepare to stop", "നിർത്താൻ തയ്യാറാകുക"], ["Turn only", "തിരിയാൻ മാത്രം"], ["Stop only if leaving", "പുറത്തു പോകുമ്പോൾ മാത്രം നിർത്തുക"]],
    1, "Stop before the line unless you cannot do so safely.", "സുരക്ഷിതമല്ലെങ്കിലല്ലാതെ നിർത്തുക."),
  sq("q-sign-22", "signal-green", "At a green signal you should:", "പച്ച സിഗ്നൽ:",
    [["Always go fast", "എപ്പോഴും വേഗത്തിൽ പോകുക"], ["Proceed if the way is clear", "വഴി തെളിഞ്ഞെങ്കിൽ പോകുക"], ["Stop and wait", "നിർത്തി കാത്തിരിക്കുക"], ["Honk continuously", "തുടർച്ചയായി ഹോൺ"]],
    1, "Proceed only if your path is clear of other vehicles and pedestrians.", "വഴി തെളിഞ്ഞെങ്കിൽ മാത്രം പോകുക."),

  // --- TRAFFIC SIGNALS (extra) ---
  {
    id: "q-signal-1",
    category: "traffic-signals",
    question: { en: "A flashing red light means:", ml: "മിന്നുന്ന ചുവന്ന വെളിച്ചം:" },
    options: [
      { en: "Slow down", ml: "വേഗത കുറയ്ക്കുക" },
      { en: "Stop completely, then proceed when safe", ml: "പൂർണ്ണമായും നിർത്തുക, സുരക്ഷിതമെങ്കിൽ പോകുക" },
      { en: "Signal broken — ignore", ml: "സിഗ്നൽ കേടാണ് — അവഗണിക്കുക" },
      { en: "Emergency vehicle ahead", ml: "എമർജൻസി വാഹനം" },
    ],
    correct: 1,
    explanation: { en: "Treat flashing red exactly like a STOP sign.", ml: "മിന്നുന്ന ചുവപ്പ് STOP അടയാളം പോലെ കണക്കാക്കുക." },
  },
  {
    id: "q-signal-2",
    category: "traffic-signals",
    question: { en: "A flashing yellow light means:", ml: "മിന്നുന്ന മഞ്ഞ:" },
    options: [
      { en: "Stop immediately", ml: "ഉടനെ നിർത്തുക" },
      { en: "Speed up to cross", ml: "വേഗത്തിൽ കടക്കുക" },
      { en: "Slow down and proceed with caution", ml: "വേഗത കുറയ്ക്കുക, ശ്രദ്ധയോടെ പോകുക" },
      { en: "Park here", ml: "ഇവിടെ പാർക്ക് ചെയ്യുക" },
    ],
    correct: 2,
    explanation: { en: "Flashing yellow = caution, slow down but do not stop.", ml: "ശ്രദ്ധിക്കുക, വേഗത കുറയ്ക്കുക." },
  },
  {
    id: "q-signal-3",
    category: "traffic-signals",
    question: { en: "Pedestrian signal showing red means:", ml: "കാൽനട സിഗ്നൽ ചുവപ്പ്:" },
    options: [
      { en: "Pedestrians may cross", ml: "കാൽനടക്കാർക്ക് കടക്കാം" },
      { en: "Pedestrians must not cross", ml: "കാൽനടക്കാർ കടക്കരുത്" },
      { en: "Only run across", ml: "ഓടി കടക്കുക" },
      { en: "Vehicles must stop", ml: "വാഹനങ്ങൾ നിർത്തണം" },
    ],
    correct: 1,
    explanation: { en: "Red pedestrian signal = do not enter the crossing.", ml: "ചുവന്ന കാൽനട സിഗ്നൽ = കടക്കരുത്." },
  },

  // --- ROAD RULES ---
  {
    id: "q-rules-1",
    category: "road-rules",
    question: { en: "On a two-way road, you should drive on the:", ml: "ഇരുവശ പാതയിൽ ഓടിക്കേണ്ടത്:" },
    options: [
      { en: "Centre of the road", ml: "നടുവിൽ" },
      { en: "Left side", ml: "ഇടത് വശം" },
      { en: "Right side", ml: "വലത് വശം" },
      { en: "Either side", ml: "ഏത് വശവും" },
    ],
    correct: 1,
    explanation: { en: "In India, always drive on the left.", ml: "ഇന്ത്യയിൽ എപ്പോഴും ഇടത് വശത്തുകൂടി." },
  },
  {
    id: "q-rules-2",
    category: "road-rules",
    question: { en: "You should overtake another vehicle from the:", ml: "ഓവർടേക്ക് ചെയ്യേണ്ടത്:" },
    options: [
      { en: "Left side", ml: "ഇടത് വശം" },
      { en: "Right side", ml: "വലത് വശം" },
      { en: "Either side", ml: "ഏത് വശവും" },
      { en: "After honking thrice", ml: "മൂന്ന് വട്ടം ഹോൺ മുഴക്കിയ ശേഷം" },
    ],
    correct: 1,
    explanation: { en: "Overtake from the right unless the vehicle ahead is turning right.", ml: "മുന്നിലുള്ള വാഹനം വലത്തേക്ക് തിരിയുന്നില്ലെങ്കിൽ വലത് വശത്തുകൂടി ഓവർടേക്ക് ചെയ്യുക." },
  },
  {
    id: "q-rules-3",
    category: "road-rules",
    question: { en: "At an unmarked intersection, you should give way to:", ml: "അടയാളമില്ലാത്ത ജംഗ്ഷനിൽ വഴി നൽകേണ്ടത്:" },
    options: [
      { en: "Vehicle on your left", ml: "ഇടത് വശത്തെ വാഹനത്തിന്" },
      { en: "Vehicle on your right", ml: "വലത് വശത്തെ വാഹനത്തിന്" },
      { en: "Larger vehicle", ml: "വലിയ വാഹനത്തിന്" },
      { en: "Newer vehicle", ml: "പുതിയ വാഹനത്തിന്" },
    ],
    correct: 1,
    explanation: { en: "Rule of priority: give way to traffic coming from your right.", ml: "വലത് വശത്തുനിന്ന് വരുന്ന വാഹനത്തിന് മുൻഗണന." },
  },
  {
    id: "q-rules-4",
    category: "road-rules",
    question: { en: "Safe following distance behind a vehicle is at least:", ml: "സുരക്ഷിത പിന്തുടരൽ ദൂരം:" },
    options: [
      { en: "1 second", ml: "1 സെക്കൻഡ്" },
      { en: "2 seconds", ml: "2 സെക്കൻഡ്" },
      { en: "Half a second", ml: "അര സെക്കൻഡ്" },
      { en: "10 metres flat", ml: "10 മീറ്റർ" },
    ],
    correct: 1,
    explanation: { en: "2-second rule in dry conditions (4 seconds in rain).", ml: "2 സെക്കൻഡ് നിയമം (മഴയിൽ 4)." },
  },
  {
    id: "q-rules-5",
    category: "road-rules",
    question: { en: "You see an ambulance with siren behind you. You should:", ml: "സൈറൻ വരുന്ന ആംബുലൻസ് കണ്ടാൽ:" },
    options: [
      { en: "Speed up", ml: "വേഗത വർദ്ധിപ്പിക്കുക" },
      { en: "Move left and give way", ml: "ഇടത്തേക്ക് മാറി വഴി നൽകുക" },
      { en: "Block its path", ml: "വഴി തടയുക" },
      { en: "Stop in the centre", ml: "നടുവിൽ നിർത്തുക" },
    ],
    correct: 1,
    explanation: { en: "Emergency vehicles always have right of way.", ml: "എമർജൻസി വാഹനങ്ങൾക്ക് എപ്പോഴും മുൻഗണന." },
  },

  // --- ROAD MARKINGS ---
  {
    id: "q-mark-1",
    category: "road-markings",
    question: { en: "A solid white line in the centre of the road means:", ml: "നടുവിൽ തുടർച്ചയായ വെള്ള വര:" },
    options: [
      { en: "Overtaking allowed", ml: "ഓവർടേക്ക് അനുവദനീയം" },
      { en: "Do not cross or overtake", ml: "കടക്കരുത്, ഓവർടേക്ക് ചെയ്യരുത്" },
      { en: "Slow down zone", ml: "വേഗത കുറയ്ക്കുക" },
      { en: "Parking line", ml: "പാർക്കിങ് വര" },
    ],
    correct: 1,
    explanation: { en: "Solid line = stay in your lane, no overtaking.", ml: "തുടർച്ചയായ വര = ലെയ്നിൽ തുടരുക, ഓവർടേക്ക് പാടില്ല." },
  },
  {
    id: "q-mark-2",
    category: "road-markings",
    question: { en: "A broken white line means:", ml: "പൊട്ടിയ വെള്ള വര:" },
    options: [
      { en: "Stop here", ml: "ഇവിടെ നിർത്തുക" },
      { en: "Overtaking allowed when safe", ml: "സുരക്ഷിതമെങ്കിൽ ഓവർടേക്ക്" },
      { en: "School zone", ml: "സ്കൂൾ" },
      { en: "No entry", ml: "പ്രവേശനം ഇല്ല" },
    ],
    correct: 1,
    explanation: { en: "You may change lanes / overtake if safe.", ml: "സുരക്ഷിതമെങ്കിൽ ഓവർടേക്ക് ചെയ്യാം." },
  },
  {
    id: "q-mark-3",
    category: "road-markings",
    question: { en: "Zebra crossing on the road indicates:", ml: "സീബ്ര ക്രോസിങ്:" },
    options: [
      { en: "Pedestrian crossing — yield", ml: "കാൽനട ക്രോസിങ് — വഴി നൽകുക" },
      { en: "Speed limit", ml: "വേഗപരിധി" },
      { en: "Truck zone", ml: "ട്രക്ക് മേഖല" },
      { en: "School entrance", ml: "സ്കൂൾ പ്രവേശനം" },
    ],
    correct: 0,
    explanation: { en: "Pedestrians have priority at zebra crossings.", ml: "സീബ്ര ക്രോസിങ്ങിൽ കാൽനടക്കാർക്ക് മുൻഗണന." },
  },

  // --- LEARNER LICENCE ---
  {
    id: "q-ll-1",
    category: "learner-licence",
    question: { en: "Minimum age for a learner licence for a light motor vehicle (private) is:", ml: "സ്വകാര്യ LMV ലേണർ ലൈസൻസിന് ഏറ്റവും കുറഞ്ഞ പ്രായം:" },
    options: [
      { en: "16 years", ml: "16 വയസ്സ്" },
      { en: "18 years", ml: "18 വയസ്സ്" },
      { en: "20 years", ml: "20 വയസ്സ്" },
      { en: "21 years", ml: "21 വയസ്സ്" },
    ],
    correct: 1,
    explanation: { en: "18 years for a private LMV / car / motorcycle with gear.", ml: "സ്വകാര്യ LMV / ഗിയറുള്ള മോട്ടോർസൈക്കിളിന് 18." },
  },
  {
    id: "q-ll-2",
    category: "learner-licence",
    question: { en: "A learner licence is valid for:", ml: "ലേണർ ലൈസൻസിന്റെ സാധുത:" },
    options: [
      { en: "1 month", ml: "1 മാസം" },
      { en: "3 months", ml: "3 മാസം" },
      { en: "6 months", ml: "6 മാസം" },
      { en: "1 year", ml: "1 വർഷം" },
    ],
    correct: 2,
    explanation: { en: "LL is valid for 6 months from issue.", ml: "നൽകിയ തീയതി മുതൽ 6 മാസം സാധുത." },
  },
  {
    id: "q-ll-3",
    category: "learner-licence",
    question: { en: "A learner driver must:", ml: "ലേണർ ഡ്രൈവർ ചെയ്യേണ്ടത്:" },
    options: [
      { en: "Display an 'L' plate", ml: "'L' ബോർഡ് പ്രദർശിപ്പിക്കണം" },
      { en: "Drive only at night", ml: "രാത്രി മാത്രം ഓടിക്കണം" },
      { en: "Carry no passengers ever", ml: "ഒരിക്കലും യാത്രക്കാരെ കയറ്റരുത്" },
      { en: "Drive only on highways", ml: "ഹൈവേയിൽ മാത്രം ഓടിക്കണം" },
    ],
    correct: 0,
    explanation: { en: "'L' plate is mandatory and a licensed driver must accompany.", ml: "'L' ബോർഡ് നിർബന്ധം; ലൈസൻസുള്ള ഡ്രൈവർ കൂടെ വേണം." },
  },
  {
    id: "q-ll-4",
    category: "learner-licence",
    question: { en: "Earliest you can apply for permanent licence after getting LL:", ml: "LL ലഭിച്ച ശേഷം പെർമനന്റ് ലൈസൻസിന് അപേക്ഷിക്കാവുന്ന ഏറ്റവും നേരത്തെ:" },
    options: [
      { en: "7 days", ml: "7 ദിവസം" },
      { en: "30 days", ml: "30 ദിവസം" },
      { en: "60 days", ml: "60 ദിവസം" },
      { en: "Immediately", ml: "ഉടനെ" },
    ],
    correct: 1,
    explanation: { en: "Minimum 30 days, within the 6-month LL validity.", ml: "ചുരുങ്ങിയത് 30 ദിവസം, 6 മാസ സാധുതയ്ക്കുള്ളിൽ." },
  },

  // --- VEHICLE DOCUMENTS ---
  {
    id: "q-doc-1",
    category: "vehicle-documents",
    question: { en: "Which document is NOT mandatory to carry while driving?", ml: "വാഹനമോടിക്കുമ്പോൾ കരുതേണ്ടത് അല്ലാത്തത്:" },
    options: [
      { en: "RC", ml: "RC" },
      { en: "Insurance", ml: "ഇൻഷുറൻസ്" },
      { en: "Aadhaar card", ml: "ആധാർ കാർഡ്" },
      { en: "Driving Licence", ml: "ഡ്രൈവിങ് ലൈസൻസ്" },
    ],
    correct: 2,
    explanation: { en: "Aadhaar is not mandatory while driving; DL, RC, Insurance, PUC are.", ml: "ആധാർ വാഹനത്തിൽ കരുതേണ്ടതില്ല; DL, RC, ഇൻഷുറൻസ്, PUC നിർബന്ധം." },
  },
  {
    id: "q-doc-2",
    category: "vehicle-documents",
    question: { en: "PUC certificate validity for petrol cars is usually:", ml: "പെട്രോൾ കാറിന്റെ PUC സാധുത:" },
    options: [
      { en: "1 month", ml: "1 മാസം" },
      { en: "6 months", ml: "6 മാസം" },
      { en: "1 year", ml: "1 വർഷം" },
      { en: "2 years", ml: "2 വർഷം" },
    ],
    correct: 1,
    explanation: { en: "Standard PUC is valid for 6 months.", ml: "സാധാരണ PUC 6 മാസം സാധുവാണ്." },
  },
  {
    id: "q-doc-3",
    category: "vehicle-documents",
    question: { en: "Digital DL on mParivahan or DigiLocker is:", ml: "mParivahan / DigiLocker ലെ ഡിജിറ്റൽ DL:" },
    options: [
      { en: "Not valid", ml: "സാധുവല്ല" },
      { en: "Valid only on highways", ml: "ഹൈവേയിൽ മാത്രം" },
      { en: "Legally valid like physical DL", ml: "ഫിസിക്കൽ DL പോലെ നിയമപരമായി സാധു" },
      { en: "Valid only for two-wheelers", ml: "ടു-വീലറിന് മാത്രം" },
    ],
    correct: 2,
    explanation: { en: "Digital copies on mParivahan/DigiLocker are legally valid.", ml: "mParivahan/DigiLocker ഡിജിറ്റൽ പകർപ്പുകൾ നിയമപരമായി സാധുവാണ്." },
  },

  // --- INSURANCE ---
  {
    id: "q-ins-1",
    category: "insurance",
    question: { en: "Which type of motor insurance is mandatory by law?", ml: "നിയമപരമായി നിർബന്ധിത ഇൻഷുറൻസ്:" },
    options: [
      { en: "Comprehensive", ml: "കോംപ്രിഹെൻസീവ്" },
      { en: "Third-party", ml: "തേർഡ് പാർട്ടി" },
      { en: "Zero depreciation", ml: "സീറോ ഡിപ്രീസിയേഷൻ" },
      { en: "Personal accident only", ml: "വ്യക്തിഗത അപകട മാത്രം" },
    ],
    correct: 1,
    explanation: { en: "Third-party insurance is mandatory under the Motor Vehicles Act.", ml: "മോട്ടോർ വാഹന നിയമപ്രകാരം തേർഡ് പാർട്ടി നിർബന്ധം." },
  },
  {
    id: "q-ins-2",
    category: "insurance",
    question: { en: "Penalty for driving without insurance (first offence):", ml: "ഇൻഷുറൻസ് ഇല്ലാതെ ഓടിച്ചാൽ (ആദ്യ കുറ്റം):" },
    options: [
      { en: "₹500", ml: "₹500" },
      { en: "₹2,000", ml: "₹2,000" },
      { en: "₹5,000", ml: "₹5,000" },
      { en: "No penalty", ml: "ശിക്ഷ ഇല്ല" },
    ],
    correct: 1,
    explanation: { en: "₹2,000 fine + possible 3 months imprisonment for first offence.", ml: "₹2,000 പിഴ + 3 മാസം ജയിൽ ശിക്ഷ വരെ." },
  },

  // --- ROAD SAFETY ---
  {
    id: "q-safe-1",
    category: "road-safety",
    question: { en: "Speed limit in city/town area in Kerala (LMV) is usually:", ml: "കേരള നഗരത്തിൽ LMV വേഗപരിധി:" },
    options: [
      { en: "30 km/h", ml: "30 km/h" },
      { en: "50 km/h", ml: "50 km/h" },
      { en: "80 km/h", ml: "80 km/h" },
      { en: "100 km/h", ml: "100 km/h" },
    ],
    correct: 1,
    explanation: { en: "50 km/h is the standard urban speed limit.", ml: "50 km/h സാധാരണ നഗര വേഗപരിധി." },
  },
  {
    id: "q-safe-2",
    category: "road-safety",
    question: { en: "Legal blood alcohol limit while driving in India:", ml: "ഇന്ത്യയിൽ വാഹനമോടിക്കുമ്പോൾ നിയമപരമായ മദ്യപാന പരിധി:" },
    options: [
      { en: "0 mg/100ml", ml: "0 mg/100ml" },
      { en: "30 mg/100ml", ml: "30 mg/100ml" },
      { en: "80 mg/100ml", ml: "80 mg/100ml" },
      { en: "100 mg/100ml", ml: "100 mg/100ml" },
    ],
    correct: 1,
    explanation: { en: "30 mg per 100 ml of blood is the maximum permitted.", ml: "100ml രക്തത്തിൽ പരമാവധി 30mg." },
  },
  {
    id: "q-safe-3",
    category: "road-safety",
    question: { en: "Wearing a helmet is mandatory for:", ml: "ഹെൽമെറ്റ് നിർബന്ധം:" },
    options: [
      { en: "Rider only", ml: "ഡ്രൈവർക്ക് മാത്രം" },
      { en: "Pillion only", ml: "പിന്നിലിരിക്കുന്നയാൾക്ക് മാത്രം" },
      { en: "Both rider and pillion", ml: "ഡ്രൈവർക്കും പിന്നിലിരിക്കുന്നയാൾക്കും" },
      { en: "Optional always", ml: "എപ്പോഴും ഐച്ഛികം" },
    ],
    correct: 2,
    explanation: { en: "Both rider and pillion must wear ISI-marked helmets.", ml: "രണ്ട് പേർക്കും ISI ഹെൽമെറ്റ് നിർബന്ധം." },
  },
  {
    id: "q-safe-4",
    category: "road-safety",
    question: { en: "Seat belt is mandatory for:", ml: "സീറ്റ് ബെൽറ്റ് നിർബന്ധം:" },
    options: [
      { en: "Driver only", ml: "ഡ്രൈവർക്ക് മാത്രം" },
      { en: "Driver and front passenger", ml: "ഡ്രൈവർക്കും മുൻ യാത്രക്കാർക്കും" },
      { en: "Driver and all passengers", ml: "ഡ്രൈവർക്കും എല്ലാ യാത്രക്കാർക്കും" },
      { en: "Only on highways", ml: "ഹൈവേയിൽ മാത്രം" },
    ],
    correct: 2,
    explanation: { en: "All occupants — front and rear — must wear seat belts.", ml: "എല്ലാ യാത്രക്കാർക്കും സീറ്റ് ബെൽറ്റ് നിർബന്ധം." },
  },

  // --- FIRST AID ---
  {
    id: "q-fa-1",
    category: "first-aid",
    question: { en: "First step when you reach an accident scene:", ml: "അപകട സ്ഥലത്ത് ആദ്യം ചെയ്യേണ്ടത്:" },
    options: [
      { en: "Move the injured immediately", ml: "ഉടനെ പരിക്കേറ്റവരെ നീക്കുക" },
      { en: "Make the scene safe and call 108", ml: "സ്ഥലം സുരക്ഷിതമാക്കി 108 ൽ വിളിക്കുക" },
      { en: "Take photos and leave", ml: "ഫോട്ടോ എടുത്ത് പോകുക" },
      { en: "Argue about who is at fault", ml: "ആര് കുറ്റക്കാരൻ എന്ന് വാദിക്കുക" },
    ],
    correct: 1,
    explanation: { en: "Make the area safe (warning triangle, hazard lights) and call emergency number 108.", ml: "സ്ഥലം സുരക്ഷിതമാക്കി 108 ൽ വിളിക്കുക." },
  },
  {
    id: "q-fa-2",
    category: "first-aid",
    question: { en: "The Good Samaritan Law protects you when you:", ml: "ഗുഡ് സമരിറ്റൻ നിയമം പരിരക്ഷിക്കുന്നു:" },
    options: [
      { en: "Cause an accident", ml: "അപകടം ഉണ്ടാക്കിയാൽ" },
      { en: "Help an accident victim in good faith", ml: "സദുദ്ദേശ്യത്തോടെ അപകട ഇരയെ സഹായിച്ചാൽ" },
      { en: "Take a victim's belongings", ml: "ഇരയുടെ വസ്തുക്കൾ എടുത്താൽ" },
      { en: "Refuse to help", ml: "സഹായിക്കാൻ വിസമ്മതിച്ചാൽ" },
    ],
    correct: 1,
    explanation: { en: "Indian Good Samaritan Law (2016) protects bystanders helping victims.", ml: "സദുദ്ദേശ്യ സഹായികളെ പരിരക്ഷിക്കുന്നു." },
  },

  // --- EMERGENCY ---
  {
    id: "q-em-1",
    category: "emergency",
    question: { en: "If your brakes fail suddenly you should:", ml: "ബ്രേക്ക് പെട്ടെന്ന് തകരാറിലായാൽ:" },
    options: [
      { en: "Pump the brake and downshift gears", ml: "ബ്രേക്ക് പമ്പ് ചെയ്യുക, ഗിയർ ഡൗൺ ചെയ്യുക" },
      { en: "Switch off the engine", ml: "എഞ്ചിൻ ഓഫ് ചെയ്യുക" },
      { en: "Jump out of the vehicle", ml: "വാഹനത്തിൽ നിന്ന് ചാടുക" },
      { en: "Use full handbrake at once", ml: "ഹാൻഡ്‌ബ്രേക്ക് പെട്ടെന്ന് വലിച്ചിടുക" },
    ],
    correct: 0,
    explanation: { en: "Pump brake, gradually downshift, then use handbrake slowly.", ml: "ബ്രേക്ക് പമ്പ്, ഗിയർ ഡൗൺ, പതുക്കെ ഹാൻഡ്‌ബ്രേക്ക്." },
  },
  {
    id: "q-em-2",
    category: "emergency",
    question: { en: "When skidding, you should:", ml: "സ്കിഡ് ചെയ്യുമ്പോൾ:" },
    options: [
      { en: "Brake hard", ml: "ശക്തമായി ബ്രേക്ക്" },
      { en: "Steer in the direction of the skid, no braking", ml: "സ്കിഡ് ദിശയിലേക്ക് സ്റ്റിയറിങ്, ബ്രേക്ക് ഇല്ല" },
      { en: "Turn opposite to skid", ml: "സ്കിഡിന് എതിരെ തിരിക്കുക" },
      { en: "Accelerate hard", ml: "ശക്തമായി ആക്സിലറേറ്റ്" },
    ],
    correct: 1,
    explanation: { en: "Steer gently in the direction the rear is sliding; avoid braking.", ml: "സ്കിഡ് ദിശയിലേക്ക് സ്റ്റിയറിങ്, ബ്രേക്ക് ഒഴിവാക്കുക." },
  },

  // --- TRAFFIC SIGNS (non-image) ---
  {
    id: "q-tsg-1",
    category: "traffic-signs",
    question: { en: "A red triangular sign with a red border usually indicates:", ml: "ചുവന്ന അരികുള്ള ത്രികോണ അടയാളം:" },
    options: [
      { en: "Mandatory action", ml: "നിർബന്ധിത നടപടി" },
      { en: "Warning / cautionary", ml: "മുന്നറിയിപ്പ്" },
      { en: "Information", ml: "വിവരം" },
      { en: "Prohibition", ml: "നിരോധനം" },
    ],
    correct: 1,
    explanation: { en: "Triangular red-bordered signs are warning signs.", ml: "ത്രികോണ ചുവന്ന-അരിക് അടയാളങ്ങൾ മുന്നറിയിപ്പുകൾ." },
  },
  {
    id: "q-tsg-2",
    category: "traffic-signs",
    question: { en: "Circular blue signs usually convey:", ml: "നീല വൃത്താകൃതിയിലെ അടയാളങ്ങൾ:" },
    options: [
      { en: "Prohibitions", ml: "നിരോധനങ്ങൾ" },
      { en: "Mandatory instructions", ml: "നിർബന്ധിത നിർദ്ദേശങ്ങൾ" },
      { en: "Information", ml: "വിവരം" },
      { en: "Warnings", ml: "മുന്നറിയിപ്പുകൾ" },
    ],
    correct: 1,
    explanation: { en: "Blue circular signs are mandatory (must-do) signs.", ml: "നീല വൃത്തങ്ങൾ നിർബന്ധിത അടയാളങ്ങൾ." },
  },
];

// Sanity: ensure each sign reference exists
if (typeof window === "undefined") {
  for (const q of QUESTIONS) {
    if (q.signId && !SIGNS.find((s) => s.id === q.signId)) {
      console.warn(`[questions] missing sign id: ${q.signId}`);
    }
  }
}