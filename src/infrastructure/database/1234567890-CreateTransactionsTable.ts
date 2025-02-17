// src/infrastructure/database/migrations/1234567890-CreateTransactionsTable.ts
import { TransactionStatus } from "@/domain/entities/Transaction"
import { MigrationInterface, QueryRunner, Table } from "typeorm"
export class CreateTransactionsTable1234567890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "transactions",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "cardId",
            type: "varchar",
          },
          {
            name: "amount",
            type: "decimal",
            precision: 10,
            scale: 2,
          },
          {
            name: "currency",
            type: "varchar",
          },
          {
            name: "category",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "date",
            type: "timestamp with time zone",
          },
          {
            name: "merchantName",
            type: "varchar",
          },
          {
            name: "status",
            type: "enum",
            enum: Object.values(TransactionStatus),
            default: `'${TransactionStatus.PENDING}'`,
          },
        ],
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("transactions")
  }
}
