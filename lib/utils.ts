import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const serviceMap: { [key: string]: string } = {
  vshape: "VShape Anticelulitic",
  criolipoliza: "Criolipoliză",
  emslim: "EMSlim Neo RF",
  radiofrecventa: "Radiofrecvență Bipolară",
  masaj: "Masaj Vacuum Anticelulitic",
  presoterapie: "Presoterapie (Drenaj Limfatic)",
  cavitatie: "Cavitatie",
  impachetari: "Împachetări Tunel IR",
  bronzare: "Bronzare Organică cu DHA",
  dermapen: "Dermapen cu Microneedling",
  microdermabraziune: "Microdermabraziune",
  tratament: "Tratament Clasic de Curățire"
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

export const normalizeString = (str: string) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-');
};