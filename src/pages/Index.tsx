import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRandomRecipe } from "@/lib/api";
import { RecipeCard } from "@/components/RecipeCard";
import { Categories } from "@/components/Categories";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const { data: recipe, refetch, isLoading, error } = useQuery({
    queryKey: ["recipe"],
    queryFn: fetchRandomRecipe,
    enabled: false,
  });

  const handleGetRecipe = async () => {
    if (!navigator.onLine) {
      toast({
        variant: "destructive",
        title: "You're offline",
        description: "Please check your internet connection.",
      });
      return;
    }

    setIsGenerating(true);
    await refetch();
    setIsGenerating(false);
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    // Additional logic for category selection can be added here
  };

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-playfair text-sage mb-4">
            Random Recipe Generator
          </h1>
          <p className="text-gray-600 mb-8">
            Discover new recipes with just one click!
          </p>
          <Button
            size="lg"
            onClick={handleGetRecipe}
            disabled={isLoading || isGenerating}
            className="bg-sage hover:bg-sage/90"
          >
            {isLoading || isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Get Random Recipe"
            )}
          </Button>
        </div>

        {error && (
          <div className="text-center text-red-500 mb-8">
            Failed to fetch recipe. Please try again.
          </div>
        )}

        {recipe && <RecipeCard recipe={recipe} />}

        <div className="mt-12">
          <h2 className="text-2xl font-playfair text-sage mb-6">
            Browse by Category
          </h2>
          <Categories onSelectCategory={handleSelectCategory} />
        </div>
      </div>
    </div>
  );
};

export default Index;