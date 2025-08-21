import axios from 'axios';
import cron from 'node-cron';
import { db } from '../db/connection';
import { cryptocurrencies, prices } from '../db/schema';
import { eq } from 'drizzle-orm';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.COINMARKETCAP_API_KEY;
const BASE_URL = process.env.COINMARKETCAP_BASE_URL || 'https://pro-api.coinmarketcap.com';
const UPDATE_INTERVAL = parseInt(process.env.COINMARKETCAP_UPDATE_INTERVAL || '190000');
const INFO_UPDATE_INTERVAL = parseInt(process.env.COINMARKETCAP_INFO_UPDATE_INTERVAL || '3600000'); // default: 1h
// Actualiza infoJson para todos los ids de cryptocurrencies
async function updateAllCoinInfoJson() {
  try {
    // Obtener solo los ids de monedas que sean favoritas de algún usuario
    const favoriteIdsResult = await db.execute(`SELECT DISTINCT cryptocurrency_id as id FROM user_favorites`);
    const ids = (Array.isArray(favoriteIdsResult[0]) ? favoriteIdsResult[0] : []) as { id: number }[];
    if (!ids.length) return;
    // Lotes de 100 ids para evitar error 414
    const chunkSize = 100;
    let updatedCount = 0;
    for (let i = 0; i < ids.length; i += chunkSize) {
      const chunkIds = ids.slice(i, i + chunkSize);
      const chunk = chunkIds.map(obj => obj.id).join(',');
      const response = await axiosInstance.get('/v2/cryptocurrency/info', {
        params: { id: chunk },
      });
      const data = response.data.data;
      for (const id of Object.keys(data)) {
        const info = data[id];
        await db.update(cryptocurrencies)
          .set({ infoJson: info, updatedAt: new Date() })
          .where(eq(cryptocurrencies.id, Number(id)));
        updatedCount++;
      }
      // Espera 2 minutos entre cada chunk para evitar rate limit
      if (i + chunkSize < ids.length) {
        console.log(`[CoinMarketCap] Esperando 2 minutos antes de procesar el siguiente chunk de favoritos...`);
        await new Promise(res => setTimeout(res, 2 * 60 * 1000));
      }
    }
    console.log(`[CoinMarketCap] infoJson actualizado para ${updatedCount} monedas favoritas`);
  } catch (error) {
    console.error('[CoinMarketCap] Error actualizando infoJson:', error);
  }
}

// Convierte milisegundos a expresión cron (solo soporta múltiplos de minutos)
function msToCron(ms: number): string {
  const min = Math.max(1, Math.round(ms / 60000));
  return `*/${min} * * * *`;
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-CMC_PRO_API_KEY': API_KEY,
    'Accept': 'application/json',
  },
});

// Fetch latest listings (dashboard)
export async function fetchAndStoreLatestListings() {
  try {
    const response = await axiosInstance.get('/v1/cryptocurrency/listings/latest', {
      params: { limit: 5000 },
    });
    const data = response.data.data;
    if (!Array.isArray(data)) return;

    for (const coin of data) {
      // Upsert cryptocurrency
      const [existing] = await db.select().from(cryptocurrencies).where(eq(cryptocurrencies.id, coin.id));
      const tagsCsv = Array.isArray(coin.tags) ? coin.tags.join(',') : null;
      const platformName = coin.platform?.name || null;
      const infiniteSupply = coin.infinite_supply ? 1 : 0;
      const cryptoValues = {
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        slug: coin.slug,
        cmcRank: coin.cmc_rank,
        numMarketPairs: coin.num_market_pairs,
        circulatingSupply: coin.circulating_supply,
        totalSupply: coin.total_supply,
        maxSupply: coin.max_supply,
        infiniteSupply,
        lastUpdated: coin.last_updated ? new Date(coin.last_updated) : null,
        dateAdded: coin.date_added ? new Date(coin.date_added) : null,
        tags: tagsCsv,
        platform: platformName,
        selfReportedCirculatingSupply: coin.self_reported_circulating_supply,
        selfReportedMarketCap: coin.self_reported_market_cap,
        updatedAt: new Date(),
      };
      if (!existing) {
        await db.insert(cryptocurrencies).values(cryptoValues);
      } else {
        await db.update(cryptocurrencies)
          .set(cryptoValues)
          .where(eq(cryptocurrencies.id, coin.id));
      }

      // Insert price snapshot (solo USD)
      const usd = coin.quote?.USD ?? {};
      await db.insert(prices).values({
        cryptocurrencyId: coin.id,
        price: usd.price ?? 0,
        marketCap: usd.market_cap ?? 0,
        volume24h: usd.volume_24h ?? 0,
        percentChange1h: usd.percent_change_1h ?? 0,
        percentChange24h: usd.percent_change_24h ?? 0,
        percentChange7d: usd.percent_change_7d ?? 0,
        marketCapDominance: usd.market_cap_dominance ?? 0,
        fullyDilutedMarketCap: usd.fully_diluted_market_cap ?? 0,
        volumeChange24h: usd.volume_change_24h ?? 0,
        lastUpdated: usd.last_updated ? new Date(usd.last_updated) : new Date(),
      });
    }
    console.log(`[CoinMarketCap] Listings updated: ${data.length} coins`);
  } catch (error) {
    console.error('[CoinMarketCap] Error fetching listings:', error);
  }
}

// Fetch info for a specific coin (details)
export async function fetchAndStoreCoinInfo(coinId: number) {
  try {
    const response = await axiosInstance.get('/v2/cryptocurrency/info', {
      params: { id: coinId },
    });
    const info = response.data.data?.[coinId];
    if (info) {
      await db.update(cryptocurrencies)
        .set({ infoJson: info, updatedAt: new Date() })
        .where(eq(cryptocurrencies.id, coinId));
    }
    return info;
  } catch (error) {
    console.error(`[CoinMarketCap] Error fetching info for coin ${coinId}:`, error);
    return null;
  }
}

// Cron job setup usando node-cron
export function startCoinMarketCapCron() {
  // Cron para precios y datos básicos
  // fetchAndStoreLatestListings(); // Run immediately on start
  const cronExpr = msToCron(UPDATE_INTERVAL);
  cron.schedule(cronExpr, fetchAndStoreLatestListings, { timezone: 'UTC' });
  console.log(`[CoinMarketCap] Cron started. Expression: ${cronExpr} (interval: ${UPDATE_INTERVAL}ms)`);

  // Cron para info extendida (infoJson)
  updateAllCoinInfoJson(); // Run immediately on start
  console.info(`[CoinMarketCap] InfoJson cron started. Running immediately on start.`, INFO_UPDATE_INTERVAL);
  const infoCronExpr = msToCron(INFO_UPDATE_INTERVAL || 3600000); // default: 1h
  cron.schedule(infoCronExpr, updateAllCoinInfoJson, { timezone: 'UTC' });
  console.log(`[CoinMarketCap] InfoJson cron started. Expression: ${infoCronExpr} (interval: ${INFO_UPDATE_INTERVAL}ms)`);
}
