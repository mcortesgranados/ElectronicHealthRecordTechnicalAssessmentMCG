/**
 * @file AuditLogRepository.ts
 * @description This repository provides methods to interact with the `audit_logs` table in the database.
 * 
 * ### Role in Hexagonal Architecture:
 * - **Layer:** This file belongs to the **Infrastructure Layer**.
 * - **Driven Adapter:** It acts as a **data access layer** that provides an abstraction over the database.
 * - **Decoupling:** Ensures that business logic does **not depend on the database implementation**.
 * - **Flexibility:** Facilitates **database migrations** (e.g., switching from MySQL to PostgreSQL) 
 *   with minimal changes in the core business logic.
 * - **Testability:** Abstracting database interactions makes it easier to write **mock tests** for the 
 *   application without requiring an actual database connection.
 * 
 * ### Interaction with Other Layers:
 * - **Application Layer (Use Cases) → Infrastructure Layer (Repository) → Database**
 * - The `AuditLogRepository` exposes **data access methods** for creating and retrieving audit logs.
 * - This repository is injected into **services or use cases** to maintain a **clean separation** 
 *   between business logic and database concerns.
 */

import AuditLog, { AuditLogCreationAttributes } from '../../infra/db/models/AuditLog';

/**
 * Represents a repository for handling audit log entries.
 */
class AuditLogRepository {
  /**
   * Creates a new audit log entry in the database.
   * 
   * @param {Partial<AuditLog>} logData - Partial audit log data received from the application layer.
   * @returns {Promise<AuditLog>} - The created audit log entry.
   * @throws {Error} If required fields are missing.
   * 
   * ### Business Importance:
   * - Ensures that **all system changes are recorded** for auditing and compliance purposes.
   * - Logs critical user actions to provide **traceability** and **security**.
   */
  async createLog(logData: Partial<AuditLog>): Promise<AuditLog> {
    // Validates that all required fields are present
    if (!logData.user_id || !logData.ehr_mapping_id || !logData.action || !logData.changes) {
      throw new Error("Missing required audit log fields");
    }

    // Prepares a valid audit log object to be saved in the database
    const validLogData: AuditLogCreationAttributes = {
      user_id: logData.user_id,
      ehr_mapping_id: logData.ehr_mapping_id,
      action: logData.action,
      changes: logData.changes,
    };

    // Creates a new record in the `audit_logs` table
    return await AuditLog.create(validLogData);
  }

  /**
   * Retrieves all audit log entries from the database.
   * 
   * @returns {Promise<AuditLog[]>} - An array of audit logs.
   * 
   * ### Business Importance:
   * - Provides visibility into system changes.
   * - Enables security teams to review **who made changes and when**.
   */
  async getLogs(): Promise<AuditLog[]> {
    return await AuditLog.findAll();
  }

  /**
   * Retrieves a specific audit log entry by its ID.
   * 
   * @param {string} id - The unique identifier of the audit log entry.
   * @returns {Promise<AuditLog | null>} - The requested audit log entry or `null` if not found.
   * 
   * ### Business Importance:
   * - Allows retrieval of **specific logs for investigations**.
   * - Helps in debugging issues by tracking historical changes.
   */
  async getLogById(id: string): Promise<AuditLog | null> {
    return await AuditLog.findByPk(id);
  }
}

// Exports a singleton instance of the repository to be used across the application
export default new AuditLogRepository();
