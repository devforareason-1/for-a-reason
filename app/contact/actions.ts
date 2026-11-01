"use server";

import { headers } from "next/headers";
import { readEnquiry, validateEnquiry, type EnquiryErrors } from "@/lib/enquiry";

export type EnquiryState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "invalid"; errors: EnquiryErrors }
  | { status: "unavailable" | "failed" | "limited" };

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const attempts = new Map<string, number[]>();

// Best effort, per server instance. Put a platform firewall rule in front for real traffic.
function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  attempts.set(key, recent);
  if (attempts.size > 5000) attempts.clear();
  return recent.length > MAX_PER_WINDOW;
}

export async function submitEnquiry(_previous: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // Honeypot: people never see this field. Report success so bots don't adapt, and deliver nothing.
  if (formData.get("reference")) return { status: "success" };

  const enquiry = readEnquiry(formData);
  const errors = validateEnquiry(enquiry);
  if (Object.keys(errors).length > 0) return { status: "invalid", errors };

  const requestHeaders = await headers();
  const client = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(client)) return { status: "limited" };

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) return { status: "unavailable" };

  const secret = process.env.CONTACT_WEBHOOK_SECRET;
  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(secret ? { Authorization: `Bearer ${secret}` } : {}),
      },
      body: JSON.stringify({ ...enquiry, submittedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error(`Enquiry webhook responded with ${response.status}`);
      return { status: "failed" };
    }
    return { status: "success" };
  } catch (error) {
    console.error("Enquiry webhook request failed", error instanceof Error ? error.name : "unknown");
    return { status: "failed" };
  }
}
