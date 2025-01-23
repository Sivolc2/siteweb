import Link from 'next/link';
import { FiGithub, FiExternalLink, FiAward, FiCode, FiCpu, FiDatabase } from 'react-icons/fi';
import type { HackathonProject, PersonalProject } from '@/types/projects';

const hackathons: HackathonProject[] = [
  {
    title: "Arboren",
    description: "AI-powered geospatial analysis platform for environmental policy",
    award: "1st Place CZI+UNCCD Hack",
    tags: ["AI", "GIS", "Policy"],
    links: {
      github: "https://github.com/yourusername/arboren",
      demo: "https://arboren-ai.com/home",
      devpost: "https://devpost.com/software/green-policy-agent",
      press: "https://www.sfchronicle.com/bayarea/article/hack-for-social-impact-ai-19887830.php"
    }
  },
  {
    title: "Humanoid Robotics Control",
    description: "VR-controlled robotic hand for humanoid platforms",
    award: "1st Place K-Scale Labs",
    tags: ["Robotics", "VR", "Control Systems"]
  },
  {
    title: "Voice-to-Action Robotics",
    description: "Natural language interface for robot control",
    award: "2nd Place K-Scale Labs",
    tags: ["NLP", "Robotics", "Voice"]
  },
  {
    title: "Lumi",
    description: "Autonomous supply chain logistics optimization",
    award: "2nd Place AGI House",
    tags: ["AI", "Logistics"],
    links: {
      event: "https://partiful.com/e/uYzDzXUstD8D8kvuA8Zl"
    }
  }
];

const personalProjects: PersonalProject[] = [
  {
    title: "Post-Labor Economics",
    description: "Research organization exploring economic frameworks in the age of automation",
    tags: ["Economics", "AI", "Research"],
    featured: true
  },
  {
    title: "Vaulter",
    description: "Obsidian plugin for AI-powered knowledge management",
    tags: ["TypeScript", "LlamaIndex", "Knowledge Graphs"],
    links: {
      github: "https://github.com/yourusername/vaulter"
    }
  },
  {
    title: "Xenarch",
    description: "Xenosignatures core for biological pattern recognition",
    tags: ["Biology", "AI", "Pattern Recognition"],
    links: {
      github: "https://github.com/Sivolc2/xenarch"
    }
  },
  {
    title: "Antarctica Net",
    description: "CNN architecture for meltwater detection in ice sheets",
    tags: ["Deep Learning", "Climate", "Remote Sensing"],
    links: {
      github: "https://github.com/Sivolc2/antarctica_net"
    }
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Clovis Vinant-Tang
          </h1>
          <h2 className="text-2xl text-gray-300 mb-8">
            Founder | Post-Labor Economics Research
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mb-12">
            Innovator at the intersection of AI, environmental science, and economic systems. 
            Focused on developing intelligent solutions for complex global challenges.
          </p>
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <Link 
              href="/projects" 
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              View All →
            </Link>
          </div>

          {/* Hackathons Section */}
          <div className="mb-16">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <FiAward className="text-blue-400" />
              <span>Award-Winning Hackathon Projects</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {hackathons.map((project, index) => (
                <div 
                  key={index}
                  className="group relative bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-gray-800/95 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-blue-400 text-sm">{project.award}</span>
                      <div className="flex space-x-4">
                        {project.links?.github && (
                          <a href={project.links.github} className="text-gray-400 hover:text-white transition-colors">
                            <FiGithub className="w-5 h-5" />
                          </a>
                        )}
                        {project.links?.demo && (
                          <a href={project.links.demo} className="text-gray-400 hover:text-white transition-colors">
                            <FiExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-2 py-1 text-xs bg-blue-900/50 text-blue-300 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Projects Section */}
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <FiCode className="text-blue-400" />
              <span>Research & Personal Projects</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {personalProjects.map((project, index) => (
                <div 
                  key={index}
                  className="group relative bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-gray-800/95 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      {project.featured && <span className="text-blue-400 text-sm">Featured</span>}
                      <div className="flex space-x-4">
                        {project.links?.github && (
                          <a href={project.links.github} className="text-gray-400 hover:text-white transition-colors">
                            <FiGithub className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-2 py-1 text-xs bg-blue-900/50 text-blue-300 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Achievements */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Recent Achievements</h2>
          <div className="space-y-8">
            {/* Achievement Items */}
            <div className="bg-gray-800/50 rounded-lg p-6 hover:bg-gray-800 transition-colors">
              <h3 className="text-xl font-bold text-blue-400 mb-2">
                1st Place - K-Scale Lab Humanoid Robotics Hackathon
              </h3>
              <p className="text-gray-400">
                Developed VR-controlled robotic hand for humanoid platforms
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-6 hover:bg-gray-800 transition-colors">
              <h3 className="text-xl font-bold text-blue-400 mb-2">
                1st Place - CZI+UNCCD Hack for Social Impact
              </h3>
              <p className="text-gray-400">
                Created Arboren, an AI-powered geospatial analysis platform
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-t from-blue-900/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Interested in collaborating?</h2>
          <Link 
            href="/chat" 
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Let's Chat
          </Link>
        </div>
      </section>
    </div>
  );
}
