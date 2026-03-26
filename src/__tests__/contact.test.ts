import { describe, it, expect, beforeEach } from "vitest";

// ---------------------------------------------------------------------------
// Inline copies of pure functions from route.ts for unit testing.
// These are extracted verbatim to avoid importing Next.js server modules.
// ---------------------------------------------------------------------------

// --- HTML escape -----------------------------------------------------------

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

describe("esc (HTML entity escaping)", () => {
  it("escapes ampersands", () => {
    expect(esc("Tom & Jerry")).toBe("Tom &amp; Jerry");
  });

  it("escapes angle brackets", () => {
    expect(esc("<script>alert('xss')</script>")).toBe(
      "&lt;script&gt;alert('xss')&lt;/script&gt;"
    );
  });

  it("escapes double quotes", () => {
    expect(esc('He said "hello"')).toBe("He said &quot;hello&quot;");
  });

  it("handles all special characters together", () => {
    expect(esc('A & B < C > D "E"')).toBe(
      "A &amp; B &lt; C &gt; D &quot;E&quot;"
    );
  });

  it("returns clean strings unchanged", () => {
    expect(esc("Hello World")).toBe("Hello World");
  });

  it("handles empty string", () => {
    expect(esc("")).toBe("");
  });
});

// --- Rate limiter ----------------------------------------------------------

const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 3;

function createRateLimiter() {
  const requestLog = new Map<string, number[]>();

  function isRateLimited(ip: string, now = Date.now()): boolean {
    const timestamps = requestLog.get(ip) ?? [];
    const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

    if (recent.length >= MAX_REQUESTS_PER_WINDOW) return true;

    recent.push(now);
    requestLog.set(ip, recent);
    return false;
  }

  return { isRateLimited, requestLog };
}

describe("isRateLimited", () => {
  let limiter: ReturnType<typeof createRateLimiter>;

  beforeEach(() => {
    limiter = createRateLimiter();
  });

  it("allows the first request", () => {
    expect(limiter.isRateLimited("1.2.3.4")).toBe(false);
  });

  it("allows up to MAX_REQUESTS_PER_WINDOW requests", () => {
    const now = Date.now();
    expect(limiter.isRateLimited("1.2.3.4", now)).toBe(false);
    expect(limiter.isRateLimited("1.2.3.4", now + 1)).toBe(false);
    expect(limiter.isRateLimited("1.2.3.4", now + 2)).toBe(false);
  });

  it("blocks the 4th request within the window", () => {
    const now = Date.now();
    limiter.isRateLimited("1.2.3.4", now);
    limiter.isRateLimited("1.2.3.4", now + 1);
    limiter.isRateLimited("1.2.3.4", now + 2);
    expect(limiter.isRateLimited("1.2.3.4", now + 3)).toBe(true);
  });

  it("tracks IPs independently", () => {
    const now = Date.now();
    limiter.isRateLimited("1.1.1.1", now);
    limiter.isRateLimited("1.1.1.1", now + 1);
    limiter.isRateLimited("1.1.1.1", now + 2);
    expect(limiter.isRateLimited("1.1.1.1", now + 3)).toBe(true);
    expect(limiter.isRateLimited("2.2.2.2", now + 3)).toBe(false);
  });

  it("allows requests again after the window expires", () => {
    const now = Date.now();
    limiter.isRateLimited("1.2.3.4", now);
    limiter.isRateLimited("1.2.3.4", now + 1);
    limiter.isRateLimited("1.2.3.4", now + 2);
    expect(limiter.isRateLimited("1.2.3.4", now + 3)).toBe(true);
    expect(
      limiter.isRateLimited("1.2.3.4", now + RATE_LIMIT_WINDOW_MS + 1)
    ).toBe(false);
  });
});

// --- Zod schema ------------------------------------------------------------

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

describe("contactSchema (Zod validation)", () => {
  it("accepts valid input", () => {
    const result = contactSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      message: "Hello, this is a test message!",
    });
    expect(result.success).toBe(true);
  });

  it("rejects name shorter than 2 characters", () => {
    const result = contactSchema.safeParse({
      name: "J",
      email: "john@example.com",
      message: "Hello, this is a test message!",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = contactSchema.safeParse({
      name: "John Doe",
      email: "not-an-email",
      message: "Hello, this is a test message!",
    });
    expect(result.success).toBe(false);
  });

  it("rejects message shorter than 10 characters", () => {
    const result = contactSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      message: "Short",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty body", () => {
    const result = contactSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("rejects missing fields", () => {
    const result = contactSchema.safeParse({
      name: "John Doe",
    });
    expect(result.success).toBe(false);
  });
});
