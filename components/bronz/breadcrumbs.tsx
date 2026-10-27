import Link from "next/link";
import { normalizeString } from "@/lib/utils";
import { generateBreadcrumbsSchema } from "@/lib/jsonLds";

/** Bronz breadcrumbs. Emits the same BreadcrumbList JSON-LD as `components/breadcrumbs.tsx`. */
export function BronzBreadcrumbs({ category, service }: { category?: string; service?: string }) {
  const trail = [
    { href: "/", label: "Acasă" },
    { href: "/servicii", label: "Servicii" },
    ...(category ? [{ href: `/servicii/${normalizeString(category)}`, label: category }] : []),
    ...(service ? [{ href: "", label: service }] : []),
  ];

  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      {category ? (
        <script
          id="breadcrumbs-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbsSchema(category, service)) }}
        />
      ) : null}
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 text-(--muted)">
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={c.label} className="flex items-center gap-3">
              {last ? (
                <span aria-current="page" className="text-(--cream-dim)">{c.label}</span>
              ) : (
                <Link href={c.href} className="link-u hover:text-(--cream)">{c.label}</Link>
              )}
              {last ? null : <span aria-hidden="true" className="text-(--gold)/70">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
