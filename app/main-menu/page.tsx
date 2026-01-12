import Hero from '@/components/Hero';
import StockGrid from '@/components/StockGrid';

export default function MainMenu() {
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