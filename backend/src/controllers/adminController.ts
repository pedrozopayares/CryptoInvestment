import type { Request, Response } from 'express';
import { db } from '../db/connection';
import { cryptocurrencies, userFavorites, prices } from '../db/schema';
import { eq, and } from 'drizzle-orm';

export const adminController = {
  // Obtener todas las criptomonedas
  async getCryptocurrencies(req: Request, res: Response) {
    try {
      const cryptos = await db.select().from(cryptocurrencies);
      return res.status(200).json(cryptos);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching cryptocurrencies' });
    }
  },

  // Agregar una criptomoneda a los favoritos del usuario
  async addFavorite(req: Request, res: Response) {
    const user = (req as any).user;
    const { cryptocurrencyId } = req.body;
    if (!user || !cryptocurrencyId) {
      return res.status(400).json({ error: 'User and cryptocurrencyId are required' });
    }
    try {
      // Verifica si ya existe
      const exists = await db.select().from(userFavorites).where(and(eq(userFavorites.userId, user.id), eq(userFavorites.cryptocurrencyId, cryptocurrencyId)));
      if (exists.length > 0) {
        return res.status(409).json({ error: 'Already in favorites' });
      }
      await db.insert(userFavorites).values({ userId: user.id, cryptocurrencyId });
      return res.status(201).json({ message: 'Added to favorites' });
    } catch (error) {
      return res.status(500).json({ error: 'Error adding favorite' });
    }
  },

  // Eliminar una criptomoneda de los favoritos del usuario
  async removeFavorite(req: Request, res: Response) {
    const user = (req as any).user;
    const { cryptocurrencyId } = req.params;
    if (!user || !cryptocurrencyId) {
      return res.status(400).json({ error: 'User and cryptocurrencyId are required' });
    }
    try {
      const deleted = await db.delete(userFavorites)
        .where(and(eq(userFavorites.userId, user.id), eq(userFavorites.cryptocurrencyId, parseInt(cryptocurrencyId || '0'))));
      // Verifica si se eliminó algún favorito
      if (!deleted || (typeof deleted === 'number' && deleted === 0) || (typeof deleted === 'object' && 'affectedRows' in deleted && deleted.affectedRows === 0)) {
        return res.status(404).json({ error: 'Favorite not found' });
      }
      return res.status(200).json({ message: 'Removed from favorites' });
    } catch (error) {
      return res.status(500).json({ error: 'Error removing favorite' });
    }
  },

  // Obtener los favoritos del usuario autenticado
  async getFavorites(req: Request, res: Response) {
    const user = (req as any).user;
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
      const favorites = await db.query.userFavorites.findMany({
        where: (fav, { eq }) => eq(fav.userId, user.id),
        with: { cryptocurrency: true },
      });
      // Devuelve solo la info de la moneda
      return res.status(200).json(favorites.map(fav => fav.cryptocurrency));
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching favorites' });
    }
  },
  // Obtener los favoritos del usuario autenticado con sus prices history
  async getFavoritesWithHistory(req: Request, res: Response) {
    const user = (req as any).user;
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        // Crea una consulta sql en la que se recuperen los datos de la tabla userFavorites con la lista de sus prices asociados
        const rows = await db.select().from(userFavorites)
            .leftJoin(prices, eq(userFavorites.cryptocurrencyId, prices.cryptocurrencyId))
            .where(eq(userFavorites.userId, user.id));

        // Agrupa los resultados por favorito
        const favoritesMap = new Map();
        for (const row of rows) {
          const fav = row.user_favorites;
          const price = row.prices;
          if (!favoritesMap.has(fav.id)) {
            favoritesMap.set(fav.id, {
              id: fav.id,
              userId: fav.userId,
              cryptocurrencyId: fav.cryptocurrencyId,
              createdAt: fav.createdAt,
              prices: []
            });
          }
          if (price && price.id) {
            favoritesMap.get(fav.id).prices.push(price);
          }
        }
        const result = Array.from(favoritesMap.values());
        return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching favorites' });
    }
  }
};
