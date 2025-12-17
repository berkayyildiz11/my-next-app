import { NextResponse } from "next/server";

// 1. Accept the 'request' object to read the URL parameters
export async function GET(request: Request) {
  try {
    // 2. Extract the symbol from the query params (e.g., ?symbol=MSFT)
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get("symbol");

    // Check if symbol exists
    if (!symbol) {
      return NextResponse.json(
        { error: "Stock symbol is required" },
        { status: 400 }
      );
    }

    const finnhubApiKey = process.env.FINNHUB_API_KEY;

    if (!finnhubApiKey) {
      return NextResponse.json(
        { error: "FINNHUB_API_KEY not configured" },
        { status: 500 }
      );
    }

    // 3. Use the dynamic 'symbol' variable here instead of "AAPL"
    const response = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${finnhubApiKey}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from Finnhub");
    }

    const data = await response.json();

    // Finnhub returns {c: 0, ...} for invalid symbols sometimes, checking data.c is good.
    // Note: data.c can be 0, so check against undefined or null if needed,
    // but simple !data.c might block valid 0 values (rare for stocks but possible).
    // For now, your existing check is okay.

    return NextResponse.json({
      symbol: symbol.toUpperCase(), // 4. Return the correct symbol name
      price: data.c,
      high: data.h,
      low: data.l,
      open: data.o,
      previousClose: data.pc,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return NextResponse.json(
      { error: "Failed to fetch stock data" },
      { status: 500 }
    );
  }
}
