import { Router } from "express"
import type { TransactionController } from "../controllers/TransactionController"

export function setupTransactionRoutes(transactionController: TransactionController) {
  const router = Router()

  router.post("/", transactionController.createTransaction.bind(transactionController))
  router.get("/", transactionController.getTransactions.bind(transactionController))
  router.patch("/:id/status", transactionController.updateTransactionStatus.bind(transactionController))
  router.get("/summary", transactionController.getExpenseSummary.bind(transactionController))

  return router
}

