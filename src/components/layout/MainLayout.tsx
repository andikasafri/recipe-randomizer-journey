import { Recipe } from '../../types/interfaces';
import { HeroSection } from '../HeroSection';
import { RecipeContent } from './RecipeContent';
import { FloatingDiscoverButton } from '../FloatingDiscoverButton';

interface MainLayoutProps {
  recipe: Recipe | null;
  loading: boolean;
  error: string | null;
  onDiscover: () => void;
}

/**
 * MainLayout Component
 * Provides the main layout structure with a sticky header, hero section,
 * floating discover button, and recipe content.
 */
export const MainLayout: React.FC<MainLayoutProps> = ({
  recipe,
  loading,
  error,
  onDiscover,
}) => (
  <div className="min-h-screen bg-gradient-to-b from-[#FFF3E0] to-[#FFE0B2] relative">
    {/* Sticky Header */}
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <h1 className="font-display text-2xl md:text-2.5xl font-bold text-secondary-800 text-center drop-shadow-md">
          Discover Your Next Meal
        </h1>
      </div>
    </header>

    {/* Main Content */}
    <div className="max-w-7xl mx-auto px-4 py-8 pb-24 md:pb-32"> {/* Added bottom padding */}
      <div className="md:grid md:grid-cols-[300px_1fr] md:gap-8">
        {/* Left Column */}
        <aside className="mb-8 md:mb-0 md:sticky md:top-24">
          <HeroSection onDiscover={onDiscover} loading={loading} />
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}
        </aside>

        {/* Right Column */}
        <section className="min-h-[calc(100vh-20rem)]">
          <RecipeContent recipe={recipe} loading={loading} />
        </section>
      </div>
    </div>

    {/* Floating Discover Button */}
    <FloatingDiscoverButton onDiscover={onDiscover} loading={loading} />
  </div>
);