import { Link } from "@tanstack/react-router";
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  History,
  ReceiptText,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const paymentNav = [
  { to: "/pricing", label: "Pricing" },
  { to: "/checkout", label: "Checkout" },
  { to: "/payment/success", label: "Payment Success" },
  { to: "/payment/failed", label: "Payment Failed" },
  { to: "/booking/confirmation", label: "Booking Confirmation" },
  { to: "/booking/history", label: "Booking History" },
  { to: "/invoice", label: "Invoice Layout" },
];

export function PaymentReadyNotice() {
  return (
    <Card className="border-dashed p-4">
      <div className="flex gap-3">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 className="font-semibold">Payment integration is not active yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            This production-ready placeholder keeps the future Razorpay or Cashfree flow organized
            without collecting payment details, creating orders, or charging learners.
          </p>
        </div>
      </div>
    </Card>
  );
}

export function PaymentShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <section className="rounded-3xl bg-gradient-to-br from-primary via-primary to-accent p-6 text-primary-foreground shadow-lg sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-wide opacity-85">
          Future payment module
        </p>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm opacity-90 sm:text-base">{description}</p>
      </section>
      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="space-y-4">{children}</div>
        <aside className="space-y-3">
          <PaymentReadyNotice />
          <Card className="p-4">
            <h2 className="font-semibold">Payment pages</h2>
            <nav className="mt-3 grid gap-2" aria-label="Payment placeholder pages">
              {paymentNav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-primary/10 hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </Card>
        </aside>
      </div>
    </div>
  );
}

export function PricingCards() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {[
        ["Starter", "Free", "Browse educational guides, signs, signals and basic practice."],
        [
          "Full Access",
          "₹45",
          "Planned one-time unlock for complete tests, AI guidance and revision tools.",
        ],
        [
          "Trainer Support",
          "Manual",
          "Future booking workflow for learner coaching and documentation support.",
        ],
      ].map(([name, price, text]) => (
        <Card key={name} className="p-5 transition hover:border-primary hover:shadow-lg">
          <h2 className="text-lg font-bold">{name}</h2>
          <p className="mt-2 text-3xl font-extrabold text-primary">{price}</p>
          <p className="mt-2 text-sm text-muted-foreground">{text}</p>
          <Button className="mt-4 w-full" disabled aria-disabled="true">
            Integration pending
          </Button>
        </Card>
      ))}
    </div>
  );
}

export function OrderSummaryCard() {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2">
        <ReceiptText className="h-5 w-5 text-primary" />
        <h2 className="font-semibold">Order Summary</h2>
      </div>
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt>Kerala RTO full access</dt>
          <dd>₹45</dd>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <dt>Gateway charges</dt>
          <dd>Shown at launch</dd>
        </div>
        <div className="border-t pt-2 font-semibold flex justify-between">
          <dt>Total payable</dt>
          <dd>₹45</dd>
        </div>
      </dl>
    </Card>
  );
}

export function CheckoutSteps() {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2">
        <CreditCard className="h-5 w-5 text-primary" />
        <h2 className="font-semibold">Checkout Structure</h2>
      </div>
      <ol className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
        {[
          ["1", "Review plan"],
          ["2", "Create secure order"],
          ["3", "Return to confirmation"],
        ].map(([n, label]) => (
          <li key={n} className="rounded-xl bg-muted p-4">
            <span className="font-bold text-primary">Step {n}</span>
            <br />
            {label}
          </li>
        ))}
      </ol>
    </Card>
  );
}

export function StatusCard({
  status,
}: {
  status: "success" | "failed" | "confirmation" | "history" | "invoice";
}) {
  const map = {
    success: [
      CheckCircle2,
      "Payment Success",
      "A successful payment screen will show transaction ID, plan, date and next actions.",
    ],
    failed: [
      XCircle,
      "Payment Failed",
      "A failed payment screen will explain safe retry steps and support options.",
    ],
    confirmation: [
      CalendarCheck,
      "Booking Confirmation",
      "Booking confirmation will show trainer slot, learner details and contact instructions.",
    ],
    history: [
      History,
      "Booking History",
      "Learners will see previous bookings, payment status and support references here.",
    ],
    invoice: [
      FileText,
      "Invoice Layout",
      "The invoice template will display GST-ready fields when business billing is enabled.",
    ],
  } as const;
  const [Icon, title, text] = map[status];
  return (
    <Card className="p-5">
      <Icon className="h-8 w-8 text-primary" />
      <h2 className="mt-3 text-xl font-bold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
      <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium">
        <Clock className="h-3.5 w-3.5" />
        Inactive until payment integration
      </p>
    </Card>
  );
}
