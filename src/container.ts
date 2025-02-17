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
import { TransactionController } from "./infrastructure/web/controllers/TransactionController"
import { CategoryController } from "./infrastructure/web/controllers/CategoryController"
import { AppDataSource } from "./infrastructure/config/database"

const container = new Container()

// Repositories
container.bind<TransactionRepository>(TYPES.TransactionRepository).to(PostgresTransactionRepository)
container.bind<CategoryRepository>(TYPES.CategoryRepository).to(PostgresCategoryRepository)

// Use Cases
container.bind<CreateTransactionUseCase>(TYPES.CreateTransactionUseCase).to(CreateTransactionUseCase)
container.bind<GetTransactionsUseCase>(TYPES.GetTransactionsUseCase).to(GetTransactionsUseCase)
container.bind<UpdateTransactionStatusUseCase>(TYPES.UpdateTransactionStatusUseCase).to(UpdateTransactionStatusUseCase)
container.bind<GetExpenseSummaryUseCase>(TYPES.GetExpenseSummaryUseCase).to(GetExpenseSummaryUseCase)
container.bind<CreateCategoryUseCase>(TYPES.CreateCategoryUseCase).to(CreateCategoryUseCase)

// Controllers
container.bind<TransactionController>(TYPES.TransactionController).to(TransactionController)
container.bind<CategoryController>(TYPES.CategoryController).to(CategoryController)

// TypeORM Repositories
container.bind(TYPES.TransactionEntityRepository).toDynamicValue(() => {
  return AppDataSource.getRepository("TransactionEntity")
})
container.bind(TYPES.CategoryEntityRepository).toDynamicValue(() => {
  return AppDataSource.getRepository("CategoryEntity")
})

export { container }



