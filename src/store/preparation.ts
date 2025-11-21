import { create } from 'zustand';
import { fetchPreparations } from '../services/preparation';
import type { PreparationStoreState } from '../types/Flight';

export const usePreparationStore = create<PreparationStoreState>((set) => ({
    preparations: [],
    isLoading: false,
    error: null,

    fetchData: async (flightId: string) => {
        set({ isLoading: true, error: null });

        try {
            const data = await fetchPreparations(flightId);
            set({ preparations: data, isLoading: false, error: null });
        } catch (e) {
            console.error("Failed to fetch preparations:", e);
            let errorMessage = "Failed to load preparation data.";
            if (e instanceof Error) {
                errorMessage = e.message;
            }
            set({ preparations: [], isLoading: false, error: errorMessage });
        }
    },
}));