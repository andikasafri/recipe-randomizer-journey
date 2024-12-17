import { RandomRecipe } from "@/components/RandomRecipe";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { toast } = useToast();

  const handleGetRecipe = async () => {
    if (!navigator.onLine) {
      toast({
        variant: "destructive",
        title: "You're offline",
        description: "Please check your internet connection.",
      });
      return;
    }
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
        </div>

        <RandomRecipe />
      </div>
    </div>
  );
};

export default Index;