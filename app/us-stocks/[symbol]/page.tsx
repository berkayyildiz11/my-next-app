// app/us-stocks/[symbol]/page.tsx
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

async function getStockData(symbol: string) {
  const apiKey = process.env.FINNHUB_API_KEY;
  const res = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const data = await res.json();

  return [
    {
      id: "current-price", // <--- ADDED THIS LINE TO FIX THE ERROR
      time: new Date().toLocaleTimeString(),
      price: data.c,
    },
  ];
}

export default async function StockDetailPage(props: Props) {
  const params = await props.params;
  const symbol = params.symbol.toUpperCase();

  const stockData = await getStockData(symbol);

  // Use stockData if it exists, otherwise use empty array
  // We explicitly cast it to 'any' here if your types are very strict,
  // but adding the 'id' above should solve the main issue.
  const chartData = stockData || [];

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

        {chartData.length > 0 && (
          <h2 className="text-xl text-white mb-4">
            Current Price: ${chartData[0].price}
          </h2>
        )}

        <StockChart
          data={chartData}
          xAxisKey="time"
          yAxisKey="price"
          symbol={symbol} // <--- ADD THIS PROP
        />
      </div>
    </div>
  );
}
