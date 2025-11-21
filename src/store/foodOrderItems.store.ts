import { create } from "zustand";
import axiosInstance from "../config/axiosInstance";
import type { FoodOrderItem } from "../types/Flight";

interface FoodOrderItemsState {
  items: FoodOrderItem[];
  loading: boolean;
  error: string | null;

  fetchFoodOrderItems: (flightId: string) => Promise<void>;
  clear: () => void;
}

export const useFoodOrderItemsStore = create<FoodOrderItemsState>((set) => ({
  items: [],
  loading: false,
  error: null,

  fetchFoodOrderItems: async (flightId: string) => {
    set({ loading: true, error: null });

    try {
      const response = await axiosInstance.get(
        `/flights/${flightId}/food-order-items`
      );

      set({
        items: response.data.data, 
        loading: false,
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({
        error: error?.message ?? "Failed to fetch meal orders",
        loading: false,
      });
    }
  },

  clear: () => set({ items: [], error: null, loading: false }),
}));
