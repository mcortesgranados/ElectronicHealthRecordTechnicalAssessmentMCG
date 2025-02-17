import { PatientRepository } from '../../domain/ports/PatientRepository';
import { Patient } from '../../infrastructure/db/models/Patient';

/**
 * @class PatientRepositoryImpl
 * @implements PatientRepository
 * 
 * @description
 * This class implements the `PatientRepository` interface, which is part of the **Domain Layer**
 * in the **Hexagonal Architecture** (also known as Ports and Adapters Architecture).
 * 
 * ## Role in Hexagonal Architecture:
 * - **Adapter**: `PatientRepositoryImpl` serves as an adapter between the **Application Layer** 
 *   and the **Infrastructure Layer**. It communicates with the Sequelize ORM to perform CRUD 
 *   operations on the `patients` database table.
 * 
 * - **Ports and Adapters Pattern**: 
 *   - The `PatientRepository` interface defines the **port** (i.e., the contract) that the **Domain Layer** uses.
 *   - `PatientRepositoryImpl` is the **adapter** that fulfills this contract by interacting with the 
 *     underlying database using Sequelize ORM.
 * 
 * - **Decoupling**: This class decouples the domain logic from the details of the database implementation.
 *   The **Domain Layer** does not need to know about the specific ORM being used. The interaction 
 *   with the database is handled by the **Infrastructure Layer**.
 * 
 * - **Persistence Concern**: This class is strictly responsible for implementing the methods that 
 *   access the database and retrieve or save data. It should not contain business logic, which remains 
 *   in the domain layer.
 */
export class PatientRepositoryImpl implements PatientRepository {
  /**
   * Creates a new patient in the database.
   * 
   * @param patientData - The data to create the new patient.
   * @returns The created `Patient` object.
   * 
   * @description
   * This method interacts with the `Patient` Sequelize model to create a new record in the database 
   * based on the `patientData` provided.
   * 
   * ## Hexagonal Architecture Implications:
   * - The **Application Layer** uses this method to create patients without being aware of the underlying
   *   persistence mechanism.
   * - If the database technology or ORM changes, only this implementation needs to be modified.
   * - The **Domain Layer** interacts with this repository through the `PatientRepository` interface, 
   *   ensuring abstraction and flexibility.
   */
  async createPatient(patientData: any): Promise<Patient> {
    return await Patient.create(patientData);
  }

  /**
   * Retrieves a patient by their unique ID.
   * 
   * @param id - The ID of the patient to retrieve.
   * @returns A `Patient` object if found, or `null` if no patient is found with the given ID.
   * 
   * @description
   * This method interacts with the `Patient` Sequelize model to fetch a patient by their primary key (ID).
   * If the patient is found, it returns the patient record; otherwise, it returns `null`.
   * 
   * ## Hexagonal Architecture Implications:
   * - This method provides a **persistence abstraction** for the application to retrieve patient data.
   * - It decouples the **Domain Layer** from the details of data storage and retrieval.
   * - The use of `Patient.findByPk()` abstracts the specific database operations and allows 
   *   the domain to remain independent of the storage mechanism.
   */
  async getPatientById(id: number): Promise<Patient | null> {
    return await Patient.findByPk(id);
  }
}
