export type ProjectCategory = 'hackathon' | 'personal' | 'research';

export interface Project {
  id: string;
  title: string;
  description: string;
  date: string;
  category: ProjectCategory;
  technologies: string[];
  links: {
    github?: string;
    demo?: string;
    article?: string;
  };
  media: {
    thumbnail: string;
    images?: string[];
    video?: string;
  };
}

export interface Analytics {
  pageViews: number;
  uniqueVisitors: number;
  averageTimeOnPage: number;
}

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  blockDuration: number;
} 