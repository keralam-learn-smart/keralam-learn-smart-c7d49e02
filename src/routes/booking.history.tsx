import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { PaymentShell, StatusCard } from "@/components/payment-placeholders";
import { createCanonicalLink, createOpenGraphMeta } from "@/lib/seo";
export const Route = createFileRoute("/booking/history")({
  head: () => {
    const title = "Booking History Placeholder — Traffic Tips";
    const description =
      "Inactive booking history structure for future learner support and payment records.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        ...createOpenGraphMeta({ title, description }),
      ],
      links: [createCanonicalLink("/booking/history")],
    };
  },
  component: Page,
});
function Page() {
  return (
    <SiteLayout>
      <PaymentShell
        title="Booking History"
        description="Future learners can review booking references, training status and support details here."
      >
        <StatusCard status="history" />
      </PaymentShell>
    </SiteLayout>
  );
}
