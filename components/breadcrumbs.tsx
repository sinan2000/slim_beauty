import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { normalizeString } from "@/lib/utils";

interface BreadcrumbsProps {
  category: string;
  service?: string;
}

export default function Breadcrumbs({ category, service }: BreadcrumbsProps) {
  return (
    <nav className="text-sm text-gray-600 flex items-center space-x-2">
      <Link href="/services" className="hover:text-pink-500 transition-colors">Servicii</Link>
      <ChevronRight className="h-4 w-4 text-gray-400" />
      <Link href={`/servicii/${normalizeString(category)}`} className="hover:text-pink-500 transition-colors capitalize">
        {category}
      </Link>
      {service && (
        <>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-800 font-semibold capitalize">
            {service}
          </span>
        </>
      )}
    </nav>
  );
}
