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

        <StockChart
          data={chartData}
          xAxisKey="time"
          yAxisKey="price"
          symbol={symbol}
        />

        <FinSensePrediction symbol={symbol} />
      </div>
    </div>
  );
}
