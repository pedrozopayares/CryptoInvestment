import React from "react";

const PortfolioCard: React.FC = () => (
  <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 mb-4">
    <h2 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">🔹 Portafolio rápido</h2>
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
      <div>Invertido: <span className="font-bold text-gray-800 dark:text-white">$1,200</span></div>
      <div>Valor actual: <span className="font-bold text-green-600 dark:text-green-400">$1,450</span></div>
      <div className="text-green-600 dark:text-green-400">+20.8%</div>
    </div>
    <div className="mt-2 text-sm">Top holding: <span className="font-bold text-purple-700 dark:text-purple-300">ETH 70%</span></div>
  </div>
);

export default PortfolioCard;
