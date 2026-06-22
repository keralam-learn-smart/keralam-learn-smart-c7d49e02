import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { useSite } from "@/lib/site-context";
import { FeedbackDialog } from "@/components/feedback-dialog";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/report-issue")({
  head: () => ({
    meta: [
      { title: "Report an Issue — Traffic Tips" },
      { name: "description", content: "Report bugs, incorrect answers or security issues on Traffic Tips." },
    ],
    links: [{ rel: "canonical", href: "https://keralam-learn-smart.lovable.app/report-issue" }],
  }),
  component: ReportPage,
});

function ReportPage() {
  const { lang } = useSite();
  const t = (en: string, m: string) => (lang === "en" ? en : m);
  const ml = lang === "ml" ? "lang-ml" : "";
  return (
    <SiteLayout>
      <article className={`mx-auto max-w-2xl px-4 py-8 ${ml}`}>
        <h1 className="text-3xl font-bold">{t("Report an Issue", "പ്രശ്നം റിപ്പോർട്ട് ചെയ്യുക")}</h1>
        <p className="mt-2 text-muted-foreground">
          {t("Spotted something wrong? Wrong answer, broken page, incorrect translation, or a security concern — let us know and we'll fix it.",
             "എന്തെങ്കിലും തെറ്റ് കണ്ടോ? തെറ്റായ ഉത്തരം, പേജ് പ്രവർത്തിക്കുന്നില്ല, തെറ്റായ വിവർത്തനം — ഞങ്ങളെ അറിയിക്കുക.")}
        </p>
        <div className="mt-6 space-y-3">
          <FeedbackDialog kind="bug">
            <Button className="w-full">{t("Report a Bug", "ബഗ് റിപ്പോർട്ട് ചെയ്യുക")}</Button>
          </FeedbackDialog>
          <FeedbackDialog kind="suggestion">
            <Button variant="outline" className="w-full">{t("Suggest an Improvement", "നിർദ്ദേശം നൽകുക")}</Button>
          </FeedbackDialog>
        </div>
      </article>
    </SiteLayout>
  );
}