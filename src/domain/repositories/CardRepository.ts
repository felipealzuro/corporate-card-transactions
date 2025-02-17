import type { Card } from "@/domain/entities/Card"

export interface CardRepository {
  getById(id: string): Promise<Card | null>;
  // Add other repository methods as needed
}

// CardRepository.ts
export class CardRepository {
  // Implementa los métodos necesarios
  constructor() {
    // Inicialización
  }
  
}

