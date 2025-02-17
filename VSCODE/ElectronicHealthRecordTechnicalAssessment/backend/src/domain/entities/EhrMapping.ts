/**
 * @class EhrMapping
 * 
 * Represents the mapping between internal system question keys and the corresponding 
 * fields in an external Electronic Health Record (EHR) system.
 * 
 * ## Role in Hexagonal Architecture
 * - **Domain Layer (Core Business Logic)**: This class acts as a **domain entity**, 
 *   defining the structure of how internal data fields are mapped to EHR-specific fields.
 * - **Decouples Business Logic from Infrastructure**: The entity is independent of 
 *   persistence mechanisms (database) and external services, ensuring flexibility.
 * - **Used by Application Layer**: Services within the application layer interact with 
 *   this entity to transform and send data to various EHR systems.
 * - **Infrastructure Layer (Adapters)**: A repository or ORM adapter would handle 
 *   storage, ensuring data persistence while keeping this entity clean and business-focused.
 */
export class EhrMapping {
  /**
   * Unique identifier for the mapping entry.
   * 
   * @type {number | null}
   * - Assigned by a database or system.
   * - `null` if not yet persisted.
   */
  public id: number | null;

  /**
   * The name of the external Electronic Health Record (EHR) system.
   * 
   * @type {string}
   * - Example values: `"Epic"`, `"Cerner"`, `"Meditech"`, etc.
   * - Helps differentiate mappings for different EHR vendors.
   */
  public ehr_name: string;

  /**
   * The internal system's key representing a question or data field.
   * 
   * @type {string}
   * - Example: `"patient_weight"`, `"blood_pressure_systolic"`, etc.
   * - Used internally in the system to identify patient-related data.
   */
  public question_key: string;

  /**
   * The corresponding field name in the external EHR system.
   * 
   * @type {string}
   * - This maps the internal key to the correct field in the EHR system.
   * - Example: `"ehr_bp_systolic"`, `"ehr_patient_weight"`, etc.
   */
  public ehr_field: string;

  /**
   * Creates an instance of EhrMapping.
   * 
   * @param {number | null} id - Unique identifier for the mapping (or `null` if not persisted).
   * @param {string} ehr_name - Name of the external EHR system.
   * @param {string} question_key - Internal question key representing patient data.
   * @param {string} ehr_field - Corresponding field in the EHR system.
   */
  constructor(
      id: number | null,
      ehr_name: string,
      question_key: string,
      ehr_field: string
  ) {
      this.id = id;
      this.ehr_name = ehr_name;
      this.question_key = question_key;
      this.ehr_field = ehr_field;
  }
}
