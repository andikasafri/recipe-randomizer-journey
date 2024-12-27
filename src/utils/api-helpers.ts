import { ApiError } from '../types/errors';

// Define retry configuration
const RETRY_CONFIG = {
  delays: [1000, 2000, 4000] as const,
  maxAttempts: 3,
} as const;

/**
 * Type guard to check if an error is an instance of Error
 */
function isError(error: unknown): error is Error {
  return error instanceof Error;
}

/**
 * Enhanced fetch with retry capability and proper error handling
 */
export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retryCount = 0
): Promise<Response> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new ApiError(
        `HTTP error! status: ${response.status}`,
        'HTTP_ERROR',
        retryCount
      );
    }

    return response;
  } catch (error) {
    if (retryCount >= RETRY_CONFIG.maxAttempts) {
      throw new ApiError(
        'Maximum retry attempts reached',
        'MAX_RETRY_EXCEEDED',
        retryCount
      );
    }

    // Log the error with proper type checking
    if (isError(error)) {
      console.error(`Fetch attempt ${retryCount + 1} failed:`, error.message);
    } else {
      console.error(`Fetch attempt ${retryCount + 1} failed with unknown error`);
    }

    // Wait before retrying
    await delay(RETRY_CONFIG.delays[retryCount]);
    return fetchWithRetry(url, options, retryCount + 1);
  }
}

/**
 * Creates a promise that resolves after a specified delay
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Formats any error into a user-friendly message
 */
export function formatApiError(error: unknown): string {
  if (error instanceof ApiError) {
    return `${error.message} (Error Code: ${error.code})`;
  }
  
  if (isError(error)) {
    return `An error occurred: ${error.message}`;
  }
  
  return 'An unexpected error occurred';
}