import { render, screen } from '@testing-library/react';
import { LoadingState } from '../../src/components/LoadingState';

describe('LoadingState', () => {
  it('renders loading skeleton', () => {
    render(<LoadingState />);
    
    // Check for main container with animation
    const container = screen.getByTestId('loading-skeleton');
    expect(container).toHaveClass('animate-pulse');
    
    // Check for image placeholder
    expect(screen.getByTestId('image-placeholder')).toBeInTheDocument();
    
    // Check for text placeholders
    const textPlaceholders = screen.getAllByTestId('text-placeholder');
    expect(textPlaceholders).toHaveLength(6);
  });
});