import { PatientRepository } from '../ports/PatientRepository';

/**
 * @class PatientService
 * 
 * @description
 * The **PatientService** class is part of the **Application Layer** in the context of **Hexagonal Architecture**.
 * It contains business logic related to patient management and serves as an intermediary between the **Domain Layer** 
 * (represented by the `PatientRepository` port) and the **Infrastructure Layer** (where the actual persistence logic is implemented).
 * 
 * ## Role in Hexagonal Architecture:
 * - **Application Layer**: `PatientService` resides in the **Application Layer**, responsible for implementing the use cases of the application. 
 *   It interacts with domain services and repositories to perform business operations.
 * - **Orchestrator**: It orchestrates actions such as creating a new patient or fetching an existing one by calling the appropriate methods 
 *   on the **PatientRepository** port.
 * - **Decoupling**: The **Application Layer** interacts with the **Domain Layer** through the port (interface), and the actual implementation 
 *   is provided by the **Infrastructure Layer**, ensuring that the application logic is decoupled from the underlying infrastructure.
 * 
 * ## Why It Exists:
 * - To implement the business logic for patient management.
 * - To act as a **mediator** between the **Domain Layer** (business logic) and the **Infrastructure Layer** (data persistence).
 * - To ensure that the **Domain Layer** remains independent from any specific infrastructure, enabling flexibility and scalability.
 * 
 * ## Responsibilities:
 * - Uses the `PatientRepository` port to delegate the creation and retrieval of patient data.
 * - Does not contain business rules or persistence logic, staying focused on orchestrating actions.
 */
export class PatientService {
  private patientRepository: PatientRepository;

  /**
   * Constructor to initialize the PatientService with a specific PatientRepository.
   * 
   * @param patientRepository - An instance of the PatientRepository interface, provided by the Infrastructure Layer.
   */
  constructor(patientRepository: PatientRepository) {
    this.patientRepository = patientRepository;
  }

  /**
   * Creates a new patient record using the PatientRepository.
   * 
   * @param patientData - The data of the patient to create.
   * @returns A Promise that resolves to the created `Patient` object.
   */
  async createPatient(patientData: any) {
    return await this.patientRepository.createPatient(patientData);
  }

  /**
   * Retrieves a patient by their unique ID.
   * 
   * @param id - The unique ID of the patient to fetch.
   * @returns A Promise that resolves to the `Patient` object if found, or `null` if no patient is found with the given ID.
   */
  async getPatientById(id: number) {
    return await this.patientRepository.getPatientById(id);
  }
}
