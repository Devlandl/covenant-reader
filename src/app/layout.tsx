import type { Metadata, Viewport } from "next";
import { Cinzel, Crimson_Pro } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "@/components/ConvexClientProvider";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const crimsonPro = Crimson_Pro({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Covenant Reader — Your Daily Bible Companion",
  description:
    "Read the KJV Bible with customizable reading plans, save favorite verses, track your streak, earn badges, and keep a private prayer journal.",
  metadataBase: new URL("https://covenant-reader.tvrapp.app"),
  openGraph: {
    title: "Covenant Reader — Your Daily Bible Companion",
    description: "KJV reading plans, prayer vault, and achievements.",
    url: "https://covenant-reader.tvrapp.app",
    siteName: "Covenant Reader",
    type: "website",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Covenant Reader",
  },
};

export const viewport: Viewport = {
  themeColor: "#2D1B69",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${crimsonPro.variable} h-full antialiased`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-crimson)] bg-cr-cream text-cr-ink">
        <ConvexClientProvider>{children}</ConvexClientProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
