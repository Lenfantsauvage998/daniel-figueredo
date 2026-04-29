"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";

export default function LoginPage() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
      } else {
        window.location.href = "/";
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-14 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back home
        </Link>

        <h1 className="text-xl font-light text-white/90 mb-2">{t.loginTitle}</h1>
        <p className="text-xs text-white/40 mb-8">{t.loginSubtitle}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-white/30 mb-1.5">
              {t.loginEmail}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2.5 bg-white/[0.03] border border-white/10 rounded-sm text-xs text-white/80 placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-white/30 mb-1.5">
              {t.loginPassword}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2.5 bg-white/[0.03] border border-white/10 rounded-sm text-xs text-white/80 placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-xs text-red-400/80">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 text-xs font-medium uppercase tracking-wider bg-white text-black hover:bg-white/90 transition-colors rounded-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {t.loginButton}
          </button>
        </form>

        <p className="mt-6 text-xs text-white/30 text-center">
          {t.loginNoAccount}{" "}
          <Link
            href="/register"
            className="text-white/60 hover:text-white transition-colors"
          >
            {t.loginRegister}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
