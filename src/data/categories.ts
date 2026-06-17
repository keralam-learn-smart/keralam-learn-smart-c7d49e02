export type Category = {
  slug: string;
  icon: string;
  name: { en: string; ml: string };
  desc: { en: string; ml: string };
  content: { en: string; ml: string };
};

export const CATEGORIES: Category[] = [
  {
    slug: "traffic-signs",
    icon: "⚠️",
    name: { en: "Traffic Signs", ml: "ഗതാഗത ചിഹ്നങ്ങൾ" },
    desc: { en: "Warning, mandatory, prohibitory & informatory signs", ml: "മുന്നറിയിപ്പ്, നിർബന്ധിത, നിരോധന, വിവര ചിഹ്നങ്ങൾ" },
    content: {
      en: "Traffic signs are visual symbols placed on roads to guide, warn or regulate drivers. Kerala RTO follows the Indian Road Congress (IRC) standard. There are four main families: Mandatory (red circle), Cautionary/Warning (red triangle), Informatory (blue rectangle) and Direction signs. Every driver must recognise each sign at a glance and respond before reaching it.",
      ml: "റോഡിൽ ഡ്രൈവർമാർക്ക് മാർഗ്ഗനിർദ്ദേശം നൽകുവാനും മുന്നറിയിപ്പ് നൽകുവാനും നിയന്ത്രിക്കുവാനും ഉപയോഗിക്കുന്ന ദൃശ്യ ചിഹ്നങ്ങളാണ് ഗതാഗത ചിഹ്നങ്ങൾ. കേരള RTO ഇന്ത്യൻ റോഡ് കോൺഗ്രസ്സ് (IRC) മാനദണ്ഡം പിന്തുടരുന്നു. നാല് പ്രധാന വിഭാഗങ്ങൾ ഉണ്ട്: നിർബന്ധിത (ചുവന്ന വൃത്തം), മുന്നറിയിപ്പ് (ചുവന്ന ത്രികോണം), വിവര (നീല ദീർഘചതുരം), ദിശാ ചിഹ്നങ്ങൾ.",
    },
  },
  {
    slug: "traffic-signals",
    icon: "🚦",
    name: { en: "Traffic Signals", ml: "ഗതാഗത സിഗ്നലുകൾ" },
    desc: { en: "Red, Yellow, Green & pedestrian signals", ml: "ചുവപ്പ്, മഞ്ഞ, പച്ച സിഗ്നലുകൾ" },
    content: {
      en: "Red means STOP at the stop line. Yellow means prepare to stop — only proceed if you cannot stop safely. Green means GO if the path is clear. Flashing yellow = slow down with caution. Flashing red = treat as a stop sign. Pedestrian crossing signals must always be obeyed when red.",
      ml: "ചുവപ്പ് = നിർത്തുക. മഞ്ഞ = നിർത്താൻ തയ്യാറാകുക, സുരക്ഷിതമായി നിർത്താൻ കഴിയില്ലെങ്കിൽ മാത്രം മുന്നോട്ട് പോകുക. പച്ച = വഴി തെളിയുകയാണെങ്കിൽ പോകുക. മിന്നുന്ന മഞ്ഞ = ശ്രദ്ധയോടെ വേഗത കുറയ്ക്കുക. മിന്നുന്ന ചുവപ്പ് = നിർത്തുക എന്ന അടയാളമായി കണക്കാക്കുക.",
    },
  },
  {
    slug: "road-rules",
    icon: "🛣️",
    name: { en: "Road Rules", ml: "റോഡ് നിയമങ്ങൾ" },
    desc: { en: "Lane discipline, overtaking, right of way", ml: "ലെയ്ൻ അച്ചടക്കം, ഓവർടേക്കിങ്, പ്രഥമ അവകാശം" },
    content: {
      en: "Always drive on the left in India. Overtake only from the right. Maintain a 2-second following gap (4 seconds in rain). Give right of way to ambulances, fire engines and police vehicles. At an unmarked intersection, give way to the vehicle on your right.",
      ml: "ഇന്ത്യയിൽ എപ്പോഴും ഇടതുവശത്തുകൂടി വാഹനമോടിക്കുക. വലത്തുവശത്തുകൂടി മാത്രം ഓവർടേക്ക് ചെയ്യുക. 2 സെക്കൻഡ് അകലം പാലിക്കുക (മഴയിൽ 4 സെക്കൻഡ്). ആംബുലൻസ്, ഫയർ ഫോഴ്സ്, പോലീസ് വാഹനങ്ങൾക്ക് വഴി നൽകുക.",
    },
  },
  {
    slug: "road-markings",
    icon: "🛤️",
    name: { en: "Road Markings", ml: "റോഡ് അടയാളങ്ങൾ" },
    desc: { en: "Solid, broken & yellow line meanings", ml: "ലൈൻ അടയാളങ്ങളുടെ അർത്ഥം" },
    content: {
      en: "Solid white line: do not cross or overtake. Broken white line: overtaking allowed when safe. Single yellow line: no overtaking. Double yellow line: absolutely no crossing. Zebra crossing: pedestrians have priority.",
      ml: "തുടർച്ചയായ വെള്ള വര: മുറിച്ചുകടക്കരുത്, ഓവർടേക്ക് ചെയ്യരുത്. പൊട്ടിയ വെള്ള വര: സുരക്ഷിതമെങ്കിൽ ഓവർടേക്ക് അനുവദനീയം. ഒറ്റ മഞ്ഞ വര: ഓവർടേക്കിങ് നിരോധിച്ചിരിക്കുന്നു. ഇരട്ട മഞ്ഞ വര: കടക്കാൻ പാടില്ല.",
    },
  },
  {
    slug: "learner-licence",
    icon: "📘",
    name: { en: "Learner Licence Rules", ml: "ലേണർ ലൈസൻസ് നിയമങ്ങൾ" },
    desc: { en: "Validity, age limits & restrictions", ml: "സാധുത, പ്രായപരിധി, നിയന്ത്രണങ്ങൾ" },
    content: {
      en: "Minimum age: 16 for gearless two-wheelers up to 50cc, 18 for other private vehicles, 20 for transport. LL is valid for 6 months and you may apply for permanent licence after 30 days. A learner must display an 'L' plate and be accompanied by a licensed driver.",
      ml: "ഏറ്റവും കുറഞ്ഞ പ്രായം: ഗിയർ ഇല്ലാത്ത 50cc വാഹനത്തിന് 16, മറ്റ് സ്വകാര്യ വാഹനങ്ങൾക്ക് 18, ട്രാൻസ്പോർട്ടിന് 20. LL ന് 6 മാസം സാധുത. 30 ദിവസത്തിന് ശേഷം പെർമനന്റ് ലൈസൻസിന് അപേക്ഷിക്കാം. 'L' ബോർഡ് പ്രദർശിപ്പിക്കണം.",
    },
  },
  {
    slug: "vehicle-documents",
    icon: "📄",
    name: { en: "Vehicle Documents", ml: "വാഹന രേഖകൾ" },
    desc: { en: "RC, Insurance, Pollution, Permit", ml: "RC, ഇൻഷുറൻസ്, പൊല്യൂഷൻ" },
    content: {
      en: "While driving, you must carry: Driving Licence, Registration Certificate (RC), Valid Insurance, Pollution Under Control (PUC) certificate, Fitness Certificate (commercial), and Permit (commercial). Digital copies on mParivahan/DigiLocker are valid.",
      ml: "വാഹനമോടിക്കുമ്പോൾ കരുതേണ്ടവ: ഡ്രൈവിങ് ലൈസൻസ്, RC, ഇൻഷുറൻസ്, PUC സർട്ടിഫിക്കറ്റ്, ഫിറ്റ്നസ് സർട്ടിഫിക്കറ്റ്, പെർമിറ്റ്. mParivahan/DigiLocker ലെ ഡിജിറ്റൽ പകർപ്പുകൾ സാധുവാണ്.",
    },
  },
  {
    slug: "insurance",
    icon: "🛡️",
    name: { en: "Insurance", ml: "ഇൻഷുറൻസ്" },
    desc: { en: "Third-party & comprehensive cover", ml: "തേർഡ് പാർട്ടി, കോംപ്രിഹെൻസീവ്" },
    content: {
      en: "Third-party insurance is mandatory by law (Motor Vehicles Act). Comprehensive insurance covers your own vehicle damage too. Driving without insurance: fine ₹2,000 first offence, ₹4,000 subsequent + imprisonment up to 3 months.",
      ml: "തേർഡ് പാർട്ടി ഇൻഷുറൻസ് നിയമപരമായി നിർബന്ധമാണ്. കോംപ്രിഹെൻസീവ് ഇൻഷുറൻസ് സ്വന്തം വാഹനത്തിന്റെ കേടുപാടുകളും കവർ ചെയ്യുന്നു. ഇൻഷുറൻസ് ഇല്ലാതെ വാഹനമോടിച്ചാൽ ₹2,000 (ആദ്യം), പിന്നീട് ₹4,000 + ജയിൽ ശിക്ഷ.",
    },
  },
  {
    slug: "road-safety",
    icon: "🦺",
    name: { en: "Road Safety", ml: "റോഡ് സുരക്ഷ" },
    desc: { en: "Helmet, seatbelt, speed limits", ml: "ഹെൽമെറ്റ്, സീറ്റ് ബെൽറ്റ്" },
    content: {
      en: "ISI-marked helmet is mandatory for rider AND pillion. Seat belt mandatory for driver and all front+rear passengers. Speed limits in Kerala: 50 km/h in city, 70 km/h on State Highways, 80–100 km/h on National Highways. Drink-drive limit: 30 mg/100ml blood.",
      ml: "ISI ഹെൽമെറ്റ് ഡ്രൈവർക്കും പിന്നിലിരിക്കുന്നയാൾക്കും നിർബന്ധം. എല്ലാ യാത്രക്കാർക്കും സീറ്റ് ബെൽറ്റ് നിർബന്ധം. കേരളത്തിലെ വേഗപരിധി: നഗരത്തിൽ 50, സംസ്ഥാന ഹൈവേയിൽ 70, ദേശീയ ഹൈവേയിൽ 80–100 km/h. മദ്യപാന പരിധി: 100ml രക്തത്തിൽ 30mg.",
    },
  },
  {
    slug: "first-aid",
    icon: "🚑",
    name: { en: "First Aid", ml: "പ്രഥമ ശുശ്രൂഷ" },
    desc: { en: "Helping accident victims", ml: "അപകട ഇരകളെ സഹായിക്കൽ" },
    content: {
      en: "Stop bleeding with firm pressure. Do not move a victim with suspected spinal injury unless there is fire risk. Call 108 immediately. Good Samaritan Law (2016) protects bystanders helping accident victims from legal/medical liability.",
      ml: "ശക്തമായി അമർത്തി രക്തസ്രാവം നിർത്തുക. നട്ടെല്ലിന് പരിക്കേറ്റിരിക്കാമെന്ന് സംശയിച്ചാൽ ഇരയെ നീക്കരുത്. ഉടനെ 108 ൽ വിളിക്കുക. ഗുഡ് സമരിറ്റൻ നിയമം (2016) സഹായിക്കുന്നവർക്ക് നിയമപരമായ പരിരക്ഷ നൽകുന്നു.",
    },
  },
  {
    slug: "emergency",
    icon: "🆘",
    name: { en: "Emergency Situations", ml: "അടിയന്തിര സാഹചര്യങ്ങൾ" },
    desc: { en: "Brake failure, skid, accident", ml: "ബ്രേക്ക് തകരാർ, സ്കിഡ്" },
    content: {
      en: "Brake failure: pump brake, downshift gears, use handbrake gradually, scrape against curb if needed. Tyre burst: do NOT brake hard — grip steering firmly, lift off accelerator, slow gradually. Skid: steer in direction of skid, do not brake.",
      ml: "ബ്രേക്ക് തകരാർ: ബ്രേക്ക് പമ്പ് ചെയ്യുക, ഗിയർ ഡൗൺ ചെയ്യുക, പതുക്കെ ഹാൻഡ് ബ്രേക്ക് ഉപയോഗിക്കുക. ടയർ പൊട്ടിയാൽ: ശക്തമായി ബ്രേക്ക് ചെയ്യരുത് — സ്റ്റിയറിങ് ഉറപ്പിച്ച് പിടിക്കുക, ആക്സിലറേറ്റർ വിടുക.",
    },
  },
];

export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);