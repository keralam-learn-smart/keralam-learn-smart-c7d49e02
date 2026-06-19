import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CATEGORIES, getCategory } from "@/data/categories";
import { QUESTIONS } from "@/data/questions";
import { getSign } from "@/data/signs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SiteLayout } from "@/components/site-layout";
import { useSite } from "@/lib/site-context";

type Lang = "en" | "ml";

export const Route = createFileRoute("/category/$slug")({
  validateSearch: (s: Record<string, unknown>): { lang: Lang } => ({
    lang: s.lang === "ml" ? "ml" : "en",
  }),
  loader: ({ params }) => {
    const cat = getCategory(params.slug);
    if (!cat) throw notFound();
    return { cat };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.cat.name.en} — Kerala RTO Learner Licence` },
          { name: "description", content: loaderData.cat.desc.en },
        ]
      : [],
  }),
  errorComponent: ({ error }) => (
    <div className="p-6 text-sm text-destructive">{error.message}</div>
  ),
  notFoundComponent: () => (
    <div className="p-6">
      <p className="mb-4 text-sm text-muted-foreground">Category not found.</p>
      <Link to="/" className="text-primary underline">Back to home</Link>
    </div>
  ),
  component: CategoryPage,
});

const STUDY_NOTES: Record<string, { en: string; ml: string }[]> = {
  "traffic-signs": [
    { en: "Mandatory signs are red circles — they must be obeyed.", ml: "നിർബന്ധിത ചിഹ്നങ്ങൾ ചുവന്ന വൃത്തങ്ങളാണ് — അനുസരിക്കണം." },
    { en: "Warning signs are red triangles pointing up.", ml: "മുന്നറിയിപ്പ് ചിഹ്നങ്ങൾ മുകളിലേക്ക് ചൂണ്ടുന്ന ചുവന്ന ത്രികോണങ്ങളാണ്." },
    { en: "Informatory signs are blue rectangles.", ml: "വിവര ചിഹ്നങ്ങൾ നീല ദീർഘചതുരങ്ങളാണ്." },
  ],
  "traffic-signals": [
    { en: "Red on top, yellow middle, green bottom — always.", ml: "മുകളിൽ ചുവപ്പ്, നടുവിൽ മഞ്ഞ, താഴെ പച്ച — എപ്പോഴും." },
    { en: "On yellow, stop unless you cannot do so safely.", ml: "മഞ്ഞയിൽ, സുരക്ഷിതമായി നിർത്താനാകില്ലെങ്കിൽ ഒഴികെ നിർത്തുക." },
  ],
};

function CategoryPage() {
  const { cat } = Route.useLoaderData();
  const { lang, t } = useSite();
  const ml = lang === "ml" ? "lang-ml" : "";

  const idx = CATEGORIES.findIndex((c) => c.slug === cat.slug);
  const prev = idx > 0 ? CATEGORIES[idx - 1] : null;
  const next = idx < CATEGORIES.length - 1 ? CATEGORIES[idx + 1] : null;
  const notes = STUDY_NOTES[cat.slug] ?? [];
  const relatedQs = QUESTIONS.filter((q) => q.category === cat.slug).slice(0, 6);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-6">
        <div className="mb-6 flex items-start gap-4">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-primary/10 text-4xl">
            {cat.icon}
          </div>
          <div className="min-w-0">
            <h1 className={`text-2xl font-bold sm:text-3xl ${ml}`}>{t(cat.name)}</h1>
            <p className={`mt-1 text-sm text-muted-foreground ${ml}`}>{t(cat.desc)}</p>
          </div>
        </div>

        <Card className="mb-4 p-5">
          <h2 className={`mb-2 text-lg font-semibold ${ml}`}>
            {lang === "en" ? "Overview" : "അവലോകനം"}
          </h2>
          <p className={`text-sm leading-relaxed ${ml}`}>{t(cat.content)}</p>
        </Card>

        {notes.length > 0 && (
          <Card className="mb-4 p-5">
            <h2 className={`mb-3 text-lg font-semibold ${ml}`}>
              {lang === "en" ? "Study Notes" : "പഠന കുറിപ്പുകൾ"}
            </h2>
            <ul className="space-y-2">
              {notes.map((n, i) => (
                <li key={i} className={`flex gap-2 text-sm ${ml}`}>
                  <span className="text-primary">•</span>
                  <span>{t(n)}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {relatedQs.length > 0 && (
          <Card className="mb-4 p-5">
            <h2 className={`mb-3 text-lg font-semibold ${ml}`}>
              {lang === "en" ? "Sample Questions" : "സാമ്പിൾ ചോദ്യങ്ങൾ"}
            </h2>
            <ul className="space-y-4">
              {relatedQs.map((q, qi) => {
                const sign = q.signId ? getSign(q.signId) : undefined;
                return (
                  <li key={q.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      {sign && (
                        <div
                          className="h-16 w-16 shrink-0"
                          aria-label={sign.name.en}
                          dangerouslySetInnerHTML={{ __html: sign.svg }}
                        />
                      )}
                      <div className="min-w-0">
                        <p className={`text-sm font-medium ${ml}`}>
                          {qi + 1}. {t(q.question)}
                        </p>
                        <p className={`mt-1 text-sm text-green-700 dark:text-green-400 ${ml}`}>
                          ✓ {t(q.options[q.correct])}
                        </p>
                        <p className={`mt-1 text-xs text-muted-foreground ${ml}`}>
                          {t(q.explanation)}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <Link to="/quiz" className="mt-4 inline-block">
              <Button size="sm" variant="outline">
                {lang === "en" ? "Practice all questions →" : "എല്ലാ ചോദ്യങ്ങളും പരിശീലിക്കുക →"}
              </Button>
            </Link>
          </Card>
        )}

        <Card className="mb-6 p-5">
          <h2 className={`mb-2 text-lg font-semibold ${ml}`}>
            {lang === "en" ? "Exam Tip" : "പരീക്ഷാ ടിപ്പ്"}
          </h2>
          <p className={`text-sm leading-relaxed ${ml}`}>
            {lang === "en"
              ? "Read each question carefully. In Kerala RTO learner tests, at least one question from this topic appears in every set."
              : "ഓരോ ചോദ്യവും ശ്രദ്ധയോടെ വായിക്കുക. കേരള RTO ലേണർ ടെസ്റ്റിൽ ഓരോ സെറ്റിലും ഈ വിഷയത്തിൽ നിന്ന് കുറഞ്ഞത് ഒരു ചോദ്യമെങ്കിലും വരുന്നു."}
          </p>
        </Card>

        <nav className="flex items-center justify-between gap-3">
          {prev ? (
            <Link
              to="/category/$slug"
              params={{ slug: prev.slug }}
              className="flex-1"
            >
              <Button variant="outline" className="w-full justify-start">
                ← <span className={`ml-2 truncate ${ml}`}>{t(prev.name)}</span>
              </Button>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <Link
              to="/category/$slug"
              params={{ slug: next.slug }}
              className="flex-1"
            >
              <Button variant="outline" className="w-full justify-end">
                <span className={`mr-2 truncate ${ml}`}>{t(next.name)}</span> →
              </Button>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </nav>
      </div>
    </SiteLayout>
  );
}