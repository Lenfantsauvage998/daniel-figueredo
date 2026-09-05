"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "./I18nProvider";

const clients = [
  {
    name: "Industrial Services GF",
    url: "https://industrialservicesgf.com",
    image: "/client-industrial.webp",
    tagEn: "Industrial / Oil & Gas",
    tagEs: "Industrial / Petróleo y Gas",
    descEn:
      "A full e-commerce marketplace for a Colombian industrial inspection company serving the oil & gas sector — service catalog, shopping cart and client sign-in, built end to end.",
    descEs:
      "Un marketplace de comercio electrónico completo para una empresa colombiana de inspección industrial que atiende al sector petrolero — catálogo de servicios, carrito de compras e inicio de sesión de clientes, construido de principio a fin.",
  },
  {
    name: "Hernan Figueredo",
    url: "https://hernanfbooks.art",
    image: "/client-books.webp",
    tagEn: "Publishing / E-commerce",
    tagEs: "Editorial / E-commerce",
    descEn:
      "An author platform and online bookstore with a blog, multi-currency checkout and account system — built to sell books and grow a personal brand.",
    descEs:
      "Una plataforma de autor y tienda de libros en línea con blog, pago en múltiples monedas y sistema de cuentas — construida para vender libros y hacer crecer una marca personal.",
  },
];

export function Clients() {
  const { lang, t } = useI18n();

  return (
    <section className="px-6 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto">
        <span className="text-sm font-bold uppercase tracking-wider text-signal">
          {t.clientsLabel}
        </span>
        <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-ink max-w-[18ch]">
          {t.clientsTitle}
        </h2>
        <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-ink-soft">
          {t.clientsSubtitle}
        </p>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {clients.map((c) => (
            <a
              key={c.name}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-3xl bg-sand-lift border border-sand-edge overflow-hidden hover:border-signal/40 hover:bg-white transition-colors"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-sand-deep">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  unoptimized
                  className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
                />
              </div>
              <div className="p-6 sm:p-7">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-faint">
                  {lang === "en" ? c.tagEn : c.tagEs}
                </span>
                <h3 className="mt-1.5 flex items-center gap-1.5 text-xl font-extrabold text-ink">
                  {c.name}
                  <ArrowUpRight className="w-4 h-4 text-ink-faint opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">
                  {lang === "en" ? c.descEn : c.descEs}
                </p>
                <span className="inline-block mt-4 text-sm font-bold text-signal">
                  {t.clientsCta} →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
