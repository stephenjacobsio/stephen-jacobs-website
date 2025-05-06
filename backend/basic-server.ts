import express, { Request, Response, NextFunction } from "express";
import { Pool } from "pg";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const port = 5001;

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  credentials: false
}));

// Handle preflight requests
app.options('*', cors());

// Database connection pool
const pool = new Pool({
  connectionString: "postgres://stephen@localhost:5432/stephenjacobsio"
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection error:', err);
  } else {
    console.log('✅ Database connected successfully at', res.rows[0].now);
  }
});

// API Routes
const apiRouter = express.Router();

// Blog Posts endpoints
apiRouter.get("/blog-posts", async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM "blog_post"');
    
    // Add empty tags array to each blog post
    const blogPosts = result.rows.map(post => ({
      ...post,
      tags: [] // Add empty tags array to prevent frontend errors
    }));
    
    res.json(blogPosts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
});

// Projects endpoints
apiRouter.get("/projects", async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM "project"');
    
    // Add empty technologies array to each project
    const projects = result.rows.map(project => ({
      ...project,
      technologies: [] // Add empty technologies array to prevent frontend errors
    }));
    
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// Technologies endpoints
apiRouter.get("/technologies", async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM "technology"');
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching technologies:", error);
    res.status(500).json({ error: "Failed to fetch technologies" });
  }
});

// Work Experience endpoints
apiRouter.get("/work-experience", async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM "work_experience"');
    
    // Add description array to each work experience
    const workExperience = result.rows.map(job => ({
      ...job,
      description: job.description ? job.description.split('\n') : [] // Convert description to array or provide empty array
    }));
    
    res.json(workExperience);
  } catch (error) {
    console.error("Error fetching work experience:", error);
    res.status(500).json({ error: "Failed to fetch work experience" });
  }
});

// Education endpoints
apiRouter.get("/education", async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM "education"');
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching education:", error);
    res.status(500).json({ error: "Failed to fetch education" });
  }
});

// Certifications endpoints
apiRouter.get("/certifications", async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM "certification"');
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching certifications:", error);
    res.status(500).json({ error: "Failed to fetch certifications" });
  }
});

// Social Links endpoints
apiRouter.get("/social-links", async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM "social_link"');
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching social links:", error);
    res.status(500).json({ error: "Failed to fetch social links" });
  }
});

// Mount API router
app.use("/api/v1", apiRouter);

// 404 Not Found middleware
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || "Something went wrong!" });
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
  console.log(`📚 API available at http://localhost:${port}/api/v1`);
});
