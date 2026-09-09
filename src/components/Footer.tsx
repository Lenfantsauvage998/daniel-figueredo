"use client";

import Link from "next/link";
import { Box } from "lucide-react";
import { useI18n } from "./I18nProvider";

export function Footer() {
  const { lang, t } = useI18n();
  const currentYear = new Date().getFullYear();

  const links = [
    { href: "/#projects-section", label: t.footerProjects, external: false },
    { href: "mailto:lefantsauvage998@gmail.com", label: t.footerEmail, external: true },
    { href: "https://www.linkedin.com/in/daniel-enrique-figueredo-gutierrez-016439275/", label: t.footerLinkedIn, external: true },
    { href: "https://github.com/Lenfantsauvage998", label: t.footerGithub, external: true },
  ];

  return (
    <footer className="px-6 pb-6">
      <div className="max-w-7xl mx-auto rounded-[2.5rem] bg-sand-deep border border-sand-edge px-8 sm:px-12 py-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-11 h-11 grid place-items-center rounded-2xl bg-ink text-sand">
                <Box className="w-5 h-5" strokeWidth={2.2} />
              </span>
              <span className="text-xl font-extrabold tracking-tight text-ink">
                Daniel Figueredo
              </span>
            </div>
            <p className="mt-4 max-w-[38ch] text-base leading-relaxed text-ink-soft">
              {lang === "en"
                ? "AI agents, automation and web apps built end to end."
                : "Agentes de IA, automatización y apps web de principio a fin."}
            </p>
          </div>

          <nav className="flex flex-wrap gap-2">
            {links.map((l) =>
              l.external ? (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="px-5 py-3 text-sm font-bold rounded-full bg-sand-lift border border-sand-edge text-ink hover:bg-white transition-colors"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.label}
                  href={l.href}
                  className="px-5 py-3 text-sm font-bold rounded-full bg-sand-lift border border-sand-edge text-ink hover:bg-white transition-colors"
                >
                  {l.label}
                </Link>
              )
            )}
          </nav>
        </div>

        <p className="mt-10 pt-6 border-t border-sand-edge text-sm text-ink-faint">
          © {currentYear} Daniel Figueredo
        </p>
      </div>
    </footer>
  );
}
