import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Signal Atelier Portfolio",
    short_name: "Signal Atelier",
    description:
      "A product engineering portfolio spanning scalable web, Android, PWA, real-time systems, and creative technology.",
    start_url: "/",
    display: "standalone",
    background_color: "#090b0a",
    theme_color: "#b8ff45",
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
