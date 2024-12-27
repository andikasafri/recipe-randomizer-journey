import { fetchRandomRecipe } from '../../src/services/api';
import { ApiError } from '../../src/types/errors';
import { Recipe } from '../../src/types/interfaces';

// Mock the global fetch function
global.fetch = jest.fn();

describe('API Service', () => {
  // Clear all mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and return a random recipe successfully', async () => {
    // Mock recipe data
    const mockRecipe: Recipe = {
      idMeal: '52772',
      strMeal: 'Test Recipe',
      strCategory: 'Test Category',
      strArea: 'Test Area',
      strInstructions: 'Test Instructions',
      strMealThumb: 'https://test-image.jpg',
      strYoutube: 'https://youtube.com/watch?v=test'
    };

    // Mock successful API response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ meals: [mockRecipe] })
    });

    const result = await fetchRandomRecipe();
    expect(result).toEqual(mockRecipe);
    expect(fetch).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/random.php'
    );
  });

  it('should throw ApiError when API returns no meals', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ meals: null })
    });

    await expect(fetchRandomRecipe()).rejects.toThrow(
      new ApiError('No recipe data available.', 'NO_DATA', 0)
    );
  });

  it('should throw ApiError on network failure', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error'
    });

    await expect(fetchRandomRecipe()).rejects.toThrow(
      new ApiError(
        'Failed to fetch (500): Internal Server Error',
        'FETCH_ERROR',
        500
      )
    );
  });

  it('should throw ApiError when fetch rejects', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    await expect(fetchRandomRecipe()).rejects.toThrow(
      new ApiError(
        'Network error occurred while fetching data',
        'NETWORK_ERROR',
        0
      )
    );
  });
});