import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("categories")
export class CategoryEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column()
  name!: string
}