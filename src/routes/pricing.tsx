import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { PaymentShell, PricingCards } from "@/components/payment-placeholders";
import { createCanonicalLink, createOpenGraphMeta } from "@/lib/seo";

export const Route = createFileRoute("/pricing")({
  head: () => {
    const title = "Pricing — Traffic Tips Kerala RTO Learning";
    const description =
      "Review planned pricing for Kerala RTO learner licence preparation. Payments are not active yet.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        ...createOpenGraphMeta({ title, description }),
      ],
      links: [createCanonicalLink("/pricing")],
    };
  },
  component: PricingPage,
});

function PricingPage() {
  return (
    <SiteLayout>
      <PaymentShell
        title="Pricing"
        description="A clear pricing structure is prepared for future premium learning access while all payment collection remains inactive."
      >
        <PricingCards />
      </PaymentShell>
    </SiteLayout>
  );
}
