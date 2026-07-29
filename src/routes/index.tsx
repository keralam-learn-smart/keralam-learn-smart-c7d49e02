import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  BookOpen,
  Car,
  CheckCircle2,
  GraduationCap,
  Headphones,
  HelpCircle,
  Map,
  MessageCircle,
  Search,
  ShieldCheck,
  Signal,
  Sparkles,
  Star,
  Timer,
  Trophy,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SiteLayout } from "@/components/site-layout";
import { useSite } from "@/lib/site-context";
import { createCanonicalLink, createOpenGraphMeta, breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => {
    const title = "Traffic Tips — Kerala Driving Academy";
    const description =
      "Premium Malayalam-first driving academy website with learner licence preparation, traffic rules, courses, FAQs and contact support.";
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
    },
    {
      title: "ട്രാഫിക് ചിഹ്നങ്ങൾ",
      text: "മുന്നറിയിപ്പ്, നിർബന്ധിതം, നിരോധനം, വിവര ചിഹ്നങ്ങൾ തിരിച്ചറിയാനുള്ള എളുപ്പമായ പഠനം.",
      icon: Signal,
    },
    {
      title: "സുരക്ഷിത ഡ്രൈവിംഗ്",
      text: "വേഗനിയന്ത്രണം, അകലം പാലിക്കൽ, മഴയിലും രാത്രിയിലും സുരക്ഷിതമായി ഓടിക്കുന്ന ശീലങ്ങൾ.",
      icon: ShieldCheck,
    },
    {
      title: "റോഡ് മാർക്കിംഗുകൾ",
      text: "സീബ്ര ക്രോസിംഗ്, സ്റ്റോപ്പ് ലൈൻ, ലെയ്ൻ മാർക്കിംഗ്, ഓവർടേക്കിംഗ് നിയന്ത്രണങ്ങൾ മനസ്സിലാക്കുക.",
      icon: Map,
    },
  ],
  en: [
    {
      title: "Learner Licence",
      text: "Clear guidance for theory tests, documents, booking, and exam preparation.",
      icon: GraduationCap,
    },
    {
      title: "Traffic Signs",
      text: "Simple learning for warning, mandatory, prohibitory, and information signs.",
      icon: Signal,
    },
    {
      title: "Safe Driving",
      text: "Speed discipline, safe distance, and habits for rain, night, and daily road conditions.",
      icon: ShieldCheck,
    },
    {
      title: "Road Markings",
      text: "Understand zebra crossings, stop lines, lane markings, and overtaking restrictions.",
      icon: Map,
    },
  ],
};

const courses = {
  ml: [
    {
      name: "ബിഗിനർ ഡ്രൈവിംഗ് പാക്ക്",
      level: "തുടക്കക്കാർ",
      duration: "21 ദിവസം",
      fee: "₹45 പഠന ആക്സസ്",
      detail: "വാഹന നിയന്ത്രണം, റോഡ് ബോധം, അടിസ്ഥാന നിയമങ്ങൾ, ആത്മവിശ്വാസം വളർത്തുന്ന പഠന പദ്ധതി.",
    },
    {
      name: "ലേണർ ടെസ്റ്റ് തയ്യാറെടുപ്പ്",
      level: "പരീക്ഷ",
      duration: "സ്വന്തം സമയത്ത്",
      fee: "₹45 ഒറ്റത്തവണ",
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
      fee: "₹45 learning access",
      detail:
        "Vehicle control, road awareness, essential rules, and a confidence-building learning plan.",
    },
    {
      name: "Learner Test Preparation",
      level: "Exam",
      duration: "Self-paced",
      fee: "₹45 one-time",
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

const testimonials = {
  ml: [
    {
      name: "അനൂപ് കെ.",
      text: "ചിഹ്നങ്ങളും നിയമങ്ങളും വ്യക്തമായി പഠിക്കാൻ കഴിഞ്ഞു. മോക്ക് ടെസ്റ്റ് ആത്മവിശ്വാസം കൂട്ടി.",
    },
    {
      name: "മീര ആർ.",
      text: "മലയാളത്തിൽ ഉള്ള വിശദീകരണം വളരെ സഹായിച്ചു. തുടക്കക്കാർക്ക് നല്ല പഠന ക്രമമാണ്.",
    },
    {
      name: "ഷിബു എസ്.",
      text: "സേഫ്റ്റി ടിപ്പുകളും റോഡ് മാർക്കിംഗുകളും ലളിതമായി മനസ്സിലാക്കാൻ സാധിച്ചു.",
    },
  ],
  en: [
    {
      name: "Anoop K.",
      text: "I could learn signs and rules clearly. The mock tests improved my confidence.",
    },
    {
      name: "Meera R.",
      text: "The Malayalam explanations were very helpful. The study flow is excellent for beginners.",
    },
    {
      name: "Shibu S.",
      text: "Safety tips and road markings were explained in a simple, practical way.",
    },
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
  const testimonialList = testimonials[lang];
  const faqList = faqs[lang];

  const searchable = useMemo(
    () => [
      ...categories.map((item) => ({ title: item.title, text: item.text, href: "#categories" })),
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
        <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
          <section className="relative mb-8 overflow-hidden rounded-[2rem] border border-orange-100 bg-white/90 p-6 shadow-2xl shadow-orange-950/10 backdrop-blur sm:p-10">
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-orange-200/40 blur-3xl" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
                <Sparkles className="h-4 w-4" /> {tr("common.premium")}
              </span>
              <h1 className="mt-5 max-w-4xl text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
                {tr("home.welcome.title")}
              </h1>
              <div className="mt-6 space-y-5 text-base leading-8 text-slate-700 sm:text-lg">
                {trArray("home.welcome.paragraphs").map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </section>

          <section className="relative mb-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-orange-600 p-6 text-white shadow-2xl shadow-slate-950/20 sm:p-12">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                  {tr("home.hero.eyebrow")}
                </p>
                <h2 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">
                  {tr("home.hero.title")}
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/85 sm:text-lg">
                  {tr("home.hero.subtitle")}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link to="/quiz/$setId" params={{ setId: "mock" }}>
                    <Button
                      size="lg"
                      className="h-12 rounded-full bg-orange-500 px-7 text-white hover:bg-orange-400"
                    >
                      {tr("home.hero.primary")}
                    </Button>
                  </Link>
                  <a href="#courses">
                    <Button size="lg" variant="secondary" className="h-12 rounded-full px-7">
                      {tr("home.hero.secondary")}
                    </Button>
                  </a>
                  <a href="#contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-12 rounded-full border-white/30 bg-white/10 px-7 text-white hover:bg-white/20 hover:text-white"
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
                    n: "₹45",
                    l: lang === "ml" ? "ഒറ്റത്തവണ ആക്സസ്" : "One-time access",
                    icon: BadgeCheck,
                  },
                  { n: "24/7", l: lang === "ml" ? "പഠന സൗകര്യം" : "Study access", icon: Timer },
                ].map((stat) => (
                  <div key={stat.l} className="flex items-center gap-4 rounded-2xl bg-white/10 p-4">
                    <stat.icon className="h-6 w-6 text-orange-300" />
                    <div>
                      <div className="text-2xl font-black">{stat.n}</div>
                      <div className="text-sm text-white/75">{stat.l}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-8 rounded-[2rem] bg-slate-50 p-5 shadow-sm" id="search">
            <div className="flex items-start gap-4">
              <Search className="mt-1 h-6 w-6 text-orange-500" />
              <div>
                <h2 className="text-2xl font-black text-slate-950">{tr("home.search.title")}</h2>
                <p className="mt-1 text-slate-600">{tr("home.search.subtitle")}</p>
              </div>
            </div>
            <input
              className="mt-5 w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm shadow-inner outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
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
                      className="rounded-2xl border bg-white p-4 shadow-sm transition hover:border-orange-300 hover:shadow-md"
                    >
                      <h3 className="font-bold text-slate-950">{r.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{r.text}</p>
                    </a>
                  ))
                ) : (
                  <p className="rounded-2xl bg-white p-4 text-sm text-slate-600">
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
              <Card
                key={cat.title}
                className="group rounded-3xl border-0 bg-white p-5 shadow-lg shadow-slate-950/5 transition hover:-translate-y-1 hover:shadow-orange-950/10"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-100 text-orange-600">
                  <cat.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-black">{cat.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{cat.text}</p>
              </Card>
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
                className="rounded-3xl border border-orange-100 bg-white p-6 shadow-xl shadow-slate-950/5"
              >
                <Car className="h-8 w-8 text-orange-500" />
                <h3 className="mt-4 text-xl font-black">{course.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{course.detail}</p>
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
                <Link to="/pricing">
                  <Button className="mt-5 w-full rounded-full bg-orange-500 hover:bg-orange-400">
                    {tr("common.learnMore")}
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
              <div key={b} className="flex items-center gap-3 rounded-3xl bg-slate-50 p-5">
                <CheckCircle2 className="h-6 w-6 text-orange-500" />
                <span className="font-bold text-slate-800">{b}</span>
              </div>
            ))}
          </div>

          <SectionHeader
            title={tr("home.testimonials.title")}
            subtitle={tr("home.testimonials.subtitle")}
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {testimonialList.map((item) => (
              <Card key={item.name} className="rounded-3xl border-0 bg-white p-6 shadow-lg">
                <div className="flex gap-1 text-orange-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 leading-7 text-slate-700">“{item.text}”</p>
                <p className="mt-4 font-black text-slate-950">{item.name}</p>
              </Card>
            ))}
          </div>

          <SectionHeader id="faq" title={tr("home.faq.title")} subtitle={tr("home.faq.subtitle")} />
          <div className="grid gap-4 lg:grid-cols-3">
            {faqList.map((faq) => (
              <Card key={faq.q} className="rounded-3xl bg-slate-50 p-5">
                <HelpCircle className="h-6 w-6 text-orange-500" />
                <h3 className="mt-3 font-black">{faq.q}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{faq.a}</p>
              </Card>
            ))}
          </div>

          <section
            id="contact"
            className="mt-12 grid gap-6 rounded-[2rem] bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white shadow-2xl shadow-orange-950/20 lg:grid-cols-[0.9fr_1.1fr] sm:p-10"
          >
            <div>
              <Headphones className="h-10 w-10" />
              <h2 className="mt-4 text-3xl font-black">{tr("home.contact.title")}</h2>
              <p className="mt-3 leading-7 text-white/85">{tr("home.contact.subtitle")}</p>
              <div className="mt-6 space-y-2 text-sm">
                <p>renjithraj154@gmail.com</p>
                <p>+91 94474 80651</p>
                <p>
                  Plavarthala Line, Thamalam, Karamana, Thiruvananthapuram – 695012, Kerala, India
                </p>
              </div>
            </div>
            <form
              className="rounded-3xl bg-white/15 p-4 backdrop-blur"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid gap-3">
                <input
                  required
                  className="rounded-2xl border border-white/20 bg-white px-4 py-3 text-slate-950"
                  placeholder={tr("home.contact.name")}
                />
                <input
                  required
                  className="rounded-2xl border border-white/20 bg-white px-4 py-3 text-slate-950"
                  placeholder={tr("home.contact.phone")}
                />
                <textarea
                  required
                  className="min-h-28 rounded-2xl border border-white/20 bg-white px-4 py-3 text-slate-950"
                  placeholder={tr("home.contact.message")}
                />
                <Button className="h-12 rounded-full bg-slate-950 text-white hover:bg-slate-800">
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

function SectionHeader({ id, title, subtitle }: { id?: string; title: string; subtitle: string }) {
  return (
    <div id={id} className="mb-5 mt-12 max-w-3xl">
      <p className="text-sm font-black uppercase tracking-[0.25em] text-orange-500">Traffic Tips</p>
      <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 leading-7 text-slate-600">{subtitle}</p>
    </div>
  );
}
