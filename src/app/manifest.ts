import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Signal Atelier Portfolio",
    short_name: "Signal Atelier",
    description:
      "A design-led frontend engineering and creative technology portfolio.",
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
