"use client";

import { motion } from "framer-motion";
import ClayCard from "./ClayCard";
import Tag from "./Tag";
import type { Experience } from "@/types/content";

interface ExperiencePageContentProps {
  experience: Experience[];
}

export default function ExperiencePageContent({ experience }: ExperiencePageContentProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-text mb-4">Experience</h1>
        <p className="text-lg text-text-subtle max-w-3xl">
          Building scalable, reliable systems and data platforms at scale.
        </p>
      </motion.div>

      <div className="space-y-6">
        {experience.map((exp, index) => (
          <motion.div
            key={`${exp.company}-${exp.startDate}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ClayCard className="p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-2xl font-semibold text-text mb-1">{exp.role}</h2>
                  <h3 className="text-xl font-medium text-primary mb-2">{exp.company}</h3>
                  <p className="text-sm text-text-subtle">{exp.location}</p>
                </div>
                <div className="text-sm text-text-subtle">
                  <span>
                    {new Date(exp.startDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="mx-2">–</span>
                  <span>
                    {exp.current
                      ? "Present"
                      : exp.endDate
                        ? new Date(exp.endDate).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })
                        : "Present"}
                  </span>
                </div>
              </div>

              <ul className="space-y-2 mb-4">
                {exp.highlights.map((highlight, idx) => (
                  <li key={idx} className="text-sm text-text-subtle flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-surface/50">
                {exp.tech.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </ClayCard>
          </motion.div>
        ))}
      </div>
    </>
  );
}

