import { Router } from 'express';
import { adminController } from '../controllers/adminController';
import { tokenValidation } from '../middleware/tokenValidation';
import { priceController } from '../controllers/priceController';

const router = Router();


// Obtener todas las criptomonedas
router.get('/cryptocurrencies', tokenValidation, adminController.getCryptocurrencies);

// Histórico de precios de una criptomoneda
router.get('/cryptocurrencies/:cryptocurrencyId/history', tokenValidation, priceController.getPriceHistory);

// Agregar una criptomoneda a los favoritos del usuario
router.post('/favorites', tokenValidation, adminController.addFavorite);

// Eliminar una criptomoneda de los favoritos del usuario
router.delete('/favorites/:cryptocurrencyId', tokenValidation, adminController.removeFavorite);

// Obtener los favoritos del usuario autenticado
router.get('/favorites', tokenValidation, adminController.getFavorites);

// Obtener los favoritos del usuario autenticado con sus prices history
router.get('/favorites/history', tokenValidation, adminController.getFavoritesWithHistory);

export default router;
