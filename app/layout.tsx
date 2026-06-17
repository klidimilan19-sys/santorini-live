import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LanguageProvider } from "@/components/language-provider";
import { WhatsAppButton } from "@/components/whatsapp-button";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: {
    default: "Santorini Live | Live, work & explore the island",
    template: "%s | Santorini Live",
  },
  description:
    "Your local guide to jobs, restaurants, rentals and island life in Santorini.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="el">
      <body className={`${inter.variable} ${manrope.variable} antialiased`}>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
