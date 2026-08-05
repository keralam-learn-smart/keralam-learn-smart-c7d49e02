import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { useSite } from "@/lib/site-context";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Traffic Tips" },
      { name: "description", content: "Terms of use for the Traffic Tips website." },
      { property: "og:title", content: "Terms & Conditions" },
      { property: "og:description", content: "Terms of use for Traffic Tips." },
    ],
    links: [{ rel: "canonical", href: "https://keralam-learn-smart.vercel.app/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  const { lang } = useSite();
  const ml = lang === "ml" ? "lang-ml" : "";
  return (
    <SiteLayout>
      <article className={`mx-auto max-w-3xl px-4 py-8 ${ml}`}>
        <h1 className="text-3xl font-bold">{lang === "en" ? "Terms & Conditions" : "നിബന്ധനകൾ"}</h1>
        <div className="prose prose-sm mt-6 max-w-none dark:prose-invert">
          <p>
            {lang === "en"
              ? "By using Traffic Tips you agree to these terms. The content is provided for educational purposes only and is not legal advice."
              : "ട്രാഫിക് ടിപ്സ് ഉപയോഗിക്കുന്നതിലൂടെ നിങ്ങൾ ഈ നിബന്ധനകൾ അംഗീകരിക്കുന്നു. ഉള്ളടക്കം വിദ്യാഭ്യാസ ആവശ്യത്തിന് മാത്രമാണ്, നിയമോപദേശമല്ല."}
          </p>
          <h2>{lang === "en" ? "1. Use of the site" : "1. സൈറ്റ് ഉപയോഗം"}</h2>
          <p>
            {lang === "en"
              ? "You may use Traffic Tips for personal, non-commercial learning, including the bilingual study content, practice quizzes, AI tutor and 20 mock test sets. Do not copy or republish content without permission."
              : "ദ്വിഭാഷാ പഠന ഉള്ളടക്കം, പരിശീലന ക്വിസുകൾ, AI ട്യൂട്ടർ, 20 മോക്ക് ടെസ്റ്റ് സെറ്റുകൾ എന്നിവ ഉൾപ്പെടെ വ്യക്തിഗത, വാണിജ്യേതര പഠനത്തിന് മാത്രം ഉപയോഗിക്കാം. അനുമതിയില്ലാതെ ഉള്ളടക്കം പുനഃപ്രസിദ്ധീകരിക്കരുത്."}
          </p>
          <h2>{lang === "en" ? "2. Accuracy" : "2. കൃത്യത"}</h2>
          <p>
            {lang === "en"
              ? "We strive to keep all content accurate and aligned with Kerala RTO and the Motor Vehicles Act. However, rules may change — always confirm with the official RTO or parivahan.gov.in."
              : "എല്ലാ ഉള്ളടക്കവും കേരള RTO യ്ക്കും MV നിയമത്തിനും അനുസരിച്ച് നിലനിർത്താൻ ഞങ്ങൾ ശ്രമിക്കുന്നു. നിയമങ്ങൾ മാറാം — ഔദ്യോഗിക RTO അല്ലെങ്കിൽ parivahan.gov.in ൽ ഉറപ്പാക്കുക."}
          </p>
          <h2>{lang === "en" ? "3. Free access" : "3. സൗജന്യ ആക്സസ്"}</h2>
          <p>
            {lang === "en"
              ? "Traffic Tips is completely free. There are no fees, no subscriptions and no hidden charges. Every question, answer, mock test and study material is available to everyone at no cost."
              : "ട്രാഫിക് ടിപ്സ് പൂർണ്ണമായും സൗജന്യമാണ്. ഫീസോ സബ്സ്ക്രിപ്ഷനോ മറഞ്ഞിരിക്കുന്ന ചാർജുകളോ ഇല്ല. എല്ലാ ചോദ്യങ്ങളും ഉത്തരങ്ങളും മോക്ക് ടെസ്റ്റുകളും പഠന സാമഗ്രികളും എല്ലാവർക്കും സൗജന്യമാണ്."}
          </p>
          <p>
            {lang === "en"
              ? "We never ask for card or banking details. The site is supported by advertising only."
              : "ഞങ്ങൾ ഒരിക്കലും കാർഡ് അല്ലെങ്കിൽ ബാങ്കിംഗ് വിവരങ്ങൾ ചോദിക്കുന്നില്ല. പരസ്യങ്ങളിലൂടെ മാത്രമാണ് സൈറ്റ് നിലനിർത്തുന്നത്."}
          </p>

          <h2>{lang === "en" ? "4. Limitation of liability" : "4. ബാധ്യതാ പരിമിതി"}</h2>
          <p>
            {lang === "en"
              ? "We are not liable for any test results, fines, accidents or losses arising from use of this site."
              : "ഈ സൈറ്റ് ഉപയോഗത്തിൽ നിന്ന് ഉണ്ടാകുന്ന ടെസ്റ്റ് ഫലങ്ങൾ, പിഴകൾ, അപകടങ്ങൾ, നഷ്ടങ്ങൾക്ക് ഞങ്ങൾ ഉത്തരവാദികളല്ല."}
          </p>
          <h2>{lang === "en" ? "5. Changes" : "5. മാറ്റങ്ങൾ"}</h2>
          <p>
            {lang === "en"
              ? "We may update these terms at any time. Continued use means acceptance of updates."
              : "ഞങ്ങൾ എപ്പോൾ വേണമെങ്കിലും നിബന്ധനകൾ പുതുക്കാം. തുടർന്ന് ഉപയോഗിക്കുന്നത് അംഗീകാരമാണ്."}
          </p>
        </div>
      </article>
    </SiteLayout>
  );
}
