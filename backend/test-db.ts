import { Pool } from "pg";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://stephen@localhost:5432/stephenjacobsio"
});

async function testConnection() {
  try {
    // Test basic connection
    const timeResult = await pool.query('SELECT NOW()');
    console.log('✅ Database connected successfully at', timeResult.rows[0].now);
    
    // List all tables in the public schema
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('📋 Tables in the database:');
    tablesResult.rows.forEach(row => {
      console.log(`- ${row.table_name}`);
    });
    
    // Try to query the blog_post table
    try {
      console.log('🔍 Attempting to query blog_post table...');
      const blogPostResult = await pool.query('SELECT COUNT(*) FROM blog_post');
      console.log(`✅ Successfully queried blog_post table. Found ${blogPostResult.rows[0].count} records.`);
    } catch (error) {
      console.error('❌ Error querying blog_post table:', error);
    }
    
    // Try with double quotes
    try {
      console.log('🔍 Attempting to query "blog_post" table with quotes...');
      const blogPostResult = await pool.query('SELECT COUNT(*) FROM "blog_post"');
      console.log(`✅ Successfully queried "blog_post" table with quotes. Found ${blogPostResult.rows[0].count} records.`);
    } catch (error) {
      console.error('❌ Error querying "blog_post" table with quotes:', error);
    }
    
  } catch (error) {
    console.error('❌ Database connection error:', error);
  } finally {
    // Close the pool
    await pool.end();
  }
}

// Run the test
testConnection().catch(console.error);
