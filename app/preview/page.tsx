import Link from "next/link";

const directions = [
  { href: "/preview/a", name: "A · Bronz", note: "Espresso și auriu, lumină lichidă, dezvăluiri cinematice." },
  { href: "/preview/b", name: "B · Sculpt", note: "Porțelan și roz pal, formă sculptată 3D care se remodelează la scroll." },
  { href: "/preview/c", name: "C · Editorial", note: "Revistă de modă: tipografie mare, servicii în scroll orizontal." },
  { href: "/preview/d", name: "D · Bronz + Editorial (Motion)", note: "Aspectul și hero-ul din A, scroll orizontal și lista cu imagini la hover din C." },
  { href: "/preview/e", name: "E · Bronz + Editorial (GSAP)", note: "Același design ca D, cu scene de scroll coregrafiate în GSAP." },
];

export default function PreviewIndex() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center gap-6 px-6 py-16">
      <h1 className="font-serif text-3xl text-gray-900">Direcții pentru homepage</h1>
      <ul className="flex flex-col gap-3">
        {directions.map((d) => (
          <li key={d.href}>
            <Link href={d.href} className="block rounded-xl border border-gray-200 p-5 transition-colors hover:border-pink-300 hover:bg-pink-50">
              <span className="block font-medium text-gray-900">{d.name}</span>
              <span className="block text-sm text-gray-600">{d.note}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
