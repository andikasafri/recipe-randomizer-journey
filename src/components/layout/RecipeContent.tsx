import { Recipe } from '../../types/interfaces';
import { LoadingState } from '../LoadingState';
import RecipeCard from '../RecipeCard';

interface RecipeContentProps {
  recipe: Recipe | null;
  loading: boolean;
}

/**
 * RecipeContent Component
 * Displays a loading state or a recipe card depending on the loading status and recipe availability.
 */
export const RecipeContent: React.FC<RecipeContentProps> = ({
  recipe,
  loading,
}) => (
  <div className="transition-opacity duration-300 ease-in-out">
    {loading ? <LoadingState /> : recipe && <RecipeCard recipe={recipe} />}
  </div>
);
