import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  BadgeCheck,
  BookOpen,
  Bot,
  Car,
  CheckCircle2,
  CloudRain,
  GraduationCap,
  Hand,
  Headphones,
  HelpCircle,
  Lock,
  Map,
  Moon,
  Navigation,
  RefreshCw,
  ShieldCheck,
  Signal,
  Sparkles,
  Timer,
  Trophy,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { CATEGORIES } from "@/data/categories";
import { SIGNS } from "@/data/signs";
import { POLICE_SIGNALS } from "@/data/police-signals";
import { QUESTIONS } from "@/data/questions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SiteLayout } from "@/components/site-layout";
import { useSite } from "@/lib/site-context";
import { AdUnit } from "@/components/ad-unit";
import { createCanonicalLink, createOpenGraphMeta, breadcrumbJsonLd } from "@/lib/seo";

const learningHubCards = [
  {
    title: "Traffic Signs",
    description:
      "Understand mandatory, warning, prohibitory and informatory signs used on Kerala roads.",
    icon: AlertTriangle,
    to: "/category/$slug",
    slug: "traffic-signs",
  },
  {
    title: "Traffic Signals",
    description: "Learn red, amber, green, flashing signals and pedestrian crossing light rules.",
    icon: Signal,
    to: "/category/$slug",
    slug: "traffic-signals",
  },
  {
    title: "Police Hand Signals",
    description:
      "Recognise traffic police directions that override signals at junctions and diversions.",
    icon: Hand,
    to: "/category/$slug",
    slug: "police-hand-signals",
  },
  {
    title: "Road Markings",
    description:
      "Study zebra crossings, stop lines, lane lines and no-overtaking markings clearly.",
    icon: Map,
    to: "/category/$slug",
    slug: "road-markings",
  },
  {
    title: "Road Rules",
    description:
      "Revise right of way, overtaking, speed discipline, documents and emergency vehicle rules.",
    icon: ShieldCheck,
    to: "/category/$slug",
    slug: "road-rules",
  },
  {
    title: "Driving Guide",
    description:
      "Build safe habits for hills, rain, night driving, parking and practical road judgement.",
    icon: Car,
    to: "/driving-guide",
  },
];

const safetyTips = [
  {
    title: "Helmet Safety",
    icon: ShieldCheck,
    description:
      "Wear an ISI-marked helmet and fasten the chin strap before moving even a short distance.",
    tip: "Replace helmets after a hard impact or visible shell damage.",
  },
  {
    title: "Seat Belt",
    icon: CheckCircle2,
    description:
      "Seat belts reduce injury risk by keeping occupants secure during sudden braking or collision.",
    tip: "The driver is responsible for reminding every passenger to buckle up.",
  },
  {
    title: "Night Driving",
    icon: Moon,
    description:
      "Use low beam for oncoming traffic, reduce speed and scan the road edges for pedestrians.",
    tip: "Avoid staring directly at high-beam headlights; look slightly left.",
  },
  {
    title: "Rain Driving",
    icon: CloudRain,
    description:
      "Kerala monsoon roads can become slippery, waterlogged and low-visibility within minutes.",
    tip: "Double your following distance and brake gently before turns.",
  },
  {
    title: "Emergency Driving",
    icon: Headphones,
    description:
      "Give way quickly and safely to ambulances, fire engines and police vehicles using sirens.",
    tip: "Move left only when it is safe; never block junctions.",
  },
  {
    title: "Defensive Driving",
    icon: Navigation,
    description:
      "Expect mistakes from others, maintain space and avoid aggressive acceleration or braking.",
    tip: "Use the two-second gap in dry weather and four seconds in rain.",
  },
];

const articles = [
  {
    title: "How to Pass Kerala Learner Test",
    summary:
      "A practical plan for revising signs, signals, documents and exam-style questions before booking your test.",
    icon: GraduationCap,
    to: "/quiz",
  },
  {
    title: "Top Traffic Signs",
    summary:
      "The most commonly asked warning, mandatory and prohibitory signs with quick recognition tips.",
    icon: AlertTriangle,
    to: "/category/$slug",
    slug: "traffic-signs",
  },
  {
    title: "Road Markings Guide",
    summary:
      "Decode solid lines, broken lines, stop lines, zebra crossings and lane arrows for safer driving.",
    icon: Map,
    to: "/category/$slug",
    slug: "road-markings",
  },
  {
    title: "Night Driving Tips",
    summary:
      "Learn headlight discipline, safe speed selection and fatigue control for evening highway trips.",
    icon: Moon,
    to: "/driving-guide",
  },
  {
    title: "Driving Licence Renewal",
    summary:
      "Understand renewal timing, required documents and why expired licences should be updated promptly.",
    icon: RefreshCw,
    to: "/category/$slug",
    slug: "driving-licence",
  },
  {
    title: "Road Safety Rules",
    summary:
      "Essential Kerala road safety habits covering speed, mobile phones, emergency vehicles and pedestrians.",
    icon: ShieldCheck,
    to: "/category/$slug",
    slug: "road-rules",
  },
];

const platformReasons = [
  "Responsive Learning",
  "Official Syllabus",
  "Detailed Explanations",
  "Instant Validation",
  "AI Tutor",
  "Mock Tests",
  "Premium Learning",
  "Fast Performance",
];

const homeFaqs = [
  {
    q: "Is this useful for the Kerala learner licence test?",
    a: "Yes. The homepage links to signs, signals, road rules and mock tests aligned with Kerala RTO learner preparation topics.",
  },
  {
    q: "Can I practise without reading lessons first?",
    a: "Yes. Start a mock test anytime, then review explanations to understand mistakes and improve quickly.",
  },
  {
    q: "Are police hand signals important for the exam?",
    a: "Yes. Traffic police signals can override lights and signs, so learners should recognise each official gesture.",
  },
  {
    q: "How should I study traffic signs?",
    a: "Group them by shape and color: red circles restrict, red triangles warn and blue boards inform or guide.",
  },
  {
    q: "Why are road markings included?",
    a: "Markings guide lane discipline, overtaking, pedestrian priority and stopping positions at junctions.",
  },
  {
    q: "Does the platform include explanations?",
    a: "Yes. Questions and learning pages include explanations so you learn the rule, not just the answer.",
  },
];

export const Route = createFileRoute("/")({
  head: () => {
    const title = "Kerala RTO Learner Licence Practice — Signs, Signals & Mock Tests";
    const description =
      "Bilingual (English & Malayalam) Kerala RTO learner licence practice for just ₹45 — traffic signs, signals, road rules and mock tests.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        ...createOpenGraphMeta({ title, description }),
      ],
      links: [createCanonicalLink("/")],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }])),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: homeFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        },
      ],
    };
  },
  component: Index,
});

function Index() {
  const { lang, t } = useSite();
  const { t: tr } = useTranslation();
  const ml = lang === "ml" ? "lang-ml" : "";

  const features = [
    { icon: BookOpen, en: "500+ Questions", ml: "500+ ചോദ്യങ്ങൾ" },
    { icon: Timer, en: "20s Timer Per Q", ml: "ഓരോ ചോദ്യത്തിന് 20s" },
    { icon: Trophy, en: "20 Mock Test Sets", ml: "20 മോക്ക് ടെസ്റ്റ് സെറ്റുകൾ" },
    { icon: Bot, en: "AI Study Tutor", ml: "AI പഠന ട്യൂട്ടർ" },
  ];

  const rotationIndex = new Date().getDate();
  const featuredSign = SIGNS[rotationIndex % SIGNS.length];
  const featuredSignal = POLICE_SIGNALS[rotationIndex % POLICE_SIGNALS.length];
  const todayQuestion = QUESTIONS[rotationIndex % QUESTIONS.length];
  const [searchTerm, setSearchTerm] = useState("");
  const searchResults = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return [];
    const results: { title: string; type: string; text: string; to: string; slug?: string }[] = [
      ...SIGNS.map((sign) => ({
        title: sign.name.en,
        type: "Traffic Sign",
        text: `${sign.meaning.en} ${sign.explanation.en} ${(sign.keywords ?? []).join(" ")}`,
        to: "/category/$slug",
        slug: "traffic-signs",
      })),
      ...POLICE_SIGNALS.map((signal) => ({
        title: signal.name.en,
        type: "Police Hand Signal",
        text: `${signal.meaning.en} ${signal.usage.en} ${signal.examNote.en}`,
        to: "/category/$slug",
        slug: "police-hand-signals",
      })),
      ...QUESTIONS.slice(0, 160).map((question) => ({
        title: question.question.en,
        type: "Learner Question",
        text: `${question.options.map((o) => o.en).join(" ")} ${question.explanation.en}`,
        to: "/quiz",
      })),
      ...CATEGORIES.map((category) => ({
        title: category.name.en,
        type: category.slug.includes("markings") ? "Road Marking" : "Driving Topic",
        text: `${category.desc.en} ${category.content.en}`,
        to: "/category/$slug",
        slug: category.slug,
      })),
    ];
    return results
      .filter((item) => `${item.title} ${item.type} ${item.text}`.toLowerCase().includes(q))
      .slice(0, 8);
  }, [searchTerm]);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 py-6">
        <section
          className="mb-6 overflow-hidden rounded-3xl border border-white/30 bg-gradient-to-br from-card/95 via-background/90 to-secondary/15 p-4 shadow-2xl shadow-primary/10 backdrop-blur animate-in fade-in slide-in-from-bottom-4 duration-700 sm:p-6"
          aria-labelledby="driving-welcome-title"
        >
          <div className="rounded-[1.35rem] border border-white/40 bg-white/55 p-5 shadow-xl backdrop-blur-xl dark:bg-white/10 sm:p-8">
            <span
              className={`inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-primary/15 ${ml}`}
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {tr("home.welcome.eyebrow")}
            </span>
            <h1
              id="driving-welcome-title"
              className={`mt-4 max-w-3xl text-3xl font-extrabold leading-tight text-foreground sm:text-4xl lg:text-5xl ${ml}`}
            >
              {tr("home.welcome.title")}
            </h1>
            <div
              className={`mt-5 grid gap-4 text-sm leading-7 text-muted-foreground sm:text-base ${ml}`}
            >
              {["p1", "p2", "p3", "p4", "p5", "p6"].map((key) => (
                <p key={key}>{tr(`home.welcome.${key}`)}</p>
              ))}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {["stat1", "stat2", "stat3"].map((key) => (
                <div
                  key={key}
                  className="rounded-2xl border border-primary/10 bg-background/70 p-4 text-center shadow-sm"
                >
                  <CheckCircle2 className="mx-auto h-5 w-5 text-primary" aria-hidden="true" />
                  <p className={`mt-2 text-sm font-semibold ${ml}`}>{tr(`home.welcome.${key}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-accent p-6 text-primary-foreground shadow-lg sm:p-10">
          <span
            className={`inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur ${ml}`}
          >
            <Sparkles className="h-3 w-3" />
            {tr("home.hero.badge")}
          </span>
          <h1 className={`mt-3 text-3xl font-extrabold leading-tight sm:text-4xl ${ml}`}>
            {tr("home.hero.title")}
          </h1>
          <p className={`mt-2 max-w-2xl text-sm opacity-90 sm:text-base ${ml}`}>
            {tr("home.hero.description")}
          </p>
          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <Link to="/quiz/$setId" params={{ setId: "mock" }} className="w-full">
              <Button
                size="lg"
                className="h-12 w-full bg-white text-primary shadow-md hover:bg-white/90"
              >
                {tr("home.hero.mock")}
              </Button>
            </Link>
            <Link to="/quiz" className="w-full">
              <Button variant="secondary" size="lg" className="h-12 w-full">
                {tr("home.hero.practice")}
              </Button>
            </Link>
            <Link to="/ai-assistant" className="w-full">
              <Button
                size="lg"
                variant="outline"
                className="h-12 w-full border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              >
                <Bot className="mr-1 h-4 w-4" />
                {tr("home.hero.ai")}
              </Button>
            </Link>
          </div>

          <div className="mt-4">
            <Link to="/unlock" className="block">
              <Button
                size="lg"
                className="h-12 w-full rounded-full bg-yellow-400 text-black shadow-md hover:bg-yellow-300"
              >
                <Lock className="mr-2 h-4 w-4" />
                {tr("home.hero.unlock")}
              </Button>
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.en}
                className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 backdrop-blur"
              >
                <f.icon className="h-4 w-4 shrink-0" />
                <span className={`text-xs font-medium ${ml}`}>{lang === "en" ? f.en : f.ml}</span>
              </div>
            ))}
          </div>
        </section>

        <AdUnit format="auto" className="my-4" />

        <section className="mb-6" aria-labelledby="site-search-title">
          <Card className="p-5">
            <h2 id="site-search-title" className={`text-xl font-bold sm:text-2xl ${ml}`}>
              {tr("home.search.title")}
            </h2>
            <p className={`mt-1 text-sm text-muted-foreground ${ml}`}>
              {tr("home.search.description")}
            </p>
            <input
              aria-label={tr("home.search.label")}
              className="mt-4 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm"
              placeholder={tr("home.search.placeholder")}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            {searchTerm ? (
              <div className="mt-4 grid gap-2 sm:grid-cols-2" aria-live="polite">
                {searchResults.length ? (
                  searchResults.map((result) => (
                    <Link
                      key={`${result.type}-${result.title}`}
                      to={result.to}
                      params={result.slug ? { slug: result.slug } : undefined}
                      className="rounded-xl border bg-card p-3 transition hover:border-primary hover:shadow-sm"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                        {result.type}
                      </p>
                      <h3 className="mt-1 line-clamp-2 font-semibold">{result.title}</h3>
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                        {result.text}
                      </p>
                    </Link>
                  ))
                ) : (
                  <p className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">
                    {tr("home.search.empty")}
                  </p>
                )}
              </div>
            ) : null}
          </Card>
        </section>

        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <h2 className={`text-xl font-bold sm:text-2xl ${ml}`}>
              {tr("home.sections.categories")}
            </h2>
            <p className={`text-sm text-muted-foreground ${ml}`}>
              {tr("home.sections.categoriesDesc")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to="/category/$slug"
              params={{ slug: cat.slug }}
              className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Card className="group h-full cursor-pointer p-4 transition hover:border-primary hover:shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 text-2xl transition group-hover:from-primary/30 group-hover:to-accent/30">
                    {cat.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className={`font-semibold leading-snug ${ml}`}>{t(cat.name)}</h3>
                    <p className={`mt-1 text-sm text-muted-foreground ${ml}`}>{t(cat.desc)}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <section
          className="mt-10 animate-in fade-in slide-in-from-bottom-3 duration-700"
          aria-labelledby="learning-hub-title"
        >
          <div className="mb-6 flex items-end justify-between gap-3">
            <div>
              <h2 id="learning-hub-title" className={`text-xl font-bold sm:text-2xl ${ml}`}>
                {tr("home.sections.hub")}
              </h2>
              <p className={`text-sm text-muted-foreground ${ml}`}>{tr("home.sections.hubDesc")}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {learningHubCards.map((item) => (
              <Card
                key={item.title}
                className="group h-full p-4 transition hover:border-primary hover:shadow-lg"
              >
                <div className="flex h-full flex-col gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 text-primary transition group-hover:from-primary/30 group-hover:to-accent/30">
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold leading-snug">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  {item.slug ? (
                    <Link to="/category/$slug" params={{ slug: item.slug }}>
                      <Button variant="secondary" className="w-full">
                        {tr("home.sections.readMore")}
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/driving-guide">
                      <Button variant="secondary" className="w-full">
                        {tr("home.sections.readMore")}
                      </Button>
                    </Link>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Card className="p-5 transition hover:shadow-lg">
            <h2 className="text-xl font-bold sm:text-2xl">{tr("home.sections.featuredSign")}</h2>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row">
              <div
                className="mx-auto grid h-40 w-40 shrink-0 place-items-center rounded-2xl bg-muted p-4"
                role="img"
                aria-label={featuredSign.name.en}
                dangerouslySetInnerHTML={{ __html: featuredSign.svg }}
              />
              <div>
                <p className="text-sm font-medium text-muted-foreground">{featuredSign.category}</p>
                <h3 className="text-lg font-semibold">{featuredSign.name.en}</h3>
                <p className="mt-2 text-sm">
                  <strong>Meaning:</strong> {featuredSign.meaning.en}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong>Detailed Explanation:</strong> {featuredSign.explanation.en}
                </p>
                <p className="mt-2 text-sm">
                  <strong>Exam Tip:</strong> Identify the sign shape first, then confirm the symbol
                  before choosing the answer.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong>Common Mistakes:</strong> Learners often confuse similar red-bordered
                  signs when reading too quickly.
                </p>
                <Link to="/category/$slug" params={{ slug: "traffic-signs" }}>
                  <Button className="mt-4">Learn More</Button>
                </Link>
              </div>
            </div>
          </Card>
          <Card className="p-5 transition hover:shadow-lg">
            <h2 className="text-xl font-bold sm:text-2xl">{tr("home.sections.featuredSignal")}</h2>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row">
              <div
                className="mx-auto grid h-44 w-36 shrink-0 place-items-center overflow-hidden rounded-2xl bg-muted"
                role="img"
                aria-label={featuredSignal.name.en}
                dangerouslySetInnerHTML={{ __html: featuredSignal.svg }}
              />
              <div>
                <h3 className="text-lg font-semibold">{featuredSignal.name.en}</h3>
                <p className="mt-2 text-sm">
                  <strong>Meaning:</strong> {featuredSignal.meaning.en}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong>Used For:</strong> {featuredSignal.usage.en}
                </p>
                <p className="mt-2 text-sm">
                  <strong>Exam Note:</strong> {featuredSignal.examNote.en}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong>Common Mistakes:</strong> Do not assume traffic lights apply when an
                  officer is actively directing vehicles.
                </p>
                <p className="mt-2 text-sm">
                  <strong>Safety Note:</strong> Slow down and follow the officer only when your path
                  is clear.
                </p>
                <Link to="/category/$slug" params={{ slug: "police-hand-signals" }}>
                  <Button className="mt-4">{tr("home.sections.readMore")}</Button>
                </Link>
              </div>
            </div>
          </Card>
        </section>

        <section className="mt-10">
          <Card className="p-5 transition hover:shadow-lg">
            <div className="flex items-start gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 text-primary">
                <HelpCircle className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold sm:text-2xl">{tr("home.sections.question")}</h2>
                <p className="mt-2 font-medium">{todayQuestion.question.en}</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {todayQuestion.options.map((option, index) => (
                    <div key={option.en} className="rounded-xl border bg-card p-3 text-sm">
                      {String.fromCharCode(65 + index)}. {option.en}
                    </div>
                  ))}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground transition hover:opacity-90">
                    {tr("home.sections.reveal")}
                  </summary>
                  <p className="mt-3 text-sm">
                    <strong>Answer:</strong> {todayQuestion.options[todayQuestion.correct].en}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {todayQuestion.explanation.en}
                  </p>
                </details>
                <Link to="/quiz">
                  <Button variant="secondary" className="mt-4">
                    {tr("home.sections.practiceMore")}
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </section>

        <section className="mt-10">
          <h2 className="mb-6 text-xl font-bold sm:text-2xl">{tr("home.sections.safety")}</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {safetyTips.map((tip) => (
              <Card
                key={tip.title}
                className="group p-4 transition hover:border-primary hover:shadow-lg"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 text-primary transition group-hover:from-primary/30 group-hover:to-accent/30">
                  <tip.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-3 font-semibold">{tip.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{tip.description}</p>
                <p className="mt-2 text-sm">
                  <strong>Safety Tip:</strong> {tip.tip}
                </p>
                <Link to="/driving-guide">
                  <Button variant="secondary" className="mt-4 w-full">
                    Learn More
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-6 text-xl font-bold sm:text-2xl">{tr("home.sections.articles")}</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Card
                key={article.title}
                className="group p-4 transition hover:border-primary hover:shadow-lg"
              >
                <div className="grid aspect-video place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 text-primary">
                  <article.icon className="h-10 w-10" aria-label={`${article.title} thumbnail`} />
                </div>
                <h3 className="mt-3 font-semibold">{article.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{article.summary}</p>
                {article.slug ? (
                  <Link to="/category/$slug" params={{ slug: article.slug }}>
                    <Button variant="secondary" className="mt-4 w-full">
                      {tr("home.sections.readMore")}
                    </Button>
                  </Link>
                ) : (
                  <Link to={article.to}>
                    <Button variant="secondary" className="mt-4 w-full">
                      {tr("home.sections.readMore")}
                    </Button>
                  </Link>
                )}
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <Card className="p-5">
            <h2 className="text-xl font-bold sm:text-2xl">{tr("home.sections.stats")}</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {[
                { n: "500+", l: "Questions" },
                { n: "100+", l: "Traffic Signs" },
                { n: "20+", l: "Mock Tests" },
                { n: "AI Tutor", l: "Available" },
                { n: "Updated", l: "Official Kerala Syllabus" },
              ].map((stat) => (
                <div
                  key={stat.l}
                  className="rounded-xl bg-muted p-4 text-center animate-in fade-in duration-700"
                >
                  <div className="text-2xl font-extrabold text-primary">{stat.n}</div>
                  <div className="text-xs text-muted-foreground">{stat.l}</div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="mt-10">
          <Card className="p-5 transition hover:shadow-lg">
            <div className="grid gap-5 sm:grid-cols-[160px_1fr]">
              <div className="grid h-40 w-40 place-items-center rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 text-primary">
                <BadgeCheck className="h-14 w-14" aria-label="Trainer photo placeholder" />
              </div>
              <div>
                <h2 className="text-xl font-bold sm:text-2xl">{tr("home.sections.guidance")}</h2>
                <p className="mt-2 text-sm">
                  <strong>Experience:</strong> Practical learner preparation focused on Kerala road
                  conditions, RTO test confidence and safe driving habits.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong>Mission:</strong> Help every learner understand rules clearly, respect
                  other road users and become a responsible driver.
                </p>
                <p className="mt-2 text-sm">
                  <strong>Guidance:</strong> Get structured support for signs, signals, parking
                  basics, defensive driving and mock-test readiness.
                </p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <Link to="/contact">
                    <Button>Book Training</Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="secondary">Contact</Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="mt-10">
          <h2 className="mb-6 text-xl font-bold sm:text-2xl">{tr("home.sections.why")}</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {platformReasons.map((reason) => (
              <Card
                key={reason}
                className="flex items-center gap-3 p-4 transition hover:border-primary hover:shadow-lg"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                <span className="font-medium">{reason}</span>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <Card className="p-5">
            <div className="mb-4 flex items-end justify-between gap-3">
              <h2 className="text-xl font-bold sm:text-2xl">{tr("home.sections.faq")}</h2>
              <Link to="/faq">
                <Button variant="secondary">{tr("home.sections.allFaqs")}</Button>
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {homeFaqs.map((faq) => (
                <div key={faq.q} className="rounded-xl border p-4">
                  <h3 className="font-semibold">{faq.q}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-accent p-6 text-primary-foreground shadow-lg sm:p-10">
          <h2 className="text-2xl font-extrabold sm:text-3xl">{tr("home.sections.cta")}</h2>
          <p className="mt-2 max-w-2xl text-sm opacity-90 sm:text-base">
            {tr("home.sections.ctaDesc")}
          </p>
          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <Link to="/quiz/$setId" params={{ setId: "mock" }}>
              <Button
                size="lg"
                className="h-12 w-full bg-white text-primary shadow-md hover:bg-white/90"
              >
                {tr("home.hero.mock")}
              </Button>
            </Link>
            <Link to="/quiz">
              <Button variant="secondary" size="lg" className="h-12 w-full">
                {tr("home.hero.practice")}
              </Button>
            </Link>
            <Link to="/unlock">
              <Button
                size="lg"
                className="h-12 w-full rounded-full bg-yellow-400 text-black shadow-md hover:bg-yellow-300"
              >
                {tr("home.sections.unlockPremium")}
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
