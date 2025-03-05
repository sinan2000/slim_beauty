import { servicesPageMeta } from "@/lib/metadatas";
import ServicesClient from "./page-client";
import { serviceSchema } from "@/lib/jsonLds";

export default function ServicesPage() {
  return (
    <>
      <script
        id="services-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ServicesClient />
    </>
  );
}

export const metadata = servicesPageMeta;