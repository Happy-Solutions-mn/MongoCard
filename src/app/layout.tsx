import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mongocard.mn";
const SITE_NAME = "МонгоКарт";
const SITE_TITLE =
  "МонгоКарт | Найзуудтайгаа хамт цагийг зугаатай өнгөрүүл";
const SITE_DESCRIPTION =
  "Truth or Dare, Уу эсвэл шийтгүүл, Never Have I Ever, Аль нь дээр вэ зэрэг олон төрлийн party карт тоглоом. Үнэгүй, бүртгэлгүй, шууд утсан дээрээ тоглоно.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | МонгоКарт",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: "Next.js",
  keywords: [
    "МонгоКарт",
    "MongoCard",
    "party game",
    "карт тоглоом",
    "Truth or Dare",
    "Үнэн эсвэл зориг",
    "Уу эсвэл шийтгүүл",
    "Never Have I Ever",
    "Би хэзээ ч",
    "монгол тоглоом",
    "найзуудтай тоглох",
  ],
  authors: [{ name: "Happy Solutions" }],
  creator: "Happy Solutions",
  publisher: "Happy Solutions",
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
  },
  category: "games",
  openGraph: {
    type: "website",
    locale: "mn_MN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    // /opengraph-image.tsx файлд автомат үүсгэгдэнэ
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    // /twitter-image.tsx файлд автомат үүсгэгдэнэ
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
    shortcut: "/icon.svg",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f7fa" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1625" },
  ],
  width: "device-width",
  initialScale: 1,
  // Хязгаарлахгүй — accessibility (WCAG) шаардлага
};

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn" suppressHydrationWarning>
      <head>
        {ADSENSE_CLIENT_ID ? (
          <Script
            id="adsbygoogle-init"
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          />
        ) : null}
      </head>
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
