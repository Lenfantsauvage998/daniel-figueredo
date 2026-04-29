"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";
import { HookBanner } from "@/components/HookBanner";

const services = [
  { id: "000", titleEn: "Web Development", titleEs: "Desarrollo Web" },
  { id: "001", titleEn: "AI Agents", titleEs: "Agentes de IA" },
  { id: "002", titleEn: "AI Workflows", titleEs: "Flujos de IA" },
  { id: "003", titleEn: "Data Science", titleEs: "Ciencia de Datos" },
  { id: "004", titleEn: "UI/UX Design", titleEs: "Diseño UI/UX" },
  { id: "005", titleEn: "Digital Strategy", titleEs: "Estrategia Digital" },
  { id: "006", titleEn: "Cloud & DevOps", titleEs: "Cloud & DevOps" },
  { id: "007", titleEn: "Mobile Development", titleEs: "Desarrollo Móvil" },
  { id: "008", titleEn: "Brand Identity", titleEs: "Identidad de Marca" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function HomePage() {
  const { lang, t } = useI18n();

  return (
    <div className="min-h-screen pt-14">
      {/* Hero / Hook Banner */}
      <HookBanner />

      {/* Info Section */}
      <section className="max-w-3xl mx-auto px-6 py-16 md:py-24 border-t border-white/5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr] gap-4 md:gap-6"
        >
          <span className="text-[11px] uppercase tracking-widest text-white/30 pt-1.5">
            {t.infoLabel}
          </span>
          <p className="text-sm leading-relaxed text-white/60">
            {t.infoText}
          </p>
        </motion.div>
      </section>

      {/* Labs / Services */}
      <section className="max-w-3xl mx-auto px-6 py-16 md:py-24 border-t border-white/5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr] gap-4 md:gap-6"
        >
          <span className="text-[11px] uppercase tracking-widest text-white/30 pt-1.5">
            {t.labsLabel}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {services.map((s) => (
              <Link
                key={s.id}
                href="/store"
                className="group flex items-start gap-3 py-1"
              >
                <span className="text-[11px] text-white/20 group-hover:text-white/40 transition-colors pt-0.5 font-mono">
                  {s.id}
                </span>
                <span className="text-sm text-white/60 group-hover:text-white/90 transition-colors">
                  {lang === "en" ? s.titleEn : s.titleEs}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Store CTA */}
      <section className="max-w-3xl mx-auto px-6 py-16 md:py-24 border-t border-white/5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr] gap-4 md:gap-6"
        >
          <span className="text-[11px] uppercase tracking-widest text-white/30 pt-1.5">
            {t.storeLabel}
          </span>
          <div>
            <p className="text-sm leading-relaxed text-white/60 mb-4">
              {t.storeText}
            </p>
            <Link
              href="/store"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium uppercase tracking-wider border border-white/10 text-white/70 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all rounded-sm"
            >
              {t.storeButton}
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Contact */}
      <section
        id="contact-section"
        className="max-w-3xl mx-auto px-6 py-16 md:py-24 border-t border-white/5 mb-12"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr] gap-4 md:gap-6"
        >
          <span className="text-[11px] uppercase tracking-widest text-white/30 pt-1.5">
            {t.contactLabel}
          </span>
          <div className="space-y-3">
            <p className="text-sm text-white/60">{t.contactText}</p>
            <ContactForm />
          </div>
        </motion.div>
      </section>
    </div>
  );
}

function ContactForm() {
  const { t } = useI18n();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      email: formData.get("email"),
      name: formData.get("name"),
      message: formData.get("message"),
      service: formData.get("service"),
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert(t.contactSuccess);
        form.reset();
      } else {
        alert(t.contactError);
      }
    } catch {
      alert(t.contactError);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
      <div className="grid grid-cols-2 gap-3">
        <input
          name="name"
          type="text"
          placeholder={t.contactName}
          className="w-full px-3 py-2.5 bg-white/[0.03] border border-white/10 rounded-sm text-xs text-white/80 placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
        />
        <input
          name="email"
          type="email"
          required
          placeholder={t.contactEmail}
          className="w-full px-3 py-2.5 bg-white/[0.03] border border-white/10 rounded-sm text-xs text-white/80 placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
        />
      </div>
      <select
        name="service"
        className="w-full px-3 py-2.5 bg-white/[0.03] border border-white/10 rounded-sm text-xs text-white/60 focus:outline-none focus:border-white/20 transition-colors appearance-none"
      >
        <option value="">{t.contactSelect}</option>
        <option value="web">{t.contactWeb}</option>
        <option value="ai-agents">{t.contactAIAgents}</option>
        <option value="ai-workflows">{t.contactAIWorkflows}</option>
        <option value="data">{t.contactData}</option>
        <option value="other">{t.contactOther}</option>
      </select>
      <textarea
        name="message"
        rows={3}
        placeholder={t.contactMessage}
        className="w-full px-3 py-2.5 bg-white/[0.03] border border-white/10 rounded-sm text-xs text-white/80 placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors resize-none"
      />
      <button
        type="submit"
        className="px-5 py-2.5 text-xs font-medium uppercase tracking-wider bg-white text-black hover:bg-white/90 transition-colors rounded-sm"
      >
        {t.contactSubmit}
      </button>
    </form>
  );
}
