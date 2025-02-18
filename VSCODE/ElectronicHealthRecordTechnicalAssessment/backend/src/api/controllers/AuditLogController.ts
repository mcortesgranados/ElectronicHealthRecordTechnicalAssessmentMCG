import { Request, Response } from "express";
import AuditLogService from "../services/AuditLogService";

/**
 * @class AuditLogController
 * @description Handles incoming HTTP requests related to audit logs.
 * 
 * ## Role in Hexagonal Architecture (Ports & Adapters)
 * - This is the **Primary Adapter (Driving Adapter)** in Hexagonal Architecture.
 * - It receives **HTTP Requests** (User Interaction Layer) and interacts with the **Application Core (Use Case Layer)**
 * - It calls the **Service Layer (Use Case)**, which interacts with the **Domain & Persistence Layer (Infrastructure)**
 * - It **never directly accesses the database** but instead delegates the logic to `AuditLogService`.
 * - This ensures **decoupling** between HTTP logic and business logic, making the system flexible for other interfaces (e.g., CLI, gRPC, GraphQL, etc.).
 */
export class AuditLogController {
  
  /**
   * curl --request POST \
  --url http://localhost:3000/api/audit-logs \
  --header 'Content-Type: application/json' \
  --data '{            "user_id": "1",            "ehr_mapping_id": "1",            "action": "1",            "changes": { "field": "1" }          }'
   * 
   * @method createLog
   * @description Handles the creation of an audit log entry.
   * 
   * ## Flow:
   * 1. Validates request payload (ensuring all required fields exist)
   * 2. Calls `AuditLogService.createLog()` to process and store the audit log
   * 3. Returns success or error response
   * 
   * @param req Express request object (expects `user_id`, `ehr_mapping_id`, `action`, and `changes`)
   * @param res Express response object
   * @returns {Promise<void>} Sends JSON response with success or error message
   */
  static async createLog(req: Request, res: Response): Promise<void> {
    try {
      const { user_id, ehr_mapping_id, action, changes } = req.body;

      // Validate request payload
      if (!user_id || !ehr_mapping_id || !action || !changes) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }

      // Delegate the logic to the application service
      const log = await AuditLogService.createLog(user_id, ehr_mapping_id, action, changes);
      
      // Return success response
      res.status(201).json({ message: "Log created successfully", log });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: "Internal Server Error", details: err.message || "Unknown error" });
    }
  }

  /**
   * @method getLogs
   * @description Fetches all audit logs.
   * 
   * ## Flow:
   * 1. Calls `AuditLogService.getLogs()`, which retrieves logs from the **Persistence Layer**
   * 2. Returns the logs in a structured JSON response
   * 
   * @param req Express request object (no parameters required)
   * @param res Express response object
   * @returns {Promise<void>} Sends JSON response containing all logs
   */
  static async getLogs(req: Request, res: Response): Promise<void> {
    try {
      // Retrieve logs from the application service
      const logs = await AuditLogService.getLogs();

      // Return logs
      res.status(200).json({ logs });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: "Internal Server Error", details: err.message || "Unknown error" });
    }
  }

  /**
   * @method getLogById
   * @description Fetches a specific audit log entry by its ID.
   * 
   * ## Flow:
   * 1. Extracts `id` from request parameters
   * 2. Calls `AuditLogService.getLogById(id)` to fetch the log entry
   * 3. Returns the log if found, otherwise returns a `404 Not Found` response
   * 
   * @param req Express request object (expects `id` in the URL parameters)
   * @param res Express response object
   * @returns {Promise<void>} Sends JSON response containing the requested log or an error message
   */
  static async getLogById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Retrieve the log from the service layer
      const log = await AuditLogService.getLogById(id);

      if (!log) {
        res.status(404).json({ error: "Log not found" });
        return;
      }

      // Return the log entry
      res.status(200).json({ log });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: "Internal Server Error", details: err.message || "Unknown error" });
    }
  }
}
