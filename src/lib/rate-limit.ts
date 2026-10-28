interface Bucket {
  count: number;
  resetAt: number;
}

// Kept on globalThis so dev hot-reloads don't reset it.
// NOTE: this is per server instance. On serverless or multi-instance hosting, swap this
// for a shared store (e.g. Upstash Redis) or your platform's rate-limiting feature.
const globalStore = globalThis as typeof globalThis & { __inquiryRateLimit?: Map<string, Bucket> };
const store: Map<string, Bucket> = (globalStore.__inquiryRateLimit ??= new Map());

export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 10 * 60 * 1000,
  now = Date.now(),
): { allowed: boolean; retryAfterSeconds: number } {
  if (store.size > 5000) {
    for (const [k, bucket] of store) if (bucket.resetAt <= now) store.delete(k);
  }
  const bucket = store.get(key);
  if (!bucket || bucket.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }
  if (bucket.count >= limit) {
    return { allowed: false, retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  bucket.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

/** Trust x-forwarded-for only when deployed behind a proxy you control (Vercel, Cloudflare, etc.). */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip") || "unknown";
}
