import { Transaction, TransactionStatus } from "../entities/Transaction";
import type { TransactionRepository } from "../repositories/TransactionRepository"

export class PostgresTransactionRepository implements TransactionRepository {
  create(_transaction: Omit<Transaction, "id">): Promise<Transaction> {
    throw new Error("Method not implemented.");
  }
  findById(_id: string): Promise<Transaction | null> {
    throw new Error("Method not implemented.");
  }
  findAll(_filters?: { category?: string; startDate?: Date; endDate?: Date; status?: TransactionStatus; }): Promise<Transaction[]> {
    throw new Error("Method not implemented.");
  }
  updateStatus(_id: string, _status: TransactionStatus): Promise<Transaction> {
    throw new Error("Method not implemented.");
  }
  getSummaryByCategory(): Promise<{ category: string; totalAmount: number; }[]> {
    throw new Error("Method not implemented.");
  }
  // Implement the repository methods
}


