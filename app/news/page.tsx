"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

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

	useEffect(() => {
		async function fetchNews() {
			const response = await fetch("http://localhost:8000/api/news");
			const json = await response.json();
			if (json.status === "success") {
				setNews(json.data.slice(0, 10));
			}
		}
		fetchNews();
	}, []);

	return (
		<div className="page-wrapper">
			<div className="page-content">
				<h2 className="text-3xl font-bold text-center text-zinc-900 mb-10">
					Latest Market News
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
					{news.map((item, index) => (
						<a
							key={index}
							href={item.url}
							target="_blank"
							rel="noopener noreferrer"
							className="group p-6 border border-zinc-200 bg-white rounded-2xl shadow-sm hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between h-full w-full"
						>
							<div>
								<div className="flex justify-between items-center mb-4">
									<span className="text-gray-500 text-xs font-medium uppercase tracking-wider">
										{item.source} • {new Date(item.timestamp).toLocaleDateString()}
									</span>
								</div>
								<h3 className="text-lg font-semibold text-zinc-900 leading-tight mb-3 group-hover:text-indigo-600 transition-colors">{item.headline}</h3>
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
			</div>
		</div>
	);
}
