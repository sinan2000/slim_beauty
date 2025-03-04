import Link from "next/link";
import { ChevronRight, Home } from 'lucide-react';
import { normalizeString } from "@/lib/utils";

interface BreadcrumbsProps {
  category: string;
  service?: string;
}

export default function Breadcrumbs({ category, service }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center text-sm md:text-base px-4 pt-2 sm:pt-4 text-black/90 mb-6">
      <Link
        href="/"
        className="flex items-center hover:text-pink-500 transition-colors"
      >
        <Home className="h-4 w-4 mr-1" />
        <span className="hidden sm:inline">Acasă</span>
      </Link>

      <ChevronRight className="h-4 w-4 mx-2 text-black/70" />

      <Link
        href="/servicii"
        className="hover:text-pink-500 transition-colors"
      >
        Servicii
      </Link>

      <ChevronRight className="h-4 w-4 mx-2 text-black/70" />

      <Link
        href={`/servicii/${normalizeString(category)}`}
        className={`hover:text-pink-500 transition-colors capitalize ${service ? '' : 'font-medium'}`}
      >
        {category}
      </Link>

      {service && (
        <>
          <ChevronRight className="h-4 w-4 mx-2 text-black/70" />
          <span className="font-medium capitalize truncate">{service}</span>
        </>
      )}
    </nav>
  );
}
