import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "МонгоКарт — Party карт тоглоом",
    short_name: "МонгоКарт",
    description:
      "Truth or Dare, Уу эсвэл шийтгүүл, Never Have I Ever зэрэг party карт тоглоомыг найзуудтайгаа тоглоорой.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#1a1625",
    theme_color: "#1a1625",
    lang: "mn",
    dir: "ltr",
    categories: ["games", "entertainment", "social"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon-dark-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
