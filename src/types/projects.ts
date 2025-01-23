interface ProjectLinks {
  github?: string;
  demo?: string;
  devpost?: string;
  press?: string;
  event?: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  links?: ProjectLinks;
  featured?: boolean;
}

export interface HackathonProject extends Project {
  award: string;
}

export interface PersonalProject extends Project {
  featured?: boolean;
} 