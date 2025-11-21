import { create } from "zustand";
import { flightDetailsService } from "../services/FlightDetailsService";
import type { FlightData } from "../types/Flight";

interface FlightStoreState {
  flightData: FlightData[] | null;
  loading: boolean;
  error: string | null;

  fetchFlight: (flightId: string) => Promise<void>;
  clearFlight: () => void;
}

export const useFlightStore = create<FlightStoreState>((set) => ({
  flightData: null,
  loading: false,
  error: null,

  fetchFlight: async (flightId: string) => {
    try {
      set({ loading: true, error: null });

      const data = await flightDetailsService.getFlightById(flightId);

      set({
        flightData: data,
        loading: false,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({
        error: error?.message || "Something went wrong",
        loading: false,
      });
    }
  },

  clearFlight: () => set({ flightData: null, error: null }),
}));
