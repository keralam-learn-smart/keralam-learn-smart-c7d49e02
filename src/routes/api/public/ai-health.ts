import { createFileRoute } from "@tanstack/react-router";
import { generateText } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { getServerEnv } from "@/lib/server-env.server";

export const Route = createFileRoute("/api/public/ai-health")({
  server: {
    handlers: {
      GET: async () => {
        const key = await getServerEnv("LOVABLE_API_KEY");
        if (!key) return Response.json({ configured: false }, { status: 500 });
        try {
          const gateway = createLovableAiGatewayProvider(key);
          const { text } = await generateText({
            model: gateway("google/gemini-3-flash-preview"),
            prompt: "Reply with the single word: ok",
          });
          return Response.json({ configured: true, reply: text.slice(0, 40) });
        } catch (e) {
          return Response.json(
            { configured: true, error: e instanceof Error ? e.message : "failed" },
            { status: 500 },
          );
        }
      },
    },
  },
});
