import { Container } from "inversify"
import { TransactionRepository } from "./domain/repositories/TransactionRepository"
import { CategoryRepository } from "./domain/repositories/CategoryRepository"
import { PostgresTransactionRepository } from "./infrastructure/database/PostgresTransactionRepository"
import { PostgresCategoryRepository } from "./infrastructure/repositories/PostgresCategoryRepository"
import { CreateTransactionUseCase } from "./domain/usecases/CreateTransactionUseCase"
import { GetTransactionsUseCase } from "./domain/usecases/GetTransactionsUseCase"
import { UpdateTransactionStatusUseCase } from "./domain/usecases/UpdateTransactionStatusUseCase"
import { GetExpenseSummaryUseCase } from "./domain/usecases/GetExpenseSummaryUseCase"
import { CreateCategoryUseCase } from "./domain/usecases/CreateCategoryUseCase"

const container = new Container()

// Repositories
container.bind<TransactionRepository>(TransactionRepository).to(PostgresTransactionRepository)
container.bind<CategoryRepository>(CategoryRepository).to(PostgresCategoryRepository)

// Use Cases
container.bind<CreateTransactionUseCase>(CreateTransactionUseCase).toSelf()
container.bind<GetTransactionsUseCase>(GetTransactionsUseCase).toSelf()
container.bind<UpdateTransactionStatusUseCase>(UpdateTransactionStatusUseCase).toSelf()
container.bind<GetExpenseSummaryUseCase>(GetExpenseSummaryUseCase).toSelf()
container.bind<CreateCategoryUseCase>(CreateCategoryUseCase).toSelf()

export { container }

