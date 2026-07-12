import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund & Cancellation Policy — Traffic Tips" },
      {
        name: "description",
        content:
          "Refund and cancellation policy for Traffic Tips digital learning services and mock tests.",
      },
      { property: "og:title", content: "Refund & Cancellation Policy — Traffic Tips" },
      {
        property: "og:description",
        content: "All digital purchases on Traffic Tips are final and non-refundable.",
      },
    ],
  }),
  component: () => (
    <LegalPage titleEn="Refund & Cancellation Policy" titleMl="റീഫണ്ട് & റദ്ദാക്കൽ നയം">
      <p>
        This Refund and Cancellation Policy applies to all purchases made on Traffic Tips (the
        "Platform"), operated from Thiruvananthapuram, Kerala, India.
      </p>

      <h2>1. Nature of our services</h2>
      <p>
        Traffic Tips provides digital educational content, mock tests, practice quizzes and
        AI-assisted study tools for Kerala RTO Learner Licence preparation. All products and
        services offered on the Platform are digital in nature and are delivered instantly upon
        successful payment.
      </p>

      <h2>2. No refunds</h2>
      <p>
        <strong>All purchases made on Traffic Tips are final and strictly non-refundable.</strong>
        Since our products are digital goods that are consumed immediately after purchase, we do not
        offer refunds, exchanges, or returns for any reason, including but not limited to:
      </p>
      <ul>
        <li>Change of mind after purchase</li>
        <li>Failure to clear the RTO learner licence test</li>
        <li>Non-usage of the purchased content or mock tests</li>
        <li>Lack of familiarity with digital products</li>
        <li>
          Accidental or duplicate purchases (please review your order carefully before paying)
        </li>
      </ul>

      <h2>3. Cancellations</h2>
      <p>
        As access to digital content is granted immediately upon successful payment, orders cannot
        be cancelled once payment is confirmed.
      </p>

      <h2>4. Payment failures & duplicate charges</h2>
      <p>
        If your payment is debited from your bank account but you do not receive access to the
        purchased content, or if you are charged twice for the same order due to a technical error,
        please contact us within 7 days of the transaction with your payment reference. Verified
        duplicate or failed transactions will be reversed to the original payment method within 7–14
        business days.
      </p>

      <h2>5. Service disruptions</h2>
      <p>
        Occasional downtime for maintenance or unforeseen technical issues does not qualify for a
        refund. We will make reasonable efforts to restore service as quickly as possible.
      </p>

      <h2>6. Contact us</h2>
      <p>For questions about this policy or payment-related concerns, please reach us at:</p>
      <ul>
        <li>
          <strong>Email:</strong> renjithraj154@gmail.com
        </li>
        <li>
          <strong>Phone:</strong> +91 94474 80651
        </li>
        <li>
          <strong>Address:</strong> Plavarthala Line, Thamalam, Karamana, Thiruvananthapuram –
          695012, Kerala, India
        </li>
      </ul>
    </LegalPage>
  ),
});
