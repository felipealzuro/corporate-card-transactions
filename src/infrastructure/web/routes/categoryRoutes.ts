import { Router } from "express"
import type { CategoryController } from "../controllers/CategoryController"

export function setupCategoryRoutes(categoryController: CategoryController) {
  const router = Router()

  router.post("/", (req, res) => categoryController.createCategory(req, res))

  return router
}


