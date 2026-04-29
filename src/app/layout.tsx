import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CartProvider } from "@/components/CartProvider";
import { ParticleNetwork } from "@/components/ParticleNetwork";
import { I18nProvider } from "@/components/I18nProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Daniel Figueredo — Engineer, AI Specialist & Creative Developer",
  description:
    "Portfolio and services of Daniel Figueredo. Web development, AI agents, workflow automation, and data science solutions for modern businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen antialiased relative">
        <I18nProvider>
          <ParticleNetwork />
          <CartProvider>
            <div className="relative z-10">
              <Navbar />
              <main>{children}</main>
              <Footer />
              <WhatsAppButton />
            </div>
          </CartProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
