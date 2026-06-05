"use client";

import React, { useMemo, useState } from "react";

const predictionPeriods = ["1d", "1w", "1m", "3m", "6m", "1y"] as const;

type PredictionPeriod = (typeof predictionPeriods)[number];

type FinSensePredictionProps = {
  symbol: string;
};

const periodDescriptions: Record<PredictionPeriod, string> = {
  "1d": "Intraday signal placeholder",
  "1w": "Short-term signal placeholder",
  "1m": "Monthly outlook placeholder",
  "3m": "Quarterly trend placeholder",
  "6m": "Mid-term outlook placeholder",
  "1y": "Long-term view placeholder",
};

export default function FinSensePrediction({ symbol }: FinSensePredictionProps) {
  const [activePeriod, setActivePeriod] = useState<PredictionPeriod>("1d");

  const predictionMessage = useMemo(
    () =>
      `${symbol} ${activePeriod} FinSense prediction will appear here when the AI model output is connected.`,
    [symbol, activePeriod],
  );

  return (
    <section className="mt-12 rounded-lg border border-zinc-200 bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] transition-colors hover:border-[#061c26]/30">
      <div className="flex flex-col gap-4 border-b border-zinc-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-zinc-900">
            FinSense Prediction
          </h3>
          <p className="mt-1 text-sm text-zinc-500">
            {symbol} forecast horizon
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {predictionPeriods.map((period) => (
            <button
              key={period}
              type="button"
              onClick={() => setActivePeriod(period)}
              className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
                activePeriod === period
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
              aria-pressed={activePeriod === period}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="rounded-lg border border-dashed border-zinc-200 bg-zinc-50 px-5 py-5">
          <div className="text-xs font-semibold uppercase text-zinc-400">
            {periodDescriptions[activePeriod]}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-zinc-700">
            {predictionMessage}
          </p>
        </div>
      </div>
    </section>
  );
}
