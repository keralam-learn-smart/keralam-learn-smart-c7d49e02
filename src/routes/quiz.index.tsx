import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SiteLayout } from "@/components/site-layout";
import { useSite } from "@/lib/site-context";
import { AdUnit } from "@/components/ad-unit";
import {
  TOTAL_SETS,
  QUESTIONS_PER_SET,
  getCompletedSets,
  getSetScores,
} from "@/lib/quiz";

type Lang = "en" | "ml";

export const Route = createFileRoute("/quiz/")({
  validateSearch: (s: Record<string, unknown>): { lang: Lang } => ({
    lang: s.lang === "ml" ? "ml" : "en",
  }),
  head: () => ({
    meta: [
      { title: "Practice Sets & Mock Test — Kerala RTO" },
      {
        name: "description",
        content:
          "Choose from 10 practice sets of 25 questions each, or take a random Mock Test with a 20-second timer per question.",
      },
    ],
  }),
  component: QuizIndex,
});

function QuizIndex() {
  const { lang } = useSite();
  const ml = lang === "ml" ? "lang-ml" : "";
  const [completed, setCompleted] = useState<number[]>([]);
  const [scores, setScores] = useState<Record<string, number>>({});

  useEffect(() => {
    setCompleted(getCompletedSets());
    setScores(getSetScores());
  }, []);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-5xl px-4 py-6">
        <h1 className={`mb-1 text-2xl font-bold sm:text-3xl ${ml}`}>
          {lang === "en" ? "Practice Tests" : "പരിശീലന ടെസ്റ്റുകൾ"}
        </h1>
        <p className={`mb-6 text-sm text-muted-foreground ${ml}`}>
          {lang === "en"
            ? `${TOTAL_SETS} mock test sets · ${QUESTIONS_PER_SET} questions each · 20-second timer per question`
            : `${TOTAL_SETS} മോക്ക് ടെസ്റ്റ് സെറ്റുകൾ · ഓരോന്നിലും ${QUESTIONS_PER_SET} ചോദ്യങ്ങൾ · ഓരോ ചോദ്യത്തിന് 20 സെക്കൻഡ്`}
        </p>

        <Card className="mb-6 bg-gradient-to-br from-primary to-accent p-5 text-primary-foreground">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h2 className={`text-lg font-bold ${ml}`}>
                {lang === "en" ? "Mock Test" : "മോക്ക് ടെസ്റ്റ്"}
              </h2>
              <p className={`mt-1 text-sm opacity-90 ${ml}`}>
                {lang === "en"
                  ? `Random ${QUESTIONS_PER_SET} questions, exam-style.`
                  : `ക്രമരഹിതമായ ${QUESTIONS_PER_SET} ചോദ്യങ്ങൾ, പരീക്ഷാ ശൈലിയിൽ.`}
              </p>
            </div>
            <Link to="/quiz/$setId" params={{ setId: "mock" }}>
              <Button variant="secondary" className="shrink-0">
                {lang === "en" ? "Start" : "ആരംഭിക്കുക"}
              </Button>
            </Link>
          </div>
        </Card>

        <AdUnit format="auto" className="my-4" />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: TOTAL_SETS }, (_, i) => i + 1).map((id) => {
            const done = completed.includes(id);
            const score = scores[String(id)];
            return (
              <Link
                key={id}
                to="/quiz/$setId"
                params={{ setId: String(id) }}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
              >
                <Card className="cursor-pointer p-4 transition hover:border-primary hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`font-semibold ${ml}`}>
                        {lang === "en" ? `Set ${id}` : `സെറ്റ് ${id}`}
                      </h3>
                      <p className={`mt-1 text-xs text-muted-foreground ${ml}`}>
                        {lang === "en"
                          ? `${QUESTIONS_PER_SET} questions`
                          : `${QUESTIONS_PER_SET} ചോദ്യങ്ങൾ`}
                      </p>
                    </div>
                    {done && (
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                        {score != null ? `${score}/${QUESTIONS_PER_SET}` : "✓"}
                      </span>
                    )}
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </SiteLayout>
  );
}