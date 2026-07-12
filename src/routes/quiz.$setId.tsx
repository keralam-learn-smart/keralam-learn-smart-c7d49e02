import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getSign } from "@/data/signs";
import {
  PASS_PERCENT,
  QUESTIONS_PER_SET,
  SECONDS_PER_QUESTION,
  TOTAL_SETS,
  getMockTestQuestions,
  getSetQuestions,
  markSetCompleted,
} from "@/lib/quiz";
import type { Question } from "@/data/questions";
import { SiteLayout } from "@/components/site-layout";
import { checkPaidAccess } from "@/lib/instamojo.functions";
import { useAuth } from "@/lib/auth-context";
import { Lock } from "lucide-react";

type Lang = "en" | "ml";
type Answer = number | null; // null = unanswered (timed out / skipped)

export const Route = createFileRoute("/quiz/$setId")({
  validateSearch: (s: Record<string, unknown>): { lang?: Lang } => ({
    lang: s.lang === "ml" ? "ml" : "en",
  }),
  head: () => ({
    meta: [{ title: "Practice Test — Kerala RTO" }],
  }),
  errorComponent: ({ error }) => (
    <div className="p-6 text-sm text-destructive">{error.message}</div>
  ),
  component: QuizRunner,
});

function QuizRunner() {
  const { setId } = Route.useParams();
  const { lang: initial } = Route.useSearch();
  const router = useRouter();
  const [lang, setLang] = useState<Lang>(initial);
  const ml = lang === "ml" ? "lang-ml" : "";
  const t = (s: { en: string; ml: string }) => s[lang];

  const isMock = setId === "mock";
  const setNum = isMock ? 0 : Number(setId);

  const requiresPayment = isMock || setNum > 1;
  const { user, loading: authLoading } = useAuth();
  const checkAccess = useServerFn(checkPaidAccess);
  const [accessState, setAccessState] = useState<"checking" | "ok" | "locked">(
    requiresPayment ? "checking" : "ok",
  );

  useEffect(() => {
    if (!requiresPayment) return;
    if (authLoading) return;
    if (!user) {
      setAccessState("locked");
      return;
    }
    checkAccess()
      .then((r) => setAccessState(r.hasAccess ? "ok" : "locked"))
      .catch(() => setAccessState("locked"));
  }, [requiresPayment, authLoading, user, checkAccess]);

  // Build the question list ONCE per mount.
  const questions = useMemo<Question[]>(() => {
    if (isMock) return getMockTestQuestions();
    if (!Number.isFinite(setNum) || setNum < 1 || setNum > TOTAL_SETS) return [];
    return getSetQuestions(setNum);
  }, [isMock, setNum]);

  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>(() => Array(questions.length).fill(null));
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(SECONDS_PER_QUESTION);
  const [finished, setFinished] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const current = questions[idx];

  if (requiresPayment && accessState !== "ok") {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-lg px-4 py-10">
          <Card className="p-6 text-center">
            <Lock className="mx-auto mb-3 h-10 w-10 text-primary" />
            <h1 className={`text-xl font-bold ${ml}`}>
              {lang === "en"
                ? accessState === "checking"
                  ? "Checking access…"
                  : "This test is locked"
                : accessState === "checking"
                  ? "ആക്‌സസ് പരിശോധിക്കുന്നു…"
                  : "ഈ ടെസ്റ്റ് ലോക്ക് ചെയ്‌തിരിക്കുന്നു"}
            </h1>
            {accessState === "locked" && (
              <>
                <p className={`mt-2 text-sm text-muted-foreground ${ml}`}>
                  {lang === "en"
                    ? "Set 1 is free. Unlock all 20 mock test sets and premium content for a one-time ₹45."
                    : "സെറ്റ് 1 സൗജന്യമാണ്. ₹45 ഒറ്റത്തവണ അടച്ച് എല്ലാ 20 സെറ്റുകളും പ്രീമിയം ഉള്ളടക്കവും അൺലോക്ക് ചെയ്യൂ."}
                </p>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <Link to="/unlock" className="flex-1">
                    <Button size="lg" className="w-full rounded-full">
                      {lang === "en" ? "Unlock for ₹45" : "₹45-ന് അൺലോക്ക് ചെയ്യൂ"}
                    </Button>
                  </Link>
                  <Link
                    to="/quiz/$setId"
                    params={{ setId: "1" }}
                    search={{ lang }}
                    className="flex-1"
                    reloadDocument
                  >
                    <Button size="lg" variant="outline" className="w-full rounded-full">
                      {lang === "en" ? "Try Free Set 1" : "സൗജന്യ സെറ്റ് 1"}
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </Card>
        </div>
      </SiteLayout>
    );
  }

  // Reset state and timer on question change.
  useEffect(() => {
    if (finished || !current) return;
    setSelected(null);
    setRevealed(false);
    setSecondsLeft(SECONDS_PER_QUESTION);
  }, [idx, current, finished]);

  // Countdown timer.
  useEffect(() => {
    if (finished || !current || revealed) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          // Time out: mark unanswered, reveal correct answer.
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          setAnswers((prev) => {
            const next = prev.slice();
            next[idx] = null;
            return next;
          });
          setRevealed(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [idx, current, revealed, finished]);

  if (!questions.length) {
    return (
      <div className="p-6">
        <p className="mb-4 text-sm text-muted-foreground">
          {lang === "en" ? "Invalid set." : "അസാധുവായ സെറ്റ്."}
        </p>
        <Link to="/quiz" search={{ lang }} className="text-primary underline">
          {lang === "en" ? "Back to tests" : "ടെസ്റ്റുകളിലേക്ക് മടങ്ങുക"}
        </Link>
      </div>
    );
  }

  function chooseAnswer(optIndex: number) {
    if (revealed) return;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setSelected(optIndex);
    setAnswers((prev) => {
      const next = prev.slice();
      next[idx] = optIndex;
      return next;
    });
    setRevealed(true);
  }

  function nextQuestion() {
    if (idx + 1 >= questions.length) {
      const correctCount = questions.reduce((n, q, i) => n + (answers[i] === q.correct ? 1 : 0), 0);
      if (!isMock) markSetCompleted(setNum, correctCount);
      setFinished(true);
      return;
    }
    setIdx(idx + 1);
  }

  if (finished) {
    return (
      <ResultView
        questions={questions}
        answers={answers}
        lang={lang}
        setLang={setLang}
        setId={setNum}
        isMock={isMock}
      />
    );
  }

  const sign = current.signId ? getSign(current.signId) : undefined;
  const signal =
    current.category === "traffic-signals" && !sign ? getSign("signal-red") : undefined;
  const isCorrect = selected !== null && selected === current.correct;
  const timerPct = (secondsLeft / SECONDS_PER_QUESTION) * 100;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <Button variant="ghost" size="sm" onClick={() => router.history.back()}>
            ← {lang === "en" ? "Exit" : "പുറത്തുകടക്കുക"}
          </Button>
          <div className={`text-sm font-medium ${ml}`}>
            {lang === "en"
              ? `Question ${idx + 1} of ${questions.length}`
              : `ചോദ്യം ${idx + 1} / ${questions.length}`}
          </div>
          <Button variant="outline" size="sm" onClick={() => setLang(lang === "en" ? "ml" : "en")}>
            {lang === "en" ? "മലയാളം" : "English"}
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6">
        {/* Timer bar */}
        <div className="mb-4">
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="font-medium">
              {isMock
                ? lang === "en"
                  ? "Mock Test"
                  : "മോക്ക് ടെസ്റ്റ്"
                : lang === "en"
                  ? `Set ${setNum}`
                  : `സെറ്റ് ${setNum}`}
            </span>
            <span
              className={`font-mono font-semibold ${
                secondsLeft <= 5 ? "text-destructive" : "text-foreground"
              }`}
            >
              {secondsLeft}s
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className={`h-full transition-[width] duration-1000 ease-linear ${
                secondsLeft <= 5 ? "bg-destructive" : "bg-primary"
              }`}
              style={{ width: `${timerPct}%` }}
            />
          </div>
        </div>

        {(sign || signal) && (
          <div className="mb-4 grid place-items-center">
            <div
              className="h-40 w-40 sm:h-48 sm:w-48"
              aria-label={sign ? sign.name.en : "Traffic signal"}
              dangerouslySetInnerHTML={{
                __html: (sign ?? signal!).svg,
              }}
            />
          </div>
        )}

        <Card className="mb-4 p-5">
          <p className={`text-base font-medium leading-relaxed ${ml}`}>{t(current.question)}</p>
        </Card>

        <div className="space-y-2">
          {current.options.map((opt, i) => {
            const isPicked = selected === i;
            const isRight = revealed && i === current.correct;
            const isWrongPick = revealed && isPicked && i !== current.correct;
            return (
              <button
                key={i}
                type="button"
                disabled={revealed}
                onClick={() => chooseAnswer(i)}
                className={[
                  "w-full rounded-xl border p-4 text-left text-sm transition",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  isRight
                    ? "border-green-600 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100"
                    : isWrongPick
                      ? "border-destructive bg-destructive/10 text-destructive"
                      : "border-border bg-card hover:border-primary",
                  revealed ? "cursor-default" : "cursor-pointer",
                  ml,
                ].join(" ")}
              >
                <span className="mr-2 inline-block min-w-6 font-semibold">
                  {String.fromCharCode(65 + i)}.
                </span>
                {t(opt)}
                {isRight && <span className="float-right">✓</span>}
                {isWrongPick && <span className="float-right">✕</span>}
              </button>
            );
          })}
        </div>

        {revealed && (
          <Card
            className={`mt-4 p-4 ${
              selected === null
                ? "border-amber-500"
                : isCorrect
                  ? "border-green-600"
                  : "border-destructive"
            }`}
          >
            <p className={`mb-1 text-sm font-semibold ${ml}`}>
              {selected === null
                ? lang === "en"
                  ? "⏱ Time up — marked unanswered"
                  : "⏱ സമയം കഴിഞ്ഞു — ഉത്തരം നൽകിയില്ല"
                : isCorrect
                  ? lang === "en"
                    ? "✓ Correct"
                    : "✓ ശരി"
                  : lang === "en"
                    ? "✕ Wrong"
                    : "✕ തെറ്റ്"}
            </p>
            <p className={`text-sm leading-relaxed ${ml}`}>{t(current.explanation)}</p>
          </Card>
        )}

        <div className="mt-6 flex justify-end">
          <Button onClick={nextQuestion} disabled={!revealed} size="lg">
            {idx + 1 >= questions.length
              ? lang === "en"
                ? "Finish"
                : "പൂർത്തിയാക്കുക"
              : lang === "en"
                ? "Next Question →"
                : "അടുത്ത ചോദ്യം →"}
          </Button>
        </div>
      </main>
    </div>
  );
}

function ResultView({
  questions,
  answers,
  lang,
  setLang,
  setId,
  isMock,
}: {
  questions: Question[];
  answers: Answer[];
  lang: Lang;
  setLang: (l: Lang) => void;
  setId: number;
  isMock: boolean;
}) {
  const ml = lang === "ml" ? "lang-ml" : "";
  const t = (s: { en: string; ml: string }) => s[lang];
  const correct = questions.reduce((n, q, i) => n + (answers[i] === q.correct ? 1 : 0), 0);
  const wrong = questions.reduce(
    (n, q, i) => n + (answers[i] !== null && answers[i] !== q.correct ? 1 : 0),
    0,
  );
  const unanswered = answers.filter((a) => a === null).length;
  const pct = Math.round((correct / questions.length) * 100);
  const passed = pct >= PASS_PERCENT;
  const wrongOnes = questions
    .map((q, i) => ({ q, ans: answers[i], i }))
    .filter((x) => x.ans !== x.q.correct);

  const nextSet = !isMock && setId < TOTAL_SETS ? setId + 1 : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/quiz" search={{ lang }}>
            <Button variant="ghost" size="sm">
              ← {lang === "en" ? "All tests" : "എല്ലാ ടെസ്റ്റുകൾ"}
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={() => setLang(lang === "en" ? "ml" : "en")}>
            {lang === "en" ? "മലയാളം" : "English"}
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6">
        <Card
          className={`mb-6 p-6 text-center ${passed ? "border-green-600" : "border-destructive"}`}
        >
          <p className={`text-sm uppercase tracking-wide text-muted-foreground ${ml}`}>
            {isMock
              ? lang === "en"
                ? "Mock Test Result"
                : "മോക്ക് ടെസ്റ്റ് ഫലം"
              : lang === "en"
                ? `Set ${setId} Result`
                : `സെറ്റ് ${setId} ഫലം`}
          </p>
          <p className="my-3 text-5xl font-bold">{pct}%</p>
          <p
            className={`text-lg font-semibold ${
              passed ? "text-green-700" : "text-destructive"
            } ${ml}`}
          >
            {passed
              ? lang === "en"
                ? "PASS ✓"
                : "വിജയം ✓"
              : lang === "en"
                ? "FAIL — keep practising"
                : "പരാജയം — കൂടുതൽ പരിശീലിക്കുക"}
          </p>
        </Card>

        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Card className="p-4 text-center">
            <p className="text-xs text-muted-foreground">{lang === "en" ? "Total" : "ആകെ"}</p>
            <p className="text-2xl font-bold">{questions.length}</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-xs text-green-700">{lang === "en" ? "Correct" : "ശരി"}</p>
            <p className="text-2xl font-bold text-green-700">{correct}</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-xs text-destructive">{lang === "en" ? "Wrong" : "തെറ്റ്"}</p>
            <p className="text-2xl font-bold text-destructive">{wrong}</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-xs text-amber-600">{lang === "en" ? "Skipped" : "ഒഴിവാക്കി"}</p>
            <p className="text-2xl font-bold text-amber-600">{unanswered}</p>
          </Card>
        </div>

        {wrongOnes.length > 0 && (
          <div className="mb-6">
            <h2 className={`mb-3 text-lg font-semibold ${ml}`}>
              {lang === "en" ? "Review Mistakes" : "തെറ്റുകൾ പരിശോധിക്കുക"}
            </h2>
            <div className="space-y-3">
              {wrongOnes.map(({ q, ans, i }) => (
                <Card key={q.id} className="p-4">
                  <p className={`text-xs text-muted-foreground ${ml}`}>
                    {lang === "en" ? `Question ${i + 1}` : `ചോദ്യം ${i + 1}`}
                  </p>
                  <p className={`mt-1 text-sm font-medium ${ml}`}>{t(q.question)}</p>
                  {ans !== null && (
                    <p className={`mt-2 text-sm text-destructive ${ml}`}>
                      ✕ {lang === "en" ? "Your answer: " : "നിങ്ങളുടെ ഉത്തരം: "}
                      {t(q.options[ans])}
                    </p>
                  )}
                  {ans === null && (
                    <p className={`mt-2 text-sm text-amber-600 ${ml}`}>
                      ⏱ {lang === "en" ? "Unanswered" : "ഉത്തരം നൽകിയില്ല"}
                    </p>
                  )}
                  <p className={`mt-1 text-sm text-green-700 ${ml}`}>
                    ✓ {lang === "en" ? "Correct: " : "ശരി: "}
                    {t(q.options[q.correct])}
                  </p>
                  <p className={`mt-2 text-xs text-muted-foreground ${ml}`}>{t(q.explanation)}</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 sm:flex-row">
          {nextSet && (
            <Link
              to="/quiz/$setId"
              params={{ setId: String(nextSet) }}
              search={{ lang }}
              className="flex-1"
              reloadDocument
            >
              <Button size="lg" className="w-full">
                {lang === "en" ? `Next Set (${nextSet}) →` : `അടുത്ത സെറ്റ് (${nextSet}) →`}
              </Button>
            </Link>
          )}
          <Link
            to="/quiz/$setId"
            params={{ setId: isMock ? "mock" : String(setId) }}
            search={{ lang }}
            className="flex-1"
            reloadDocument
          >
            <Button variant="outline" size="lg" className="w-full">
              {lang === "en" ? "Retry" : "വീണ്ടും ശ്രമിക്കുക"}
            </Button>
          </Link>
          <Link to="/quiz" search={{ lang }} className="flex-1">
            <Button variant="ghost" size="lg" className="w-full">
              {lang === "en" ? "All Tests" : "എല്ലാ ടെസ്റ്റുകൾ"}
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
