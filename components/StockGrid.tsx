"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import StockCard from "./StockCard"; // Assuming this is in the same folder

type PopularStock = {
  ticker: string;
  name: string;
  price: string;
  change: number;
  logoUrl: string;
};

type StockQuote = {
  symbol: string;
  price: number;
  previousClose: number;
  error?: string;
};

// 1. New Data: Top 8 from your COMPANY_DETAILS list with accurate logos
const popularStocks: PopularStock[] = [
  {
    ticker: "AAPL",
    name: "Apple Inc.",
    price: "192.53", // Placeholder price
    change: 0.13,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    ticker: "MSFT",
    name: "Microsoft Corp.",
    price: "402.56",
    change: -0.34,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    ticker: "NVDA",
    name: "NVIDIA Corp.",
    price: "594.91",
    change: 0.38,
    logoUrl: "https://upload.wikimedia.org/wikipedia/sco/2/21/Nvidia_logo.svg",
  },
  {
    ticker: "AMZN",
    name: "Amazon.com Inc.",
    price: "155.34",
    change: 1.20,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    ticker: "GOOGL",
    name: "Alphabet Inc.",
    price: "147.97",
    change: -0.15,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    ticker: "META",
    name: "Meta Platforms Inc.",
    price: "383.45",
    change: 2.14,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
  },
  {
    ticker: "TSLA",
    name: "Tesla Inc.",
    price: "209.20",
    change: 0.48,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png",
  },
  {
    ticker: "AMD",
    name: "Advanced Micro Devices",
    price: "174.23",
    change: 0.73,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7c/AMD_Logo.svg",
  },
];

let cachedStocks: PopularStock[] = popularStocks;
let lastFetched = 0;

function formatPrice(price: number) {
  return price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function getPercentChange(price: number, previousClose: number) {
  if (!previousClose) {
    return 0;
  }

  return Number((((price - previousClose) / previousClose) * 100).toFixed(2));
}

export default function StockGrid() {
  const [stocks, setStocks] = useState<PopularStock[]>(cachedStocks);
  const [isLoading, setIsLoading] = useState(lastFetched === 0);

  useEffect(() => {
    let isMounted = true;

    async function fetchPopularStocks() {
      const now = Date.now();

      if (lastFetched && now - lastFetched < 60000) {
        setStocks(cachedStocks);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      const updates = await Promise.all(
        popularStocks.map(async (stock) => {
          try {
            const response = await fetch(`/api/stock?symbol=${stock.ticker}`);
            const quote = (await response.json()) as StockQuote;

            if (!response.ok || quote.error) {
              throw new Error(quote.error || "Failed to fetch stock quote");
            }

            return {
              ...stock,
              price: formatPrice(quote.price),
              change: getPercentChange(quote.price, quote.previousClose),
            };
          } catch (error) {
            console.error(`Failed to fetch ${stock.ticker}`, error);
            return stock;
          }
        }),
      );

      if (!isMounted) return;

      cachedStocks = updates;
      lastFetched = Date.now();
      setStocks(updates);
      setIsLoading(false);
    }

    fetchPopularStocks();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-zinc-900 mb-10">
          Most Popular Stocks
        </h2>
        {isLoading ? (
          <p className="-mt-6 mb-8 text-center text-sm text-zinc-500">
            Fetching live market values...
          </p>
        ) : null}

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stocks.map((stock) => (
            <Link key={stock.ticker} href={`/us-stocks/${stock.ticker}`}>
              <StockCard stock={stock} />
            </Link>
          ))}
        </div>

        {/* "Load More" Button - Using the Link wrapper method for clean navigation */}
        <div className="flex justify-center">
          <Link href="/us-stocks">
            <Button className="bg-[#081e3d] hover:bg-[#06152d] text-white rounded-full px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all">
              Load More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
