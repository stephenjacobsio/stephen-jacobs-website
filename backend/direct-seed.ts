import { DataSource } from "typeorm";
import path from "path";

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

// Create a direct data source with explicit connection details
const DirectDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "stephen",
  password: "",
  database: "stephenjacobsio",
  synchronize: true, // Set to true to create tables automatically
  logging: true,
  entities: [
    Project,
    BlogPost,
    Technology,
    WorkExperience,
    Certification,
    Education,
    Tag,
    SocialLink
  ],
  migrations: [path.join(__dirname, "./migrations/*.ts")],
  subscribers: [],
});

// Helper function to remove ID from objects
const removeId = (obj: any) => {
  const { id, ...rest } = obj;
  return rest;
};

const seedDatabase = async () => {
  try {
    // Initialize database connection
    await DirectDataSource.initialize();
    console.log("📦 Database connection established.");

    // Get repositories
    const projectRepository = DirectDataSource.getRepository(Project);
    const blogPostRepository = DirectDataSource.getRepository(BlogPost);
    const tagRepository = DirectDataSource.getRepository(Tag);
    const technologyRepository = DirectDataSource.getRepository(Technology);
    const workExperienceRepository = DirectDataSource.getRepository(WorkExperience);
    const certificationRepository = DirectDataSource.getRepository(Certification);
    const educationRepository = DirectDataSource.getRepository(Education);
    const socialLinkRepository = DirectDataSource.getRepository(SocialLink);

    // Clear existing data using raw queries to handle foreign key constraints
    console.log("🧹 Clearing existing data...");
    
    // Use a transaction to ensure all operations are atomic
    await DirectDataSource.transaction(async (transactionalEntityManager) => {
      // Disable foreign key checks temporarily
      await transactionalEntityManager.query('SET CONSTRAINTS ALL DEFERRED');
      
      // Clear tables in the correct order to handle dependencies
      await transactionalEntityManager.query('TRUNCATE TABLE "blog_post_tags_tag" CASCADE');
      await transactionalEntityManager.query('TRUNCATE TABLE "blog_post" CASCADE');
      await transactionalEntityManager.query('TRUNCATE TABLE "tag" CASCADE');
      await transactionalEntityManager.query('TRUNCATE TABLE "project" CASCADE');
      await transactionalEntityManager.query('TRUNCATE TABLE "technology" CASCADE');
      await transactionalEntityManager.query('TRUNCATE TABLE "work_experience" CASCADE');
      await transactionalEntityManager.query('TRUNCATE TABLE "certification" CASCADE');
      await transactionalEntityManager.query('TRUNCATE TABLE "education" CASCADE');
      await transactionalEntityManager.query('TRUNCATE TABLE "social_link" CASCADE');
      
      // Re-enable foreign key checks
      await transactionalEntityManager.query('SET CONSTRAINTS ALL IMMEDIATE');
    });

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

      // Remove the id from the post data
      const postDataWithoutId = removeId(postData);
      
      const blogPost = blogPostRepository.create({
        ...postDataWithoutId,
        tags,
      });

      await blogPostRepository.save(blogPost);
    }

    // Seed projects
    console.log("🚀 Seeding projects...");
    for (const project of projects) {
      // Remove the id from the project data
      const projectWithoutId = removeId(project);
      
      const newProject = projectRepository.create(projectWithoutId);
      await projectRepository.save(newProject);
    }

    // Seed technologies
    console.log("💻 Seeding technologies...");
    for (const tech of technologies) {
      // Remove the id from the tech data
      const techWithoutId = removeId(tech);
      
      const newTechnology = technologyRepository.create(techWithoutId);
      await technologyRepository.save(newTechnology);
    }

    // Seed work experiences 
    console.log("💼 Seeding work experiences...");
    for (const experience of workExperience) {
      // Remove the id from the experience data
      const experienceWithoutId = removeId(experience);
      
      const newWorkExperience = workExperienceRepository.create({
        ...experienceWithoutId,
        description: experienceWithoutId.description, // Keep as an array
      });
      await workExperienceRepository.save(newWorkExperience);
    }

    // Seed certifications
    console.log("🏆 Seeding certifications...");
    for (const cert of certifications) {
      // Remove the id from the cert data
      const certWithoutId = removeId(cert);
      
      const newCertification = certificationRepository.create(certWithoutId);
      await certificationRepository.save(newCertification);
    }

    // Seed education
    console.log("🎓 Seeding education...");
    for (const edu of education) {
      // Remove the id from the edu data
      const eduWithoutId = removeId(edu);
      
      const newEducation = educationRepository.create(eduWithoutId);
      await educationRepository.save(newEducation);
    }

    // Seed social links
    console.log("🔗 Seeding social links...");
    for (const link of socialLinks) {
      // Remove the id from the link data
      const linkWithoutId = removeId(link);
      
      const newSocialLink = socialLinkRepository.create(linkWithoutId);
      await socialLinkRepository.save(newSocialLink);
    }

    console.log("✅ Database seeding completed successfully.");
    await DirectDataSource.destroy();
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    if (DirectDataSource.isInitialized) {
      await DirectDataSource.destroy();
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
