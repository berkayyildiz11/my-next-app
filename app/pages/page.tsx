import StockChart from '@/components/StockChart';

const EMPTY_DATA: never[] = [];

export default function Home()   {
    return(
        <div>
            <h1 style={{ margin: '20px 0', color: '#fff' }}>Apple Inc. (AAPL) Stock Price</h1>
            <StockChart data={EMPTY_DATA} xAxisKey="time" yAxisKey="price" />
        </div>
    )
}