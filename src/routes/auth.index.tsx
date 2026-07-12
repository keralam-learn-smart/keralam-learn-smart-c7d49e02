import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useSite } from "@/lib/site-context";

export const Route = createFileRoute("/auth/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Sign In — Traffic Tips" },
      {
        name: "description",
        content:
          "Sign in or create a Traffic Tips account to track your learning progress, mock-test scores and bookings.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const emailSchema = z.string().trim().email("Enter a valid email").max(255);
const passwordSchema = z.string().min(6, "Min 6 characters").max(72);
const nameSchema = z.string().trim().min(1, "Name is required").max(80);

function AuthPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { lang } = useSite();
  const ml = lang === "ml" ? "lang-ml" : "";
  const t = (en: string, m: string) => (lang === "en" ? en : m);

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/profile" });
  }, [loading, user, navigate]);

  const onGoogle = async () => {
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/auth/callback",
        },
      });
      if (error) {
        toast.error(error.message ?? "Google sign-in failed");
        setBusy(false);
        return;
      }
      // Supabase performs a full-page redirect to Google, so execution
      // stops here — no further navigation needed on this page.
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Sign-in failed");
      setBusy(false);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const parsedEmail = emailSchema.safeParse(email);
      const parsedPwd = passwordSchema.safeParse(password);
      if (!parsedEmail.success) return toast.error(parsedEmail.error.issues[0].message);
      if (!parsedPwd.success) return toast.error(parsedPwd.error.issues[0].message);

      if (mode === "signup") {
        const parsedName = nameSchema.safeParse(fullName);
        if (!parsedName.success) return toast.error(parsedName.error.issues[0].message);
        const { error } = await supabase.auth.signUp({
          email: parsedEmail.data,
          password: parsedPwd.data,
          options: {
            emailRedirectTo: `${window.location.origin}/profile`,
            data: { full_name: parsedName.data },
          },
        });
        if (error) return toast.error(error.message);
        toast.success(
          t(
            "Account created — check your email to confirm.",
            "അക്കൗണ്ട് സൃഷ്ടിച്ചു — ഇമെയിൽ പരിശോധിക്കുക.",
          ),
        );
        navigate({ to: "/profile" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: parsedEmail.data,
          password: parsedPwd.data,
        });
        if (error) return toast.error(error.message);
        toast.success(t("Welcome back!", "സ്വാഗതം!"));
        navigate({ to: "/profile" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-10">
      <Link to="/" className={`mb-6 text-sm text-muted-foreground hover:text-primary ${ml}`}>
        ← {t("Back to home", "ഹോമിലേക്ക്")}
      </Link>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h1 className={`text-2xl font-bold ${ml}`}>{t("Traffic Tips", "ട്രാഫിക് ടിപ്സ്")}</h1>
        <p className={`mt-1 text-sm text-muted-foreground ${ml}`}>
          {t(
            "Sign in to save progress, take mock tests and book training.",
            "പുരോഗതി സംരക്ഷിക്കാൻ സൈൻ ഇൻ ചെയ്യുക.",
          )}
        </p>

        <Button
          type="button"
          variant="outline"
          className="mt-6 w-full"
          onClick={onGoogle}
          disabled={busy}
        >
          <GoogleIcon />
          {t("Continue with Google", "Google ഉപയോഗിച്ച് തുടരുക")}
        </Button>

        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" />
          {t("or", "അല്ലെങ്കിൽ")}
          <div className="h-px flex-1 bg-border" />
        </div>

        <Tabs value={mode} onValueChange={(v) => setMode(v as "signin" | "signup")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin" className={ml}>
              {t("Sign In", "സൈൻ ഇൻ")}
            </TabsTrigger>
            <TabsTrigger value="signup" className={ml}>
              {t("Sign Up", "സൈൻ അപ്പ്")}
            </TabsTrigger>
          </TabsList>

          <form onSubmit={onSubmit} className="mt-4 space-y-3">
            <TabsContent value="signup" className="m-0 space-y-3">
              <div>
                <Label htmlFor="name" className={ml}>
                  {t("Full name", "പേര്")}
                </Label>
                <Input
                  id="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t("Your name", "നിങ്ങളുടെ പേര്")}
                  autoComplete="name"
                />
              </div>
            </TabsContent>

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
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className={ml}>
                  {t("Password", "പാസ്‌വേഡ്")}
                </Label>
                {mode === "signin" && (
                  <Link
                    to="/auth/forgot-password"
                    className={`text-xs text-muted-foreground hover:text-primary ${ml}`}
                  >
                    {t("Forgot password?", "പാസ്‌വേഡ് മറന്നോ?")}
                  </Link>
                )}
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={busy}>
              {busy
                ? t("Please wait…", "ദയവായി കാത്തിരിക്കുക…")
                : mode === "signin"
                  ? t("Sign In", "സൈൻ ഇൻ ചെയ്യുക")
                  : t("Create Account", "അക്കൗണ്ട് സൃഷ്ടിക്കുക")}
            </Button>
          </form>
        </Tabs>

        <p className={`mt-4 text-center text-xs text-muted-foreground ${ml}`}>
          {t("By continuing you agree to our ", "തുടരുന്നതിലൂടെ നിങ്ങൾ ഞങ്ങളുടെ ")}
          <Link to="/terms" className="underline">
            {t("Terms", "നിബന്ധനകൾ")}
          </Link>
          {" & "}
          <Link to="/privacy" className="underline">
            {t("Privacy Policy", "സ്വകാര്യതാ നയം")}
          </Link>
          {t(".", "സമ്മതിക്കുന്നു.")}
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.8 32.4 29.3 35.5 24 35.5c-6.3 0-11.5-5.2-11.5-11.5S17.7 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.7 6.4 29.1 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.4-.3-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 16 19 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.7 6.4 29.1 4.5 24 4.5 16.3 4.5 9.7 8.6 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 43.5c5 0 9.6-1.9 13.1-5.1l-6-5.1c-2 1.4-4.5 2.2-7.1 2.2-5.2 0-9.7-3.1-11.4-7.6L6 33.1C9.3 39.3 16.1 43.5 24 43.5z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6 5.1C40.7 35.4 43.5 30.2 43.5 24c0-1.2-.1-2.4-.3-3.5z"
      />
    </svg>
  );
}
