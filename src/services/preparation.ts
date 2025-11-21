// import axiosInstance from "../config/axiosInstance";
import { samplePreparations } from "../const/samplePreparations";
import type { PreparationItem } from "../types/Flight";

/**
 * Simulates fetching flight preparation data from an API endpoint.
 * In a real application, this would use Axios to hit a backend endpoint.
 * @returns A promise that resolves to an array of PreparationItem.
 */
export async function fetchPreparations(flightId: string): Promise<PreparationItem[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return samplePreparations;
    // const response = await axiosInstance.get(`${FLIGHTS_ENDPOINT.flightList}/${flightId}/preparations`)
}