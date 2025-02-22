// src/domain/repositories/TransactionRepository.ts

// Definiciones de tipos inline
export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'REJECTED';

export interface Transaction {
  id: string;
  cardId: string;
  amount: number;
  currency: string;
  category: string;
  description: string;
  status: TransactionStatus;
  date: Date;
  merchantName: string;
}

// Interfaz del repositorio
export interface TransactionRepository {
  create(transaction: Omit<Transaction, "id">): Promise<Transaction>;
  findById(id: string): Promise<Transaction | null>;
  findAll(filters?: {
    category?: string;
    startDate?: Date;
    endDate?: Date;
    status?: TransactionStatus;
  }): Promise<Transaction[]>;
  updateStatus(id: string, status: TransactionStatus): Promise<Transaction>;
  getSummaryByCategory(): Promise<{ category: string; totalAmount: number }[]>;
}


