'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  targetId: string;
  className?: string;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  targetId,
  className = ""
}) => {
  const scrollToSection = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className={`flex justify-center py-4 ${className}`}>
      <button
        onClick={scrollToSection}
        className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
        aria-label={`Scroll to ${targetId} section`}
      >
        <ChevronDown
          className="w-8 h-8 md:w-10 md:h-10 animate-bounce"
          strokeWidth={2}
        />
      </button>
    </div>
  );
};