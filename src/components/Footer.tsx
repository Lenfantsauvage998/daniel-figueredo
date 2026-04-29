"use client";

import Link from "next/link";
import { useI18n } from "./I18nProvider";

export function Footer() {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6 text-[11px] text-white/30 tracking-wide">
          <span>Daniel Figueredo</span>
          <span className="hidden md:inline">·</span>
          <span className="hidden md:inline">{currentYear}</span>
        </div>

        <div className="flex items-center gap-6 text-[11px] tracking-wide">
          <Link
            href="/store"
            className="text-white/30 hover:text-white/60 transition-colors"
          >
            {t.footerStore}
          </Link>
          <a
            href="mailto:hello@danielfigueredo.com"
            className="text-white/30 hover:text-white/60 transition-colors"
          >
            {t.footerEmail}
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-white/60 transition-colors"
          >
            {t.footerLinkedIn}
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-white/60 transition-colors"
          >
            {t.footerGithub}
          </a>
        </div>
      </div>
    </footer>
  );
}
