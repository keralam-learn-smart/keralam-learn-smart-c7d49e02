import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useSite } from "@/lib/site-context";

export const Route = createFileRoute("/auth/reset-password")({
  ssr: false,
  head: () => ({
    meta: [{ title: "Reset Password — Traffic Tips" }, { name: "robots", content: "noindex" }],
  }),
  component: ResetPasswordPage,
});

const passwordSchema = z.string().min(6, "Min 6 characters").max(72);

type PageState = "waiting" | "ready" | "done" | "error";

function ResetPasswordPage() {
  const navigate = useNavigate();
  const { lang } = useSite();
  const ml = lang === "ml" ? "lang-ml" : "";
  const t = (en: string, m: string) => (lang === "en" ? en : m);

  const [pageState, setPageState] = useState<PageState>("waiting");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // Supabase automatically exchanges the token in the URL hash/code param.
    // We listen for the PASSWORD_RECOVERY event to know when it's ready.
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setPageState("ready");
      }
    });

    // Also check if there's already a recovery session (e.g. page refresh).
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        // If we arrived here without a PASSWORD_RECOVERY event but have a session,
        // the token may have been processed already. Show the form.
        setPageState((prev) => (prev === "waiting" ? "ready" : prev));
      }
    });

    // Timeout: if no recovery event after 8s, the link is invalid/expired.
    const timer = setTimeout(() => {
      setPageState((prev) => {
        if (prev === "waiting") return "error";
        return prev;
      });
    }, 8000);

    return () => {
      sub.subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = passwordSchema.safeParse(password);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    if (password !== confirm) {
      toast.error(t("Passwords do not match.", "പാസ്‌വേഡുകൾ പൊരുത്തപ്പെടുന്നില്ല."));
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: parsed.data });
      if (error) {
        toast.error(error.message);
        return;
      }
      setPageState("done");
      toast.success(t("Password updated!", "പാസ്‌വേഡ് അപ്ഡേറ്റ് ചെയ്തു!"));
      setTimeout(() => navigate({ to: "/profile" }), 1500);
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
          {t("Set a new password", "പുതിയ പാസ്‌വേഡ് സജ്ജമാക്കുക")}
        </h1>

        {pageState === "waiting" && (
          <p className={`mt-4 text-sm text-muted-foreground ${ml}`}>
            {t("Verifying your reset link…", "നിങ്ങളുടെ റീസെറ്റ് ലിങ്ക് പരിശോധിക്കുന്നു…")}
          </p>
        )}

        {pageState === "error" && (
          <div className="mt-4 space-y-3">
            <p className={`text-sm text-destructive ${ml}`}>
              {t(
                "This reset link is invalid or has expired.",
                "ഈ റീസെറ്റ് ലിങ്ക് അസാധുവാണ് അല്ലെങ്കിൽ കാലഹരണപ്പെട്ടു.",
              )}
            </p>
            <Link
              to="/auth/forgot-password"
              className={`inline-block text-sm text-primary hover:underline ${ml}`}
            >
              {t("Request a new link", "പുതിയ ലിങ്ക് അഭ്യർത്ഥിക്കുക")}
            </Link>
          </div>
        )}

        {pageState === "done" && (
          <p className={`mt-4 text-sm text-muted-foreground ${ml}`}>
            {t(
              "Password updated! Redirecting…",
              "പാസ്‌വേഡ് അപ്ഡേറ്റ് ചെയ്തു! റീഡയറക്‌ട് ചെയ്യുന്നു…",
            )}
          </p>
        )}

        {pageState === "ready" && (
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <p className={`text-sm text-muted-foreground ${ml}`}>
              {t(
                "Choose a strong password of at least 6 characters.",
                "കുറഞ്ഞത് 6 അക്ഷരങ്ങൾ ഉള്ള ഒരു ശക്തമായ പാസ്‌വേഡ് തിരഞ്ഞെടുക്കുക.",
              )}
            </p>
            <div>
              <Label htmlFor="password" className={ml}>
                {t("New password", "പുതിയ പാസ്‌വേഡ്")}
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                required
              />
            </div>
            <div>
              <Label htmlFor="confirm" className={ml}>
                {t("Confirm password", "പാസ്‌വേഡ് സ്ഥിരീകരിക്കുക")}
              </Label>
              <Input
                id="confirm"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={busy}>
              {busy
                ? t("Updating…", "അപ്ഡേറ്റ് ചെയ്യുന്നു…")
                : t("Update password", "പാസ്‌വേഡ് അപ്ഡേറ്റ് ചെയ്യുക")}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
