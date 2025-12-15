"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
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
} from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data: Stocks[] = [
  { symbol: "AAPL", name: "Apple Inc.", revenue: "394.3B", price: "$150.00", change: "+1.2%" },
  { symbol: "MSFT", name: "Microsoft Corp.", revenue: "198.3B", price: "$280.00", change: "+0.8%" },
  { symbol: "NVDA", name: "NVIDIA Corp.", revenue: "26.9B", price: "$450.00", change: "+2.4%" },
  { symbol: "AMZN", name: "Amazon.com Inc.", revenue: "469.8B", price: "$3300.00", change: "+0.3%" },
  { symbol: "GOOGL", name: "Alphabet Inc.", revenue: "257.6B", price: "$2700.00", change: "-0.5%" },
  { symbol: "META", name: "Meta Platforms Inc.", revenue: "117.9B", price: "$330.00", change: "+1.0%" },
  { symbol: "TSLA", name: "Tesla Inc.", revenue: "81.5B", price: "$700.00", change: "-1.1%" },
  { symbol: "AVGO", name: "Broadcom Inc.", revenue: "33.2B", price: "$820.00", change: "+0.6%" },
  { symbol: "NFLX", name: "Netflix Inc.", revenue: "31.6B", price: "$500.00", change: "+0.9%" },
  { symbol: "INTC", name: "Intel Corp.", revenue: "63.1B", price: "$30.00", change: "-0.8%" },
  { symbol: "CSCO", name: "Cisco Systems Inc.", revenue: "51.5B", price: "$50.00", change: "+0.2%" },
  { symbol: "ADBE", name: "Adobe Inc.", revenue: "17.6B", price: "$600.00", change: "+1.5%" },
  { symbol: "QCOM", name: "Qualcomm Inc.", revenue: "33.6B", price: "$140.00", change: "+0.4%" },
  { symbol: "PYPL", name: "PayPal Holdings Inc.", revenue: "25.3B", price: "$75.00", change: "-0.6%" },
  { symbol: "AMD", name: "Advanced Micro Devices Inc.", revenue: "23.6B", price: "$100.00", change: "+1.8%" },
  { symbol: "TMUS", name: "T-Mobile US Inc.", revenue: "80.1B", price: "$150.00", change: "+0.9%" },
  { symbol: "COST", name: "Costco Wholesale Corp.", revenue: "226.9B", price: "$480.00", change: "+0.5%" },
  { symbol: "BKNG", name: "Booking Holdings Inc.", revenue: "17.1B", price: "$2500.00", change: "+1.3%" },
  { symbol: "AMGN", name: "Amgen Inc.", revenue: "26.0B", price: "$260.00", change: "-0.2%" },
  { symbol: "SBUX", name: "Starbucks Corp.", revenue: "32.2B", price: "$100.00", change: "+0.7%" },
];

export type Stocks = {
    symbol: string;
    name?: string;
    revenue?: string;
    price?: string;
    change?: string;
}

export const columns: ColumnDef<Stocks>[] = [
  {
    accessorKey: "symbol",
    header: "Symbol",
  },
  {
    accessorKey: "name",
    header: "Company Name",
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
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
      let colorClass: string;
      switch (true) {
        case value.startsWith('+'):
          colorClass = 'text-green-500';
          break;
        case value.startsWith('-'):
          colorClass = 'text-red-500';
          break;
        default:
          colorClass = 'text-gray-500';
      }
      return (
        <span className={colorClass}>
          {value}
        </span>
      );
    }
  },
];

export default function StocksList() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const router = useRouter()

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
  })

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
      </div>
      <div className="w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-gray-800 hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-gray-600 font-semibold py-4">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => router.push(`/us-stocks/${((row.original.symbol).toLowerCase())}`)}
                  className="border-b border-gray-400 hover:bg-gray-900/30 transition-colors cursor-pointer"
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}