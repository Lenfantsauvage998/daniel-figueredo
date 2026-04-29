"use client";

import { useCart } from "./CartProvider";
import { useI18n } from "./I18nProvider";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, total, clearCart } =
    useCart();
  const { t } = useI18n();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0f0f0f] border-l border-white/10 z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-white/70" />
                <h2 className="text-sm font-medium tracking-wide uppercase text-white/90">
                  {t.cartTitle}
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/5 rounded-md transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-white/50" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-10 h-10 text-white/20 mx-auto mb-4" />
                  <p className="text-white/40 text-sm">{t.storeEmpty}</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-4 text-xs text-white/30 hover:text-white/60 transition-colors"
                  >
                    {t.cartContinue}
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-4 p-3 rounded-lg border border-white/5 bg-white/[0.02]"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm text-white/90 truncate">
                        {item.title}
                      </h3>
                      <p className="text-xs text-white/40 mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          className="p-1 hover:bg-white/10 rounded transition-colors"
                        >
                          <Minus className="w-3 h-3 text-white/60" />
                        </button>
                        <span className="text-xs text-white/70 w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="p-1 hover:bg-white/10 rounded transition-colors"
                        >
                          <Plus className="w-3 h-3 text-white/60" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white/90">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-xs text-white/30 hover:text-white/60 mt-2 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">{t.cartSubtotal}</span>
                  <span className="text-white/90">${total.toFixed(2)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-3 text-center text-xs font-medium uppercase tracking-wider bg-white text-black hover:bg-white/90 transition-colors rounded-sm"
                >
                  {t.cartCheckout}
                </Link>
                <button
                  onClick={clearCart}
                  className="block w-full text-center text-xs text-white/30 hover:text-white/60 transition-colors"
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
