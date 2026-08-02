import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Lock, Eye, Database, Mail, AlertTriangle } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { Card } from "@/components/ui/card";
import { useSite } from "@/lib/site-context";

export const Route = createFileRoute("/trust")({
  head: () => ({
    meta: [
      { title: "Trust & Security — Traffic Tips" },
      {
        name: "description",
        content:
          "How Traffic Tips protects your data: authentication, privacy controls, data handling, and how to report security issues.",
      },
      { property: "og:title", content: "Trust & Security — Traffic Tips" },
      {
        property: "og:description",
        content:
          "Security, privacy and data handling practices for the Traffic Tips Kerala RTO learning app.",
      },
    ],
  }),
  component: TrustPage,
});

function TrustPage() {
  const { lang } = useSite();
  const ml = lang === "ml" ? "lang-ml" : "";
  const t = (en: string, mlText: string) => (lang === "en" ? en : mlText);

  const sections = [
    {
      icon: Lock,
      title: t("Authentication", "ഓതൻ്റിക്കേഷൻ"),
      body: t(
        "Sign-in uses email/password and Google sign-in via our authentication provider. Sessions are stored securely in your browser and can be ended any time from your profile.",
        "ഇമെയിൽ/പാസ്‌വേഡ്, Google സൈൻ-ഇൻ എന്നിവ വഴിയാണ് ലോഗിൻ. സെഷനുകൾ സുരക്ഷിതമായി ബ്രൗസറിൽ സൂക്ഷിക്കുന്നു; പ്രൊഫൈലിൽ നിന്ന് എപ്പോൾ വേണമെങ്കിലും സൈൻ ഔട്ട് ചെയ്യാം.",
      ),
    },
    {
      icon: Database,
      title: t("Data we store", "ഞങ്ങൾ സൂക്ഷിക്കുന്ന ഡാറ്റ"),
      body: t(
        "We store the minimum needed to run the app: your account identifier, name, optional avatar and phone, language preference, and your learning activity. We do not sell personal data.",
        "ആപ്പ് പ്രവർത്തിക്കാൻ ആവശ്യമായ ഏറ്റവും കുറഞ്ഞ വിവരങ്ങൾ മാത്രമേ ഞങ്ങൾ സൂക്ഷിക്കൂ: അക്കൗണ്ട് ഐഡി, പേര്, ഓപ്ഷണൽ അവതാർ, ഫോൺ, ഭാഷാ ക്രമീകരണം, പഠന ചരിത്രം. വ്യക്തിഗത ഡാറ്റ വിൽക്കില്ല.",
      ),
    },
    {
      icon: Eye,
      title: t("Profile privacy", "പ്രൊഫൈൽ സ്വകാര്യത"),
      body: t(
        "Your profile (including phone number) is visible only to you. Database access rules enforce this on the server — other users cannot read your profile.",
        "നിങ്ങളുടെ പ്രൊഫൈൽ (ഫോൺ നമ്പർ ഉൾപ്പെടെ) നിങ്ങൾക്കു മാത്രമേ കാണാനാകൂ. സെർവർ തലത്തിലെ ആക്സസ് നിയമങ്ങൾ ഇത് ഉറപ്പാക്കുന്നു.",
      ),
    },
    {
      icon: Shield,
      title: t("AI tutor usage", "AI ട്യൂട്ടർ ഉപയോഗം"),
      body: t(
        "The AI tutor requires sign-in. Your messages are sent to our AI provider only to generate answers; we do not use them for advertising. Do not share personal IDs or sensitive details in chats.",
        "AI ട്യൂട്ടർ ഉപയോഗിക്കാൻ സൈൻ ഇൻ ആവശ്യമാണ്. ഉത്തരം നൽകാൻ മാത്രമാണ് സന്ദേശങ്ങൾ AI ദാതാവിലേക്ക് അയക്കുന്നത്. വ്യക്തിഗത ഐഡികളോ സെൻസിറ്റീവ് വിവരങ്ങളോ ചാറ്റിൽ പങ്കിടരുത്.",
      ),
    },
    {
      icon: AlertTriangle,
      title: t("Report a security issue", "സുരക്ഷാ പ്രശ്നം റിപ്പോർട്ട് ചെയ്യുക"),
      body: t(
        "If you believe you have found a security vulnerability, please contact us before disclosing it publicly. We will investigate and respond promptly.",
        "ഒരു സുരക്ഷാ ദുർബലത കണ്ടെത്തിയെങ്കിൽ, പരസ്യമാക്കുന്നതിന് മുമ്പ് ഞങ്ങളെ ബന്ധപ്പെടുക. ഞങ്ങൾ വേഗത്തിൽ പരിശോധിച്ച് മറുപടി നൽകും.",
      ),
    },
  ];

  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <Shield className="h-7 w-7" />
          </div>
          <h1 className={`text-3xl font-bold ${ml}`}>
            {t("Trust & Security", "വിശ്വാസവും സുരക്ഷയും")}
          </h1>
          <p className={`mt-2 text-sm text-muted-foreground ${ml}`}>
            {t(
              "This page is maintained by the Traffic Tips team to explain how we protect your data. It is not an independent certification.",
              "ഈ പേജ് ട്രാഫിക് ടിപ്സ് ടീം പരിപാലിക്കുന്നതാണ്. ഇത് ഒരു സ്വതന്ത്ര സർട്ടിഫിക്കേഷൻ അല്ല.",
            )}
          </p>
        </div>

        <div className="space-y-4">
          {sections.map((s, i) => (
            <Card key={i} className="p-5">
              <div className="flex gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className={`mb-1 text-lg font-semibold ${ml}`}>{s.title}</h2>
                  <p className={`text-sm leading-relaxed text-muted-foreground ${ml}`}>{s.body}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-6 flex flex-wrap items-center justify-between gap-3 p-5">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-primary" />
            <p className={`text-sm ${ml}`}>
              {t("Questions or reports?", "ചോദ്യങ്ങൾ അല്ലെങ്കിൽ റിപ്പോർട്ടുകൾ?")}
            </p>
          </div>
          <Link to="/contact" className="text-sm font-medium text-primary hover:underline">
            {t("Contact us", "ഞങ്ങളെ ബന്ധപ്പെടുക")} →
          </Link>
        </Card>

        <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
          <Link to="/privacy" className="hover:text-primary hover:underline">
            {t("Privacy Policy", "സ്വകാര്യതാ നയം")}
          </Link>
          <Link to="/terms" className="hover:text-primary hover:underline">
            {t("Terms", "നിബന്ധനകൾ")}
          </Link>
          <Link to="/disclaimer" className="hover:text-primary hover:underline">
            {t("Disclaimer", "നിരാകരണം")}
          </Link>
        </div>
      </div>
    </SiteLayout>
  );
}
