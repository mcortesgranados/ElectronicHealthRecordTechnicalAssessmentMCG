import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';



// Load environment variables from .env
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });


/**
 * Check if environment variables are loaded
 */
/*
if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_HOST || !process.env.DB_PORT) {
  console.error('❌ ERROR: Missing database environment variables! Check your .env file.');
  process.exit(1); // Stop execution
}*/

console.log("🔍 Database Connection Details:");
console.log(`   - DB_NAME: ${process.env.DB_NAME}`);
console.log(`   - DB_USER: ${process.env.DB_USER}`);
console.log(`   - DB_HOST: ${process.env.DB_HOST}`);
console.log(`   - DB_PORT: ${process.env.DB_PORT}`);

/*
export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: Number(process.env.DB_PORT),
    logging: false, // Set to true for debugging SQL queries
  }
);
*/
/**
 * Hardcoded database connection parameters.
 * Replace these values with your actual database credentials.
 */
const DB_NAME = 'ehr_system';   // Change to your database name
const DB_USER = 'root';          // Change to your database username
const DB_PASSWORD = 'root'; // Change to your database password
const DB_HOST = 'localhost';     // Change to your database host (e.g., '127.0.0.1' or 'my-db-host.com')
const DB_PORT = 3306;            // Change to your MySQL port (default: 3306)

console.log("🔍 Using hardcoded database configuration:");
console.log(`   - DB_NAME: ${DB_NAME}`);
console.log(`   - DB_USER: ${DB_USER}`);
console.log(`   - DB_HOST: ${DB_HOST}`);
console.log(`   - DB_PORT: ${DB_PORT}`);

/**
 * Initializes Sequelize with hardcoded database connection settings.
 */
export const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  {
    host: DB_HOST,
    dialect: 'mysql',
    port: DB_PORT,
    logging: false, // Set to true for debugging SQL queries
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ Database connection successful!'))
  .catch(err => console.error('❌ Database connection failed:', err));
