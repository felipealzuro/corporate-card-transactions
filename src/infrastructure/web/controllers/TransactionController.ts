import type { Request, Response } from "express"
import { inject, injectable } from "inversify"
import { TYPES } from "../../../domain/symbols"
import type { CreateTransactionUseCase } from "../../../domain/usecases/CreateTransactionUseCase"
import type { GetTransactionsUseCase } from "../../../domain/usecases/GetTransactionsUseCase"
import type { UpdateTransactionStatusUseCase } from "../../../domain/usecases/UpdateTransactionStatusUseCase"
import type { GetExpenseSummaryUseCase } from "../../../domain/usecases/GetExpenseSummaryUseCase"

@injectable()
export class TransactionController {
  constructor(
    @inject(TYPES.CreateTransactionUseCase) private createTransactionUseCase: CreateTransactionUseCase,
    @inject(TYPES.GetTransactionsUseCase) private getTransactionsUseCase: GetTransactionsUseCase,
    @inject(TYPES.UpdateTransactionStatusUseCase) private updateTransactionStatusUseCase: UpdateTransactionStatusUseCase,
    @inject(TYPES.GetExpenseSummaryUseCase) private getExpenseSummaryUseCase: GetExpenseSummaryUseCase
  ) {}

  async createTransaction(req: Request, res: Response) {
    try {
      const transaction = await this.createTransactionUseCase.execute(req.body)
      res.status(201).json(transaction)
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  }

  async getTransactions(req: Request, res: Response) {
    try {
      const transactions = await this.getTransactionsUseCase.execute(req.query)
      res.json(transactions)
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  }

  async updateTransactionStatus(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { status } = req.body
      const transaction = await this.updateTransactionStatusUseCase.execute(id, status)
      res.json(transaction)
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  }

  async getExpenseSummary(req: Request, res: Response) {
    try {
      const summary = await this.getExpenseSummaryUseCase.execute()
      res.json(summary)
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  }
}


