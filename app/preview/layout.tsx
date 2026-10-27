import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Previzualizare homepage | Slim & Beauty",
  robots: { index: false, follow: false },
};

/** Throwaway: the previews bring their own nav and footer; `SiteChromeGate` in the root layout skips the site's. */
export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
