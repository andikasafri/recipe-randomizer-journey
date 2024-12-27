import { ApiError } from '../types/errors';
import { Recipe, ApiResponse } from '../types/interfaces';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

/**
 * Generic function to fetch data from the API
 */
export const fetchFromApi = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    
    if (!response.ok) {
      throw new ApiError(
        `Failed to fetch (${response.status}): ${response.statusText}`,
        'FETCH_ERROR',
        response.status
      );
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Handle network errors or other fetch failures
    throw new ApiError(
      'Network error occurred while fetching data',
      'NETWORK_ERROR',
      0
    );
  }
};

/**
 * Fetch a random recipe from the API
 */
export const fetchRandomRecipe = async (): Promise<Recipe> => {
  const data = await fetchFromApi<ApiResponse<Recipe>>('random.php');
  
  if (!data.meals || data.meals.length === 0) {
    throw new ApiError('No recipe data available.', 'NO_DATA', 0);
  }
  
  return data.meals[0];
};