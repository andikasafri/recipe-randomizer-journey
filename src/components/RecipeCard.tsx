import { useRef, useEffect } from "react";
import { Recipe } from "@/lib/types";
import { animateRecipeCard } from "@/lib/animations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Youtube } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
  };

  const formatInstructions = (instructions: string) => {
    return instructions.split('\n').filter(step => step.trim());
  };

  return (
    <Card ref={cardRef} className="w-full max-w-4xl mx-auto bg-cream">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl md:text-4xl font-playfair text-sage mb-2">
          {recipe.strMeal}
        </CardTitle>
        <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-600">
          <span>{recipe.strCategory}</span>
          <span>•</span>
          <span>{recipe.strArea}</span>
          {recipe.strTags && (
            <>
              <span>•</span>
              <span>{recipe.strTags.split(',').join(', ')}</span>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full rounded-lg shadow-md"
              loading="lazy"
            />
            {recipe.strYoutube && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open(recipe.strYoutube, '_blank')}
              >
                <Youtube className="mr-2 h-4 w-4" />
                Watch Tutorial
              </Button>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-sage">Ingredients</h3>
            <ul className="space-y-2">
              {getIngredients().map(({ ingredient, measure }, index) => (
                <li key={index} className="flex items-center gap-4">
                  <img
                    src={`https://www.themealdb.com/images/ingredients/${ingredient}.png`}
                    alt={ingredient}
                    className="w-12 h-12 object-cover rounded"
                    loading="lazy"
                  />
                  <span>
                    <strong>{measure}</strong> {ingredient}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-sage/20" />

        <div>
          <h3 className="text-xl font-semibold mb-4 text-sage">Instructions</h3>
          <ol className="space-y-4">
            {formatInstructions(recipe.strInstructions).map((step, index) => (
              <li key={index} className="flex gap-4">
                <span className="font-bold text-sage">{index + 1}.</span>
                <p className="flex-1">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};