"use client";

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Clock } from 'lucide-react';
import { services } from '@/lib/data';
import { normalizeString } from '@/lib/utils';
import Link from 'next/link';
import { Textarea } from '../ui/textarea';

const availableTimes: Record<number, string[]> = {
  1: ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"],
  2: ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"],
  3: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"],
  4: ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"],
  5: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"],
}

export default function BookingPricing() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedService, setSelectedService] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const selectedDay = date?.getDay() ?? null;
  const timeSlots = selectedDay !== null && availableTimes[selectedDay] ? availableTimes[selectedDay] : [];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Listă de prețuri și Programări Online
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Vezi prețurile tratamentelor noastre și programează-te simplu și rapid cu câteva click-uri.
          </p>
        </div>

        <motion.div
          ref={ref}
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Tabs defaultValue="pricing" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="pricing">Listă de Prețuri</TabsTrigger>
              <TabsTrigger value="booking">Programări Online</TabsTrigger>
            </TabsList>

            <TabsContent id="preturi" value="pricing" className="border rounded-lg p-6 shadow-xs">
              {services.map((category, index) => (
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
              ))}
            </TabsContent>

            <TabsContent value="booking">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column - Calendar */}
                    <div>
                      <h3 className="font-semibold text-lg mb-4 flex items-center">
                        <CalendarIcon className="mr-2 h-5 w-5 text-pink-500" />
                        Alegeți data și ora
                      </h3>

                      <div className="mb-6">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-md border w-full h-full flex"
                          classNames={{
                            months:
                              "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
                            month: "space-y-4 w-full flex flex-col",
                            table: "w-full h-full border-collapse space-y-1",
                            head_row: "",
                            row: "w-full mt-2",
                          }}
                          disabled={(date) => [0, 6].includes(date.getDay()) || date < new Date()}
                        />
                      </div>

                      <div className="mb-6">
                        <Label htmlFor="time" className="mb-2 block">Ora programării</Label>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map((time) => (
                            <Button
                              key={time}
                              type="button"
                              variant={selectedTime === time ? "default" : "outline"}
                              className={selectedTime === time ? "bg-pink-500 hover:bg-pink-600" : ""}
                              onClick={() => setSelectedTime(time)}
                            >
                              <Clock className="mr-2 h-4 w-4" />
                              {time}
                            </Button>
                          ))}
                          {timeSlots.length === 0 && (
                            <div className="col-span-3 text-pink-500 text-sm">
                              Selectați o dată pentru a vedea orele disponibile.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Form */}
                    <div>
                      <h3 className="font-semibold text-lg mb-4">Informațiile dvs.</h3>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Numele</Label>
                            <Input id="name" placeholder="Introduceți numele" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Telefon</Label>
                            <Input id="phone" placeholder="Numărul de telefon" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="service">Select Service</Label>
                          <Select value={selectedService} onValueChange={setSelectedService}>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a treatment" />
                            </SelectTrigger>
                            <SelectContent>
                              {services.map((category) => (
                                <div key={category.category}>
                                  <div className="px-2 py-1.5 text-sm font-semibold text-gray-500">
                                    {category.category}
                                  </div>
                                  {category.items.map((service) => (
                                    <SelectItem key={service.title} value={service.title}>
                                      {service.title}
                                    </SelectItem>
                                  ))}
                                </div>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Mesaj</Label>
                          <Textarea id="message" placeholder="Introduceți un mesaj (opțional)" />
                        </div>

                        <div className="pt-4">
                          <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                            Confirmă Programarea
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};