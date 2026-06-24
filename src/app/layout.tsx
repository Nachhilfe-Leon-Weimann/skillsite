import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ConsentProvider } from "@/providers/consent-provider";
import { CookieConsentBanner } from "@/components/consent/cookie-consent-banner";
import { CookieConsentDialog } from "@/components/consent/cookie-consent-dialog";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nachhilfe.leonweimann.de"),
  title: {
    default: "Nachhilfe Leon Weimann – Mathe, Informatik & Physik",
    template: "%s · Nachhilfe Leon Weimann",
  },
  description:
    "Online-Nachhilfe in Mathematik, Informatik und Physik – persönlich, ohne Vertrag, 30 € pro Stunde. Lernen, bis es klick macht.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Nachhilfe Leon Weimann",
    title: "Nachhilfe Leon Weimann – Mathe, Informatik & Physik",
    description:
      "Online-Nachhilfe in Mathematik, Informatik und Physik – persönlich, ohne Vertrag. Lernen, bis es klick macht.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      suppressHydrationWarning
      className={cn(bricolage.variable, hanken.variable)}
    >
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider>
          <ConsentProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CookieConsentBanner />
            <CookieConsentDialog />
          </ConsentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
