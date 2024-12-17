export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  [key: string]: string | null; // For dynamic ingredient/measure properties
}

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const fetchRandomRecipe = async (): Promise<Recipe> => {
  try {
    console.log("Fetching recipe from API...");
    const response = await fetch(`${BASE_URL}/random.php`);
    if (!response.ok) {
      throw new Error(`Failed to fetch recipe: ${response.statusText}`);
    }
    const data = await response.json();
    return data.meals?.[0] || null;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw new Error("Failed to fetch recipe. Please try again.");
  }
};