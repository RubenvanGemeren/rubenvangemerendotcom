"use client";

import { motion } from "framer-motion";
import ClayCard from "./ClayCard";
import ProjectCard from "./ProjectCard";
import type { Profile, Project } from "@/types/content";

interface HomeContentProps {
  profile: Profile;
  featuredProjects: Project[];
}

export default function HomeContent({ profile, featuredProjects }: HomeContentProps) {
  const highlights = [
    {
      title: "Distributed Stream Processing with CRDTs",
      description: "Developed Holon Streaming, a decentralized stream processing system that scales global aggregations using Windowed CRDTs to remove coordination bottlenecks.",
    },
    {
      title: "ML Pipelines for weather forecasting & FPL predictions",
      description: "Developed ML systems with Hopsworks: a serverless air-quality predictor for PM2.5 levels and an FPL player performance model using Python and PyTorch for weekly point forecasts.",
    },
    {
      title: "Real-time public transport tracking",
      description: "Developed a real-time public transport tracking system using European NeTEx format for boats in Rotterdam.",
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-12"
      >
        <h1 className="text-4xl lg:text-5xl font-bold text-text mb-4">{profile.name}</h1>
        <h2 className="text-2xl lg:text-3xl font-semibold text-primary mb-6">{profile.title}</h2>
        <p className="text-lg text-text-subtle max-w-3xl leading-relaxed">{profile.summary}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        {highlights.map((highlight, index) => (
          <ClayCard key={index} className="p-6">
            <h3 className="text-lg font-semibold text-text mb-3">{highlight.title}</h3>
            <p className="text-sm text-text-subtle leading-relaxed">{highlight.description}</p>
          </ClayCard>
        ))}
      </motion.div>

      {featuredProjects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="text-2xl font-semibold text-text mb-6">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} compact />
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}

