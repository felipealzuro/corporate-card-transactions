// domain/entities/Transaction.ts
export enum TransactionStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED"
}

export interface Transaction {
  id: string
  cardId: string
  amount: number
  currency: string
  description: string
  merchantName: string
  category: string
  date: Date
  status: TransactionStatus
}
