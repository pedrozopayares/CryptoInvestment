import { mysqlTable, varchar, int, decimal, bigint, timestamp, index, foreignKey } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

// Tabla de criptomonedas
export const cryptocurrencies = mysqlTable('cryptocurrencies', {
  id: int('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  symbol: varchar('symbol', { length: 20 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull(),
  cmcRank: int('cmc_rank'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  symbolIdx: index('idx_symbol').on(table.symbol),
  cmcRankIdx: index('idx_cmc_rank').on(table.cmcRank),
}));

// Tabla de precios históricos
export const prices = mysqlTable('prices', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  cryptocurrencyId: int('cryptocurrency_id').notNull(),
  price: decimal('price', { precision: 20, scale: 8 }).notNull(),
  marketCap: bigint('market_cap', { mode: 'number' }),
  volume24h: bigint('volume_24h', { mode: 'number' }),
  percentChange1h: decimal('percent_change_1h', { precision: 10, scale: 4 }),
  percentChange24h: decimal('percent_change_24h', { precision: 10, scale: 4 }),
  percentChange7d: decimal('percent_change_7d', { precision: 10, scale: 4 }),
  lastUpdated: timestamp('last_updated').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  cryptoUpdatedIdx: index('idx_crypto_updated').on(table.cryptocurrencyId, table.lastUpdated),
  lastUpdatedIdx: index('idx_last_updated').on(table.lastUpdated),
  cryptocurrencyFk: foreignKey({
    columns: [table.cryptocurrencyId],
    foreignColumns: [cryptocurrencies.id],
    name: 'fk_prices_cryptocurrency'
  }),
}));

// Tabla de usuarios (opcional para autenticación futura)
export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  emailIdx: index('idx_email').on(table.email),
  usernameIdx: index('idx_username').on(table.username),
}));

// Tabla de favoritos de usuarios
export const userFavorites = mysqlTable('user_favorites', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id').notNull(),
  cryptocurrencyId: int('cryptocurrency_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  userFk: foreignKey({
    columns: [table.userId],
    foreignColumns: [users.id],
    name: 'fk_favorites_user'
  }),
  cryptocurrencyFk: foreignKey({
    columns: [table.cryptocurrencyId],
    foreignColumns: [cryptocurrencies.id],
    name: 'fk_favorites_cryptocurrency'
  }),
  uniqueUserCrypto: index('idx_unique_user_crypto').on(table.userId, table.cryptocurrencyId),
}));

// Relaciones
export const cryptocurrenciesRelations = relations(cryptocurrencies, ({ many }) => ({
  prices: many(prices),
  userFavorites: many(userFavorites),
}));

export const pricesRelations = relations(prices, ({ one }) => ({
  cryptocurrency: one(cryptocurrencies, {
    fields: [prices.cryptocurrencyId],
    references: [cryptocurrencies.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  favorites: many(userFavorites),
}));

export const userFavoritesRelations = relations(userFavorites, ({ one }) => ({
  user: one(users, {
    fields: [userFavorites.userId],
    references: [users.id],
  }),
  cryptocurrency: one(cryptocurrencies, {
    fields: [userFavorites.cryptocurrencyId],
    references: [cryptocurrencies.id],
  }),
}));
