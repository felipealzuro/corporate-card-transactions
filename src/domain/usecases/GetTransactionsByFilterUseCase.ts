import type { Transaction } from "../entities/Transaction"
import type { TransactionRepository } from "../repositories/TransactionRepository"
 
export class GetTransactionsByFilterUseCase {
  constructor(private transactionRepository: TransactionRepository) {}
 
  async execute(filters: {
    category?: string
    status?: string
    startDate?: Date
    endDate?: Date
  }): Promise<Transaction[]> {
    return this.transactionRepository.findByFilters(filters)
  }
}