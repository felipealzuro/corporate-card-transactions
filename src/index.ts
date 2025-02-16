import "reflect-metadata"
import { container } from "./container"
import { TYPES } from "./domain/symbols"
import type { TransactionController } from "./infrastructure/web/controllers/TransactionController"
import express from "express"

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

const transactionController = container.get<TransactionController>(TYPES.TransactionController)

app.post("/transactions", (req, res) => transactionController.createTransaction(req, res))
app.get("/transactions", (req, res) => transactionController.getTransactions(req, res))
app.patch("/transactions/:id/status", (req, res) => transactionController.updateTransactionStatus(req, res))
app.get("/transactions/summary", (req, res) => transactionController.getExpenseSummary(req, res))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

