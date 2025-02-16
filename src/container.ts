import { Container } from "inversify"
import { TYPES } from "./domain/symbols"
import type { TransactionRepository } from "./domain/repositories/TransactionRepository"
import type { CategoryRepository } from "./domain/repositories/CategoryRepository"
import { PostgresTransactionRepository } from "./infrastructure/repositories/PostgresTransactionRepository"
import { PostgresCategoryRepository } from "./infrastructure/repositories/PostgresCategoryRepository"
import { CreateTransactionUseCase } from "./domain/usecases/CreateTransactionUseCase"
import { GetTransactionsUseCase } from "./domain/usecases/GetTransactionsUseCase"
import { UpdateTransactionStatusUseCase } from "./domain/usecases/UpdateTransactionStatusUseCase"
import { GetExpenseSummaryUseCase } from "./domain/usecases/GetExpenseSummaryUseCase"
import { CreateCategoryUseCase } from "./domain/usecases/CreateCategoryUseCase"
import { Pool } from "pg"

const container = new Container()

// Database
container.bind<Pool>(TYPES.DbPool).toConstantValue(
  new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number.parseInt(process.env.DB_PORT || "5432"),
  }),
)

// Repositories
container.bind<TransactionRepository>(TYPES.TransactionRepository).to(PostgresTransactionRepository)
container.bind<CategoryRepository>(TYPES.CategoryRepository).to(PostgresCategoryRepository)

// Use Cases
container.bind<CreateTransactionUseCase>(TYPES.CreateTransactionUseCase).to(CreateTransactionUseCase)
container.bind<GetTransactionsUseCase>(TYPES.GetTransactionsUseCase).to(GetTransactionsUseCase)
container.bind<UpdateTransactionStatusUseCase>(TYPES.UpdateTransactionStatusUseCase).to(UpdateTransactionStatusUseCase)
container.bind<GetExpenseSummaryUseCase>(TYPES.GetExpenseSummaryUseCase).to(GetExpenseSummaryUseCase)
container.bind<CreateCategoryUseCase>(TYPES.CreateCategoryUseCase).to(CreateCategoryUseCase)

export { container }


