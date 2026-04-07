"use client"; // Required for Next.js App Router
import { useEffect } from "react";
import { io } from "socket.io-client";
import Hero from "@/components/Hero";
import StockGrid from "@/components/StockGrid";

export default function Home() {
  useEffect(() => {
    // Connect to your backend
    const socket = io("http://localhost:4000");

    socket.on("connect", () => {
      console.log("Connected to backend", socket.id);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
          <div>
              <div>
                  <Hero 
                    title={
                        <>
                            <span className="text-white-300">US</span> Stocks
                            <br />
                            Real-Time Data Visualization and Analysis Platform
                        </>
                    }
                    description="Real-time stock data, in-depth analysis, and a user-friendly interface to empower your investment decisions."
                    buttonText="Detailed Information"
                    buttonLink="/about"
                  />
              </div>
              <div className="page-wrapper">
                  <div className="page-content">
                      <StockGrid />
                  </div>
              </div>
          </div>
      );
}
