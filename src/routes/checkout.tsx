import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { CheckoutSteps, OrderSummaryCard, PaymentShell } from "@/components/payment-placeholders";
import { createCanonicalLink, createOpenGraphMeta } from "@/lib/seo";

export const Route = createFileRoute("/checkout")({
  head: () => {
    const title = "Checkout Placeholder — Traffic Tips";
    const description =
      "Inactive checkout structure for future Razorpay or Cashfree integration on Traffic Tips.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        ...createOpenGraphMeta({ title, description }),
      ],
      links: [createCanonicalLink("/checkout")],
    };
  },
  component: CheckoutPage,
});

function CheckoutPage() {
  return (
    <SiteLayout>
      <PaymentShell
        title="Checkout"
        description="This inactive checkout page documents the future purchase flow without accepting payment details."
      >
        <OrderSummaryCard />
        <CheckoutSteps />
      </PaymentShell>
    </SiteLayout>
  );
}
