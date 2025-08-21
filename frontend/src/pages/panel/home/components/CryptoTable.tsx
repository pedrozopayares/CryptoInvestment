import { RootState } from "@/store";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const CryptoTable: React.FC = () => {
    const { history, loading } = useSelector((state: RootState) => state.cryptocurrencies);
        const [openRow, setOpenRow] = useState<number | null>(null);

        // Si el panel abierto ya no existe tras el refresco, ciérralo
        useEffect(() => {
            if (openRow !== null && !history?.some((coin: any) => coin.id === openRow)) {
                setOpenRow(null);
            }
        }, [history, openRow]);

  return (
    <>
        {
            loading ? (
                <div className="text-center py-4">
                    <span className="text-gray-500">Cargando favoritos...</span>
                </div>  
            ) : (
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 mb-4 overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                        <tr className="border-b border-gray-200 dark:border-slate-700">
                            <th className="px-2 py-2 text-left">RANK</th>
                            <th className="px-2 py-2 text-left">LOGO</th>
                            <th className="px-2 py-2 text-left">NAME (SYMBOL)</th>
                            <th className="px-2 py-2 text-left">PRICE (USD)</th>
                            <th className="px-2 py-2 text-left">1h %</th>
                            <th className="px-2 py-2 text-left">24h %</th>
                            <th className="px-2 py-2 text-left">7d %</th>
                            <th className="px-2 py-2 text-left">Gráfica</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            !history || history.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-2">
                                        <span className="text-gray-500">No tienes favoritos aún</span>
                                    </td>
                                </tr>
                            ) : history.map((coin, idx) => (
                            <React.Fragment key={coin.id}>
                                <tr
                                    className={`border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer ${openRow === coin.id ? 'bg-blue-50 dark:bg-slate-900' : ''}`}
                                    onClick={() => setOpenRow(openRow === coin.id ? null : coin.id)}
                                >
                                    <td className="px-2 py-2 font-semibold">{coin.favorite?.cmcRank}</td>
                                    <td className="px-2 py-2 text-xl">
                                        { coin.favorite?.infoJson?.logo ? (
                                                <img src={coin.favorite?.infoJson?.logo} alt={coin.favorite.name} className="w-6 h-6 inline-block mr-2" /> 
                                            ) : (
                                                <span className="inline-block w-6 h-6 bg-gray-200 rounded-full mr-2"></span>
                                            )
                                        }
                                    </td>
                                    <td className="px-2 py-2">{coin.favorite?.name}</td>
                                    <td className="px-2 py-2">{coin.latestPrice?.price}</td>
                                    <td className={`px-2 py-2 font-semibold ${coin.latestPrice?.percentChange1h?.startsWith("-") ? "text-red-600" : "text-green-600"}`}>{coin.latestPrice?.percentChange1h}</td>
                                    <td className={`px-2 py-2 font-semibold ${coin.latestPrice?.percentChange24h?.startsWith("-") ? "text-red-600" : "text-green-600"}`}>{coin.latestPrice?.percentChange24h}</td>
                                    <td className={`px-2 py-2 font-semibold ${coin.latestPrice?.percentChange7d?.startsWith("-") ? "text-red-600" : "text-green-600"}`}>{coin.latestPrice?.percentChange7d}</td>
                                    <td className="px-2 py-2">
                                        <div className="w-full h-16 bg-gray-100 dark:bg-slate-700 rounded-lg overflow-hidden">
                                            {coin.historyGraph && coin.historyGraph.length > 0 ? (
                                                <div className="h-full relative">
                                                    <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                                                    {(() => {
                                                            // Normalizar los puntos a la vista 100x50
                                                            const points = coin.historyGraph;
                                                            if (!points || points.length === 0) return null;
                                                            // Obtener min/max para normalizar
                                                            const minY = Math.min(...points.map(p => Number(p.y)));
                                                            const maxY = Math.max(...points.map(p => Number(p.y)));
                                                            const minX = Math.min(...points.map(p => Number(p.x)));
                                                            const maxX = Math.max(...points.map(p => Number(p.x)));
                                                            // Evitar división por cero
                                                            const rangeY = maxY - minY || 1;
                                                            const rangeX = maxX - minX || 1;
                                                            // Normalizar a 100x50 (invertir Y para SVG)
                                                            const svgPoints = points.map(p => {
                                                                    const x = ((Number(p.x) - minX) / rangeX) * 100;
                                                                    const y = 50 - ((Number(p.y) - minY) / rangeY) * 50;
                                                                    return `${x},${y}`;
                                                            }).join(" ");
                                                            return (
                                                                    <polyline
                                                                            fill="none"
                                                                            stroke="#4A90E2"
                                                                            strokeWidth="1.5"
                                                                            points={svgPoints}
                                                                    />
                                                            );
                                                            })()}
                                                        </svg>
                                                </div>
                                            ) : (
                                                    <span className="text-gray-500">Sin datos</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={8} className="p-0 border-b border-gray-200 dark:border-slate-700">
                                        <div
                                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openRow === coin.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
                                            style={{
                                                willChange: 'max-height, opacity',
                                            }}
                                        >
                                            <div className="p-4 bg-blue-50 dark:bg-slate-900">
                                                {/* Panel de detalle */}
                                                <div className="flex flex-col md:flex-row gap-4">
                                                    <div className="flex-1">
                                                        <div className="font-bold text-lg mb-2">{coin.favorite?.name} ({coin.favorite?.symbol})</div>
                                                        <div className="text-sm text-gray-500 mb-2">{coin.favorite?.slug}</div>
                                                        <div className="mb-2">{coin.favorite?.infoJson?.description}</div>
                                                        <div className="text-xs text-gray-400 mb-2">Última actualización: {coin.latestPrice?.lastUpdated}</div>
                                                        <div className="flex flex-wrap gap-2 mt-2">
                                                            {coin.favorite?.infoJson?.tags?.slice(0, 8).map((tag: string) => (
                                                                <span key={tag} className="bg-blue-100 text-blue-800 dark:bg-slate-700 dark:text-blue-200 rounded px-2 py-1 text-xs">{tag}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 min-w-[200px]">
                                                        <div className="font-semibold mb-1">Links:</div>
                                                        <ul className="text-xs list-disc list-inside">
                                                            {coin.favorite?.infoJson?.urls?.website?.map((url: string) => (
                                                                <li key={url}><a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Sitio web</a></li>
                                                            ))}
                                                            {coin.favorite?.infoJson?.urls?.explorer?.map((url: string) => (
                                                                <li key={url}><a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Explorer</a></li>
                                                            ))}
                                                            {coin.favorite?.infoJson?.urls?.reddit?.map((url: string) => (
                                                                <li key={url}><a href={url} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">Reddit</a></li>
                                                            ))}
                                                            {coin.favorite?.infoJson?.urls?.source_code?.map((url: string) => (
                                                                <li key={url}><a href={url} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:underline">Código fuente</a></li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </React.Fragment>
                            ))}
                        {/* <tr>
                            <td colSpan={6} className="text-center py-2">
                            <button className="text-blue-600 hover:underline text-sm">[Ver más ↓]</button>
                            </td>
                        </tr> */}
                        </tbody>
                    </table>
                </div>
            )
        }
    </>
  );
};

export default CryptoTable;
