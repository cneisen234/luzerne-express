import type { Metadata, Viewport } from "next";
import { Bree_Serif, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { express } from "@/lib/express";

// Friendly, sturdy serif — the wordmark and every heading. Feels like a store
// that's been the town's go-to forever, without looking old.
const bree = Bree_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bree-serif",
});

// Quiet, legible body sans — shared across the Mio/Fairview family of sites.
const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
});

export const metadata: Metadata = {
  title: `${express.name} — Fuel, Grocery & Camp | ${express.townShort}`,
  description: express.blurb,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    title: `${express.name} — ${express.townShort}`,
    description: express.blurb,
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#23402f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bree.variable} ${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
