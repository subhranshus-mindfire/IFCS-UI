import { create } from 'zustand';
import { flightHistoryData } from '../const/flightData'; // Adjust path as needed
import type { HistoryEntry } from '../types/Flight'; // Assuming FlightHistory and FlightHistoryEntry types

// Define the state structure for the Flight History Store
interface FlightHistoryStoreState {
    history: HistoryEntry[];
    isLoading: boolean;
    error: string | null;
    fetchFlightHistory: (flightNumber: string) => Promise<void>;
}

// Create the Zustand store
export const useFlightHistoryStore = create<FlightHistoryStoreState>((set) => ({
    // Initial state
    history: [],
    isLoading: false,
    error: null,

    /**
     * Fetches the flight history for a given flight number.
     * @param flightNumber The flight number (e.g., "WY843") to fetch history for.
     */
    fetchFlightHistory: async (flightNumber: string) => {
        set({ isLoading: true, error: null, history: [] }); // Start loading

        try {
            // Simulate an API call delay
            await new Promise(resolve => setTimeout(resolve, 500));

            // Logic to retrieve the history from the imported data object
            const historyEntries = flightHistoryData[flightNumber];

            if (historyEntries) {
                set({ history: historyEntries, isLoading: false });
            } else {
                // If the flight number is not found in the data
                set({
                    history: [],
                    isLoading: false,
                    error: `No history found for flight ${flightNumber}`
                });
            }

        } catch (err) {
            console.error(`Failed to fetch history for ${flightNumber}:`, err);
            let errorMessage = "Failed to load flight history data.";
            if (err instanceof Error) {
                errorMessage = err.message;
            }
            set({ error: errorMessage, isLoading: false, history: [] });
        }
    },
}));