import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteLayout } from "@/components/site-layout";
import { useAuth } from "@/lib/auth-context";
import { createInstamojoPayment, checkPaidAccess } from "@/lib/instamojo.functions";
import { toast } from "sonner";
import { CheckCircle2, Lock, Shield } from "lucide-react";

export const Route = createFileRoute("/unlock")({
  head: () => ({
    meta: [
      { title: "Unlock Full Access — Kerala RTO Learner Licence" },
      {
        name: "description",
        content:
          "One-time ₹45 payment. Unlock all 20 mock test sets, learning modules and premium features. Secure checkout via Instamojo.",
      },
    ],
  }),
  component: UnlockPage,
});

const PRICE = 45;

function UnlockPage() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const startPayment = useServerFn(createInstamojoPayment);
  const checkAccess = useServerFn(checkPaidAccess);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [alreadyPaid, setAlreadyPaid] = useState(false);

  useEffect(() => {
    if (!user) return;
    setName(profile?.full_name ?? "");
    setEmail(user.email ?? "");
    setPhone(profile?.phone ?? "");
    checkAccess()
      .then((r) => setAlreadyPaid(r.hasAccess))
      .catch(() => {});
  }, [user, profile, checkAccess]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) {
      navigate({ to: "/auth" });
      return;
    }
    if (!name.trim() || !email.trim() || !phone.trim()) {
      toast.error("Please fill in name, email and phone.");
      return;
    }
    setSubmitting(true);
    try {
      const { url } = await startPayment({
        data: { name: name.trim(), email: email.trim(), phone: phone.trim() },
      });
      window.location.href = url;
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Payment could not be started.");
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-4 py-10 text-sm text-muted-foreground">Loading…</div>
      </SiteLayout>
    );
  }

  if (!user) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-lg px-4 py-10">
          <Card className="p-6 text-center">
            <Lock className="mx-auto mb-3 h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold">Sign in to unlock full access</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Create a free account or sign in to purchase and save your access.
            </p>
            <Link to="/auth" className="mt-4 inline-block">
              <Button size="lg" className="rounded-full px-6">
                Sign in / Sign up
              </Button>
            </Link>
          </Card>
        </div>
      </SiteLayout>
    );
  }

  if (alreadyPaid) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-lg px-4 py-10">
          <Card className="border-green-600 p-6 text-center">
            <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-green-600" />
            <h1 className="text-xl font-bold">You already have full access 🎉</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              All mock tests and premium content are unlocked.
            </p>
            <Link to="/quiz" className="mt-4 inline-block">
              <Button size="lg" className="rounded-full px-6">
                Go to Practice Tests
              </Button>
            </Link>
          </Card>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-6">
        <Card className="mb-5 overflow-hidden bg-gradient-to-br from-primary to-accent p-6 text-primary-foreground">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
            <Shield className="h-3 w-3" /> Secure Checkout · Instamojo
          </span>
          <h1 className="mt-3 text-2xl font-bold sm:text-3xl">Unlock Full Access</h1>
          <p className="mt-1 text-sm opacity-90">
            One-time payment · Lifetime access · All 20 mock tests + premium modules
          </p>
          <p className="mt-4 text-4xl font-extrabold">
            ₹{PRICE}
            <span className="ml-2 align-middle text-sm font-medium opacity-80">one-time</span>
          </p>
        </Card>

        <Card className="p-5">
          <h2 className="mb-3 text-lg font-semibold">Billing details</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="+91 9XXXXXXXXX"
              />
            </div>
            <Button type="submit" size="lg" className="w-full rounded-full" disabled={submitting}>
              {submitting ? "Redirecting to Instamojo…" : `Pay ₹${PRICE} & Unlock`}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              You'll be redirected to Instamojo's secure page. All purchases are final (see{" "}
              <Link to="/refund-policy" className="underline">
                Refund Policy
              </Link>
              ).
            </p>
          </form>
        </Card>
      </div>
    </SiteLayout>
  );
}
