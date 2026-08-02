import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { OrderSummaryCard, PaymentShell, StatusCard } from "@/components/payment-placeholders";
import { createCanonicalLink, createOpenGraphMeta } from "@/lib/seo";
export const Route = createFileRoute("/invoice")({
  head: () => {
    const title = "Invoice Layout Placeholder — Traffic Tips";
    const description =
      "Inactive invoice layout prepared for future order billing after payment integration.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        ...createOpenGraphMeta({ title, description }),
      ],
      links: [createCanonicalLink("/invoice")],
    };
  },
  component: Page,
});
function Page() {
  return (
    <SiteLayout>
      <PaymentShell
        title="Invoice Layout"
        description="A consistent invoice layout is ready for future downloadable receipts and business billing."
      >
        <StatusCard status="invoice" />
        <OrderSummaryCard />
      </PaymentShell>
    </SiteLayout>
  );
}
