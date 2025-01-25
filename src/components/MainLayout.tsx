'use client';

import React, { useState } from 'react';
import { Menu, MessageCircle, Github, Linkedin, Twitter, Trophy, ExternalLink, Video, FileText } from 'lucide-react';
import Image from 'next/image';
import { projectData } from '@/data/projects';
import type { HackathonProject, PersonalProject, Presentation, ProjectLink, SubPresentation } from '@/types/projects';
import InteractiveKnowledgeGraph from './InteractiveKnowledgeGraph';
import { ChatProvider } from './chat/ChatContext';
import { ChatInterface } from './chat/ChatInterface';

interface Project {
  id: number;
  name: string;
  icon: string;
  description: string;
  tags: string[];
}

interface ProjectCardProps {
  project: Project;
  isActive: boolean;
  onClick: () => void;
}

interface Achievement {
  title: string;
  description: string;
}

const TopNav = () => (
  <div className="bg-gray-900 border-b border-blue-500 p-4">
    <div className="container mx-auto flex justify-between items-center">
      <span className="text-blue-400 font-mono">CV</span>
      <Menu className="w-6 h-6 text-blue-400 cursor-pointer" />
    </div>
  </div>
);

const ProfileSection = () => (
  <div className="bg-gray-900 p-6 border border-blue-500 rounded-lg">
    <div className="flex items-center gap-8 mb-4">
      <div className="relative w-[120px] h-[120px]">
        <Image 
          src="/placeholder-headshot.jpg"
          alt="Profile"
          fill
          className="rounded-full border-2 border-blue-400 object-cover"
        />
      </div>
      <div>
        <h1 className="text-2xl font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
          Clovis Vinant-Tang
        </h1>
        <p className="text-gray-300 font-mono max-w-2xl mb-4">
          Builder at the intersection of AI, space tech, and economic systems.
          <br />
          
          <br />
          Focused on developing intelligent solutions for the Post-Labor Economy!🚀
        </p>
        <div className="flex gap-4">
          <a 
            href="https://twitter.com/clovisvinant" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a 
            href="https://github.com/Sivolc2" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href="https://www.linkedin.com/in/clovis-vinant-tang/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  </div>
);

const ProjectCard = ({ project, isActive, onClick }: ProjectCardProps) => (
  <div 
    onClick={onClick}
    className={`cursor-pointer p-4 rounded-lg backdrop-blur-sm transition-all
      ${isActive 
        ? 'bg-blue-600/80 text-white border-2 border-blue-400 shadow-lg shadow-blue-500/50' 
        : 'bg-gray-800/80 text-gray-300 border border-gray-700 hover:border-blue-400 hover:bg-gray-700/80'}`}
  >
    <div className="flex items-center gap-4 mb-2">
      <span className="text-2xl">{project.icon}</span>
      <h3 className="font-mono font-bold text-blue-400">{project.name}</h3>
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
);

const KnowledgeGraph = () => {
  const nodes = [
    { id: 'ai', label: 'AI', x: 100, y: 100 },
    { id: 'economics', label: 'Economics', x: 300, y: 100 },
    { id: 'env', label: 'Environment', x: 200, y: 200 },
    { id: 'systems', label: 'Systems', x: 400, y: 200 },
  ] as const;

  const edges = [
    { from: 'ai', to: 'economics' },
    { from: 'economics', to: 'env' },
    { from: 'env', to: 'systems' },
    { from: 'systems', to: 'ai' }
  ] as const;

  return (
    <div className="bg-gray-900 p-6 border border-blue-500 rounded-lg">
      <h2 className="text-blue-400 font-mono mb-4">Knowledge Graph</h2>
      <svg className="w-full h-64">
        {edges.map(edge => {
          const from = nodes.find(n => n.id === edge.from);
          const to = nodes.find(n => n.id === edge.to);
          if (!from || !to) return null;
          return (
            <line
              key={`${edge.from}-${edge.to}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="#60A5FA"
              strokeWidth="1"
              opacity="0.6"
            />
          );
        })}
        
        {nodes.map(node => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="30"
              fill="#1F2937"
              stroke="#60A5FA"
              strokeWidth="2"
            />
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#60A5FA"
              className="text-sm font-mono"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

const ProjectsAndAwards = () => {
  const [activeTab, setActiveTab] = useState<'hackathon' | 'personal' | 'presentations'>('hackathon');

  return (
    <div className="bg-gray-900 p-6 border border-blue-500 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-mono font-bold text-blue-400">Projects & Awards</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('hackathon')}
            className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
              activeTab === 'hackathon'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Hackathons
          </button>
          <button
            onClick={() => setActiveTab('personal')}
            className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
              activeTab === 'personal'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Personal
          </button>
          <button
            onClick={() => setActiveTab('presentations')}
            className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
              activeTab === 'presentations'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Presentations
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeTab === 'hackathon' && projectData.hackathonProjects.map((project) => (
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
        ))}
        
        {activeTab === 'personal' && projectData.personalProjects.map((project) => (
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
        ))}

        {activeTab === 'presentations' && projectData.presentations.map((presentation) => (
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
        ))}
      </div>
    </div>
  );
};

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