/**
 * AuditLogRepository - Data Access Layer for Audit Logs.
 * 
 * This repository provides an abstraction over database interactions for audit logs.
 * It follows the Repository Pattern, allowing for better separation of concerns,
 * improved testability, and maintainability.
 *
 * Role in Hexagonal Architecture:
 * ----------------------------------
 * - Infrastructure Layer: This class interacts with the `AuditLog` model to persist data.
 * - Repository Layer: Acts as an intermediary between the database model (`AuditLog`) and the service layer (`AuditLogService`).
 * - Service Layer Dependency: The `AuditLogService` calls this repository to fetch and store audit logs, ensuring business logic is decoupled from database operations.
 * - Benefits:
 *   - Encapsulation of data access logic, preventing direct database access from service and controller layers.
 *   - Enhances maintainability, allowing easy switching between different database technologies.
 *   - Supports testability, enabling mock repositories for unit testing.
 */

import AuditLog from '../../infra/db/models/AuditLog';

/**
 * AuditLogRepository - Handles all database interactions for audit logs.
 */
class AuditLogRepository {
  /**
   * Creates a new audit log entry in the database.
   * 
   * @param {Partial<AuditLog>} logData - Data required to create an audit log entry.
   * @returns {Promise<AuditLog>} The newly created audit log record.
   * 
   * Example:
   * ```typescript
   * const log = await AuditLogRepository.createLog({
   *   user_id: '123',
   *   ehr_mapping_id: '456',
   *   action: 'Update Record',
   *   changes: { field: "old_value -> new_value" }
   * });
   * ```
   */
  async createLog(logData: Partial<AuditLog>): Promise<AuditLog> {
    return await AuditLog.create(logData);
  }

  /**
   * Retrieves all audit logs from the database.
   * 
   * @returns {Promise<AuditLog[]>} An array of audit logs.
   * 
   * Example:
   * ```typescript
   * const logs = await AuditLogRepository.getLogs();
   * console.log(logs);
   * ```
   */
  async getLogs(): Promise<AuditLog[]> {
    return await AuditLog.findAll();
  }

  /**
   * Retrieves a specific audit log by its unique identifier.
   * 
   * @param {string} id - The unique identifier of the audit log.
   * @returns {Promise<AuditLog | null>} The audit log record, or `null` if not found.
   * 
   * Example:
   * ```typescript
   * const log = await AuditLogRepository.getLogById('some-uuid');
   * console.log(log);
   * ```
   */
  async getLogById(id: string): Promise<AuditLog | null> {
    return await AuditLog.findByPk(id);
  }
}

// Exporting a singleton instance of the repository.
export default new AuditLogRepository();
