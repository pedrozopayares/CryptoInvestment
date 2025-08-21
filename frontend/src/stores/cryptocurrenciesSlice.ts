import { prices } from './../../../backend/src/db/schema';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { currencyService } from '@/services/currencyService';
import { favoritesService } from '@/services/favoritesService';
import { CoinInfoJson, Cryptocurrency, FavoriteWithPrices } from '@/types/Currencies';

export const fetchCryptocurrencies = createAsyncThunk(
  'cryptocurrencies/fetchCryptocurrencies',
  async (_, { rejectWithValue }) => {
    try {
      const res = await currencyService.getCurrencies();
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Error fetching cryptocurrencies');
    }
  }
);

export const fetchFavorites = createAsyncThunk(
  'cryptocurrencies/fetchFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const res = await favoritesService.getFavorites();
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Error fetching favorites');
    }
  }
);


export const fetchFavoritesWithHistory = createAsyncThunk(
  'cryptocurrencies/fetchFavoritesWithHistory',
  async (_, { rejectWithValue }) => {
    try {
      const res = await favoritesService.getFavoritesWithHistory();
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Error fetching favorites');
    }
  }
);

export const addFavorite = createAsyncThunk(
  'cryptocurrencies/addFavorite',
  async (currency: Cryptocurrency, { rejectWithValue }) => {
    try {
      const res = await favoritesService.addFavorite(currency.id);
      return currency;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Error adding favorite');
    }
  }
);

export const removeFavorite = createAsyncThunk(
  'cryptocurrencies/removeFavorite',
  async (cryptocurrencyId: number, { rejectWithValue }) => {
    try {
      const res = await favoritesService.removeFavorite(cryptocurrencyId);
      return cryptocurrencyId;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Error removing favorite');
    }
  }
);

const cryptocurrenciesSlice = createSlice({
  name: 'cryptocurrencies',
  initialState: {
    currencies: [],
    favorites: [],
    history: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptocurrencies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptocurrencies.fulfilled, (state, action) => {
        state.loading = false;
        state.currencies = action.payload;
      })
      .addCase(fetchCryptocurrencies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;

      })
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.loading = false;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.loading = false;
        const currency = action.payload;
        if (!state.favorites.some(fav => fav.id === currency.id)) {
          state.favorites.push(currency);
        }
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removeFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(
          (id) => id !== action.payload
        );
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchFavoritesWithHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavoritesWithHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload?.map((fav: FavoriteWithPrices) => {
          const favorite = state.favorites.find((f: CoinInfoJson) => f.id === fav.cryptocurrencyId);
          const latestPrice = fav.prices?.reduce((latest, current) => {
            return new Date(current.lastUpdated) > new Date(latest.lastUpdated) ? current : latest;
          }) || null;
          const historyGraph = fav.prices?.map(price => ({
            x: new Date(price.lastUpdated).getTime(),
            y: price.price
          })) || [];
          return {
            ...fav,
            favorite: favorite || null,
            latestPrice,
            historyGraph,
            prices: fav.prices.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
          };
        }) || [];
        console.log('Favorites with history fetched:', state.history[0].prices[0]);
      })
      .addCase(fetchFavoritesWithHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cryptocurrenciesSlice.reducer;
