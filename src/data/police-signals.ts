export type PoliceSignal = {
  id: string;
  name: { en: string; ml: string };
  meaning: { en: string; ml: string };
  usage: { en: string; ml: string };
  examNote: { en: string; ml: string };
  svg: string;
};

// Simple stick-figure officer SVG builder — arms configurable
const officer = (arms: string) => `
<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="240" fill="#f1f5f9" rx="12"/>
  <circle cx="100" cy="55" r="20" fill="#fcd9b6" stroke="#111" stroke-width="3"/>
  <path d="M75 45 h50 v-6 a25 25 0 0 0 -50 0 z" fill="#0a47a3" stroke="#111" stroke-width="2"/>
  <rect x="80" y="80" width="40" height="70" fill="#0a47a3" stroke="#111" stroke-width="2"/>
  <rect x="80" y="150" width="18" height="60" fill="#111"/>
  <rect x="102" y="150" width="18" height="60" fill="#111"/>
  ${arms}
</svg>`;

export const POLICE_SIGNALS: PoliceSignal[] = [
  {
    id: "stop-front",
    name: { en: "Stop Vehicles from Front", ml: "മുന്നിൽ നിന്നുള്ള വാഹനങ്ങൾ നിർത്തുക" },
    meaning: {
      en: "Right arm raised, palm forward — vehicles approaching from the front must stop.",
      ml: "വലതു കൈ ഉയർത്തി ഉള്ളംകൈ മുന്നിലേക്ക് — മുന്നിൽ നിന്നുള്ള വാഹനങ്ങൾ നിർത്തണം.",
    },
    usage: {
      en: "Used at busy junctions to release cross traffic.",
      ml: "തിരക്കുള്ള ജംഗ്ഷനുകളിൽ കുറുകെയുള്ള ഗതാഗതം വിടാൻ.",
    },
    examNote: {
      en: "Police signals override traffic lights and signs.",
      ml: "പോലീസ് സിഗ്നൽ ട്രാഫിക് ലൈറ്റിനെക്കാൾ മുൻഗണനയുള്ളതാണ്.",
    },
    svg: officer(
      `<path d="M120 90 L 155 40" stroke="#fcd9b6" stroke-width="14" stroke-linecap="round"/><circle cx="158" cy="38" r="10" fill="#fcd9b6" stroke="#111" stroke-width="2"/><path d="M80 95 L 55 130" stroke="#fcd9b6" stroke-width="14" stroke-linecap="round"/>`,
    ),
  },
  {
    id: "stop-behind",
    name: { en: "Stop Vehicles from Behind", ml: "പിന്നിൽ നിന്നുള്ള വാഹനങ്ങൾ നിർത്തുക" },
    meaning: {
      en: "Left arm raised straight up — vehicles from behind must stop.",
      ml: "ഇടതു കൈ നേരെ മുകളിലേക്ക് — പിന്നിൽ നിന്നുള്ള വാഹനങ്ങൾ നിർത്തണം.",
    },
    usage: {
      en: "Signals rear-approaching vehicles to halt.",
      ml: "പിന്നിൽ വരുന്ന വാഹനങ്ങൾക്ക് നിർത്താൻ സൂചന.",
    },
    examNote: {
      en: "Different from ‘stop front’ — note the arm direction.",
      ml: "‘മുന്നിൽ നിർത്തുക’ എന്നതിൽ നിന്ന് വ്യത്യസ്തം — കൈയുടെ ദിശ ശ്രദ്ധിക്കുക.",
    },
    svg: officer(
      `<path d="M80 90 L 55 30" stroke="#fcd9b6" stroke-width="14" stroke-linecap="round"/><circle cx="53" cy="26" r="10" fill="#fcd9b6" stroke="#111" stroke-width="2"/><path d="M120 95 L 145 130" stroke="#fcd9b6" stroke-width="14" stroke-linecap="round"/>`,
    ),
  },
  {
    id: "stop-both",
    name: {
      en: "Stop Vehicles from Both Front & Behind",
      ml: "മുന്നിലും പിന്നിലും നിന്നുള്ള വാഹനങ്ങൾ നിർത്തുക",
    },
    meaning: {
      en: "Both arms raised, palms forward — halt traffic from front and rear.",
      ml: "രണ്ട് കൈകളും ഉയർത്തി — മുന്നിലും പിന്നിലും നിന്നുള്ള വാഹനങ്ങൾ നിർത്തണം.",
    },
    usage: {
      en: "Emergency vehicle passage, VIP movement.",
      ml: "അടിയന്തിര വാഹനങ്ങൾ, വിഐപി യാത്ര.",
    },
    examNote: {
      en: "Only side traffic (left/right) may proceed.",
      ml: "ഇടത്/വലത് ഭാഗത്തുനിന്നുള്ള വാഹനങ്ങൾക്ക് മാത്രം കടക്കാം.",
    },
    svg: officer(
      `<path d="M120 90 L 155 40" stroke="#fcd9b6" stroke-width="14" stroke-linecap="round"/><circle cx="158" cy="38" r="10" fill="#fcd9b6" stroke="#111" stroke-width="2"/><path d="M80 90 L 45 40" stroke="#fcd9b6" stroke-width="14" stroke-linecap="round"/><circle cx="42" cy="38" r="10" fill="#fcd9b6" stroke="#111" stroke-width="2"/>`,
    ),
  },
  {
    id: "start-right-left",
    name: { en: "Start Vehicles from Left", ml: "ഇടതുവശത്തുനിന്നുള്ള വാഹനങ്ങൾ വിടുക" },
    meaning: {
      en: "Right arm swung across, palm toward the left — left-side vehicles may go.",
      ml: "വലതു കൈ ശരീരത്തിന് കുറുകെ — ഇടത്തുനിന്നുള്ള വാഹനങ്ങൾക്ക് പോകാം.",
    },
    usage: { en: "Releases the left-side queue at a junction.", ml: "ജംഗ്ഷനിലെ ഇടതു ക്യൂ വിടാൻ." },
    examNote: {
      en: "Palm direction shows which side gets to move.",
      ml: "ഉള്ളംകൈയുടെ ദിശ ഏത് വശം നീങ്ങാമെന്ന് കാണിക്കുന്നു.",
    },
    svg: officer(
      `<path d="M100 95 L 40 95" stroke="#fcd9b6" stroke-width="14" stroke-linecap="round"/><circle cx="38" cy="95" r="10" fill="#fcd9b6" stroke="#111" stroke-width="2"/><path d="M120 95 L 145 130" stroke="#fcd9b6" stroke-width="14" stroke-linecap="round"/>`,
    ),
  },
  {
    id: "start-left-right",
    name: { en: "Start Vehicles from Right", ml: "വലതുവശത്തുനിന്നുള്ള വാഹനങ്ങൾ വിടുക" },
    meaning: {
      en: "Left arm swung across, palm toward the right — right-side vehicles may go.",
      ml: "ഇടതു കൈ ശരീരത്തിന് കുറുകെ — വലത്തുനിന്നുള്ള വാഹനങ്ങൾക്ക് പോകാം.",
    },
    usage: { en: "Releases right-side queue.", ml: "വലതു ക്യൂ വിടാൻ." },
    examNote: {
      en: "Mirror image of ‘start from left’.",
      ml: "‘ഇടത്തുനിന്ന് വിടുക’-യുടെ ദർപ്പണ ചിത്രം.",
    },
    svg: officer(
      `<path d="M100 95 L 160 95" stroke="#fcd9b6" stroke-width="14" stroke-linecap="round"/><circle cx="162" cy="95" r="10" fill="#fcd9b6" stroke="#111" stroke-width="2"/><path d="M80 95 L 55 130" stroke="#fcd9b6" stroke-width="14" stroke-linecap="round"/>`,
    ),
  },
  {
    id: "close-traffic",
    name: { en: "Close Traffic Coming from Right & Left", ml: "ഇടത്-വലത് വാഹനങ്ങൾ അടയ്ക്കുക" },
    meaning: {
      en: "Right arm across chest, palm out — closes side traffic.",
      ml: "വലതു കൈ ശരീരത്തിന് കുറുകെ, ഉള്ളംകൈ പുറത്തേക്ക് — വശങ്ങളിലെ വാഹനങ്ങൾ നിർത്തുന്നു.",
    },
    usage: {
      en: "Just before releasing front-back traffic.",
      ml: "മുന്നിൽ-പിന്നിൽ വാഹനങ്ങൾ വിടും മുൻപ്.",
    },
    examNote: {
      en: "Follows immediately after a ‘stop side’ signal.",
      ml: "‘വശം നിർത്തുക’ എന്നതിന് പിന്നാലെ വരും.",
    },
    svg: officer(
      `<path d="M100 90 L 165 60" stroke="#fcd9b6" stroke-width="14" stroke-linecap="round"/><circle cx="168" cy="58" r="10" fill="#fcd9b6" stroke="#111" stroke-width="2"/><path d="M80 95 L 55 130" stroke="#fcd9b6" stroke-width="14" stroke-linecap="round"/>`,
    ),
  },
  {
    id: "beckon-front",
    name: { en: "Beckon Vehicles from Front", ml: "മുന്നിലുള്ള വാഹനങ്ങളെ വിളിക്കുക" },
    meaning: {
      en: "Right hand swung from front to shoulder — vehicles in front may proceed toward the officer.",
      ml: "വലതു കൈ മുന്നിൽ നിന്ന് തോളിലേക്ക് — മുന്നിലുള്ള വാഹനങ്ങൾക്ക് നീങ്ങാം.",
    },
    usage: {
      en: "Moves stopped front traffic forward.",
      ml: "മുന്നിൽ നിന്നിരുന്ന വാഹനങ്ങൾ നീക്കാൻ.",
    },
    examNote: {
      en: "Confirms it is safe to proceed straight.",
      ml: "നേരെ പോകാൻ സുരക്ഷിതമെന്ന് സ്ഥിരീകരിക്കുന്നു.",
    },
    svg: officer(
      `<path d="M120 90 Q 170 90 130 55" stroke="#fcd9b6" stroke-width="14" stroke-linecap="round" fill="none"/><path d="M80 95 L 55 130" stroke="#fcd9b6" stroke-width="14" stroke-linecap="round"/>`,
    ),
  },
  {
    id: "beckon-behind",
    name: { en: "Beckon Vehicles from Behind", ml: "പിന്നിലുള്ള വാഹനങ്ങളെ വിളിക്കുക" },
    meaning: {
      en: "Left arm swung from back to shoulder — vehicles from behind may proceed.",
      ml: "ഇടതു കൈ പിന്നിൽ നിന്ന് തോളിലേക്ക് — പിന്നിലുള്ള വാഹനങ്ങൾക്ക് നീങ്ങാം.",
    },
    usage: { en: "Releases queue behind the officer.", ml: "പോലീസിന് പിന്നിലുള്ള ക്യൂ വിടാൻ." },
    examNote: {
      en: "Ensure rear view is clear before responding.",
      ml: "പിന്നിലുള്ള കാഴ്ച തെളിഞ്ഞെന്ന് ഉറപ്പാക്കുക.",
    },
    svg: officer(
      `<path d="M80 90 Q 30 90 70 55" stroke="#fcd9b6" stroke-width="14" stroke-linecap="round" fill="none"/><path d="M120 95 L 145 130" stroke="#fcd9b6" stroke-width="14" stroke-linecap="round"/>`,
    ),
  },
  {
    id: "vip-salute",
    name: { en: "VIP Salute / Stop All", ml: "VIP സലാം / എല്ലാം നിർത്തുക" },
    meaning: {
      en: "Right hand raised in salute, left across chest — all traffic halted for VIP.",
      ml: "വലതു കൈ സലാം, ഇടതു കൈ ശരീരത്തിന് കുറുകെ — VIP-യ്ക്കായി എല്ലാ ഗതാഗതവും നിർത്തുന്നു.",
    },
    usage: {
      en: "Presidential / ministerial convoys.",
      ml: "പ്രസിഡന്റ്/മന്ത്രിമാർ യാത്ര ചെയ്യുമ്പോൾ.",
    },
    examNote: {
      en: "Absolute stop — no vehicle moves.",
      ml: "സമ്പൂർണ്ണ നിർത്തൽ — ഒരു വാഹനവും നീങ്ങരുത്.",
    },
    svg: officer(
      `<path d="M120 85 L 155 45" stroke="#fcd9b6" stroke-width="14" stroke-linecap="round"/><path d="M155 45 l 6 -8" stroke="#fcd9b6" stroke-width="14" stroke-linecap="round"/><path d="M80 90 L 130 90" stroke="#fcd9b6" stroke-width="14" stroke-linecap="round"/>`,
    ),
  },
  {
    id: "night-baton",
    name: {
      en: "Night Signal with Lighted Baton",
      ml: "വെളിച്ചമുള്ള ബാറ്റൺ ഉപയോഗിച്ചുള്ള രാത്രി സിഗ്നൽ",
    },
    meaning: {
      en: "Baton waved side-to-side warns traffic; held up = stop; swung forward = go.",
      ml: "വശങ്ങളിലേക്ക് ചലിപ്പിക്കുമ്പോൾ മുന്നറിയിപ്പ്; നേരെ ഉയർത്തിയാൽ നിർത്തുക; മുന്നോട്ട് ചലിപ്പിച്ചാൽ പോകാം.",
    },
    usage: {
      en: "Night duty & poor-visibility conditions.",
      ml: "രാത്രി ഡ്യൂട്ടി, കാഴ്ച കുറഞ്ഞ അവസ്ഥകൾ.",
    },
    examNote: {
      en: "Learn the three baton positions: stop / warn / go.",
      ml: "മൂന്ന് ബാറ്റൺ പൊസിഷനുകൾ പഠിക്കുക: നിർത്തുക / മുന്നറിയിപ്പ് / പോകുക.",
    },
    svg: officer(
      `<path d="M120 90 L 165 50" stroke="#fcd9b6" stroke-width="14" stroke-linecap="round"/><rect x="160" y="20" width="8" height="40" fill="#111"/><circle cx="164" cy="18" r="8" fill="#ff5722"/><path d="M80 95 L 55 130" stroke="#fcd9b6" stroke-width="14" stroke-linecap="round"/>`,
    ),
  },
];
