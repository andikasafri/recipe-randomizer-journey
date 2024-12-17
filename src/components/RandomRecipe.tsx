import { useEffect } from "react";
import { useRandomRecipe } from "@/hooks/useRecipeData";
import { RecipeCard } from "@/components/RecipeCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";

export const RandomRecipe = () => {
  const { data: recipe, isLoading, error, refetch } = useRandomRecipe();

  useEffect(() => {
    if (!navigator.onLine) {
      console.log("User is offline");
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-8">
        <Loader2 className="h-8 w-8 animate-spin text-sage" />
        <p className="text-sage font-medium">Discovering a delicious recipe for you...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-lg mx-auto">
        <AlertDescription className="flex flex-col items-center gap-4">
          <p>
            {!navigator.onLine
              ? "You're offline. Please check your internet connection."
              : "Failed to fetch recipe. Please try again."}
          </p>
          <Button
            onClick={() => refetch()}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!recipe) {
    return (
      <Alert className="max-w-lg mx-auto">
        <AlertDescription>
          No recipe found. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  return <RecipeCard recipe={recipe} />;
};