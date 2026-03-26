/**
 * Contact form API route with server-side validation and rate limiting.
 *
 * Security model:
 * 1. Rate limiting: in-memory sliding window, 3 requests per IP per 60s.
 *    Resets on deploy because the Map is not persisted. This is intentional
 *    for a low-traffic portfolio; a Redis-backed limiter would be overkill.
 * 2. Input validation: Zod schema validates name, email, and message length.
 * 3. XSS prevention: all user input is HTML entity-escaped before being
 *    injected into the email HTML template, preventing script injection
 *    in email clients that render HTML.
 *
 * Known limitation: the `x-forwarded-for` header can be spoofed by direct
 * clients. Behind Vercel's edge network this is reliable, but the limiter
 * should not be considered a security boundary against determined attackers.
 */

import { Resend } from "resend";
import { NextResponse } from "next/server";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// ---------------------------------------------------------------------------
// Rate limiting (in-memory, resets on deploy)
// ---------------------------------------------------------------------------

const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 3;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = requestLog.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) return true;

  recent.push(now);
  requestLog.set(ip, recent);
  return false;
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Falls back to a hardcoded address when the environment variable is missing.
 * This ensures local development works without a `.env.local` file, though
 * production deployments must set `CONTACT_EMAIL` explicitly.
 */
const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "gabriellqv@gmail.com";

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;

    const esc = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `[Portfolio] New message from ${esc(name)}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px;">
          <h2 style="color: #333;">New contact from your portfolio</h2>
          <p><strong>Name:</strong> ${esc(name)}</p>
          <p><strong>Email:</strong> ${esc(email)}</p>
          <hr style="border: 1px solid #eee;" />
          <p style="white-space: pre-wrap;">${esc(message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
