// src/components/ErrorBoundary.js

import { useState, useEffect } from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error, errorInfo) => {
      console.error('Error caught by ErrorBoundary:', error, errorInfo);
      setHasError(true);
    };
    window.addEventListener('error', errorHandler);

    // Clean up the event listener
    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  if (hasError) {
    return (
      <div className="text-red-500 text-center flex items-center justify-center h-screen text-lg">
        <div>
            <h2>Something went wrong.</h2>
            <p>Please refresh and if error persist, come back later.</p>
        </div>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;
