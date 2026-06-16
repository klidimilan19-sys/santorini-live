import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/306900000000"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Santorini Live on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/20 transition hover:scale-105 sm:bottom-7 sm:right-7"
    >
      <MessageCircle size={26} fill="currentColor" />
    </a>
  );
}
