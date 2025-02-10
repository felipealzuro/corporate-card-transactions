import { Request, Response } from 'express';
import { CreateTransactionUseCase } from '../../../domain/usecases/CreateTransactionUseCase';

export class TransactionController {
  constructor(private createTransactionUseCase: CreateTransactionUseCase) {}

  async createTransaction(req: Request, res: Response): Promise<void> {
    try {
      const transaction = await this.createTransactionUseCase.execute(req.body);
      res.status(201).json(transaction);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Implement other controller methods...
}