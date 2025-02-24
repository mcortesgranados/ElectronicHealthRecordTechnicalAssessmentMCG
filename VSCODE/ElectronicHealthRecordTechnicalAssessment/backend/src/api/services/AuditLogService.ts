/**
 * AuditLogService - Business Logic Layer for Audit Logs.
 * 
 * This service class is responsible for handling business logic related to audit logs.
 * It interacts with `AuditLogRepository` to persist and retrieve audit logs, ensuring
 * that all operations comply with application rules before accessing the database.
 * 
 * Role in Hexagonal Architecture:
 * ----------------------------------
 * - Application (Service) Layer: This class serves as the intermediary between the controller (API layer) 
 *   and the repository (database layer). It ensures business logic is applied before any database interaction.
 * - Decouples business logic from persistence: Instead of accessing the database directly, controllers
 *   communicate with this service, which in turn interacts with the repository.
 * - Enhances maintainability: Changes in database logic do not affect the controller or other parts
 *   of the application.
 * - Improves testability:** The service can be unit tested with mock repositories, reducing dependencies 
 *   on actual database connections.
 */

import AuditLogRepository from '../repositories/AuditLogRepository';

/**
 * AuditLogService - Handles audit log business logic and validation.
 */
class AuditLogService {
  /**
   * Creates a new audit log entry.
   * 
   * @param {string} user_id - The ID of the user who performed the action.
   * @param {string} ehr_mapping_id - The ID of the affected EHR mapping entity.
   * @param {string} action - The type of action performed (e.g., "Update Record").
   * @param {object} changes - A JSON object representing the changes made.
   * @returns {Promise<AuditLog>} The created audit log record.
   * 
   * Example:
   * ```typescript
   * const log = await AuditLogService.createLog(
   *   'user-123', 
   *   'ehr-456', 
   *   'Update Record', 
   *   { field: 'old_value -> new_value' }
   * );
   * console.log(log);
   * ```
   */
  async createLog(user_id: string, ehr_mapping_id: string, action: string, changes: object) {
    return await AuditLogRepository.createLog({ user_id, ehr_mapping_id, action, changes });
  }

  /**
   * Retrieves all audit logs.
   * 
   * @returns {Promise<AuditLog[]>} A list of all audit logs.
   * 
   * Example:
   * ```typescript
   * const logs = await AuditLogService.getLogs();
   * console.log(logs);
   * ```
   */
  async getLogs() {
    return await AuditLogRepository.getLogs();
  }

  /**
   * Retrieves a specific audit log by its unique identifier.
   * 
   * @param {string} id - The unique identifier of the audit log.
   * @returns {Promise<AuditLog | null>} The audit log entry if found, otherwise `null`.
   * 
   * Example:
   * ```typescript
   * const log = await AuditLogService.getLogById('some-uuid');
   * console.log(log);
   * ```
   */
  async getLogById(id: string) {
    return await AuditLogRepository.getLogById(id);
  }
}

// Exporting a singleton instance of the service.
export default new AuditLogService();
