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
                  <Hero />
              </div>
              <div className="page-wrapper">
                  <div className="page-content">
                      <StockGrid />
                  </div>
              </div>
          </div>
      );
}
