// Import JSON data directly so it gets bundled at build time.
// This is required for Cloudflare Workers which have no filesystem access.
import type { Profile, Experience, Education, Project } from "@/types/content";

import profileData from "@/data/profile.json";
import experienceData from "@/data/experience.json";
import educationData from "@/data/education.json";

// Import all project JSON files explicitly (no dynamic fs.readdirSync)
import holonStreaming from "@/data/projects/holon-streaming.json";
import airQualityPredictor from "@/data/projects/air-quality-predictor.json";
import liveBoatTracking from "@/data/projects/live-boat-tracking.json";
import fplPlayerPerformance from "@/data/projects/fpl-player-performance.json";

const allProjectsData: Project[] = [
  holonStreaming as Project,
  airQualityPredictor as Project,
  liveBoatTracking as Project,
  fplPlayerPerformance as Project,
];

function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    // Sort by featured first, then by order, then by title
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;

    // If both have order, sort by order (lower numbers first)
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    // If only a has order, it comes first
    if (a.order !== undefined) return -1;
    // If only b has order, it comes first
    if (b.order !== undefined) return 1;

    // Fallback to title sorting
    return a.title.localeCompare(b.title);
  });
}

export function getProfile(): Profile {
  return profileData as Profile;
}

export function getExperience(): Experience[] {
  return experienceData as Experience[];
}

export function getEducation(): Education[] {
  return educationData as Education[];
}

export function getAllProjects(): Project[] {
  return sortProjects(allProjectsData);
}

export function getProjectBySlug(slug: string): Project | null {
  const projects = getAllProjects();
  return projects.find((p) => p.slug === slug) || null;
}

export function getFeaturedProjects(): Project[] {
  const projects = getAllProjects();
  return projects.filter((p) => p.featured).slice(0, 3);
}

