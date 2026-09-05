"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, TrendingUp, Clock, Zap, BarChart3 } from "lucide-react";
import { useI18n } from "./I18nProvider";
import { TypewriterEffect } from "./TypewriterEffect";
import { HeroFigure } from "./HeroFigure";

function AnimatedCounter({
  end,
  duration = 1.6,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    let raf = 0;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { icon: TrendingUp, value: 70, suffix: "%", en: "Average cost cut", es: "Costos reducidos" },
  { icon: Clock, value: 20, suffix: "+ hrs", en: "Reclaimed each week", es: "Horas recuperadas" },
  { icon: Zap, value: 3, suffix: "x", en: "Faster delivery", es: "Entrega más rápida" },
  { icon: BarChart3, value: 45, suffix: "%", en: "Higher conversion", es: "Más conversión" },
];

export function HookBanner() {
  const { lang, t } = useI18n();
  const phrases = [t.heroHook1, t.heroHook2, t.heroHook3, t.heroHook4];

  const scrollToContact = () => {
    document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="relative px-6 pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-10 lg:gap-6">
          {/* Name block — the type is the design here */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.6, 0, 0.25, 1] }}
            className="relative z-10"
          >
            <h1 className="text-[13vw] sm:text-[9vw] lg:text-[5.6vw] leading-[0.92] font-extrabold tracking-[-0.03em] text-ink">
              Daniel
              <br />
              Figueredo
            </h1>

            <span className="inline-block mt-4 -rotate-2 bg-deep text-beam-text font-mono text-sm sm:text-base font-bold tracking-[0.14em] uppercase px-4 py-2 rounded-md">
              {t.heroRole}
            </span>

            <div className="mt-8 min-h-[3.5rem] max-w-[46ch]">
              <TypewriterEffect phrases={phrases} />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={scrollToContact}
                className="group inline-flex items-center gap-2 px-7 py-4 text-sm font-extrabold uppercase tracking-wider rounded-full bg-signal text-white hover:bg-signal-deep transition-colors shadow-[0_6px_20px_rgba(217,46,94,0.28)]"
              >
                {t.heroCtaPrimary}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                href="/store"
                className="inline-flex items-center px-7 py-4 text-sm font-extrabold uppercase tracking-wider rounded-full bg-sand-deep text-ink border border-sand-edge hover:bg-sand-edge transition-colors"
              >
                {t.heroCtaSecondary}
              </Link>
            </div>
          </motion.div>

          {/* Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.6, 0, 0.25, 1] }}
          >
            <HeroFigure />
          </motion.div>
        </div>
      </section>

      {/* Results band */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.en}
              className="rounded-3xl bg-sand-lift border border-sand-edge p-6 sm:p-7"
            >
              <stat.icon className="w-5 h-5 text-signal mb-4" strokeWidth={2.2} />
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-ink">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-1.5 text-sm font-medium text-ink-soft">
                {lang === "en" ? stat.en : stat.es}
              </p>
            </div>
          ))}
        </div>
        <p className="max-w-7xl mx-auto mt-5 text-sm text-ink-faint">
          {lang === "en"
            ? "Working with founders across LATAM, the US and Europe."
            : "Trabajando con fundadores de LATAM, EE.UU. y Europa."}
        </p>
      </section>
    </>
  );
}
