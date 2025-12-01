'use client';

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StockDataPoint {
    id: string;
    [key: string]: any;
}

interface ChartProps {
    data: StockDataPoint[];
    xAxisKey: string;
    yAxisKey: string;
}

export const StockChart: React.FC<ChartProps> = ({ data, xAxisKey, yAxisKey }) => {
    const [chartData, setChartData] = useState<StockDataPoint[]>(data.length > 0 ? data : []);

    useEffect(() => {
        const fetchAppleData = async () => {
            try {
                const response = await fetch('/api/stock');
                const stockData = await response.json();

                if (stockData.error) {
                    console.error('API Error:', stockData.error);
                    return;
                }

                if (stockData.price !== undefined) {
                    const timestamp = new Date().toLocaleTimeString();
                    setChartData((prev) => {
                        const updated = [...prev, {
                            id: `${Date.now()}`,
                            time: timestamp,
                            price: stockData.price,
                        }];
                        // Keep only last 20 data points
                        return updated.slice(-20);
                    });
                }
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };

        // Fetch immediately
        fetchAppleData();

        // Then fetch every 10 seconds
        const interval = setInterval(fetchAppleData, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="chart-container" style={{ backgroundColor: '#000', padding: '20px', borderRadius: '8px', width: '33.33%', display: 'inline-block' }}>
            <ResponsiveContainer width="100%" height={500}>
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 60, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={true} />
                    <XAxis 
                        dataKey={xAxisKey} 
                        stroke="#888" 
                        interval={2}
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                        stroke="#888"
                        domain={['dataMin - 0.5', 'dataMax + 0.5']}
                        label={{ value: 'Price (USD)', angle: -90, position: 'insideLeft', offset: 10, fill: '#888' }}
                        style={{ fontSize: '12px' }}
                    />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#1a1a1a', border: '2px solid #4285F4', borderRadius: '8px', color: '#fff' }}
                        formatter={(value: any) => [`$${parseFloat(value).toFixed(2)}`, 'Price']}
                        labelStyle={{ color: '#4285F4' }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Line 
                        type="monotone" 
                        dataKey={yAxisKey} 
                        stroke="#4285F4" 
                        dot={{ fill: '#4285F4', r: 4 }}
                        activeDot={{ r: 6 }}
                        strokeWidth={2}
                        isAnimationActive={true}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StockChart;
