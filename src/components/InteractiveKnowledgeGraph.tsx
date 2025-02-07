'use client';

import React, { useRef, useEffect, useMemo, useState } from 'react';
import ForceGraph2D, { ForceGraphMethods, NodeObject, LinkObject } from 'react-force-graph-2d';
import { HackathonProject, PersonalProject, Presentation } from '@/types/projects';
import * as d3 from 'd3';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

interface GraphNode extends NodeObject {
  id: string;
  name: string;
  color: string;
  val: number;
  group: 'central' | 'category' | 'project' | 'tag';
  projectType?: 'hackathon' | 'personal' | 'presentation';
  fx?: number;  // Fixed x position
  fy?: number;  // Fixed y position
}

interface GraphLink extends LinkObject {
  id: string;
  source: string;
  target: string;
  name: string;
  type: 'central-category' | 'category-project' | 'project-tag';
}

interface InteractiveKnowledgeGraphProps {
  hackathonProjects: HackathonProject[];
  personalProjects: PersonalProject[];
  presentations: Presentation[];
}

const COLORS = {
  central: '#F59E0B', // amber-500
  hackathon: '#60A5FA', // blue-400
  personal: '#34D399', // emerald-400
  presentation: '#F472B6', // pink-400
  tag: '#A78BFA', // violet-400
};

const InteractiveKnowledgeGraph: React.FC<InteractiveKnowledgeGraphProps> = ({
  hackathonProjects,
  personalProjects,
  presentations,
}) => {
  const forceRef = useRef<ForceGraphMethods<GraphNode, GraphLink>>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      const vh = window.innerHeight;
      const maxHeight = Math.min(600, vh * 0.4); // 60% of viewport height, max 600px
      setContainerHeight(maxHeight);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Transform the data into the required format
  const graphData = useMemo(() => {
    // Create central node
    const centralNode: GraphNode = {
      id: 'central',
      name: 'Clovis',
      color: COLORS.central,
      val: 60, // Even bigger size for central node
      group: 'central',
      fx: 0,  // Fixed at x=0
      fy: 0   // Fixed at y=0
    };

    // Create category nodes
    const categoryNodes: GraphNode[] = [
      {
        id: 'category-hackathon',
        name: 'Hackathon Projects',
        color: COLORS.hackathon,
        val: 35, // Slightly smaller than central
        group: 'category'
      },
      {
        id: 'category-personal',
        name: 'Personal Projects',
        color: COLORS.personal,
        val: 35,
        group: 'category'
      },
      {
        id: 'category-presentation',
        name: 'Presentations',
        color: COLORS.presentation,
        val: 35,
        group: 'category'
      }
    ];

    // Create project nodes
    const projectNodes: GraphNode[] = [
      ...hackathonProjects.map(project => ({
        id: project.title,
        name: project.title,
        color: COLORS.hackathon,
        val: 20,
        group: 'project' as const,
        projectType: 'hackathon' as const
      })),
      ...personalProjects.map(project => ({
        id: project.title,
        name: project.title,
        color: COLORS.personal,
        val: 20,
        group: 'project' as const,
        projectType: 'personal' as const
      })),
      ...presentations.map(presentation => ({
        id: presentation.title,
        name: presentation.title,
        color: COLORS.presentation,
        val: 20,
        group: 'project' as const,
        projectType: 'presentation' as const
      }))
    ];

    // Create tag nodes (excluding the orphaned tag)
    const validTags = new Set(
      [...hackathonProjects, ...personalProjects, ...presentations]
        .flatMap(project => project.tags || [])
        .filter(tag => tag !== 'Post-Labor Economics Discussion Group')
    );

    const tagNodes: GraphNode[] = Array.from(validTags).map(tag => ({
      id: tag,
      name: tag,
      color: COLORS.tag,
      val: 15,
      group: 'tag' as const
    }));

    // Create central-category links
    const centralCategoryLinks: GraphLink[] = categoryNodes.map(category => ({
      id: `central-${category.id}`,
      source: 'central',
      target: category.id,
      name: `Clovis - ${category.name}`,
      type: 'central-category' as const
    }));

    // Create category-project links
    const categoryProjectLinks: GraphLink[] = projectNodes.map(project => ({
      id: `category-${project.id}`,
      source: `category-${project.projectType}`,
      target: project.id,
      name: `${project.projectType} - ${project.name}`,
      type: 'category-project' as const
    }));

    // Create project-tag links
    const projectTagLinks: GraphLink[] = [
      ...hackathonProjects.flatMap(project => 
        (project.tags || [])
          .filter(tag => tag !== 'Post-Labor Economics Discussion Group')
          .map(tag => ({
            id: `${project.title}-${tag}`,
            source: project.title,
            target: tag,
            name: `${project.title} - ${tag}`,
            type: 'project-tag' as const
          }))
      ),
      ...personalProjects.flatMap(project => 
        (project.tags || [])
          .filter(tag => tag !== 'Post-Labor Economics Discussion Group')
          .map(tag => ({
            id: `${project.title}-${tag}`,
            source: project.title,
            target: tag,
            name: `${project.title} - ${tag}`,
            type: 'project-tag' as const
          }))
      ),
      ...presentations.flatMap(presentation => 
        (presentation.tags || [])
          .filter(tag => tag !== 'Post-Labor Economics Discussion Group')
          .map(tag => ({
            id: `${presentation.title}-${tag}`,
            source: presentation.title,
            target: tag,
            name: `${presentation.title} - ${tag}`,
            type: 'project-tag' as const
          }))
      )
    ];

    return {
      nodes: [centralNode, ...categoryNodes, ...projectNodes, ...tagNodes],
      links: [...centralCategoryLinks, ...categoryProjectLinks, ...projectTagLinks]
    };
  }, [hackathonProjects, personalProjects, presentations]);

  const setupRotation = () => {
    if (forceRef.current) {
      let angle = 0;
      const rotationSpeed = 0.001;

      forceRef.current.d3Force('rotation', () => {
        angle += rotationSpeed;
        graphData.nodes.forEach((node: GraphNode) => {
          if (node.group !== 'central') {
            const distance = Math.sqrt(Math.pow((node.x || 0), 2) + Math.pow((node.y || 0), 2));
            const currentAngle = Math.atan2(node.y || 0, node.x || 0);
            const newAngle = currentAngle + rotationSpeed;
            node.x = distance * Math.cos(newAngle);
            node.y = distance * Math.sin(newAngle);
          }
        });
      });
    }
  };

  const handleResetView = () => {
    if (forceRef.current) {
      // First fit to view
      forceRef.current.zoomToFit(400);
      
      // Then zoom in by 20% and ensure forces are reapplied
      setTimeout(() => {
        const currentScale = forceRef.current?.zoom();
        if (currentScale) {
          forceRef.current?.zoom(currentScale * 1.6, 400);
        }
        
        // Restart the force simulation with full energy
        forceRef.current?.d3Force('charge')?.strength(-1500);
        forceRef.current?.d3Force('radial')?.strength(0.8);
        
        // Reapply rotation
        setupRotation();
        
        // Ensure the simulation is running with high alpha
        forceRef.current?.d3ReheatSimulation();
        forceRef.current?.resumeAnimation();
        
        // Double-check forces are running after a short delay
        setTimeout(() => {
          setupRotation();
          forceRef.current?.resumeAnimation();
        }, 100);
      }, 450);
    }
  };

  useEffect(() => {
    if (forceRef.current) {
      // Adjust forces for better layout
      forceRef.current.d3Force('charge')?.strength(-1500);
      forceRef.current.d3Force('link')?.distance((link: GraphLink) => {
        switch (link.type) {
          case 'central-category': return 250;
          case 'category-project': return 200;
          case 'project-tag': return 120;
          default: return 150;
        }
      });

      forceRef.current.d3Force('center', null);

      forceRef.current.d3Force('radial', d3.forceRadial((node: GraphNode) => {
        switch (node.group) {
          case 'central': return 0;
          case 'category': return 250;
          case 'project': return 450;
          case 'tag': return 600;
          default: return 250;
        }
      }).strength(0.8));

      // Setup initial rotation
      setupRotation();

      // Add a small delay to ensure the graph is properly initialized
      const timer = setTimeout(() => {
        handleResetView();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [graphData.nodes]);

  return (
    <div className="relative bg-gray-900 p-6 border border-blue-500 rounded-lg overflow-hidden" ref={containerRef}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20 animate-gradient-x" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_50%,rgba(56,189,248,0.1),transparent_100%)] animate-pulse-slow" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_400px_at_70%_30%,rgba(168,85,247,0.1),transparent_100%)] animate-pulse-slower" />
        </div>
      </div>

      <h2 className="relative text-xl font-mono font-bold text-blue-400 mb-4">Project Graph</h2>
      <div className="relative" style={{ height: containerHeight }}>
        <div className="absolute inset-0">
          <ForceGraph2D
            ref={forceRef}
            graphData={graphData}
            nodeLabel="name"
            backgroundColor="transparent"
            width={containerRef.current?.clientWidth ? containerRef.current.clientWidth - 12 : 800}
            height={containerHeight - 8}
            linkColor={(link) => {
              const typedLink = link as GraphLink;
              switch (typedLink.type) {
                case 'central-category': return 'rgba(255,255,255,0.4)';
                case 'category-project': return 'rgba(255,255,255,0.3)';
                case 'project-tag': return 'rgba(255,255,255,0.2)';
                default: return 'rgba(255,255,255,0.2)';
              }
            }}
            linkWidth={(link) => {
              const typedLink = link as GraphLink;
              switch (typedLink.type) {
                case 'central-category': return 2;
                case 'category-project': return 1.5;
                case 'project-tag': return 1;
                default: return 1;
              }
            }}
            nodeColor={node => (node as GraphNode).color}
            nodeVal={node => (node as GraphNode).val}
            nodeCanvasObjectMode={() => 'after'}
            nodeCanvasObject={(node: GraphNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
              const label = node.name;
              const fontSize = 
                node.group === 'central' ? 24 / globalScale :
                node.group === 'category' ? 16 / globalScale :
                12 / globalScale;
              
              // Set font with Inter
              ctx.font = `${node.group === 'central' ? '500' : '400'} ${fontSize}px ${inter.style.fontFamily}`;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              
              // Draw text shadow
              ctx.fillStyle = 'rgba(0,0,0,0.8)';
              ctx.fillText(
                label,
                node.x || 0,
                (node.y || 0) + (
                  node.group === 'central' ? 45 :
                  node.group === 'category' ? 35 :
                  20
                ) + 1
              );
              
              // Draw main text
              ctx.fillStyle = 'white';
              ctx.fillText(
                label,
                node.x || 0,
                (node.y || 0) + (
                  node.group === 'central' ? 45 :
                  node.group === 'category' ? 35 :
                  20
                )
              );
            }}
          />
        </div>
      </div>

      {/* Legend - Make it more compact on mobile */}
      <div className="absolute top-4 right-4 flex flex-col sm:flex-row gap-2 sm:gap-4 bg-gray-900/80 p-2 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500" />
          <span className="text-xs sm:text-sm text-gray-300">Clovis</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-400" />
          <span className="text-xs sm:text-sm text-gray-300">Hackathon</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-400" />
          <span className="text-xs sm:text-sm text-gray-300">Personal</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-pink-400" />
          <span className="text-xs sm:text-sm text-gray-300">Presentation</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-violet-400" />
          <span className="text-xs sm:text-sm text-gray-300">Tag</span>
        </div>
      </div>

      {/* Reset View Button - Move it up slightly on mobile */}
      <button
        onClick={handleResetView}
        className="absolute bottom-6 right-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg shadow-lg transition-colors"
      >
        Reset View
      </button>

      {/* Scroll indicator for mobile */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-gray-900 to-transparent sm:hidden" />
    </div>
  );
};

export default InteractiveKnowledgeGraph; 