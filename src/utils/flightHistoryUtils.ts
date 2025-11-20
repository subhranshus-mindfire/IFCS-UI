import { formatTime } from "../lib/utils";
import type { FlightHistoryEntry, HistoryChange, HistoryEntryDisplay } from "../types/Flight";


const FIELD_MAPPING: { [key: string]: string } = {
    aircraftConfig: "Aircraft Config",
    aircraftGroup: "Aircraft Group",
    aircraftRegistration: "Aircraft Registration",
    airlineDesignator: "Airline Designator",
    dataSource: "DataSource",
    departureDestination: "Destination Departure",
    arrivalDestination: "Destination Arrival",
    flightNumber: "Flight Number",
    flightNumberSuffix: "Flight Number Suffix",
    flightTypeIataCode: "IATA Code",
    scheduledArrival: "Scheduled Arrival",
    ScheduledDeparture: "Scheduled Departure",
    sourceData: "Source Data",
    sourceFileName: "Source FileName",
    status: "Status",
    updatedAt: "Updated At",
};

const getDisplayValue = (value: unknown, isPrevious: boolean): string => {
    if (value === null || value === undefined) return "N/A";

    if (typeof value === 'object' && value !== null) {
        if ('name' in value) {
            const nameValue = (value as { name: unknown }).name;
            if (typeof nameValue === 'string') {
                return nameValue;
            }
        }
        return JSON.stringify(value);
    }

    if (typeof value === 'string') {
        const valueStr = value;

        // 1. Handle pipes (remove them for comparison and display)
        if (valueStr.startsWith('|') && valueStr.endsWith('|')) {
            return valueStr.substring(1, valueStr.length - 1);
        }

        // 2. Handle ISO date strings (for scheduled/estimated/actual ISO fields)
        if (valueStr.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
            return formatTime(valueStr) || valueStr;
        }

        // 3. Handle specific 'N/A' placeholder strings from initial creation
        if (isPrevious && valueStr.toUpperCase() === 'N/A') return 'N/A';

        // 4. Handle non-ISO timestamps (like 11-02-2025 10:57:33.318 PM)
        if (valueStr.match(/^\d{2}-\d{2}-\d{4}/) && valueStr.includes(':')) {
            // We return the raw string here, assuming it's correctly formatted for display
            return valueStr;
        }

        return valueStr;
    }

    return String(value);
};


/**
 * Generates the user-facing history display structure by calculating
 * the delta between sequential flight state snapshots.
 */
export const generateHistoryDisplay = (rawEntries: FlightHistoryEntry[]): HistoryEntryDisplay[] => {
    const sortedEntries = [...rawEntries].sort(
        (a, b) => new Date(a.updateTimestamp).getTime() - new Date(b.updateTimestamp).getTime()
    );

    const displayEntries: HistoryEntryDisplay[] = [];

    for (let i = 0; i < sortedEntries.length; i++) {
        const current = sortedEntries[i];
        const previous = i > 0 ? sortedEntries[i - 1] : null;

        const changes: HistoryChange[] = [];

        for (const key of Object.keys(FIELD_MAPPING) as (keyof FlightHistoryEntry)[]) {
            const fieldName = FIELD_MAPPING[key];

            const currentValueRaw = current[key];
            const previousValueRaw = previous ? previous[key] : undefined;

            const currentStr = getDisplayValue(currentValueRaw, false);
            const prevStr = getDisplayValue(previousValueRaw, true);

            // --- Logic for Initial Entry (Flight Created) ---
            if (i === 0) {
                // For the first entry, only show fields that transitioned from N/A to a value
                if (prevStr === 'N/A' && currentStr !== 'N/A') {
                    changes.push({
                        field: fieldName,
                        previously: "N/A",
                        now: currentStr,
                    });
                }
            }
            // --- Logic for Subsequent Entries (View Changes) ---
            else if (i > 0 && prevStr !== currentStr) {
                changes.push({
                    field: fieldName,
                    previously: prevStr,
                    now: currentStr,
                });
            }
        }

        // --- Determine Label based on request ---
        let label = "View changes";
        if (i === 0) {
            label = "Flight Created";
        }

        // We use the UpdateTime if present in the raw object for the event timestamp
        const timestampSource = current.updatedAt || current.updateTimestamp;


        displayEntries.push({
            timestamp: formatTime(timestampSource) || timestampSource, // Use formatTime on whatever timestamp is available
            label: `${label}`,
            changes: changes,
        });
    }

    return displayEntries;
};