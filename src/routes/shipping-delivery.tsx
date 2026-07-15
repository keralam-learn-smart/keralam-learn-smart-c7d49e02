import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/shipping-delivery")({
  head: () => ({
    meta: [
      { title: "Shipping & Delivery Policy — Traffic Tips" },
      { name: "description", content: "Traffic Tips provides digital educational products only. No physical products are shipped. Content is delivered instantly after payment." },
      { property: "og:title", content: "Shipping & Delivery Policy — Traffic Tips" },
      { property: "og:description", content: "Digital products delivered instantly. No physical shipping." },
    ],
    links: [
      { rel: "canonical", href: "https://keralam-learn-smart.vercel.app/shipping-delivery" },
    ],
  }),
  component: () => (
    <LegalPage titleEn="Shipping & Delivery Policy" titleMl="ഷിപ്പിംഗ് & ഡെലിവറി നയം">
      <h2>1. Digital products only</h2>
      <p>
        Traffic Tips provides digital educational products only. This includes mock tests,
        practice quizzes, study guides, AI-assisted learning tools and other digital content
        for Kerala RTO Learner Licence preparation.
      </p>

      <h2>2. No physical shipping</h2>
      <p>
        No physical products are shipped. We do not ship or deliver any physical goods,
        printed materials, CDs, DVDs or hardware of any kind.
      </p>

      <h2>3. Instant delivery</h2>
      <p>
        Purchased content is delivered instantly after successful payment. Once your
        payment is confirmed, you will get immediate access to the purchased digital
        content through your account on the Platform.
      </p>

      <h2>4. Technical delays</h2>
      <p>
        In rare cases of technical issues (such as server downtime, payment gateway
        delays or network problems), delivery may take up to 24 hours. If you do not
        receive access within this period, please contact us.
      </p>

      <h2>5. Contact support</h2>
      <p>
        If you have completed a successful payment but have not received access to your
        purchased content, please contact our support team:
      </p>
      <ul>
        <li><strong>Email:</strong> renjithraj154@gmail.com</li>
        <li><strong>Phone:</strong> +91 94474 80651</li>
        <li><strong>Address:</strong> Plavarthala Lane, Thamalam, Karamana, Thiruvananthapuram – 695012, Kerala, India</li>
      </ul>
      <p>
        Our support team aims to respond within 48 hours during business days. Please
        include your transaction ID and payment confirmation for faster assistance.
      </p>
    </LegalPage>
  ),
});
