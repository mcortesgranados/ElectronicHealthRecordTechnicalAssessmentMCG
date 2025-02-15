import { Router } from 'express';
import AuditLogController from '../controllers/AuditLogController';

/**
 * @file auditLogRoutes.ts
 * @description This file defines the routing configuration for the audit log operations.
 * 
 * ### Role in Hexagonal Architecture:
 * - This file belongs to the **API Layer (Driving Adapter)**.
 * - It acts as an **entry point** for HTTP requests related to audit logs.
 * - It does **not** contain business logic; instead, it delegates requests to the `AuditLogController`, 
 *   which calls the `AuditLogService` to process the logic.
 * - This separation ensures that the **routing layer** only handles request/response management,
 *   while the **service layer** handles the core logic.
 * 
 * ### Interaction with Other Layers:
 * - **Express Router (API Layer) → Controller (Driving Adapter) → Service Layer (Application Core) → Repository (Infrastructure Layer)**
 * - This modular design follows the **Separation of Concerns (SoC)** principle, making the application **maintainable and scalable**.
 */

// Create a new Express Router instance
const router = Router();

/**
 * @route POST /audit-logs
 * @description Creates a new audit log entry.
 * 
 * **Process:**
 * 1. The request body must contain `user_id`, `ehr_mapping_id`, `action`, and `changes`.
 * 2. The request is forwarded to `AuditLogController.createLog`.
 * 3. The controller validates the request and calls the `AuditLogService` to create the log.
 * 4. If successful, returns a `201 Created` response with the new log.
 * 5. If an error occurs, returns a `500 Internal Server Error`.
 * 
 * @returns {Object} JSON response with the created log or an error message.
 */
router.post('/audit-logs', AuditLogController.createLog);

/**
 * @route GET /audit-logs
 * @description Retrieves all audit logs.
 * 
 * **Process:**
 * 1. The request is forwarded to `AuditLogController.getLogs`.
 * 2. The controller fetches logs by calling `AuditLogService.getLogs()`.
 * 3. Returns a `200 OK` response with an array of logs.
 * 4. If an error occurs, returns a `500 Internal Server Error`.
 * 
 * @returns {Array} JSON response with a list of audit logs or an error message.
 */
router.get('/audit-logs', AuditLogController.getLogs);

/**
 * @route GET /audit-logs/:id
 * @description Retrieves a specific audit log by its unique ID.
 * 
 * **Process:**
 * 1. The request must include `id` as a route parameter.
 * 2. The request is forwarded to `AuditLogController.getLogById`.
 * 3. The controller calls `AuditLogService.getLogById(id)` to retrieve the log.
 * 4. If the log is found, returns a `200 OK` response with the log data.
 * 5. If no log is found, returns a `404 Not Found` response.
 * 6. If an error occurs, returns a `500 Internal Server Error`.
 * 
 * @returns {Object} JSON response with the requested log or an error message.
 */
router.get('/audit-logs/:id', AuditLogController.getLogById);

// Export the router to be used in the main application.
export default router;

