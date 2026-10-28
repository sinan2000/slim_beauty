import Link from 'next/link';
import { notFoundMeta } from '@/lib/metadatas';
import { categories, photos } from '@/lib/site-content';
import { BronzChoreo } from '@/components/bronz/choreo';
import { Frame } from '@/components/bronz/frame';
import { Arrow } from '@/components/bronz/ui';

export const metadata = notFoundMeta;

export default function NotFoundPage() {
    return (
        <BronzChoreo>
            <main className="mx-auto grid min-h-[100svh] max-w-[1400px] items-center gap-14 px-5 pt-32 pb-24 md:grid-cols-12 md:gap-10 md:px-10">
                <div className="md:col-span-7">
                    <p className="f-display num text-[clamp(6rem,18vw,14rem)] leading-[0.85] text-(--gold) italic" aria-hidden="true">
                        404
                    </p>
                    <h1 data-split className="f-display mt-8 text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02] tracking-[-0.02em] text-(--cream)">
                        Pagina nu a fost găsită
                    </h1>
                    <p className="mt-6 max-w-[46ch] text-lg leading-relaxed">
                        Ne pare rău, dar pagina pe care o căutați nu există sau a fost mutată.
                    </p>
                    <div className="mt-10 flex flex-wrap gap-3">
                        <Link href="/" className="btn-gold h-12 px-7">
                            Pagina principală
                        </Link>
                        <Link href="/servicii" className="btn-ghost h-12 px-7">
                            Toate serviciile
                        </Link>
                    </div>
                    <ul className="mt-14 flex flex-col border-t border-(--line)">
                        {categories.map((c) => (
                            <li key={c.href} className="border-b border-(--line)">
                                <Link href={c.href} className="group flex items-center justify-between gap-6 py-5">
                                    <span className="f-display text-2xl text-(--cream) transition-colors group-hover:text-(--gold)">{c.name}</span>
                                    <Arrow className="text-(--gold)" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <Frame
                    src={photos.salonRoom}
                    alt="Interiorul salonului Slim & Beauty by MC din Dumbrăvița"
                    sizes="(min-width: 768px) 38vw, 100vw"
                    className="hidden aspect-[3/4] md:col-span-4 md:col-start-9 md:block"
                />
            </main>
        </BronzChoreo>
    );
}
