"use client";

import { MessageCircle } from "lucide-react";
import { useI18n } from "./I18nProvider";

export function WhatsAppButton() {
  const { t } = useI18n();
  const phoneNumber = "+1234567890"; // TODO: Replace with your actual WhatsApp number
  const message = encodeURIComponent(t.whatsappText);

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-[#1a1a1a] border border-white/10 text-white/70 hover:text-white hover:border-white/20 hover:bg-[#222] transition-all shadow-lg"
      aria-label="WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
    </a>
  );
}
