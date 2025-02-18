import { Request, Response } from 'express';
import { PatientService } from '../../domain/services/PatientService';

/**
 * @class PatientController
 * 
 * @description
 * The **PatientController** class is part of the **Web Layer** or **Adapter Layer** in the **Hexagonal Architecture**.
 * It serves as the entry point for handling HTTP requests related to patient management. It interacts with the **Application Layer** 
 * (specifically the `PatientService`) to perform operations like creating a patient or retrieving a patient's details.
 * 
 * ## Role in Hexagonal Architecture:
 * - **Web Layer**: The controller resides in the **Web Layer**, which acts as an interface (adapter) between the external world 
 *   (HTTP requests) and the internal application (business logic).
 * - **Adapter**: The `PatientController` adapts the HTTP requests to the application logic by passing them to the `PatientService`. 
 *   It receives the results and formats them as HTTP responses.
 * - **Decoupling**: The controller is decoupled from the internal business logic (e.g., `PatientService`), allowing for a clean and flexible architecture.
 * 
 * ## Why It Exists:
 * - To act as an intermediary between external HTTP requests and the **Application Layer**.
 * - To convert incoming HTTP requests into meaningful operations (like creating or fetching patients) using the **PatientService**.
 * - To format responses into proper HTTP responses (e.g., 200, 201, 404, 500 status codes).
 * 
 * ## Responsibilities:
 * - Handles the HTTP request for patient creation and retrieval.
 * - Passes patient-related data to the **Application Layer** via the `PatientService`.
 * - Formats the response, including appropriate status codes and messages, to the external client (e.g., frontend).
 */
export class PatientController {
  private patientService: PatientService;

  /**
   * Constructor to initialize the PatientController with a specific PatientService.
   * 
   * @param patientService - An instance of the PatientService class that handles business logic.
   */
  constructor(patientService: PatientService) {
    this.patientService = patientService;
  }

  /**
   * curl --request POST \
  --url http://localhost:3000/patient-response/patient-responses \
  --header 'Content-Type: application/json' \
  --data '{     "patient_id": 123,     "ehr_system": "SystemA",     "mapped_data": "{\"field1\":\"value1\", \"field2\":\"value2\"}",     "submitted_at": "2025-02-17T12:00:00Z"   }'
   * 
   * Handles the HTTP POST request to create a new patient.
   * 
   * @param req - The HTTP request object containing the patient data in the body.
   * @param res - The HTTP response object used to send the response.
   * @returns A Promise that resolves to the creation of a new patient and sends a JSON response.
   */
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const patient = await this.patientService.createPatient(req.body);
      res.status(201).json(patient);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ message: (error as Error).message });
    }
  }

  /**
   * Handles the HTTP GET request to retrieve a patient by ID.
   * 
   * @param req - The HTTP request object containing the patient ID in the URL parameters.
   * @param res - The HTTP response object used to send the response.
   * @returns A Promise that resolves to the retrieved patient and sends a JSON response or an error message.
   */
  public async getPatient(req: Request, res: Response): Promise<void> {
    try {
      const patient = await this.patientService.getPatientById(Number(req.params.id));
      if (patient) {
        res.status(200).json(patient);
      } else {
        res.status(404).json({ message: 'Patient not found' });
      }
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}
