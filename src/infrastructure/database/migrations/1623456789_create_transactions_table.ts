import type { MigrationBuilder, ColumnDefinitions } from "node-pg-migrate"
 
export const shorthands: ColumnDefinitions | undefined = undefined
 
export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("transactions", {
    id: { type: "uuid", primaryKey: true },
    card_last_four_digits: { type: "varchar(4)", notNull: true },
    amount: { type: "numeric", notNull: true },
    category: { type: "varchar(50)", notNull: true },
    date: { type: "timestamp", notNull: true },
    status: { type: "varchar(20)", notNull: true },
  })
}
 
export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("transactions")
}