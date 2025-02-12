import type { Transaction } from "../entities/Transaction"
import type { TransactionRepository } from "../repositories/TransactionRepository"

export class CreateTransactionUseCase {
  constructor(private transactionRepository: TransactionRepository) {}

  async execute(transactionData: Omit<Transaction, "id">): Promise<Transaction> {
    return this.transactionRepository.create(transactionData)
  }
}

