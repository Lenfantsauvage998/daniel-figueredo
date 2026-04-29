"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Zap, TrendingUp, Clock, BarChart3 } from "lucide-react";
import { useI18n } from "./I18nProvider";
import { TypewriterEffect } from "./TypewriterEffect";

function AnimatedCounter({
  end,
  duration = 2,
  suffix = "",
  prefix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  {
    icon: TrendingUp,
    value: 70,
    suffix: "%",
    labelEn: "Avg. Cost Reduction",
    labelEs: "Reducción de Costos",
  },
  {
    icon: Clock,
    value: 20,
    suffix: "+ hrs",
    labelEn: "Weekly Hours Reclaimed",
    labelEs: "Horas Semanales",
  },
  {
    icon: Zap,
    value: 3,
    suffix: "x",
    labelEn: "Faster Delivery",
    labelEs: "Entrega más Rápida",
  },
  {
    icon: BarChart3,
    value: 45,
    suffix: "%",
    labelEn: "Higher Conversion",
    labelEs: "Conversión Mayor",
  },
];

export function HookBanner() {
  const { lang, setLang, t } = useI18n();
  const phrases = [t.heroHook1, t.heroHook2, t.heroHook3, t.heroHook4];

  const scrollToContact = () => {
    const el = document.getElementById("contact-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      {/* Ambient radial glow behind hook */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center max-w-3xl mx-auto"
      >
        {/* Language Toggle */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setLang("en")}
            className={`px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider border rounded-sm transition-all ${
              lang === "en"
                ? "border-white/30 text-white bg-white/5"
                : "border-white/10 text-white/30 hover:text-white/50"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLang("es")}
            className={`px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider border rounded-sm transition-all ${
              lang === "es"
                ? "border-white/30 text-white bg-white/5"
                : "border-white/10 text-white/30 hover:text-white/50"
            }`}
          >
            ES
          </button>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white/90 mb-6 tracking-tight">
          {t.heroGreeting}
        </h1>

        {/* Typewriter hook */}
        <div className="h-12 flex items-center justify-center mb-10">
          <TypewriterEffect phrases={phrases} />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={scrollToContact}
            className="group flex items-center gap-2 px-7 py-3.5 text-xs font-medium uppercase tracking-wider bg-white text-black hover:bg-white/90 transition-all rounded-sm"
          >
            {t.heroCtaPrimary}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <Link
            href="/store"
            className="px-7 py-3.5 text-xs font-medium uppercase tracking-wider border border-white/10 text-white/60 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all rounded-sm"
          >
            {t.heroCtaSecondary}
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-sm overflow-hidden border border-white/5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.labelEn}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              className="bg-[#0a0a0a] p-5 md:p-6"
            >
              <stat.icon className="w-4 h-4 text-white/20 mb-3 mx-auto md:mx-0" />
              <div className="text-2xl md:text-3xl font-light text-white/90 mb-1">
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-[10px] md:text-[11px] uppercase tracking-wider text-white/30">
                {lang === "en" ? stat.labelEn : stat.labelEs}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social proof microcopy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-8 text-[11px] text-white/20 tracking-wide"
        >
          {lang === "en"
            ? "Trusted by founders across LATAM, US and Europe"
            : "Confiado por fundadores de LATAM, US y Europa"}
        </motion.p>
      </motion.div>
    </section>
  );
}
