"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsItem {
  ticker: string;
  timestamp: string;
  headline: string;
  summary: string;
  source: string;
  url: string;
}

export default function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 10;

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(
          `${apiUrl}/api/news?page=${page}&limit=${limit}`
        );

        const json = await response.json();

        if (json.status === "success") {
          setNews(json.data);
          setTotalPages(json.totalPages ?? 1);
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [page]);

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <h2 className="text-3xl font-bold text-center text-zinc-900 mb-10">
          Latest Market News
        </h2>

        {loading && (
          <p className="text-center text-gray-500 mb-6">Loading news...</p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
		  {news.map((item, index) => (
			<a
				key={`${item.url}-${item.timestamp}-${index}`}
				href={item.url}
				target="_blank"
				rel="noopener noreferrer"
				className="group p-6 border border-zinc-200 bg-white rounded-2xl shadow-sm hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between h-full w-full"
			>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                    {item.ticker} • {item.source} •{" "}
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-zinc-900 leading-tight mb-3 group-hover:text-indigo-600 transition-colors">
                  {item.headline}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {item.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200 flex items-center text-indigo-600">
                <span className="text-sm font-semibold">
                  Read full article
                </span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </div>
            </a>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4">
          <Button
            variant="outline"
            disabled={page === 1 || loading}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </Button>

          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>

          <Button
            variant="outline"
            disabled={page === totalPages || loading}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}