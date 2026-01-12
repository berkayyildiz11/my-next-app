import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <Button 
        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all"
        asChild>
      <Link href="/us-stocks">
        Load More
      </Link>
    </Button>
  )
}