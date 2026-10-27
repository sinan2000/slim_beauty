"use client";

import { usePathname } from "next/navigation";

/** Routes that bring their own nav and footer (the bronz pages and the homepage previews). */
const OWN_CHROME = ["/servicii", "/preview"];

/** Renders the site-wide nav or footer everywhere except on routes that draw their own. */
export function SiteChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (OWN_CHROME.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return null;
  return children;
}
