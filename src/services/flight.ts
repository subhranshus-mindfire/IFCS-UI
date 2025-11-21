import axiosInstance from "../config/axiosInstance";
import { FLIGHTS_ENDPOINT } from "../const/apiEndPoints";
import type { AddFlightPayload, AddFlightResponse, FlightFilters, FlightHistoryEntry, FlightList, FlightStats } from "../types/Flight";
export type FlightOptions = {
    airlineCodes: string[];
    airports: string[];
    aircraftRegs: string[];
}

const DUMMY_AIRPORT_OPTIONS = [
    "ADA", "ADD", "ADL", "AKL", "ALG", "AMM", "AMS", "ARN", "ASW", "ATH",
    "JFK", "LAX", "LHR", "DXB", "SIN", "CDG", "NRT"
]

const DUMMY_AIRCRAFT_REG_OPTIONS = [
    "A4O-BAA", "A4O-BAB", "A4O-BAC", "A4O-BAE", "A4O-BI",
    "A4O-BK", "A4O-BQ", "A4O-BT", "A4O-BUBCF", "A4O-BW",
    "A9C-GF", "A9C-HJ", "B-LBC", "B-HLO", "VP-BLB"
];
const DUMMY_AIRLINE_CODE_OPTIONS = ["WY", "OV", "QR", "EK", "BA", "SQ", "JL", "AF"];
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
    if (filters.client) params.client = filters.client;
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


/**
 * Simulates fetching Airline Codes from an independent API endpoint.
 * NOTE: I've added an artificial failure condition here to demonstrate Promise.allSettled.
 */
async function fetchAirlineCodes(): Promise<string[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    // // Example of a simulated failure:
    // // throw new Error("Airline API is down."); 
    return DUMMY_AIRLINE_CODE_OPTIONS;
}

/**
 * Simulates fetching Airport Options from an independent API endpoint.
 */
async function fetchAirportOptions(): Promise<string[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return DUMMY_AIRPORT_OPTIONS;
}

/**
 * Simulates fetching Aircraft Registrations from an independent API endpoint.
 */
async function fetchAircraftRegOptions(): Promise<string[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return DUMMY_AIRCRAFT_REG_OPTIONS;
}

/**
 * Fetches all flight options concurrently using Promise.allSettled().
 * If one API call fails, the others will still return their data.
 */
export async function fetchFlightOptions(): Promise<FlightOptions> {
    const promises = [
        fetchAirlineCodes(),
        fetchAirportOptions(),
        fetchAircraftRegOptions(),
    ];

    const results = await Promise.allSettled(promises);

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