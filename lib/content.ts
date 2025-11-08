import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import type { Profile, Experience, Education, Project } from "@/types/content";

const dataDir = join(process.cwd(), "data");

export function getProfile(): Profile {
  const filePath = join(dataDir, "profile.json");
  const fileContents = readFileSync(filePath, "utf8");
  return JSON.parse(fileContents) as Profile;
}

export function getExperience(): Experience[] {
  const filePath = join(dataDir, "experience.json");
  const fileContents = readFileSync(filePath, "utf8");
  return JSON.parse(fileContents) as Experience[];
}

export function getEducation(): Education[] {
  const filePath = join(dataDir, "education.json");
  const fileContents = readFileSync(filePath, "utf8");
  return JSON.parse(fileContents) as Education[];
}

export function getAllProjects(): Project[] {
  const projectsDir = join(dataDir, "projects");
  const files = readdirSync(projectsDir).filter((file) => file.endsWith(".json"));

  return files
    .map((file) => {
      const filePath = join(projectsDir, file);
      const fileContents = readFileSync(filePath, "utf8");
      return JSON.parse(fileContents) as Project;
    })
    .sort((a, b) => {
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

export function getProjectBySlug(slug: string): Project | null {
  const projects = getAllProjects();
  return projects.find((p) => p.slug === slug) || null;
}

export function getFeaturedProjects(): Project[] {
  const projects = getAllProjects();
  return projects.filter((p) => p.featured).slice(0, 3);
}

