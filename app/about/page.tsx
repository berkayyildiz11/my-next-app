import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Construction, ArrowLeft } from "lucide-react";

export default function ComingSoon({ title = "Coming Soon", description = "We are currently building this page. Check back soon for updates!" }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      {/* Icon Circle */}
      <div className="bg-indigo-50 p-6 rounded-full mb-6 animate-pulse">
        <Construction className="w-12 h-12 text-indigo-600" />
      </div>
      
      {/* Text Content */}
      <h1 className="text-3xl font-bold text-slate-900 mb-3">
        {title}
      </h1>
      <p className="text-slate-500 max-w-md mb-8 text-lg">
        {description}
      </p>

      {/* Action Button */}
      <Button 
        asChild 
        variant="outline"
        className="rounded-full border-slate-200 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
      >
        <Link href="/" className="flex items-center gap-2">
           <ArrowLeft className="w-4 h-4" />
           Return to Main Menu
        </Link>
      </Button>
    </div>
  );
}