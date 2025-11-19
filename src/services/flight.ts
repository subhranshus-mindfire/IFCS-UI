import axiosInstance from "../config/axiosInstance";
import { FLIGHTS_ENDPOINT } from "../const/apiEndPoints";
import type { Flight, FlightFilters } from "../types/Flight";

/**
 * Fetches flight data from the API based on provided filters.
 * @param filters The filtering and pagination parameters.
 * @returns A promise that resolves to an array of flight pairs.
 */
export async function fetchFlights(
    filters: FlightFilters = {
        page: 1,
        limit: 50,
        sortBy: 'scheduledDeparture',
        order: 'desc'
    }
): Promise<Flight[][]> {
    // 1. Construct Query Parameters
    console.log(filters, "filter")
    const params: Record<string, number | string | Date> = {
        page: filters.page || 1,
        limit: filters.limit || 50,
        sortBy: filters.sortBy || "scheduledDeparture",
        order: filters.order || "desc",
    };

    // Map local filters to API parameters
    if (filters.search) params.search = filters.search;
    if (filters.station) params.station = filters.station;
    // if (filters.date) params.date = filters.date;
    if (filters.flight) params.flightNumber = filters.flight;
    if (filters.route) params.route = filters.route;
    if (filters.status) params.status = filters.status;
    if (filters.isCancelled !== undefined)
        params.isCancelled = filters.isCancelled;

    console.log(params, "param")
    // 2. Make the API Call
    const response = await axiosInstance.get(FLIGHTS_ENDPOINT.flightList, {
        params: params,
    });
    console.log(response, "res")

    // 3. Return the data (assuming the API returns an object with a 'data' array)
    return response.data.data || [];
}