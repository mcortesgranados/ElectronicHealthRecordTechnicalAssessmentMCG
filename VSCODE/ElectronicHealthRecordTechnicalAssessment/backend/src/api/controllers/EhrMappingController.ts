import { Request, Response } from 'express';
import { EhrMappingService } from '../services/EhrMappingService'; // Adjust the path as necessary

// The EhrMappingController acts as an adapter between the inbound API requests and the application logic of the EhrMappingService.
export class EhrMappingController {
  // Dependency injection of EhrMappingService, which handles the core business logic.
  constructor(private ehrMappingService: EhrMappingService) {}

  // The 'create' method is responsible for handling requests to create a new EHR mapping.
  // It acts as a port that the external world (e.g., the web server or client) communicates with.
  // Inside, it calls the 'createEhrMapping' method from the EhrMappingService, which contains the business logic.
  async create(req: Request, res: Response): Promise<void> {
    try {
      // Call the service layer to process the request and return a result.
      const ehrMapping = await this.ehrMappingService.createEhrMapping(req.body);

      // Respond with a 201 status code (Created) and the created EHR mapping object.
      res.status(201).json(ehrMapping);
    } catch (error) {
      // If there's an error, send a 500 status code (Internal Server Error) along with an error message.
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  // The 'getEhrMapping' method (not yet implemented) will handle requests for retrieving EHR mappings.
  // It will interact with the service layer to fetch the data and return it to the client.
  // The implementation of this method is expected to follow a similar pattern to the 'create' method.
  // Future implementation: Add method to fetch existing EHR mappings.
}
