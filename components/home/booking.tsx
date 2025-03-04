'use client';

import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '../ui/textarea';
import { services } from '@/lib/data';
import { useActionState } from 'react';
import { bookAppointment, getEventsForMonth } from '@/app/actions';
import { useFormStatus } from 'react-dom';
import { format, getMonth, getYear } from 'date-fns';

const availableTimes: Record<number, string[]> = {
  1: ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"],
  2: ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"],
  3: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"],
  4: ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"],
  5: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"],
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-pink-500 hover:bg-pink-600 text-white">
      {pending ? "Booking..." : "Confirmă Programarea"}
    </Button>
  );
}

export default function Booking() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedService, setSelectedService] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);

  const selectedYear = date ? getYear(date) : getYear(new Date());
  const selectedMonth = date ? getMonth(date) + 1 : getMonth(new Date()) + 1;

  const selectedDay = date?.getDay() ?? null;
  const timeSlots = selectedDay !== null && availableTimes[selectedDay] ? availableTimes[selectedDay] : [];

  const initialState = { message: "", success: true };
  const [state, formAction] = useActionState(async (_prevState: { message: string, success: boolean }, formData: FormData) => {
    return await bookAppointment(formData);
  }, initialState);

  useEffect(() => {
    async function fetchBookings() {
      const response = await getEventsForMonth(selectedYear, selectedMonth);
      console.log(response.events);
      if (response.success) {
        //const times = response.events.map(event => format(new Date(event.start), "HH:mm"));
        //setBookedTimes(times);
      }
    }

    fetchBookings();
  }, [selectedYear, selectedMonth]);

  return (
    <Card>
      <CardContent className="pt-6">
        <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Calendar */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Alegeți data și ora</h3>

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
              <input type="hidden" name="date" value={date ? date.toISOString() : ""} />
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
                    disabled={bookedTimes.includes(time)}
                  >
                    {time}
                  </Button>
                ))}
                <input type="hidden" name="time" value={selectedTime} />
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
                  <Input name="name" placeholder="Introduceți numele" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input name="phone" placeholder="Numărul de telefon" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service">Select Service</Label>
                <Select name="service" value={selectedService} onValueChange={setSelectedService} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a treatment" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((category) => (
                      <div key={category.category}>
                        <div className="px-2 py-1.5 text-sm font-semibold text-gray-500">{category.category}</div>
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
                <Textarea name="message" placeholder="Introduceți un mesaj (opțional)" />
              </div>

              {state?.message && <p className={`${state.success === true ? 'text-green-500' : 'text-red-500'} text-sm`}>{state.message}</p>}

              <div className="pt-4">
                <SubmitButton />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
