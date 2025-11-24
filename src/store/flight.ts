import { create } from "zustand";
import type {
  FlightStoreState, FlightFilters,
  AddFlightPayload, AddFlightResponse
} from "../types/Flight";
import { addBulkFlight, addFlight, fetchFlightOptions, fetchFlights, fetchFlightStats, flightDetailsService } from "../services/flight";
import { AxiosError } from "axios";
import type { } from "../types/Flight";

const calculateDefaultDate = () => {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear();
  return `${year}-${month}-${day}`;
};

// Define the initial default filters
const INITIAL_FILTERS: FlightFilters = {
  page: 1,
  limit: 50,
  sortBy: 'scheduledDeparture',
  order: 'desc',
  date: calculateDefaultDate(),
  client: "Oman Air"
};


export const useFlightStore = create<FlightStoreState>((set, get) => ({
  flightData: null,
  flights: [],
  flightStats: {
    total: 0,
    completed: 0,
    waiting: 0
  },
  airlineCodeOptions: [],
  airportOptions: [],
  aircraftRegOptions: [],
  isLoading: false,
  error: null,
  filters: INITIAL_FILTERS,
  setFilters: (newFilters: FlightFilters) => {
    set({ filters: newFilters });
  },
  fetchFlight: async (flightId: string) => {
    try {
      set({ isLoading: true, error: null });

      const data = await flightDetailsService.getFlightById(flightId);

      set({
        flightData: data,
        isLoading: false,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        set({
          error: error?.response?.data?.message || "Something went wrong",
          isLoading: false,
        });
      }
    }
  },

  fetchFlights: async (filters: FlightFilters = {
    page: 1,
    limit: 50,
    sortBy: 'scheduledDeparture',
    order: 'desc'
  }) => {
    set({ isLoading: true, error: null });

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      // let filteredFlights = mockFlights;

      // if (Object.keys(filters).length > 0) {
      //   filteredFlights = mockFlights.filter(pair => filterFlights(pair, filters));
      // }
      const filteredFlights = await fetchFlights(filters);
      set({ flights: filteredFlights, isLoading: false });

    } catch (err) {
      console.error("Failed to fetch flights:", err);
      let errorMessage = "Failed to load flight data.";

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      set({ flights: [], error: errorMessage, isLoading: false });
    }
  },

  fetchFlightStats: async (filters: FlightFilters = {
    page: 1,
    limit: 50,
    sortBy: 'scheduledDeparture',
    order: 'desc',
    client: 'Oman Air'
  }) => {
    set({ isLoading: true, error: null });

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const filteredFlightsStats = await fetchFlightStats(filters);

      set({ flightStats: filteredFlightsStats, isLoading: false });

    } catch (err) {
      console.error("Failed to fetch flights:", err);
      let errorMessage = "Failed to load flight data.";

      if (err instanceof AxiosError) {
        errorMessage = err.response?.data.message;
      }

      set({
        flightStats: {
          total: 0,
          completed: 0,
          waiting: 0
        }, error: errorMessage, isLoading: false
      });
    }
  },

  addFlight: async (payload: AddFlightPayload): Promise<AddFlightResponse> => {
    set({ isLoading: true, error: null });
    try {
      const newFlightData = await addFlight(payload);
      const currentFilters = get().filters;
      await get().fetchFlights(currentFilters);
      await get().fetchFlightStats(currentFilters);
      // set({ isLoading: false });

      return newFlightData;

    } catch (err) {
      console.error("Failed to add flight:", err);
      let errorMessage = "Failed to add flight. Please check input values.";
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data.message || err.response?.statusText;
      }

      set({ error: errorMessage, isLoading: false });
      throw err;
    }
  },
  addBulkFlight: async (payload: AddFlightPayload[]): Promise<AddFlightResponse[]> => {
    set({ isLoading: true, error: null });
    try {
      const newFlightData = await addBulkFlight(payload);
      const currentFilters = get().filters;
      await get().fetchFlights(currentFilters);
      await get().fetchFlightStats(currentFilters);
      // set({ isLoading: false });
      return newFlightData;

    } catch (err) {
      console.error("Failed to add flight:", err);
      let errorMessage = "Failed to add flight. Please check input values.";
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data.message || err.response?.statusText;
      }

      set({ error: errorMessage, isLoading: false });
      throw err;
    }
  },
  fetchFlightOptions: async () => {
    set({ error: null });
    try {
      const options = await fetchFlightOptions();

      set({
        airlineCodeOptions: options.airlineCodes,
        airportOptions: options.airports,
        aircraftRegOptions: options.aircraftRegs,
      });

    } catch (err) {
      console.error("Failed to fetch flight options:", err);
    }
  },

  clearFlight: () => set({ flightData: null, error: null }),
}));