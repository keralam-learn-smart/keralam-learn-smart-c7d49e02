import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { useSite, LANGUAGES, type Lang } from "@/lib/site-context";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Traffic Tips" },
      { name: "description", content: "Manage your preferences: theme, language, notifications and privacy." },
    ],
    links: [{ rel: "canonical", href: "https://keralam-learn-smart.lovable.app/settings" }],
  }),
  component: SettingsPage,
});

const NOTIF_KEY = "tt_notif";
const ANALYTICS_KEY = "tt_analytics_opt_out";

function SettingsPage() {
  const { lang, setLang, dark, toggleDark } = useSite();
  const t = (en: string, m: string) => (lang === "en" ? en : m);
  const ml = lang === "ml" ? "lang-ml" : "";
  const [notif, setNotif] = useState(false);
  const [optOut, setOptOut] = useState(false);

  useEffect(() => {
    setNotif(localStorage.getItem(NOTIF_KEY) === "1");
    setOptOut(localStorage.getItem(ANALYTICS_KEY) === "1");
  }, []);

  const toggleNotif = async (v: boolean) => {
    if (v && "Notification" in window) {
      const p = await Notification.requestPermission();
      if (p !== "granted") { toast.error(t("Notification permission denied", "അനുമതി നിഷേധിച്ചു")); return; }
    }
    setNotif(v); localStorage.setItem(NOTIF_KEY, v ? "1" : "0");
    toast.success(t("Notification preference saved", "സജ്ജീകരണം സംരക്ഷിച്ചു"));
  };

  const toggleOptOut = (v: boolean) => {
    setOptOut(v); localStorage.setItem(ANALYTICS_KEY, v ? "1" : "0");
    toast.success(t("Privacy preference saved", "സ്വകാര്യതാ സജ്ജീകരണം സംരക്ഷിച്ചു"));
  };

  const Row = ({ title, desc, control }: { title: string; desc: string; control: React.ReactNode }) => (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-border p-4">
      <div><p className="font-medium">{title}</p><p className="text-xs text-muted-foreground">{desc}</p></div>
      {control}
    </div>
  );

  return (
    <SiteLayout>
      <article className={`mx-auto max-w-2xl px-4 py-8 ${ml}`}>
        <h1 className="text-3xl font-bold">{t("Settings", "സജ്ജീകരണങ്ങൾ")}</h1>
        <div className="mt-6 space-y-3">
          <Row
            title={t("Dark mode", "ഡാർക്ക് മോഡ്")}
            desc={t("Switch between light and dark theme.", "ലൈറ്റും ഡാർക്കും തമ്മിൽ മാറുക.")}
            control={<Switch checked={dark} onCheckedChange={toggleDark} />}
          />
          <div className="rounded-lg border border-border p-4">
            <p className="font-medium">{t("Language", "ഭാഷ")}</p>
            <p className="text-xs text-muted-foreground">{t("Choose your preferred language.", "നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക.")}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {LANGUAGES.map((l) => (
                <Button
                  key={l.code}
                  variant={lang === l.code ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLang(l.code as Lang)}
                >{l.native}</Button>
              ))}
            </div>
          </div>
          <Row
            title={t("Notifications", "അറിയിപ്പുകൾ")}
            desc={t("Allow study reminders and updates in your browser.", "ബ്രൗസറിൽ പഠന ഓർമ്മപ്പെടുത്തലുകൾ.")}
            control={<Switch checked={notif} onCheckedChange={toggleNotif} />}
          />
          <Row
            title={t("Opt out of analytics", "അനലിറ്റിക്സിൽ നിന്ന് ഒഴിവാകുക")}
            desc={t("Disable anonymous usage analytics on this device.", "ഈ ഉപകരണത്തിൽ അനലിറ്റിക്സ് നിർജ്ജീവമാക്കുക.")}
            control={<Switch checked={optOut} onCheckedChange={toggleOptOut} />}
          />
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button asChild variant="outline"><Link to="/profile">{t("Edit Profile", "പ്രൊഫൈൽ")}</Link></Button>
          <Button asChild variant="outline"><Link to="/privacy">{t("Privacy Policy", "സ്വകാര്യതാ നയം")}</Link></Button>
          <Button asChild variant="outline"><Link to="/data-protection">{t("Data Protection", "ഡാറ്റ സംരക്ഷണം")}</Link></Button>
        </div>
      </article>
    </SiteLayout>
  );
}