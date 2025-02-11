// src/domain/entities/Card.ts
import type { CardRepository } from "../repositories/CardRepository"

export interface Card {
  id: string;
  number: string;
  // Add other card properties
}

export class CardController {
  constructor(private cardRepository: CardRepository) {}
  // Add controller methods
}