import { create } from 'zustand';
// import { flightHistory as rawFlightHistoryData } from '../const/flightData';
import type { FlightHistoryStoreState } from '../types/Flight';
import { fetchFlightHistory } from '../services/flight';
import { AxiosError } from 'axios';

export const useFlightHistoryStore = create<FlightHistoryStoreState>((set) => ({
    rawHistory: [],
    isLoading: false,
    error: null,

    /**
     * Fetches the raw flight history updates for a given flight number.
     * In production, this calls the API service.
     * @param flightNumber The flight number (e.g., "WY395") to fetch history for.
     */
    fetchFlightHistory: async (flightId: string) => {
        set({ isLoading: true, error: null, rawHistory: [] });

        try {
            const rawEntries = await fetchFlightHistory(flightId)
            // const rawEntries = rawFlightHistoryData

            if (rawEntries.length > 0) {
                set({ rawHistory: rawEntries, isLoading: false });
            } else {
                set({
                    rawHistory: [],
                    isLoading: false,
                    error: `No history found`
                });
            }

        } catch (err) {
            console.error(`Failed to fetch history for ${flightId}:`, err);
            let errorMessage = "Failed to load flight history data from API.";
            if (err instanceof AxiosError) {
                errorMessage = err.response?.data.message;
            }
            set({ error: errorMessage, isLoading: false, rawHistory: [] });
        }
    },
}));