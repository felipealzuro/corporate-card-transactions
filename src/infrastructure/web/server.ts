import express from "express"
import { container } from "../../container"
import { setupTransactionRoutes } from "./routes/transactionRoutes"
import { setupCategoryRoutes } from "./routes/categoryRoutes"
import { TransactionController } from "./controllers/TransactionController"
import { CategoryController } from "./controllers/CategoryController"

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// Initialize controllers
const transactionController = container.get<TransactionController>(TransactionController)
const categoryController = container.get<CategoryController>(CategoryController)

// Setup routes
app.use("/api/transactions", setupTransactionRoutes(transactionController))
app.use("/api/categories", setupCategoryRoutes(categoryController))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

export { app }

