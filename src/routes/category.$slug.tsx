import { useMemo, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CATEGORIES, getCategory } from "@/data/categories";
import { QUESTIONS } from "@/data/questions";
import {
  enrichedSign,
  getRelatedSigns,
  getSign,
  SIGNS,
  type SignCategory,
  type SignFilter,
} from "@/data/signs";
import { SIGNALS, SIGNAL_GROUP } from "@/data/signals";
import { POLICE_SIGNALS } from "@/data/police-signals";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SiteLayout } from "@/components/site-layout";
import { useSite } from "@/lib/site-context";
import { AdUnit } from "@/components/ad-unit";
import { absoluteUrl, breadcrumbJsonLd, createCanonicalLink, createOpenGraphMeta } from "@/lib/seo";

type Lang = "en" | "ml";

export const Route = createFileRoute("/category/$slug")({
  validateSearch: (s: Record<string, unknown>): { lang?: Lang } => ({
    lang: s.lang === "ml" ? "ml" : "en",
  }),
  loader: ({ params }) => {
    const cat = getCategory(params.slug);
    if (!cat) throw notFound();
    return { cat };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };

    const title = `${loaderData.cat.name.en} — Kerala RTO Learner Licence`;
    const description = `${loaderData.cat.desc.en}. Study in English and Malayalam with sample questions for the Kerala RTO learner licence exam.`;
    const path = `/category/${loaderData.cat.slug}`;
    const educationalJsonLd = {
      "@context": "https://schema.org",
      "@type": "LearningResource",
      name: title,
      description,
      url: absoluteUrl(path),
      inLanguage: ["en-IN", "ml-IN"],
      educationalLevel: "Learner licence preparation",
      learningResourceType: "Study guide",
      about: loaderData.cat.name.en,
    };

    return {
      meta: [
        { title },
        { name: "description", content: description },
        ...createOpenGraphMeta({ title, description, path, type: "article" }),
      ],
      links: [createCanonicalLink(path)],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: loaderData.cat.name.en, path },
            ]),
          ),
        },
        { type: "application/ld+json", children: JSON.stringify(educationalJsonLd) },
      ],
    };
  },
  errorComponent: ({ error }) => (
    <div className="p-6 text-sm text-destructive">{error.message}</div>
  ),
  notFoundComponent: () => (
    <div className="p-6">
      <p className="mb-4 text-sm text-muted-foreground">Category not found.</p>
      <Link to="/" className="text-primary underline">
        Back to home
      </Link>
    </div>
  ),
  component: CategoryPage,
});

const STUDY_NOTES: Record<string, { en: string; ml: string }[]> = {
  "traffic-signs": [
    {
      en: "Mandatory signs are red circles — they must be obeyed.",
      ml: "നിർബന്ധിത ചിഹ്നങ്ങൾ ചുവന്ന വൃത്തങ്ങളാണ് — അനുസരിക്കണം.",
    },
    {
      en: "Warning signs are red triangles pointing up.",
      ml: "മുന്നറിയിപ്പ് ചിഹ്നങ്ങൾ മുകളിലേക്ക് ചൂണ്ടുന്ന ചുവന്ന ത്രികോണങ്ങളാണ്.",
    },
    { en: "Informatory signs are blue rectangles.", ml: "വിവര ചിഹ്നങ്ങൾ നീല ദീർഘചതുരങ്ങളാണ്." },
  ],
  "traffic-signals": [
    {
      en: "Red on top, yellow middle, green bottom — always.",
      ml: "മുകളിൽ ചുവപ്പ്, നടുവിൽ മഞ്ഞ, താഴെ പച്ച — എപ്പോഴും.",
    },
    {
      en: "On yellow, stop unless you cannot do so safely.",
      ml: "മഞ്ഞയിൽ, സുരക്ഷിതമായി നിർത്താനാകില്ലെങ്കിൽ ഒഴികെ നിർത്തുക.",
    },
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
  const showSignalLibrary = cat.slug === "traffic-signals";
  const showPoliceLibrary = cat.slug === "police-hand-signals";

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

        <AdUnit format="auto" className="mb-4" />

        {showSignLibrary && <SignLibrary />}
        {showSignalLibrary && <SignalLibrary />}
        {showPoliceLibrary && <PoliceLibrary />}

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
                          role="img"
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
            <Link to="/category/$slug" params={{ slug: prev.slug }} className="flex-1">
              <Button variant="outline" className="w-full justify-start">
                ← <span className={`ml-2 truncate ${ml}`}>{t(prev.name)}</span>
              </Button>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <Link to="/category/$slug" params={{ slug: next.slug }} className="flex-1">
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
  mandatory: {
    en: "Mandatory Signs (Blue circles)",
    ml: "നിർബന്ധിത ചിഹ്നങ്ങൾ (നീല വൃത്തം)",
    color: "border-blue-600",
  },
  prohibitory: {
    en: "Prohibitory Signs (Red circles)",
    ml: "നിരോധന ചിഹ്നങ്ങൾ (ചുവന്ന വൃത്തം)",
    color: "border-red-600",
  },
  warning: {
    en: "Cautionary / Warning Signs (Red triangles)",
    ml: "മുന്നറിയിപ്പ് ചിഹ്നങ്ങൾ (ചുവന്ന ത്രികോണം)",
    color: "border-amber-600",
  },
  informatory: {
    en: "Informatory Signs (Blue rectangles)",
    ml: "വിവര ചിഹ്നങ്ങൾ (നീല ദീർഘചതുരം)",
    color: "border-sky-600",
  },
  signal: { en: "Traffic Signals", ml: "ഗതാഗത സിഗ്നലുകൾ", color: "border-emerald-600" },
};

function SignLibrary() {
  const { lang, t } = useSite();
  const ml = lang === "ml" ? "lang-ml" : "";
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<SignFilter | "all">("all");
  const [active, setActive] = useState(0);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const filters: { value: SignFilter | "all"; label: string }[] = [
    { value: "all", label: "All" },
    { value: "mandatory", label: "Mandatory" },
    { value: "warning", label: "Warning" },
    { value: "prohibitory", label: "Regulatory" },
    { value: "informatory", label: "Informatory" },
    { value: "parking", label: "Parking" },
    { value: "speed", label: "Speed" },
    { value: "safety", label: "Safety" },
  ];
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SIGNS.filter((sign) => {
      const haystack = [
        sign.name.en,
        sign.name.ml,
        sign.category,
        sign.meaning.en,
        sign.meaning.ml,
        sign.explanation.en,
        sign.example.en,
        ...(sign.keywords ?? []),
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = !q || haystack.includes(q);
      const matchesFilter =
        filter === "all" ||
        sign.category === filter ||
        (filter === "parking" && haystack.includes("parking")) ||
        (filter === "speed" && haystack.includes("speed")) ||
        (filter === "safety" && ["warning", "prohibitory", "mandatory"].includes(sign.category));
      return matchesQuery && matchesFilter;
    });
  }, [filter, query]);
  const current = filtered[Math.min(active, Math.max(filtered.length - 1, 0))] ?? SIGNS[0];
  const enriched = enrichedSign(current);
  const quiz = enriched.quiz;
  const related = getRelatedSigns(current);
  const visit = (index: number) => {
    const next = Math.max(0, Math.min(filtered.length - 1, index));
    setActive(next);
    const id = filtered[next]?.id;
    if (id) setRecent((items) => [id, ...items.filter((item) => item !== id)].slice(0, 5));
  };
  const toggleBookmark = (id: string) =>
    setBookmarks((items) =>
      items.includes(id) ? items.filter((item) => item !== id) : [id, ...items],
    );
  const shareSign = async (name: string) => {
    const text = `Kerala RTO sign: ${name}`;
    if (typeof navigator !== "undefined" && "share" in navigator)
      await navigator.share({ title: text, text });
    else if (typeof navigator !== "undefined" && navigator.clipboard)
      await navigator.clipboard.writeText(text);
  };

  return (
    <Card className="mb-4 p-5">
      <h2 className={`mb-1 text-lg font-semibold ${ml}`}>
        {lang === "en" ? "Kerala RTO Sign Library" : "കേരള RTO ചിഹ്ന ലൈബ്രറി"}
      </h2>
      <p className={`mb-4 text-xs text-muted-foreground ${ml}`}>
        {lang === "en"
          ? "Search, filter, bookmark and practise every major Kerala learner licence traffic sign."
          : "പ്രധാന കേരള ലേണർ ലൈസൻസ് ചിഹ്നങ്ങൾ തിരയാനും ഫിൽട്ടർ ചെയ്യാനും ബുക്ക്മാർക്ക് ചെയ്യാനും പരിശീലിക്കാനും."}
      </p>
      <nav aria-label="Breadcrumb" className="mb-3 text-xs text-muted-foreground">
        Home / Traffic Signs / {t(current.name)}
      </nav>
      <div className="mb-4 grid gap-2 sm:grid-cols-[1fr_auto]">
        <input
          aria-label="Search traffic signs"
          className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          placeholder="Search by name, category, meaning or keyword"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
        />
        <div className="flex flex-wrap gap-2" role="list" aria-label="Traffic sign filters">
          {filters.map((item) => (
            <Button
              key={item.value}
              type="button"
              size="sm"
              variant={filter === item.value ? "default" : "outline"}
              onClick={() => {
                setFilter(item.value);
                setActive(0);
              }}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((s, index) => (
          <button
            key={s.id}
            type="button"
            onClick={() => visit(index)}
            className={`rounded-xl border bg-card p-3 text-left transition hover:-translate-y-0.5 hover:shadow-sm ${current.id === s.id ? "border-primary" : "border-border"}`}
          >
            <div className="flex gap-3">
              <div
                className="h-20 w-20 shrink-0"
                role="img"
                aria-label={`${s.name.en} traffic sign illustration`}
                dangerouslySetInnerHTML={{ __html: s.svg }}
              />
              <div>
                <p className={`text-sm font-semibold ${ml}`}>{t(s.name)}</p>
                <p className={`text-xs text-muted-foreground ${ml}`}>{t(s.meaning)}</p>
                <p className="mt-1 text-[11px] uppercase tracking-wide text-primary">
                  {s.category}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <article
        className="mt-5 rounded-xl border border-border bg-card p-4 animate-in fade-in-50"
        aria-live="polite"
      >
        <div className="flex flex-col gap-4 sm:flex-row">
          <div
            className="mx-auto h-32 w-32 shrink-0"
            role="img"
            aria-label={`${current.name.en} official SVG traffic sign`}
            dangerouslySetInnerHTML={{ __html: current.svg }}
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              {current.category}
            </p>
            <h3 className={`text-xl font-bold ${ml}`}>{t(current.name)}</h3>
            <p className={`text-sm text-muted-foreground ${ml}`}>{t(current.meaning)}</p>
            <p className={`mt-2 text-sm leading-relaxed ${ml}`}>{t(current.explanation)}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button size="sm" onClick={() => visit(active - 1)} disabled={active === 0}>
                Previous
              </Button>
              <Button
                size="sm"
                onClick={() => visit(active + 1)}
                disabled={active >= filtered.length - 1}
              >
                Next
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => visit(Math.floor(Math.random() * filtered.length))}
              >
                Random Sign
              </Button>
              <Button size="sm" variant="outline" onClick={() => toggleBookmark(current.id)}>
                {bookmarks.includes(current.id) ? "Bookmarked" : "Bookmark"}
              </Button>
              <Button size="sm" variant="outline" onClick={() => shareSign(current.name.en)}>
                Share
              </Button>
            </div>
          </div>
        </div>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <Info label="Where Used" value={t(enriched.whereUsed)} ml={ml} />
          <Info label="Why Important" value={t(enriched.whyImportant)} ml={ml} />
          <Info
            label="Driving Tips"
            value={t({
              en: enriched.drivingTips.en.join(" "),
              ml: enriched.drivingTips.ml.join(" "),
            })}
            ml={ml}
          />
          <Info
            label="Common Mistakes"
            value={t({
              en: enriched.commonMistakes.en.join(" "),
              ml: enriched.commonMistakes.ml.join(" "),
            })}
            ml={ml}
          />
          <Info label="Kerala Learner Test Note" value={t(enriched.keralaTestNote)} ml={ml} />
          <Info label="Exam Memory Trick" value={t(enriched.memoryTrick)} ml={ml} />
        </dl>
        <div className="mt-4 rounded-lg border border-border p-3">
          <p className={`font-semibold ${ml}`}>{t(quiz.question)}</p>
          {quiz.options.en.map((option, i) => (
            <p
              key={option}
              className={`mt-1 text-sm ${i === quiz.answer ? "text-primary font-medium" : "text-muted-foreground"}`}
            >
              {String.fromCharCode(65 + i)}. {lang === "en" ? option : quiz.options.ml[i]}
            </p>
          ))}
          <p className={`mt-2 text-xs text-muted-foreground ${ml}`}>{t(quiz.explanation)}</p>
        </div>
        <div className="mt-4">
          <p className="mb-2 text-sm font-semibold">Related Signs</p>
          <div className="flex flex-wrap gap-2">
            {related.map((s) => (
              <Button
                key={s.id}
                size="sm"
                variant="outline"
                onClick={() => visit(filtered.findIndex((item) => item.id === s.id))}
              >
                {t(s.name)}
              </Button>
            ))}
          </div>
        </div>
        {(bookmarks.length > 0 || recent.length > 0) && (
          <p className="mt-3 text-xs text-muted-foreground">
            Bookmarks: {bookmarks.length} · Recently viewed:{" "}
            {recent
              .map((id) => getSign(id)?.name.en)
              .filter(Boolean)
              .join(", ")}
          </p>
        )}
      </article>
    </Card>
  );
}

function Info({ label, value, ml }: { label: string; value: string; ml: string }) {
  return (
    <div>
      <dt className="font-semibold text-primary">{label}</dt>
      <dd className={`text-muted-foreground ${ml}`}>{value}</dd>
    </div>
  );
}

function SignalLibrary() {
  const { lang, t } = useSite();
  const ml = lang === "ml" ? "lang-ml" : "";
  return (
    <Card className="mb-4 p-5">
      <h2 className={`mb-1 text-lg font-semibold ${ml}`}>
        {lang === "en" ? "Traffic Signal Library" : "ട്രാഫിക് സിഗ്നൽ ലൈബ്രറി"}
      </h2>
      <p className={`mb-4 text-xs text-muted-foreground ${ml}`}>
        {lang === "en"
          ? "Solid, arrow, pedestrian and flashing signals with meaning, usage and a learner-exam Q&A."
          : "സ്ഥിര, അമ്പടയാള, കാൽനട, മിന്നുന്ന സിഗ്നലുകൾ — അർത്ഥം, ഉപയോഗം, പരീക്ഷാ ചോദ്യം സഹിതം."}
      </p>
      <div className="space-y-6">
        {SIGNAL_GROUP.map((g) => {
          const items = SIGNALS.filter((s) => s.kind === g.kind);
          return (
            <section key={g.kind}>
              <h3 className={`mb-3 border-l-4 border-emerald-600 pl-3 text-base font-bold ${ml}`}>
                {t({ en: g.en, ml: g.ml })}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {items.map((s) => (
                  <div key={s.id} className="rounded-xl border border-border bg-card p-3">
                    <div className="flex gap-3">
                      <div
                        className="h-28 w-16 shrink-0"
                        role="img"
                        aria-label={s.name.en}
                        dangerouslySetInnerHTML={{ __html: s.svg }}
                      />
                      <div className="min-w-0">
                        <p className={`text-sm font-semibold ${ml}`}>{t(s.name)}</p>
                        <p className={`mt-0.5 text-xs text-muted-foreground ${ml}`}>
                          {t(s.meaning)}
                        </p>
                      </div>
                    </div>
                    <dl className="mt-3 space-y-1.5 text-xs leading-relaxed">
                      <div className={ml}>
                        <dt className="inline font-semibold text-primary">
                          {t({ en: "Usage: ", ml: "ഉപയോഗം: " })}
                        </dt>
                        <dd className="inline">{t(s.usage)}</dd>
                      </div>
                      <div className={ml}>
                        <dt className="inline font-semibold text-primary">Q: </dt>
                        <dd className="inline">{t(s.learnerQ.q)}</dd>
                      </div>
                      <div className={`text-green-700 dark:text-green-400 ${ml}`}>
                        <dt className="inline font-semibold">A: </dt>
                        <dd className="inline">{t(s.learnerQ.a)}</dd>
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

function PoliceLibrary() {
  const { lang, t } = useSite();
  const ml = lang === "ml" ? "lang-ml" : "";
  return (
    <Card className="mb-4 p-5">
      <h2 className={`mb-1 text-lg font-semibold ${ml}`}>
        {lang === "en" ? "Kerala Police Hand Signals" : "കേരള പോലീസ് കൈ സിഗ്നലുകൾ"}
      </h2>
      <p className={`mb-4 text-xs text-muted-foreground ${ml}`}>
        {lang === "en"
          ? "Officer signals override all lights and signs. Learn each posture, its meaning and exam note."
          : "ഉദ്യോഗസ്ഥന്റെ സിഗ്നൽ എല്ലാ ലൈറ്റ്/അടയാളത്തിനെക്കാൾ മുൻഗണന. ഓരോ പോസും അർത്ഥവും പഠിക്കുക."}
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {POLICE_SIGNALS.map((s) => (
          <div key={s.id} className="rounded-xl border border-border bg-card p-3">
            <div className="flex gap-3">
              <div
                className="h-28 w-24 shrink-0"
                role="img"
                aria-label={s.name.en}
                dangerouslySetInnerHTML={{ __html: s.svg }}
              />
              <div className="min-w-0">
                <p className={`text-sm font-semibold ${ml}`}>{t(s.name)}</p>
                <p className={`mt-0.5 text-xs text-muted-foreground ${ml}`}>{t(s.meaning)}</p>
              </div>
            </div>
            <dl className="mt-3 space-y-1.5 text-xs leading-relaxed">
              <div className={ml}>
                <dt className="inline font-semibold text-primary">
                  {t({ en: "Used for: ", ml: "ഉപയോഗം: " })}
                </dt>
                <dd className="inline">{t(s.usage)}</dd>
              </div>
              <div className={ml}>
                <dt className="inline font-semibold text-primary">
                  {t({ en: "Exam note: ", ml: "പരീക്ഷാ കുറിപ്പ്: " })}
                </dt>
                <dd className="inline">{t(s.examNote)}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </Card>
  );
}
