"use client";

import { motion } from "framer-motion";
import ClayCard from "./ClayCard";
import Tag from "./Tag";
import MetricChart from "./MetricChart";
import type { Project } from "@/types/content";

interface ProjectDetailContentProps {
  project: Project;
}

export default function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text mb-3">{project.title}</h1>
        <p className="text-xl text-text-subtle mb-6">{project.subtitle}</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <ClayCard className="p-6">
            <h2 className="text-xl font-semibold text-text mb-4">Challenge</h2>
            <p className="text-text-subtle leading-relaxed">{project.challenge}</p>
          </ClayCard>

          <ClayCard className="p-6">
            <h2 className="text-xl font-semibold text-text mb-4">Approach</h2>
            <p className="text-text-subtle leading-relaxed">{project.approach}</p>
          </ClayCard>

          <ClayCard className="p-6">
            <h2 className="text-xl font-semibold text-text mb-4">Impact</h2>
            <p className="text-text-subtle leading-relaxed">{project.impact}</p>
          </ClayCard>
        </div>

        <div className="space-y-6">
          <ClayCard className="p-6">
            <h2 className="text-xl font-semibold text-text mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          </ClayCard>

          {project.metrics && (
            <ClayCard className="p-6">
              <h2 className="text-xl font-semibold text-text mb-4">Metrics</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-subtle">Before:</span>
                  <span className="text-sm font-semibold text-text">
                    {project.metrics.before.toLocaleString()}
                    {project.metrics.unit && ` ${project.metrics.unit}`}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-subtle">After:</span>
                  <span className="text-sm font-semibold text-primary">
                    {project.metrics.after.toLocaleString()}
                    {project.metrics.unit && ` ${project.metrics.unit}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-surface/50">
                  <span className="text-xs text-text-subtle">
                    Improvement:{" "}
                    {(
                      ((project.metrics.before - project.metrics.after) /
                        project.metrics.before) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
              </div>
            </ClayCard>
          )}

          {project.chartData && project.chartData.length > 0 && (
            <ClayCard className="p-6">
              <h2 className="text-xl font-semibold text-text mb-4">Visualization</h2>
              <MetricChart data={project.chartData} height={200} />
            </ClayCard>
          )}
        </div>
      </div>
    </motion.div>
  );
}

