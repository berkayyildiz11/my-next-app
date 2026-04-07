"use client";
import Link from "next/link";
import Hero from "@/components/Hero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShieldAlert, BrainCircuit, Activity, Network, Zap } from "lucide-react";

export default function ComingSoon() {
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
							<div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
								<Network className="w-6 h-6" />
							</div>
							<h3 className="text-xl font-bold text-zinc-900">Macro Time-Series</h3>
							<p className="text-zinc-600 leading-relaxed text-sm flex-grow">
								Our foundation machine learning layer ingests years of historical price action to establish a strict baseline trajectory, mapping overarching seasonal trends and neutralizing temporary market noise.
							</p>
						</div>

						{/* Model 2: LSTM / Micro */}
						<div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] flex flex-col hover:border-indigo-200 transition-colors">
							<div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
								<Activity className="w-6 h-6" />
							</div>
							<h3 className="text-xl font-bold text-zinc-900">Momentum Networks</h3>
							<p className="text-zinc-600 leading-relaxed text-sm flex-grow">
								A highly-dimensional Deep Learning (LSTM) neural network processes complex, rolling momentum indicators. It continuously hunts for oversold conditions and imminent short-term trend reversals.
							</p>
						</div>

						{/* Model 3: FinBERT / Sentiment */}
						<div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] flex flex-col hover:border-emerald-200 transition-colors">
							<div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
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
					<Accordion type="single" collapsible className="w-full max-w-4xl mx-auto bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
						<AccordionItem value="item-1" className="border-b border-zinc-200">
							<AccordionTrigger className="px-6 py-4 text-lg text-zinc-900 font-medium hover:text-indigo-600 hover:no-underline transition-colors data-[state=open]:text-indigo-600">
								Accordion Item 1
							</AccordionTrigger>
							<AccordionContent className="px-6 py-4 text-zinc-700">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in mauris ut ipsum pretium commodo id et arcu. Suspendisse ligula magna, gravida eu est vitae, gravida cursus ligula. Sed consequat eros est, id mollis dui congue sed. Praesent in sollicitudin turpis. Integer nunc odio, euismod ut urna eu, interdum auctor velit. Curabitur et est gravida, efficitur leo sit amet, vulputate nibh. Fusce at turpis ut purus consectetur pulvinar ac eu dolor. Nam dignissim eu dui at lobortis. Quisque nec nulla quis est venenatis ullamcorper. Cras laoreet massa in venenatis semper. Aliquam dapibus convallis sapien. Pellentesque lacinia scelerisque neque eu mollis. Pellentesque augue nisl, tempus sit amet posuere sed, vestibulum eget velit. Ut sit amet elementum ex.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-2" className="border-b border-zinc-200">
							<AccordionTrigger className="px-6 py-4 text-lg text-zinc-900 font-medium hover:text-indigo-600 hover:no-underline transition-colors data-[state=open]:text-indigo-600">
								Accordion Item 2
							</AccordionTrigger>
							<AccordionContent className="px-6 py-4 text-zinc-700">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in mauris ut ipsum pretium commodo id et arcu. Suspendisse ligula magna, gravida eu est vitae, gravida cursus ligula. Sed consequat eros est, id mollis dui congue sed. Praesent in sollicitudin turpis. Integer nunc odio, euismod ut urna eu, interdum auctor velit. Curabitur et est gravida, efficitur leo sit amet, vulputate nibh. Fusce at turpis ut purus consectetur pulvinar ac eu dolor. Nam dignissim eu dui at lobortis. Quisque nec nulla quis est venenatis ullamcorper. Cras laoreet massa in venenatis semper. Aliquam dapibus convallis sapien. Pellentesque lacinia scelerisque neque eu mollis. Pellentesque augue nisl, tempus sit amet posuere sed, vestibulum eget velit. Ut sit amet elementum ex.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-3">
							<AccordionTrigger className="px-6 py-4 text-lg text-zinc-900 font-medium hover:text-indigo-600 hover:no-underline transition-colors data-[state=open]:text-indigo-600">
								Accordion Item 3
							</AccordionTrigger>
							<AccordionContent className="px-6 py-4 text-zinc-700">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in mauris ut ipsum pretium commodo id et arcu. Suspendisse ligula magna, gravida eu est vitae, gravida cursus ligula. Sed consequat eros est, id mollis dui congue sed. Praesent in sollicitudin turpis. Integer nunc odio, euismod ut urna eu, interdum auctor velit. Curabitur et est gravida, efficitur leo sit amet, vulputate nibh. Fusce at turpis ut purus consectetur pulvinar ac eu dolor. Nam dignissim eu dui at lobortis. Quisque nec nulla quis est venenatis ullamcorper. Cras laoreet massa in venenatis semper. Aliquam dapibus convallis sapien. Pellentesque lacinia scelerisque neque eu mollis. Pellentesque augue nisl, tempus sit amet posuere sed, vestibulum eget velit. Ut sit amet elementum ex.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-4">
							<AccordionTrigger className="px-6 py-4 text-lg text-zinc-900 font-medium hover:text-indigo-600 hover:no-underline transition-colors data-[state=open]:text-indigo-600">
								Accordion Item 4
							</AccordionTrigger>
							<AccordionContent className="px-6 py-4 text-zinc-700">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in mauris ut ipsum pretium commodo id et arcu. Suspendisse ligula magna, gravida eu est vitae, gravida cursus ligula. Sed consequat eros est, id mollis dui congue sed. Praesent in sollicitudin turpis. Integer nunc odio, euismod ut urna eu, interdum auctor velit. Curabitur et est gravida, efficitur leo sit amet, vulputate nibh. Fusce at turpis ut purus consectetur pulvinar ac eu dolor. Nam dignissim eu dui at lobortis. Quisque nec nulla quis est venenatis ullamcorper. Cras laoreet massa in venenatis semper. Aliquam dapibus convallis sapien. Pellentesque lacinia scelerisque neque eu mollis. Pellentesque augue nisl, tempus sit amet posuere sed, vestibulum eget velit. Ut sit amet elementum ex.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-5">
							<AccordionTrigger className="px-6 py-4 text-lg text-zinc-900 font-medium hover:text-indigo-600 hover:no-underline transition-colors data-[state=open]:text-indigo-600">
								Accordion Item 5
							</AccordionTrigger>
							<AccordionContent className="px-6 py-4 text-zinc-700">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in mauris ut ipsum pretium commodo id et arcu. Suspendisse ligula magna, gravida eu est vitae, gravida cursus ligula. Sed consequat eros est, id mollis dui congue sed. Praesent in sollicitudin turpis. Integer nunc odio, euismod ut urna eu, interdum auctor velit. Curabitur et est gravida, efficitur leo sit amet, vulputate nibh. Fusce at turpis ut purus consectetur pulvinar ac eu dolor. Nam dignissim eu dui at lobortis. Quisque nec nulla quis est venenatis ullamcorper. Cras laoreet massa in venenatis semper. Aliquam dapibus convallis sapien. Pellentesque lacinia scelerisque neque eu mollis. Pellentesque augue nisl, tempus sit amet posuere sed, vestibulum eget velit. Ut sit amet elementum ex.
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