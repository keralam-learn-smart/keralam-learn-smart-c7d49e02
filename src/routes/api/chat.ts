import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { getServerEnv } from "@/lib/server-env.server";

const SYSTEM = `You are the Traffic Tips AI Tutor. You help learners pass the Kerala RTO Learner Licence (LL) test.
- Always answer in the user's chosen language (English or Malayalam). If asked in Malayalam, reply in Malayalam.
- Be concise, friendly and exam-focused. Use markdown: short paragraphs, bullet points, bold key terms, tables when comparing.
- Stick to Kerala RTO topics: traffic signs, signals, road markings, road rules, vehicle documents, insurance, road safety, first aid, penalties under the Motor Vehicles Act.
- If a learner uploads an image (e.g. a traffic sign), describe it and explain its meaning and the correct driver action.
- If unsure, say so and suggest contacting the local RTO.`;

async function requireUser(request: Request) {
  const url = await getServerEnv("SUPABASE_URL");
  const key =
    (await getServerEnv("SUPABASE_ANON_KEY")) ?? (await getServerEnv("SUPABASE_PUBLISHABLE_KEY"));
  if (!url || !key) return null;

  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.slice(7).trim();
  if (!token) return null;

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await supabase.auth.getClaims(token);
  if (error || !data?.claims?.sub) return null;
  return data.claims.sub as string;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const userId = await requireUser(request);
        if (!userId) {
          return Response.json({ error: "Unauthorized. Please sign in again." }, { status: 401 });
        }

        let body: { messages?: unknown; lang?: unknown };
        try {
          body = (await request.json()) as typeof body;
        } catch {
          return Response.json({ error: "Invalid request body." }, { status: 400 });
        }

        const messages = body.messages;
        if (!Array.isArray(messages) || messages.length === 0) {
          return Response.json({ error: "Messages are required." }, { status: 400 });
        }
        if (messages.length > 60) {
          return Response.json({ error: "Conversation is too long." }, { status: 400 });
        }

        const lang = body.lang === "ml" ? "ml" : "en";
        const langHint =
          lang === "ml"
            ? "The learner prefers Malayalam. Reply in Malayalam (മലയാളം)."
            : "The learner prefers English. Reply in English.";

        const key = await getServerEnv("LOVABLE_API_KEY");
        if (!key) {
          return Response.json({ error: "AI is not available right now." }, { status: 503 });
        }

        try {
          const gateway = createLovableAiGatewayProvider(key);
          const result = streamText({
            model: gateway("google/gemini-3.6-flash"),
            system: `${SYSTEM}\n\n${langHint}`,
            messages: await convertToModelMessages(messages as UIMessage[]),
          });

          return result.toUIMessageStreamResponse({
            originalMessages: messages as UIMessage[],
            onError: (error) => {
              const msg = error instanceof Error ? error.message : String(error);
              console.error("[ai-chat]", msg);
              if (msg.includes("429")) return "AI is busy right now. Please retry in a moment.";
              if (msg.includes("402")) return "AI credits are exhausted. Please try again later.";
              return "The tutor could not respond. Please retry.";
            },
          });
        } catch (error) {
          console.error("[ai-chat] fatal", error);
          return Response.json({ error: "The tutor could not respond." }, { status: 500 });
        }
      },
    },
  },
});
