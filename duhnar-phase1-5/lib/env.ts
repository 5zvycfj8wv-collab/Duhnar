import { z } from "zod";

/**
 * Centralized, validated environment access. SERVER-ONLY.
 *
 * This module reads process.env and must never be imported into a client
 * component or client bundle. It is imported from a single server-only
 * startup path (next.config.ts) so that invalid environment variables are
 * detected during `next dev` and `next build`, not at runtime in front of
 * a user.
 *
 * Import `env` from here instead of reading process.env directly. Add new
 * variables to the schema as later phases introduce them (DATABASE_URL,
 * SUPABASE keys, CLOUDINARY, etc.). The app fails fast at startup if a
 * required variable is missing or malformed.
 *
 * Note: only NEXT_PUBLIC_* values are safe to expose to the client, and even
 * those should be referenced through Next's own inlining — not by importing
 * this server module. Server-only secrets added later stay in this module.
 */
const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  // Public site URL — used later for SEO canonical URLs, OG tags, sitemaps.
  // Optional in Phase 1; becomes required before deployment.
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "❌ Invalid environment variables:",
    JSON.stringify(parsed.error.flatten().fieldErrors, null, 2),
  );
  throw new Error("Invalid environment configuration. See errors above.");
}

export const env = parsed.data;
export type Env = typeof env;
