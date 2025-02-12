import type { Card } from "../../domain/entities/Card"

export interface CardRepository {
  getById(id: string): Promise<Card | null>
  // Add other repository methods as needed
}



