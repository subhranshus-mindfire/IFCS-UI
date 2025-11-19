import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats an ISO 8601 string into a user-friendly date and time string.
 * Used for displaying update timestamps in the Flight History modal.
 * * @param isoString The ISO 8601 date/time string (e.g., '2025-12-15T22:52:00.000Z').
 * @returns A localized date and time string (e.g., "12/15/2025, 10:52:00 PM").
 */
export const formatTime = (isoString: string | null | undefined): string | null => {
  if (!isoString) return null;

  try {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  } catch (e) {
    // Fallback in case of invalid date format
    console.error("Error formatting date:", e);
    return isoString.substring(0, 19).replace('T', ' ');
  }
};