import type { NextConfig } from "next";

// Validate environment variables at the very start of `next dev` and
// `next build`. This is the single validation entry point: the import runs
// on the server only and throws early if the environment is invalid, so
// misconfiguration is caught before the app runs. Do not duplicate this
// import in layouts or components.
import "./lib/env";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Image remote patterns (Cloudinary etc.) are added in Phase 6 when media is wired.
  // Security headers, redirects, and i18n are added in their dedicated phases.
};

export default nextConfig;
