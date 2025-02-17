export const TYPES = {
  DbPool: Symbol.for("DbPool"),
  TransactionRepository: Symbol.for("TransactionRepository"),
  CategoryRepository: Symbol.for("CategoryRepository"),
  CreateTransactionUseCase: Symbol.for("CreateTransactionUseCase"),
  GetTransactionsUseCase: Symbol.for("GetTransactionsUseCase"),
  UpdateTransactionStatusUseCase: Symbol.for("UpdateTransactionStatusUseCase"),
  GetExpenseSummaryUseCase: Symbol.for("GetExpenseSummaryUseCase"),
  CreateCategoryUseCase: Symbol.for("CreateCategoryUseCase"),
  TransactionController: Symbol.for("TransactionController"),
  CategoryController: Symbol.for("CategoryController"),
  TransactionEntityRepository: Symbol.for("TransactionEntityRepository"),
  CategoryEntityRepository: Symbol.for("CategoryEntityRepository"),
  DataSource: Symbol.for("DataSource"),
}

