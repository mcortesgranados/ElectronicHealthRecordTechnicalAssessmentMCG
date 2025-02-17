// Import necessary modules
import dotenv from "dotenv"; // Loads environment variables from a .env file
import path from "path"; // Handles and resolves file paths
import express from "express"; // Web framework for handling HTTP requests
import mysql from "mysql2/promise"; // MySQL client supporting async/await
import auditLogRoutes from "./api/routes/auditLogs"; // Routes for audit log operations
import patientRoutes from "./api/routes/patientRoutes"; // Routes for audit log operations
import ehrMappingRoutes from "./api/routes/ehrMappingRoutes"; // Routes for audit log operations
import patientResponseRoutes from "./api/routes/patientResponseRoutes";


// Load environment variables from the .env file located at the project root
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Log environment variables to verify their values are loaded correctly
console.log("Database Host:", process.env.DB_HOST);
console.log("Database User:", process.env.DB_USER);
console.log("Database Port:", process.env.DB_PORT);

/**
 * Database configuration settings.
 * 
 * The values are retrieved from environment variables, ensuring flexibility
 * for different environments (development, staging, production).
 */
const dbConfig = {
  host: process.env.DB_HOST || "localhost", // Database host
  user: process.env.DB_USER || "root", // Database username
  password: process.env.DB_PASSWORD || "", // Database password
  database: process.env.DB_NAME || "test", // Database name
  port: Number(process.env.DB_PORT) || 3306, // Database port (default: 3306 for MySQL)
};

/**
 * @function checkDatabaseConnection
 * @description Ensures that the MySQL database connection is established before starting the server.
 * 
 * ## How It Works:
 * - The function tries to establish a connection with the database.
 * - If the connection fails, it retries up to `retries` times with a delay between attempts.
 * - If all attempts fail, the process exits to prevent starting a server without a database.
 * 
 * @param {number} retries - Number of retry attempts before exiting (default: 3)
 * @param {number} delay - Delay between retry attempts in milliseconds (default: 3000ms)
 */
async function checkDatabaseConnection(retries = 3, delay = 3000): Promise<void> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`🔍 Attempt ${attempt}: Checking MySQL database connection...`);
      
      // Create a new MySQL connection instance
      const connection = await mysql.createConnection(dbConfig);
      await connection.ping(); // Ensure the connection is active
      
      console.log("✅ Database connection successful!");
      await connection.end(); // Close connection after validation
      return;
    } catch (error) {
      console.error(`❌ Attempt ${attempt} failed: ${(error as Error).message}`);
      
      if (attempt < retries) {
        console.log(`🔄 Retrying in ${delay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, delay)); // Wait before retrying
      } else {
        console.error("❌ All attempts failed. Exiting...");
        process.exit(1); // Exit process if the database connection is not available
      }
    }
  }
}

/**
 * @function startServer
 * @description Starts the Express server after ensuring the database is connected.
 * 
 * ## How It Works:
 * - Calls `checkDatabaseConnection()` to verify database availability.
 * - If the database connection is successful:
 *   1. Creates an Express application.
 *   2. Sets up middleware to handle JSON requests.
 *   3. Mounts API routes for audit log operations.
 *   4. Starts the server on the defined port.
 */
async function startServer() {
  try {
    await checkDatabaseConnection(); // Validate DB connection before starting the server

    // Create an Express application instance
    const app = express();
    
    // Middleware to parse incoming JSON requests
    app.use(express.json());

    // Mount audit log routes under the `/api` prefix
    app.use("/api", auditLogRoutes);
    app.use("/api/patients", patientRoutes);
    app.use("/ehrmappings", ehrMappingRoutes);
    app.use("/patient-response", patientResponseRoutes);
    

    // Define the port number for the Express server (from .env or default to 3000)
    const PORT = process.env.PORT || 3000;

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
}

// Run the application
startServer();
