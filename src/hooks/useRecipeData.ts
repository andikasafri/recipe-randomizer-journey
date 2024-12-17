import { useQuery } from "@tanstack/react-query";
import * as api from "@/lib/api";
import { Recipe, Category } from "@/lib/types";

export const useRandomRecipe = () => {
  return useQuery({
    queryKey: ["randomRecipe"],
    queryFn: api.fetchRandomRecipe,
    staleTime: 0, // Always fetch fresh data for random recipes
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: api.fetchCategories,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });
};

export const useMealsByCategory = (category: string) => {
  return useQuery({
    queryKey: ["mealsByCategory", category],
    queryFn: () => api.fetchMealsByCategory(category),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    enabled: !!category,
  });
};

export const useMealDetails = (id: string) => {
  return useQuery({
    queryKey: ["mealDetails", id],
    queryFn: () => api.fetchMealById(id),
    staleTime: 1000 * 60 * 30, // Cache for 30 minutes
    enabled: !!id,
  });
};

export const useSearchMeals = (query: string) => {
  return useQuery({
    queryKey: ["searchMeals", query],
    queryFn: () => api.searchMeals(query),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    enabled: query.length >= 2,
  });
};