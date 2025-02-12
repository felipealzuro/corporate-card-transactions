import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import type { Repository } from "typeorm"
import { CategoryEntity } from "../database/entities/CategoryEntity"
import type { Category } from "@/domain/entities/Category"
import type { CategoryRepository } from "@/domain/repositories/CategoryRepository"

@Injectable()
export class PostgresCategoryRepository implements CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>
  ) {}

  async create(category: Omit<Category, "id">): Promise<Category> {
    const newCategory = this.categoryRepository.create(category)
    await this.categoryRepository.save(newCategory)
    return newCategory
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find()
  }

  async findById(id: string): Promise<Category | null> {
    return this.categoryRepository.findOne({ where: { id } })
  }
}

