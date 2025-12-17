"use client";

import * as React from "react";
import Link from "next/link";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// 1. STATIC DATA (Source of Truth for Name & Revenue)
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
  price: string;
  change: string;
};

// 2. COLUMNS
export const columns: ColumnDef<Stocks>[] = [
  {
    accessorKey: "symbol",
    header: "Symbol",
    cell: ({ row }) => (
      <Link
        href={`/us-stocks/${row.original.symbol}`}
        className="text-blue-500 font-bold hover:underline"
      >
        {row.original.symbol}
      </Link>
    ),
  },
  {
    accessorKey: "name",
    header: "Company Name",
    cell: ({ row }) => (
      <Link
        href={`/us-stocks/${row.original.symbol}`}
        className="hover:text-blue-400 hover:underline"
      >
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
  },
  {
    accessorKey: "change",
    header: "Change",
    cell: ({ getValue }) => {
      const value = getValue<string>();
      let colorClass = "text-gray-500";
      if (value.startsWith("+")) colorClass = "text-green-500";
      if (value.startsWith("-")) colorClass = "text-red-500";
      return <span className={colorClass}>{value}</span>;
    },
  },
];

export default function StocksList() {
  const [data, setData] = React.useState<Stocks[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  React.useEffect(() => {
    async function fetchAllStocks() {
      setIsLoading(true);

      const promises = TARGET_SYMBOLS.map(async (symbol) => {
        try {
          // Get Static Data (Name, Revenue)
          const staticInfo = COMPANY_DETAILS[symbol];

          // Get Live Data (Price)
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

          // MERGE THEM
          return {
            symbol: symbol,
            name: staticInfo.name, // From our static list
            revenue: staticInfo.revenue, // From our static list
            price: `$${stockData.price}`,
            change: changeString,
          };
        } catch (error) {
          console.error(`Failed to fetch ${symbol}`, error);
          // Fallback if API fails: show static data with placeholders
          const staticInfo = COMPANY_DETAILS[symbol];
          return {
            symbol: symbol,
            name: staticInfo.name,
            revenue: staticInfo.revenue,
            price: "N/A",
            change: "-",
          };
        }
      });

      const results = await Promise.all(promises);
      const validResults = results.filter(
        (item): item is Stocks => item !== null
      );

      setData(validResults);
      setIsLoading(false);
    }

    fetchAllStocks();
  }, []);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-6">
        <Input
          placeholder="Search stocks..."
          value={(table.getColumn("symbol")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("symbol")?.setFilterValue(event.target.value)
          }
          className="max-w-sm border-gray-700 focus:border-blue-500"
        />
        {isLoading && (
          <span className="ml-4 text-yellow-500">Updating live prices...</span>
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-gray-400 hover:bg-gray-900/30 transition-colors"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500"
                >
                  {isLoading ? "Fetching market data..." : "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
