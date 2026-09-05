"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Shield, Box } from "lucide-react";
import { useI18n } from "./I18nProvider";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const { lang, setLang, t } = useI18n();
  const [user, setUser] = useState<{ name?: string | null; role?: string } | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => setUser(data.user))
      .catch(() => setUser(null));
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/me", { method: "DELETE" });
    setUser(null);
    window.location.href = "/";
  };

  const links = [
    { href: "/", label: t.navHome },
    { href: "/store", label: t.navStore },
  ];

  const scrollToContact = () => {
    setMobileOpen(false);
    const el = document.getElementById("contact-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#contact-section";
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 pt-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="Daniel Figueredo, home"
            className="flex items-center gap-2.5 shrink-0 p-1.5 lg:pr-5 rounded-full bg-sand-deep/80 backdrop-blur-md border border-sand-edge/60"
          >
            <span className="w-9 h-9 grid place-items-center rounded-full bg-ink text-sand">
              <Box className="w-[18px] h-[18px]" strokeWidth={2.2} />
            </span>
            <span className="hidden lg:block text-[15px] font-bold tracking-tight text-ink">
              Daniel Figueredo
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-sand-deep/80 backdrop-blur-md border border-sand-edge/60">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-5 py-2.5 text-[13px] font-bold uppercase tracking-wider rounded-full transition-colors ${
                  pathname === l.href
                    ? "bg-ink text-sand"
                    : "text-ink-soft hover:text-ink hover:bg-sand-edge/50"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={scrollToContact}
              className="px-5 py-2.5 text-[13px] font-bold uppercase tracking-wider rounded-full text-ink-soft hover:text-ink hover:bg-sand-edge/50 transition-colors"
            >
              {t.navContact}
            </button>
            {user?.role === "ADMIN" && (
              <Link
                href="/admin"
                className={`flex items-center gap-1.5 px-5 py-2.5 text-[13px] font-bold uppercase tracking-wider rounded-full transition-colors ${
                  pathname === "/admin"
                    ? "bg-ink text-sand"
                    : "text-ink-soft hover:text-ink hover:bg-sand-edge/50"
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                {t.navAdmin}
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <div
              className="hidden sm:flex items-center p-1 rounded-full bg-sand-deep/80 backdrop-blur-md border border-sand-edge/60"
              role="group"
              aria-label="Language"
            >
              {(["en", "es"] as const).map((code) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  aria-pressed={lang === code}
                  className={`px-3 py-1.5 text-[12px] font-bold uppercase rounded-full transition-colors ${
                    lang === code
                      ? "bg-ink text-sand"
                      : "text-ink-faint hover:text-ink"
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>

            <button
              onClick={scrollToContact}
              className="hidden sm:block px-6 py-3 text-[13px] font-extrabold uppercase tracking-wider rounded-full bg-signal text-white hover:bg-signal-deep transition-colors shadow-[0_4px_14px_rgba(217,46,94,0.3)]"
            >
              {t.heroCtaPrimary}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-11 h-11 grid place-items-center rounded-full bg-sand-deep/80 backdrop-blur-md border border-sand-edge/60 text-ink"
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.6, 0, 0.25, 1] }}
            className="fixed top-20 left-4 right-4 z-30 md:hidden rounded-3xl bg-sand-lift border border-sand-edge shadow-[0_12px_40px_rgba(30,35,29,0.14)] overflow-hidden"
          >
            <div className="p-3 space-y-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3.5 text-base font-bold rounded-2xl transition-colors ${
                    pathname === l.href
                      ? "bg-ink text-sand"
                      : "text-ink hover:bg-sand-deep"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <button
                onClick={scrollToContact}
                className="block w-full text-left px-4 py-3.5 text-base font-bold rounded-2xl text-ink hover:bg-sand-deep transition-colors"
              >
                {t.navContact}
              </button>
              {user?.role === "ADMIN" && (
                <Link
                  href="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-3.5 text-base font-bold rounded-2xl text-ink hover:bg-sand-deep transition-colors"
                >
                  <Shield className="w-4 h-4" />
                  {t.navAdmin}
                </Link>
              )}

              <div className="flex items-center gap-2 px-4 pt-3 pb-1">
                {(["en", "es"] as const).map((code) => (
                  <button
                    key={code}
                    onClick={() => setLang(code)}
                    aria-pressed={lang === code}
                    className={`px-4 py-2 text-sm font-bold uppercase rounded-full transition-colors ${
                      lang === code
                        ? "bg-ink text-sand"
                        : "bg-sand-deep text-ink-soft"
                    }`}
                  >
                    {code}
                  </button>
                ))}
                {user ? (
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      handleLogout();
                    }}
                    className="ml-auto text-sm font-semibold text-ink-soft"
                  >
                    {t.navLogout}
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="ml-auto text-sm font-semibold text-ink-soft"
                  >
                    {t.navLogin}
                  </Link>
                )}
              </div>

              <button
                onClick={scrollToContact}
                className="w-full mt-2 px-6 py-4 text-sm font-extrabold uppercase tracking-wider rounded-2xl bg-signal text-white"
              >
                {t.heroCtaPrimary}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
