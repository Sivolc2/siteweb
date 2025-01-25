'use client';

import React, { useState } from 'react';
import { Menu, MessageCircle, Github, Linkedin, Twitter, Trophy, ExternalLink, Video, FileText } from 'lucide-react';
import Image from 'next/image';
import { projectData } from '@/data/projects';
import type { HackathonProject, PersonalProject, Presentation, ProjectLink, SubPresentation } from '@/types/projects';
import InteractiveKnowledgeGraph from './InteractiveKnowledgeGraph';
import { ChatProvider } from './chat/ChatContext';
import { ChatInterface } from './chat/ChatInterface';
import { TopNav } from './TopNav';
import { ProfileSection } from './ProfileSection';
import { ProjectCard } from './ProjectCard';
import { ProjectsAndAwards } from './projects/ProjectsAndAwards';
import { StarfallBackground } from './StarfallBackground';

interface Project {
  id: number;
  name: string;
  icon: string;
  description: string;
  tags: string[];
}

type ProjectTab = 'hackathon' | 'personal' | 'presentations';

const TabButton = ({ 
  label, 
  isActive, 
  onClick 
}: { 
  label: string; 
  isActive: boolean; 
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
      isActive
        ? 'bg-blue-500 text-white'
        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
    }`}
  >
    {label}
  </button>
);

const ProjectTabs = ({ 
  activeTab, 
  onTabChange 
}: { 
  activeTab: ProjectTab; 
  onTabChange: (tab: ProjectTab) => void;
}) => (
  <div className="flex flex-col sm:flex-row gap-2">
    <TabButton
      label="Hackathons"
      isActive={activeTab === 'hackathon'}
      onClick={() => onTabChange('hackathon')}
    />
    <TabButton
      label="Projects"
      isActive={activeTab === 'personal'}
      onClick={() => onTabChange('personal')}
    />
    <TabButton
      label="Presentations"
      isActive={activeTab === 'presentations'}
      onClick={() => onTabChange('presentations')}
    />
  </div>
);

const HackathonProjectCard = ({ project }: { project: HackathonProject }) => (
  <div
    key={project.title}
    className="p-4 bg-gray-800/80 rounded-lg border border-gray-700 hover:border-blue-400 transition-all"
  >
    <div className="flex items-start justify-between mb-2">
      <div>
        <h3 className="font-mono font-bold text-blue-400">{project.title}</h3>
        {project.award && (
          <div className="flex items-center gap-2 text-yellow-400 text-sm mb-2">
            <Trophy className="w-4 h-4" />
            <span>{project.award}</span>
          </div>
        )}
        {project.event && (
          <div className="text-gray-400 text-sm mb-2">
            {project.event}
          </div>
        )}
      </div>
      {project.links && (
        <div className="flex gap-2">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {project.links.event && (
            <a
              href={project.links.event}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      )}
    </div>
    <p className="text-sm text-gray-300 mb-3">{project.description}</p>
    <div className="flex flex-wrap gap-2">
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
);

const PersonalProjectCard = ({ project }: { project: PersonalProject }) => (
  <div
    key={project.title}
    className="p-4 bg-gray-800/80 rounded-lg border border-gray-700 hover:border-blue-400 transition-all"
  >
    <div className="flex items-start justify-between mb-2">
      <div>
        <h3 className="font-mono font-bold text-blue-400">{project.title}</h3>
        {project.featured && (
          <div className="text-yellow-400 text-sm mb-2">Featured Project</div>
        )}
      </div>
      {project.links && (
        <div className="flex gap-2">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.links.website && (
            <a
              href={project.links.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      )}
    </div>
    <p className="text-sm text-gray-300 mb-3">{project.description}</p>
    <div className="flex flex-wrap gap-2">
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
);

const PresentationCard = ({ presentation }: { presentation: Presentation }) => (
  <div
    key={presentation.title}
    className="p-4 bg-gray-800/80 rounded-lg border border-gray-700 hover:border-blue-400 transition-all"
  >
    <div className="flex items-start justify-between mb-2">
      <h3 className="font-mono font-bold text-blue-400">{presentation.title}</h3>
      <div className="flex gap-2">
        {presentation.links?.video && (
          <a
            href={presentation.links.video}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300"
          >
            <Video className="w-4 h-4" />
          </a>
        )}
        {presentation.links?.slides && (
          <a
            href={presentation.links.slides}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300"
          >
            <FileText className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
    {presentation.description && (
      <p className="text-sm text-gray-300 mb-3">{presentation.description}</p>
    )}
    {presentation.presentations && (
      <div className="mt-2 space-y-2">
        {presentation.presentations.map((subPresentation: SubPresentation) => (
          <div
            key={subPresentation.title}
            className="pl-4 border-l-2 border-blue-500"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-mono text-blue-300">{subPresentation.title}</h4>
              {subPresentation.links?.slides && (
                <a
                  href={subPresentation.links.slides}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  <FileText className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    )}
    {presentation.tags && (
      <div className="flex flex-wrap gap-2 mt-3">
        {presentation.tags.map((tag: string) => (
          <span
            key={tag}
            className="text-xs bg-black/30 px-2 py-1 rounded-full text-blue-300"
          >
            {tag}
          </span>
        ))}
      </div>
    )}
  </div>
);

const MainLayout = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  
  const projects = [
    {
      id: 1,
      name: 'Post-Scarcity Economics',
      icon: '📈',
      description: 'Research organization exploring economic frameworks in the age of automation',
      tags: ['Economics', 'AI', 'Research', 'Policy', 'Future of Work']
    },
    {
      id: 2,
      name: 'Framework Zero',
      icon: '🔗',
      description: 'Trust through cooperation frameworks with liquid democracy',
      tags: ['Governance', 'Democracy', 'Systems Design', 'Cooperation']
    },
    {
      id: 3,
      name: 'Digital Twin',
      icon: '🤖',
      description: 'Personal AI assistant development and integration framework',
      tags: ['AI', 'Software', 'Knowledge Management']
    }
  ];

  return (
    <ChatProvider>
      <div className="min-h-screen bg-gray-900 text-gray-300 pb-20">
        <StarfallBackground />
        <TopNav />
        <div className="container mx-auto p-4 space-y-8">
          <ProfileSection />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                isActive={activeProject?.id === project.id}
                onClick={() => setActiveProject(project)}
              />
            ))}
          </div>

          <InteractiveKnowledgeGraph
            hackathonProjects={projectData.hackathonProjects}
            personalProjects={projectData.personalProjects}
            presentations={projectData.presentations}
          />
          <ProjectsAndAwards />
        </div>
        
        <ChatInterface />
      </div>
    </ChatProvider>
  );
};

export default MainLayout; 