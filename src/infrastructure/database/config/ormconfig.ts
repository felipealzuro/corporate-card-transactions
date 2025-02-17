// src/infrastructure/database/config/ormconfig.ts
import { DataSource } from "typeorm"
import { TransactionEntity } from "../entities/TransactionEntity"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "transactions_db",
  synchronize: process.env.NODE_ENV === "development",
  logging: process.env.NODE_ENV === "development",
  entities: [TransactionEntity],
  migrations: ["src/infrastructure/database/migrations/*.ts"],
  subscribers: [],
})
