import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Using Finnhub API for real stock data
        const finnhubApiKey = process.env.FINNHUB_API_KEY;

        if (!finnhubApiKey) {
            return NextResponse.json(
                { error: 'FINNHUB_API_KEY not configured' },
                { status: 500 }
            );
        }

        const response = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=AAPL&token=${finnhubApiKey}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch from Finnhub');
        }

        const data = await response.json();

        if (!data.c) {
            throw new Error('Invalid response from Finnhub');
        }

        return NextResponse.json({
            symbol: 'AAPL',
            price: data.c, // Current price
            high: data.h,
            low: data.l,
            open: data.o,
            previousClose: data.pc,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Error fetching stock data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch stock data' },
            { status: 500 }
        );
    }
}

