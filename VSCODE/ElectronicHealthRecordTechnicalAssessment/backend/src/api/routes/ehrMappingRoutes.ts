/**
 * 🏗️ EHR Mapping Routes Setup
 *
 * This module sets up the routing for handling EHR mapping-related HTTP requests, including 
 * creating new EHR mappings. It acts as the interface adapter between the external HTTP 
 * requests and the application/business logic layer.
 *
 * 🏛️ **Role in Hexagonal Architecture:**
 * - 🎯 **Interface Adapter (Routing Layer):** Acts as the entry point for HTTP requests related 
 *   to EHR mappings, delegating to the `EhrMappingController` for processing.
 * - 🔌 **Decouples HTTP Layer from Business Logic:** Routes HTTP requests to the controller, 
 *   which in turn interacts with the service layer. This keeps HTTP-specific concerns separate 
 *   from the core application logic.
 * - 🚀 **Orchestrates Service and Repository Interaction:** The routes instantiate the controller, 
 *   passing the `EhrMappingService`, which interacts with the `EhrMappingRepositoryImpl` to 
 *   persist data, ensuring a separation of concerns between business logic and data storage.
 * - 🧩 **Flexible and Extensible:** The routing layer is modular, making it easy to add, update, 
 *   or remove routes without affecting the rest of the application.
 */
import express, { Request, Response } from 'express';
import { EhrMappingController } from "../controllers/EhrMappingController";
import { EhrMappingService } from "../services/EhrMappingService";
import { EhrMappingRepositoryImpl } from "../../infrastructure/db/repositories/EhrMappingRepositoryImpl";

// Initialize Router
const router = express.Router();

// Initialize the Repository, Service, and Controller
const ehrMappingRepository = new EhrMappingRepositoryImpl();
const ehrMappingService = new EhrMappingService(ehrMappingRepository);
const ehrMappingController = new EhrMappingController(ehrMappingService);

// Define Routes
router.post("/", (req: Request, res: Response) => ehrMappingController.create(req, res));

// Export the router for use in the main application
export default router;
