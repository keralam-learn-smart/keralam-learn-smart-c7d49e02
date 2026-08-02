import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Card } from "@/components/ui/card";
import { useSite } from "@/lib/site-context";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Traffic Tips" },
      {
        name: "description",
        content:
          "Traffic Tips is a bilingual learning platform for the Kerala RTO Learner Licence (LL) test, available for just ₹45.",
      },
      { property: "og:title", content: "About Traffic Tips" },
      {
        property: "og:description",
        content: "Our mission, our team and how we help Kerala learners pass the RTO test.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { lang } = useSite();
  const ml = lang === "ml" ? "lang-ml" : "";
  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className={`text-3xl font-bold ${ml}`}>
          {lang === "en" ? "About Traffic Tips" : "ട്രാഫിക് ടിപ്സ് കുറിച്ച്"}
        </h1>
        <p className={`mt-3 text-muted-foreground ${ml}`}>
          {lang === "en"
            ? "Traffic Tips is a bilingual (English & Malayalam) learning and testing platform built for aspirants of the Kerala RTO Learner Licence (LL) and Driving Licence (DL) tests, available for just ₹45."
            : "കേരള RTO ലേണർ ലൈസൻസ്, ഡ്രൈവിങ് ലൈസൻസ് പരീക്ഷാ ഉദ്യോഗാർത്ഥികൾക്കായി വെറും ₹45-ന് ലഭ്യമാകുന്ന ദ്വിഭാഷാ പഠന-പരീക്ഷാ പ്ലാറ്റ്ഫോമാണ് ട്രാഫിക് ടിപ്സ്."}
        </p>

        <Card className="mt-6 p-6">
          <h2 className={`text-lg font-semibold ${ml}`}>
            {lang === "en" ? "Our Mission" : "ഞങ്ങളുടെ ദൗത്യം"}
          </h2>
          <p className={`mt-2 text-sm ${ml}`}>
            {lang === "en"
              ? "To make Kerala roads safer by giving every new driver high-quality, easy-to-understand learning material in their own language, at an affordable price."
              : "ഓരോ പുതിയ ഡ്രൈവർക്കും അവരുടെ സ്വന്തം ഭാഷയിൽ ഉയർന്ന നിലവാരമുള്ള, എളുപ്പത്തിൽ മനസ്സിലാക്കാവുന്ന പഠന സാമഗ്രികൾ കുറഞ്ഞ നിരക്കിൽ നൽകി കേരളത്തിലെ റോഡുകൾ കൂടുതൽ സുരക്ഷിതമാക്കുക."}
          </p>
        </Card>

        <Card className="mt-4 p-6">
          <h2 className={`text-lg font-semibold ${ml}`}>
            {lang === "en" ? "What we offer" : "ഞങ്ങൾ വാഗ്ദാനം ചെയ്യുന്നത്"}
          </h2>
          <ul className={`mt-2 list-disc space-y-1 pl-5 text-sm ${ml}`}>
            <li>
              {lang === "en"
                ? "500+ Kerala RTO practice questions"
                : "500+ കേരള RTO പരിശീലന ചോദ്യങ്ങൾ"}
            </li>
            <li>
              {lang === "en"
                ? "100+ traffic signs with explanations"
                : "100+ ഗതാഗത ചിഹ്നങ്ങൾ വിശദീകരണത്തോടെ"}
            </li>
            <li>
              {lang === "en"
                ? "20 mock tests of 15 questions each, 20s timer"
                : "20 മോക്ക് ടെസ്റ്റുകൾ, 15 ചോദ്യങ്ങൾ, 20s ടൈമർ"}
            </li>
            <li>
              {lang === "en"
                ? "AI Study Assistant for instant answers"
                : "തൽക്ഷണ ഉത്തരങ്ങൾക്കായി AI പഠന സഹായി"}
            </li>
            <li>
              {lang === "en"
                ? "Fee calculator and official RTO links"
                : "ഫീസ് കാൽക്കുലേറ്റർ, ഔദ്യോഗിക RTO ലിങ്കുകൾ"}
            </li>
          </ul>
        </Card>
      </div>
    </SiteLayout>
  );
}
