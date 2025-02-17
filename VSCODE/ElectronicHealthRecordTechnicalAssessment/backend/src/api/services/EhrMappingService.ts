// Importing the repository interface from the domain layer. 
// The domain layer defines business logic and should be decoupled from external concerns like databases.
import { EhrMappingRepository } from '../../domain/ports/EhrMappingRepository';  // Adjust path

// Importing the concrete implementation of the repository in the infrastructure layer.
// The infrastructure layer provides the actual interaction with external systems (e.g., databases, file systems).
import { EhrMappingRepositoryImpl } from '../../infrastructure/db/repositories/EhrMappingRepositoryImpl';  // Adjust path

// Importing the EhrMapping entity from the domain layer. 
// The domain layer contains the core entities that represent business data and logic.
import { EhrMapping } from '../../domain/entities/EhrMapping';  // Adjust path

// The EhrMappingService acts as an intermediary between the domain and infrastructure layers.
// It implements business logic and delegates the interaction with external systems (like the database) to the repository.
export class EhrMappingService {
  // The service receives a repository instance, which adheres to the repository interface defined in the domain layer.
  // The repository abstractly defines the methods for interacting with the data store.
  constructor(private ehrMappingRepository: EhrMappingRepository) {}

  // This method is part of the business logic and interacts with the repository to create a new EhrMapping.
  // It ensures that only the relevant data is passed and hides the complexity of interacting with the infrastructure.
  async createEhrMapping(data: Omit<EhrMapping, 'id'>): Promise<EhrMapping> {
    return this.ehrMappingRepository.create(data);  // Delegates data creation to the repository implementation.
  }
}

// Here we instantiate the concrete repository implementation (infrastructure layer),
// which will be passed to the service. The repository is the adapter that connects the domain layer
// with the infrastructure (database).
const ehrMappingRepository = new EhrMappingRepositoryImpl();

// We instantiate the service and export it. This allows the service to be used in other parts of the application, 
// without exposing the underlying infrastructure (repository implementation).
export default new EhrMappingService(ehrMappingRepository);
