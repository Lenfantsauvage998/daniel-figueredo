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
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-ink text-sand hover:bg-signal transition-colors shadow-[0_6px_20px_rgba(30,35,29,0.28)]"
      aria-label="WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
    </a>
  );
}
