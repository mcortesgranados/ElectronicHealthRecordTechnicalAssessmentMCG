import { Model, DataTypes } from 'sequelize';
import { sequelize } from './config/database'; 

/**
 * @class Patient
 * @extends Model
 * 
 * @description
 * This class represents the `Patient` entity in the system and is part of the **Infrastructure Layer**
 * in the **Hexagonal Architecture** (also known as Ports and Adapters Architecture).
 * 
 * The **Infrastructure Layer** is responsible for interacting with external systems such as databases,
 * APIs, and messaging queues. This class defines the database model using Sequelize ORM to map the
 * `patients` table to the application.
 * 
 * ## Role in Hexagonal Architecture:
 * - **Infrastructure Layer**: It provides the implementation details for persistence.
 * - **Adapter**: This class acts as an adapter that allows the application to interact with the
 *   underlying database.
 * - **Decoupling**: The business logic (domain layer) does not directly depend on Sequelize or any
 *   database implementation. Instead, it relies on abstractions (repositories).
 * - **Persistence Concern**: This class should not contain business logic; it only defines how
 *   data is stored and retrieved.
 */
export class Patient extends Model {
  public id!: number;
  public name!: string;
  public gender!: string;
  public dob!: Date;
  public address!: string;
  public phone!: string | null;
  public email!: string | null;
  public emergency_contact!: string | null;
  public insurance_provider!: string | null;
  public insurance_policy_number!: string | null;
  public primary_care_physician!: string | null;
  public allergies!: string | null;
  public current_medications!: string | null;
  public medical_history!: string | null;
  public social_history!: string | null;
  public family_history!: string | null;
  public ehr_name!: string;
  public created_at!: Date;
  public updated_at!: Date;

  /**
   * Initializes the database schema for the `Patient` entity.
   * 
   * @description
   * This method defines the structure of the `patients` table and its mappings using Sequelize.
   * It is responsible for ensuring the database schema aligns with the domain model.
   * 
   * ## Hexagonal Architecture Implications:
   * - The domain layer should not be aware of database-specific details.
   * - This class abstracts database interactions so that the domain logic remains agnostic.
   * - If we switch databases (e.g., from PostgreSQL to MongoDB), only the infrastructure layer changes,
   *   while the domain and application layers remain unaffected.
   */
  static initModel() {
    Patient.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        gender: {
          type: DataTypes.ENUM('Male', 'Female', 'Other'),
          allowNull: false,
        },
        dob: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        address: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        phone: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        emergency_contact: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        insurance_provider: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        insurance_policy_number: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        primary_care_physician: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        allergies: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        current_medications: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        medical_history: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        social_history: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        family_history: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        ehr_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: 'patients',
        timestamps: false, // Don't let Sequelize manage created_at and updated_at automatically
        underscored: true,
      }
    );
  }
}
