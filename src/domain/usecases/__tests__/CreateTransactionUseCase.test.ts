import { describe, it, expect, vi } from "vitest"
import { CreateTransactionUseCase } from "../CreateTransactionUseCase"
import type { TransactionRepository } from "../../repositories/TransactionRepository"
import { type Transaction, TransactionStatus } from "../../entities/Transaction"

describe("CreateTransactionUseCase", () => {
  it("should create a transaction", async () => {
    const mockTransactionRepository:vi.Mocked<TransactionRepository> = {
      create: vi.fn(),
    } as any

    const createTransactionUseCase = new CreateTransactionUseCase(mockTransactionRepository)

    const transactionData: Omit<Transaction, "id"> = {
      cardLastFourDigits: "1234",
      amount: 100,
      category: "Food",
      date: new Date(),
      status: TransactionStatus.Pending,
    }

    const createdTransaction: Transaction = {
      id: "transaction-id",
      ...transactionData,
    }

    mockTransactionRepository.create.mockResolvedValue(createdTransaction)

    const result = await createTransactionUseCase.execute(transactionData)

    expect(mockTransactionRepository.create).toHaveBeenCalledWith(transactionData)
    expect(result).toEqual(createdTransaction)
  })
})


