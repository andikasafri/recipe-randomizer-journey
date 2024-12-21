import { ApiError } from '../types/errors';
import { Recipe } from '../types/interfaces';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

/**
 * Fetch data from TheMealDB API with error handling.
 *
 * @param endpoint - API endpoint to fetch data from.
 * @returns Parsed response data.
 * @throws ApiError on fetch failure.
 */
const fetchFromApi = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${BASE_URL}/${endpoint}`);
  if (!response.ok) {
    throw new ApiError(
      `Failed to fetch (${response.status}): ${response.statusText}`,
      'FETCH_ERROR',
      response.status
    );
  }
  return response.json();
};

/**
 * Fetch a random recipe.
 *
 * @returns A single recipe.
 * @throws ApiError if no recipe is found or the fetch fails.
 */
export const fetchRandomRecipe = async (): Promise<Recipe> => {
  const { meals } = await fetchFromApi<{ meals: Recipe[] }>('random.php');
  if (!meals?.length) {
    throw new ApiError('No recipe data available.', 'NO_DATA', 0);
  }
  return meals[0];
};
