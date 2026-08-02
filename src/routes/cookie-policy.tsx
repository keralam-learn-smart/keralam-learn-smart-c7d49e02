import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { useSite } from "@/lib/site-context";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Traffic Tips" },
      { name: "description", content: "How Traffic Tips uses cookies and similar technologies." },
    ],
    links: [{ rel: "canonical", href: "https://keralam-learn-smart.lovable.app/cookie-policy" }],
  }),
  component: CookiePolicyPage,
});

function CookiePolicyPage() {
  const { lang } = useSite();

  return (
    <LegalPage titleEn="Cookie Policy" titleMl="കുക്കി നയം">
      <p>
        Traffic Tips uses cookies and local storage to remember your language and theme preferences,
        keep you signed in, and measure anonymous usage so we can improve the site.
      </p>
      <h2>Types of cookies we use</h2>
      <ul>
        <li>
          <strong>Essential</strong>: session, authentication and security.
        </li>
        <li>
          <strong>Preferences</strong>: language (English / മലയാളം) and dark mode.
        </li>
        <li>
          <strong>Analytics</strong>: anonymous page and feature usage.
        </li>
        <li>
          <strong>Advertising</strong>: if and when Google AdSense is enabled, Google and its
          partners may use cookies to serve ads based on your visits to this and other sites.
        </li>
      </ul>
      <h2>Managing cookies</h2>
      <p>
        You can clear or block cookies from your browser settings. Disabling essential cookies may
        break sign-in and progress tracking.
      </p>
      <h2>{lang === "en" ? "Third Parties" : "മൂന്നാം കക്ഷി സേവനങ്ങൾ"}</h2>
      <p>
        {lang === "en"
          ? "We use a secure cloud database for backend services, Google for optional sign-in, and may use Google AdSense for advertising. Each of these may set their own cookies, subject to their own privacy policy."
          : "ഞങ്ങൾ ബാക്ക്‌എൻഡ് സേവനങ്ങൾക്കായി സുരക്ഷിതമായ ഒരു ക്ലൗഡ് ഡാറ്റാബേസ്, ഐച്ഛിക സൈൻ-ഇൻ സൗകര്യത്തിനായി Google, കൂടാതെ പരസ്യങ്ങൾക്കായി Google AdSense ഉപയോഗിച്ചേക്കാം. ഈ സേവനങ്ങളിൽ ഓരോന്നും അവരുടെ സ്വന്തം സ്വകാര്യതാ നയത്തിന് വിധേയമായി കുക്കികൾ സജ്ജമാക്കാൻ സാധ്യതയുണ്ട്."}
      </p>
    </LegalPage>
  );
}
