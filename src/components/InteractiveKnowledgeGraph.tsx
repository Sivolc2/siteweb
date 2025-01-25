'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import ForceGraph2D, { ForceGraphMethods, NodeObject, LinkObject } from 'react-force-graph-2d';
import { HackathonProject, PersonalProject, Presentation } from '@/types/projects';
import * as d3 from 'd3';

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

  const handleResetView = () => {
    if (forceRef.current) {
      forceRef.current.zoomToFit(400);
    }
  };

  useEffect(() => {
    if (forceRef.current) {
      // Adjust forces for better layout
      forceRef.current.d3Force('charge')?.strength(-1000);
      forceRef.current.d3Force('link')?.distance((link: GraphLink) => {
        switch (link.type) {
          case 'central-category': return 300;
          case 'category-project': return 200;
          case 'project-tag': return 120;
          default: return 150;
        }
      });

      forceRef.current.d3Force('center', null);

      forceRef.current.d3Force('radial', d3.forceRadial((node: GraphNode) => {
        switch (node.group) {
          case 'central': return 0;
          case 'category': return 300;
          case 'project': return 500;
          case 'tag': return 650;
          default: return 300;
        }
      }).strength(0.6));

      // Initial centering
      handleResetView();
    }
  }, []);

  return (
    <div className="relative bg-gray-900 p-6 border border-blue-500 rounded-lg overflow-hidden" ref={containerRef}>
      <h2 className="text-xl font-mono font-bold text-blue-400 mb-4">Knowledge Graph</h2>
      <div className="h-[600px] relative">
        <ForceGraph2D
          ref={forceRef}
          graphData={graphData}
          nodeLabel="name"
          backgroundColor="transparent"
          width={containerRef.current?.clientWidth ? containerRef.current.clientWidth - 48 : 800}
          height={550}
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
            ctx.font = `${node.group === 'central' ? 'bold' : 'normal'} ${fontSize}px Inter`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'white';
            ctx.fillText(
              label,
              node.x || 0,
              (node.y || 0) + (node.group === 'central' ? 35 : node.group === 'category' ? 25 : 15)
            );
          }}
        />
      </div>

      {/* Legend */}
      <div className="absolute top-4 right-4 flex gap-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500" />
          <span className="text-sm text-gray-300">Clovis</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-400" />
          <span className="text-sm text-gray-300">Hackathon</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-400" />
          <span className="text-sm text-gray-300">Personal</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-pink-400" />
          <span className="text-sm text-gray-300">Presentation</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-violet-400" />
          <span className="text-sm text-gray-300">Tag</span>
        </div>
      </div>

      {/* Reset View Button */}
      <button
        onClick={handleResetView}
        className="absolute bottom-4 right-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg transition-colors"
      >
        Reset View
      </button>
    </div>
  );
};

export default InteractiveKnowledgeGraph; 