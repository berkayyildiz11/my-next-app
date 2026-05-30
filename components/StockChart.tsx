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

// Changed "5Y" to "3Y" to match the maximum allowed by your backend API
const periods = ["1G", "1H", "1A", "3A", "1Y", "2Y", "3Y"];

const periodMap: Record<string, string> = {
  "1G": "1d",
  "1H": "1w",
  "1A": "1m",
  "3A": "3m",
  "1Y": "1y",
  "2Y": "2y",
  "3Y": "3y",
};

// 2. Destructure 'symbol' from the props
export const StockChart: React.FC<ChartProps> = ({
  data,
  xAxisKey,
  yAxisKey,
  symbol,
}) => {
  const [activePeriod, setActivePeriod] = useState("1G");
  const [chartData, setChartData] = useState<StockDataPoint[]>(data || []);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchChartData() {
      if (!symbol) return;
      setIsLoading(true);
      try {
        const backendPeriod = periodMap[activePeriod];
        // Defaults to local backend if NEXT_PUBLIC_API_URL isn't set in your .env
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

        const response = await fetch(
          `${apiUrl}/api/stocks/${symbol}/chart?period=${backendPeriod}`,
        );
        const json = await response.json();

        if (json.status === "success" && json.data) {
          const formattedData = json.data.map((item: any, index: number) => {
            const dateObj = new Date(item.date);

            // Show exact time for 1 Day ("1G"), otherwise just show the date
            const timeLabel =
              activePeriod === "1G"
                ? dateObj.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : dateObj.toLocaleDateString();

            return {
              id: `${item.date}-${index}`,
              [xAxisKey]: timeLabel,
              [yAxisKey]: item.price,
            };
          });

          setChartData(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch chart data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchChartData();
  }, [symbol, activePeriod, xAxisKey, yAxisKey]);

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
            type="natural"
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
