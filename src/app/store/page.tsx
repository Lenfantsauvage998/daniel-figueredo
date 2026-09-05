"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Loader2 } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import type { Product } from "@/types";

export default function StorePage() {
  const { t } = useI18n();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <Loader2 className="w-5 h-5 text-ink-faint animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-ink">
            {t.storeTitle}
          </h1>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-soft">
            {t.storeDesc}
          </p>
        </motion.div>

        {products.length === 0 ? (
          <p className="text-ink-faint">{t.storeEmpty}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="group flex flex-col rounded-3xl bg-sand-lift border border-sand-edge hover:border-signal/40 hover:bg-white transition-colors overflow-hidden"
              >
                {product.imageUrl && (
                  <div className="aspect-[16/10] overflow-hidden bg-sand-deep">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink-faint mb-2">
                    {product.category}
                  </span>
                  <h3 className="text-xl font-extrabold text-ink mb-2">
                    {product.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-ink-soft mb-5 flex-1">
                    {product.description}
                  </p>
                  <Link
                    href="/#contact-section"
                    className="w-full flex items-center justify-center gap-2 py-3 text-sm font-extrabold uppercase tracking-wider rounded-full bg-ink text-sand hover:bg-signal transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {t.heroCtaPrimary}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
