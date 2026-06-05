"use client";

import React, { useEffect, useState } from "react";

const predictionPeriods = ["1d", "1w", "1m", "3m", "6m", "1y"] as const;

type PredictionPeriod = (typeof predictionPeriods)[number];

type FinSensePredictionProps = {
  symbol: string;
};

type PredictionResponse = string | number | boolean | null | PredictionPayload;

type PredictionPayload = {
  prediction?: unknown;
  message?: unknown;
  result?: unknown;
  data?: unknown;
  error?: unknown;
  detail?: unknown;
  [key: string]: unknown;
};

const periodDescriptions: Record<PredictionPeriod, string> = {
  "1d": "Intraday signal placeholder",
  "1w": "Short-term signal placeholder",
  "1m": "Monthly outlook placeholder",
  "3m": "Quarterly trend placeholder",
  "6m": "Mid-term outlook placeholder",
  "1y": "Long-term view placeholder",
};

function formatPredictionValue(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return JSON.stringify(value, null, 2);
}

function getPredictionText(json: PredictionResponse): string {
  if (typeof json !== "object" || json === null) {
    return formatPredictionValue(json);
  }

  const payload = json as PredictionPayload;
  const candidate =
    payload.prediction ??
    payload.message ??
    payload.result ??
    payload.data ??
    payload.detail ??
    payload.error;

  return formatPredictionValue(candidate ?? payload);
}

export default function FinSensePrediction({ symbol }: FinSensePredictionProps) {
  const [activePeriod, setActivePeriod] = useState<PredictionPeriod>("1d");
  const [prediction, setPrediction] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!symbol) return;

    const controller = new AbortController();

    async function fetchPrediction() {
      setIsLoading(true);
      setError("");

      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        const response = await fetch(
          `${apiUrl}/api/predict/${encodeURIComponent(symbol)}?period=${encodeURIComponent(activePeriod)}`,
          { signal: controller.signal },
        );
        const json = (await response.json()) as PredictionResponse;

        if (!response.ok) {
          throw new Error(getPredictionText(json) || "Prediction request failed");
        }

        setPrediction(getPredictionText(json));
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        console.error("Failed to fetch prediction:", err);
        setPrediction("");
        setError(
          err instanceof Error
            ? err.message
            : "FinSense prediction is unavailable right now.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchPrediction();

    return () => controller.abort();
  }, [symbol, activePeriod]);

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
          <div className="mt-3 min-h-16 text-sm leading-relaxed text-zinc-700">
            {isLoading ? (
              <p>Loading {symbol} {activePeriod} prediction...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : prediction ? (
              <pre className="whitespace-pre-wrap font-sans">{prediction}</pre>
            ) : (
              <p>No prediction is available for this period yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
