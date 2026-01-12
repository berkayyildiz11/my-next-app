"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

export default function StockCard({ stock }){
    const isPositive = stock.change > 0;
    const isNegative = stock.change < 0;
    
    const changeColor = isPositive 
        ? "text-emerald-500" 
        : isNegative 
            ? "text-red-500" 
            : "text-zinc-500"; // Changed gray to zinc for consistency

    return(
        <Card className="border-none shadow-sm bg-slate-50 hover:bg-slate-100 transition-colors duration-200 rounded-3xl cursor-pointer group">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-white p-2 shadow-sm flex items-center justify-center overflow-hidden">
                        <Image
                            src={stock.logo}
                            alt={`${stock.symbol} Logo`}
                            className="w-full h-full object-contain"
                        />
                        <span className={`text-2xl font-bold ${changeColor}`}>
                            {stock.change === 0 ? "0%" : `${stock.change > 0 ? "+" : ""}${stock.change}%`}
                        </span>
                    </div>

                    <div className="space-y-1">
                        <div className="text-indigo-600 font-semibold text-sm tracking-wide">
                            {stock.ticker}
                        </div>
                        <h3 className="font-bold text-zinc-900 text-lg leading-tight group-hover:text-indigo-600 transition-colors">
                            {stock.companyName}
                        </h3>
                        <p className="text-zinc-600 font-medium">
                            ${stock.price}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}