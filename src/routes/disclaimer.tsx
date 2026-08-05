import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { useSite } from "@/lib/site-context";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — Traffic Tips" },
      { name: "description", content: "Educational disclaimer for Traffic Tips." },
      { property: "og:title", content: "Disclaimer — Traffic Tips" },
      {
        property: "og:description",
        content: "We are not affiliated with Kerala MVD or parivahan.gov.in.",
      },
    ],
    links: [{ rel: "canonical", href: "https://keralam-learn-smart.lovable.app/disclaimer" }],
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
            ട്രാഫിക് ടിപ്സ് ഒരു സ്വതന്ത്ര വിദ്യാഭ്യാസ (Educational) വെബ്സൈറ്റാണ്. ഈ
            വെബ്സൈറ്റ് കേരള മോട്ടോർ വാഹന വകുപ്പ് (MVD), കേരള RTO, ഭാരത സർക്കാരിന്റെ
            പരിവാഹൻ (Parivahan) സേവനം, അല്ലെങ്കിൽ ഏതെങ്കിലും സർക്കാർ വകുപ്പുമായി
            ബന്ധപ്പെട്ടതോ, അംഗീകരിക്കപ്പെട്ടതോ, ഔദ്യോഗികമായി പ്രവർത്തിക്കുന്നതോ അല്ല.
          </p>
          <p>
            ഈ വെബ്സൈറ്റിൽ പരാമർശിക്കുന്ന <strong>കേരള MVD</strong>,{" "}
            <strong>കേരള RTO</strong>, <strong>Parivahan</strong> എന്നീ പേരുകൾ,
            ലോഗോകൾ, ട്രേഡ്മാർക്കുകൾ എന്നിവ അവയുടെ യഥാർത്ഥ ഉടമസ്ഥരുടെ സ്വത്താണ്. അവ
            തിരിച്ചറിയൽ, വിദ്യാഭ്യാസം, റഫറൻസ് ആവശ്യങ്ങൾക്കായി മാത്രമാണ്
            ഉപയോഗിച്ചിരിക്കുന്നത്.
          </p>
          <p>
            ഈ വെബ്സൈറ്റിലെ ചോദ്യങ്ങൾ, ഉത്തരങ്ങൾ, പരിശീലന ടെസ്റ്റുകൾ, പഠന സാമഗ്രികൾ
            എന്നിവ പഠനത്തിനും പരീക്ഷാ തയ്യാറെടുപ്പിനുമായി തയ്യാറാക്കിയ വിദ്യാഭ്യാസ
            ഉള്ളടക്കമാണ്. ഇവ ഔദ്യോഗിക RTO പരീക്ഷാ ചോദ്യങ്ങളോ സർക്കാർ
            പ്രസിദ്ധീകരണങ്ങളോ അല്ല.
          </p>
          <p>
            നിയമങ്ങൾ, പിഴകൾ, നടപടിക്രമങ്ങൾ, ലൈസൻസ് സംബന്ധമായ വിവരങ്ങൾ എന്നിവയിൽ
            മാറ്റങ്ങൾ ഉണ്ടായേക്കാം. അതിനാൽ ഏറ്റവും പുതിയ ഔദ്യോഗിക വിവരങ്ങൾക്കായി
            കേരള മോട്ടോർ വാഹന വകുപ്പിന്റെയോ Parivahan-ന്റെയോ ഔദ്യോഗിക വെബ്സൈറ്റ്
            പരിശോധിക്കുക.
          </p>
          <p>
            ഈ വെബ്സൈറ്റ് നൽകുന്ന വിവരങ്ങൾ വിദ്യാഭ്യാസ ആവശ്യങ്ങൾക്ക് മാത്രമാണ്.
            ഔദ്യോഗിക സർക്കാർ അറിയിപ്പുകൾക്കും സേവനങ്ങൾക്കും ബന്ധപ്പെട്ട സർക്കാർ
            വകുപ്പുകളുടെ ഔദ്യോഗിക ഉറവിടങ്ങളെയാണ് ആശ്രയിക്കേണ്ടത്.
          </p>
        </div>
      </article>
    </SiteLayout>
  );
}
