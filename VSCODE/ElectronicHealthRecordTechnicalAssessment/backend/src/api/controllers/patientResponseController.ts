// Import necessary modules from Express and the relevant service and DTO
import { Request, Response } from 'express';
import { PatientResponseService } from '../services/patientResponseService';
import { PatientResponseDTO } from '../dtos/patientResponse.dto';

// Instantiating the service responsible for handling business logic
const patientResponseService = new PatientResponseService();

/**
 * PatientResponseController:
 * - Represents the "Inbound Adapter" in Hexagonal Architecture.
 * - This controller acts as an entry point for handling incoming HTTP requests
 *   and maps the request data to a service method that contains the core business logic.
 * - The controller ensures the separation of concerns by delegating business rules
 *   to the PatientResponseService, which encapsulates logic specific to patient responses.
 * - After invoking the service, the controller returns a response to the client, 
 *   following the standard HTTP response format.
 */
export class PatientResponseController {

  /**
   * create:
   * - This method handles the HTTP POST request to create a new patient response.
   * - It receives data from the HTTP request, maps it into a PatientResponseDTO object, 
   *   and passes it to the PatientResponseService to process the request.
   * - Upon success, it sends a 201 status with the response data.
   * - If an error occurs during the service execution, a 500 status with an error message is returned.
   *
   * @param req - The request object containing patient response data.
   * @param res - The response object for sending the result to the client.
   * @returns void
   */
  public async create(req: Request, res: Response): Promise<void> {
    // Mapping the incoming request body to a DTO (Data Transfer Object) for consistent structure
    const patientResponseDTO: PatientResponseDTO = req.body;
    
    try {
      // Delegating the business logic to the PatientResponseService
      const response = await patientResponseService.create(patientResponseDTO);
      // Returning a successful response with the created patient response data
      res.status(201).json(response);
    } catch (error) {
      // Handling errors that occur during the business logic execution
      res.status(500).json({ message: 'Error creating patient response', error });
    }
  }
}
