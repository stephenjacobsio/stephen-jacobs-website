import { AppDataSource } from "./data-source";

// Import entities
import { Project } from "./entities/Project";
import { BlogPost } from "./entities/BlogPost";
import { Technology } from "./entities/Technology";
import { WorkExperience } from "./entities/WorkExperience";
import { Certification } from "./entities/Certification";
import { Education } from "./entities/Education";
import { Tag } from "./entities/Tag";
import { SocialLink } from "./entities/SocialLink";

// Import mock data from /backend/data/
import { projects } from "./data/projects";
import { blogPosts } from "./data/blog-posts";
import { technologies } from "./data/technologies";
import { workExperience } from "./data/work-experience";
import { certifications } from "./data/certifications";
import { education } from "./data/education";
import { socialLinks } from "./data/social-links";

const seedDatabase = async () => {
  try {
    // Initialize database connection
    await AppDataSource.initialize();
    console.log("📦 Database connection established.");

    // Get repositories
    const projectRepository = AppDataSource.getRepository(Project);
    const blogPostRepository = AppDataSource.getRepository(BlogPost);
    const tagRepository = AppDataSource.getRepository(Tag);
    const technologyRepository = AppDataSource.getRepository(Technology);
    const workExperienceRepository = AppDataSource.getRepository(WorkExperience);
    const certificationRepository = AppDataSource.getRepository(Certification);
    const educationRepository = AppDataSource.getRepository(Education);
    const socialLinkRepository = AppDataSource.getRepository(SocialLink);

    // Clear existing data
    console.log("🧹 Clearing existing data...");
    await Promise.all([
      projectRepository.clear(),
      blogPostRepository.clear(),
      tagRepository.clear(),
      technologyRepository.clear(),
      workExperienceRepository.clear(),
      certificationRepository.clear(),
      educationRepository.clear(),
      socialLinkRepository.clear(),
    ]);

    // Seed blog posts and tags
    console.log("📝 Seeding blog posts...");
    const tagMap = new Map<string, Tag>();
    for (const postData of blogPosts) {
      const tags: Tag[] = [];

      if (Array.isArray(postData.tags)) {
        for (const tagData of postData.tags) {
          if (tagData && tagData.name) {
            let tag = tagMap.get(tagData.name);
            if (!tag) {
              tag = tagRepository.create({ name: tagData.name });
              await tagRepository.save(tag);
              tagMap.set(tagData.name, tag);
            }
            tags.push(tag);
          }
        }
      }

      const blogPost = blogPostRepository.create({
        ...postData,
        tags,
      });

      await blogPostRepository.save(blogPost);
    }

    // Seed projects
    console.log("🚀 Seeding projects...");
    for (const project of projects) {
      const newProject = projectRepository.create(project);
      await projectRepository.save(newProject);
    }

    // Seed technologies
    console.log("💻 Seeding technologies...");
    for (const tech of technologies) {
      const newTechnology = technologyRepository.create(tech);
      await technologyRepository.save(newTechnology);
    }

    // Seed work experiences 
    for (const experience of workExperience) {
      const newWorkExperience = workExperienceRepository.create({
        ...experience,
        description: experience.description, // Keep as an array
      });
      await workExperienceRepository.save(newWorkExperience);
    }

    // Seed certifications
    console.log("🏆 Seeding certifications...");
    for (const cert of certifications) {
      const newCertification = certificationRepository.create(cert);
      await certificationRepository.save(newCertification);
    }

    // Seed education
    console.log("🎓 Seeding education...");
    for (const edu of education) {
      const newEducation = educationRepository.create(edu);
      await educationRepository.save(newEducation);
    }

    // Seed social links
    console.log("🔗 Seeding social links...");
    for (const link of socialLinks) {
      const newSocialLink = socialLinkRepository.create(link);
      await socialLinkRepository.save(newSocialLink);
    }

    console.log("✅ Database seeding completed successfully.");
    await AppDataSource.destroy();
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
    process.exit(1);
  }
};

// Execute the seed function
seedDatabase()
  .then(() => {
    console.log("🌱 Seeding process completed.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Failed to seed database:", error);
    process.exit(1);
  });