import dotenv from "dotenv";

// Load environment variables
dotenv.config();

console.log("DATABASE_URL:", process.env.DATABASE_URL || "Not set");
