import type { Request, Response } from "express"
import { inject, injectable } from "inversify"
import { CreateCategoryUseCase } from "@/domain/usecases/CreateCategoryUseCase"

@injectable()
export class CategoryController {
  constructor(
    @inject(CreateCategoryUseCase) private createCategoryUseCase: CreateCategoryUseCase
  ) {}

  async createCategory(req: Request, res: Response) {
    try {
      const category = await this.createCategoryUseCase.execute(req.body)
      res.status(201).json(category)
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  }
}

