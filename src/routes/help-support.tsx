import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { useSite } from "@/lib/site-context";
import { FeedbackDialog } from "@/components/feedback-dialog";
import { Button } from "@/components/ui/button";
import { LifeBuoy, MessageSquare, Bug, Mail } from "lucide-react";

export const Route = createFileRoute("/help-support")({
  head: () => ({
    meta: [
      { title: "Help & Support — Traffic Tips" },
      {
        name: "description",
        content: "Get help with Traffic Tips: FAQs, contact, bug reports and feedback.",
      },
    ],
    links: [{ rel: "canonical", href: "https://keralam-learn-smart.lovable.app/help-support" }],
  }),
  component: HelpPage,
});

function HelpPage() {
  const { lang } = useSite();
  const t = (en: string, m: string) => (lang === "en" ? en : m);
  const ml = lang === "ml" ? "lang-ml" : "";
  const cards = [
    {
      icon: LifeBuoy,
      title: t("Browse FAQs", "സാധാരണ ചോദ്യങ്ങൾ"),
      desc: t("Find quick answers to common questions.", "സാധാരണ സംശയങ്ങൾക്ക് ഉത്തരം."),
      to: "/faq",
    },
    {
      icon: Mail,
      title: t("Contact Us", "ബന്ധപ്പെടുക"),
      desc: t("Email our support team directly.", "ഞങ്ങളുടെ സപ്പോർട്ട് ടീമിന് ഇമെയിൽ ചെയ്യുക."),
      to: "/contact",
    },
  ];
  return (
    <SiteLayout>
      <article className={`mx-auto max-w-3xl px-4 py-8 ${ml}`}>
        <h1 className="text-3xl font-bold">{t("Help & Support", "സഹായം & പിന്തുണ")}</h1>
        <p className="mt-2 text-muted-foreground">
          {t(
            "We're here to help you pass your RTO test.",
            "RTO ടെസ്റ്റ് വിജയിക്കാൻ ഞങ്ങൾ സഹായിക്കും.",
          )}
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {cards.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="flex items-start gap-3 rounded-lg border border-border p-4 hover:bg-primary/5"
            >
              <c.icon className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold">{c.title}</p>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </div>
            </Link>
          ))}
          <FeedbackDialog kind="feedback">
            <button className="flex items-start gap-3 rounded-lg border border-border p-4 text-left hover:bg-primary/5">
              <MessageSquare className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold">{t("Send Feedback", "അഭിപ്രായം")}</p>
                <p className="text-sm text-muted-foreground">
                  {t("Share your thoughts about Traffic Tips.", "നിങ്ങളുടെ അഭിപ്രായം പങ്കിടുക.")}
                </p>
              </div>
            </button>
          </FeedbackDialog>
          <FeedbackDialog kind="bug">
            <button className="flex items-start gap-3 rounded-lg border border-border p-4 text-left hover:bg-primary/5">
              <Bug className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold">{t("Report a Bug", "ബഗ് റിപ്പോർട്ട്")}</p>
                <p className="text-sm text-muted-foreground">
                  {t("Tell us what's not working.", "എന്താണ് ശരിയല്ലെന്ന് അറിയിക്കുക.")}
                </p>
              </div>
            </button>
          </FeedbackDialog>
        </div>
        <div className="mt-8">
          <Button asChild variant="outline">
            <Link to="/contact">{t("Open Contact Form", "ബന്ധപ്പെടാനുള്ള ഫോം")}</Link>
          </Button>
        </div>
      </article>
    </SiteLayout>
  );
}
