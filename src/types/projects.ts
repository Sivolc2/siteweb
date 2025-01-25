export interface ProjectLink {
  github?: string;
  demo?: string;
  devpost?: string;
  press?: string;
  event?: string;
  website?: string;
  video?: string;
  slides?: string;
}

export interface HackathonProject {
  title: string;
  description: string;
  award?: string;
  event?: string;
  tags: string[];
  links?: ProjectLink;
}

export interface PersonalProject {
  title: string;
  description: string;
  tags: string[];
  featured?: boolean;
  links?: ProjectLink;
}

export interface SubPresentation {
  title: string;
  links: ProjectLink;
}

export interface Presentation {
  title: string;
  description?: string;
  tags?: string[];
  links?: ProjectLink;
  presentations?: SubPresentation[];
} 