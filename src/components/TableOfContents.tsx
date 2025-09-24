'use client';

import React from 'react';
import { Network, Trophy } from 'lucide-react';

export const TableOfContents: React.FC = () => {
  const scrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="flex justify-center gap-4 py-6">
      <button
        onClick={() => scrollToSection('knowledge-graph')}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-blue-400 rounded-lg font-mono text-sm transition-all duration-300"
        aria-label="Navigate to knowledge graph section"
      >
        <Network className="w-4 h-4" />
        Project Graph
      </button>

      <button
        onClick={() => scrollToSection('projects-awards')}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-blue-400 rounded-lg font-mono text-sm transition-all duration-300"
        aria-label="Navigate to projects and awards section"
      >
        <Trophy className="w-4 h-4" />
        Projects & Awards
      </button>
    </div>
  );
};