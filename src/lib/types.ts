export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube?: string;
  [key: string]: string | null | undefined; // For dynamic ingredient/measure properties
}

export interface ApiResponse<T> {
  meals: T[] | null;
  categories?: Category[] | null;
}