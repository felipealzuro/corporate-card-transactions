import { Router } from "express"
import type { CategoryController } from "../controllers/CategoryController"

export function setupCategoryRoutes(categoryController: CategoryController) {
  const router = Router()

  router.post("/", categoryController.createCategory.bind(categoryController))

  return router
}

