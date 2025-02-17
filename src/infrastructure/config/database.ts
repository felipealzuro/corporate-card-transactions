import dotenv from "dotenv"
import { DataSource } from "typeorm"

dotenv.config()

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number.parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: ["src/infrastructure/database/entities/**/*.ts"],
  migrations: ["src/infrastructure/database/migrations/**/*.ts"],
  subscribers: ["src/infrastructure/database/subscribers/**/*.ts"],
})

