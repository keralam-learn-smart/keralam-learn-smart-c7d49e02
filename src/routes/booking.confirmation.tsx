import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { PaymentShell, StatusCard } from "@/components/payment-placeholders";
import { createCanonicalLink, createOpenGraphMeta } from "@/lib/seo";
export const Route = createFileRoute("/booking/confirmation")({
  head: () => {
    const title = "Booking Confirmation Placeholder — Traffic Tips";
    const description =
      "Inactive booking confirmation structure for future learner training bookings.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        ...createOpenGraphMeta({ title, description }),
      ],
      links: [createCanonicalLink("/booking/confirmation")],
    };
  },
  component: Page,
});
function Page() {
  return (
    <SiteLayout>
      <PaymentShell
        title="Booking Confirmation"
        description="This page is ready to show confirmed learner support bookings after future integration."
      >
        <StatusCard status="confirmation" />
      </PaymentShell>
    </SiteLayout>
  );
}
