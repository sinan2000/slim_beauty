import { LEGAL_UPDATED } from "@/lib/company";

/** Shared shell for the privacy, terms and cookie pages: one h1, readable measure, styled headings and lists. */
export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="pt-[80px] md:pt-[96px] bg-white">
      <article className="container mx-auto max-w-3xl px-4 py-12 md:py-16 text-gray-700 leading-relaxed [&_h2]:font-playfair [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-gray-800 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-1 [&_a]:text-pink-600 [&_a]:underline [&_table]:w-full [&_table]:text-sm [&_th]:text-left [&_th]:p-2 [&_th]:bg-pink-50 [&_td]:p-2 [&_td]:align-top [&_tr]:border-b [&_tr]:border-pink-100">
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-2">{title}</h1>
        <p className="text-sm text-gray-500 mb-8">Ultima actualizare: {LEGAL_UPDATED}</p>
        {children}
      </article>
    </main>
  );
}
