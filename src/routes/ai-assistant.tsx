import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bot, Send, User } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { SiteLayout } from "@/components/site-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSite } from "@/lib/site-context";
import { askTutor } from "@/lib/ai.functions";

type Msg = { role: "user" | "assistant"; content: string };

export const Route = createFileRoute("/ai-assistant")({
  head: () => ({
    meta: [
      { title: "AI Study Assistant — Traffic Tips" },
      { name: "description", content: "Ask anything about the Kerala RTO learner licence test in English or Malayalam. Free AI tutor." },
      { property: "og:title", content: "AI Study Assistant — Traffic Tips" },
      { property: "og:description", content: "AI-powered Malayalam + English tutor for the Kerala RTO LL test." },
    ],
  }),
  component: AssistantPage,
});

const SUGGESTIONS = [
  { en: "Explain right of way at a roundabout", ml: "റൗണ്ടെബൗട്ടിൽ വഴി മുൻഗണന വിശദീകരിക്കുക" },
  { en: "What is the fine for not wearing a helmet?", ml: "ഹെൽമെറ്റ് ധരിക്കാത്തതിന് പിഴ എത്ര?" },
  { en: "How do I apply for a permanent driving licence?", ml: "പെർമനന്റ് ലൈസൻസിന് എങ്ങനെ അപേക്ഷിക്കണം?" },
  { en: "Difference between mandatory and warning signs", ml: "നിർബന്ധിതവും മുന്നറിയിപ്പ് ചിഹ്നങ്ങളും തമ്മിലുള്ള വ്യത്യാസം" },
];

function AssistantPage() {
  const { lang } = useSite();
  const ml = lang === "ml" ? "lang-ml" : "";
  const ask = useServerFn(askTutor);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  // Do NOT auto-scroll after responses — keep the user's current reading position.

  async function send(text: string) {
    const userMsg: Msg = { role: "user", content: text };
    const history = messages.slice(-10);
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await ask({ data: { message: text, lang, history } });
      setMessages((m) => [...m, { role: "assistant", content: res.reply }]);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Network error";
      setMessages((m) => [...m, { role: "assistant", content: `Sorry — ${msg}` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SiteLayout>
      <div className="mx-auto flex max-w-3xl flex-col px-4 py-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${ml}`}>
              {lang === "en" ? "AI Study Assistant" : "AI പഠന സഹായി"}
            </h1>
            <p className={`text-xs text-muted-foreground ${ml}`}>
              {lang === "en"
                ? "Ask anything about Kerala RTO rules, signs, fines."
                : "കേരള RTO നിയമങ്ങൾ, ചിഹ്നങ്ങൾ, പിഴകൾ — എന്തും ചോദിക്കാം."}
            </p>
          </div>
        </div>

        {messages.length === 0 && (
          <Card className="mb-4 p-4">
            <p className={`mb-3 text-sm font-medium ${ml}`}>
              {lang === "en" ? "Try asking:" : "ഇത് ചോദിച്ചു നോക്കൂ:"}
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => send(lang === "en" ? s.en : s.ml)}
                  className={`rounded-full border border-border bg-card px-3 py-1.5 text-xs transition hover:border-primary hover:bg-primary/10 ${ml}`}
                >
                  {lang === "en" ? s.en : s.ml}
                </button>
              ))}
            </div>
          </Card>
        )}

        <div className="mb-4 flex-1 space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-gradient-to-br from-primary to-accent text-primary-foreground"
                }`}
              >
                {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              <Card
                className={`max-w-[80%] whitespace-pre-wrap p-3 text-sm leading-relaxed ${ml} ${
                  m.role === "user" ? "bg-primary/10" : ""
                }`}
              >
                {m.content}
              </Card>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Bot className="h-4 w-4 animate-pulse" />
              {lang === "en" ? "Thinking…" : "ചിന്തിക്കുന്നു…"}
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim() && !loading) send(input.trim());
          }}
          className="sticky bottom-2 flex gap-2 rounded-2xl border border-border bg-card p-2 shadow-lg"
        >
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (input.trim() && !loading) send(input.trim());
              }
            }}
            placeholder={
              lang === "en"
                ? "Ask in English or Malayalam…"
                : "ഇംഗ്ലീഷിലോ മലയാളത്തിലോ ചോദിക്കാം…"
            }
            rows={1}
            className="min-h-10 flex-1 resize-none border-0 focus-visible:ring-0"
          />
          <Button type="submit" size="icon" disabled={loading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className={`mt-2 text-center text-[10px] text-muted-foreground ${ml}`}>
          {lang === "en"
            ? "AI can make mistakes — always verify with the official RTO."
            : "AI തെറ്റാം — ഔദ്യോഗിക RTO യിൽ ഉറപ്പാക്കുക."}
        </p>
      </div>
    </SiteLayout>
  );
}