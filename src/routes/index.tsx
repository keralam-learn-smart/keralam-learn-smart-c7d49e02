import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  BookOpen,
  Bot,
  Car,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  Headphones,
  HelpCircle,
  Map,
  MessageCircle,
  Search,
  ShieldCheck,
  Signal,
  Timer,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SiteLayout } from "@/components/site-layout";
import { useSite } from "@/lib/site-context";
import { createCanonicalLink, createOpenGraphMeta, breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => {
    const title = "Traffic Tips — 100% Free Learning Platform";
    const description =
      "Learn completely FREE with unlimited Question & Answers, Mock Tests and Study Materials for the Kerala RTO learner licence.";
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
      ],
    };
  },
  component: Index,
});

const categoryContent = {
  ml: [
    {
      title: "ലേണർ ലൈസൻസ്",
      text: "തിയറി ടെസ്റ്റ്, രേഖകൾ, ബുക്കിംഗ്, പരീക്ഷാ തയ്യാറെടുപ്പ് എന്നിവയ്ക്ക് വ്യക്തമായ മാർഗ്ഗനിർദ്ദേശം.",
      icon: GraduationCap,
      slug: "learner-licence",
    },
    {
      title: "ട്രാഫിക് ചിഹ്നങ്ങൾ",
      text: "മുന്നറിയിപ്പ്, നിർബന്ധിതം, നിരോധനം, വിവര ചിഹ്നങ്ങൾ തിരിച്ചറിയാനുള്ള എളുപ്പമായ പഠനം.",
      icon: Signal,
      slug: "traffic-signs",
    },
    {
      title: "സുരക്ഷിത ഡ്രൈവിംഗ്",
      text: "വേഗനിയന്ത്രണം, അകലം പാലിക്കൽ, മഴയിലും രാത്രിയിലും സുരക്ഷിതമായി ഓടിക്കുന്ന ശീലങ്ങൾ.",
      icon: ShieldCheck,
      slug: "road-safety",
    },
    {
      title: "റോഡ് മാർക്കിംഗുകൾ",
      text: "സീബ്ര ക്രോസിംഗ്, സ്റ്റോപ്പ് ലൈൻ, ലെയ്ൻ മാർക്കിംഗ്, ഓവർടേക്കിംഗ് നിയന്ത്രണങ്ങൾ മനസ്സിലാക്കുക.",
      icon: Map,
      slug: "road-markings",
    },
  ],
  en: [
    {
      title: "Learner Licence",
      text: "Clear guidance for theory tests, documents, booking, and exam preparation.",
      icon: GraduationCap,
      slug: "learner-licence",
    },
    {
      title: "Traffic Signs",
      text: "Simple learning for warning, mandatory, prohibitory, and information signs.",
      icon: Signal,
      slug: "traffic-signs",
    },
    {
      title: "Safe Driving",
      text: "Speed discipline, safe distance, and habits for rain, night, and daily road conditions.",
      icon: ShieldCheck,
      slug: "road-safety",
    },
    {
      title: "Road Markings",
      text: "Understand zebra crossings, stop lines, lane markings, and overtaking restrictions.",
      icon: Map,
      slug: "road-markings",
    },
  ],
};

const courses = {
  ml: [
    {
      name: "ബിഗിനർ ഡ്രൈവിംഗ് പാക്ക്",
      level: "തുടക്കക്കാർ",
      duration: "21 ദിവസം",
      fee: "പൂർണ്ണമായും സൗജന്യം",
      detail: "വാഹന നിയന്ത്രണം, റോഡ് ബോധം, അടിസ്ഥാന നിയമങ്ങൾ, ആത്മവിശ്വാസം വളർത്തുന്ന പഠന പദ്ധതി.",
    },
    {
      name: "ലേണർ ടെസ്റ്റ് തയ്യാറെടുപ്പ്",
      level: "പരീക്ഷ",
      duration: "സ്വന്തം സമയത്ത്",
      fee: "സൗജന്യം",
      detail: "ചിഹ്നങ്ങൾ, സിഗ്നലുകൾ, റോഡ് നിയമങ്ങൾ, മോക്ക് ടെസ്റ്റുകൾ, ഉടൻ ഫീഡ്ബാക്ക്.",
    },
    {
      name: "സേഫ്റ്റി റിഫ്രഷർ",
      level: "എല്ലാവർക്കും",
      duration: "7 ദിവസം",
      fee: "ഉൾപ്പെടുത്തിയിരിക്കുന്നു",
      detail: "ഡിഫൻസീവ് ഡ്രൈവിംഗ്, മഴക്കാല സുരക്ഷ, രാത്രിഡ്രൈവിംഗ്, അടിയന്തര സാഹചര്യം.",
    },
  ],
  en: [
    {
      name: "Beginner Driving Pack",
      level: "Beginner",
      duration: "21 days",
      fee: "Completely Free",
      detail:
        "Vehicle control, road awareness, essential rules, and a confidence-building learning plan.",
    },
    {
      name: "Learner Test Preparation",
      level: "Exam",
      duration: "Self-paced",
      fee: "Free",
      detail: "Signs, signals, road rules, mock tests, and instant feedback.",
    },
    {
      name: "Safety Refresher",
      level: "All learners",
      duration: "7 days",
      fee: "Included",
      detail: "Defensive driving, monsoon safety, night driving, and emergency situations.",
    },
  ],
};

const benefits = {
  ml: [
    "മലയാളം ആദ്യം ലഭിക്കുന്ന പഠനാനുഭവം",
    "സുതാര്യമായ കോഴ്സ് ഘടന",
    "പ്രായോഗിക റോഡ് സുരക്ഷാ മാർഗ്ഗനിർദ്ദേശം",
    "മൊബൈൽ, ടാബ്ലെറ്റ്, ഡെസ്ക്ടോപ്പ് സൗഹൃദം",
  ],
  en: [
    "Malayalam-first learning experience",
    "Transparent course structure",
    "Practical road-safety guidance",
    "Mobile, tablet, and desktop friendly",
  ],
};

const faqs = {
  ml: [
    {
      q: "ഡ്രൈവിംഗ് പഠനം എവിടെ നിന്ന് തുടങ്ങണം?",
      a: "അംഗീകാരമുള്ള ഡ്രൈവിംഗ് സ്കൂൾ കണ്ടെത്തി, തിയറി ഭാഗവും പ്രാക്ടിക്കൽ പരിശീലനവും ക്രമമായി തുടങ്ങുക.",
    },
    {
      q: "ലേണർ ലൈസൻസ് ടെസ്റ്റിൽ എന്താണ് ചോദിക്കുന്നത്?",
      a: "റോഡ് നിയമങ്ങൾ, ട്രാഫിക് സിഗ്നലുകൾ, ചിഹ്നങ്ങൾ, സുരക്ഷാ ശീലങ്ങൾ എന്നിവയാണ് പ്രധാനമായി ചോദിക്കുന്നത്.",
    },
    {
      q: "പ്രാക്ടിക്കൽ പരിശീലനം നിർബന്ധമാണോ?",
      a: "അതെ. സുരക്ഷിതമായി വണ്ടി നിയന്ത്രിക്കാൻ യോഗ്യതയുള്ള ഇൻസ്ട്രക്ടറുടെ മേൽനോട്ടം ആവശ്യമാണ്.",
    },
  ],
  en: [
    {
      q: "Where should I start learning to drive?",
      a: "Choose an approved driving school and begin theory learning and practical training in a structured way.",
    },
    {
      q: "What is asked in the learner licence test?",
      a: "Road rules, traffic signals, signs, and safe-driving habits are the main areas tested.",
    },
    {
      q: "Is practical training necessary?",
      a: "Yes. A qualified instructor is important for learning safe vehicle control on real roads.",
    },
  ],
};

function Index() {
  const { lang, tr, trArray } = useSite();
  const [searchTerm, setSearchTerm] = useState("");
  const ml = lang === "ml" ? "lang-ml" : "";
  const categories = categoryContent[lang];
  const courseList = courses[lang];
  const benefitList = benefits[lang];
  const faqList = faqs[lang];

  const searchable = useMemo(
    () => [
      ...categories.map((item) => ({
        title: item.title,
        text: item.text,
        href: `/category/${item.slug}`,
      })),
      ...courseList.map((item) => ({ title: item.name, text: item.detail, href: "#courses" })),
      ...faqList.map((item) => ({ title: item.q, text: item.a, href: "#faq" })),
    ],
    [categories, courseList, faqList],
  );
  const results = searchTerm.trim()
    ? searchable
        .filter((item) =>
          `${item.title} ${item.text}`.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .slice(0, 6)
    : [];

  return (
    <SiteLayout>
      <div className={`overflow-hidden bg-background ${ml}`}>
        <div className="mx-auto max-w-6xl px-3 py-6 sm:px-4 sm:py-10">
          <section className="relative mb-8 overflow-hidden rounded-[1.5rem] border border-orange-100 dark:border-border bg-white/90 dark:bg-card/90 p-4 shadow-2xl shadow-orange-950/10 backdrop-blur sm:rounded-[2rem] sm:p-10">
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-orange-200/40 blur-3xl" />
            <div className="relative">
              <h1 className="max-w-4xl text-[clamp(1.55rem,7vw,2.35rem)] font-black leading-[1.2] tracking-tight text-slate-950 dark:text-foreground sm:text-5xl sm:leading-[1.15]">
                {tr("home.welcome.title")}
              </h1>
              <div className="mt-6 space-y-5 text-[0.98rem] leading-8 text-slate-700 dark:text-muted-foreground sm:text-lg">
                {trArray("home.welcome.paragraphs").map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-orange-50 via-background to-purple-50 p-4 shadow-lg dark:from-slate-900 dark:via-background dark:to-orange-950/40 sm:rounded-[2rem] sm:p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <QuickActionCard
                  to="/mock-tests"
                  icon={ClipboardCheck}
                  label={tr("home.quickActions.mockTest")}
                />
                <QuickActionCard
                  to="/ai-assistant"
                  icon={Bot}
                  label={tr("home.quickActions.aiAssistant")}
                />
                <QuickActionCard
                  to="/course"
                  icon={GraduationCap}
                  label={tr("home.quickActions.course")}
                />
              </div>
            </div>
          </section>

          <section className="relative mb-8 overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-slate-950 via-slate-900 to-orange-600 p-4 text-white shadow-2xl shadow-slate-950/20 sm:rounded-[2rem] sm:p-12">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                  {tr("home.hero.eyebrow")}
                </p>
                <h2 className="mt-5 text-[clamp(1.6rem,7.5vw,2.75rem)] font-black leading-[1.2] sm:text-[clamp(2rem,6vw,3.75rem)] sm:leading-tight">
                  {tr("home.hero.title")}
                </h2>
                <p className="mt-5 max-w-2xl text-[0.9rem] leading-7 text-white/85 sm:text-lg sm:leading-8">
                  {tr("home.hero.subtitle")}
                </p>
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {trArray("home.hero.features").map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-white/90">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-orange-300" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link className="w-full sm:w-auto" to="/quiz/$setId" params={{ setId: "mock" }}>
                    <Button
                      size="lg"
                      className="min-h-12 h-auto w-full whitespace-normal rounded-full bg-orange-500 px-5 py-3 text-center leading-6 text-white hover:bg-orange-400 sm:w-auto sm:px-7"
                    >
                      {tr("home.hero.primary")}
                    </Button>
                  </Link>
                  <a className="w-full sm:w-auto" href="#courses">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="min-h-12 h-auto w-full whitespace-normal rounded-full px-5 py-3 text-center leading-6 sm:w-auto sm:px-7"
                    >
                      {tr("home.hero.secondary")}
                    </Button>
                  </a>
                  <a className="w-full sm:w-auto" href="#contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="min-h-12 h-auto w-full whitespace-normal rounded-full border-white/30 bg-white/10 px-5 py-3 text-center leading-6 text-white hover:bg-white/20 hover:text-white sm:w-auto sm:px-7"
                    >
                      {tr("home.hero.tertiary")}
                    </Button>
                  </a>
                </div>
              </div>
              <div className="grid gap-3 rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
                {[
                  { n: "500+", l: lang === "ml" ? "ചോദ്യങ്ങൾ" : "Questions", icon: BookOpen },
                  { n: "20", l: lang === "ml" ? "മോക്ക് ടെസ്റ്റുകൾ" : "Mock tests", icon: Trophy },
                  {
                    n: lang === "ml" ? "സൗജന്യം" : "FREE",
                    l: lang === "ml" ? "പരിധിയില്ലാത്ത ആക്സസ്" : "Unlimited access",
                    icon: BadgeCheck,
                  },
                  { n: "24/7", l: lang === "ml" ? "പഠന സൗകര്യം" : "Study access", icon: Timer },
                ].map((stat) => (
                  <div
                    key={stat.l}
                    className="flex min-w-0 items-center gap-3 rounded-2xl bg-white/10 p-3 sm:gap-4 sm:p-4"
                  >
                    <stat.icon className="h-6 w-6 shrink-0 text-orange-300" />
                    <div>
                      <div className="text-2xl font-black">{stat.n}</div>
                      <div className="text-sm text-white/75">{stat.l}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            className="mb-8 rounded-[1.5rem] bg-slate-50 dark:bg-muted/40 p-4 shadow-sm sm:rounded-[2rem] sm:p-5"
            id="search"
          >
            <div className="flex min-w-0 items-start gap-3 sm:gap-4">
              <Search className="mt-1 h-6 w-6 text-orange-500" />
              <div>
                <h2 className="text-[1.35rem] font-black leading-tight text-slate-950 dark:text-foreground sm:text-2xl">
                  {tr("home.search.title")}
                </h2>
                <p className="mt-1 text-slate-600 dark:text-muted-foreground">
                  {tr("home.search.subtitle")}
                </p>
              </div>
            </div>
            <input
              className="mt-5 w-full rounded-2xl border border-slate-200 dark:border-border bg-white dark:bg-card px-5 py-4 text-sm shadow-inner outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              aria-label={tr("home.search.title")}
              placeholder={tr("home.search.placeholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {results.length ? (
                  results.map((r) => (
                    <a
                      key={r.title}
                      href={r.href}
                      className="rounded-2xl border bg-white dark:bg-card p-4 shadow-sm transition hover:border-orange-300 hover:shadow-md"
                    >
                      <h3 className="font-bold text-slate-950 dark:text-foreground">{r.title}</h3>
                      <p className="mt-1 text-sm text-slate-600 dark:text-muted-foreground">
                        {r.text}
                      </p>
                    </a>
                  ))
                ) : (
                  <p className="rounded-2xl bg-white dark:bg-card p-4 text-sm text-slate-600 dark:text-muted-foreground">
                    {tr("home.search.empty")}
                  </p>
                )}
              </div>
            )}
          </section>

          <SectionHeader
            id="categories"
            title={tr("home.categories.title")}
            subtitle={tr("home.categories.subtitle")}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                to="/category/$slug"
                params={{ slug: cat.slug }}
                className="block min-w-0 rounded-3xl"
              >
                <Card className="group min-w-0 rounded-3xl border-0 bg-white dark:bg-card p-5 shadow-lg shadow-slate-950/5 transition hover:-translate-y-1 hover:shadow-orange-950/10">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-100 text-orange-600">
                    <cat.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-black">{cat.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{cat.text}</p>
                </Card>
              </Link>
            ))}
          </div>

          <SectionHeader
            id="courses"
            title={tr("home.courses.title")}
            subtitle={tr("home.courses.subtitle")}
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {courseList.map((course) => (
              <Card
                key={course.name}
                className="min-w-0 rounded-3xl border border-orange-100 dark:border-border bg-white dark:bg-card p-5 shadow-xl shadow-slate-950/5 sm:p-6"
              >
                <Car className="h-8 w-8 text-orange-500" />
                <h3 className="mt-4 text-xl font-black">{course.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-muted-foreground">
                  {course.detail}
                </p>
                <div className="mt-5 grid gap-2 text-sm">
                  <p>
                    <strong>{tr("common.level")}:</strong> {course.level}
                  </p>
                  <p>
                    <strong>{tr("common.duration")}:</strong> {course.duration}
                  </p>
                  <p>
                    <strong>{tr("common.fee")}:</strong> {course.fee}
                  </p>
                </div>
                <Link to="/course">
                  <Button className="mt-5 w-full rounded-full bg-orange-500 hover:bg-orange-400">
                    <span className="whitespace-normal leading-6">{tr("common.learnMore")}</span>
                  </Button>
                </Link>
              </Card>
            ))}
          </div>

          <SectionHeader
            title={tr("home.benefits.title")}
            subtitle={tr("home.benefits.subtitle")}
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {benefitList.map((b) => (
              <div
                key={b}
                className="flex min-w-0 items-start gap-3 rounded-3xl bg-slate-50 dark:bg-muted/40 p-5"
              >
                <CheckCircle2 className="h-6 w-6 shrink-0 text-orange-500" />
                <span className="font-bold text-slate-800 dark:text-foreground">{b}</span>
              </div>
            ))}
          </div>

          <SectionHeader id="faq" title={tr("home.faq.title")} subtitle={tr("home.faq.subtitle")} />
          <div className="grid gap-4 lg:grid-cols-3">
            {faqList.map((faq) => (
              <Card key={faq.q} className="min-w-0 rounded-3xl bg-slate-50 dark:bg-muted/40 p-5">
                <HelpCircle className="h-6 w-6 text-orange-500" />
                <h3 className="mt-3 font-black">{faq.q}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-muted-foreground">
                  {faq.a}
                </p>
              </Card>
            ))}
          </div>

          <section
            id="contact"
            className="mt-12 grid gap-6 rounded-[1.5rem] bg-gradient-to-br from-orange-500 to-orange-600 p-4 text-white shadow-2xl shadow-orange-950/20 sm:rounded-[2rem] sm:p-10 lg:grid-cols-[0.9fr_1.1fr]"
          >
            <div>
              <Headphones className="h-10 w-10" />
              <h2 className="mt-4 text-[1.75rem] font-black leading-tight sm:text-3xl">
                {tr("home.contact.title")}
              </h2>
              <p className="mt-3 leading-7 text-white/85">{tr("home.contact.subtitle")}</p>
              <div className="mt-6 space-y-2 break-words text-sm leading-6">
                <p>renjithraj154@gmail.com</p>
                <p>+91 94474 80651</p>
                <p>
                  Plavarthala Line, Thamalam, Karamana, Thiruvananthapuram – 695012, Kerala, India
                </p>
              </div>
            </div>
            <form
              className="min-w-0 rounded-3xl bg-white/15 p-3 backdrop-blur sm:p-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid gap-3">
                <input
                  required
                  className="rounded-2xl border border-white/20 bg-white dark:bg-card px-4 py-3 text-slate-950 dark:text-foreground"
                  placeholder={tr("home.contact.name")}
                />
                <input
                  required
                  className="rounded-2xl border border-white/20 bg-white dark:bg-card px-4 py-3 text-slate-950 dark:text-foreground"
                  placeholder={tr("home.contact.phone")}
                />
                <textarea
                  required
                  className="min-h-28 rounded-2xl border border-white/20 bg-white dark:bg-card px-4 py-3 text-slate-950 dark:text-foreground"
                  placeholder={tr("home.contact.message")}
                />
                <Button className="min-h-12 h-auto whitespace-normal rounded-full bg-slate-950 px-5 py-3 leading-6 text-white hover:bg-slate-800">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {tr("home.contact.submit")}
                </Button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </SiteLayout>
  );
}

function QuickActionCard({
  to,
  icon: Icon,
  label,
}: {
  to: string;
  icon: LucideIcon;
  label: string;
}) {
  return (
    <Link
      to={to}
      className="group flex min-h-[5.5rem] items-center gap-4 overflow-hidden rounded-2xl border border-border bg-white/80 p-4 shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg active:scale-[0.97] dark:border-border dark:bg-card/80 dark:hover:border-orange-400"
    >
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-md transition-transform duration-200 group-hover:scale-110">
        <Icon className="h-6 w-6" />
      </div>
      <span className="text-lg font-bold text-foreground">{label}</span>
    </Link>
  );
}

function SectionHeader({ id, title, subtitle }: { id?: string; title: string; subtitle: string }) {
  return (
    <div id={id} className="mb-5 mt-10 max-w-3xl sm:mt-12">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500 sm:text-sm sm:tracking-[0.25em]">
        Traffic Tips
      </p>
      <h2 className="mt-2 text-2xl font-black leading-tight tracking-tight text-slate-950 dark:text-foreground sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 leading-7 text-slate-600 dark:text-muted-foreground">{subtitle}</p>
    </div>
  );
}
