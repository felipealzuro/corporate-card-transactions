import type { TransactionRepository } from "../repositories/TransactionRepository"

export class GetExpenseSummaryUseCase {
  constructor(private transactionRepository: TransactionRepository) {}

  async execute(): Promise<{ category: string; totalAmount: number }[]> {
    return this.transactionRepository.getSummaryByCategory()
  }
}

