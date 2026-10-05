import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { normalizeString } from '@/lib/utils';
import { services } from '@/lib/data';
import Link from 'next/link';

export default function Pricing() {
  return (
    <>
      {
        services.map((category, index) => (
          <div key={index} className="mb-8 last:mb-0">
            <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
              {category.category}
            </h3>

            <Accordion type="single" collapsible className="w-full">
              {category.items.map((service, serviceIndex) => (
                <AccordionItem key={serviceIndex} value={`${index}-${serviceIndex}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex justify-between w-full pr-4">
                      <span className="flex items-center gap-2 text-left">
                        {service.title}
                        {service.isNew && (
                          <span className="bg-pink-100 text-pink-600 text-xs font-medium px-2 py-0.5 rounded-full">NOU</span>
                        )}
                      </span>
                      {service.price.length === 0 ? (
                        <span className="font-medium text-pink-600 whitespace-nowrap">La evaluare</span>
                      ) : (
                        <span className="font-semibold text-pink-600">{service.price[0] + " RON"}{service.price.length > 1 ? ' *' : ''}</span>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex justify-between items-center">
                      <div>
                        {service.duration && (
                          <p className="text-gray-600 mb-2">Durata unei ședințe: {service.duration + " minute"}</p>
                        )}
                        <p className="text-sm text-gray-500">
                          {service.shortDescription}
                        </p>
                        {service.price.length === 0 && (
                          <p className="text-sm text-pink-600 mt-2">
                            Pentru detalii despre preț, contactează-ne. Află mai multe despre tratament accesând <Link href={`/servicii/${normalizeString(category.category)}/${normalizeString(service.title)}`} className="underline">această</Link> pagină.
                          </p>
                        )}
                        {service.price.length > 1 && (
                          <p className="text-sm text-pink-600 mt-2">
                            * Prețul afișat este pentru o singură ședință. Puteți vedea prețurile pentru pachete accesând <Link href={`/servicii/${normalizeString(category.category)}/${normalizeString(service.title)}`} className="underline">această</Link> pagină.
                          </p>
                        )}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))
      }
    </>
  )
}