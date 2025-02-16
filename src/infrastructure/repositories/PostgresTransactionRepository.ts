import { injectable } from "inversify"
import type { TransactionRepository } from "../../domain/repositories/TransactionRepository"
import type { Transaction, TransactionStatus } from "../../domain/entities/Transaction"
import { InjectRepository } from "@nestjs/typeorm"
import type { Repository } from "typeorm"
import { TransactionEntity } from "../database/entities/TransactionEntity"

@injectable()
export class PostgresTransactionRepository implements TransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>
  ) {}

  async create(transaction: Omit<Transaction, "id">): Promise<Transaction> {
    const newTransaction = this.transactionRepository.create(transaction)
    await this.transactionRepository.save(newTransaction)
    return newTransaction
  }

  async findById(id: string): Promise<Transaction | null> {
    return this.transactionRepository.findOne({ where: { id } })
  }

  async findAll(filters?: {
    category?: string
    startDate?: Date
    endDate?: Date
    status?: TransactionStatus
  }): Promise<Transaction[]> {
    const query = this.transactionRepository.createQueryBuilder("transaction")

    if (filters?.category) {
      query.andWhere("transaction.category.name = :category", { category: filters.category })
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

    return query.getMany()
  }

  async updateStatus(id: string, status: TransactionStatus): Promise<Transaction> {
    await this.transactionRepository.update(id, { status })
    return this.findById(id)
  }

  async getSummaryByCategory(): Promise<{ category: string; totalAmount: number }[]> {
    return this.transactionRepository
      .createQueryBuilder("transaction")
      .select("category.name", "category")
      .addSelect("SUM(transaction.amount)", "totalAmount")
      .leftJoin("transaction.category", "category")
      .groupBy("category.name")
      .getRawMany()
  }
}



