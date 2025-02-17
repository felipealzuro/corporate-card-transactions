// infrastructure/database/entities/TransactionEntity.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { TransactionStatus } from "../../../domain/entities/Transaction"

@Entity("transactions")
export class TransactionEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column()
  cardId!: string

  @Column("decimal", { precision: 10, scale: 2 })
  amount!: number

  @Column()
  currency!: string

  @Column()
  description!: string

  @Column()
  merchantName!: string

  @Column()
  category!: string

  @Column()
  date!: Date

  @Column({
    type: "enum",
    enum: TransactionStatus,
    default: TransactionStatus.PENDING
  })
  status!: TransactionStatus
}


    

