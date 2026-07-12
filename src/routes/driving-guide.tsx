import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSite } from "@/lib/site-context";

type Sub = { title: { en: string; ml: string }; body: { en: string; ml: string } };
type Section = { icon: string; title: { en: string; ml: string }; subs: Sub[] };

const SECTIONS: Section[] = [
  {
    icon: "📘",
    title: {
      en: "Driving Training: Start Your Journey",
      ml: "ഡ്രൈവിംഗ് പരിശീലനം: യാത്ര ആരംഭിക്കുക",
    },
    subs: [
      {
        title: { en: "What is Driving Training?", ml: "ഡ്രൈവിംഗ് പരിശീലനം എന്നാൽ എന്ത്?" },
        body: {
          en: "Driving training is a structured programme that teaches vehicle control, traffic rules, road signs and safe driving habits. It combines classroom theory with hands-on practice so learners can drive confidently, legally and safely.",
          ml: "വാഹന നിയന്ത്രണം, ട്രാഫിക് നിയമങ്ങൾ, റോഡ് ചിഹ്നങ്ങൾ, സുരക്ഷിതമായ ഡ്രൈവിംഗ് ശീലങ്ങൾ എന്നിവ പഠിപ്പിക്കുന്ന ഘടനാപരമായ പരിശീലനമാണിത്. തിയറിയും പ്രായോഗിക പരിശീലനവും ചേർന്ന് ആത്മവിശ്വാസത്തോടെ ഡ്രൈവ് ചെയ്യാൻ സഹായിക്കുന്നു.",
        },
      },
      {
        title: { en: "Choosing a Driving School", ml: "ഡ്രൈവിംഗ് സ്കൂൾ തിരഞ്ഞെടുക്കൽ" },
        body: {
          en: "Pick an RTO-approved school with certified instructors, well-maintained dual-control vehicles, a proper syllabus and honest reviews. Verify the licence number, fee structure, and whether both LMV theory and practical are covered.",
          ml: "RTO അംഗീകൃതം, സർട്ടിഫൈഡ് ഇൻസ്ട്രക്ടർമാർ, ഡ്യുവൽ-കൺട്രോൾ വാഹനങ്ങൾ, കൃത്യമായ സിലബസ്, നല്ല റിവ്യൂകൾ ഉള്ള സ്കൂൾ തിരഞ്ഞെടുക്കുക. ലൈസൻസ് നമ്പർ, ഫീസ്, തിയറി-പ്രാക്ടിക്കൽ കവറേജ് പരിശോധിക്കുക.",
        },
      },
      {
        title: { en: "Online Driver Education", ml: "ഓൺലൈൻ ഡ്രൈവർ വിദ്യാഭ്യാസം" },
        body: {
          en: "Online courses cover traffic signs, RTO rules and mock tests at your own pace. Use them alongside — not instead of — on-road practice. This site's bilingual lessons and mock tests are ideal for LL preparation.",
          ml: "ട്രാഫിക് ചിഹ്നങ്ങൾ, RTO നിയമങ്ങൾ, മോക്ക് ടെസ്റ്റുകൾ എന്നിവ ഓൺലൈനിൽ സ്വന്തം വേഗതയിൽ പഠിക്കാം. റോഡ് പരിശീലനത്തിന് പകരമല്ല, കൂടെയാണ് ഉപയോഗിക്കേണ്ടത്.",
        },
      },
      {
        title: {
          en: "Importance of Practical Training",
          ml: "പ്രായോഗിക പരിശീലനത്തിന്റെ പ്രാധാന്യം",
        },
        body: {
          en: "Real driving skill comes only from behind-the-wheel practice — steering, gear changes, clutch control, parking, hill starts and reading traffic. Aim for at least 20–30 hours of supervised driving before the DL test.",
          ml: "സ്റ്റിയറിംഗ്, ഗിയർ, ക്ലച്ച്, പാർക്കിംഗ്, ഹിൽ സ്റ്റാർട്ട്, ട്രാഫിക് വായന — ഇവയെല്ലാം യഥാർത്ഥ പരിശീലനത്തിലൂടെ മാത്രമേ ലഭിക്കൂ. DL പരീക്ഷയ്ക്ക് മുൻപ് കുറഞ്ഞത് 20–30 മണിക്കൂർ പരിശീലനം നേടുക.",
        },
      },
      {
        title: {
          en: "Next Step: Getting Your Driving License",
          ml: "അടുത്ത പടി: ഡ്രൈവിംഗ് ലൈസൻസ്",
        },
        body: {
          en: "Apply for a Learner Licence on Parivahan Sarathi, pass the LL test, practise for 30 days, then book the Driving Licence test at your RTO. Carry Form 4, LL, address & age proof, and pass the practical test to get your DL.",
          ml: "പരിവാഹൻ സാരഥിയിൽ ലേണർ ലൈസൻസിനായി അപേക്ഷിക്കുക, LL ടെസ്റ്റ് പാസാവുക, 30 ദിവസം പരിശീലിക്കുക, ശേഷം RTO യിൽ DL ടെസ്റ്റ് ബുക്ക് ചെയ്യുക. ഫോം 4, LL, വിലാസം & വയസ്സ് തെളിവ് കൊണ്ടുവരിക.",
        },
      },
    ],
  },
  {
    icon: "📘",
    title: { en: "Vehicle Laws and Driving Rules", ml: "വാഹന നിയമങ്ങളും ഡ്രൈവിംഗ് ചട്ടങ്ങളും" },
    subs: [
      {
        title: { en: "Introduction to Vehicle Laws", ml: "വാഹന നിയമങ്ങളുടെ ആമുഖം" },
        body: {
          en: "The Motor Vehicles Act, 1988 and the Central Motor Vehicles Rules, 1989 govern all driving in India. They cover licensing, registration, insurance, safety standards, offences and penalties.",
          ml: "മോട്ടോർ വാഹന നിയമം 1988, കേന്ദ്ര മോട്ടോർ വാഹന ചട്ടങ്ങൾ 1989 എന്നിവയാണ് ഇന്ത്യയിലെ ഡ്രൈവിംഗ് നിയന്ത്രിക്കുന്നത്. ലൈസൻസ്, രജിസ്ട്രേഷൻ, ഇൻഷുറൻസ്, സുരക്ഷ, കുറ്റങ്ങൾ, പിഴകൾ എല്ലാം ഇതിലുൾപ്പെടും.",
        },
      },
      {
        title: { en: "Licensing and Registration", ml: "ലൈസൻസും രജിസ്ട്രേഷനും" },
        body: {
          en: "Every driver needs a valid licence for the vehicle class they drive, and every vehicle must be registered (RC) with the RTO. Keep DL, RC, insurance and PUC current — digital copies via mParivahan / DigiLocker are legally valid.",
          ml: "ഓരോ ഡ്രൈവർക്കും വാഹന വിഭാഗത്തിനുള്ള സാധുവായ ലൈസൻസ് ആവശ്യമാണ്; ഓരോ വാഹനവും RTO യിൽ രജിസ്റ്റർ ചെയ്യണം. DL, RC, ഇൻഷുറൻസ്, PUC എപ്പോഴും കാലാവധിയിൽ വേണം.",
        },
      },
      {
        title: { en: "Traffic Rules and Speed Limits", ml: "ട്രാഫിക് നിയമങ്ങളും വേഗപരിധിയും" },
        body: {
          en: "Follow lane discipline, keep left, obey signals, use indicators and maintain safe distance. Typical limits in Kerala: 50 km/h in cities, 70–80 km/h on highways for cars, lower for two-wheelers and heavy vehicles — always follow posted signs.",
          ml: "ലെയ്ൻ അച്ചടക്കം, ഇടത്തുവശം, സിഗ്നൽ അനുസരണം, ഇൻഡിക്കേറ്റർ, സുരക്ഷിത ദൂരം — ഇവ പാലിക്കുക. കേരളത്തിൽ നഗരങ്ങളിൽ 50 km/h, ഹൈവേകളിൽ 70–80 km/h; ബോർഡ് പ്രകാരം പിന്തുടരുക.",
        },
      },
      {
        title: { en: "Safety Precautions", ml: "സുരക്ഷാ മുൻകരുതലുകൾ" },
        body: {
          en: "Wear seat belts (all occupants) and ISI-marked helmets. Never drink and drive, never use a phone while driving, and never overload the vehicle. Check tyres, brakes, lights and mirrors before every trip.",
          ml: "എല്ലാ യാത്രക്കാരും സീറ്റ് ബെൽറ്റ്, ISI ഹെൽമെറ്റ് ധരിക്കുക. മദ്യപിച്ച് വാഹനമോടിക്കരുത്, ഫോൺ ഉപയോഗിക്കരുത്, ഓവർലോഡ് ചെയ്യരുത്. യാത്രയ്ക്ക് മുൻപ് ടയർ, ബ്രേക്ക്, ലൈറ്റ്, മിറർ പരിശോധിക്കുക.",
        },
      },
      {
        title: { en: "Traffic Violations and Penalties", ml: "ട്രാഫിക് ലംഘനങ്ങളും പിഴകളും" },
        body: {
          en: "Common penalties (MV Amendment Act 2019): drunk driving ₹10,000 + 6 months jail; no helmet ₹1,000 + 3-month licence suspension; over-speeding ₹1,000–₹2,000; no seat belt ₹1,000; driving without licence ₹5,000; using phone ₹1,000–₹10,000.",
          ml: "മദ്യപിച്ച് ഡ്രൈവിംഗ് ₹10,000 + 6 മാസം ജയിൽ; ഹെൽമെറ്റ് ഇല്ല ₹1,000 + 3 മാസം സസ്പെൻഷൻ; ഓവർസ്പീഡ് ₹1,000–₹2,000; സീറ്റ് ബെൽറ്റ് ഇല്ല ₹1,000; ലൈസൻസ് ഇല്ലാതെ ₹5,000; ഫോൺ ഉപയോഗം ₹1,000–₹10,000.",
        },
      },
      {
        title: { en: "Other Important Driving Considerations", ml: "മറ്റ് പ്രധാന കാര്യങ്ങൾ" },
        body: {
          en: "Always carry valid documents, respect emergency vehicles' right of way, follow no-parking / no-entry zones, and avoid unnecessary honking in silence zones near hospitals and schools.",
          ml: "സാധുവായ രേഖകൾ കൊണ്ടുനടക്കുക, ആംബുലൻസ് പോലുള്ള അടിയന്തിര വാഹനങ്ങൾക്ക് വഴി കൊടുക്കുക, നോ-പാർക്കിംഗ്/നോ-എൻട്രി മേഖലകൾ പാലിക്കുക, ആശുപത്രി-സ്കൂൾ പരിസരത്ത് ഹോൺ ഒഴിവാക്കുക.",
        },
      },
    ],
  },
  {
    icon: "📘",
    title: {
      en: "Vehicle and Traffic Safety: Your Responsibility on the Road",
      ml: "വാഹന-ട്രാഫിക് സുരക്ഷ: നിങ്ങളുടെ ഉത്തരവാദിത്തം",
    },
    subs: [
      {
        title: { en: "Importance of Vehicle Safety", ml: "വാഹന സുരക്ഷയുടെ പ്രാധാന്യം" },
        body: {
          en: "A well-maintained vehicle protects lives. Regularly service brakes, tyres, steering, lights and horn. Keep a first-aid kit, spare tyre, torch and reflective triangle in the vehicle.",
          ml: "നന്നായി പരിപാലിക്കുന്ന വാഹനം ജീവൻ രക്ഷിക്കുന്നു. ബ്രേക്ക്, ടയർ, സ്റ്റിയറിംഗ്, ലൈറ്റ്, ഹോൺ പതിവായി സർവീസ് ചെയ്യുക. ഫസ്റ്റ്-എയ്ഡ് കിറ്റ്, സ്പെയർ ടയർ, ടോർച്ച്, റിഫ്ലക്ടീവ് ട്രയാംഗിൾ കൈവശം വയ്ക്കുക.",
        },
      },
      {
        title: { en: "Following Traffic Rules", ml: "ട്രാഫിക് നിയമങ്ങൾ പാലിക്കൽ" },
        body: {
          en: "Obey signals, signs and road markings without exception. Rules exist to protect you and every other road user — pedestrians, cyclists and fellow drivers included.",
          ml: "സിഗ്നലുകൾ, ചിഹ്നങ്ങൾ, റോഡ് അടയാളങ്ങൾ ഒരു ഒഴിവുമില്ലാതെ പാലിക്കുക. നിയമങ്ങൾ എല്ലാ റോഡ് ഉപയോക്താക്കളെയും സംരക്ഷിക്കാൻ ഉള്ളതാണ്.",
        },
      },
      {
        title: { en: "Attention and Reaction Skills", ml: "ശ്രദ്ധയും പ്രതികരണ വേഗവും" },
        body: {
          en: "Stay alert, scan ahead 12–15 seconds, check mirrors every 5–8 seconds and anticipate other drivers' actions. Avoid distractions — no phone, no eating, no loud conversations while driving.",
          ml: "ജാഗ്രത, മുന്നിലേക്ക് 12–15 സെക്കൻഡ് സ്കാൻ, ഓരോ 5–8 സെക്കൻഡിലും കണ്ണാടി പരിശോധന, മറ്റുള്ളവരുടെ നീക്കങ്ങൾ മുൻകൂട്ടി കാണൽ. ഫോൺ, ഭക്ഷണം, ഉച്ചത്തിലുള്ള സംഭാഷണം ഒഴിവാക്കുക.",
        },
      },
      {
        title: { en: "Defensive Driving Practices", ml: "ഡിഫൻസീവ് ഡ്രൈവിംഗ്" },
        body: {
          en: "Assume other drivers may make mistakes. Keep a 3-second following distance (more in rain), signal early, avoid blind spots, and always have an escape route in mind.",
          ml: "മറ്റുള്ളവർ തെറ്റ് ചെയ്യുമെന്ന് കരുതി വാഹനമോടിക്കുക. 3-സെക്കൻഡ് പിന്തുടരൽ ദൂരം (മഴയിൽ കൂടുതൽ), നേരത്തേ സിഗ്നൽ, ബ്ലൈൻഡ് സ്പോട്ട് ഒഴിവാക്കൽ, എപ്പോഴും ഒരു എസ്കേപ്പ് വഴി മനസ്സിൽ വയ്ക്കുക.",
        },
      },
      {
        title: { en: "General Road Safety Tips", ml: "പൊതു റോഡ് സുരക്ഷ നിർദ്ദേശങ്ങൾ" },
        body: {
          en: "Buckle up every trip, wear a helmet on two-wheelers, use dipped headlights at night, slow down in rain and fog, respect pedestrian crossings, and never drive when tired or unwell.",
          ml: "ഓരോ യാത്രയിലും സീറ്റ് ബെൽറ്റ്, ഇരുചക്രത്തിൽ ഹെൽമെറ്റ്, രാത്രി ഡിപ്ഡ് ഹെഡ്‌ലൈറ്റ്, മഴ-മഞ്ഞിൽ വേഗം കുറയ്ക്കൽ, കാൽനടക്കാർക്ക് ബഹുമാനം. ക്ഷീണിതനായി/അസുഖത്തിൽ ഒരിക്കലും ഡ്രൈവ് ചെയ്യരുത്.",
        },
      },
    ],
  },
];

export const Route = createFileRoute("/driving-guide")({
  head: () => ({
    meta: [
      { title: "Driving Learning Guide — Traffic Tips" },
      {
        name: "description",
        content:
          "A complete driving learning guide covering driver training, vehicle laws, traffic rules, penalties and road safety — expandable, bilingual and free.",
      },
      { property: "og:title", content: "Driving Learning Guide — Traffic Tips" },
      {
        property: "og:description",
        content:
          "Driver training, vehicle laws and road safety explained in a clear expandable guide.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DrivingGuidePage,
});

function DrivingGuidePage() {
  const { lang } = useSite();
  const ml = lang === "ml" ? "lang-ml" : "";
  const t = (en: string, m: string) => (lang === "en" ? en : m);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-8">
        <header className="mb-6">
          <h1 className={`text-3xl font-bold tracking-tight ${ml}`}>
            {t("Driving Learning Guide", "ഡ്രൈവിംഗ് പഠന ഗൈഡ്")}
          </h1>
          <p className={`mt-2 text-sm text-muted-foreground ${ml}`}>
            {t(
              "Everything you need to start driving safely — training, laws and on-road responsibility. Tap a category, then a topic to read.",
              "സുരക്ഷിതമായി ഡ്രൈവിംഗ് ആരംഭിക്കാൻ വേണ്ടതെല്ലാം — പരിശീലനം, നിയമങ്ങൾ, റോഡ് ഉത്തരവാദിത്തം. ഒരു വിഭാഗം തുറന്ന്, വിഷയത്തിൽ ടാപ്പ് ചെയ്ത് വായിക്കുക.",
            )}
          </p>
        </header>

        <Accordion type="single" collapsible className="space-y-3">
          {SECTIONS.map((sec, i) => (
            <AccordionItem
              key={i}
              value={`sec-${i}`}
              className="rounded-xl border border-border bg-card px-4 shadow-sm"
            >
              <AccordionTrigger className={`text-base font-semibold sm:text-lg ${ml}`}>
                <span className="flex items-center gap-2">
                  <span aria-hidden>{sec.icon}</span>
                  <span>{lang === "en" ? sec.title.en : sec.title.ml}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <Accordion type="single" collapsible className="mt-1 space-y-2">
                  {sec.subs.map((s, j) => (
                    <AccordionItem
                      key={j}
                      value={`sec-${i}-sub-${j}`}
                      className="rounded-lg border border-border/70 bg-background px-3"
                    >
                      <AccordionTrigger className={`text-sm font-medium ${ml}`}>
                        {lang === "en" ? s.title.en : s.title.ml}
                      </AccordionTrigger>
                      <AccordionContent
                        className={`text-sm leading-relaxed text-muted-foreground ${ml}`}
                      >
                        {lang === "en" ? s.body.en : s.body.ml}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SiteLayout>
  );
}
