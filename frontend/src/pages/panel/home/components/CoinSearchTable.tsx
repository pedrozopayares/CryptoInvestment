import { RootState } from "@/store";
import React, { useState } from "react";
import { useLoadingIndicator } from "@/components/LoadingProvider";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import { addFavorite, fetchFavorites, removeFavorite } from "@/stores/cryptocurrenciesSlice";

const CoinSearchTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const { currencies, favorites } = useSelector((state: RootState) => state.cryptocurrencies);
  const dispatch = useDispatch<AppDispatch>();
  const { showLoading, hideLoading } = useLoadingIndicator();

  const filtered = currencies?.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 mb-4">
      <input
        type="text"
        className="w-full mb-3 px-3 py-2 border border-gray-200 dark:border-slate-700 rounded focus:outline-none focus:ring focus:border-blue-400 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100"
        placeholder="Buscar moneda..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-slate-700">
              <th className="px-2 py-2 text-left">RANK</th>
              <th className="px-2 py-2 text-left">LOGO</th>
              <th className="px-2 py-2 text-left max-w-[160px] w-auto">NAME (SYMBOL)</th>
              <th className="px-2 py-2 text-left">FAVORITO</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-2 text-gray-500">
                  No se encontraron monedas
                </td>
              </tr>
            ) : (
              filtered.map((coin) => {
                const isFavorite = favorites?.some((fav: { id: number }) => fav.id === coin.id);
                const handleChange = async () => {
                  showLoading();
                  try {
                    if (isFavorite) {
                      await dispatch(removeFavorite(coin.id));
                      await dispatch(fetchFavorites());
                    } else {
                      await dispatch(addFavorite(coin));
                      await dispatch(fetchFavorites());
                    }
                  } finally {
                    hideLoading();
                  }
                };
                return (
                  <tr key={coin.id} className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700">
                    <td className="px-2 py-2 font-semibold">{coin.cmcRank ?? '-'}</td>
                    <td className="px-2 py-2 text-xl">
                      {coin.infoJson?.logo ? (
                        <img src={coin.infoJson.logo} alt={coin.name} className="w-6 h-6 inline-block mr-2" />
                      ) : (
                        <span className="inline-block w-6 h-6 bg-gray-200 dark:bg-slate-600 rounded-full mr-2"></span>
                      )}
                    </td>
                    <td className="px-2 py-2 max-w-[160px] w-auto truncate whitespace-nowrap overflow-hidden">
                      <span title={coin.name}>{coin.name}</span> <span className="text-xs text-gray-400">({coin.symbol})</span>
                    </td>
                    <td className="px-2 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={isFavorite}
                        onChange={handleChange}
                        className="accent-blue-600 h-5 w-5 rounded border-gray-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-400 transition-colors duration-150"
                        style={{ boxShadow: isFavorite ? '0 0 0 2px #2563eb' : undefined }}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoinSearchTable;
