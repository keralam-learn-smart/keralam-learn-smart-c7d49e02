import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Traffic Tips" },
      { name: "description", content: "How Traffic Tips uses cookies and similar technologies." },
    ],
    links: [{ rel: "canonical", href: "https://keralam-learn-smart.lovable.app/cookie-policy" }],
  }),
  component: () => (
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
      <h2>Third parties</h2>
      <p>
        We use Lovable Cloud (Supabase) for backend, Google for optional sign-in, and may use Google
        AdSense for advertising. Each may set its own cookies subject to its own privacy policy.
      </p>
    </LegalPage>
  ),
});
