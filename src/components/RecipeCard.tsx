import { Recipe } from '../types/interfaces';
import { RecipeIngredients } from './RecipeIngredients';
import { RecipeInstructions } from './RecipeInstructions';
import { VideoButton } from './VideoButton';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => (
  <article className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-400 ease-in animate-fadeIn">
    {/* Image Section */}
    <div className="relative h-[400px]">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <p className="text-sm uppercase tracking-wide mb-2 opacity-90">
          {recipe.strCategory}
        </p>
        <h2 className="text-2xl font-bold mb-2">
          {recipe.strMeal}
        </h2>
        <div className="flex items-center justify-between">
          <p className="text-sm opacity-90">
            {recipe.strArea} Cuisine
          </p>
          {recipe.strYoutube && <VideoButton videoUrl={recipe.strYoutube} />}
        </div>
      </div>
    </div>

    {/* Details Section */}
    <div className="p-6 space-y-8">
      <RecipeIngredients recipe={recipe} />
      <RecipeInstructions recipe={recipe} />
    </div>
  </article>
);

export default RecipeCard;