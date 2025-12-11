import StockChart from '@/components/StockChart';

const EMPTY_DATA: never[] = [];

export default function Home()   {
    return(
        <div className="page-wrapper">
            <div className="page-content">
                <h1 style={{ margin: '20px 0', color: '#fff' }}>Apple Inc. (AAPL) Stock Price</h1>
                <StockChart data={EMPTY_DATA} xAxisKey="time" yAxisKey="price" />
            </div>
        </div>
    )
}