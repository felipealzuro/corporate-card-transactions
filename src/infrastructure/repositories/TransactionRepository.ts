import type { Transaction, TransactionStatus } from "../entities/Transaction"

export interface TransactionRepository {
  create(transaction: Omit<Transaction, "id">): Promise<Transaction>
  findById(id: string): Promise<Transaction | null>
  findAll(filters?: {
    category?: string
    startDate?: Date
    endDate?: Date
    status?: TransactionStatus
  }): Promise<Transaction[]>
  updateStatus(id: string, status: TransactionStatus): Promise<Transaction>
  getSummaryByCategory(): Promise<{ category: string; totalAmount: number }[]>
}

