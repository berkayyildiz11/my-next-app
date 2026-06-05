"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  DefaultZIndexes,
  ErrorBar,
  Line,
  LineChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type BarShapeProps,
  type TooltipContentProps,
} from "recharts";

interface StockDataPoint {
  id: string;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  price?: number;
  [key: string]: any;
}

interface ChartProps {
  data: StockDataPoint[];
  xAxisKey: string;
  yAxisKey: string;
  symbol: string;
}

const periods = ["1d", "1w", "1m", "3m", "1y", "2y", "3y"] as const;
const chartTypes = [
  { id: "line", label: "Line Chart" },
  { id: "candlestick", label: "Candlestick Chart" },
] as const;

type ChartPeriod = (typeof periods)[number];
type ChartType = (typeof chartTypes)[number]["id"];

const maxVisibleCandles = 90;

function getNumericValue(item: any, keys: string[]) {
  for (const key of keys) {
    const value = Number(item[key]);

    if (Number.isFinite(value)) {
      return value;
    }
  }

  return undefined;
}

function getCandleValues(item: any, previousClose?: number) {
  const close =
    getNumericValue(item, ["close", "c", "price", "adjClose"]) ??
    previousClose ??
    0;
  const open =
    getNumericValue(item, ["open", "o"]) ?? previousClose ?? close;
  const high = getNumericValue(item, ["high", "h"]) ?? Math.max(open, close);
  const low = getNumericValue(item, ["low", "l"]) ?? Math.min(open, close);

  return { open, high, low, close };
}

function getPointPrice(point: StockDataPoint) {
  return Number(point.close ?? point.open ?? point.price ?? 0);
}

function buildVisibleCandles(data: StockDataPoint[]) {
  if (data.length <= maxVisibleCandles) {
    return data;
  }

  const chunkSize = Math.ceil(data.length / maxVisibleCandles);
  const candles: StockDataPoint[] = [];

  for (let index = 0; index < data.length; index += chunkSize) {
    const chunk = data.slice(index, index + chunkSize);
    const first = chunk[0];
    const last = chunk[chunk.length - 1];

    if (!first || !last) {
      continue;
    }

    const open = first.open ?? getPointPrice(first);
    const close = last.close ?? getPointPrice(last);
    const high = Math.max(
      ...chunk.map((point) => point.high ?? point.close ?? point.open ?? 0),
    );
    const low = Math.min(
      ...chunk.map((point) => point.low ?? point.close ?? point.open ?? 0),
    );

    candles.push({
      ...last,
      id: `${first.id}-${last.id}`,
      open,
      high,
      low,
      close,
    });
  }

  return candles;
}

const candlestickBodyDataKey = (entry: StockDataPoint): [number, number] => [
  Math.min(entry.close ?? 0, entry.open ?? 0),
  Math.max(entry.close ?? 0, entry.open ?? 0),
];

const candlestickWhiskerDataKey = (
  entry: StockDataPoint,
): [number, number] => {
  const open = entry.open ?? 0;
  const close = entry.close ?? 0;
  const high = entry.high ?? Math.max(open, close);
  const low = entry.low ?? Math.min(open, close);
  const highEnd = Math.max(open, close);

  return [highEnd - low, high - highEnd];
};

function Candlestick(props: BarShapeProps) {
  const point = props.payload as StockDataPoint | undefined;
  const fill =
    point?.open !== undefined &&
    point?.close !== undefined &&
    point.open < point.close
      ? "#16a34a"
      : "#dc2626";

  return <Rectangle {...props} fill={fill} />;
}

function StockTooltip({ active, label, payload }: TooltipContentProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const point = payload[0]?.payload as StockDataPoint | undefined;

  if (!point) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: "#444444",
        border: "2px solid #4285F4",
        borderRadius: "8px",
        color: "#fff",
        padding: "10px 12px",
      }}
    >
      <div style={{ color: "#8fb7ff", marginBottom: "6px" }}>{label}</div>
      {point.open !== undefined &&
      point.high !== undefined &&
      point.low !== undefined &&
      point.close !== undefined ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
          <span>Open</span>
          <span>${point.open.toFixed(2)}</span>
          <span>High</span>
          <span>${point.high.toFixed(2)}</span>
          <span>Low</span>
          <span>${point.low.toFixed(2)}</span>
          <span>Close</span>
          <span>${point.close.toFixed(2)}</span>
        </div>
      ) : (
        <div className="text-xs">
          Price: ${Number(point.price ?? payload[0]?.value).toFixed(2)}
        </div>
      )}
    </div>
  );
}

export const StockChart: React.FC<ChartProps> = ({
  data,
  xAxisKey,
  yAxisKey,
  symbol,
}) => {
  const [activePeriod, setActivePeriod] = useState<ChartPeriod>("1d");
  const [activeChartType, setChartType] = useState<ChartType>("line");
  const [chartData, setChartData] = useState<StockDataPoint[]>(data || []);
  const [isLoading, setIsLoading] = useState(false);
  const candlestickData = useMemo(
    () => buildVisibleCandles(chartData),
    [chartData],
  );

  useEffect(() => {
    async function fetchChartData() {
      if (!symbol) return;

      setIsLoading(true);

      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        const response = await fetch(
          `${apiUrl}/api/stocks/${symbol}/chart?period=${activePeriod}`,
        );
        const json = await response.json();

        if (json.status === "success" && json.data) {
          let previousClose: number | undefined;

          const formattedData = json.data.map((item: any, index: number) => {
            const rawDate = item.date ?? item.time ?? item.timestamp;
            const dateObj = new Date(rawDate);
            const { open, high, low, close } = getCandleValues(
              item,
              previousClose,
            );
            previousClose = close;

            const timeLabel =
              activePeriod === "1d"
                ? dateObj.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : dateObj.toLocaleDateString();

            return {
              id: `${rawDate}-${index}`,
              [xAxisKey]: timeLabel,
              [yAxisKey]: close,
              price: close,
              open,
              high,
              low,
              close,
            };
          });

          setChartData(formattedData);
        } else {
          setChartData([]);
        }
      } catch (error) {
        console.error("Failed to fetch chart data:", error);
        setChartData([]);
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
      <div className="flex justify-between pb-4">
        <div className="flex gap-6 mx-auto">
          {chartTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setChartType(type.id)}
              className={`text-sm font-medium px-3 py-1 rounded transition-colors ${
                activeChartType === type.id
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={500}>
        {activeChartType === "line" ? (
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
            <Tooltip content={(props) => <StockTooltip {...props} />} />
            <Line
              type="natural"
              dataKey={yAxisKey}
              stroke="#4285F4"
              dot={
                chartData.length <= 1
                  ? { r: 4, fill: "#4285F4", stroke: "#4285F4" }
                  : false
              }
              activeDot={{ r: 6 }}
              strokeWidth={2}
              isAnimationActive={true}
            />
          </LineChart>
        ) : (
          <BarChart
            data={candlestickData}
            barCategoryGap="35%"
            margin={{ top: 20, right: 30, left: 60, bottom: 50 }}
          >
            <CartesianGrid
              stroke="#d4d4d8"
              strokeDasharray="0"
              vertical={false}
            />
            <XAxis
              dataKey={xAxisKey}
              interval="preserveStartEnd"
              minTickGap={28}
              stroke="#71717a"
              tickLine={false}
              height={35}
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="#71717a"
              domain={[
                (dataMin: number) => Math.floor(dataMin - 1),
                (dataMax: number) => Math.ceil(dataMax + 1),
              ]}
              orientation="right"
              style={{ fontSize: "12px" }}
              tickFormatter={(value: number) => `$${value.toFixed(2)}`}
            />
            <Tooltip content={(props) => <StockTooltip {...props} />} />
            <Bar
              dataKey={candlestickBodyDataKey}
              isAnimationActive={false}
              maxBarSize={12}
              minPointSize={2}
              shape={Candlestick}
            >
              <ErrorBar
                dataKey={candlestickWhiskerDataKey}
                width={0}
                stroke="#18181b"
                strokeWidth={1.5}
                zIndex={DefaultZIndexes.bar - 1}
              />
            </Bar>
          </BarChart>
        )}
      </ResponsiveContainer>

      <div className="flex justify-between border-t border-gray-100 pt-4">
        <div className="flex gap-6 mx-auto">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              aria-pressed={activePeriod === period}
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

      {isLoading ? (
        <p className="pt-3 text-center text-xs text-zinc-400">
          Loading {symbol} {activePeriod} chart...
        </p>
      ) : null}
    </div>
  );
};

export default StockChart;
