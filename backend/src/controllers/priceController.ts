import type { Request, Response } from 'express';
import { db } from '../db/connection';
import { prices } from '../db/schema';
import { eq } from 'drizzle-orm';

export const priceController = {
  // Obtener histórico de precios de una criptomoneda
  async getPriceHistory(req: Request, res: Response) {
    const { cryptocurrencyId } = req.params;
    if (!cryptocurrencyId) {
      return res.status(400).json({ error: 'cryptocurrencyId is required' });
    }
    try {
      const history = await db.select().from(prices)
        .where(eq(prices.cryptocurrencyId, Number(cryptocurrencyId)))
        .orderBy(prices.lastUpdated);
      return res.status(200).json(history);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching price history' });
    }
  }
};
