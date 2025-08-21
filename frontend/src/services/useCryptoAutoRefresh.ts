import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import { fetchCryptocurrencies, fetchFavorites, fetchFavoritesWithHistory } from "@/stores/cryptocurrenciesSlice";

/**
 * Hook que refresca automáticamente los datos de criptomonedas y favoritos cada 30 segundos.
 * Se ejecuta en segundo plano y es transparente para el usuario.
 */
export function useCryptoAutoRefresh() {
  const dispatch = useDispatch<AppDispatch>();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Función para refrescar los datos
    const refresh = () => {
      dispatch(fetchCryptocurrencies());
      dispatch(fetchFavorites());
      dispatch(fetchFavoritesWithHistory());
    };
    // Llamada inicial
    refresh();
    // Intervalo cada 30 segundos
    intervalRef.current = setInterval(refresh, 30000);
    // Limpieza al desmontar
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [dispatch]);
}
