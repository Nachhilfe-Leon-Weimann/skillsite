import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { DeviceContextProvider } from "@/hooks/use-mobile";
import { getDevice } from "@/server/get-device";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    absolute: "Homepage | Nachhilfe Leon Weimann",
    default: "Nachhilfe Leon Weimann",
    template: "%s | Nachhilfe Leon Weimann",
  },
  description:
    "Erfahrene Nachhilfe für Schüler aller Klassenstufen. Individuelle Betreuung, flexible Zeiten und bewährte Lernmethoden.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobile = await getDevice();

  return (
    <html
      lang="de"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="grid min-h-dvh grid-rows-[auto_minmax(0,1fr)_auto]">
        <DeviceContextProvider isMobile={isMobile}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <Navbar />
              <main className="flex min-h-0 flex-col">{children}</main>
              <Footer />
            </TooltipProvider>
          </ThemeProvider>
        </DeviceContextProvider>
      </body>
    </html>
  );
}
