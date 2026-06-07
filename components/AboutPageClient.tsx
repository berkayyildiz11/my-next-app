"use client";

import Hero from "@/components/Hero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShieldAlert, BrainCircuit, Activity, Network, Zap } from "lucide-react";

export default function AboutPageClient() {
  return (
	<main>
		<div>
			<Hero 
				eyebrow="The Philosophy"
				title="Data over emotion."
				showButton={false} 
				showScrollPulse={true} 
/>
		</div>

		<div className="page-wrapper">
			<div className="page-content">

				{/* the story section */}
				<h2 className="text-3xl font-bold text-center mt-8 mb-2">The Genesis of Fin Sense</h2>

				<section className="max-w-3xl mx-auto px-6 text-zinc-700 leading-relaxed text-lg space-y-6 mb-12">
					
					<p className="text-center">
						The modern stock market is a chaotic sea of data. Every second, millions of trades are executed, breaking news alters global trajectories, and micro-trends form and collapse before the average person can even refresh their browser. Retail investors are consistently forced to navigate this chaos using delayed information, gut feelings, and intuition.Meanwhile, institutional quant funds operate with cold, calculated precision, using deep learning to map the chaos. We looked at this massive disparity and saw an engineering challenge. Fin Sense was not born from a desire to predict the future with a magic crystal ball. It was born from a necessity to build a compass. As engineering students, we realized that the market is not just a spreadsheet of numbers—it is a live ecosystem driven by three distinct forces: historical precedent, mathematical momentum, and human emotion.Our goal became simple, yet massively ambitious: bridge the gap between complex quantitative deep learning and a beautiful, real-time user interface. We set out to build an engine that removes the noise, neutralizes the emotion, and delivers pure, data-driven signals.
					</p>
				</section>

				{/* the model description section */}
				<section className="mb-12">
					
					{/* Section Header */}
					<div className="flex flex-col items-center text-center">
						<div className="bg-indigo-50 border border-indigo-100 text-indigo-600 mb-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase flex items-center gap-2">
							<Zap className="w-3 h-3 fill-current" />
							Live Pipeline
						</div>
						<h2 className="text-3xl font-bold text-zinc-900 tracking-tight mb-2">The Multimodal Architecture</h2>
						<p className="text-zinc-500 max-w-2xl text-lg leading-relaxed mb-6">
							Fin Sense does not rely on a single algorithm. We engineered a parallel computing pipeline that synthesizes machine learning, deep learning, and natural language processing in real-time.
						</p>
					</div>

					{/* The 3-Column Feature Grid */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						
						{/* Model 1: Time Series / Macro */}
						<div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] flex flex-col hover:border-blue-200 transition-colors">
							<div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 mb-2">
								<Network className="w-6 h-6" />
							</div>
							<h3 className="text-xl font-bold text-zinc-900">Macro Time-Series</h3>
							<p className="text-zinc-600 leading-relaxed text-sm flex-grow">
								Our foundation machine learning layer ingests years of historical price action to establish a strict baseline trajectory, mapping overarching seasonal trends and neutralizing temporary market noise.
							</p>
						</div>

						{/* Model 2: LSTM / Micro */}
						<div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] flex flex-col hover:border-indigo-200 transition-colors">
							<div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 mb-2">
								<Activity className="w-6 h-6" />
							</div>
							<h3 className="text-xl font-bold text-zinc-900">Momentum Networks</h3>
							<p className="text-zinc-600 leading-relaxed text-sm flex-grow">
								A highly-dimensional Deep Learning (LSTM) neural network processes complex, rolling momentum indicators. It continuously hunts for oversold conditions and imminent short-term trend reversals.
							</p>
						</div>

						{/* Model 3: FinBERT / Sentiment */}
						<div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] flex flex-col hover:border-emerald-200 transition-colors">
							<div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 mb-2">
								<BrainCircuit className="w-6 h-6" />
							</div>
							<h3 className="text-xl font-bold text-zinc-900">Sentiment Override</h3>
							<p className="text-zinc-600 leading-relaxed text-sm flex-grow">
								An advanced Natural Language Processing (NLP) layer acts as our shock-factor protocol. It reads and aggregates global financial news, extracting real-time emotional panic or euphoria to override mathematical anomalies.
							</p>
						</div>

					</div>
				</section>

				{/* the accordion section */}
				<section className="mb-12">
					<div className="mb-6 text-center">
						<h2 className="text-3xl font-bold text-zinc-900">Frequently Asked Questions</h2>
						<p className="mt-2 text-zinc-500">
							Answers to the questions visitors are most likely to ask about FinSense.
						</p>
					</div>
					<Accordion type="single" collapsible className="w-full max-w-4xl mx-auto bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
						<AccordionItem value="item-1" className="border-b border-zinc-200">
							<AccordionTrigger className="px-6 py-4 text-lg text-zinc-900 font-medium hover:text-indigo-600 hover:no-underline transition-colors data-[state=open]:text-indigo-600">
								What is FinSense?
							</AccordionTrigger>
							<AccordionContent className="px-6 py-4 text-zinc-700">
								FinSense is a technical platform for exploring US stock data, market news, chart patterns, and AI-assisted prediction signals in one interface. It is designed to make complex financial signals easier to inspect, compare, and understand.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-2" className="border-b border-zinc-200">
							<AccordionTrigger className="px-6 py-4 text-lg text-zinc-900 font-medium hover:text-indigo-600 hover:no-underline transition-colors data-[state=open]:text-indigo-600">
								How are predictions generated?
							</AccordionTrigger>
							<AccordionContent className="px-6 py-4 text-zinc-700">
								The prediction pipeline combines market-pattern signals, broader time-series forecasts, and news sentiment when available. The result is shown as a directional signal with a score, confidence level, feature contributions, and decision details so users can see what influenced the output.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-3" className="border-b border-zinc-200">
							<AccordionTrigger className="px-6 py-4 text-lg text-zinc-900 font-medium hover:text-indigo-600 hover:no-underline transition-colors data-[state=open]:text-indigo-600">
								Is FinSense financial advice?
							</AccordionTrigger>
							<AccordionContent className="px-6 py-4 text-zinc-700">
								No. FinSense is an educational and technical demonstration. Its predictions and explanations should not be treated as investment advice, trading instructions, or a guarantee of future market performance.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-4" className="border-b border-zinc-200">
							<AccordionTrigger className="px-6 py-4 text-lg text-zinc-900 font-medium hover:text-indigo-600 hover:no-underline transition-colors data-[state=open]:text-indigo-600">
								How fresh is the market and news data?
							</AccordionTrigger>
							<AccordionContent className="px-6 py-4 text-zinc-700">
								Stock quotes, charts, and news are fetched from external data sources through the FinSense backend and local API routes. Freshness can depend on provider availability, caching, market hours, and whether the backend is currently refreshing its news cache.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-5">
							<AccordionTrigger className="px-6 py-4 text-lg text-zinc-900 font-medium hover:text-indigo-600 hover:no-underline transition-colors data-[state=open]:text-indigo-600">
								How should I read the confidence and explanation details?
							</AccordionTrigger>
							<AccordionContent className="px-6 py-4 text-zinc-700">
								Confidence describes how strongly the model leans toward its signal for the selected period. Explanation details show which signals pushed the score up or down, helping users understand the model's reasoning instead of seeing only a final label.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</section>

				{/* the disclaimer section */}
				<section className="bg-amber-50 border border-amber-200 rounded-2xl flex flex-col items-center text-center gap-4 w-full p-6">
					<div className="text-amber-700">
						<ShieldAlert className="w-[4cqw] h-[4cqw] justify-center"/>
					</div>

					<div className="max-w-4xl">
						<h4 className="font-bold text-amber-900 text-xl">Disclaimer & Terms of Use</h4>
						<p className="text-lg text-amber-800/80 leading-relaxed">
							The multimodal trading algorithms and sentiment analysis tools displayed on this application are 
							experimental and provided strictly as is.

							By using this platform, you acknowledge that algorithmic forecasting carries inherent limitations 
							and that past performance does not guarantee future results. The creators of this platform accept 
							no liability for any financial losses, damages, or decisions made based on the AI-generated outputs, 
							technical indicators, or aggregated news data presented here. This is a technical demonstration, and 
							users assume all risks associated with algorithmic trading concepts.
						</p>
					</div>
				</section>

				{/* the accordion section */}
				<section>

				</section>

			</div>
		</div>
	</main>
  )
}
