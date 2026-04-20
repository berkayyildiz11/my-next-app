import Hero from '@/components/Hero';
import StockGrid from '@/components/StockGrid';

export default function MainMenu() {
    return (
        <div>
            <div>
                <Hero 
                    title={<>US Stocks <br /> Real-Time Data Visualization and Analysis Platform</>}
                    description="Real-time stock data, in-depth analysis, and a user-friendly interface to empower your investment decisions."
                    showButton={true}
                    buttonText="Detailed Information"
                    showScrollPulse={false}
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