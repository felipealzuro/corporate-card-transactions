export enum TransactionStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}

export interface Transaction {
  id: string
  cardLastFourDigits: string
  amount: number
  category: string
  date: Date
  status: TransactionStatus
}