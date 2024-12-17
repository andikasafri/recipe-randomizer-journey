import { Recipe, Category, ApiResponse } from "./types";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

const handleApiResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  const data = await response.json();
  if (!data || (!data.meals && !data.categories)) {
    throw new Error("No data found");
  }
  return data;
};

export const fetchRandomRecipe = async (): Promise<Recipe> => {
  try {
    console.log("Fetching recipe from API...");
    const data = await handleApiResponse<ApiResponse<Recipe>>(
      await fetch(`${BASE_URL}/random.php`)
    );
    return data.meals?.[0] || null;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw new Error("Failed to fetch recipe. Please try again.");
  }
};

export const fetchCategories = async (): Promise<Category[]> => {
  const data = await handleApiResponse<ApiResponse<Category>>(
    await fetch(`${BASE_URL}/categories.php`)
  );
  return data.categories || [];
};

export const fetchMealsByCategory = async (category: string): Promise<Recipe[]> => {
  const data = await handleApiResponse<ApiResponse<Recipe>>(
    await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`)
  );
  return data.meals || [];
};

export const fetchMealById = async (id: string): Promise<Recipe> => {
  const data = await handleApiResponse<ApiResponse<Recipe>>(
    await fetch(`${BASE_URL}/lookup.php?i=${id}`)
  );
  return data.meals?.[0] || null;
};

export const searchMeals = async (query: string): Promise<Recipe[]> => {
  const data = await handleApiResponse<ApiResponse<Recipe>>(
    await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`)
  );
  return data.meals || [];
};

export const getIngredientImageUrl = (ingredient: string): string => {
  return `https://www.themealdb.com/images/ingredients/${encodeURIComponent(ingredient)}.png`;
};