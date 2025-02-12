import { GetTransactionsUseCase } from "../GetTransactionsUseCase"
import type { TransactionRepository } from "@/domain/repositories/TransactionRepository"
import { type Transaction, TransactionStatus } from "@/domain/entities/Transaction"

describe("GetTransactionsUseCase", () => {
  let getTransactionsUseCase: GetTransactionsUseCase
  let mockTransactionRepository: jest.Mocked<TransactionRepository>

  beforeEach(() => {
    mockTransactionRepository = {
      findAll: jest.fn(),
    } as any
    getTransactionsUseCase = new GetTransactionsUseCase(mockTransactionRepository)
  })

  it("should get all transactions", async () => {
    const mockTransactions: Transaction[] = [
      {
        id: "1",
        cardLastFourDigits: "1234",
        amount: 100,
        category: "Food",
        date: new Date(),
        status: TransactionStatus.Pending,
      },
      {
        id: "2",
        cardLastFourDigits: "5678",
        amount: 200,
        category: "Transportation",
        date: new Date(),
        status: TransactionStatus.Approved,
      },
    ]

    mockTransactionRepository.findAll.mockResolvedValue(mockTransactions)

    const result = await getTransactionsUseCase.execute()

    expect(mockTransactionRepository.findAll).toHaveBeenCalledWith(undefined)
    expect(result).toEqual(mockTransactions)
  })

  it("should get transactions with filters", async () => {
    const filters = {
      category: "Food",
      status: TransactionStatus.Pending,
    }

    const mockFilteredTransactions: Transaction[] = [
      {
        id: "1",
        cardLastFourDigits: "1234",
        amount: 100,
        category: "Food",
        date: new Date(),
        status: TransactionStatus.Pending,
      },
    ]

    mockTransactionRepository.findAll.mockResolvedValue(mockFilteredTransactions)

    const result = await getTransactionsUseCase.execute(filters)

    expect(mockTransactionRepository.findAll).toHaveBeenCalledWith(filters)
    expect(result).toEqual(mockFilteredTransactions)
  })
})

