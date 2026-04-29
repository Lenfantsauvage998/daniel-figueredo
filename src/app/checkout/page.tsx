"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { useI18n } from "@/components/I18nProvider";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { t } = useI18n();
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            price: i.price,
          })),
          total,
        }),
      });

      if (res.ok) {
        clearCart();
        setDone(true);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to place order");
      }
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen pt-14 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm"
        >
          <CheckCircle className="w-10 h-10 text-green-400/80 mx-auto mb-4" />
          <h1 className="text-xl font-light text-white/90 mb-2">
            {t.checkoutSuccessTitle}
          </h1>
          <p className="text-xs text-white/40 mb-6">
            {t.checkoutSuccessText}
          </p>
          <Link
            href="/store"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium uppercase tracking-wider bg-white text-black hover:bg-white/90 transition-colors rounded-sm"
          >
            {t.checkoutBackStore}
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-14 flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-sm text-white/40 mb-4">{t.storeEmpty}</p>
          <Link
            href="/store"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium uppercase tracking-wider border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all rounded-sm"
          >
            {t.storeBrowse}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-14">
      <div className="max-w-xl mx-auto px-6 py-12 md:py-16">
        <Link
          href="/store"
          className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {t.storeBack}
        </Link>

        <h1 className="text-xl font-light text-white/90 mb-8">{t.checkoutTitle}</h1>

        <div className="space-y-3 mb-8">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between py-3 border-b border-white/5"
            >
              <div>
                <p className="text-sm text-white/80">{item.title}</p>
                <p className="text-xs text-white/30">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm text-white/60">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm text-white/50">{t.checkoutTotal}</span>
            <span className="text-lg text-white/90">${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="p-4 rounded-sm border border-white/5 bg-white/[0.02] mb-8">
          <p className="text-xs text-white/40 leading-relaxed">
            {t.checkoutNote}
          </p>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="w-full py-3 text-xs font-medium uppercase tracking-wider bg-white text-black hover:bg-white/90 transition-colors rounded-sm disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          {t.checkoutPlaceOrder}
        </button>
      </div>
    </div>
  );
}
