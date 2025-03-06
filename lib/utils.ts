import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { services } from "./data"
import { StaticImageData } from "next/image";
import { DateTime } from "luxon";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const romanianCharMap: { [key: string]: string } = {
  'ă': 'a',
  'â': 'a',
  'î': 'i',
  'ș': 's',
  'ț': 't',
  'Ă': 'A',
  'Â': 'A',
  'Î': 'I',
  'Ș': 'S',
  'Ț': 'T'
};

export function mapRomanianChars(input: string) {
  return input.replace(/[ăâîșțĂÂÎȘȚ]/g, match => romanianCharMap[match]);
}

export function normalizeString(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\s\[\](){}]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getFeaturedServices() {
  return services.flatMap(category =>
    category.items
      .filter(item => item.featured === true)
      .map(({ title, featuredDesc, media, price, duration }) => ({
        name: title,
        description: featuredDesc,
        image: media?.[0] ?? "/placeholder.jpg",
        price: price[0],
        duration: duration
      }))
  );
}

export function getFirstImage(media: (string | StaticImageData)[] | undefined) {
  if (!media) {
    return "/placeholder.svg";
  }
  for (const item of media) {
    if (typeof item !== "string") {
      return item;
    }
  }
  return "/placeholder.svg";
}

export function getMetadataImage(media: (string | StaticImageData)[] | undefined) {
  if (!media || media.length === 0) {
    return '/logo-og.png';
  }

  for (const item of media) {
    if (typeof item !== "string") {
      return item.src;
    }
  }

  return '/logo-og.png';
}

const timeZone = "Europe/Bucharest";

export function isPastDate(date: Date) {
  const nowTime = DateTime.now().setZone(timeZone).startOf('day');
  const selectedTime = DateTime.fromJSDate(date).setZone(timeZone).startOf('day');

  return selectedTime < nowTime;
}

export function formatFormTime(dateISO: string, time: string, duration: number = 0) {
  let date = DateTime.fromISO(dateISO, { zone: "utc" }).setZone(timeZone);

  const [hours, minutes] = time.split(":").map(Number);

  date = date.set({ hour: hours, minute: minutes, second: 0 });

  if (duration) {
    date = date.plus({ minutes: duration });
  }

  return date.toISO({ includeOffset: true });
}

export function getServiceDuration(serviceName: string) {
  const foundService = services
    .flatMap(category => category.items)
    .find(item => item.title === serviceName);

  return foundService?.duration || 0;
}

export function getMonthStartEnd(year: number, month: number) {
  const startOfMonth = DateTime.fromObject({ year, month, day: 1 }, { zone: timeZone })
    .set({ hour: 0, minute: 0, second: 0 });

  const endOfMonth = startOfMonth.endOf("month").set({ hour: 23, minute: 59, second: 59 });

  return {
    timeMin: startOfMonth.toFormat("yyyy-MM-dd'T'00:00:00ZZ"),
    timeMax: endOfMonth.toFormat("yyyy-MM-dd'T'23:59:59ZZ"),
  };
}

export type CalendarEvent = {
  id: string;
  summary: string;
  start: string;
  end: string;
}

export type GroupedEvents = {
  [day: number]: string[];
}

export function processEvents(events: CalendarEvent[]): GroupedEvents {
  return events.reduce((acc, event) => {
    const start = DateTime.fromISO(event.start).setZone(timeZone);
    const end = DateTime.fromISO(event.end).setZone(timeZone);

    const day = start.day;

    const startTime = start.toFormat("HH:mm");
    const endTime = end.toFormat("HH:mm");

    const timeslot = `${startTime}-${endTime}`;

    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(timeslot);

    return acc;
  }, {} as GroupedEvents);
}

export function getDisabledTimeSlots(timeSlots: string[], eventsForDay: string[]) {
  const parseTimeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  const disabled = new Set<string>();

  for (let i = 0; i < timeSlots.length - 1; i++) {
    const slotStart = parseTimeToMinutes(timeSlots[i]);
    const slotEnd = parseTimeToMinutes(timeSlots[i + 1]);

    for (const eventSlot of eventsForDay) {
      const [start, end] = eventSlot.split("-").map(parseTimeToMinutes);

      if (slotStart < end && start < slotEnd) {
        disabled.add(timeSlots[i]);
        break;
      }
    }
  }

  return disabled;
}

export function toRomanianDate(date: string) {
  return DateTime.fromISO(date, { zone: timeZone })
    .setLocale("ro")
    .toLocaleString(DateTime.DATETIME_FULL);
}