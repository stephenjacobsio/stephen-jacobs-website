/** Base URL for API requests */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

/**
 * Generic function to fetch data from the API with error handling.
 * 
 * @template T - The expected response type.
 * @param endpoint - The API endpoint to fetch data from.
 * @returns A promise resolving to the data of type `T`.
 * @throws Will throw an error if the API response is not ok.
 */
export async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response.json();
}