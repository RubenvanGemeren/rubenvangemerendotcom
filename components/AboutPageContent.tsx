"use client";

import { motion } from "framer-motion";
import ClayCard from "./ClayCard";
import type { Profile, Education } from "@/types/content";

interface AboutPageContentProps {
  profile: Profile;
  education: Education[];
}

export default function AboutPageContent({ profile, education }: AboutPageContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl"
    >
      <h1 className="text-4xl font-bold text-text mb-8">About</h1>

      <div className="space-y-8">
        <ClayCard className="p-6">
          <h2 className="text-2xl font-semibold text-text mb-4">Background</h2>
          {/* <p className="text-text-subtle leading-relaxed mb-4">{profile.summary}</p> */}
          <p className="text-text-subtle leading-relaxed">
          I&apos;m a KTH graduate originally from the Netherlands, with a master&apos;s in Distributed Systems and Data Processing. During my studies, I interned at RISE and contributed to ongoing research now turning into a paper. I have around two to three years of experience, and currently I&apos;m working as a full-stack developer at Spaux, building a multi-tenant self-service portal in Laravel from the ground up.
          </p>
        </ClayCard>

        <ClayCard className="p-6">
          <h2 className="text-2xl font-semibold text-text mb-4">Values & Approach</h2>
          <ul className="space-y-3 text-text-subtle">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>
                <strong className="text-text">Hands-on Engineering:</strong> I believe in truly understanding the code I write. My best work comes from getting my hands dirty and diving into the implementation details.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>
                <strong className="text-text">Function Over Form:</strong> Clean code matters, but over-optimizing the codebase can slow progress and hurt product quality. The real priority is delivering new, well-functioning features, clean solutions naturally follow when built with intent and responsibility.

              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>
                <strong className="text-text">Full-Stack Enthusiast:</strong> I&apos;m not limited to just frontend or backend. I love being involved in every stage of development. From designing UIs to optimizing large-scale data systems.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>
                <strong className="text-text">Practical Innovation:</strong> I enjoy translating technical requirements to real-world applications that people actually enjoy to use. For me, it&apos;s all about adding real value through thoughtful design and reliable engineering.
              </span>
            </li>
          </ul>
        </ClayCard>

        {education.length > 0 && (
          <ClayCard className="p-6">
            <h2 className="text-2xl font-semibold text-text mb-4">Education</h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="pb-4 border-b border-surface/50 last:border-0 last:pb-0">
                  <h3 className="text-lg font-semibold text-text mb-1">{edu.degree}</h3>
                  <p className="text-primary mb-2">{edu.institution}</p>
                  <p className="text-sm text-text-subtle mb-2">
                    {new Date(edu.startDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    –{" "}
                    {new Date(edu.endDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  {edu.details && (
                    <p className="text-sm text-text-subtle">{edu.details}</p>
                  )}
                </div>
              ))}
            </div>
          </ClayCard>
        )}
      </div>
    </motion.div>
  );
}

