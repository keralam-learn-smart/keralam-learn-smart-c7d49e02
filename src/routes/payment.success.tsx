import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SiteLayout } from "@/components/site-layout";
import { verifyPaymentStatus } from "@/lib/instamojo.functions";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

const searchSchema = z.object({
  payment_id: z.string().optional(),
  payment_request_id: z.string().optional(),
  payment_status: z.string().optional(),
});

export const Route = createFileRoute("/payment/success")({
  validateSearch: (s: Record<string, unknown>) => searchSchema.parse(s),
  head: () => ({
    meta: [{ title: "Payment Status — Kerala RTO" }, { name: "robots", content: "noindex" }],
  }),
  component: PaymentSuccessPage,
});

type State = { kind: "verifying" } | { kind: "success" } | { kind: "failed"; message: string };

function PaymentSuccessPage() {
  const { payment_id, payment_request_id, payment_status } = Route.useSearch();
  const verify = useServerFn(verifyPaymentStatus);
  const [state, setState] = useState<State>({ kind: "verifying" });

  useEffect(() => {
    if (!payment_request_id) {
      setState({
        kind: "failed",
        message: "Missing payment reference. If you were charged, contact support.",
      });
      return;
    }
    verify({ data: { paymentRequestId: payment_request_id, paymentId: payment_id } })
      .then((r) => {
        if (r.status === "completed") setState({ kind: "success" });
        else if (r.status === "failed")
          setState({ kind: "failed", message: "Payment was not successful. Please try again." });
        else
          setState({
            kind: "failed",
            message:
              "Your payment is still processing. Refresh in a moment, or contact support if it doesn't complete.",
          });
      })
      .catch((e) => {
        console.error(e);
        setState({
          kind: "failed",
          message: "Could not verify payment. If money was deducted, contact support.",
        });
      });
  }, [payment_id, payment_request_id, verify]);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-lg px-4 py-10">
        {state.kind === "verifying" && (
          <Card className="p-8 text-center">
            <Loader2 className="mx-auto mb-3 h-10 w-10 animate-spin text-primary" />
            <h1 className="text-xl font-bold">Verifying your payment…</h1>
            <p className="mt-2 text-sm text-muted-foreground">Please don't close this tab.</p>
          </Card>
        )}
        {state.kind === "success" && (
          <Card className="border-green-600 p-8 text-center">
            <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-green-600" />
            <h1 className="text-2xl font-bold text-green-700">Payment successful!</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Full access has been unlocked on your account.
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <Link to="/quiz" className="flex-1">
                <Button size="lg" className="w-full rounded-full">
                  Start Practice Tests
                </Button>
              </Link>
              <Link to="/" className="flex-1">
                <Button size="lg" variant="outline" className="w-full rounded-full">
                  Home
                </Button>
              </Link>
            </div>
          </Card>
        )}
        {state.kind === "failed" && (
          <Card className="border-destructive p-8 text-center">
            <XCircle className="mx-auto mb-3 h-12 w-12 text-destructive" />
            <h1 className="text-2xl font-bold text-destructive">
              {payment_status === "Credit" ? "Verification pending" : "Payment issue"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">{state.message}</p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <Link to="/unlock" className="flex-1">
                <Button size="lg" className="w-full rounded-full">
                  Try again
                </Button>
              </Link>
              <Link to="/contact" className="flex-1">
                <Button size="lg" variant="outline" className="w-full rounded-full">
                  Contact support
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </SiteLayout>
  );
}
