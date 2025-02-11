import type { Card } from "../entities/Card"
 
export interface CardRepository {
  save(card: Card): Promise<Card>
  findAll(): Promise<Card[]>
  findById(id: string): Promise<Card | null>
  update(card: Card): Promise<Card>
  findByLastFourDigits(lastFourDigits: string): Promise<Card | null>
}