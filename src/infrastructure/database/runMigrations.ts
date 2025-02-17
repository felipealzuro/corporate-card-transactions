import { AppDataSource } from "../config/database"

async function runMigrations() {
  try {
    await AppDataSource.initialize()
    await AppDataSource.runMigrations()
    console.log("Migrations have been executed successfully.")
  } catch (error) {
    console.error("Error during migration execution:", error)
  } finally {
    await AppDataSource.destroy()
  }
}

runMigrations()

