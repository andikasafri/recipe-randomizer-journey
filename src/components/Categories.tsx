import { useCategories } from "@/hooks/useRecipeData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface CategoriesProps {
  onSelectCategory: (category: string) => void;
}

export const Categories = ({ onSelectCategory }: CategoriesProps) => {
  const { data: categories, isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-48" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load categories</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories?.map((category) => (
        <Card
          key={category.idCategory}
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onSelectCategory(category.strCategory)}
        >
          <CardHeader>
            <CardTitle className="text-xl font-playfair text-sage">
              {category.strCategory}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <img
              src={category.strCategoryThumb}
              alt={category.strCategory}
              className="w-full h-32 object-cover rounded-md mb-4"
              loading="lazy"
            />
            <p className="text-sm text-gray-600 line-clamp-2">
              {category.strCategoryDescription}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};