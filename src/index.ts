import express from 'express';
import { Pool } from 'pg';
import { PostgresTransactionRepository } from './infrastructure/database/PostgresTransactionRepository';
import { CreateTransactionUseCase } from './domain/usecases/CreateTransactionUseCase';
import { TransactionController } from './infrastructure/web/controllers/TransactionController';
import { transactionRoutes } from './infrastructure/web/routes/transactionRoutes';

const app = express();
app.use(express.json());

const pool = new Pool({
  // Configure your PostgreSQL connection here
  user: 'your_username',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

const transactionRepository = new PostgresTransactionRepository(pool);
const createTransactionUseCase = new CreateTransactionUseCase(transactionRepository);
const transactionController = new TransactionController(createTransactionUseCase);

app.use('/transactions', transactionRoutes(transactionController));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});