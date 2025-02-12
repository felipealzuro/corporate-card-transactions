import type { Transaction, TransactionStatus } from "../entities/Transaction"
import type { TransactionRepository } from "../repositories/TransactionRepository"

export class GetTransactionsUseCase {
  constructor(private transactionRepository: TransactionRepository) {}

  async execute(filters?: {
    category?: string
    startDate?: Date
    endDate?: Date
    status?: TransactionStatus
  }): Promise<Transaction[]> {
    return this.transactionRepository.findAll(filters)
  }
}

