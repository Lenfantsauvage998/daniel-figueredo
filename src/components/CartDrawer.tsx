"use client";

import { useCart } from "./CartProvider";
import { useI18n } from "./I18nProvider";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, total, clearCart } =
    useCart();
  const { lang, t } = useI18n();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-sand border-l border-sand-edge z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-sand-edge">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-ink" />
                <h2 className="text-lg font-extrabold tracking-tight text-ink">
                  {t.cartTitle}
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 grid place-items-center rounded-full hover:bg-sand-deep transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-ink-soft" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-10 h-10 text-ink-faint mx-auto mb-4" />
                  <p className="text-ink-soft font-medium">{t.storeEmpty}</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-5 px-6 py-3 text-sm font-bold rounded-full bg-sand-deep text-ink hover:bg-sand-edge transition-colors"
                  >
                    {t.cartContinue}
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-4 p-4 rounded-2xl border border-sand-edge bg-sand-lift"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-ink truncate">{item.title}</h3>
                      <p className="text-sm text-ink-soft mt-0.5">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-1 mt-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          className="w-9 h-9 grid place-items-center rounded-full bg-sand-deep hover:bg-sand-edge transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4 text-ink" />
                        </button>
                        <span className="text-sm font-bold text-ink w-8 text-center tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="w-9 h-9 grid place-items-center rounded-full bg-sand-deep hover:bg-sand-edge transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4 text-ink" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-ink">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-sm text-ink-faint hover:text-ink mt-2 transition-colors"
                      >
                        {lang === "en" ? "Remove" : "Quitar"}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-sand-edge space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-ink-soft font-medium">{t.cartSubtotal}</span>
                  <span className="text-2xl font-extrabold text-ink tabular-nums">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-4 text-center text-sm font-extrabold uppercase tracking-wider bg-signal text-white hover:bg-signal-deep transition-colors rounded-full"
                >
                  {t.cartCheckout}
                </Link>
                <button
                  onClick={clearCart}
                  className="block w-full text-center text-sm text-ink-faint hover:text-ink transition-colors"
                >
                  {t.cartClear}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
