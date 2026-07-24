import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  preferred_language: string;
};

type AuthCtx = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (uid: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, avatar_url, phone, preferred_language")
      .eq("id", uid)
      .maybeSingle();

    if (error) {
      console.error("[Auth] Failed to load profile", error);
      setProfile(null);
      return;
    }

    setProfile(data ?? null);
  };

  useEffect(() => {
    let mounted = true;

    const applySession = (sess: Session | null) => {
      if (!mounted) return;
      setSession(sess);
      setUser(sess?.user ?? null);
      if (!sess?.user) setProfile(null);
    };

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, sess) => {
      applySession(sess);
      if (sess?.user) {
        setTimeout(() => {
          if (mounted) void loadProfile(sess.user.id);
        }, 0);
      }
      setLoading(false);
    });

    supabase.auth
      .getSession()
      .then(({ data: { session: currentSession }, error }) => {
        if (error) console.error("[Auth] Failed to get initial session", error);
        applySession(currentSession ?? null);
        if (currentSession?.user) void loadProfile(currentSession.user.id);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value: AuthCtx = useMemo(
    () => ({
      user,
      session,
      profile,
      loading,
      signOut: async () => {
        const { error } = await supabase.auth.signOut();
        setSession(null);
        setUser(null);
        setProfile(null);
        if (error) throw error;
      },
      refreshProfile: async () => {
        if (user) await loadProfile(user.id);
      },
    }),
    [loading, profile, session, user],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used inside <AuthProvider>");
  return v;
}
