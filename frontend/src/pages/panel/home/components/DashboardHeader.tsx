import PrimaryButton from "@/components/form/PrimaryButton";
import { AddCircle } from "iconsax-react";
import React, { useState } from "react";
import Modal from "./Modal";
import CoinSearchTable from "./CoinSearchTable";

const DashboardHeader: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">CryptoInvestment</h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <PrimaryButton
            onClick={() => setModalOpen(true)}
            className="w-full sm:w-auto"
            icon={<AddCircle size="32" color="#fff" />}
          >
            Agregar favorito
          </PrimaryButton>
          <button className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm flex items-center gap-1">
            <span role="img" aria-label="filtros">⚙️</span> Filtros
          </button>
          <button className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm flex items-center gap-1">
            <span role="img" aria-label="ordenar">📈</span> Ordenar por: MarketCap
          </button>
        </div>
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Buscar y agregar moneda</h2>
        <CoinSearchTable />
      </Modal>
    </>
  );
};

export default DashboardHeader;
