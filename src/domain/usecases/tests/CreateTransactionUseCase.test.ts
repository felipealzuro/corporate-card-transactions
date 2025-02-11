import { CreateTransactionUseCase } from "../CreateTransactionUseCase"
import type { TransactionRepository } from "../../repositories/TransactionRepository"
import type { CardRepository } from "../../repositories/CardRepository"
 
describe("CreateTransactionUseCase", () => {
  let createTransactionUseCase: CreateTransactionUseCase
  let mockTransactionRepository: jest.Mocked<TransactionRepository>
  let mockCardRepository: jest.Mocked<CardRepository>
 
  beforeEach(() => {
    mockTransactionRepository = {
      save: jest.fn(),
    } as any
    mockCardRepository = {
      findByLastFourDigits: jest.fn(),
    } as any
    createTransactionUseCase = new CreateTransactionUseCase(mockTransactionRepository, mockCardRepository)
  })
 
  it("should create a transaction successfully", async () => {
    const transactionData = {
      cardLastFourDigits: "1234",
      amount: 100,
      category: "Food",
      date: new Date(),
      status: "Pending" as const,
    }
 
    mockCardRepository.findByLastFourDigits.mockResolvedValue({ id: "1", lastFourDigits: "1234" } as any)
    mockTransactionRepository.save.mockResolvedValue({ id: "1", ...transactionData })
 
    const result = await createTransactionUseCase.execute(transactionData)
 
    expect(result).toHaveProperty("id")
    expect(mockCardRepository.findByLastFourDigits).toHaveBeenCalledWith("1234")
    expect(mockTransactionRepository.save).toHaveBeenCalled()
  })
 
  it("should throw an error if amount is not positive", async () => {
    const transactionData = {
      cardLastFourDigits: "1234",
      amount: 0,
      category: "Food",
      date: new Date(),
      status: "Pending" as const,
    }
 
    await expect(createTransactionUseCase.execute(transactionData)).rejects.toThrow("Amount must be greater than zero")
  })
 
  // Add more tests...
})