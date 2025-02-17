import { Router } from 'express';
import { EhrMappingController } from '../controllers/EhrMappingController';
import { EhrMappingService } from '../../api/services/EhrMappingService';
import { EhrMappingRepositoryImpl } from '../../infrastructure/db/repositories/EhrMappingRepositoryImpl';

// Instantiate the repository, service, and controller
const ehrMappingRepository = new EhrMappingRepositoryImpl();
const ehrMappingService = new EhrMappingService(ehrMappingRepository);
const ehrMappingController = new EhrMappingController(ehrMappingService);

const router = Router();

/**
 * @route POST /ehr-mappings
 * @description Creates a new EhrMapping entry.
 * 
 * ## Role in Hexagonal Architecture:
 * - **Web Layer (Adapter)**: This route acts as the entry point for HTTP requests coming from external clients (e.g., frontend).
 * - It is an **adapter** that translates external HTTP requests into the corresponding service method, in this case, calling the `create` method on `EhrMappingController`.
 * - The route does not contain any business logic; it simply delegates the processing to the **Application Layer** via `EhrMappingController`.
 * - The **Application Layer** (through the `EhrMappingService`) handles the creation logic, ensuring business rules are followed.
 * 
 * ## Why It Exists:
 * - To provide an HTTP interface for creating a new EhrMapping in the system.
 * - The route is decoupled from the business logic, allowing flexibility in handling EhrMapping data.
 * 
 * ## Example:
 * - An external client sends a POST request with the data to `/ehr-mappings`, which is then processed by the controller and service.
 */
router.post('/ehr-mappings', (req, res) => ehrMappingController.create(req, res));
router.get('/ehr-mappings/ehr-name/:ehrName', (req, res) => ehrMappingController.findByEhrName(req, res));


/**
 * @route GET /ehr-mappings/:id
 * @description Retrieves a specific EhrMapping by its unique ID.
 * 
 * ## Role in Hexagonal Architecture:
 * - **Web Layer (Adapter)**: This route acts as the adapter that transforms the HTTP request into a call to the **Application Layer** via `EhrMappingController`.
 * - It does not perform any logic beyond routing the request. It delegates the operation to the `EhrMappingService` via the controller.
 * - The **Application Layer** is responsible for handling the retrieval of an EhrMapping's data and enforcing the business rules.
 * 
 * ## Why It Exists:
 * - To provide an HTTP interface for retrieving an EhrMapping by its unique ID.
 * - This route allows external clients to query the system for specific EhrMapping data without exposing any internal logic.
 * 
 * ## Example:
 * - An external client sends a GET request to `/ehr-mappings/:id`, and the controller retrieves the EhrMapping via the service layer.
 */

export default router;
