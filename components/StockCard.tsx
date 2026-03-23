"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StockData {
    ticker: string;
    name: string;
    price: string | number;
    change: number;
    logoUrl: string;
}

export default function StockCard({ stock }: { stock: StockData }) {
    // Logic for colors and icons
    const isPositive = stock.change > 0;
    const isNegative = stock.change < 0;
    
    const changeColor = isPositive 
        ? "text-emerald-500" 
        : isNegative 
            ? "text-red-500" 
            : "text-zinc-500"; 

    const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;

    return (
        <Card className="@container border-none shadow-sm bg-slate-50 hover:bg-slate-100 transition-colors duration-200 rounded-3xl cursor-pointer --------------------- group w-full">
            <CardContent className="px-4 py-0 h-full w-full">
                <div className="flex justify-between items-start mb-4">
                    <div className="w-[24cqw] h-[24cqw] rounded-full bg-white p-2 shadow-sm flex items-center justify-center overflow-hidden relative">
                        <Image
                            src={stock.logoUrl}
                            alt={`${stock.ticker} Logo`}
                            width={40}
                            height={40}
                            className="object-contain w-full h-auto"
                        />
                    </div>

                    <div className={`shrink-0 flex items-center gap-1 ${changeColor}`}>
                        <TrendIcon className="w-[12cqw] h-[12cqw]" />
                        <span className="text-[10cqw] font-bold">
                            {stock.change === 0 ? "0%" : `${stock.change > 0 ? "+" : ""}${stock.change}%`}
                        </span>
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="text-indigo-600 font-bold text-[9cqw] tracking-wide">
                        {stock.ticker}
                    </div>
                    <h3 className="font-semibold text-zinc-900 text-[8cqw] leading-tight group-hover:text-indigo-600 transition-colors truncate">
                        {stock.name}
                    </h3>
                    <p className="text-zinc-600 font-medium text-[8cqw]">
                        ${stock.price}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}