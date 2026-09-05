import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Next's own type-check build worker crashes with a filesystem read error
    // on this machine (OneDrive-synced project directory) even on a clean
    // build. `npx tsc --noEmit` passes cleanly and is run before every change
    // — type safety is verified there instead. Vercel's build servers aren't
    // OneDrive-synced, so this workaround may not even be needed there.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
