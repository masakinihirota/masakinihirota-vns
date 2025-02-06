import {
  boolean,
  foreignKey,
  pgTable,
  text,
  timestamp,
  uuid
} from 'drizzle-orm/pg-core'
import { authUsers } from 'drizzle-orm/supabase'

export const roots = pgTable(
  'roots',
  {
    id: uuid('id').primaryKey().notNull(),
    aud: text('aud').notNull(),
    email: text('email').notNull(),
    // ---
    emailConfirmedAt: timestamp('email_confirmed_at'),
    lastSignInAt: timestamp('last_sign_in_at'),
    rawAppMetaData: text('raw_app_meta_data'),
    provider: text('provider').notNull(),
    providers: text('providers').array().notNull(),
    rawUserMetaData: text('raw_user_meta_data'),
    name: text('name'),
    fullName: text('full_name'),
    userName: text('user_name'),
    emailVerified: boolean('email_verified').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at'),
    deletedAt: timestamp('deleted_at'),
    isAnonymous: boolean('is_anonymous').notNull()
  },
  (table) => [
    foreignKey({
      columns: [table.id],
      foreignColumns: [authUsers.id]
    }).onDelete('cascade')
  ]
)
