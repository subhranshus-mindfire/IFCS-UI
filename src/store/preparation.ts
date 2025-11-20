import { create } from 'zustand';
import type { PreparationItem } from '../types/Flight';
import { fetchPreparations } from '../services/preparation';

interface PreparationStoreState {
    preparations: PreparationItem[];
    isLoading: boolean;
    error: string | null;
    fetchData: () => Promise<void>;
}

export const usePreparationStore = create<PreparationStoreState>((set) => ({
    preparations: [],
    isLoading: false,
    error: null,

    fetchData: async () => {
        set({ isLoading: true, error: null });

        try {
            const data = await fetchPreparations();
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