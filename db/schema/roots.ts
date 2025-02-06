import { foreignKey, pgTable, text, uuid } from 'drizzle-orm/pg-core'
import { authUsers } from 'drizzle-orm/supabase'

export const roots = pgTable(
  'roots',
  {
    id: uuid('id').primaryKey().notNull(),
    aud: text('aud').notNull(),
    email: text('email').notNull()
  },
  (table) => [
    foreignKey({
      columns: [table.id],
      foreignColumns: [authUsers.id]
    }).onDelete('cascade')
  ]
)
