import { Router } from "express"
import { CardController } from "@/infrastructure/web/controllers/CardController"
import { CardRepository } from "@/domain/repositories/CardRepository"

const router = Router()
const cardRepository = new CardRepository() // You'll need to implement this
const cardController = new CardController(cardRepository)

router.get("/card/:id", cardController.getCard.bind(cardController))

export default router

