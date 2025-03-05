import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { normalizeString } from "@/lib/utils"
import { generateBreadcrumbsSchema } from "@/lib/jsonLds"

interface BreadcrumbsProps {
  category: string
  service?: string
}

export default function Breadcrumbs({ category, service }: BreadcrumbsProps) {

  return (
    <nav className="flex flex-wrap items-center text-sm md:text-base px-4 pt-2 sm:pt-4 text-black/90 mb-6">
      <script
        id="breadcrumbs-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbsSchema(category, service)) }}
      />

      <Link href="/" className="flex items-center hover:text-pink-500 transition-colors mr-2 mb-1">
        <Home className="h-4 w-4 mr-1 flex-shrink-0" />
        <span className="hidden sm:inline">Acasă</span>
      </Link>

      <ChevronRight className="h-4 w-4 mr-2 text-black/70 flex-shrink-0 mb-1" />

      <Link href="/servicii" className="hover:text-pink-500 transition-colors mr-2 mb-1">
        Servicii
      </Link>

      <ChevronRight className="h-4 w-4 mr-2 text-black/70 flex-shrink-0 mb-1" />

      <Link
        href={`/servicii/${normalizeString(category)}`}
        className={`hover:text-pink-500 transition-colors capitalize max-w-[120px] xs:max-w-[180px] sm:max-w-none truncate mr-2 mb-1 ${service ? "" : "font-medium"}`}
        title={category}
      >
        {category}
      </Link>

      {service && (
        <>
          <ChevronRight className="h-4 w-4 mr-2 text-black/70 flex-shrink-0 mb-1" />
          <span
            className="font-medium capitalize max-w-[150px] xs:max-w-[200px] sm:max-w-xs truncate mb-1"
            title={service}
          >
            {service}
          </span>
        </>
      )}
    </nav>
  )
}

