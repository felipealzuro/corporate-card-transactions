import { Router } from "express"
import type { TransactionController } from "../controllers/TransactionController"

export function setupTransactionRoutes(transactionController: TransactionController) {
  const router = Router()

  router.post("/", (req, res) => transactionController.createTransaction(req, res))
  router.get("/", (req, res) => transactionController.getTransactions(req, res))
  router.patch("/:id/status", (req, res) => transactionController.updateTransactionStatus(req, res))
  router.get("/summary", (req, res) => transactionController.getExpenseSummary(req, res))

  return router
}






