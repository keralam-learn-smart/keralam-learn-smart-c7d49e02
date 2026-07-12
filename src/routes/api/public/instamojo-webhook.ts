import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "crypto";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function computeMac(fields: Record<string, string>, salt: string): string {
  const keys = Object.keys(fields)
    .filter((k) => k !== "mac")
    .sort();
  const msg = keys.map((k) => fields[k] ?? "").join("|");
  return createHmac("sha1", salt).update(msg).digest("hex");
}

export const Route = createFileRoute("/api/public/instamojo-webhook")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
      POST: async ({ request }) => {
        const salt = process.env.INSTAMOJO_WEBHOOK_SALT;
        if (!salt) {
          console.error("[instamojo-webhook] missing salt");
          return new Response("misconfigured", { status: 500, headers: CORS });
        }
        const raw = await request.text();
        const params = new URLSearchParams(raw);
        const fields: Record<string, string> = {};
        params.forEach((v, k) => (fields[k] = v));

        const receivedMac = (fields.mac || "").toLowerCase();
        const expected = computeMac(fields, salt).toLowerCase();
        const a = Buffer.from(receivedMac);
        const b = Buffer.from(expected);
        if (a.length !== b.length || !timingSafeEqual(a, b)) {
          console.warn("[instamojo-webhook] invalid MAC");
          return new Response("invalid signature", { status: 401, headers: CORS });
        }

        const paymentRequestId = fields.payment_request_id;
        const paymentId = fields.payment_id || null;
        const status = (fields.status || "").toLowerCase();
        if (!paymentRequestId) {
          return new Response("missing payment_request_id", { status: 400, headers: CORS });
        }

        const newStatus =
          status === "credit" || status === "completed"
            ? "completed"
            : status === "failed"
              ? "failed"
              : "pending";

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { error } = await supabaseAdmin
          .from("purchases")
          .update({ status: newStatus, payment_id: paymentId })
          .eq("payment_request_id", paymentRequestId);
        if (error) {
          console.error("[instamojo-webhook] update error", error);
          return new Response("db error", { status: 500, headers: CORS });
        }
        return new Response("ok", { status: 200, headers: CORS });
      },
    },
  },
});
