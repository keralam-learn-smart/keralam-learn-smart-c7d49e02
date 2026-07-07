import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth/callback")({
  ssr: false,
  component: AuthCallbackPage,
});

function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    // Wait for Supabase to hydrate the session (set by the Lovable OAuth wrapper
    // via supabase.auth.setSession, or via the URL hash on full-page redirects).
    const check = async () => {
      for (let i = 0; i < 20; i++) {
        if (cancelled) return;
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          navigate({ to: "/profile" });
          return;
        }
        await new Promise((r) => setTimeout(r, 150));
      }
      if (!cancelled) navigate({ to: "/auth" });
    };

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && (event === "SIGNED_IN" || event === "INITIAL_SESSION")) {
        navigate({ to: "/profile" });
      }
    });

    check();

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="mx-auto max-w-xl p-6 text-center">
      <p className="text-sm text-muted-foreground">Signing you in…</p>
    </div>
  );
}
