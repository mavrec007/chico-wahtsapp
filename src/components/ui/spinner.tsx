import React from 'react';

interface SpinnerProps {
  size?: string;
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'h-3 w-3', className = '' }) => (
  <div className={`flex items-center justify-center space-x-1 ${className}`} role="status" aria-label="Loading">
    <div className={`bg-blue-600 rounded-full ${size} animate-bounce`}></div>
    <div className={`bg-blue-600 rounded-full ${size} animate-bounce [animation-delay:-.2s]`}></div>
    <div className={`bg-blue-600 rounded-full ${size} animate-bounce [animation-delay:-.4s]`}></div>
  </div>
);

export default Spinner;
