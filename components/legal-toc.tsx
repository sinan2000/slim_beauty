"use client";

import { useEffect, useState } from "react";

type Entry = { id: string; text: string };

function slug(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Sticky "Cuprins" for the legal pages, read from the article's own h2s (which get ids here, so sections can be
 * linked). It marks the section being read. Hidden below `lg`, where the article reads straight through.
 */
export function LegalToc() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll<HTMLHeadingElement>("#legal-text h2"));
    headings.forEach((h) => {
      if (!h.id) h.id = slug(h.textContent ?? "");
    });
    // Reading the DOM the server rendered is the only source of these headings.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEntries(headings.map((h) => ({ id: h.id, text: h.textContent ?? "" })));

    const observer = new IntersectionObserver(
      (records) => {
        const visible = records.filter((r) => r.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Cuprins" className="hidden lg:block">
      {entries.length ? (
        <div className="sticky top-32">
          <p className="f-display text-xl text-(--gold) italic">Cuprins</p>
          <ol className="mt-6 flex flex-col gap-3 border-l border-(--line) text-sm">
            {entries.map((e) => (
              <li key={e.id}>
                <a
                  href={`#${e.id}`}
                  aria-current={active === e.id ? "location" : undefined}
                  className={`-ml-px block border-l py-0.5 pl-4 leading-snug transition-colors ${
                    active === e.id ? "border-(--gold) text-(--cream)" : "border-transparent text-(--muted) hover:text-(--cream)"
                  }`}
                >
                  {e.text}
                </a>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </nav>
  );
}
