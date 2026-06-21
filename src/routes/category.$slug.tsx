import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CATEGORIES, getCategory } from "@/data/categories";
import { QUESTIONS } from "@/data/questions";
import { getSign, SIGNS, type SignCategory } from "@/data/signs";
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
  const showSignLibrary = cat.slug === "traffic-signs";

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

        {showSignLibrary && <SignLibrary />}

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

const SIGN_GROUP_LABEL: Record<SignCategory, { en: string; ml: string; color: string }> = {
  mandatory: { en: "Mandatory Signs (Blue circles)", ml: "നിർബന്ധിത ചിഹ്നങ്ങൾ (നീല വൃത്തം)", color: "border-blue-600" },
  prohibitory: { en: "Prohibitory Signs (Red circles)", ml: "നിരോധന ചിഹ്നങ്ങൾ (ചുവന്ന വൃത്തം)", color: "border-red-600" },
  warning: { en: "Cautionary / Warning Signs (Red triangles)", ml: "മുന്നറിയിപ്പ് ചിഹ്നങ്ങൾ (ചുവന്ന ത്രികോണം)", color: "border-amber-600" },
  informatory: { en: "Informatory Signs (Blue rectangles)", ml: "വിവര ചിഹ്നങ്ങൾ (നീല ദീർഘചതുരം)", color: "border-sky-600" },
  signal: { en: "Traffic Signals", ml: "ഗതാഗത സിഗ്നലുകൾ", color: "border-emerald-600" },
};

function SignLibrary() {
  const { lang, t } = useSite();
  const ml = lang === "ml" ? "lang-ml" : "";
  const groups: SignCategory[] = ["mandatory", "prohibitory", "warning", "informatory", "signal"];
  return (
    <Card className="mb-4 p-5">
      <h2 className={`mb-1 text-lg font-semibold ${ml}`}>
        {lang === "en" ? "Kerala RTO Sign Library" : "കേരള RTO ചിഹ്ന ലൈബ്രറി"}
      </h2>
      <p className={`mb-4 text-xs text-muted-foreground ${ml}`}>
        {lang === "en"
          ? "Every sign with meaning, driver action, exam point and real-life example."
          : "ഓരോ ചിഹ്നവും അർത്ഥം, ഡ്രൈവർ നടപടി, പരീക്ഷാ പോയിന്റ്, ഉദാഹരണം സഹിതം."}
      </p>
      <div className="space-y-6">
        {groups.map((g) => {
          const items = SIGNS.filter((s) => s.category === g);
          if (!items.length) return null;
          const label = SIGN_GROUP_LABEL[g];
          return (
            <section key={g}>
              <h3 className={`mb-3 border-l-4 pl-3 text-base font-bold ${label.color} ${ml}`}>
                {t({ en: label.en, ml: label.ml })}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {items.map((s) => (
                  <div
                    key={s.id}
                    className="rounded-xl border border-border bg-card p-3"
                  >
                    <div className="flex gap-3">
                      <div
                        className="h-20 w-20 shrink-0"
                        aria-label={s.name.en}
                        dangerouslySetInnerHTML={{ __html: s.svg }}
                      />
                      <div className="min-w-0">
                        <p className={`text-sm font-semibold ${ml}`}>{t(s.name)}</p>
                        <p className={`mt-0.5 text-xs text-muted-foreground ${ml}`}>
                          <span className="font-semibold">{t({ en: "Meaning: ", ml: "അർത്ഥം: " })}</span>
                          {t(s.meaning)}
                        </p>
                      </div>
                    </div>
                    <dl className="mt-3 space-y-1.5 text-xs leading-relaxed">
                      <div className={ml}>
                        <dt className="inline font-semibold text-primary">
                          {t({ en: "Driver action: ", ml: "ഡ്രൈവർ നടപടി: " })}
                        </dt>
                        <dd className="inline">{t(s.explanation)}</dd>
                      </div>
                      <div className={ml}>
                        <dt className="inline font-semibold text-primary">
                          {t({ en: "Example: ", ml: "ഉദാഹരണം: " })}
                        </dt>
                        <dd className="inline">{t(s.example)}</dd>
                      </div>
                      <div className={ml}>
                        <dt className="inline font-semibold text-primary">
                          {t({ en: "Exam point: ", ml: "പരീക്ഷാ പോയിന്റ്: " })}
                        </dt>
                        <dd className="inline">
                          {t({
                            en: `Recognise the ${g} shape/colour and respond before reaching the sign.`,
                            ml: `${g === "warning" ? "ത്രികോണ" : g === "informatory" ? "ദീർഘചതുര" : "വൃത്താകൃതി"} രൂപവും നിറവും തിരിച്ചറിയുക, അടയാളം എത്തുന്നതിന് മുമ്പ് പ്രതികരിക്കുക.`,
                          })}
                        </dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </Card>
  );
}