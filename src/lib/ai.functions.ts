import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { createOpenAiProvider } from "./ai-gateway.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const SYSTEM = `You are the Traffic Tips AI Tutor. You help learners pass the Kerala RTO Learner Licence (LL) test.
- Always answer in the user's chosen language (English or Malayalam). If asked in Malayalam, reply in Malayalam.
- Be concise, friendly, exam-focused. Use bullet points.
- Stick to Kerala RTO rules: traffic signs, signals, road markings, road rules, vehicle documents, insurance, road safety, first aid, penalties under the Motor Vehicles Act.
- If unsure, say so and suggest contacting the local RTO.`;

const ChatInput = z.object({
  message: z.string().min(1).max(2000),
  lang: z.enum(["en", "ml"]).default("en"),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(2000),
      }),
    )
    .max(20)
    .optional()
    .default([]),
});

export const askTutor = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) => ChatInput.parse(input))
  .handler(async ({ data }) => {
    const key = process.env.OPENAI_API_KEY;
    if (!key) {
      return {
        reply:
          "AI tutor is not configured yet. Please ask the site owner to add OPENAI_API_KEY in the environment settings.",
      };
    }
    const openai = createOpenAiProvider(key);
    const langHint =
      data.lang === "ml"
        ? "The learner is asking in Malayalam. Reply in Malayalam (മലയാളം)."
        : "The learner is asking in English. Reply in English.";
    try {
      const { text } = await generateText({
        model: openai("gpt-4o-mini"),
        system: `${SYSTEM}\n\n${langHint}`,
        messages: [
          ...data.history.map((m) => ({ role: m.role, content: m.content })),
          { role: "user" as const, content: data.message },
        ],
      });
      return { reply: text };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "AI request failed";
      if (msg.includes("429")) {
        return { reply: "AI is busy right now. Please try again in a moment." };
      }
      if (msg.includes("401") || msg.toLowerCase().includes("api key")) {
        return {
          reply: "AI tutor configuration needs attention. Please check OPENAI_API_KEY.",
        };
      }
      return { reply: `Sorry, the tutor could not respond. (${msg})` };
    }
  });

const AnalyzeInput = z.object({
  lang: z.enum(["en", "ml"]).default("en"),
  total: z.number().int().min(1),
  correct: z.number().int().min(0),
  wrong: z.number().int().min(0),
  unanswered: z.number().int().min(0),
  weakTopics: z.array(z.string().max(100)).max(10).default([]),
});

export const analyzePerformance = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) => AnalyzeInput.parse(input))
  .handler(async ({ data }) => {
    const key = process.env.OPENAI_API_KEY;
    if (!key) return { analysis: "AI tutor is not configured. Please add OPENAI_API_KEY." };
    const openai = createOpenAiProvider(key);
    const prompt = `Learner result on a Kerala RTO mock test:
- Total: ${data.total}
- Correct: ${data.correct}
- Wrong: ${data.wrong}
- Unanswered: ${data.unanswered}
- Weakest topics: ${data.weakTopics.join(", ") || "n/a"}

Reply in ${data.lang === "ml" ? "Malayalam" : "English"}.
Give: (1) a 1-line verdict (Pass/Needs work), (2) 3 concrete revision tips targeting the weak topics, (3) a confidence-boosting line.`;
    try {
      const { text } = await generateText({
        model: openai("gpt-4o-mini"),
        system: SYSTEM,
        prompt,
      });
      return { analysis: text };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "AI request failed";
      return { analysis: `Analysis unavailable. (${msg})` };
    }
  });
