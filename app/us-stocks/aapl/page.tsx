import StockChart from '@/components/StockChart';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from 'next/link';

const EMPTY_DATA: never[] = [];

export default function Home()   {
    return(
        <div className="page-wrapper">
            <div className="page-content">
                <br></br>
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
                        <BreadcrumbPage>Apple Inc. (AAPL)</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <h1 style={{ margin: '20px 0', color: '#fff' }}>Apple Inc. (AAPL) Stock Price</h1>
                <StockChart data={EMPTY_DATA} xAxisKey="time" yAxisKey="price" />
            </div>
        </div>
    )
}