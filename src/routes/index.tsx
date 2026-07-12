import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Timer, BookOpen, Trophy, Bot, Lock } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SiteLayout } from "@/components/site-layout";
import { useSite } from "@/lib/site-context";
import { AdUnit } from "@/components/ad-unit";

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
  const { lang, t } = useSite();
  const ml = lang === "ml" ? "lang-ml" : "";

  const features = [
    { icon: BookOpen, en: "500+ Questions", ml: "500+ ചോദ്യങ്ങൾ" },
    { icon: Timer, en: "20s Timer Per Q", ml: "ഓരോ ചോദ്യത്തിന് 20s" },
    { icon: Trophy, en: "20 Mock Test Sets", ml: "20 മോക്ക് ടെസ്റ്റ് സെറ്റുകൾ" },
    { icon: Bot, en: "AI Study Tutor", ml: "AI പഠന ട്യൂട്ടർ" },
  ];

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 py-6">
        <section className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-accent p-6 text-primary-foreground shadow-lg sm:p-10">
          <span
            className={`inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur ${ml}`}
          >
            <Sparkles className="h-3 w-3" />
            {lang === "en" ? "Kerala RTO Official Syllabus" : "കേരള RTO ഔദ്യോഗിക സിലബസ്"}
          </span>
          <h1 className={`mt-3 text-3xl font-extrabold leading-tight sm:text-4xl ${ml}`}>
            {lang === "en"
              ? "Pass your Kerala RTO Learner Licence — first attempt"
              : "ആദ്യ ശ്രമത്തിൽ കേരള RTO ലേണർ ലൈസൻസ് നേടൂ"}
          </h1>
          <p className={`mt-2 max-w-2xl text-sm opacity-90 sm:text-base ${ml}`}>
            {lang === "en"
              ? "Bilingual learning, 100+ traffic signs, 20 mock test sets with instant validation, and an AI tutor — all free."
              : "ദ്വിഭാഷാ പഠനം, 100+ ചിഹ്നങ്ങൾ, 20 മോക്ക് ടെസ്റ്റ് സെറ്റുകൾ, AI ട്യൂട്ടർ — എല്ലാം സൗജന്യം."}
          </p>
          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <Link to="/quiz/$setId" params={{ setId: "mock" }} className="w-full">
              <Button
                size="lg"
                className="h-12 w-full bg-white text-primary shadow-md hover:bg-white/90"
              >
                {lang === "en" ? "🚦 Start Mock Test" : "🚦 മോക്ക് ടെസ്റ്റ്"}
              </Button>
            </Link>
            <Link to="/quiz" className="w-full">
              <Button variant="secondary" size="lg" className="h-12 w-full">
                {lang === "en" ? "Practice Sets" : "പരിശീലനം"}
              </Button>
            </Link>
            <Link to="/ai-assistant" className="w-full">
              <Button
                size="lg"
                variant="outline"
                className="h-12 w-full border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              >
                <Bot className="mr-1 h-4 w-4" />
                {lang === "en" ? "Ask AI Tutor" : "AI ട്യൂട്ടറോട് ചോദിക്കൂ"}
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
                {lang === "en"
                  ? "Unlock Full Access — ₹45 (one-time)"
                  : "പൂർണ്ണ ആക്‌സസ് അൺലോക്ക് ചെയ്യൂ — ₹45"}
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

        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <h2 className={`text-xl font-bold sm:text-2xl ${ml}`}>
              {lang === "en" ? "Browse Categories" : "വിഭാഗങ്ങൾ"}
            </h2>
            <p className={`text-sm text-muted-foreground ${ml}`}>
              {lang === "en"
                ? "Tap any category for detailed learning content."
                : "വിശദമായ പഠന ഉള്ളടക്കത്തിന് ഏതെങ്കിലും വിഭാഗം തിരഞ്ഞെടുക്കുക."}
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
      </div>
    </SiteLayout>
  );
}
