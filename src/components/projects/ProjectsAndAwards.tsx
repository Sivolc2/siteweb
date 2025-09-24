import React, { useState } from 'react';
import { Trophy, Github, ExternalLink, Video, FileText, Calendar, Globe } from 'lucide-react';
import { projectData } from '@/data/projects';
import type { HackathonProject, PersonalProject, Presentation, SubPresentation } from '@/types/projects';

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
    <div className="mb-2">
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

    {/* Tags moved above description */}
    <div className="flex flex-wrap gap-1 mb-3">
      {project.tags.map((tag: string) => (
        <span
          key={tag}
          className="text-xs bg-black/30 px-2 py-0.5 rounded-full text-blue-300"
        >
          {tag}
        </span>
      ))}
    </div>

    <p className="text-sm text-gray-300 mb-4">{project.description}</p>

    {/* Links with consistent spacing - always show 3 buttons */}
    <div className="flex gap-3 justify-center">
      {/* First button: Event link - using Calendar icon */}
      <div className="flex items-center justify-center w-10 h-10 rounded-lg transition-colors">
        {project.links?.event ? (
          <a
            href={project.links.event}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full h-full bg-blue-600 hover:bg-blue-500 rounded-lg"
            title="Event"
          >
            <Calendar className="w-5 h-5 text-white" />
          </a>
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-700 rounded-lg opacity-30">
            <Calendar className="w-5 h-5 text-gray-500" />
          </div>
        )}
      </div>

      {/* Second button: Project/Demo link - using Globe icon */}
      <div className="flex items-center justify-center w-10 h-10 rounded-lg transition-colors">
        {project.links?.website ? (
          <a
            href={project.links.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full h-full bg-green-600 hover:bg-green-500 rounded-lg"
            title="Project"
          >
            <Globe className="w-5 h-5 text-white" />
          </a>
        ) : project.links?.demo ? (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full h-full bg-green-600 hover:bg-green-500 rounded-lg"
            title="Demo"
          >
            <Globe className="w-5 h-5 text-white" />
          </a>
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-700 rounded-lg opacity-30">
            <Globe className="w-5 h-5 text-gray-500" />
          </div>
        )}
      </div>

      {/* Third button: Video/Github link */}
      <div className="flex items-center justify-center w-10 h-10 rounded-lg transition-colors">
        {project.links?.video ? (
          <a
            href={project.links.video}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full h-full bg-red-600 hover:bg-red-500 rounded-lg"
            title="Video"
          >
            <Video className="w-5 h-5 text-white" />
          </a>
        ) : project.links?.github ? (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full h-full bg-purple-600 hover:bg-purple-500 rounded-lg"
            title="GitHub"
          >
            <Github className="w-5 h-5 text-white" />
          </a>
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-700 rounded-lg opacity-30">
            <Github className="w-5 h-5 text-gray-500" />
          </div>
        )}
      </div>
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

export const ProjectsAndAwards = () => {
  const [activeTab, setActiveTab] = useState<ProjectTab>('hackathon');

  return (
    <div className="bg-gray-900 p-6 border border-blue-500 rounded-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl font-mono font-bold text-blue-400">Projects & Awards</h2>
        <ProjectTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeTab === 'hackathon' && projectData.hackathonProjects.map((project) => (
          <HackathonProjectCard key={project.title} project={project} />
        ))}
        
        {activeTab === 'personal' && projectData.personalProjects.map((project) => (
          <PersonalProjectCard key={project.title} project={project} />
        ))}

        {activeTab === 'presentations' && projectData.presentations.map((presentation) => (
          <PresentationCard key={presentation.title} presentation={presentation} />
        ))}
      </div>
    </div>
  );
}; 