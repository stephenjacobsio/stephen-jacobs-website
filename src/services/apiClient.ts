/** Base URL for API requests */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';

// Cache for API responses
const apiCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Generic function to fetch data from the API with error handling and caching.
 * 
 * @template T - The expected response type.
 * @param endpoint - The API endpoint to fetch data from.
 * @param options - Optional fetch options.
 * @returns A promise resolving to the data of type `T`.
 * @throws Will throw an error if the API response is not ok.
 */
export async function fetchApi<T>(
  endpoint: string, 
  options: { 
    cache?: boolean; 
    revalidate?: number;
  } = { cache: true, revalidate: CACHE_DURATION }
): Promise<T> {
  const cacheKey = endpoint;
  const now = Date.now();
  
  // Check if we have a valid cached response
  if (options.cache !== false && apiCache.has(cacheKey)) {
    const cachedData = apiCache.get(cacheKey)!;
    if (now - cachedData.timestamp < (options.revalidate || CACHE_DURATION)) {
      console.log(`Using cached data for: ${endpoint}`);
      return cachedData.data as T;
    }
  }
  
  console.log(`Fetching from: ${API_BASE_URL}${endpoint}`);
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors'
    });
    
    if (!response.ok) {
      console.error(`API Error: ${response.status} - ${response.statusText}`);
      console.error(`Full URL: ${API_BASE_URL}${endpoint}`);
      
      // Try to get more error details if available
      try {
        const errorData = await response.json();
        console.error('Error details:', errorData);
      } catch (e) {
        console.error('No additional error details available');
      }
      
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Cache the response if caching is enabled
    if (options.cache !== false) {
      apiCache.set(cacheKey, { data, timestamp: now });
    }
    
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}