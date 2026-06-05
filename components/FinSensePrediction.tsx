"use client";

import React, { useEffect, useState } from "react";

const predictionPeriods = ["1d", "1w", "1m", "3m", "6m", "1y"] as const;

type PredictionPeriod = (typeof predictionPeriods)[number];

type FinSensePredictionProps = {
  symbol: string;
};

type PredictionSummary = {
  signal?: string;
  score?: number;
  confidence?: Record<string, unknown>;
  [key: string]: unknown;
};

type Explanation = {
  summary?: string;
  baseline_score?: number;
  final_score?: number;
  contributions?: Record<string, number>;
  decision_details?: unknown[];
  [key: string]: unknown;
};

type PredictionResponse = {
  status?: string;
  ticker?: string;
  period?: string;
  prediction?: PredictionSummary;
  weights?: Record<string, unknown>;
  signals?: Record<string, unknown>;
  explanatory_text?: string;
  explanation?: Explanation;
  detail?: unknown;
  error?: unknown;
  message?: unknown;
  [key: string]: unknown;
};

function formatValue(value: unknown) {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "number") {
    return Number.isInteger(value) ? String(value) : value.toFixed(4);
  }

  if (typeof value === "string") {
    return value;
  }

  return JSON.stringify(value, null, 2);
}

function formatPercentLike(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

function getErrorMessage(payload: PredictionResponse) {
  return formatValue(payload.detail ?? payload.error ?? payload.message);
}

function KeyValueGrid({ data }: { data: Record<string, unknown> }) {
  const entries = Object.entries(data);

  if (!entries.length) {
    return null;
  }

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {entries.map(([key, value]) => (
        <div key={key} className="rounded border border-zinc-200 bg-white p-3">
          <div className="text-xs font-semibold uppercase text-zinc-400">
            {key.replaceAll("_", " ")}
          </div>
          <div className="mt-1 whitespace-pre-wrap text-sm text-zinc-800">
            {formatValue(value)}
          </div>
        </div>
      ))}
    </div>
  );
}

function ContributionList({ contributions }: { contributions?: Record<string, number> }) {
  if (!contributions || !Object.keys(contributions).length) {
    return null;
  }

  const sortedContributions = Object.entries(contributions).sort(
    ([, first], [, second]) => Math.abs(second) - Math.abs(first),
  );

  return (
    <div className="rounded border border-zinc-200 bg-zinc-50 p-4">
      <h4 className="text-sm font-semibold text-zinc-900">
        Feature Contributions
      </h4>
      <div className="mt-3 space-y-2">
        {sortedContributions.map(([key, value]) => {
          const isPositive = value >= 0;
          const width = `${Math.min(Math.abs(value) * 100, 100)}%`;

          return (
            <div key={key}>
              <div className="mb-1 flex items-center justify-between gap-3 text-xs">
                <span className="font-medium text-zinc-700">
                  {key.replaceAll("_", " ")}
                </span>
                <span className={isPositive ? "text-emerald-600" : "text-red-600"}>
                  {value >= 0 ? "+" : ""}
                  {value.toFixed(4)}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-zinc-200">
                <div
                  className={isPositive ? "h-full bg-emerald-500" : "h-full bg-red-500"}
                  style={{ width }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DecisionDetails({ details }: { details?: unknown[] }) {
  if (!details?.length) {
    return null;
  }

  return (
    <div className="rounded border border-zinc-200 bg-zinc-50 p-4">
      <h4 className="text-sm font-semibold text-zinc-900">
        Decision Details
      </h4>
      <div className="mt-3 space-y-2">
        {details.map((detail, index) => (
          <div key={index} className="rounded border border-zinc-200 bg-white p-3">
            <pre className="whitespace-pre-wrap font-sans text-sm text-zinc-700">
              {formatValue(detail)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FinSensePrediction({ symbol }: FinSensePredictionProps) {
  const [activePeriod, setActivePeriod] = useState<PredictionPeriod>("1d");
  const [predictionData, setPredictionData] =
    useState<PredictionResponse | null>(null);
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
          `${apiUrl}/api/predict/${encodeURIComponent(symbol)}?period=${encodeURIComponent(activePeriod)}&explain=true`,
          { signal: controller.signal },
        );
        const json = (await response.json()) as PredictionResponse;

        if (!response.ok || json.status === "error") {
          throw new Error(getErrorMessage(json) || "Prediction request failed");
        }

        setPredictionData(json);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        console.error("Failed to fetch prediction:", err);
        setPredictionData(null);
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

  const prediction = predictionData?.prediction;
  const explanation = predictionData?.explanation;
  const signal = prediction?.signal;
  const score = typeof prediction?.score === "number" ? prediction.score : null;

  return (
    <section className="mt-12 rounded-lg border border-zinc-200 bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] transition-colors hover:border-[#061c26]/30">
      <div className="flex flex-col gap-4 border-b border-zinc-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-zinc-900">
            FinSense Prediction
          </h3>
          <p className="mt-1 text-sm text-zinc-500">
            {symbol} {activePeriod} model output
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

      <div className="space-y-5 px-6 py-6">
        {isLoading ? (
          <p className="text-sm text-zinc-500">
            Loading {symbol} {activePeriod} prediction...
          </p>
        ) : error ? (
          <p className="rounded border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </p>
        ) : predictionData ? (
          <>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded border border-zinc-200 bg-zinc-50 p-4">
                <div className="text-xs font-semibold uppercase text-zinc-400">
                  Signal
                </div>
                <div className="mt-1 text-lg font-semibold capitalize text-zinc-900">
                  {signal || "Unavailable"}
                </div>
              </div>
              <div className="rounded border border-zinc-200 bg-zinc-50 p-4">
                <div className="text-xs font-semibold uppercase text-zinc-400">
                  Score
                </div>
                <div className="mt-1 text-lg font-semibold text-zinc-900">
                  {score === null ? "Unavailable" : score.toFixed(4)}
                </div>
              </div>
              <div className="rounded border border-zinc-200 bg-zinc-50 p-4">
                <div className="text-xs font-semibold uppercase text-zinc-400">
                  Confidence
                </div>
                <div className="mt-1 text-sm text-zinc-800">
                  {prediction?.confidence
                    ? formatValue(prediction.confidence)
                    : score === null
                      ? "Unavailable"
                      : formatPercentLike(score)}
                </div>
              </div>
            </div>

            {predictionData.explanatory_text ? (
              <div className="rounded border border-zinc-200 bg-zinc-50 p-4">
                <h4 className="text-sm font-semibold text-zinc-900">
                  Explanation
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                  {predictionData.explanatory_text}
                </p>
              </div>
            ) : null}

            {explanation?.summary ? (
              <div className="rounded border border-zinc-200 bg-zinc-50 p-4">
                <h4 className="text-sm font-semibold text-zinc-900">
                  Model Summary
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                  {explanation.summary}
                </p>
              </div>
            ) : null}

            {explanation ? (
              <KeyValueGrid
                data={{
                  baseline_score: explanation.baseline_score,
                  final_score: explanation.final_score,
                }}
              />
            ) : null}

            <ContributionList contributions={explanation?.contributions} />

            <DecisionDetails details={explanation?.decision_details} />

            {!predictionData.explanatory_text && !explanation ? (
              <pre className="whitespace-pre-wrap rounded border border-zinc-200 bg-zinc-50 p-4 font-sans text-sm text-zinc-700">
                {formatValue(predictionData)}
              </pre>
            ) : null}
          </>
        ) : null}
      </div>
    </section>
  );
}
