import { create } from 'zustand';
import { flights } from '../const/flightData';
import type { FlightStoreState } from '../types/Flight';

export const useFlightStore = create<FlightStoreState>((set) => ({
    flights: [],
    isLoading: false,
    error: null,

    fetchFlights: async () => {
        set({ isLoading: true, error: null });

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            set({ flights: flights, isLoading: false });

        } catch (err) {
            console.error("Failed to fetch flights:", err);
            let errorMessage = "Failed to load flight data.";
            if (err instanceof Error) {
                errorMessage = err.message;
            }
            set({ error: errorMessage, isLoading: false });
        }
    },
}));