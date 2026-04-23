import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { writeClient } from "@/lib/sanity/client";

const WINDOW_MS = 3600_000; // 1 hour
const MAX_REQUESTS = 10;

// Upstash Redis client
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

// Ratelimit instance
const ratelimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(MAX_REQUESTS, "1 h"),
      analytics: true,
      prefix: "@upstash/ratelimit",
    })
  : null;

export async function isRateLimited(ip: string): Promise<boolean> {
  // 1. Try Upstash Redis (Recommended for serverless)
  if (ratelimit) {
    try {
      const { success } = await ratelimit.limit(ip);
      return !success;
    } catch (error) {
      console.error("Upstash Ratelimit error:", error);
      // Fallback to next method
    }
  }

  // 2. Try Sanity (Persistent database fallback)
  if (writeClient) {
    try {
      const now = new Date();
      const windowStart = new Date(now.getTime() - WINDOW_MS).toISOString();

      const query = `count(*[_type == "rateLimit" && ip == $ip && _createdAt > $windowStart])`;
      
      // 1. Pre-check to avoid unnecessary writes if already clearly limited
      const count = await writeClient.fetch<number>(query, { ip, windowStart });
      if (count >= MAX_REQUESTS) {
        return true;
      }

      // 2. Use atomic transaction to prevent race conditions as suggested
      // This ensures that the record is created and existing counts are updated atomically
      await writeClient.transaction()
        .create({
          _type: "rateLimit",
          ip,
        })
        .patch(
          {
            query: `*[_type == "rateLimit" && ip == $ip]`,
            params: { ip },
          },
          { inc: { count: 1 } }
        )
        .commit();

      // 3. Final check after the atomic write to handle concurrent requests
      const finalCount = await writeClient.fetch<number>(query, { ip, windowStart });
      return finalCount > MAX_REQUESTS;
    } catch (error) {
      console.error("Sanity Rate limiting error:", error);
      // Fallback to next method
    }
  }

  // 3. Fallback to in-memory (Not persistent across instances)
  console.warn("No persistent store available for rate limiting. Falling back to in-memory.");
  return isRateLimitedInMemory(ip);
}

// Fallback in-memory implementation
const ipWindow = new Map<string, { count: number; resetAt: number }>();

function isRateLimitedInMemory(ip: string) {
  const now = Date.now();
  const current = ipWindow.get(ip);

  if (!current || current.resetAt < now) {
    ipWindow.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > MAX_REQUESTS;
}
