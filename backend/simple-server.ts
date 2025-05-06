import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { Client } from "pg";
import cors from "cors";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(express.json());
// Configure CORS to be more permissive
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Add OPTIONS handling for preflight requests
app.options('*', cors());

// Database connection
const client = new Client({
  connectionString: process.env.DATABASE_URL || "postgres://stephen@localhost:5432/stephenjacobsio",
});

// Connect to the database
client.connect()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err: Error) => {
    console.error("❌ Error connecting to database:", err);
    process.exit(1);
  });

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// API Routes
const apiRouter = express.Router();

// Blog Posts endpoints
apiRouter.get("/blog-posts", async (req: Request, res: Response) => {
  try {
    // First, get all blog posts
    const blogPostsResult = await client.query("SELECT * FROM blog_post");
    const blogPosts = blogPostsResult.rows;
    
    // For each blog post, get its tags
    for (const post of blogPosts) {
      try {
        const tagsResult = await client.query(`
          SELECT t.* FROM tag t
          JOIN blog_post_tags_tag bptt ON t.id = bptt."tagId"
          WHERE bptt."blogPostId" = $1
        `, [post.id]);
        
        post.tags = tagsResult.rows;
      } catch (tagError) {
        console.error("Error fetching tags for blog post:", tagError);
        post.tags = []; // Default to empty array if tags can't be fetched
      }
    }
    
    res.json(blogPosts);
  } catch (error: any) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
});

apiRouter.get("/blog-posts/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Get the blog post
    const postResult = await client.query("SELECT * FROM blog_post WHERE id = $1", [id]);
    
    if (postResult.rows.length === 0) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    
    const post = postResult.rows[0];
    
    // Get tags for the post
    try {
      const tagsResult = await client.query(`
        SELECT t.* FROM tag t
        JOIN blog_post_tags_tag bptt ON t.id = bptt."tagId"
        WHERE bptt."blogPostId" = $1
      `, [post.id]);
      
      post.tags = tagsResult.rows;
    } catch (tagError) {
      console.error("Error fetching tags for blog post:", tagError);
      post.tags = []; // Default to empty array if tags can't be fetched
    }
    
    res.json(post);
  } catch (error: any) {
    console.error("Error fetching blog post:", error);
    res.status(500).json({ error: "Failed to fetch blog post" });
  }
});

// Projects endpoints
apiRouter.get("/projects", async (req: Request, res: Response) => {
  try {
    const result = await client.query("SELECT * FROM project");
    res.json(result.rows);
  } catch (error: any) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

apiRouter.get("/projects/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await client.query("SELECT * FROM project WHERE id = $1", [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }
    
    res.json(result.rows[0]);
  } catch (error: any) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

// Technologies endpoints
apiRouter.get("/technologies", async (req: Request, res: Response) => {
  try {
    const result = await client.query("SELECT * FROM technology");
    res.json(result.rows);
  } catch (error: any) {
    console.error("Error fetching technologies:", error);
    res.status(500).json({ error: "Failed to fetch technologies" });
  }
});

// Work Experience endpoints
apiRouter.get("/work-experience", async (req: Request, res: Response) => {
  try {
    const result = await client.query("SELECT * FROM work_experience");
    res.json(result.rows);
  } catch (error: any) {
    console.error("Error fetching work experience:", error);
    res.status(500).json({ error: "Failed to fetch work experience" });
  }
});

// Education endpoints
apiRouter.get("/education", async (req: Request, res: Response) => {
  try {
    const result = await client.query("SELECT * FROM education");
    res.json(result.rows);
  } catch (error: any) {
    console.error("Error fetching education:", error);
    res.status(500).json({ error: "Failed to fetch education" });
  }
});

// Certifications endpoints
apiRouter.get("/certifications", async (req: Request, res: Response) => {
  try {
    const result = await client.query("SELECT * FROM certification");
    res.json(result.rows);
  } catch (error: any) {
    console.error("Error fetching certifications:", error);
    res.status(500).json({ error: "Failed to fetch certifications" });
  }
});

// Social Links endpoints
apiRouter.get("/social-links", async (req: Request, res: Response) => {
  try {
    const result = await client.query("SELECT * FROM social_link");
    res.json(result.rows);
  } catch (error: any) {
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
