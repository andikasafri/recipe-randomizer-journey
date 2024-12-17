import { Button } from "@/components/ui/button";
import { useRandomRecipe } from "@/hooks/useRecipeData";
import { Loader2, DicesIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface RefreshRecipeButtonProps {
  className?: string;
}

export const RefreshRecipeButton = ({ className }: RefreshRecipeButtonProps) => {
  const { refetch, isLoading } = useRandomRecipe();

  return (
    <Button
      onClick={() => refetch()}
      disabled={isLoading}
      aria-label="Get a new random recipe"
      className={cn(
        "bg-sage hover:bg-sage/90 text-white transition-all",
        className
      )}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <DicesIcon className="h-4 w-4" />
      )}
      {isLoading ? "Loading..." : "Get Random Recipe"}
    </Button>
  );
};