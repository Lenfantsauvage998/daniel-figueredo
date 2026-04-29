"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingBag, Menu, X, Shield } from "lucide-react";
import { useCart } from "./CartProvider";
import { CartDrawer } from "./CartDrawer";
import { useI18n } from "./I18nProvider";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const { t } = useI18n();
  const { count, setIsOpen } = useCart();
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

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-xs font-medium tracking-widest uppercase text-white/90 hover:text-white transition-colors"
          >
            Daniel Figueredo
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-xs tracking-wide transition-colors ${
                  pathname === l.href
                    ? "text-white"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {l.label}
              </Link>
            ))}
            {user?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="flex items-center gap-1.5 text-xs tracking-wide text-white/40 hover:text-white/70 transition-colors"
              >
                <Shield className="w-3 h-3" />
                {t.navAdmin}
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 hover:bg-white/5 rounded-md transition-colors"
              aria-label={t.navCart}
            >
              <ShoppingBag className="w-4 h-4 text-white/60" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center text-[10px] bg-white text-black rounded-full font-medium">
                  {count}
                </span>
              )}
            </button>

            {user ? (
              <button
                onClick={handleLogout}
                className="hidden md:block text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                {t.navLogout}
              </button>
            ) : (
              <Link
                href="/login"
                className="hidden md:block text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                {t.navLogin}
              </Link>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 hover:bg-white/5 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-4 h-4 text-white/60" />
              ) : (
                <Menu className="w-4 h-4 text-white/60" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-14 left-0 right-0 z-30 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10 md:hidden"
          >
            <div className="px-6 py-4 space-y-3">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block text-sm ${
                    pathname === l.href
                      ? "text-white"
                      : "text-white/50 hover:text-white/80"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              {user?.role === "ADMIN" && (
                <Link
                  href="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 text-sm text-white/50 hover:text-white/80"
                >
                  <Shield className="w-3.5 h-3.5" />
                  {t.navAdmin}
                </Link>
              )}
              {user ? (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="block text-sm text-white/50 hover:text-white/80"
                >
                  {t.navLogout}
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm text-white/50 hover:text-white/80"
                >
                  {t.navLogin}
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer />
    </>
  );
}
