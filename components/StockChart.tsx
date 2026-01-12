"use client";

import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface StockDataPoint {
  id: string;
  [key: string]: any;
}

// 1. Add 'symbol' to the interface so the component expects it
interface ChartProps {
  data: StockDataPoint[];
  xAxisKey: string;
  yAxisKey: string;
  symbol: string;
}

const periods = ["1G", "1H", "1A", "3A", "1Y", "2Y", "5Y"];

// 2. Destructure 'symbol' from the props
export const StockChart: React.FC<ChartProps> = ({
  data,
  xAxisKey,
  yAxisKey,
  symbol,
}) => {
  const [chartData, setChartData] = useState<StockDataPoint[]>(
    data.length > 0 ? data : []
  );
  const [activePeriod, setActivePeriod] = useState("1G");

  useEffect(() => {
    // 3. Rename function for clarity (fetchAppleData -> fetchStockData)
    const fetchStockData = async () => {
      try {
        // 4. Pass the symbol dynamically in the URL
        // Note: Make sure your API folder is named 'app/api/stock' so this path works
        const response = await fetch(`/api/stock?symbol=${symbol}`);
        const stockData = await response.json();

        if (stockData.error) {
          console.error("API Error:", stockData.error);
          return;
        }

        if (stockData.price !== undefined) {
          const timestamp = new Date().toLocaleTimeString();
          setChartData((prev) => {
            const updated = [
              ...prev,
              {
                id: `${Date.now()}`,
                time: timestamp,
                price: stockData.price,
              },
            ];
            // Keep only last 20 data points
            return updated.slice(-20);
          });
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    // Then fetch every 10 seconds
    const interval = setInterval(fetchStockData, 10000);

    return () => clearInterval(interval);
  }, [symbol]); // 5. Add 'symbol' to the dependency array

  return (
    <div
      className="chart-container"
      style={{
        padding: "20px",
        borderRadius: "8px",
        width: "90%",
        display: "block",
        margin: "0 auto",
      }}
    >
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 60, bottom: 60 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="transparent"
            vertical={true}
          />
          <XAxis
            dataKey={xAxisKey}
            stroke="#888"
            textAnchor="end"
            height={5}
            style={{ fontSize: "12px", strokeDasharray: "3 3" }}
            tick={false}
          />
          <YAxis
            stroke="#888"
            axisLine={false}
            domain={[
              (dataMin: number) => Math.floor(dataMin - 0.5),
              (dataMax: number) => Math.ceil(dataMax + 0.5),
            ]}
            orientation="right"
            style={{ fontSize: "12px" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#444444",
              border: "2px solid #4285F4",
              borderRadius: "8px",
              color: "#fff",
            }}
            formatter={(value: any) => [
              `$${parseFloat(value).toFixed(2)}`,
              "Price",
            ]}
            labelStyle={{ color: "#4285F4" }}
          />
          <Line
            type="monotone"
            dataKey={yAxisKey}
            stroke="#4285F4"
            dot={false}
            activeDot={{ r: 6 }}
            strokeWidth={2}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex justify-between border-t border-gray-100 pt-4">
        <div className="flex gap-6 mx-auto">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              className={`text-sm font-medium px-3 py-1 rounded transition-colors ${
                activePeriod === period
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockChart;
