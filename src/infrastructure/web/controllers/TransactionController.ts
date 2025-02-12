import type { Request, Response } from "express"
import { inject, injectable } from "inversify"
import { CreateTransactionUseCase } from "@/domain/usecases/CreateTransactionUseCase"
import { GetTransactionsUseCase } from "@/domain/usecases/GetTransactionsUseCase"
import { UpdateTransactionStatusUseCase } from "@/domain/usecases/UpdateTransactionStatusUseCase"
import { GetExpenseSummaryUseCase } from "@/domain/usecases/GetExpenseSummaryUseCase"

@injectable()
export class TransactionController {
  constructor(
    @inject(CreateTransactionUseCase) private createTransactionUseCase: CreateTransactionUseCase,
    @inject(GetTransactionsUseCase) private getTransactionsUseCase: GetTransactionsUseCase,
    @inject(UpdateTransactionStatusUseCase) private updateTransactionStatusUseCase: UpdateTransactionStatusUseCase,
    @inject(GetExpenseSummaryUseCase) private getExpenseSummaryUseCase: GetExpenseSummaryUseCase
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

