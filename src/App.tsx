import { useState, useEffect, useCallback } from 'react'; // Importing React hooks
import { Recipe } from './types/interfaces'; // Importing the Recipe type for type safety
import { fetchRandomRecipe } from './services/api'; // Importing the function to fetch a random recipe
import { formatApiError } from './utils/api-helpers'; // Importing the function to format API errors
import { ErrorBoundary } from './components/ErrorBoundary'; // Importing the ErrorBoundary component for error handling
import { MainLayout } from './components/layout/MainLayout'; // Importing the MainLayout component for layout

/**
 * App component serves as the main entry point for the application.
 * It manages the state for the recipe, loading status, and error messages.
 *
 * @returns {JSX.Element} The rendered component.
 */
function App() {
  // State variables
  const [recipe, setRecipe] = useState<Recipe | null>(null); // State for the recipe object
  const [loading, setLoading] = useState<boolean>(false); // State for loading status
  const [error, setError] = useState<string | null>(null); // State for error messages

  /**
   * Fetches a random recipe and updates the state.
   * It handles loading state and error management.
   */
  const getRandomRecipe = useCallback(async () => {
    setLoading(true); // Set loading to true when fetching starts
    setError(null); // Reset error state
    try {
      const newRecipe = await fetchRandomRecipe(); // Fetch a new recipe
      setRecipe(newRecipe); // Update the recipe state
    } catch (err) {
      setError(formatApiError(err)); // Format and set the error message
    } finally {
      setLoading(false); // Set loading to false when fetching is done
    }
  }, []); // Empty dependency array ensures this function is stable

  // Effect to fetch a random recipe on component mount
  useEffect(() => {
    getRandomRecipe(); // Call the function to fetch a random recipe
  }, [getRandomRecipe]); // Dependency on getRandomRecipe

  return (
    <ErrorBoundary>
      <MainLayout
        recipe={recipe} // Pass the recipe to the layout
        loading={loading} // Pass the loading state to the layout
        error={error} // Pass the error message to the layout
        onDiscover={getRandomRecipe} // Pass the function to fetch a new recipe
      />
    </ErrorBoundary>
  );
}

export default App; // Exporting the App component
