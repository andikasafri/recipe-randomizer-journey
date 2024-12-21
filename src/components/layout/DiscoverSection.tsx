import React from 'react';
import { RefreshCw } from 'lucide-react';

interface DiscoverSectionProps {
  onDiscover: () => void;
  loading: boolean;
  error: string | null;
}

/**
 * DiscoverSection Component
 * Renders a button for discovering recipes and displays loading or error messages.
 */
export const DiscoverSection: React.FC<DiscoverSectionProps> = ({
  onDiscover,
  loading,
  error,
}) => (
  <div className="flex flex-col items-center justify-center h-full">
    {/* Discover Button */}
    <button
      onClick={onDiscover}
      disabled={loading}
      className={`group inline-flex items-center gap-2 bg-accent-600 text-white px-8 py-4 rounded-lg
                  font-semibold text-lg shadow-lg hover:bg-accent-700 hover:shadow-xl
                  transform hover:-translate-y-0.5 transition-all duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed`}
      aria-label={loading ? 'Loading recipe' : 'Discover new recipe'}
    >
      <RefreshCw
        className={`w-5 h-5 transition-transform ${
          loading ? 'animate-spin' : 'group-hover:rotate-180'
        }`}
      />
      <span>{loading ? 'Finding Recipe...' : 'Discover New Recipe'}</span>
    </button>

    {/* Error Message */}
    {error && (
      <div className="mt-4 p-4 bg-accent-50 border border-accent-200 text-accent-700 rounded-lg">
        {error}
      </div>
    )}
  </div>
);
