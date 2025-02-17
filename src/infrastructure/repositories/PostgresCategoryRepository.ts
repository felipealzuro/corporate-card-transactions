import { injectable, inject } from "inversify"
import { TYPES } from "../../domain/symbols"
import type { CategoryRepository } from "../../domain/repositories/CategoryRepository"
import type { Category } from "../../domain/entities/Category"
import type { Repository } from "typeorm"
import type { CategoryEntity } from "../database/entities/CategoryEntity"

@injectable()
export class PostgresCategoryRepository implements CategoryRepository {
  constructor(
    @inject(TYPES.CategoryEntityRepository) private repository: Repository<CategoryEntity>
  ) {}

  async create(category: Omit<Category, "id">): Promise<Category> {
    const newCategory = this.repository.create(category)
    await this.repository.save(newCategory)
    return newCategory
  }

  async findAll(): Promise<Category[]> {
    return this.repository.find()
  }
}


