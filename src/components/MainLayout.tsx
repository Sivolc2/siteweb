'use client';

import React, { useState } from 'react';
import { Menu, MessageCircle, Github, Linkedin, Twitter, Trophy, ExternalLink, Video, FileText } from 'lucide-react';
import Image from 'next/image';
import { projectData } from '@/data/projects';
import type { HackathonProject, PersonalProject, Presentation, ProjectLink, SubPresentation } from '@/types/projects';
import InteractiveKnowledgeGraph from './InteractiveKnowledgeGraph';
import { ChatProvider, useChat } from './chat/ChatContext';
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
  longDescription: string;
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

const ProjectGrid = ({ projects }: { projects: Project[] }) => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const { addAssistantMessage } = useChat();
  
  const handleProjectClick = (project: Project) => {
    setActiveProject(project);
    if (project.id === 3 && !hasShownWelcome) { // Digital Twin project
      addAssistantMessage("Hi! I'm a digital twin assistant, trained to understand and discuss Clovis' projects and experiences. How can I help you today?");
      setHasShownWelcome(true);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map(project => (
        <ProjectCard
          key={project.id}
          project={project}
          isActive={activeProject?.id === project.id}
          onClick={() => handleProjectClick(project)}
        />
      ))}
    </div>
  );
};

const MainLayout = () => {
  const projects = [
    {
      id: 1,
      name: 'Post-Labor Economics',
      icon: '📈',
      description: 'Building the infrastructure and theory for a post-labor economy driven by automation and AI',
      longDescription: 'A research and development initiative focused on creating the operating system for a post-labor economy. We are developing frameworks for autonomous companies, preference aggregation systems, and economic structures that work beyond traditional labor markets. Our goal is to demonstrate how automation and AI can create abundance while ensuring equitable distribution and human flourishing. Key areas include digital twin systems for preference mapping, autonomous organization design, and transparent economic frameworks.',
      tags: ['Economics', 'AI', 'Automation', 'Future of Work', 'Research']
    },
    {
      id: 2,
      name: 'Framework Zero',
      icon: '🔗',
      description: 'A new framework for human cooperation and acceleration in the age of AI',
      longDescription: 'Framework Zero reimagines human cooperation for the AI era. We are developing systems that combine liquid democracy, preference aggregation, and trust mechanisms to enable more effective collective decision-making. The project focuses on creating transparent, gamified structures for cooperation that can scale from small groups to global systems. Core components include decentralized science initiatives, autonomous company foundations, and mechanisms for translating human preferences into actionable metrics.',
      tags: ['Governance', 'Cooperation', 'Systems Design', 'Trust Systems', 'AI Integration']
    },
    {
      id: 3,
      name: 'Digital Twin',
      icon: '🤖',
      description: 'Try the chat assistant below - an early experiment in digital twin technology',
      longDescription: 'An exploration into creating AI assistants that truly understand and represent individual knowledge and preferences. This website features an early prototype: the chat assistant below that understands my projects, experiences, and thoughts. Future development focuses on more sophisticated preference learning, contextual understanding, and autonomous decision-making capabilities. The goal is to create digital twins that can effectively represent individuals in various contexts, from personal assistance to economic decision-making.',
      tags: ['AI', 'Digital Twin', 'Knowledge Systems', 'Human-AI Interaction']
    }
  ];

  return (
    <ChatProvider>
      <div className="min-h-screen bg-gray-900 text-gray-300 pb-20">
        <StarfallBackground />
        <TopNav />
        <div className="container mx-auto p-4 space-y-8">
          <ProfileSection />
          <ProjectGrid projects={projects} />
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