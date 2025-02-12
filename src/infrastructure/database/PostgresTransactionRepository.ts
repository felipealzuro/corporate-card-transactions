import { Pool } from 'pg';
import { Transaction } from '../../domain/entities/Transaction';
import { TransactionRepository } from '../repositories/TransactionRepository';

export class PostgresTransactionRepository implements TransactionRepository {
  constructor(private pool: Pool) {}

  async save(transaction: Transaction): Promise<Transaction> {
    const query = `
      INSERT INTO transactions (id, card_last_four_digits, amount, category, date, status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [
      transaction.id,
      transaction.cardLastFourDigits,
      transaction.amount,
      transaction.category,
      transaction.date,
      transaction.status,
    ];
    const result = await this.pool.query(query, values);
    return result.rows[0];
  }

  // Implement other methods...
  async findAll(): Promise<Transaction[]> {
    // Implementation
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<Transaction | null> {
    // Implementation
    throw new Error('Method not implemented.');
  }

  async update(transaction: Transaction): Promise<Transaction> {
    // Implementation
    throw new Error('Method not implemented.');
  }

  async findByFilters(filters: { category?: string; status?: string; startDate?: Date; endDate?: Date; }): Promise<Transaction[]> {
    // Implementation
    throw new Error('Method not implemented.');
  }
}