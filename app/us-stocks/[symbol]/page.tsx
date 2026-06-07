// app/us-stocks/[symbol]/page.tsx
import FinSensePrediction from "@/components/FinSensePrediction";
import StockChart from "@/components/StockChart";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

type Props = {
  params: Promise<{ symbol: string }>;
};

export default async function StockDetailPage(props: Props) {
  const params = await props.params;
  const symbol = params.symbol.toUpperCase();

  // The real data is now being fetched dynamically inside <StockChart />
  const chartData: any[] = [];

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <br />
        <Breadcrumb>
          <BreadcrumbList className="justify-center">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Main Menu</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/us-stocks">US Stocks</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{symbol}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 style={{ margin: "20px 0", color: "#fff" }}>
          {symbol} Stock Price
        </h1>

        <div className="space-y-12">
          <section aria-label={`${symbol} stock chart`} className="relative z-0">
            <StockChart
              key={`chart-${symbol}`}
              data={chartData}
              xAxisKey="time"
              yAxisKey="price"
              symbol={symbol}
            />
          </section>

          <section
            aria-label={`${symbol} FinSense prediction`}
            className="relative z-0"
          >
            <FinSensePrediction key={`prediction-${symbol}`} symbol={symbol} />
          </section>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const symbol = params.symbol.toUpperCase();

  return {
    title: `${symbol} Stock | FinSense`,
    description: `Real-time financial analysis and stock prediction for ${symbol}`,
  };
}
