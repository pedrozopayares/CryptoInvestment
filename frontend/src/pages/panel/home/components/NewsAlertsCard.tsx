import React from "react";

const NewsAlertsCard: React.FC = () => (
  <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 mb-4">
    <h2 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">🔹 Noticias / Alertas rápidas</h2>
    <ul className="list-disc pl-5 text-sm text-gray-800 dark:text-white">
      <li>BTC rompe resistencia clave</li>
      <li>Ethereum supera 3,000 USD</li>
    </ul>
  </div>
);

export default NewsAlertsCard;
