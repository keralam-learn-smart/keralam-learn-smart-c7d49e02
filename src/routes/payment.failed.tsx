import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { PaymentShell, StatusCard } from "@/components/payment-placeholders";
import { createCanonicalLink, createOpenGraphMeta } from "@/lib/seo";

export const Route = createFileRoute("/payment/failed")({
  head: () => {
    const title = "Payment Failed Placeholder — Traffic Tips";
    const description =
      "Inactive payment failure screen prepared for future payment gateway integration.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        ...createOpenGraphMeta({ title, description }),
      ],
      links: [createCanonicalLink("/payment/failed")],
    };
  },
  component: PaymentFailedPage,
});
function PaymentFailedPage() {
  return (
    <SiteLayout>
      <PaymentShell
        title="Payment Failed"
        description="Learners will get clear retry and support steps here when online payments are enabled."
      >
        <StatusCard status="failed" />
      </PaymentShell>
    </SiteLayout>
  );
}
