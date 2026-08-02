import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/user-agreement")({
  head: () => ({
    meta: [
      { title: "User Agreement — Traffic Tips" },
      {
        name: "description",
        content: "The agreement between you and Traffic Tips when you use this site.",
      },
    ],
    links: [{ rel: "canonical", href: "https://keralam-learn-smart.lovable.app/user-agreement" }],
  }),
  component: () => (
    <LegalPage titleEn="User Agreement" titleMl="ഉപയോക്തൃ കരാർ">
      <p>
        By creating an account or using Traffic Tips, you agree to this User Agreement together with
        our Terms &amp; Conditions, Privacy Policy and Acceptable Use Policy.
      </p>
      <h2>Eligibility</h2>
      <p>
        You must be at least 16 years old or have a parent/guardian's consent. You agree to provide
        accurate information and keep your account secure.
      </p>
      <h2>Your account</h2>
      <ul>
        <li>You are responsible for activity under your account.</li>
        <li>Do not share your password or let others use your account.</li>
        <li>Notify us immediately of any unauthorised use.</li>
      </ul>
      <h2>Educational use only</h2>
      <p>
        Traffic Tips provides study material, practice quizzes and 20 mock test sets of 15 questions
        each. It does not issue licences, certificates or any official RTO document.
      </p>
      <h2>Termination</h2>
      <p>
        You may delete your account at any time. We may suspend accounts that violate our policies.
      </p>
    </LegalPage>
  ),
});
