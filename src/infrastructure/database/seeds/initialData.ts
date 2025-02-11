import { Pool } from "pg"
import config from "../../../config"
 
const pool = new Pool(config.database)
 
async function seed() {
  const client = await pool.connect()
 
  try {
    await client.query("BEGIN")
 
    // Seed cards
    await client.query(`
      INSERT INTO cards (id, last_four_digits, cardholder_name, expiration_date, status)
      VALUES 
        ('1', '1234', 'John Doe', '2025-12-31', 'Active'),
        ('2', '5678', 'Jane Smith', '2024-06-30', 'Active')
    `)
 
    // Seed transactions
    await client.query(`
      INSERT INTO transactions (id, card_last_four_digits, amount, category, date, status)
      VALUES 
        ('1', '1234', 100.00, 'Food', '2023-06-01', 'Approved'),
        ('2', '5678', 50.00, 'Transport', '2023-06-02', 'Pending')
    `)
 
    await client.query("COMMIT")
    console.log("Seed data inserted successfully")
  } catch (e) {
    await client.query("ROLLBACK")
    console.error("Error seeding data:", e)
  } finally {
    client.release()
  }
}
 
seed().then(() => pool.end())
 