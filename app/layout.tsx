import type { Viewport } from "next";
import { Locale, i18n } from '@/i18n.config'
import { Inter } from 'next/font/google'
import "./globals.css";
import { SlugProvider } from "./context/SlugContext";

// Add Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#06b6d4" },
    { media: "(prefers-color-scheme: dark)", color: "#06b6d4" },
  ],
};

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }))
}

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-HYTK9KVPTG"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HYTK9KVPTG');
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.className} bg-white antialiased h-full w-full`}
      >
        <SlugProvider>
          {children}
        </SlugProvider>
      </body>
    </html>
  );
}
