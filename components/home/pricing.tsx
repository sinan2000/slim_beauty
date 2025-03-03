import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
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
                      <span>{service.title}</span>
                      <span className="font-semibold text-pink-500">{service.price[0] + " RON"}{service.price.length > 1 ? ' *' : ''}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex justify-between items-center">
                      <div>
                        {service.duration !== "" && (
                          <p className="text-gray-600 mb-2">Durata unei ședințe: {service.duration}</p>
                        )}
                        <p className="text-sm text-gray-500">
                          {service.shortDescription}
                        </p>
                        {service.price.length > 1 && (
                          <p className="text-sm text-pink-500 mt-2">
                            * Prețul afișat este pentru o singură ședințe. Puteți vedea prețurile pentru pachete accesând <Link href={`/servicii/${normalizeString(category.category)}/${normalizeString(service.title)}`} className="underline">această</Link> pagină.
                          </p>
                        )}
                      </div>
                      <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                        Programare
                      </Button>
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