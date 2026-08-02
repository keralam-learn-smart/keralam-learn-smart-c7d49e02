import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/acceptable-use")({
  head: () => ({
    meta: [
      { title: "Acceptable Use Policy — Traffic Tips" },
      { name: "description", content: "Rules for using Traffic Tips safely and respectfully." },
    ],
    links: [{ rel: "canonical", href: "https://keralam-learn-smart.lovable.app/acceptable-use" }],
  }),
  component: () => (
    <LegalPage titleEn="Acceptable Use Policy" titleMl="സ്വീകാര്യമായ ഉപയോഗ നയം">
      <p>To keep Traffic Tips safe and useful for every learner, you agree NOT to:</p>
      <ul>
        <li>Scrape, copy or republish our questions, signs or content.</li>
        <li>Attempt to bypass authentication, rate limits or security controls.</li>
        <li>
          Upload malicious code, spam or misleading information through feedback or contact forms.
        </li>
        <li>Use the site for any unlawful purpose or to harass other users.</li>
        <li>Misrepresent yourself or impersonate Kerala MVD, RTO or any government body.</li>
      </ul>
      <h2>Fair use</h2>
      <p>
        Automated requests should respect reasonable rate limits. Abuse may lead to permanent IP or
        account blocks.
      </p>
      <h2>Reporting violations</h2>
      <p>
        Use the "Report Issue" option in the menu to alert us to abuse, security issues or
        inappropriate content.
      </p>
    </LegalPage>
  ),
});
