"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Bot,
  Workflow,
  LineChart,
  Palette,
  Compass,
  Cloud,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { HookBanner } from "@/components/HookBanner";
import { HologramAbout } from "@/components/HologramAbout";
import { Projects } from "@/components/Projects";
import { Clients } from "@/components/Clients";

const services = [
  { icon: LineChart, en: "Data Science & Analytics", es: "Ciencia de Datos y Analítica" },
  { icon: Bot, en: "Agentic AI (Claude Code, Cursor)", es: "IA Agentiva (Claude Code, Cursor)" },
  { icon: Workflow, en: "AI Workflows", es: "Flujos de IA" },
  { icon: Code2, en: "Web Development", es: "Desarrollo Web" },
  { icon: Cloud, en: "Cloud & DevOps", es: "Cloud & DevOps" },
  { icon: Palette, en: "UI/UX Design", es: "Diseño UI/UX" },
  { icon: Compass, en: "Digital Strategy", es: "Estrategia Digital" },
  { icon: Smartphone, en: "Mobile Development", es: "Desarrollo Móvil" },
  { icon: Sparkles, en: "Brand Identity", es: "Identidad de Marca" },
];

export default function HomePage() {
  const { lang, t } = useI18n();

  return (
    <div>
      <HookBanner />
      <HologramAbout />

      {/* What I do */}
      <section className="px-6 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-ink max-w-[16ch]">
            {lang === "en" ? "Data-driven, end to end" : "Basado en datos, de principio a fin"}
          </h2>
          <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-ink-soft">
            {t.infoText}
          </p>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s) => (
              <Link
                key={s.en}
                href="/#contact-section"
                className="group flex items-center gap-4 rounded-3xl bg-sand-lift border border-sand-edge p-6 hover:bg-white hover:border-signal/40 transition-colors"
              >
                <span className="w-12 h-12 shrink-0 grid place-items-center rounded-2xl bg-sand-deep text-ink group-hover:bg-signal group-hover:text-white transition-colors">
                  <s.icon className="w-5 h-5" strokeWidth={2.1} />
                </span>
                <span className="text-lg font-bold text-ink">
                  {lang === "en" ? s.en : s.es}
                </span>
                <ArrowRight className="w-4 h-4 ml-auto text-ink-faint opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Projects />
      <Clients />

      {/* Contact */}
      <section id="contact-section" className="px-6 pb-24 lg:pb-32 scroll-mt-28">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-ink max-w-[14ch]">
              {lang === "en" ? "Tell me what you need" : "Cuéntame qué necesitas"}
            </h2>
            <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-ink-soft">
              {t.contactText}
            </p>
            <a
              href="mailto:hello@danielfigueredo.com"
              className="inline-block mt-6 text-lg font-bold text-ink underline decoration-signal decoration-2 underline-offset-4 hover:text-signal transition-colors"
            >
              hello@danielfigueredo.com
            </a>
          </div>

          <ContactForm />
        </div>
      </section>
    </div>
  );
}

type Status = "idle" | "sending" | "sent" | "error";

function ContactForm() {
  const { t } = useI18n();
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setStatus("sending");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          name: formData.get("name"),
          message: formData.get("message"),
          service: formData.get("service"),
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const field =
    "w-full px-5 py-4 bg-sand-lift border border-sand-edge rounded-2xl text-base text-ink placeholder:text-ink-faint focus:outline-none focus:border-signal transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <input name="name" type="text" placeholder={t.contactName} className={field} />
        <input
          name="email"
          type="email"
          required
          placeholder={t.contactEmail}
          className={field}
        />
      </div>
      <select name="service" defaultValue="" className={field}>
        <option value="">{t.contactSelect}</option>
        <option value="data">{t.contactData}</option>
        <option value="ai-agents">{t.contactAIAgents}</option>
        <option value="ai-workflows">{t.contactAIWorkflows}</option>
        <option value="web">{t.contactWeb}</option>
        <option value="other">{t.contactOther}</option>
      </select>
      <textarea
        name="message"
        rows={4}
        placeholder={t.contactMessage}
        className={`${field} resize-none`}
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full sm:w-auto px-8 py-4 text-sm font-extrabold uppercase tracking-wider rounded-full bg-signal text-white hover:bg-signal-deep disabled:opacity-60 transition-colors"
      >
        {status === "sending" ? "…" : t.contactSubmit}
      </button>

      <p
        role="status"
        aria-live="polite"
        className={`text-sm font-medium min-h-5 ${
          status === "error" ? "text-red-700" : "text-ink-soft"
        }`}
      >
        {status === "sent" ? t.contactSuccess : status === "error" ? t.contactError : ""}
      </p>
    </form>
  );
}
