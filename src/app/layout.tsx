import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
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
  metadataBase: new URL("https://www.danielfigueredo.com"),
  title: "Daniel Figueredo — Data Scientist & Analytics",
  description:
    "Portfolio of Daniel Enrique Figueredo Gutierrez. SQL, Python, statistics and Bayesian modeling applied to fraud detection and business decisions, plus agentic AI tooling and full-stack web development.",
  keywords: [
    "Daniel Figueredo",
    "Daniel Enrique Figueredo Gutierrez",
    "Daniel Figueredo Gutierrez",
    "data scientist",
    "data analytics",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Daniel Figueredo — Data Scientist & Analytics",
    description:
      "Portfolio of Daniel Enrique Figueredo Gutierrez. SQL, Python, statistics and Bayesian modeling applied to fraud detection and business decisions.",
    url: "https://www.danielfigueredo.com",
    siteName: "Daniel Figueredo",
    type: "profile",
  },
  twitter: {
    card: "summary",
    title: "Daniel Figueredo — Data Scientist & Analytics",
    description: "Portfolio of Daniel Enrique Figueredo Gutierrez.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Daniel Enrique Figueredo Gutierrez",
  alternateName: "Daniel Figueredo",
  url: "https://www.danielfigueredo.com",
  jobTitle: "Data Scientist & Analytics",
  email: "mailto:lefantsauvage998@gmail.com",
  sameAs: [
    "https://github.com/Lenfantsauvage998",
    "https://www.linkedin.com/in/daniel-enrique-figueredo-gutierrez-016439275/",
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <I18nProvider>
          <div className="relative z-10">
            <Navbar />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
