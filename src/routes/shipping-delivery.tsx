import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/shipping-delivery")({
  head: () => ({
    meta: [
      { title: "Shipping & Delivery Policy — Traffic Tips" },
      {
        name: "description",
        content: "Delivery policy for Traffic Tips digital learning access.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://keralam-learn-smart.lovable.app/shipping-delivery" },
    ],
  }),
  component: () => (
    <LegalPage titleEn="Shipping & Delivery Policy" titleMl="ഷിപ്പിംഗ് & ഡെലിവറി നയം">
      <p>
        Traffic Tips provides digital educational content for Kerala RTO Learner Licence
        preparation. We do not ship physical products, printed books, cards, certificates or
        documents.
      </p>
      <h2>Digital delivery</h2>
      <p>
        Free learning pages, practice quizzes, and the free mock test set are available on the site.
        Paid access, where applicable, is delivered digitally after a successful one-time ₹45
        payment.
      </p>
      <h2>What paid access includes</h2>
      <p>
        The paid unlock provides access to all 20 mock test sets with 15 questions per set and the
        premium learning modules described on the Platform.
      </p>
      <h2>Delivery time</h2>
      <p>
        Access is normally activated immediately after payment confirmation. If payment is debited
        but access is not enabled, contact us with your payment reference so we can verify and fix
        the issue.
      </p>
      <h2>Contact</h2>
      <p>Email: renjithraj154@gmail.com · Phone: +91 94474 80651</p>
    </LegalPage>
  ),
});
