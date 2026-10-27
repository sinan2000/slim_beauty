import { contact } from "@/lib/site-content";
import { Arrow } from "./ui";

/** Closing contact section: phone in display type, the message channels, hours and the way to the salon. */
export function BronzContact({ whatsapp = contact.whatsapp }: { whatsapp?: string }) {
  return (
    <section id="contact" aria-labelledby="vino" className="relative isolate scroll-mt-20 overflow-hidden border-t border-(--line)">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
        <div className="md:col-span-7">
          <h2 id="vino" data-split className="f-display text-[clamp(2.6rem,5.4vw,5rem)] leading-[1] tracking-[-0.025em] text-(--cream)">
            Hai să vorbim <span className="italic text-(--gold)">despre tine</span>
          </h2>
          <p className="mt-6 max-w-[48ch] text-lg leading-relaxed">
            Programările se fac la telefon sau prin mesaj. Alege cum îți e mai comod: îți răspundem noi cu ora potrivită.
          </p>
          <a href={contact.phoneHref} data-phone className="num f-display mt-12 block text-[clamp(2.2rem,5vw,4.2rem)] leading-none text-(--cream) transition-colors hover:text-(--gold)">
            {contact.phone}
          </a>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={whatsapp} target="_blank" rel="noopener" className="btn-gold h-12 px-7">WhatsApp</a>
            <a href={contact.instagram} target="_blank" rel="noopener" className="btn-ghost h-12 px-7">Instagram</a>
            <a href={contact.facebook} target="_blank" rel="noopener" className="btn-ghost h-12 px-7">Facebook</a>
          </div>
        </div>
        <div className="flex flex-col gap-12 md:col-span-4 md:col-start-9 md:pt-4">
          <div>
            <h3 className="f-display text-2xl text-(--gold) italic">Program</h3>
            <dl className="num mt-5 flex flex-col gap-3">
              {contact.hours.map((h) => (
                <div key={h.days} className="flex items-baseline gap-3">
                  <dt>{h.days}</dt>
                  <span className="leader" aria-hidden="true" />
                  <dd className="text-(--cream)">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3 className="f-display text-2xl text-(--gold) italic">Adresă</h3>
            <p className="mt-5 text-(--cream)">{contact.address}</p>
            <p className="text-(--muted)">jud. Timiș, lângă Timișoara</p>
            <a href={contact.directions} target="_blank" rel="noopener" className="link-u mt-4 inline-flex items-center gap-3 text-(--gold)">
              Deschide traseul în Google Maps <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
