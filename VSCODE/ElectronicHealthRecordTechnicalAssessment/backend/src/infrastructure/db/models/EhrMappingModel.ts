import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../models/config/database"; // Adjust the import if needed

/**
 * 🏗️ EhrMappingModel - Sequelize Model for EHR Field Mappings
 *
 * Represents the persistence layer for mapping internal system question keys 
 * to corresponding fields in an external Electronic Health Record (EHR) system.
 *
 * 🏛️ **Role in Hexagonal Architecture:**
 * - 🎯 **Infrastructure Layer (Persistence Adapter):** Defines how EHR mappings are stored in the database.
 * - 🗄 **Data Persistence Handling:** Maps the `EhrMapping` entity to a relational database.
 * - 🔗 **Bridges Domain and Database:** Used by repositories to interact with the database while keeping the domain layer independent.
 * - 🚀 **Decouples Business Logic from Data Storage:** Ensures that domain logic remains unaffected by database-specific details.
 */

/**
 * 🔹 Attributes for EhrMappingModel (Database Representation)
 */
interface EhrMappingAttributes {
  /**
   * Unique identifier for the EHR mapping.
   * @type {number}
   */
  id: number;

  /**
   * Name of the external EHR system.
   * @type {string}
   * - Example: `"Epic"`, `"Cerner"`, `"Meditech"`
   */
  ehr_name: string;

  /**
   * Internal system's question key representing patient-related data.
   * @type {string}
   * - Example: `"patient_weight"`, `"blood_pressure_systolic"`
   */
  question_key: string;

  /**
   * Corresponding field in the external EHR system.
   * @type {string}
   * - Example: `"ehr_bp_systolic"`, `"ehr_patient_weight"`
   */
  ehr_field: string;

  // created_at?: Date; // Uncomment if timestamps are needed
  // updated_at?: Date;
}

/**
 * 🎯 Defines optional attributes when creating a new mapping (ID is auto-generated).
 */
interface EhrMappingCreationAttributes extends Optional<EhrMappingAttributes, "id"> {}

/**
 * 🏛 Sequelize Model Implementation
 * - Maps `EhrMapping` entities to a database table (`ehr_mappings`).
 */
class EhrMappingModel extends Model<EhrMappingAttributes, EhrMappingCreationAttributes> 
  implements EhrMappingAttributes {
  public id!: number;
  public ehr_name!: string;
  public question_key!: string;
  public ehr_field!: string;
  // public readonly created_at!: Date;
  // public readonly updated_at!: Date;
}

/**
 * 🛠 Initializes the model schema, defining the table structure and attributes.
 */
EhrMappingModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    ehr_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    question_key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ehr_field: {
      type: DataTypes.STRING,
      allowNull: false,
    }, /*,
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },*/
  },
  {
    sequelize,
    tableName: "ehr_mappings",
    timestamps: false, // Enables createdAt and updatedAt automatically
  }
);

export { EhrMappingModel };
