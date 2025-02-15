import dotenv from "dotenv";  // Load dotenv at the very top
dotenv.config();  // Load environment variables from .env file

import express from "express";
import auditLogRoutes from "./api/routes/auditLogs";

/**
 * @file server.ts
 * @description This is the main entry point of the application.
 * 
 * ### Role in Hexagonal Architecture:
 * - This file is part of the **Infrastructure Layer**.
 * - It sets up the **Express server**, configures middleware, and integrates the API routes.
 * - It acts as the **primary adapter** that allows external clients (e.g., frontend, third-party services) 
 *   to communicate with the application.
 * - This file **should not contain business logic**; its role is to bootstrap the application 
 *   and define global configurations.
 * 
 * ### Interaction with Other Layers:
 * - **Client (External Systems) → Express Server (Infrastructure Layer) → API Router (Driving Adapter) → Controller (Application Layer) → Services (Domain Layer) → Repository (Data Layer)**
 * - This architecture ensures that the **server remains decoupled from business logic**, making it **scalable and maintainable**.
 */

// Create an instance of an Express application
const app = express();

// Middleware to parse incoming JSON requests.
app.use(express.json());

// Mount audit log routes under the `/api` prefix
app.use("/api", auditLogRoutes);

// Define the port number for the Express server
const PORT = process.env.PORT || 3000;

// Log environment variables (for debugging)
console.log("Database Host:", process.env.DB_HOST);
console.log("Database User:", process.env.DB_USER);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
