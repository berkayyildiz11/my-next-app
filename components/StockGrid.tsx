"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import StockCard from "./StockCard"; // Assuming this is in the same folder

// 1. New Data: Top 8 from your COMPANY_DETAILS list with accurate logos
const popularStocks = [
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

export default function StockGrid() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-zinc-900 mb-10">
          Most Popular Stocks
        </h2>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {popularStocks.map((stock) => (
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