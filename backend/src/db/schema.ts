import { mysqlTable, varchar, int, decimal, bigint, timestamp, index, foreignKey } from 'drizzle-orm/mysql-core';
import { json } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

// Tabla de criptomonedas
export const cryptocurrencies = mysqlTable('cryptocurrencies', {
  id: int('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  symbol: varchar('symbol', { length: 20 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull(),
  cmcRank: int('cmc_rank'),
  numMarketPairs: int('num_market_pairs'),
  circulatingSupply: decimal('circulating_supply', { precision: 38, scale: 10 }),
  totalSupply: decimal('total_supply', { precision: 38, scale: 10 }),
  maxSupply: decimal('max_supply', { precision: 38, scale: 10 }),
  infiniteSupply: int('infinite_supply'), // 0 o 1
  lastUpdated: timestamp('last_updated'),
  dateAdded: timestamp('date_added'),
  tags: varchar('tags', { length: 10000 }), // CSV de tags
  platform: varchar('platform', { length: 100 }), // nombre plataforma o null
  selfReportedCirculatingSupply: decimal('self_reported_circulating_supply', { precision: 38, scale: 10 }),
  selfReportedMarketCap: decimal('self_reported_market_cap', { precision: 38, scale: 10 }),
  infoJson: json('info_json'), // JSON con info extendida de la API
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
  price: decimal('price', { precision: 50, scale: 10 }).notNull(),
  marketCap: decimal('market_cap', { precision: 50, scale: 10 }),
  volume24h: decimal('volume_24h', { precision: 50, scale: 10 }),
  percentChange1h: decimal('percent_change_1h', { precision: 20, scale: 8 }),
  percentChange24h: decimal('percent_change_24h', { precision: 20, scale: 8 }),
  percentChange7d: decimal('percent_change_7d', { precision: 20, scale: 8 }),
  marketCapDominance: decimal('market_cap_dominance', { precision: 20, scale: 8 }),
  fullyDilutedMarketCap: decimal('fully_diluted_market_cap', { precision: 50, scale: 10 }),
  volumeChange24h: decimal('volume_change_24h', { precision: 50, scale: 10 }),
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
  // userFk: foreignKey({
  //   columns: [table.userId],
  //   foreignColumns: [users.id],
  //   name: 'fk_favorites_user'
  // }),
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
