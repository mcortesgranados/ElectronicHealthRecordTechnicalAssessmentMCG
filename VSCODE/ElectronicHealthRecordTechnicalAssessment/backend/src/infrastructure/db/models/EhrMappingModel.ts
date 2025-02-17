import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../models/config/database"; // Adjust the import if needed

interface EhrMappingAttributes {
  id: number;
  ehr_name: string;
  question_key: string;
  ehr_field: string;
  //created_at?: Date;
  //updated_at?: Date;
}

// Optional fields for creation
interface EhrMappingCreationAttributes extends Optional<EhrMappingAttributes, "id"> {}

// Define the model
class EhrMappingModel extends Model<EhrMappingAttributes, EhrMappingCreationAttributes> 
  implements EhrMappingAttributes {
  public id!: number;
  public ehr_name!: string;
  public question_key!: string;
  public ehr_field!: string;
  //public readonly created_at!: Date;
  //public readonly updated_at!: Date;
}

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
    },/*,
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
