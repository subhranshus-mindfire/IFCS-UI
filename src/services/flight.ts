import axiosInstance from "../config/axiosInstance";
import { FLIGHTS_ENDPOINT } from "../const/apiEndPoints";
import type { AddFlightPayload, AddFlightResponse, AircraftOption, AirlineOption, AirportOption, FlightFilters, FlightHistoryEntry, FlightList, FlightOptions, FlightStats } from "../types/Flight";

export async function fetchFlights(
    filters: FlightFilters = {
        page: 1,
        limit: 50,
        sortBy: 'scheduledDeparture',
        order: 'desc'
    }
): Promise<FlightList[][]> {
    const params: Record<string, number | string | Date> = {
        page: filters.page || 1,
        limit: filters.limit || 50,
        sortBy: filters.sortBy || "scheduledDeparture",
        order: filters.order || "desc",
    };
    if (filters.date) params.date = filters.date;
    if (filters.client) params.ifcsClient = filters.client;
    if (filters.search) params.search = filters.search;
    if (filters.station) params.station = filters.station;
    if (filters.flight) params.flightNumber = filters.flight;
    if (filters.route) params.route = filters.route;
    if (filters.status) params.status = filters.status;
    if (filters.isCancelled !== undefined)
        params.isCancelled = filters.isCancelled;

    const response = await axiosInstance.get(FLIGHTS_ENDPOINT.flightList, {
        params: params,
    });
    return response.data.data || [];
}

export async function fetchFlightStats(
    filters: FlightFilters = {
        page: 1,
        limit: 50,
        sortBy: 'scheduledDeparture',
        order: 'desc'
    }
): Promise<FlightStats> {
    const params: Record<string, number | string | Date> = {
        page: filters.page || 1,
        limit: filters.limit || 50,
        sortBy: filters.sortBy || "scheduledDeparture",
        order: filters.order || "desc",
    };
    if (filters.date) params.date = filters.date;
    if (filters.client) params.ifcsClient = filters.client;
    if (filters.search) params.search = filters.search;
    if (filters.station) params.station = filters.station;
    if (filters.flight) params.flightNumber = filters.flight;
    if (filters.route) params.route = filters.route;
    if (filters.status) params.status = filters.status;
    if (filters.isCancelled !== undefined)
        params.isCancelled = filters.isCancelled;

    const response = await axiosInstance.get(`${FLIGHTS_ENDPOINT.flightList}/stats`, {
        params: params,
    });
    return response.data.data || [];
}

export const flightDetailsService = {
    async getFlightById(flightId: string) {
        try {
            const response = await axiosInstance.get(`/flights/${flightId}`);
            return response.data?.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Flight API Error:", error);
            throw error;
        }
    }
};

export async function fetchFlightHistory(
    flightId: string
): Promise<FlightHistoryEntry[]> {
    const response = await axiosInstance.get(`${FLIGHTS_ENDPOINT.flightList}/${flightId}/history`);
    return response.data.data || [];
}

export async function addFlight(
    payload: AddFlightPayload
): Promise<AddFlightResponse> {
    const response = await axiosInstance.post(FLIGHTS_ENDPOINT.flightList, payload);
    return response.data.data;
}

export async function addBulkFlight(
    payload: AddFlightPayload[]
): Promise<AddFlightResponse[]> {
    const response = await axiosInstance.post(FLIGHTS_ENDPOINT.flightList, payload);
    return response.data.data;
}


/**
 * Simulates fetching Airline Codes from an independent API endpoint.
 * NOTE: I've added an artificial failure condition here to demonstrate Promise.allSettled.
 */
async function fetchAirlineCodes(): Promise<AirlineOption[]> {
    const response = await axiosInstance.get(`/airlines`);
    return response.data.data || [];
}

async function fetchAirportOptions(): Promise<AirportOption[]> {
    const response = await axiosInstance.get(`/destinations`);
    return response.data.data || [];
}

async function fetchAircraftRegOptions(): Promise<AircraftOption[]> {
    const response = await axiosInstance.get(`/aircrafts`);
    return response.data.data || [];
}


/**
 * Fetches all flight options concurrently using Promise.allSettled().
 * If one API call fails, the others will still return their data.
 */
export async function fetchFlightOptions(): Promise<FlightOptions> {

    const results = await Promise.allSettled([
        fetchAirlineCodes(),
        fetchAirportOptions(),
        fetchAircraftRegOptions()
    ] as const);


    // Initialize default return structure
    const options: FlightOptions = {
        airlineCodes: [],
        airports: [],
        aircraftRegs: [],
    };

    const airlineResult = results[0];
    if (airlineResult.status === 'fulfilled') {
        options.airlineCodes = airlineResult.value;
    } else {
        console.error("Failed to load Airline Codes:", airlineResult.reason);
    }

    const airportResult = results[1];
    if (airportResult.status === 'fulfilled') {
        options.airports = airportResult.value;
    } else {
        console.error("Failed to load Airport Options:", airportResult.reason);
    }

    // Aircraft Registrations (Index 2)
    const aircraftResult = results[2];
    if (aircraftResult.status === 'fulfilled') {
        options.aircraftRegs = aircraftResult.value;
    } else {
        console.error("Failed to load Aircraft Registrations:", aircraftResult.reason);
    }

    return options;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateFlight = async (flightId: string, payload: any) => {
  const { data } = await axiosInstance.patch(`/flights/${flightId}`, payload, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  return data;
};