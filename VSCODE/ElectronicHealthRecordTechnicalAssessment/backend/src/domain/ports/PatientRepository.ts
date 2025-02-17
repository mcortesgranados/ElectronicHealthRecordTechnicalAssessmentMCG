import { Patient } from '../../infrastructure/db/models/Patient';

/**
 * @interface PatientRepository
 * 
 * @description
 * This interface defines the contract (or port) for the **PatientRepository** in the **Domain Layer** 
 * within the context of **Hexagonal Architecture** (also known as Ports and Adapters).
 * 
 * ## Role in Hexagonal Architecture:
 * - **Port**: The `PatientRepository` interface represents a **port** that is used by the **Application Layer** 
 *   to interact with the underlying persistence layer (i.e., the database) without directly knowing about it.
 * - **Abstraction**: It provides an abstraction for repository operations like creating and fetching patients, 
 *   decoupling the domain logic from the specific details of the infrastructure, such as the ORM or database technology.
 * 
 * - **Decoupling**: The use of interfaces ensures that the **Domain Layer** is **isolated** from the 
 *   infrastructure layer, meaning we can change the database implementation (e.g., switching from Sequelize 
 *   to another ORM or even a different storage system) without affecting the domain logic.
 * 
 * ## Why It Exists:
 * - To provide a **clear contract** between the **Domain Layer** and **Infrastructure Layer**.
 * - To ensure that any implementation of this interface can be substituted or mocked for testing purposes.
 */
export interface PatientRepository {
  /**
   * Creates a new patient record.
   * 
   * @param patientData - The data of the patient to create.
   * @returns A Promise that resolves to the created `Patient` object.
   */
  createPatient(patientData: any): Promise<Patient>;

  /**
   * Retrieves a patient by their unique ID.
   * 
   * @param id - The unique ID of the patient to fetch.
   * @returns A Promise that resolves to the `Patient` object if found, or `null` if no patient is found with the given ID.
   */
  getPatientById(id: number): Promise<Patient | null>;
}
