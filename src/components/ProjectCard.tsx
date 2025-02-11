import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  icon: string;
  description: string;
  tags: string[];
  longDescription?: string;
}

interface ProjectCardProps {
  project: Project;
  isActive: boolean;
  onClick: () => void;
}

export const ProjectCard = ({ project, isActive, onClick }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    onClick();
  };

  return (
    <div className="transition-all duration-300 ease-in-out">
      <div 
        onClick={handleClick}
        className={`cursor-pointer p-4 rounded-lg backdrop-blur-sm transition-all
          ${isActive 
            ? 'bg-blue-600/80 text-white border-2 border-blue-400 shadow-lg shadow-blue-500/50' 
            : 'bg-gray-800/80 text-gray-300 border border-gray-700 hover:border-blue-400 hover:bg-gray-700/80'}`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <span className="text-2xl">{project.icon}</span>
            <h3 className="font-mono font-bold text-blue-400">{project.name}</h3>
          </div>
          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
        <p className="text-sm text-gray-300">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {project.tags.map((tag: string) => (
            <span 
              key={tag} 
              className="text-xs bg-black/30 px-2 py-1 rounded-full text-blue-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        <div className={`p-4 rounded-lg bg-gray-800/60 backdrop-blur-sm border border-gray-700`}>
          <p className="text-sm text-gray-300 leading-relaxed">
            {project.longDescription || "More details coming soon..."}
          </p>
        </div>
      </div>
    </div>
  );
}; 