import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/data-protection")({
  head: () => ({
    meta: [
      { title: "Data Protection Policy — Traffic Tips" },
      { name: "description", content: "How Traffic Tips collects, stores, secures and deletes your data." },
    ],
    links: [{ rel: "canonical", href: "https://keralam-learn-smart.lovable.app/data-protection" }],
  }),
  component: () => (
    <LegalPage titleEn="Data Protection Policy" titleMl="ഡാറ്റ സംരക്ഷണ നയം">
      <p>This policy explains how Traffic Tips protects personal data under the Digital Personal Data Protection Act, 2023 (India) and general best-practice principles.</p>
      <h2>What we collect</h2>
      <ul>
        <li>Account: email, optional name and phone you provide during sign-up.</li>
        <li>Learning progress: quiz attempts, scores and selected topics.</li>
        <li>Technical: device type, browser, and approximate region from logs.</li>
      </ul>
      <h2>How we secure it</h2>
      <ul>
        <li>Encrypted in transit (HTTPS) and at rest by our backend provider.</li>
        <li>Row-Level Security so each user can only access their own records.</li>
        <li>Role-based access for administrators; passwords are never stored in plain text.</li>
      </ul>
      <h2>Your rights</h2>
      <ul>
        <li>Access, correct or delete your account and data at any time from your Profile page.</li>
        <li>Withdraw consent or request a data export by contacting us.</li>
      </ul>
      <h2>Retention</h2>
      <p>Account data is kept while your account is active and deleted within 30 days of account deletion, except where law requires longer retention.</p>
    </LegalPage>
  ),
});