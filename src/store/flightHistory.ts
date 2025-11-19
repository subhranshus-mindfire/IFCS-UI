import { create } from 'zustand';
import { flightHistory as rawFlightHistoryData } from '../const/flightData';
import type { FlightHistoryStoreState } from '../types/Flight';


export const useFlightHistoryStore = create<FlightHistoryStoreState>((set) => ({
    rawHistory: [],
    isLoading: false,
    error: null,

    /**
     * Fetches the raw flight history updates for a given flight number.
     * In production, this calls the API service.
     * @param flightNumber The flight number (e.g., "WY395") to fetch history for.
     */
    fetchFlightHistory: async (flightNumber: string) => {
        set({ isLoading: true, error: null, rawHistory: [] }); // Start loading

        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            const rawEntries = rawFlightHistoryData

            if (rawEntries.length > 0) {
                set({ rawHistory: rawEntries, isLoading: false });
            } else {
                set({
                    rawHistory: [],
                    isLoading: false,
                    error: `No raw history found for flight ${flightNumber}`
                });
            }

        } catch (err) {
            console.error(`Failed to fetch history for ${flightNumber}:`, err);
            let errorMessage = "Failed to load flight history data from API.";
            if (err instanceof Error) {
                errorMessage = err.message;
            }
            set({ error: errorMessage, isLoading: false, rawHistory: [] });
        }
    },
}));