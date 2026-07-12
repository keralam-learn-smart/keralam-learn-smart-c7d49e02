import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useSite } from "@/lib/site-context";

export const Route = createFileRoute("/auth/forgot-password")({
  ssr: false,
  head: () => ({
    meta: [{ title: "Forgot Password — Traffic Tips" }, { name: "robots", content: "noindex" }],
  }),
  component: ForgotPasswordPage,
});

const emailSchema = z.string().trim().email("Enter a valid email").max(255);

function ForgotPasswordPage() {
  const { lang } = useSite();
  const ml = lang === "ml" ? "lang-ml" : "";
  const t = (en: string, m: string) => (lang === "en" ? en : m);

  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const parsed = emailSchema.safeParse(email);
      if (!parsed.success) {
        toast.error(parsed.error.issues[0].message);
        return;
      }
      const { error } = await supabase.auth.resetPasswordForEmail(parsed.data, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (error) {
        toast.error(error.message);
        return;
      }
      setSent(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-10">
      <Link to="/auth" className={`mb-6 text-sm text-muted-foreground hover:text-primary ${ml}`}>
        ← {t("Back to sign in", "സൈൻ ഇൻ ലേക്ക്")}
      </Link>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h1 className={`text-2xl font-bold ${ml}`}>
          {t("Forgot your password?", "പാസ്‌വേഡ് മറന്നോ?")}
        </h1>
        <p className={`mt-1 text-sm text-muted-foreground ${ml}`}>
          {t(
            "Enter your email and we'll send you a reset link.",
            "നിങ്ങളുടെ ഇമെയിൽ നൽകുക, ഞങ്ങൾ ഒരു റീസെറ്റ് ലിങ്ക് അയക്കും.",
          )}
        </p>

        {sent ? (
          <div className="mt-6 rounded-xl border border-border bg-muted/50 p-4 text-center">
            <p className={`text-sm font-medium ${ml}`}>
              {t("Check your inbox!", "നിങ്ങളുടെ ഇൻബോക്‌സ് പരിശോധിക്കുക!")}
            </p>
            <p className={`mt-1 text-xs text-muted-foreground ${ml}`}>
              {t(
                "If that email exists in our system, a reset link has been sent.",
                "ആ ഇമെയിൽ ഞങ്ങളുടെ സിസ്റ്റത്തിൽ ഉണ്ടെങ്കിൽ, ഒരു റീസെറ്റ് ലിങ്ക് അയച്ചിട്ടുണ്ട്.",
              )}
            </p>
            <Link
              to="/auth"
              className={`mt-4 inline-block text-xs text-primary hover:underline ${ml}`}
            >
              {t("Back to sign in", "സൈൻ ഇൻ ലേക്ക്")}
            </Link>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="email" className={ml}>
                {t("Email", "ഇമെയിൽ")}
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={busy}>
              {busy
                ? t("Sending…", "അയക്കുന്നു…")
                : t("Send reset link", "റീസെറ്റ് ലിങ്ക് അയക്കുക")}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
