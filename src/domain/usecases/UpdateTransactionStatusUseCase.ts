import type { Transaction, TransactionStatus } from "../entities/Transaction"
import type { TransactionRepository } from "../repositories/TransactionRepository"

export class UpdateTransactionStatusUseCase {
  constructor(private transactionRepository: TransactionRepository) {}

  async execute(id: string, status: TransactionStatus): Promise<Transaction> {
    return this.transactionRepository.updateStatus(id, status)
  }
}

