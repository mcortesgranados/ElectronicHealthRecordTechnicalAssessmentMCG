// Importing necessary modules from Sequelize to define the PatientResponse model.
import { Model, DataTypes } from 'sequelize';
// Importing the configured Sequelize instance to be used for defining models.
import { sequelize } from '../db/models/config/database';

/**
 * PatientResponse Model (Entity) - Represents the patient response data
 * within the system. This model is part of the **Domain Layer** in hexagonal architecture,
 * acting as an abstraction of the **Persistence Layer** (database) for handling patient response records.
 * 
 * It serves as a data structure that is manipulated through the application core,
 * while also providing an interface to the underlying database.
 * 
 * Attributes (Fields):
 * - id: Unique identifier for each patient response.
 * - patientId: The ID of the patient associated with the response.
 * - ehrSystem: The name of the Electronic Health Record system that the response comes from.
 * - mappedData: The actual response data mapped from the EHR system.
 * - submittedAt: Timestamp when the response was submitted.
 * 
 * This model is managed by Sequelize, acting as the ORM that integrates with the database layer.
 * 
 * **Role in Hexagonal Architecture**:
 * - **Domain Layer**: Defines the core entity (PatientResponse) that encapsulates important patient response data.
 * - **Infrastructure Layer**: Managed by Sequelize, this connects the entity to the database and provides the means to persist and retrieve patient response data.
 * - **Adapters**: The model acts as an adapter to the persistence mechanism (Sequelize) which interacts with the database but abstracts the infrastructure details from the core application.
 */
export class PatientResponse extends Model {
  public id!: number;
  public patientId!: number; // camelCase
  public ehrSystem!: string; // camelCase
  public mappedData!: string; // camelCase
  public submittedAt!: Date; // camelCase
}

// Initializing the model and defining its schema (attributes and their types).
PatientResponse.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    patientId: { // This will map to patient_id in DB
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ehrSystem: { // This will map to ehr_system in DB
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    mappedData: { // This will map to mapped_data in DB
      type: DataTypes.TEXT,
      allowNull: false,
    },
    submittedAt: { // This will map to submitted_at in DB
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize, // Your Sequelize instance
    tableName: 'patient_responses', // Specify table name explicitly
    timestamps: false,
    underscored: true, // Ensure snake_case columns in DB
  }
);
