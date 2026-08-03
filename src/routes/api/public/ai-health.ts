import { createFileRoute } from "@tanstack/react-router";
import { getServerEnv } from "@/lib/server-env.server";

// Lightweight readiness probe: reports only whether the AI key resolves at
// runtime. Never returns the key and never spends AI credits.
export const Route = createFileRoute("/api/public/ai-health")({
  server: {
    handlers: {
      GET: async () => {
        const configured = Boolean(await getServerEnv("LOVABLE_API_KEY"));
        return Response.json({ ai: configured ? "ready" : "missing-key" }, {
          status: configured ? 200 : 503,
        });
      },
    },
  },
});
