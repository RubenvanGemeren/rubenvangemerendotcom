export interface Profile {
  name: string;
  title: string;
  tagline: string;
  summary: string;
  links: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  highlights: string[];
  tech: string[];
}

export interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  details?: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface ProjectMetrics {
  label: string;
  before: number;
  after: number;
  unit?: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  tags: string[];
  challenge: string;
  approach: string;
  impact: string;
  techStack: string[];
  metrics?: ProjectMetrics;
  chartData?: ChartDataPoint[];
  featured?: boolean;
  order?: number;
}

