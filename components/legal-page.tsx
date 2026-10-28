import { LEGAL_UPDATED } from "@/lib/company";
import { BronzChoreo } from "@/components/bronz/choreo";
import { LegalToc } from "@/components/legal-toc";

/**
 * Shared shell for the privacy, terms and cookie pages: Read mode in the bronz world. One h1, a long-form column
 * with a comfortable measure, and on wide screens a sticky contents list built from the page's own h2s.
 */
export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <BronzChoreo>
      <main className="mx-auto max-w-[1400px] px-5 pt-32 pb-24 md:px-10 md:pt-44 md:pb-36">
        <header className="max-w-[60rem] border-b border-(--line) pb-12 md:pb-16">
          <h1 data-split className="f-display text-[clamp(2.6rem,6vw,5.2rem)] leading-[1] tracking-[-0.025em] text-(--cream)">
            {title}
          </h1>
          <p className="mt-6 text-sm text-(--muted)">
            Ultima actualizare: <span className="text-(--cream-dim)">{LEGAL_UPDATED}</span>
          </p>
        </header>
        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-20">
          <LegalToc />
          <article id="legal-text" className="legal max-w-[68ch]">
            {children}
          </article>
        </div>
      </main>
    </BronzChoreo>
  );
}
