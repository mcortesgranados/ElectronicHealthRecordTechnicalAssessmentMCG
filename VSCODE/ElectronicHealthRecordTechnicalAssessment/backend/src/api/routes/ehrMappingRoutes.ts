/**
 * 🏗️ EhrMapping Routes - Express Router for EHR Mapping Operations
 *
 * This module sets up the routes for handling HTTP requests related to EHR mappings. 
 * It defines the HTTP endpoints and connects them to the appropriate controller methods.
 * This module is the final part of the "Adapter" side in the Hexagonal Architecture 
 * and is responsible for connecting the outside world (HTTP) to the inner application logic.
 *
 * 🏛️ **Role in Hexagonal Architecture:**
 * - 🎯 **Adapter Layer (HTTP Adapter):** This router acts as an interface adapter, converting 
 *   HTTP requests into service calls and then sending the response back to the client.
 * - 🔌 **Entry Point to the Application Layer:** It connects the external HTTP requests to the 
 *   internal application layer (controller and service).
 * - 🛠 **Dependencies Injection:** It injects the `EhrMappingRepository` into the service, 
 *   the service into the controller, and then wires up the controller methods to the routes.
 * - 🧩 **Separation of Concerns:** By using this router, the HTTP-specific code (request/response) 
 *   is kept separate from the core business logic.
 */

/**
 * 🎯 **Routes Setup:**
 * - **POST `/`**: Creates a new EHR mapping entry.
 *   - Calls `create()` method on `EhrMappingController`.
 *   - Uses `EhrMappingService` for business logic and `EhrMappingRepository` for data persistence.
 */

/**
 * 🛠 **Router Initialization:**
 * - Initializes dependencies:
 *   - `EhrMappingRepositoryImpl`: The implementation of the repository responsible for data storage.
 *   - `EhrMappingService`: Orchestrates the business logic related to EHR mappings.
 *   - `EhrMappingController`: Handles HTTP requests and invokes the service methods.
 * - Defines the HTTP POST endpoint to handle the creation of EHR mappings.
 */

// Initialize the router
const router = express.Router();

// Instantiate the repository, service, and controller
const ehrMappingRepository = new EhrMappingRepositoryImpl();
const ehrMappingService = new EhrMappingService(ehrMappingRepository);
const ehrMappingController = new EhrMappingController(ehrMappingService);

// Define the POST route for creating a new EHR mapping
router.post("/", (req, res) => ehrMappingController.create(req, res));

// Export the router to be used in the main app
export default router;
