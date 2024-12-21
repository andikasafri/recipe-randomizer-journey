import { RefreshCw } from 'lucide-react';

interface HeroSectionProps {
  onDiscover: () => void;
  loading: boolean;
}

/**
 * HeroSection Component
 * Displays the main discover button with loading state and animations.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  onDiscover,
  loading,
}) => (
  <div className="flex flex-col items-center">
    <button
      onClick={onDiscover}
      disabled={loading}
      className={`group w-48 h-12 bg-[#FF6B35] text-white font-bold uppercase tracking-wide
                  rounded-lg shadow-lg hover:bg-[#E55B2D] hover:scale-105
                  transition-all duration-300 ease-in-out
                  disabled:opacity-50 disabled:cursor-not-allowed
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B35]
                  flex items-center justify-center gap-2`}
      aria-label={loading ? 'Loading recipe' : 'Discover new recipe'}
    >
      <RefreshCw
        className={`w-5 h-5 transition-transform duration-300
                    ${loading ? 'animate-spin' : 'group-hover:rotate-180'}`}
        aria-hidden="true"
      />
      <span>{loading ? 'Loading...' : 'Discover'}</span>
    </button>
  </div>
);
