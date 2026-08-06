import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Bot, Send, User, RotateCcw, Square, RefreshCw, Paperclip, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { SiteLayout } from "@/components/site-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSite } from "@/lib/site-context";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";
import {
  fileToAttachment,
  MAX_ATTACHMENTS,
  type ChatAttachment,
} from "@/lib/image-attachments";

export const Route = createFileRoute("/ai-assistant")({
  head: () => ({
    meta: [
      { title: "AI Study Assistant — Traffic Tips" },
      {
        name: "description",
        content:
          "Ask anything about the Kerala RTO learner licence test in English or Malayalam with the Traffic Tips AI tutor.",
      },
      { property: "og:title", content: "AI Study Assistant — Traffic Tips" },
      {
        property: "og:description",
        content: "AI-powered Malayalam + English tutor for the Kerala RTO LL test.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AssistantPage,
});

const SUGGESTIONS = [
  { en: "Explain right of way at a roundabout", ml: "റൗണ്ടെബൗട്ടിൽ വഴി മുൻഗണന വിശദീകരിക്കുക" },
  { en: "What is the fine for not wearing a helmet?", ml: "ഹെൽമെറ്റ് ധരിക്കാത്തതിന് പിഴ എത്ര?" },
  {
    en: "How do I apply for a permanent driving licence?",
    ml: "പെർമനന്റ് ലൈസൻസിന് എങ്ങനെ അപേക്ഷിക്കണം?",
  },
  {
    en: "Difference between mandatory and warning signs",
    ml: "നിർബന്ധിതവും മുന്നറിയിപ്പ് ചിഹ്നങ്ങളും തമ്മിലുള്ള വ്യത്യാസം",
  },
];

function ChatImage({ src, alt }: { src: string; alt: string }) {
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  if (state === "error") {
    return (
      <div className="flex items-center gap-1 rounded-lg border border-border bg-muted px-2 py-1.5 text-xs text-muted-foreground">
        <Paperclip className="h-3 w-3" />
        {alt}
      </div>
    );
  }
  return (
    <div className="relative">
      {state === "loading" && (
        <div className="h-32 w-40 animate-pulse rounded-lg border border-border bg-muted" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setState("ok")}
        onError={() => setState("error")}
        className={`max-h-56 rounded-lg border border-border object-contain ${
          state === "loading" ? "absolute inset-0 opacity-0" : ""
        }`}
      />
    </div>
  );
}

function AssistantPage() {
  const { lang } = useSite();
  const ml = lang === "ml" ? "lang-ml" : "";
  const { user, loading: authLoading } = useAuth();
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState<ChatAttachment[]>([]);
  const [attachBusy, setAttachBusy] = useState(false);
  const [attachError, setAttachError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const langRef = useRef(lang);
  langRef.current = lang;

  const [transport] = useState(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        prepareSendMessagesRequest: async ({ messages, body }) => {
          const { data } = await supabase.auth.getSession();
          const token = data.session?.access_token;
          const headers: Record<string, string> = {};
          if (token) headers["Authorization"] = `Bearer ${token}`;
          return {
            body: { ...body, messages, lang: langRef.current },
            headers,
          };
        },
      }),
  );

  const { messages, sendMessage, status, error, stop, regenerate, setMessages, clearError } =
    useChat({ transport });

  const busy = status === "submitted" || status === "streaming";

  async function addFiles(list: FileList | null) {
    if (!list?.length) return;
    setAttachError(null);
    setAttachBusy(true);
    const next: ChatAttachment[] = [];
    let failed = false;
    for (const file of Array.from(list).slice(0, MAX_ATTACHMENTS)) {
      try {
        next.push(await fileToAttachment(file));
      } catch {
        failed = true;
      }
    }
    if (failed) {
      setAttachError(
        lang === "en"
          ? "Some images could not be attached. Use a JPEG, PNG or WebP photo under 15 MB."
          : "ചില ചിത്രങ്ങൾ ചേർക്കാനായില്ല. 15 MB-യിൽ താഴെയുള്ള JPEG, PNG അല്ലെങ്കിൽ WebP ചിത്രം ഉപയോഗിക്കുക.",
      );
    }
    setAttachments((prev) => [...prev, ...next].slice(0, MAX_ATTACHMENTS));
    setAttachBusy(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  function submit(text: string) {
    if ((!text.trim() && attachments.length === 0) || attachBusy) return;
    clearError();
    void sendMessage({
      text: text.trim(),
      files: attachments.map((a) => ({
        type: "file" as const,
        mediaType: a.mediaType,
        filename: a.filename,
        url: a.url,
      })),
    });
    setInput("");
    setAttachments([]);
    setAttachError(null);
    if (fileRef.current) fileRef.current.value = "";
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
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto gap-1 rounded-full"
              onClick={() => {
                stop();
                clearError();
                setMessages([]);
              }}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {lang === "en" ? "New chat" : "പുതിയ ചാറ്റ്"}
            </Button>
          )}
        </div>

        {!authLoading && !user && (
          <Card className="mb-4 border-primary/40 bg-primary/5 p-4">
            <p className={`mb-2 text-sm font-semibold ${ml}`}>
              {lang === "en"
                ? "Sign in to use the AI tutor"
                : "AI ട്യൂട്ടർ ഉപയോഗിക്കാൻ സൈൻ ഇൻ ചെയ്യുക"}
            </p>
            <p className={`mb-3 text-xs text-muted-foreground ${ml}`}>
              {lang === "en"
                ? "We require a free account to prevent abuse of AI credits."
                : "AI ക്രെഡിറ്റുകൾ ദുരുപയോഗം ചെയ്യാതിരിക്കാൻ സൗജന്യ അക്കൗണ്ട് ആവശ്യമാണ്."}
            </p>
            <Button asChild size="sm">
              <Link to="/auth">{lang === "en" ? "Sign in" : "സൈൻ ഇൻ"}</Link>
            </Button>
          </Card>
        )}

        {user && messages.length === 0 && (
          <Card className="mb-4 p-4">
            <p className={`mb-3 text-sm font-medium ${ml}`}>
              {lang === "en" ? "Try asking:" : "ഇത് ചോദിച്ചു നോക്കൂ:"}
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => submit(lang === "en" ? s.en : s.ml)}
                  className={`rounded-full border border-border bg-card px-3 py-1.5 text-xs transition hover:border-primary hover:bg-primary/10 ${ml}`}
                >
                  {lang === "en" ? s.en : s.ml}
                </button>
              ))}
            </div>
          </Card>
        )}

        <div className="mb-4 flex-1 space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
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
                className={`max-w-[85%] animate-in fade-in slide-in-from-bottom-1 space-y-2 p-3 text-sm leading-relaxed duration-300 ${ml} ${
                  m.role === "user" ? "bg-primary/10" : ""
                }`}
              >
                {m.parts.map((part, pi) => {
                  if (part.type === "text") {
                    return m.role === "user" ? (
                      <span key={pi} className="whitespace-pre-wrap">
                        {part.text}
                      </span>
                    ) : (
                      <div
                        key={pi}
                        className="prose prose-sm dark:prose-invert max-w-none [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_h1]:text-base [&_h2]:text-sm [&_h3]:text-sm [&_li]:my-0.5 [&_p]:my-1.5 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-muted [&_pre]:p-3 [&_pre_code]:bg-transparent [&_strong]:text-foreground [&_table]:block [&_table]:overflow-x-auto [&_ul]:my-1.5 [&_ul]:list-disc [&_ul]:pl-4"
                      >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{part.text}</ReactMarkdown>
                      </div>
                    );
                  }
                  if (part.type === "file" && part.mediaType?.startsWith("image/")) {
                    return (
                      <ChatImage key={pi} src={part.url} alt={part.filename ?? "Uploaded image"} />
                    );
                  }
                  if (part.type === "file") {
                    return (
                      <a
                        key={pi}
                        href={part.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-xs underline"
                      >
                        <Paperclip className="h-3 w-3" />
                        {part.filename ?? "attachment"}
                      </a>
                    );
                  }
                  return null;
                })}
              </Card>
            </div>
          ))}

          {status === "submitted" && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Bot className="h-4 w-4 animate-pulse" />
              {lang === "en" ? "Thinking…" : "ചിന്തിക്കുന്നു…"}
            </div>
          )}

          {error && (
            <Card className="border-destructive/40 bg-destructive/5 p-3">
              <p className={`mb-2 text-sm text-destructive ${ml}`}>
                {lang === "en"
                  ? "Something went wrong while answering."
                  : "ഉത്തരം നൽകുന്നതിൽ പിഴവ് സംഭവിച്ചു."}
              </p>
              <Button size="sm" variant="outline" className="gap-1" onClick={() => regenerate()}>
                <RefreshCw className="h-3.5 w-3.5" />
                {lang === "en" ? "Retry" : "വീണ്ടും ശ്രമിക്കുക"}
              </Button>
            </Card>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!busy) submit(input);
          }}
          className="sticky bottom-2 rounded-2xl border border-border bg-card p-2 shadow-lg"
        >
          {attachError && (
            <p className={`mb-2 px-2 text-[11px] text-destructive ${ml}`}>{attachError}</p>
          )}
          {attachBusy && (
            <p className={`mb-2 px-2 text-[11px] text-muted-foreground ${ml}`}>
              {lang === "en" ? "Preparing image…" : "ചിത്രം തയ്യാറാക്കുന്നു…"}
            </p>
          )}
          {attachments.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2 px-1">
              {attachments.map((a) => (
                <span key={a.id} className="relative">
                  <img
                    src={a.url}
                    alt={a.filename}
                    className="h-16 w-16 rounded-lg border border-border object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setAttachments((prev) => prev.filter((x) => x.id !== a.id))}
                    className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-background text-foreground shadow ring-1 ring-border"
                    aria-label={lang === "en" ? "Remove attachment" : "ചിത്രം നീക്കുക"}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
          <div className="flex items-end gap-2">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => void addFiles(e.target.files)}
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              disabled={!user || busy || attachBusy || attachments.length >= MAX_ATTACHMENTS}
              onClick={() => fileRef.current?.click()}
              aria-label={lang === "en" ? "Attach image" : "ചിത്രം ചേർക്കുക"}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (!busy) submit(input);
                }
              }}
              placeholder={
                lang === "en" ? "Ask in English or Malayalam…" : "ഇംഗ്ലീഷിലോ മലയാളത്തിലോ ചോദിക്കാം…"
              }
              rows={1}
              disabled={!user}
              className="min-h-10 flex-1 resize-none border-0 focus-visible:ring-0"
            />
            {busy ? (
              <Button
                type="button"
                size="icon"
                variant="secondary"
                onClick={() => stop()}
                aria-label={lang === "en" ? "Stop" : "നിർത്തുക"}
              >
                <Square className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                size="icon"
                disabled={!user || attachBusy || (!input.trim() && attachments.length === 0)}
                aria-label={lang === "en" ? "Send" : "അയക്കുക"}
              >
                <Send className="h-4 w-4" />
              </Button>
            )}
          </div>
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
