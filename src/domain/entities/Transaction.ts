export interface Transaction {
    id: string;
    cardLastFourDigits: string;
    amount: number;
    category: string;
    date: Date;
    status: 'Pending' | 'Approved' | 'Rejected';
  }