import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CartProvider } from "@/components/CartProvider";
import { I18nProvider } from "@/components/I18nProvider";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Daniel Figueredo — Data Scientist & Analytics",
  description:
    "Portfolio of Daniel Figueredo. SQL, Python, statistics and Bayesian modeling applied to fraud detection and business decisions, plus agentic AI tooling and full-stack web development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased relative">
        <I18nProvider>
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
