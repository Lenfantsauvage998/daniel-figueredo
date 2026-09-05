"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { useI18n } from "@/components/I18nProvider";
import type { Product } from "@/types";

export default function StorePage() {
  const { t } = useI18n();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

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
      <div className="min-h-screen pt-14 flex items-center justify-center">
        <Loader2 className="w-5 h-5 text-white/30 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-14">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-2xl font-light text-white/90 mb-3">{t.storeTitle}</h1>
          <p className="text-sm text-white/40 max-w-lg">
            {t.storeDesc}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group flex flex-col border border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.03] transition-all rounded-sm overflow-hidden"
            >
              {product.imageUrl && (
                <div className="aspect-[16/10] overflow-hidden bg-white/[0.03]">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
                  />
                </div>
              )}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-widest text-white/30">
                    {product.category}
                  </span>
                  <span className="text-sm text-white/90">
                    ${product.price.toFixed(0)}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-white/80 mb-2">
                  {product.title}
                </h3>
                <p className="text-xs text-white/40 leading-relaxed mb-4 flex-1">
                  {product.description}
                </p>
                <button
                  onClick={() =>
                    addItem({
                      productId: product.id,
                      title: product.title,
                      price: product.price,
                      quantity: 1,
                      imageUrl: product.imageUrl || undefined,
                    })
                  }
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-medium uppercase tracking-wider border border-white/10 text-white/60 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all rounded-sm"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  {t.storeAddToCart}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
