import dotenv from "dotenv";
import path from "path";
import express from "express";
import mysql from "mysql2/promise";
import auditLogRoutes from "./api/routes/auditLogs";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

console.log("Database Host:", process.env.DB_HOST);
console.log("Database User:", process.env.DB_USER);
console.log("Database Port:", process.env.DB_PORT);

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "test",
  port: Number(process.env.DB_PORT) || 3306,
};

// Function to check the MySQL database connection
async function checkDatabaseConnection(retries = 3, delay = 3000): Promise<void> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`🔍 Attempt ${attempt}: Checking MySQL database connection...`);
      
      const connection = await mysql.createConnection(dbConfig);
      await connection.ping(); // Ensure the connection is active
      
      console.log("✅ Database connection successful!");
      await connection.end();
      return;
    } catch (error) {
      console.error(`❌ Attempt ${attempt} failed: ${(error as Error).message}`);
      if (attempt < retries) {
        console.log(`🔄 Retrying in ${delay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        console.error("❌ All attempts failed. Exiting...");
        process.exit(1);
      }
    }
  }
}

// Start the server only if the database connection is successful
async function startServer() {
  try {
    await checkDatabaseConnection(); // Validate DB connection before server start

    // Create an Express application
    const app = express();
    
    // Middleware to parse incoming JSON requests
    app.use(express.json());

    // Mount audit log routes under the `/api` prefix
    app.use("/api", auditLogRoutes);

    // Define the port number for the Express server
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
