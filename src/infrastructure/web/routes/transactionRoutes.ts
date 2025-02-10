import express from 'express';
import { TransactionController } from '../controllers/TransactionController';

export function transactionRoutes(transactionController: TransactionController) {
  const router = express.Router();

  router.post('/', (req, res) => transactionController.createTransaction(req, res));

  // Implement other routes...

  return router;
}