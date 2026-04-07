"use client";
import Link from "next/link";
import Hero from "@/components/Hero";
import { ShieldAlert } from "lucide-react";

export default function ComingSoon() {
  return (
	<div>
		<section>
			<Hero />
		</section>

		<div className="page-wrapper">
		<div className="page-content">

			{/* the disclaimer section */}
			<section className="bg-amber-50 border border-amber-200 rounded-2xl flex flex-col items-center text-center gap-4 w-full p-6">
				<div className="text-amber-700">
					<ShieldAlert className="w-[4cqw] h-[4cqw] justify-center"/>
				</div>

				<div className="max-w-4xl">
					<h4 className="font-bold text-amber-900 text-lg mb-2">Disclaimer & Terms of Use</h4>
					<p className="text-sm text-amber-800/80 leading-relaxed">
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
	</div>
  )
}