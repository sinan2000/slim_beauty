"use client";

import { useEffect, useState } from "react";

/**
 * Throwaway screenshot harness: tiles /preview/a in same-origin iframes, each scrolled one viewport further,
 * so a single headless Chrome capture shows the whole page at a true phone or desktop viewport.
 * Query: ?w=390&h=844&n=12&cols=6
 */
export default function Shots() {
  const [cfg, setCfg] = useState<{ w: number; h: number; n: number; cols: number; s: number } | null>(null);

  useEffect(() => {
    document.cookie = "sb_consent=denied; path=/";
    const q = new URLSearchParams(window.location.search);
    const w = Number(q.get("w") ?? 390);
    const h = Number(q.get("h") ?? 844);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads the URL once on mount
    setCfg({ w, h, n: Number(q.get("n") ?? 10), cols: Number(q.get("cols") ?? 5), s: Number(q.get("s") ?? 0) });
  }, []);

  if (!cfg) return null;
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cfg.cols}, ${cfg.w}px)`, gap: 8, background: "#888", padding: 8 }}>
      {Array.from({ length: cfg.n }, (_, i) => (
        <iframe
          key={i}
          src="/preview/a"
          width={cfg.w}
          height={cfg.h}
          style={{ border: 0, background: "#fff" }}
          onLoad={(e) => {
            const win = e.currentTarget.contentWindow;
            if (!win) return;
            win.localStorage.setItem("announcement:laser-dioda-2026-10", "1");
            setTimeout(() => win.scrollTo({ top: (cfg.s + i) * cfg.h * 0.92, behavior: "instant" }), 300);
          }}
        />
      ))}
    </div>
  );
}
