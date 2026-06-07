import StocksList from "@/components/StocksList";

export default function StocksListPage() {
  return (
    <div className="page-wrapper">
      <div className="page-content">
        <StocksList />
      </div>
    </div>
  );
}

export const metadata = {
  title: "US Stocks | FinSense",
  description: "Browse and analyze US stocks with real-time data and insights.",
};