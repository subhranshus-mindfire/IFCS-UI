import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { FlightList } from '../types/Flight';

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


export const getDepartureType = (flight: FlightList): { time: string | null; type: string } => {
  if (flight.actualDepartureUtc) return { time: formatTimeInHHMM(flight.actualDepartureUtc), type: "Actual" };
  if (flight.estimatedDepartureUtc) return { time: formatTimeInHHMM(flight.estimatedDepartureUtc), type: "Estimated" };
  return { time: formatTimeInHHMM(flight.scheduledDeparture), type: "Scheduled" };
};

export const getArrivalType = (flight: FlightList): { time: string | null; type: string } => {
  if (flight.actualArrivalUtc) return { time: formatTimeInHHMM(flight.actualArrivalUtc), type: "Actual" };
  if (flight.estimatedArrivalUtc) return { time: formatTimeInHHMM(flight.estimatedArrivalUtc), type: "Estimated" };
  return { time: formatTimeInHHMM(flight.scheduledArrival), type: "Scheduled" };
};

export const formatTimeInHHMM = (isoString: string | null | undefined): string | null => {
  if (!isoString) return null;
  try {
    return new Date(isoString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  } catch {
    return isoString.substring(11, 16);
  }
};

export const formatDate = (isoString: string | null | undefined): string | null => {
  if (!isoString) return null;
  try {
    return new Date(isoString).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
    });
  } catch {
    return isoString.substring(5, 10).replace('-', ' ');
  }
};



export const getPaxCount = (count: number | null | undefined): string => {
  return count !== null && count !== undefined ? String(count) : "0";
}
const IGNORED_PAX_KEYS = ['totalCount', 'id', 'fmId'];
/**
 * Dynamically extracts cabin counts from the paxCounts object, excluding 
 * metadata (id, fmId) and null/zero counts.
 */
export const getDynamicCabinCounts = (paxCounts: FlightList['passengers']) => {
  return Object.entries(paxCounts)
    .filter(([key, count]) => {
      // 1. Ignore metadata keys: id, fmId, and totalCount
      if (IGNORED_PAX_KEYS.includes(key)) {
        return false;
      }

      // 2. Ignore null, undefined, or zero counts
      return count !== null && count !== undefined && count > 0;
    })
    .map(([key, count]) => ({
      // Cast 'count' to number since it passed the checks
      label: getCabinLabel(key),
      count: count as number,
      key: key
    }));
};
/**
 * GENERIC UTILITY: Converts a camelCase/PascalCase key to a readable label.
 * E.g., 'businessStudioCount' -> 'Business Studio'
 */
export const getCabinLabel = (key: string): string => {
  let label = key.replace(/Count|Total/g, '');

  label = label.replace(/([A-Z])/g, ' $1').trim();

  return label.charAt(0).toUpperCase() + label.slice(1);
};


export const getTodayString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatDateToMMDDYY = (dateString: string) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${month}/${day}/${year.slice(-2)}`;
};