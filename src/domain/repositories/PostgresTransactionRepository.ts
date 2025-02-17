import { injectable, inject } from "inversify"
import { TYPES } from "../../domain/symbols"
import type { TransactionRepository } from "../../domain/repositories/TransactionRepository"
import type { Transaction, TransactionStatus } from "../../domain/entities/Transaction"
import type { Repository } from "typeorm"
import type { TransactionEntity } from "../../infrastructure/database/entities/TransactionEntity"

@injectable()
export class PostgresTransactionRepository implements TransactionRepository {
  constructor(
    @inject(TYPES.TransactionEntityRepository) private repository: Repository<TransactionEntity>
  ) {}

  async create(transaction: Omit<Transaction, "id">): Promise<Transaction> {
    const newTransaction = this.repository.create(transaction as TransactionEntity)
    await this.repository.save(newTransaction)
    return newTransaction
  }

  async findById(id: string): Promise<Transaction | null> {
    return this.repository.findOne({ where: { id } })
  }

  async findAll(filters?: {
    category?: string
    startDate?: Date
    endDate?: Date
    status?: TransactionStatus
  }): Promise<Transaction[]> {
    let query = this.repository.createQueryBuilder("transaction")

    if (filters?.category) {
      query = query.andWhere("transaction.category = :category", { category: filters.category })
    }
    if (filters?.startDate) {
      query = query.andWhere("transaction.date >= :startDate", { startDate: filters.startDate })
    }
    if (filters?.endDate) {
      query = query.andWhere("transaction.date <= :endDate", { endDate: filters.endDate })
    }
    if (filters?.status) {
      query = query.andWhere("transaction.status = :status", { status: filters.status })
    }

    return query.getMany()
  }

  async updateStatus(id: string, status: TransactionStatus): Promise<Transaction> {
    await this.repository.update(id, { status })
    const updatedTransaction = await this.findById(id)
    if (!updatedTransaction) {
      throw new Error("Transaction not found")
    }
    return updatedTransaction
  }

  async getSummaryByCategory(): Promise<{ category: string; totalAmount: number }[]> {
    return this.repository
      .createQueryBuilder("transaction")
      .select("transaction.category", "category")
      .addSelect("SUM(transaction.amount)", "totalAmount")
      .groupBy("transaction.category")
      .getRawMany()
  }
}

