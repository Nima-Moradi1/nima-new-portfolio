/* eslint-disable @typescript-eslint/no-require-imports */
const bundleAnalyzer = require("@next/bundle-analyzer");
const createNextIntlPlugin = require("next-intl/plugin");
const deploymentSha = process.env.GITHUB_SHA || process.env.DEPLOYMENT_SHA;

/** @type {import("next").NextConfig} */
const nextConfig = {
  // CI packages this server and its assets; Liara only runs the tested build.
  output: "standalone",
  deploymentId: deploymentSha,
  ...(deploymentSha && { generateBuildId: async () => deploymentSha }),
  env: { DEPLOYMENT_SHA: deploymentSha || "development" },
  poweredByHeader: false,
  reactStrictMode: true,
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
  ],
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

module.exports = withBundleAnalyzer(withNextIntl(nextConfig));
