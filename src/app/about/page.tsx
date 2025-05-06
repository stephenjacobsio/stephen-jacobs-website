import React from "react";
import {
  Terminal,
  Briefcase,
  GraduationCap,
  Download,
  Award,
  Code,
} from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeader from "@/components/ui/SectionHeader";
import TechGrid from "@/components/technologies/TechGrid";
import { getTechnologies } from "@/services/technologyService";
import { getEducation } from "@/services/educationService";
import { getWorkExperience } from "@/services/workExperienceService";
import { getCertifications } from "@/services/certificationService";

const AboutPage = async () => {
  // Fetch data from API services
  const [technologies, education, workExperience, certifications] = await Promise.all([
    getTechnologies(),
    getEducation(),
    getWorkExperience(),
    getCertifications()
  ]);

  return (
    <PageLayout title="About" path="~/stephen/about">
      <div className="space-y-16">
        {/* Introduction */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-mono text-cyan-400">
            Stephen Jacobs
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Software Engineering Leader with over a decade of experience in
            cloud computing, DevOps, and building scalable web applications.
          </p>
          <div>
            <a
              href="/Stephen_Jacobs_Resume_2024.pdf"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-medium transition duration-200 shadow-md"
            >
              <Download size={20} className="mr-2" />
              Download Resume
            </a>
          </div>
        </section>

        {/* Core Technologies */}
        <section>
          <SectionHeader title="Core Technologies" icon={Code} />
          <div className="px-4">
            <TechGrid technologies={technologies} />
          </div>
        </section>

        {/* Work Experience */}
        <section>
          <SectionHeader title="Work Experience" icon={Briefcase} />
          <div className="space-y-8">
            {workExperience.map((job, index) => (
              <div
                key={job.id || index}
                className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 shadow-md hover:shadow-lg transition duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {job.title}
                </h3>
                <p className="text-cyan-500 text-sm mb-2">{job.company}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  {job.period}
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  {job.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <SectionHeader title="Education" icon={GraduationCap} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <div
                key={edu.id || index}
                className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {edu.degree}
                </h3>
                <p className="text-cyan-500 text-sm mb-1">{edu.school}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {edu.period}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section>
          <SectionHeader title="Certifications" icon={Award} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={cert.id || index}
                className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {cert.name}
                </h3>
                <p className="text-cyan-500 text-sm">{cert.issuer}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {cert.date}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default AboutPage;