// src/infrastructure/web/controllers/CardController.ts
import { Request, Response } from "express";
import { CardRepository } from "@/domain/repositories/CardRepository";

export class CardController {
  constructor(private cardRepository: CardRepository) {}

  async getCard(req: Request, res: Response): Promise<Response> {
    try {
      const card = await this.cardRepository.getById(req.params.id);
      if (!card) {
        return res.status(404).json({ message: "Card not found" });
      }
      return res.json(card);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
