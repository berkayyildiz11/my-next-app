"use client";
import Hero from "@/components/Hero";
import StockGrid from "@/components/StockGrid";

export default function Home() {

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
