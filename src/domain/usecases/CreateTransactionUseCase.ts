import type { Transaction } from "../entities/Transaction"
import type { TransactionRepository } from "../repositories/TransactionRepository"
import type { CardRepository } from "../repositories/CardRepository"
 
export class CreateTransactionUseCase {
  constructor(
    private transactionRepository: TransactionRepository,
    private cardRepository: CardRepository,
  ) {}
 
  async execute(transactionData: Omit<Transaction, "id">): Promise<Transaction> {
    // Validate input
    if (transactionData.amount <= 0) {
      throw new Error("Amount must be greater than zero")
    }
 
    if (!["Pending", "Approved", "Rejected"].includes(transactionData.status)) {
      throw new Error("Invalid status")
    }
 
    // Check if card exists
    const card = await this.cardRepository.findByLastFourDigits(transactionData.cardLastFourDigits)
    if (!card) {
      throw new Error("Card not found")
    }
 
    const transaction: Transaction = {
      ...transactionData,
      id: Date.now().toString(), // Simple ID generation, consider using UUID in production
    }
    return this.transactionRepository.save(transaction)
  }
}