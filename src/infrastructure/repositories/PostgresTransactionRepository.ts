import { injectable, inject } from "inversify"
import type { TransactionRepository } from "../../domain/repositories/TransactionRepository"
import type { Transaction, TransactionStatus } from "../../domain/entities/Transaction"
import type { Repository } from "typeorm"
import { TransactionEntity } from "../database/entities/TransactionEntity"
import { TYPES } from "../../domain/symbols"

@injectable()
export class PostgresTransactionRepository implements TransactionRepository {
  constructor(
    @inject(TYPES.TransactionEntityRepository)
    private transactionRepository: Repository<TransactionEntity>
  ) {}

  async create(transaction: Omit<Transaction, "id">): Promise<Transaction> {
    const newTransaction = this.transactionRepository.create(transaction)
    await this.transactionRepository.save(newTransaction)
    return this.mapToTransaction(newTransaction)
  }

  async findById(id: string): Promise<Transaction | null> {
    const transaction = await this.transactionRepository.findOne({ where: { id } })
    return transaction ? this.mapToTransaction(transaction) : null
  }

  async findAll(filters?: {
    category?: string
    startDate?: Date
    endDate?: Date
    status?: TransactionStatus
  }): Promise<Transaction[]> {
    const query = this.transactionRepository.createQueryBuilder("transaction")

    if (filters?.category) {
      query.andWhere("transaction.category = :category", { category: filters.category })
    }

    if (filters?.startDate) {
      query.andWhere("transaction.date >= :startDate", { startDate: filters.startDate })
    }

    if (filters?.endDate) {
      query.andWhere("transaction.date <= :endDate", { endDate: filters.endDate })
    }

    if (filters?.status) {
      query.andWhere("transaction.status = :status", { status: filters.status })
    }

    const transactions = await query.getMany()
    return transactions.map(t => this.mapToTransaction(t))
  }

  async updateStatus(id: string, status: TransactionStatus): Promise<Transaction> {
    await this.transactionRepository.update(id, { status })
    const transaction = await this.findById(id)
    if (!transaction) {
      throw new Error('Transaction not found')
    }
    return transaction
  }

  async getSummaryByCategory(): Promise<{ category: string; totalAmount: number }[]> {
    return this.transactionRepository
      .createQueryBuilder("transaction")
      .select("transaction.category", "category")
      .addSelect("SUM(transaction.amount)", "totalAmount")
      .groupBy("transaction.category")
      .getRawMany()
  }

  private mapToTransaction(entity: TransactionEntity): Transaction {
    return {
      id: entity.id,
      cardId: entity.cardId,
      amount: entity.amount,
      currency: entity.currency,
      description: entity.description,
      merchantName: entity.merchantName,
      category: entity.category,
      date: entity.date,
      status: entity.status
    }
  }
}


