import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";

import { cn } from "@kochanet_pas/ui";
import { PopupProvider } from "@kochanet_pas/ui/customPopup";
import { ThemeProvider, ThemeToggle } from "@kochanet_pas/ui/theme";
import { Toaster } from "@kochanet_pas/ui/toast";

import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import { env } from "~/env";

const manropeFont = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  weight: "500",

  // preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://kochanet-pas.vercel.app"
      : "http://localhost:3000",
  ),
  title: "Kochanet PAS",
  description: "Simple monorepo with shared backend for web & mobile apps",
  openGraph: {
    title: "Kochanet PAS",
    description: "Simple monorepo with shared backend for web & mobile apps",
    url: "https://kochanet-pas.vercel.app",
    siteName: "Kochanet PAS",
  },
  twitter: {
    card: "summary_large_image",
    site: "@jullerino",
    creator: "@jullerino",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={manropeFont.className}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          // GeistSans.variable,
          // GeistMono.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TRPCReactProvider>
            <PopupProvider>{props.children}</PopupProvider>
          </TRPCReactProvider>
          <div className="absolute bottom-4 right-4">
            <ThemeToggle />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
