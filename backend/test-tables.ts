import { Pool } from "pg";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://stephen@localhost:5432/stephenjacobsio"
});

async function testTables() {
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
    for (const row of tablesResult.rows) {
      console.log(`- ${row.table_name}`);
      
      // Try to query each table
      try {
        const countResult = await pool.query(`SELECT COUNT(*) FROM "${row.table_name}"`);
        console.log(`  ✅ Successfully queried "${row.table_name}" table. Found ${countResult.rows[0].count} records.`);
      } catch (error: any) {
        console.error(`  ❌ Error querying "${row.table_name}" table:`, error.message);
      }
    }
    
  } catch (error: any) {
    console.error('❌ Database connection error:', error.message);
  } finally {
    // Close the pool
    await pool.end();
  }
}

// Run the test
testTables().catch(error => console.error('Unhandled error:', error));
