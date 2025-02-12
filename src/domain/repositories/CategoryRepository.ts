import type { Category } from "../entities/Category"

export interface CategoryRepository {
  create(category: Omit<Category, "id">): Promise<Category>
  findAll(): Promise<Category[]>
}

