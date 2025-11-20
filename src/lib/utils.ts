import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateToDDMonYYYY(isoDate: string | undefined | null): string {

  if (!isoDate) {
    return "";
  }
  const date = new Date(isoDate);

  const day = date.getUTCDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getUTCFullYear();

  return `${month} ${day},  ${year}`;
}

export function formatLocalTimeFromISO(isoString: string | undefined | null): string {

  if (!isoString) {
    return "";
  }
  const date = new Date(isoString);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}

