"use client";

import { usePathname } from "next/navigation";

/**
 * Sticky Sună / WhatsApp bar for phones. On a treatment page the WhatsApp message names that treatment; the map of
 * paths to prefilled links is built on the server so the service copy stays out of the client bundle.
 */
export function MobileBar({ phoneHref, whatsapp, whatsappByPath }: { phoneHref: string; whatsapp: string; whatsappByPath: Record<string, string> }) {
  const pathname = usePathname();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-(--line) bg-(--espresso)/90 p-3 backdrop-blur-md md:hidden">
      <a href={phoneHref} className="btn-gold h-12 text-sm">
        Sună
      </a>
      <a href={whatsappByPath[pathname] ?? whatsapp} target="_blank" rel="noopener" className="btn-ghost h-12 text-sm">
        WhatsApp
      </a>
    </div>
  );
}
