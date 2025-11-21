import { samplePreparations } from "../const/samplePreparations";
import type { PreparationItem } from "../types/Flight";

/**
 * Simulates fetching flight preparation data from an API endpoint.
 * In a real application, this would use Axios to hit a backend endpoint.
 * @returns A promise that resolves to an array of PreparationItem.
 */
export async function fetchPreparations(): Promise<PreparationItem[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simulate successful API response
    return samplePreparations;
}