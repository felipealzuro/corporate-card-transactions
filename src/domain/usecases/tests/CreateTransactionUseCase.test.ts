import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CreateTransactionUseCase } from "../CreateTransactionUseCase"
import type { TransactionRepository } from "../../repositories/TransactionRepository"
import { TransactionStatus } from "../../entities/Transaction"
import type { Transaction } from "../../entities/Transaction"

describe("CreateTransactionUseCase", () => {
  let mockTransactionRepository: TransactionRepository
  let createTransactionUseCase: CreateTransactionUseCase

  beforeEach(() => {
    mockTransactionRepository = {
      create: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      updateStatus: vi.fn(),
      getSummaryByCategory: vi.fn()
    }

    createTransactionUseCase = new CreateTransactionUseCase(mockTransactionRepository)
  })

  it("should successfully create a transaction", async () => {
    const transactionData: Omit<Transaction, "id"> = {
      cardId: "card123",
      amount: 100,
      currency: "USD",
      category: "Food",
      description: "Lunch",
      date: new Date(),
      merchantName: "Restaurant",
      status: TransactionStatus.PENDING
    }

    const expectedTransaction: Transaction = {
      id: "transaction123",
      ...transactionData
    }

    vi.mocked(mockTransactionRepository.create).mockResolvedValue(expectedTransaction)


    const result = await createTransactionUseCase.execute(transactionData)

    expect(mockTransactionRepository.create).toHaveBeenCalledWith(transactionData)
    expect(result).toEqual(expectedTransaction)
  })

  
})
