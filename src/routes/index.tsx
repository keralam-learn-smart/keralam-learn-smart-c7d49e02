import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CATEGORIES } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kerala RTO Learner Licence Practice — Signs, Signals & Mock Tests" },
      {
        name: "description",
        content:
          "Free bilingual (English & Malayalam) Kerala RTO learner licence practice — traffic signs, signals, road rules and mock tests.",
      },
      { property: "og:title", content: "Kerala RTO Learner Licence Practice" },
      {
        property: "og:description",
        content:
          "Bilingual learner licence prep for Kerala — signs, signals and mock tests in English & Malayalam.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [lang, setLang] = useState<"en" | "ml">("en");
  const t = (s: { en: string; ml: string }) => s[lang];
  const ml = lang === "ml" ? "lang-ml" : "";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur">
        <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
          <div className="min-w-0">
            <h1 className={`truncate text-base font-bold sm:text-lg ${ml}`}>
              {lang === "en" ? "Kerala RTO Learner Licence" : "കേരള RTO ലേണർ ലൈസൻസ്"}
            </h1>
            <p className={`truncate text-xs text-muted-foreground ${ml}`}>
              {lang === "en"
                ? "Signs · Signals · Mock Tests"
                : "ചിഹ്നങ്ങൾ · സിഗ്നലുകൾ · മോക്ക് ടെസ്റ്റ്"}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLang(lang === "en" ? "ml" : "en")}
            className="shrink-0"
          >
            {lang === "en" ? "മലയാളം" : "English"}
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <section className="mb-8 rounded-2xl bg-gradient-to-br from-primary to-accent p-6 text-primary-foreground shadow-lg">
          <h2 className={`text-2xl font-bold leading-tight sm:text-3xl ${ml}`}>
            {lang === "en"
              ? "Pass your Learner Licence test with confidence"
              : "ആത്മവിശ്വാസത്തോടെ ലേണർ ലൈസൻസ് ടെസ്റ്റ് വിജയിക്കൂ"}
          </h2>
          <p className={`mt-2 text-sm opacity-90 ${ml}`}>
            {lang === "en"
              ? "Bilingual practice — traffic signs, signals and road rules for Kerala RTO."
              : "ദ്വിഭാഷാ പരിശീലനം — കേരള RTO യ്ക്കായി ഗതാഗത ചിഹ്നങ്ങൾ, സിഗ്നലുകൾ, റോഡ് നിയമങ്ങൾ."}
          </p>
        </section>

        <h3 className={`mb-3 text-lg font-semibold ${ml}`}>
          {lang === "en" ? "Browse Categories" : "വിഭാഗങ്ങൾ"}
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to="/category/$slug"
              params={{ slug: cat.slug }}
              search={{ lang }}
              className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
            >
              <Card className="cursor-pointer p-4 transition hover:border-primary hover:shadow-md">
                <div className="flex items-start gap-3">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-2xl">
                    {cat.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className={`font-semibold leading-snug ${ml}`}>{t(cat.name)}</h4>
                    <p className={`mt-1 text-sm text-muted-foreground ${ml}`}>{t(cat.desc)}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}