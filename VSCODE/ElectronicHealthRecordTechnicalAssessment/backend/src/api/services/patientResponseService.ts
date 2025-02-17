// Import the necessary models and DTOs
import { PatientResponse } from '../../infrastructure/db/patientResponse.model'; // The PatientResponse model represents the persistence layer
import { PatientResponseDTO } from '../../api/dtos/patientResponse.dto'; // The PatientResponseDTO is a Data Transfer Object used for transferring data

/**
 * PatientResponseService is a service class that acts as an intermediary between the API layer and the database layer in the hexagonal architecture.
 * 
 * In Hexagonal Architecture (also known as Ports and Adapters), the service class like PatientResponseService serves as the "application core" or "use case" 
 * that implements business logic while relying on interfaces to interact with external systems (such as the database or external services).
 * 
 * This service performs operations on the PatientResponse entity, handling patient responses related to Electronic Health Record (EHR) systems.
 * The service contains methods that allow creating patient responses in the system.
 */
export class PatientResponseService {
  
  /**
   * Creates a new patient response entry in the database.
   * 
   * This method takes a PatientResponseDTO (which represents the data passed by the user or external systems)
   * and processes it to create a corresponding entry in the PatientResponse model.
   * 
   * @param patientResponseDTO - The Data Transfer Object that contains the patient response data
   * @returns Promise<PatientResponse> - The newly created patient response object
   */
  public async create(patientResponseDTO: PatientResponseDTO): Promise<PatientResponse> {
    // Ensure submittedAt is a Date, fallback to current date if undefined
    const submittedAt = patientResponseDTO.submitted_at || new Date();

    // Create the patient response object with the necessary fields
    const patientResponseData = {
      patientId: patientResponseDTO.patient_id,
      ehrSystem: patientResponseDTO.ehr_system,
      mappedData: patientResponseDTO.mapped_data,
      submittedAt,  // Use the processed value
    };
    
    // Interacts with the persistence layer (PatientResponse model) to persist the data
    return PatientResponse.create(patientResponseData); // Sequelize will handle the id and return the created entry
  }
}
