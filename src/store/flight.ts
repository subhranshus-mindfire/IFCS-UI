import { create } from "zustand";
import type {
  FlightStoreState, FlightFilters,
  //  FlightList,
  AddFlightPayload, AddFlightResponse
} from "../types/Flight";
// import { flightList as mockFlights } from "../const/flightData";
import { addBulkFlight, addFlight, fetchFlightOptions, fetchFlights, fetchFlightStats } from "../services/flight";
import { AxiosError } from "axios";
// import { fetchFlights } from "../services/flight";

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

// const extractDate = (isoString: string | null | undefined): string | undefined =>
//   isoString ? isoString.substring(0, 10) : undefined;

// const filterFlights = (flightPair: FlightList[], filters: FlightFilters): boolean => {
//   return flightPair.some(flight => {
//     let match = true;

//     if (filters.date) {
//       const flightDate = extractDate(flight.scheduledDeparture);
//       if (flightDate !== filters.date) {
//         match = false;
//       }
//     }
//     if (!match) return false;
//     if (filters.client && filters.client !== 'All') {
//       const filterClientLower = filters.client.toLowerCase();

//       // Ensure the flight's client data exists
//       const flightClient = flight.ifcsClient; // Assuming this property is correctly defined in FlightList/Flight interface

//       if (!flightClient || flightClient.toLowerCase() !== filterClientLower) {
//         match = false;
//       }
//     }
//     if (!match) return false;
//     if (filters.station) {
//       const stationLower = filters.station.toLowerCase();
//       const depMatch = flight.departureDestination?.toLowerCase().includes(stationLower);
//       const arrMatch = flight.arrivalDestination?.toLowerCase().includes(stationLower);
//       if (!depMatch && !arrMatch) {
//         match = false;
//       }
//     }
//     if (!match) return false;

//     if (filters.flight) {
//       const flightLower = filters.flight.toLowerCase();
//       if (!flight.flightNumber?.toLowerCase().includes(flightLower)) {
//         match = false;
//       }
//     }
//     if (!match) return false;

//     if (filters.acReg) {
//       const acRegLower = filters.acReg.toLowerCase();
//       if (!flight.aircraft?.registration?.toLowerCase().includes(acRegLower)) {
//         match = false;
//       }
//     }
//     if (!match) return false;

//     if (filters.acType) {
//       const acTypeLower = filters.acType.toLowerCase();
//       if (!flight.aircraft?.type?.toLowerCase().includes(acTypeLower)) {
//         match = false;
//       }
//     }
//     if (!match) return false;

//     if (filters.route) {
//       const routeLower = filters.route.toLowerCase();
//       if (!flight.pairRoute?.toLowerCase().includes(routeLower)) {
//         match = false;
//       }
//     }
//     if (!match) return false;

//     if (filters.status) {
//       const statusLower = filters.status.toLowerCase();
//       if (!flight.status?.toLowerCase().includes(statusLower)) {
//         match = false;
//       }
//     }
//     if (!match) return false;

//     // if (filters.client) {
//     //   const clientLower = filters.client.toLowerCase();
//     //   if (!flight.ifcsClient?.toLowerCase().includes(clientLower)) {
//     //     match = false;
//     //   }
//     // }
//     return match;
//   });
// };


export const useFlightStore = create<FlightStoreState>((set) => ({
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
      set({ isLoading: false });
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
      set({ isLoading: false });
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
}));