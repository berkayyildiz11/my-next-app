"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import StockCard from "./StockCard";

export default function StockGrid(){
    return(
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-zinc900 mb-10">
                    Header Placeholder
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {/* <StockCard /> */}
                </div>
                <div className="flex justify-center">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all">
                    Load More
                    </Button>
                </div>
            </div>
        </section>
    );
}