import type { Request, Response } from "express"
import type { CardRepository } from "../../../domain/repositories/CardRepository"
 
export class CardController {
  constructor(private cardRepository: CardRepository) {}
 
  async getCard(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const card = await this.cardRepository.findById(id)
      if (card) {
        res.json(card)
      } else {
        res.status(404).json({ error: "Card not found" })
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" })
    }
  }
 
  // Implement other methods...
}