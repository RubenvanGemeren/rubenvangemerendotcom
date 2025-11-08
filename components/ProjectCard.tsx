import Link from "next/link";
import ClayCard from "./ClayCard";
import Tag from "./Tag";
import MetricChart from "./MetricChart";
import type { Project } from "@/types/content";

interface ProjectCardProps {
  project: Project;
  compact?: boolean;
}

export default function ProjectCard({ project, compact = false }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <ClayCard className="p-6 h-full cursor-pointer">
        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-text mb-1">{project.title}</h3>
              <p className="text-sm text-text-subtle">{project.subtitle}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          {!compact && (
            <>
              <ul className="space-y-2 mb-4 flex-1">
                <li className="text-sm text-text-subtle">
                  <span className="font-medium text-text">Challenge: </span>
                  {project.challenge}
                </li>
                <li className="text-sm text-text-subtle">
                  <span className="font-medium text-text">Impact: </span>
                  {project.impact}
                </li>
              </ul>

              {project.chartData && project.chartData.length > 0 && (
                <div className="mt-4">
                  <MetricChart data={project.chartData} height={150} />
                </div>
              )}
            </>
          )}

          {compact && (
            <div className="mt-auto pt-4">
              <p className="text-sm text-text-subtle line-clamp-2">{project.impact}</p>
            </div>
          )}
        </div>
      </ClayCard>
    </Link>
  );
}

