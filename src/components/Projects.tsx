"use client";

import { ArrowUpRight, GitFork } from "lucide-react";
import { useI18n } from "./I18nProvider";

const tags = ["Statistics", "Bayesian Inference", "Unsupervised ML", "Python", "PCA"];

const stats = (t: ReturnType<typeof useI18n>["t"]) => [
  { value: "0.968", label: t.projectsStatAuc },
  { value: "80.4%", label: t.projectsStatSensitivity },
  { value: "284,807", label: t.projectsStatTx },
  { value: "0.173%", label: t.projectsStatFraud },
];

const REPO_URL =
  "https://github.com/Lenfantsauvage998/Beyond-Accuracy-Bayesian-Fraud-Detection";

export function Projects() {
  const { lang, t } = useI18n();

  return (
    <section id="projects-section" className="px-6 py-20 lg:py-28 scroll-mt-28">
      <div className="max-w-7xl mx-auto">
        <span className="text-sm font-bold uppercase tracking-wider text-signal">
          {t.projectsLabel}
        </span>
        <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-ink max-w-[18ch]">
          {t.projectsTitle}
        </h2>
        <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-ink-soft">
          {t.projectsSubtitle}
        </p>

        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group block mt-12 rounded-[2.5rem] bg-deep text-beam-text overflow-hidden hover:opacity-[0.97] transition-opacity"
        >
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-8 sm:p-12">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-beam-soft">
                {lang === "en"
                  ? "Universidad de La Sabana · Unsupervised Machine Learning"
                  : "Universidad de La Sabana · Aprendizaje No Supervisado"}
              </p>
              <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Beyond Accuracy: Bayesian Fraud Detection
              </h3>
              <p className="mt-4 text-base leading-relaxed text-beam-text/85 max-w-[52ch]">
                {lang === "en"
                  ? "A 99.8%-accurate fraud model can still be useless. I analyzed 284,807 real credit card transactions with Bayes' theorem, MLE, entropy and KL divergence to find which variables actually separate fraud from noise — then built a multivariate model that catches 4 in 5 fraud cases."
                  : "Un modelo de fraude con 99.8% de precisión puede ser inútil. Analicé 284,807 transacciones reales con tarjeta de crédito usando el teorema de Bayes, MLE, entropía y divergencia KL para encontrar qué variables realmente separan el fraude del ruido — y construí un modelo multivariado que detecta 4 de cada 5 casos de fraude."}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full font-mono text-xs font-medium bg-deep-lift/70 border border-beam/30 text-beam-text/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <span className="inline-flex items-center gap-2 mt-8 text-sm font-extrabold uppercase tracking-wider text-white">
                <GitFork className="w-4 h-4" />
                {t.projectsCta}
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </div>

            <div className="grid grid-cols-2 gap-px bg-beam/15 border-t lg:border-t-0 lg:border-l border-beam/15">
              {stats(t).map((s) => (
                <div
                  key={s.label}
                  className="bg-deep p-6 sm:p-8 flex flex-col justify-center"
                >
                  <div className="font-mono text-2xl sm:text-3xl font-extrabold tabular-nums text-beam">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs sm:text-[13px] text-beam-text/70 leading-snug">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
