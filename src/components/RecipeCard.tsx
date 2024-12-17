import { useRef, useEffect } from "react";
import { Recipe } from "@/lib/types";
import { animateRecipeCard } from "@/lib/animations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      animateRecipeCard(cardRef.current);
    }
  }, [recipe]);

  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
    return ingredients;
  };

  return (
    <Card ref={cardRef} className="w-full max-w-3xl mx-auto bg-cream">
      <CardHeader>
        <CardTitle className="text-2xl font-playfair text-sage">
          {recipe.strMeal}
        </CardTitle>
        <div className="flex gap-2 text-sm text-gray-600">
          <span>{recipe.strCategory}</span>
          <span>•</span>
          <span>{recipe.strArea}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full rounded-lg shadow-md"
          />
          <div>
            <h3 className="font-semibold mb-2">Ingredients</h3>
            <ul className="space-y-1 text-sm">
              {getIngredients().map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Instructions</h3>
          <p className="text-sm whitespace-pre-line">{recipe.strInstructions}</p>
        </div>
      </CardContent>
    </Card>
  );
};