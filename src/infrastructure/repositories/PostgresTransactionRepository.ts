import type { Request, Response } from "express"
import type { CardRepository } from "@/domain/repositories/CardRepository"

export class CardController {
  constructor(private cardRepository: CardRepository) {}

  async getCard(req: Request, res: Response) {
    const cardId = req.params.id
    const card = await this.cardRepository.getById(cardId)
    if (card) {
      res.json(card)
    } else {
      res.status(404).json({ message: "Card not found" })
    }
  }

  // Add other controller methods as needed
}


