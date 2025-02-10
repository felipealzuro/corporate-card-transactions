import { Transaction } from '../entities/Transaction';

export interface TransactionRepository {
  save(transaction: Transaction): Promise<Transaction>;
  findAll(): Promise<Transaction[]>;
  findById(id: string): Promise<Transaction | null>;
  update(transaction: Transaction): Promise<Transaction>;
  findByFilters(filters: {
    category?: string;
    status?: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<Transaction[]>;
}