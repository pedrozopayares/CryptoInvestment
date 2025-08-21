import React, { useEffect, useRef } from 'react';
import { createChart, IChartApi, LineData } from 'lightweight-charts';

interface CryptoChartProps {
  data: { time: string; value: number }[];
  symbol: string;
}

const CryptoChart: React.FC<CryptoChartProps> = ({ data, symbol }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;
    if (chartRef.current) {
      chartRef.current.remove();
    }
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.offsetWidth,
      height: 300,
      layout: {
        background: { color: '#fff' },
        textColor: '#222',
      },
      grid: { vertLines: { color: '#eee' }, horzLines: { color: '#eee' } },
      timeScale: { timeVisible: true, secondsVisible: false },
    });
    chartRef.current = chart;
    const lineSeries = chart.addLineSeries();
    lineSeries.setData(data as LineData[]);
    return () => {
      chart.remove();
    };
  }, [data]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 mb-4">
      <h2 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Histórico de {symbol}</h2>
      <div ref={chartContainerRef} style={{ width: '100%', height: 300 }} />
    </div>
  );
};

export default CryptoChart;
