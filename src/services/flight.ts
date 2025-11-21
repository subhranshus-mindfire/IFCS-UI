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
    if (filters.client) params.client = filters.client;
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
 * Fetches flight options (Airline Codes, Airports, Aircraft Registrations).
 * Uses dummy data for now, simulating an API call.
 */
export async function fetchFlightOptions(): Promise<FlightOptions> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const dummyResponse: FlightOptions = {
        airlineCodes: DUMMY_AIRLINE_CODE_OPTIONS,
        airports: DUMMY_AIRPORT_OPTIONS,
        aircraftRegs: DUMMY_AIRCRAFT_REG_OPTIONS,
    };

    return dummyResponse;

}