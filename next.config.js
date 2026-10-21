/* eslint-disable @typescript-eslint/no-require-imports */
const bundleAnalyzer = require("@next/bundle-analyzer");
const createNextIntlPlugin = require("next-intl/plugin");
const deploymentSha = process.env.GITHUB_SHA || process.env.DEPLOYMENT_SHA || process.env.VERCEL_GIT_COMMIT_SHA;

/** @type {import("next").NextConfig} */
const nextConfig = {
  // CI packages this server and its assets; Liara only runs the tested build.
  output: "standalone",
  deploymentId: deploymentSha,
  env: { DEPLOYMENT_SHA: deploymentSha || "development" },
  poweredByHeader: false,
  reactStrictMode: true,
  // Keep loopback rewrites on 127.0.0.1; normalizing them to localhost makes
  // the internal /en rewrite external and starts an /en -> / redirect loop.
  skipProxyUrlNormalize: true,
  compress: true,
  images: {
    unoptimized: true,
  },
  outputFileTracingExcludes: {
    "/*": [
      "./node_modules/@img/**",
      "./node_modules/sharp/**",
      "./node_modules/caniuse-lite/**",
      "./node_modules/baseline-browser-mapping/**",
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "@react-three/drei", "motion"],
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        ...(deploymentSha
          ? [{ key: "X-Deployment-Sha", value: deploymentSha }]
          : []),
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Frame-Options", value: "DENY" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
      ],
    },
    // Public media retain readable, unversioned URLs. Revalidate them instead
    // of using immutable; hashed /_next/static assets keep Next's own policy.
    ...["/assets/:path*", "/fonts/:path*", "/brand/:path*"].map((source) => ({
      source,
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=3600",
        },
      ],
    })),
    {
      // Dedicated content-hashed derivatives; any changed bytes get a new URL.
      source: "/assets/kinetic/:path*",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    },
  ],
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

module.exports = withBundleAnalyzer(withNextIntl(nextConfig));
