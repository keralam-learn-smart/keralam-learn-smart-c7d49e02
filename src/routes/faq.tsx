import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSite } from "@/lib/site-context";

const FAQS: { q: { en: string; ml: string }; a: { en: string; ml: string } }[] = [
  {
    q: { en: "Is Traffic Tips free?", ml: "ട്രാഫിക് ടിപ്സ് സൗജന്യമാണോ?" },
    a: {
      en: "Yes. All learning content, practice questions and mock tests are 100% free. No sign-up required.",
      ml: "അതെ. എല്ലാ ഉള്ളടക്കവും 100% സൗജന്യമാണ്. രജിസ്ട്രേഷൻ ആവശ്യമില്ല.",
    },
  },
  {
    q: {
      en: "What is the minimum age for a learner licence in Kerala?",
      ml: "ലേണർ ലൈസൻസിന് ഏറ്റവും കുറഞ്ഞ പ്രായം?",
    },
    a: {
      en: "16 for gearless two-wheelers up to 50cc, 18 for other private vehicles, 20 for transport vehicles.",
      ml: "50cc വരെയുള്ള ഗിയറില്ലാത്ത വാഹനത്തിന് 16, മറ്റ് സ്വകാര്യ വാഹനങ്ങൾക്ക് 18, ട്രാൻസ്പോർട്ടിന് 20.",
    },
  },
  {
    q: {
      en: "How many questions are in the actual RTO LL test?",
      ml: "യഥാർത്ഥ LL പരീക്ഷയിൽ എത്ര ചോദ്യങ്ങൾ?",
    },
    a: {
      en: "Kerala RTO LL test has 20 multiple-choice questions; you need at least 12 correct to pass.",
      ml: "കേരള RTO LL പരീക്ഷയിൽ 20 ചോദ്യങ്ങൾ; വിജയിക്കാൻ കുറഞ്ഞത് 12 ശരി വേണം.",
    },
  },
  {
    q: { en: "How long is a learner licence valid?", ml: "ലേണർ ലൈസൻസ് എത്ര നാൾ സാധു?" },
    a: {
      en: "6 months from issue. Apply for permanent DL after 30 days.",
      ml: "6 മാസം. 30 ദിവസത്തിന് ശേഷം പെർമനന്റ് DL ന് അപേക്ഷിക്കാം.",
    },
  },
  {
    q: { en: "Does the AI tutor answer in Malayalam?", ml: "AI ട്യൂട്ടർ മലയാളത്തിൽ മറുപടി തരുമോ?" },
    a: {
      en: "Yes. Toggle the language to മലയാളം and ask in Malayalam.",
      ml: "അതെ. ഭാഷ മലയാളത്തിലേക്ക് മാറ്റി ചോദിക്കുക.",
    },
  },
  {
    q: {
      en: "Can I use mParivahan / DigiLocker DL?",
      ml: "mParivahan / DigiLocker DL ഉപയോഗിക്കാമോ?",
    },
    a: {
      en: "Yes, digital licences on mParivahan and DigiLocker are legally valid.",
      ml: "അതെ, mParivahan, DigiLocker ലെ ഡിജിറ്റൽ DL നിയമപരമായി സാധുവാണ്.",
    },
  },
  {
    q: { en: "What is the penalty for drunk driving?", ml: "മദ്യപിച്ച് വാഹനമോടിക്കൽ പിഴ?" },
    a: {
      en: "₹10,000 for first offence and up to 6 months imprisonment, plus licence suspension.",
      ml: "ആദ്യ കുറ്റത്തിന് ₹10,000, 6 മാസം വരെ ജയിൽ, ലൈസൻസ് സസ്പെൻഷൻ.",
    },
  },
  {
    q: { en: "How many traffic signs should I learn?", ml: "എത്ര ഗതാഗത ചിഹ്നങ്ങൾ പഠിക്കണം?" },
    a: {
      en: "Learn all mandatory, cautionary, prohibitory and informatory signs — about 80 in total are tested in Kerala.",
      ml: "എല്ലാ നിർബന്ധിത, മുന്നറിയിപ്പ്, നിരോധന, വിവര ചിഹ്നങ്ങളും പഠിക്കുക — കേരളത്തിൽ ഏകദേശം 80 എണ്ണം പരീക്ഷയിൽ വരുന്നു.",
    },
  },
];

export const Route = createFileRoute("/faq")({
  head: () => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q.en,
        acceptedAnswer: { "@type": "Answer", text: f.a.en },
      })),
    };
    return {
      meta: [
        { title: "FAQ — Traffic Tips" },
        {
          name: "description",
          content: "Frequently asked questions about the Kerala RTO learner licence test.",
        },
        { property: "og:title", content: "FAQ — Traffic Tips" },
        {
          property: "og:description",
          content: "Common questions answered about the Kerala RTO LL test.",
        },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLd),
        },
      ],
    };
  },
  component: FaqPage,
});

function FaqPage() {
  const { lang } = useSite();
  const ml = lang === "ml" ? "lang-ml" : "";
  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className={`text-3xl font-bold ${ml}`}>
          {lang === "en" ? "Frequently Asked Questions" : "സാധാരണ ചോദ്യങ്ങൾ"}
        </h1>
        <Accordion type="single" collapsible className="mt-6">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`f-${i}`}>
              <AccordionTrigger className={`text-left ${ml}`}>
                {lang === "en" ? f.q.en : f.q.ml}
              </AccordionTrigger>
              <AccordionContent className={`text-sm text-muted-foreground ${ml}`}>
                {lang === "en" ? f.a.en : f.a.ml}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SiteLayout>
  );
}
