"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import StockCard from "./StockCard";


{/* placeholder for now */}
const popularStocks = [
  {
    ticker: "AAPL",
    name: "Apple Inc.",
    price: "259.04",
    change: 0.13,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    ticker: "NVDA",
    name: "Nvidia Corp",
    price: "185.04",
    change: 0.38,
    logoUrl: "https://upload.wikimedia.org/wikipedia/sco/2/21/Nvidia_logo.svg",
  },
  {
    ticker: "TSLA",
    name: "Tesla, Inc.",
    price: "435.80",
    change: 0.48,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png",
  },
  {
    ticker: "MSFT",
    name: "Microsoft Corp",
    price: "478.11",
    change: -0.34,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    ticker: "UBER",
    name: "Uber Technologies",
    price: "87.59",
    change: 0.00,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png",
  },
  {
    ticker: "WMT",
    name: "Walmart Inc.",
    price: "113.07",
    change: 0.10,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg",
  },
  {
    ticker: "AMD",
    name: "Advanced Micro Devices",
    price: "204.68",
    change: 0.73,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7c/AMD_Logo.svg",
  },
  {
    ticker: "MSTR",
    name: "MicroStrategy Inc",
    price: "166.97",
    change: -0.67,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/77/MicroStrategy_Logo.svg",
  },
];

export default function StockGrid(){
    return(
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-zinc900 mb-10">
                    Most Popular Stocks
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {popularStocks.map((stock) => (
                        <StockCard key={stock.ticker} stock={stock} />
                    ))}
                </div>
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