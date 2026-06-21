import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { useSite } from "@/lib/site-context";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — Traffic Tips" },
      { name: "description", content: "Educational disclaimer for Traffic Tips." },
      { property: "og:title", content: "Disclaimer — Traffic Tips" },
      { property: "og:description", content: "We are not affiliated with Kerala MVD or parivahan.gov.in." },
    ],
  }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  const { lang } = useSite();
  const ml = lang === "ml" ? "lang-ml" : "";
  return (
    <SiteLayout>
      <article className={`mx-auto max-w-3xl px-4 py-8 ${ml}`}>
        <h1 className="text-3xl font-bold">{lang === "en" ? "Disclaimer" : "നിരാകരണം"}</h1>
        <div className="prose prose-sm mt-6 max-w-none dark:prose-invert">
          <p>
            {lang === "en"
              ? "Traffic Tips is an independent educational website. It is not affiliated with, endorsed by or sponsored by the Kerala Motor Vehicles Department (MVD), parivahan.gov.in or any government body."
              : "ട്രാഫിക് ടിപ്സ് ഒരു സ്വതന്ത്ര വിദ്യാഭ്യാസ വെബ്സൈറ്റാണ്. ഇത് കേരള മോട്ടോർ വാഹന വകുപ്പ് (MVD), parivahan.gov.in അല്ലെങ്കിൽ ഏതെങ്കിലും സർക്കാർ സ്ഥാപനവുമായി ബന്ധപ്പെട്ടതല്ല."}
          </p>
          <p>
            {lang === "en"
              ? "Practice tests do not reflect actual RTO exam questions. They are based on publicly available Motor Vehicles Act provisions and the Kerala RTO syllabus and are intended as study aids only."
              : "പരിശീലന ടെസ്റ്റുകൾ യഥാർത്ഥ RTO പരീക്ഷാ ചോദ്യങ്ങളല്ല. മോട്ടോർ വാഹന നിയമത്തിന്റെ പൊതുവായി ലഭ്യമായ വ്യവസ്ഥകളും കേരള RTO സിലബസും അടിസ്ഥാനമാക്കിയ പഠന സഹായികൾ മാത്രമാണ്."}
          </p>
          <p>
            {lang === "en"
              ? "Always verify rules, fines and procedures with the official RTO or parivahan.gov.in before acting on them."
              : "നിയമങ്ങൾ, പിഴകൾ, നടപടികൾ എപ്പോഴും ഔദ്യോഗിക RTO അല്ലെങ്കിൽ parivahan.gov.in ൽ പരിശോധിക്കുക."}
          </p>
        </div>
      </article>
    </SiteLayout>
  );
}