import React from "react";
import Link from "next/link";
import { Code } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import TechGrid from "@/components/technologies/TechGrid";
import { ChevronRight } from "lucide-react";
import { getTechnologies } from "@/utils";
import type { Technology } from "@/types";

interface TechStackProps {
  showAllLink?: boolean;
}

const TechStack = async ({ showAllLink = true }: TechStackProps) => {
  const technologies: Technology[] = await getTechnologies();

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <SectionHeader
        title="Technologies"
        icon={Code}
        action={
          showAllLink
            ? {
                label: "View related projects",
                href: "/projects",
              }
            : undefined
        }
      />

      {/* Technology Grid */}
      <TechGrid
        technologies={technologies}
/*        onTechClick={(tech) => (
          <Link href={`/projects?tech=${tech.name.toLowerCase()}`} passHref>
            <button className="...">
              <span>{tech.name}</span>
              <ChevronRight size={14} />
            </button>
          </Link>
        )}*/
      />

      {/* Optional Footer Link */}
      {showAllLink && (
        <div className="flex justify-end">
          <Link
            href="/projects"
            className="text-sm font-mono text-cyan-500 hover:text-cyan-400 transition-colors"
            aria-label="See projects by technology"
          >
            See projects by technology →
          </Link>
        </div>
      )}
    </section>
  );
};

export default TechStack;
