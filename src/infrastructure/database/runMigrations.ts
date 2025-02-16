import fs from 'fs';
import path from 'path';
import pool from '../config/database';

async function runMigrations() {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const migrationFiles = fs.readdirSync(path.join(__dirname, 'migrations'))
      .sort((a, b) => a.localeCompare(b));

    for (const file of migrationFiles) {
      const migration = fs.readFileSync(path.join(__dirname, 'migrations', file), 'utf-8');
      await client.query(migration);
      console.log(`Executed migration: ${file}`);
    }

    await client.query('COMMIT');
    console.log('All migrations executed successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error executing migrations:', error);
  } finally {
    client.release();
  }
}

runMigrations().then(() => process.exit());