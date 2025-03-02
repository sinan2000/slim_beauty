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

const services = [
  {
    category: "Body Treatments",
    items: [
      { name: "EMSlim Neo RF Body Contouring", price: "€150", duration: "45 min" },
      { name: "Cryolipolysis Fat Reduction", price: "€180", duration: "75 min" },
      { name: "Vacuum Therapy", price: "€90", duration: "30 min" },
      { name: "Lymphatic Drainage Massage", price: "€110", duration: "60 min" }
    ]
  },
  {
    category: "Facial Treatments",
    items: [
      { name: "Hydrafacial Deluxe", price: "€120", duration: "60 min" },
      { name: "Microdermabrasion", price: "€85", duration: "45 min" },
      { name: "LED Light Therapy", price: "€70", duration: "30 min" },
      { name: "Anti-Aging Facial", price: "€130", duration: "75 min" }
    ]
  },
  {
    category: "Packages",
    items: [
      { name: "Complete Body Transformation (6 sessions)", price: "€750", duration: "Various" },
      { name: "Facial Rejuvenation Package (4 sessions)", price: "€400", duration: "Various" },
      { name: "Bride-to-Be Package", price: "€350", duration: "180 min" },
      { name: "Monthly Maintenance", price: "€200/month", duration: "Various" }
    ]
  }
];

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

export default function BookingPricing() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedService, setSelectedService] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Pricing & Booking
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            View our treatment prices and book your appointment online in just a few clicks.
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
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="booking">Book Appointment</TabsTrigger>
            </TabsList>

            <TabsContent value="pricing" className="border rounded-lg p-6 shadow-xs">
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
                            <span>{service.name}</span>
                            <span className="font-semibold text-pink-500">{service.price}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-gray-600 mb-2">Duration: {service.duration}</p>
                              <p className="text-sm text-gray-500">
                                Experience our premium {service.name.toLowerCase()} treatment, designed to deliver exceptional results.
                              </p>
                            </div>
                            <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                              Book Now
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
                        Select Date & Time
                      </h3>

                      <div className="mb-6">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-md border"
                          disabled={{ before: new Date() }}
                        />
                      </div>

                      <div className="mb-6">
                        <Label htmlFor="time" className="mb-2 block">Select Time</Label>
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
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Form */}
                    <div>
                      <h3 className="font-semibold text-lg mb-4">Your Information</h3>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" placeholder="Enter your first name" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" placeholder="Enter your last name" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="Enter your email" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" placeholder="Enter your phone number" />
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
                                    <SelectItem key={service.name} value={service.name}>
                                      {service.name} ({service.price})
                                    </SelectItem>
                                  ))}
                                </div>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="pt-4">
                          <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                            Confirm Booking
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