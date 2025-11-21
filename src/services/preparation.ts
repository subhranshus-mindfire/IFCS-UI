// import axiosInstance from "../config/axiosInstance";
// import { FLIGHTS_ENDPOINT } from "../const/apiEndPoints";
import { samplePreparations } from "../const/samplePreparations";
import type { PreparationItem } from "../types/Flight";

/**
 * Simulates fetching flight preparation data from an API endpoint.
 * In a real application, this would use Axios to hit a backend endpoint.
 * @returns A promise that resolves to an array of PreparationItem.
 */
export async function fetchPreparations(flightId: string): Promise<PreparationItem[]> {
    console.log("Fetching preparations for flight ID:", flightId);
    await new Promise(resolve => setTimeout(resolve, 500));
    return samplePreparations;
    // const response = await axiosInstance.get(`${FLIGHTS_ENDPOINT.flightList}/${flightId}/preparations`);
    // return response.data

}