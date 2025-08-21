import React from "react";
import { useCryptoAutoRefresh } from "@/services/useCryptoAutoRefresh";
import DashboardHeader from "./components/DashboardHeader";
import CryptoTable from "./components/CryptoTable";
import PortfolioCard from "./components/PortfolioCard";
import NewsAlertsCard from "./components/NewsAlertsCard";

const Home: React.FC = () => {
  useCryptoAutoRefresh();

  return (
    <div className="mx-auto px-2 sm:px-4 py-4">
      <DashboardHeader />
      {/* <CryptoChart /> */}
      <CryptoTable />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PortfolioCard />
        <NewsAlertsCard />
      </div>
    </div>
  );
};

export default Home;