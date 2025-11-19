// import { create } from "zustand";
// import type { FlightStoreState } from "../types/Flight";
// import { fetchFlights } from "../services/flight";

// export const useFlightStore = create<FlightStoreState>((set) => ({
//   flights: [],
//   isLoading: false,
//   error: null,

//   fetchFlights: async (filters) => {
//     set({ isLoading: true, error: null });

//     try {
//       const fetchedFlights = await fetchFlights(filters);
//       console.log(fetchedFlights, "fetched")
//       set({ flights: fetchedFlights, isLoading: false });

//     } catch (err) {
//       console.error("Failed to fetch flights:", err);
//       let errorMessage = "Failed to load flight data.";

//       // Improved error handling (assuming the error structure from the service call)
//       if (err instanceof Error) {
//         errorMessage = err.message;
//       }
//       // Note: Full Axios error handling is now mostly handled within the service,
//       // which should re-throw a standard Error or just the original error.

//       set({ error: errorMessage, isLoading: false });
//     }
//   },
// }));
// store/flight.ts (or wherever your store is located)

import { create } from "zustand";
import type { FlightStoreState, FlightFilters, Flight } from "../types/Flight";
import { flights as mockFlights } from "../const/flightData"; // <-- Import mock data

// Helper function to extract date (YYYY-MM-DD) from ISO string
const extractDate = (isoString: string | null | undefined): string | undefined =>
  isoString ? isoString.substring(0, 10) : undefined;

// Function to check if a flight (or pair member) matches the current filters
const filterFlights = (flightPair: Flight[], filters: FlightFilters): boolean => {
  // Check if ANY flight in the pair matches the criteria
  return flightPair.some(flight => {
    let match = true;

    // --- Filter by Date (Scheduled Departure Date) ---
    if (filters.date) {
      const flightDate = extractDate(flight.scheduledDeparture);
      if (flightDate !== filters.date) {
        match = false;
      }
    }
    if (!match) return false;

    // --- Filter by Station (Dep/Arr IATA code) ---
    if (filters.station) {
      const stationLower = filters.station.toLowerCase();
      const depMatch = flight.departureDestination?.toLowerCase().includes(stationLower);
      const arrMatch = flight.arrivalDestination?.toLowerCase().includes(stationLower);
      if (!depMatch && !arrMatch) {
        match = false;
      }
    }
    if (!match) return false;

    // --- Filter by Flight Number ---
    if (filters.flight) {
      const flightLower = filters.flight.toLowerCase();
      if (!flight.flightNumber?.toLowerCase().includes(flightLower)) {
        match = false;
      }
    }
    if (!match) return false;

    // --- Filter by AC Reg ---
    if (filters.acReg) {
      const acRegLower = filters.acReg.toLowerCase();
      if (!flight.aircraft?.registration?.toLowerCase().includes(acRegLower)) {
        match = false;
      }
    }
    if (!match) return false;

    // --- Filter by AC Type ---
    if (filters.acType) {
      const acTypeLower = filters.acType.toLowerCase();
      if (!flight.aircraft?.type?.toLowerCase().includes(acTypeLower)) {
        match = false;
      }
    }
    if (!match) return false;

    // --- Filter by Route ---
    if (filters.route) {
      const routeLower = filters.route.toLowerCase();
      if (!flight.pairRoute?.toLowerCase().includes(routeLower)) {
        match = false;
      }
    }
    if (!match) return false;

    // --- Filter by Status ---
    if (filters.status) {
      const statusLower = filters.status.toLowerCase();
      if (!flight.status?.toLowerCase().includes(statusLower)) {
        match = false;
      }
    }
    if (!match) return false;

    // --- Filter by Client (UI Filter) ---
    // if (filters.client) {
    //   const clientLower = filters.client.toLowerCase();
    //   if (!flight.ifcsClient?.toLowerCase().includes(clientLower)) {
    //     match = false;
    //   }
    // }
    // No return needed if client is the last filter; 'match' handles it.


    // If the inner flight object matches all current filters, return true for the pair.
    return match;
  });
};


export const useFlightStore = create<FlightStoreState>((set) => ({
  flights: [],
  isLoading: false,
  error: null,

  fetchFlights: async (filters: FlightFilters = {
    page: 1,
    limit: 50,
    sortBy: 'scheduledDeparture',
    order: 'desc'
  }) => {
    set({ isLoading: true, error: null });

    try {
      // Attempt to fetch from API (using placeholder function now)
      // const fetchedFlights = await fetchApiFlights(filters);
      // set({ flights: fetchedFlights, isLoading: false });

      // For now, simulating API success with mock data
      // We use a small delay to simulate network latency
      await new Promise(resolve => setTimeout(resolve, 500));

      // --- Apply Filtering Logic to Mock Data ---
      let filteredFlights = mockFlights;

      if (Object.keys(filters).length > 0) {
        filteredFlights = mockFlights.filter(pair => filterFlights(pair, filters));
      }


      set({ flights: filteredFlights, isLoading: false });

    } catch (err) {
      // If API fails, you would still use mock data but report the error.
      console.error("Failed to fetch flights:", err);
      let errorMessage = "Failed to load flight data.";

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      // Using mock data as fallback on API error (optional, but useful for dev)
      set({ flights: mockFlights, error: errorMessage, isLoading: false });
    }
  },
}));