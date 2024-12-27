import { render, screen } from '@testing-library/react';
import RecipeCard from '../../src/components/RecipeCard';

describe('RecipeCard', () => {
  const mockRecipe = {
    idMeal: '1',
    strMeal: 'Test Recipe',
    strCategory: 'Test Category',
    strArea: 'Test Area',
    strInstructions: 'Test Instructions',
    strMealThumb: 'test.jpg',
    strYoutube: 'https://youtube.com/watch?v=test',
  };

  it('renders recipe details correctly', () => {
    render(<RecipeCard recipe={mockRecipe} />);

    expect(screen.getByText(mockRecipe.strMeal)).toBeInTheDocument();
    expect(screen.getByText(mockRecipe.strCategory)).toBeInTheDocument();
    expect(screen.getByText(`${mockRecipe.strArea} Cuisine`)).toBeInTheDocument();
  });

  it('renders image with correct attributes', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    const image = screen.getByAltText(mockRecipe.strMeal);
    expect(image).toHaveAttribute('src', mockRecipe.strMealThumb);
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('renders video button when YouTube URL is provided', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    expect(screen.getByText('Watch Video')).toBeInTheDocument();
  });

  it('does not render video button when YouTube URL is not provided', () => {
    const recipeWithoutVideo = { ...mockRecipe, strYoutube: undefined };
    render(<RecipeCard recipe={recipeWithoutVideo} />);
    expect(screen.queryByText('Watch Video')).not.toBeInTheDocument();
  });
});