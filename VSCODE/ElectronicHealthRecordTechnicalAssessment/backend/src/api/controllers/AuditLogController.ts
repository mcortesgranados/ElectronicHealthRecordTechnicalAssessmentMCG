import { Request, Response } from 'express';
import AuditLogService from '../services/AuditLogService';

/**
 * @class AuditLogController
 * @description Controller for handling audit logs in the system.
 * This class follows the principles of Hexagonal Architecture by serving as a 
 * Driving Adapter (or Primary Adapter) in the API layer. 
 * 
 * ### Role in Hexagonal Architecture:
 * - **Handles HTTP Requests:** Acts as an entry point for external clients (frontend, services).
 * - **Delegates Business Logic:** Calls the `AuditLogService` to execute operations, ensuring the controller 
 *   remains free of business logic.
 * - **Formats Responses:** Returns JSON responses and handles errors with appropriate HTTP status codes.
 * - **Decouples Infrastructure from Business Logic:** Interacts only with the service layer, 
 *   avoiding direct database access.
 * 
 * ### Interaction with Other Layers:
 * - **API Layer (Controller) → Application Layer (Service) → Infrastructure Layer (Database/Repositories)**
 * - This design ensures separation of concerns, maintainability, and testability.
 */
class AuditLogController {
  
  /**
   * @method createLog
   * @description Creates a new audit log entry.
   * 
   * **Process:**
   * 1. Extracts `user_id`, `ehr_mapping_id`, `action`, and `changes` from request body.
   * 2. Calls `AuditLogService.createLog` to process the request.
   * 3. Returns the newly created log in JSON format with a `201 Created` status.
   * 4. If an error occurs, returns a `500 Internal Server Error` response.
   * 
   * @param {Request} req - Express request object containing the log details in the body.
   * @param {Response} res - Express response object for sending the response.
   * @returns {Promise<Response>} JSON response with the created log or an error message.
   */
  async createLog(req: Request, res: Response): Promise<Response> {
    try {
      const { user_id, ehr_mapping_id, action, changes } = req.body;
      const log = await AuditLogService.createLog(user_id, ehr_mapping_id, action, changes);
      return res.status(201).json(log);
    } catch (error) {
      return res.status(500).json({ message: 'Error creating audit log', error });
    }
  }

  /**
   * @method getLogs
   * @description Retrieves all audit logs stored in the system.
   * 
   * **Process:**
   * 1. Calls `AuditLogService.getLogs` to fetch the list of logs.
   * 2. Returns the logs in JSON format with a `200 OK` status.
   * 3. If an error occurs, returns a `500 Internal Server Error` response.
   * 
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @returns {Promise<Response>} JSON response with the list of logs or an error message.
   */
  async getLogs(req: Request, res: Response): Promise<Response> {
    try {
      const logs = await AuditLogService.getLogs();
      return res.status(200).json(logs);
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving audit logs', error });
    }
  }

  /**
   * @method getLogById
   * @description Retrieves a specific audit log entry by its ID.
   * 
   * **Process:**
   * 1. Extracts `id` from request parameters.
   * 2. Calls `AuditLogService.getLogById(id)` to fetch the log.
   * 3. If the log is found, returns it with a `200 OK` status.
   * 4. If no log is found, returns a `404 Not Found` response.
   * 5. If an error occurs, returns a `500 Internal Server Error` response.
   * 
   * @param {Request} req - Express request object, expects `id` as a route parameter.
   * @param {Response} res - Express response object.
   * @returns {Promise<Response>} JSON response with the requested log or an error message.
   */
  async getLogById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const log = await AuditLogService.getLogById(id);
      if (!log) return res.status(404).json({ message: 'Log not found' });
      return res.status(200).json(log);
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving log', error });
    }
  }
}

export default new AuditLogController();
