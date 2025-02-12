import type { Category } from "../entities/Category"
import { CategoryRepository } from "../repositories/CategoryRepository"

export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(categoryData: Omit<Category, "id">): Promise<Category> {
    return this.categoryRepository.create(categoryData)
  }
}

