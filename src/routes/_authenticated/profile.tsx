import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { LogOut, User, Mail, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";
import { useSite } from "@/lib/site-context";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "My Profile — Traffic Tips" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProfilePage,
});

const schema = z.object({
  full_name: z.string().trim().min(1, "Name is required").max(80),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
});

function ProfilePage() {
  const { user, profile, refreshProfile, signOut } = useAuth();
  const { lang } = useSite();
  const navigate = useNavigate();
  const ml = lang === "ml" ? "lang-ml" : "";
  const t = (en: string, m: string) => (lang === "en" ? en : m);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFullName(profile?.full_name ?? "");
    setPhone(profile?.phone ?? "");
  }, [profile]);

  const initials = (profile?.full_name || user?.email || "U")
    .split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase();

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const parsed = schema.safeParse({ full_name: fullName, phone });
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        full_name: parsed.data.full_name,
        phone: parsed.data.phone || null,
        preferred_language: lang,
      }, { onConflict: "id" });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(t("Profile saved", "പ്രൊഫൈൽ സംരക്ഷിച്ചു"));
    refreshProfile();
  };

  const onSignOut = async () => {
    await signOut();
    toast.success(t("Signed out", "സൈൻ ഔട്ട് ചെയ്തു"));
    navigate({ to: "/" });
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 flex items-center gap-4">
        <Avatar className="h-16 w-16">
          {profile?.avatar_url ? <AvatarImage src={profile.avatar_url} alt="" /> : null}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <h1 className={`truncate text-2xl font-bold ${ml}`}>
            {profile?.full_name || t("Welcome", "സ്വാഗതം")}
          </h1>
          <p className="truncate text-sm text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      <form onSubmit={onSave} className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className={`text-lg font-semibold ${ml}`}>
          {t("Profile Details", "പ്രൊഫൈൽ വിശദാംശങ്ങൾ")}
        </h2>

        <div>
          <Label htmlFor="full_name" className={`flex items-center gap-2 ${ml}`}>
            <User className="h-4 w-4" /> {t("Full name", "പേര്")}
          </Label>
          <Input id="full_name" value={fullName} onChange={(e) => setFullName(e.target.value)} maxLength={80} />
        </div>

        <div>
          <Label className="flex items-center gap-2"><Mail className="h-4 w-4" /> {t("Email", "ഇമെയിൽ")}</Label>
          <Input value={user?.email ?? ""} disabled />
        </div>

        <div>
          <Label htmlFor="phone" className={`flex items-center gap-2 ${ml}`}>
            <Phone className="h-4 w-4" /> {t("Phone (optional)", "ഫോൺ (ഓപ്ഷണൽ)")}
          </Label>
          <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91…" maxLength={20} />
        </div>

        <div>
          <Label className="flex items-center gap-2"><Globe className="h-4 w-4" /> {t("Preferred language", "ഭാഷ")}</Label>
          <Input value={lang === "en" ? "English" : "മലയാളം"} disabled />
          <p className="mt-1 text-xs text-muted-foreground">
            {t("Use the globe icon in the header to switch.", "ഹെഡറിലെ ഗ്ലോബ് ഐക്കൺ ഉപയോഗിച്ച് മാറ്റാം.")}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2">
          <Button type="submit" disabled={saving}>
            {saving ? t("Saving…", "സംരക്ഷിക്കുന്നു…") : t("Save changes", "സംരക്ഷിക്കുക")}
          </Button>
          <Button type="button" variant="outline" onClick={onSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            {t("Sign out", "സൈൻ ഔട്ട്")}
          </Button>
          <Button type="button" variant="ghost" asChild>
            <Link to="/quiz">{t("Continue learning", "പഠനം തുടരുക")}</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}