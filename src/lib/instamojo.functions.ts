import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { getRequest } from "@tanstack/react-start/server";

const COURSE_AMOUNT = 45; // INR
const COURSE_PURPOSE = "Kerala RTO Learner Licence — Full Access";

function instamojoBaseUrl() {
  const env = (process.env.INSTAMOJO_ENV || "live").toLowerCase();
  return env === "sandbox" || env === "test"
    ? "https://test.instamojo.com"
    : "https://api.instamojo.com";
}

async function getAccessToken(): Promise<string> {
  const clientId = process.env.INSTAMOJO_CLIENT_ID;
  const clientSecret = process.env.INSTAMOJO_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error(
      "Payment gateway not configured. Please contact support (missing INSTAMOJO_CLIENT_ID / INSTAMOJO_CLIENT_SECRET).",
    );
  }
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  });
  const res = await fetch(`${instamojoBaseUrl()}/oauth2/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) {
    const txt = await res.text();
    console.error("[Instamojo] token error", res.status, txt);
    throw new Error("Failed to authenticate with payment provider.");
  }
  const json = (await res.json()) as { access_token?: string };
  if (!json.access_token) throw new Error("Payment provider returned no access token.");
  return json.access_token;
}

function siteOrigin(): string {
  const req = getRequest();
  const url = new URL(req.url);
  return `${url.protocol}//${url.host}`;
}

export const createInstamojoPayment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        name: z.string().min(1).max(100),
        email: z.string().email(),
        phone: z.string().min(6).max(20),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const token = await getAccessToken();
    const origin = siteOrigin();
    const redirectUrl = `${origin}/payment/success`;
    const webhookUrl = `${origin}/api/public/instamojo-webhook`;

    const body = new URLSearchParams({
      amount: String(COURSE_AMOUNT),
      purpose: COURSE_PURPOSE,
      buyer_name: data.name,
      email: data.email,
      phone: data.phone,
      redirect_url: redirectUrl,
      webhook: webhookUrl,
      allow_repeated_payments: "false",
      send_email: "true",
      send_sms: "false",
    });

    const res = await fetch(`${instamojoBaseUrl()}/v2/payment_requests/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });
    if (!res.ok) {
      const txt = await res.text();
      console.error("[Instamojo] payment_request error", res.status, txt);
      throw new Error("Could not create payment. Please try again.");
    }
    const json = (await res.json()) as { id?: string; longurl?: string };
    if (!json.id || !json.longurl) throw new Error("Invalid response from payment provider.");

    const { error: insErr } = await supabase.from("purchases").insert({
      user_id: userId,
      amount: COURSE_AMOUNT,
      currency: "INR",
      purpose: COURSE_PURPOSE,
      payment_request_id: json.id,
      status: "pending",
      buyer_name: data.name,
      buyer_email: data.email,
      buyer_phone: data.phone,
    });
    if (insErr) console.error("[purchases insert]", insErr);

    return { url: json.longurl, paymentRequestId: json.id };
  });

export const checkPaidAccess = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data, error } = await supabase.rpc("has_paid_access", { _user_id: userId });
    if (error) {
      console.error("[has_paid_access]", error);
      return { hasAccess: false };
    }
    return { hasAccess: Boolean(data) };
  });

export const verifyPaymentStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        paymentRequestId: z.string().min(1),
        paymentId: z.string().optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const token = await getAccessToken();
    const res = await fetch(
      `${instamojoBaseUrl()}/v2/payment_requests/${data.paymentRequestId}/`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    if (!res.ok) {
      const txt = await res.text();
      console.error("[Instamojo] verify error", res.status, txt);
      return { status: "failed" as const, message: "Could not verify payment." };
    }
    const json = (await res.json()) as {
      status?: string;
      payments?: Array<{ status?: string; payment_id?: string }>;
    };
    const anyCompleted =
      json.status === "Completed" ||
      (json.payments ?? []).some((p) => (p.status ?? "").toLowerCase() === "credit");

    const newStatus: "completed" | "pending" | "failed" = anyCompleted
      ? "completed"
      : json.status === "Failed"
        ? "failed"
        : "pending";

    const paymentId =
      data.paymentId ??
      (json.payments ?? []).find((p) => p.payment_id)?.payment_id ??
      null;

    const { error: updErr } = await supabase
      .from("purchases")
      .update({ status: newStatus, payment_id: paymentId })
      .eq("payment_request_id", data.paymentRequestId)
      .eq("user_id", userId);
    if (updErr) console.error("[purchases update]", updErr);

    return { status: newStatus };
  });