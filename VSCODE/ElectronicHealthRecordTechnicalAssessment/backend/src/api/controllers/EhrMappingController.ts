/**
 * 🏗️ EhrMappingController - Controller for Handling EHR Mapping HTTP Requests
 *
 * This controller handles HTTP requests related to EHR mappings. It acts as the interface 
 * between the external world (client) and the application layer (business logic). It receives 
 * input from the client, passes it to the `EhrMappingService`, and returns the appropriate 
 * response.
 *
 * 🏛️ **Role in Hexagonal Architecture:**
 * - 🎯 **Interface Adapter (Controller):** Acts as the entry point for HTTP requests related 
 *   to EHR mappings, receiving data from the client and invoking the service layer to handle 
 *   business logic.
 * - 🔌 **Decouples HTTP Layer from Domain Logic:** Keeps HTTP-specific concerns (request/response) 
 *   separate from business logic, allowing for easier changes to the HTTP interface without 
 *   affecting the domain layer.
 * - 🚀 **Gateway to Application Layer:** The controller acts as a gateway to the application 
 *   layer, passing data between the client and the `EhrMappingService`.
 * - 🧩 **Keeps Business Logic Isolated:** By delegating to the service layer, the controller 
 *   allows the business logic to remain free of HTTP-specific details.
 */
export class EhrMappingController {
  /**
   * 🏛️ **Constructor:** 
   * Initializes the `EhrMappingController` by injecting the `EhrMappingService` to interact 
   * with the application layer.
   *
   * @param {EhrMappingService} ehrMappingService - The service responsible for handling 
   * the business logic for EHR mappings.
   */
  constructor(private ehrMappingService: EhrMappingService) {}

  /**
   * 📝 **Create EHR Mapping:**
   * Handles the creation of a new EHR mapping via an HTTP POST request. It invokes 
   * the `createEhrMapping` method from the `EhrMappingService` to process the request 
   * and return the result.
   *
   * @param {Request} req - The incoming HTTP request containing the EHR mapping data.
   * @param {Response} res - The outgoing HTTP response.
   * @returns {Promise<void>} - A promise that resolves to send the response back to the client.
   *
   * 🔹 **Responsibilities:**
   * - Receives input from the HTTP request and delegates business logic to the service layer.
   * - Handles errors and sends appropriate HTTP status codes and messages.
   * - Returns the created EHR mapping in the response with a `201 Created` status on success.
   * - Sends a `500 Internal Server Error` response if an exception occurs during processing.
   */
  async create(req: Request, res: Response): Promise<void> {
    try {
      const ehrMapping = await this.ehrMappingService.createEhrMapping(req.body);
      res.status(201).json(ehrMapping);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }
}
