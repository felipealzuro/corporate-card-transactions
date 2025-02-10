import { Transaction } from '../entities/Transaction';
import { TransactionRepository } from '../repositories/TransactionRepository';

export class CreateTransactionUseCase {
  constructor(private transactionRepository: TransactionRepository) {}

  async execute(transactionData: Omit<Transaction, 'id'>): Promise<Transaction> {
    const transaction: Transaction = {
      ...transactionData,
      id: Date.now().toString(), // Simple ID generation, consider using UUID in production
    };
    return this.transactionRepository.save(transaction);
  }
}