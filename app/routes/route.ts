import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Fetch Apple stock data from Yahoo Finance API
        const response = await fetch(
            'https://query1.finance.yahoo.com/v10/finance/quoteSummary/AAPL?modules=price',
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0',
                },
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch stock data');
        }

        const data = await response.json();
        const price = data.quoteSummary.result[0].price.regularMarketPrice.raw;
        const currency = data.quoteSummary.result[0].price.currency;

        // Return stock data with timestamp
        return NextResponse.json({
            symbol: 'AAPL',
            price,
            currency,
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
