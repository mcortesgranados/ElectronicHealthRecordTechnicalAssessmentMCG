/**
 * AuditLog Model - Represents audit logs in the system.
 * 
 * This model is responsible for storing logs related to user actions within the application.
 * It captures essential metadata such as the user performing the action, the entity affected,
 * the type of action performed, and any changes made.
 * 
 * In a hexagonal architecture, this model belongs to the infrastructure layer.
 * It serves as an interface between the database (persistence) and the domain logic,
 * ensuring a clean separation between business logic and persistence concerns.
 */

import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './config/database'; 

/**
 * AuditLogAttributes - Defines the structure of an audit log entry.
 * This interface describes the shape of a log record stored in the database.
 */
export interface AuditLogAttributes {
  /**
   * Unique identifier for the audit log entry.
   */
  id: string;
  
  /**
   * Identifier of the user who performed the action (optional).
   */
  user_id?: string;
  
  /**
   * Identifier of the entity (e.g., EHR mapping) that was affected (optional).
   */
  ehr_mapping_id?: string;
  
  /**
   * Description of the action performed (e.g., "Update Record").
   */
  action: string;
  
  /**
   * JSON object representing the changes made (optional).
   */
  changes?: object;
  
  /**
   * Timestamp of when the action was recorded (optional, defaults to the current time).
   */
  created_at?: Date;
}

/**
 * AuditLogCreationAttributes - Defines attributes required for creating a new audit log entry.
 * Since 'id' is auto-generated, it is marked as optional for creation.
 */
interface AuditLogCreationAttributes extends Optional<AuditLogAttributes, 'id'> {}

/**
 * AuditLog - Represents the audit_logs table in the database.
 * This class extends Sequelize's Model class, mapping TypeScript interfaces to the database schema.
 */
class AuditLog extends Model<AuditLogAttributes, AuditLogCreationAttributes> implements AuditLogAttributes {
  public id!: string;
  public user_id?: string;
  public ehr_mapping_id?: string;
  public action!: string;
  public changes?: object;
  public created_at?: Date;
}

/**
 * Initializes the Sequelize model for the audit_logs table.
 * Defines the table structure and constraints.
 */
AuditLog.init(
  {
    /** Unique identifier for each log entry (UUID). */
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    /** ID of the user who performed the action (optional). */
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    /** ID of the affected entity (e.g., an EHR mapping) (optional). */
    ehr_mapping_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    /** Description of the action performed. */
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    /** JSON object detailing changes made (optional). */
    changes: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    /** Timestamp of when the log entry was created (defaults to the current time). */
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize, // Sequelize instance for database connection
    tableName: 'audit_logs', // Table name in the database
    timestamps: false, // Disables automatic createdAt/updatedAt timestamps
  }
);

export { AuditLog, AuditLogCreationAttributes };
export default AuditLog;


/**
 * Role in Hexagonal Architecture:
 * ----------------------------------
 * - This model is part of the **Infrastructure layer**, responsible for persistence.
 * - It is accessed via the **repository layer** (AuditLogRepository), ensuring a separation between data storage and business logic.
 * - The **service layer** (AuditLogService) interacts with this repository, applying business rules before accessing the database.
 * - The **controller layer** (AuditLogController) provides API endpoints that interact with the service.
 * - This layered approach promotes scalability, testability, and maintainability.
 */
