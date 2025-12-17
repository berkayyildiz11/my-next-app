"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// 1. STATIC DATA
const COMPANY_DETAILS: Record<string, { name: string; revenue: string }> = {
  AAPL: { name: "Apple Inc.", revenue: "394.3B" },
  MSFT: { name: "Microsoft Corp.", revenue: "198.3B" },
  NVDA: { name: "NVIDIA Corp.", revenue: "26.9B" },
  AMZN: { name: "Amazon.com Inc.", revenue: "469.8B" },
  GOOGL: { name: "Alphabet Inc.", revenue: "257.6B" },
  META: { name: "Meta Platforms Inc.", revenue: "117.9B" },
  TSLA: { name: "Tesla Inc.", revenue: "81.5B" },
  AVGO: { name: "Broadcom Inc.", revenue: "33.2B" },
  NFLX: { name: "Netflix Inc.", revenue: "31.6B" },
  INTC: { name: "Intel Corp.", revenue: "63.1B" },
  CSCO: { name: "Cisco Systems Inc.", revenue: "51.5B" },
  ADBE: { name: "Adobe Inc.", revenue: "17.6B" },
  QCOM: { name: "Qualcomm Inc.", revenue: "33.6B" },
  PYPL: { name: "PayPal Holdings Inc.", revenue: "25.3B" },
  AMD: { name: "Advanced Micro Devices Inc.", revenue: "23.6B" },
  TMUS: { name: "T-Mobile US Inc.", revenue: "80.1B" },
  COST: { name: "Costco Wholesale Corp.", revenue: "226.9B" },
  BKNG: { name: "Booking Holdings Inc.", revenue: "17.1B" },
  AMGN: { name: "Amgen Inc.", revenue: "26.0B" },
  SBUX: { name: "Starbucks Corp.", revenue: "32.2B" },
};

const TARGET_SYMBOLS = Object.keys(COMPANY_DETAILS);

export type Stocks = {
  symbol: string;
  name: string;
  revenue: string;
  price: string | null;
  change: string | null;
  lastFetched: number; // <--- 1. NEW FIELD: Tracks time per stock
};

// 2. GLOBAL CACHE
let globalStockData: Stocks[] = TARGET_SYMBOLS.map((symbol) => ({
  symbol,
  name: COMPANY_DETAILS[symbol].name,
  revenue: COMPANY_DETAILS[symbol].revenue,
  price: null,
  change: null,
  lastFetched: 0, // Initialize as 0 (never fetched)
}));

// We can remove globalLastFetchTime as we now track per item
// let globalLastFetchTime = 0;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const columns: ColumnDef<Stocks>[] = [
  {
    accessorKey: "symbol",
    header: "Symbol",
    cell: ({ row }) => (
      <Link
        href={`/us-stocks/${row.original.symbol}`}
        className="text-black font-bold"
      >
        {row.original.symbol}
      </Link>
    ),
  },
  {
    accessorKey: "name",
    header: "Company Name",
    cell: ({ row }) => (
      <Link href={`/us-stocks/${row.original.symbol}`} className="text-black">
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
    cell: ({ getValue }) => (
      <span className="text-black">${getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ getValue }) => {
      const val = getValue<string | null>();
      if (!val) return <Skeleton className="h-4 w-16 bg-gray-700" />;
      return <span>{val}</span>;
    },
  },
  {
    accessorKey: "change",
    header: "Change",
    cell: ({ getValue }) => {
      const value = getValue<string | null>();
      if (!value) return <Skeleton className="h-4 w-12 bg-gray-700" />;

      let colorClass = "text-gray-500";
      if (value.startsWith("+")) colorClass = "text-green-600";
      if (value.startsWith("-")) colorClass = "text-red-600";
      return <span className={colorClass}>{value}</span>;
    },
  },
];

export default function StocksList() {
  const router = useRouter();

  const [data, setData] = React.useState<Stocks[]>(globalStockData);
  const [globalFilter, setGlobalFilter] = React.useState("");

  // Only show "Loading..." if the first item has never been fetched
  const [isFirstLoad, setIsFirstLoad] = React.useState(
    globalStockData[0].price === null
  );

  const [lastUpdated, setLastUpdated] = React.useState<string>("");

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  React.useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;

    const performFetch = async () => {
      const chunkSize = 5;

      for (let i = 0; i < TARGET_SYMBOLS.length; i += chunkSize) {
        if (!isMounted) return;

        const chunk = TARGET_SYMBOLS.slice(i, i + chunkSize);

        // --- 2. SMART CHECK: SKIP IF FRESH ---
        // Check if all items in this chunk were fetched recently (< 60 seconds)
        const now = Date.now();
        const isChunkFresh = chunk.every((symbol) => {
          const cachedItem = globalStockData.find((s) => s.symbol === symbol);
          // If item exists AND was fetched less than 60s ago
          return cachedItem && now - cachedItem.lastFetched < 60000;
        });

        if (isChunkFresh) {
          // console.log(`Skipping chunk ${chunk[0]}... - Data is fresh`);
          continue; // Skip this iteration immediately
        }
        // -------------------------------------

        const promises = chunk.map(async (symbol) => {
          try {
            const res = await fetch(`/api/stock?symbol=${symbol}`);
            const stockData = await res.json();
            if (stockData.error) throw new Error(stockData.error);

            const current = stockData.price;
            const prev = stockData.previousClose;
            let changeString = "0.00%";
            if (current && prev) {
              const change = ((current - prev) / prev) * 100;
              const sign = change >= 0 ? "+" : "";
              changeString = `${sign}${change.toFixed(2)}%`;
            }
            return {
              symbol,
              price: `$${stockData.price}`,
              change: changeString,
            };
          } catch (error) {
            console.error(`Failed to fetch ${symbol}`, error);
            return null;
          }
        });

        const results = await Promise.all(promises);

        if (isMounted) {
          setData((prevData) => {
            const updates = new Map(
              results.filter((r) => r !== null).map((r) => [r!.symbol, r!])
            );

            const newData = prevData.map((item) => {
              if (updates.has(item.symbol)) {
                const update = updates.get(item.symbol)!;
                return {
                  ...item,
                  price: update.price,
                  change: update.change,
                  lastFetched: Date.now(), // <--- 3. UPDATE TIMESTAMP
                };
              }
              return item;
            });

            globalStockData = newData; // Sync global cache
            return newData;
          });

          setLastUpdated(new Date().toLocaleTimeString());
        }

        if (i + chunkSize < TARGET_SYMBOLS.length) {
          await delay(2000);
        }
      }

      if (isMounted) {
        setIsFirstLoad(false);
        // Restart loop in 5 seconds (it will skip fresh data anyway)
        timeoutId = setTimeout(() => performFetch(), 5000);
      }
    };

    performFetch();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-6">
        <div className="flex items-center">
          <Input
            placeholder="Search stocks or companies..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="w-[600px] border-gray-700 focus:border-blue-500"
          />
          {isFirstLoad && (
            <span className="ml-4 text-black animate-pulse text-sm">
              Fetching live data...
            </span>
          )}
        </div>

        {lastUpdated && (
          <div className="text-black text-sm">
            Last updated:{" "}
            <span className="text-black font-mono">{lastUpdated}</span>
          </div>
        )}
      </div>
      <div className="w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-gray-800 hover:bg-transparent"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-gray-600 font-semibold py-4"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => router.push(`/us-stocks/${row.original.symbol}`)}
                className="border-b border-gray-400 hover:bg-gray-900/30 transition-colors cursor-pointer"
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
