import { drizzle } from 'drizzle-orm/mysql2';
import { sql } from 'drizzle-orm';
import mysql from 'mysql2/promise';
import * as schema from './schema';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'cryptoinvestment',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
};

// Create MySQL connection pool
export const connection = mysql.createPool(dbConfig);

// Initialize Drizzle ORM
export const db = drizzle(connection, { 
  schema, 
  mode: 'default',
  logger: process.env.NODE_ENV === 'development'
});

// Database connection test function
export const connectDatabase = async (): Promise<void> => {
  try {
    logging.info('🔄 Connecting to MySQL database...');
    
    // Test the connection
    const testConnection = await connection.getConnection();
    
    logging.info('✅ Successfully connected to MySQL database');
    logging.info(`📊 Database: ${process.env.DB_NAME}`);
    logging.info(`🏠 Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    
    // Release the test connection
    testConnection.release();
    
    // Test a simple query with Drizzle
    const result = await db.execute(sql`SELECT 1 as test`);
    logging.info('✅ Drizzle ORM connection verified');
    
  } catch (error) {
    logging.error('❌ Error connecting to database:', error);
    logging.error('💡 Make sure MySQL is running and credentials are correct');
    
    // In development, don't exit the process
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    } else {
      logging.warn('⚠️  Running in development mode - continuing without database');
    }
  }
};

// Graceful shutdown handler
export const closeDatabase = async (): Promise<void> => {
  try {
    await connection.end();
    logging.info('✅ Database connections closed');
  } catch (error) {
    logging.error('❌ Error closing database connections:', error);
  }
};

// Export types for use in other files
export type Database = typeof db;
export * from './schema';
