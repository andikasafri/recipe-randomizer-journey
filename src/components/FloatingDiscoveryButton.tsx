import { RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FloatingDiscoverButtonProps {
  onDiscover: () => void;
  loading: boolean;
}

/**
 * FloatingDiscoverButton Component
 * A floating button that follows the user while scrolling and triggers recipe discovery.
 * Appears only when user has scrolled past the main discover button.
 */
export const FloatingDiscoverButton: React.FC<FloatingDiscoverButtonProps> = ({
  onDiscover,
  loading,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating button when user scrolls past 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={onDiscover}
      disabled={loading}
      className={`fixed bottom-6 right-6 z-50
                 group flex items-center gap-2 
                 bg-[#FF6B35] text-white px-6 py-3 rounded-full
                 shadow-lg hover:shadow-xl
                 transform hover:scale-105 hover:bg-[#E55B2D]
                 transition-all duration-300 ease-in-out
                 disabled:opacity-50 disabled:cursor-not-allowed
                 md:bottom-8 md:right-8`}
      aria-label={loading ? 'Loading recipe' : 'Discover new recipe'}
    >
      <RefreshCw
        className={`w-5 h-5 ${loading ? 'animate-spin' : 'group-hover:rotate-180'} 
                   transition-transform duration-300`}
        aria-hidden="true"
      />
      <span className="font-semibold">
        {loading ? 'Loading...' : 'Discover'}
      </span>
    </button>
  );
};
