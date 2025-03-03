'use client';
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Clock } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { services } from '@/lib/data';

const availableTimes: Record<number, string[]> = {
  1: ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"],
  2: ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"],
  3: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"],
  4: ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"],
  5: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"],
}

export default function Booking() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedService, setSelectedService] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const selectedDay = date?.getDay() ?? null;
  const timeSlots = selectedDay !== null && availableTimes[selectedDay] ? availableTimes[selectedDay] : [];


  return (
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
  )
}