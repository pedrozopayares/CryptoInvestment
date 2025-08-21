import { configureStore } from '@reduxjs/toolkit';
import userReducer from './stores/userSlice';
import cryptocurrenciesReducer from './stores/cryptocurrenciesSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    cryptocurrencies: cryptocurrenciesReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store