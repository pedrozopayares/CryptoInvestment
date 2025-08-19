import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Environment variables with defaults
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const TEST = NODE_ENV === 'test';
export const DEVELOPMENT = NODE_ENV === 'development';
export const PRODUCTION = NODE_ENV === 'production';

// Server configuration
export const SERVER = {
  SERVER_HOSTNAME: process.env.SERVER_HOSTNAME || 'localhost',
  SERVER_PORT: parseInt(process.env.PORT || '3001'),
};

// Database configuration
export const DATABASE = {
  HOST: process.env.DB_HOST || 'localhost',
  PORT: parseInt(process.env.DB_PORT || '3306'),
  USER: process.env.DB_USER || 'root',
  PASSWORD: process.env.DB_PASSWORD || '',
  NAME: process.env.DB_NAME || 'cryptoinvestment',
};

// API Configuration
export const API = {
  COINMARKETCAP_API_KEY: process.env.COINMARKETCAP_API_KEY || '',
  COINMARKETCAP_BASE_URL: process.env.COINMARKETCAP_BASE_URL || 'https://pro-api.coinmarketcap.com',
};

// Security configuration
export const SECURITY = {
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret-key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
};

// CORS configuration
export const CORS = {
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
};

// Validation for production
if (PRODUCTION) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET must be defined in production');
  }
  
  if (!process.env.DB_PASSWORD) {
    throw new Error('DB_PASSWORD must be defined in production');
  }
  
  if (!process.env.COINMARKETCAP_API_KEY) {
    console.warn('⚠️  COINMARKETCAP_API_KEY not defined - external API calls will fail');
  }
}

// Log configuration on startup (development only)
if (DEVELOPMENT && !TEST) {
  console.log('🔧 Configuration loaded:', {
    NODE_ENV,
    SERVER_PORT: SERVER.SERVER_PORT,
    DB_HOST: DATABASE.HOST,
    DB_NAME: DATABASE.NAME,
    HAS_API_KEY: !!API.COINMARKETCAP_API_KEY,
  });
}

export default {
  NODE_ENV,
  TEST,
  DEVELOPMENT,
  PRODUCTION,
  SERVER,
  DATABASE,
  API,
  SECURITY,
  CORS
};
