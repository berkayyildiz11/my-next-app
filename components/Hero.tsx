import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react"; // Make sure to import this!
import React from "react";

interface HeroProps {
    eyebrow?: string;           // NEW: The tiny text above the title
    title: React.ReactNode;
    description?: React.ReactNode; // Made optional so you don't have to use it!
    imageSrc?: string;
    buttonText?: string;
    buttonLink?: string;
    showButton?: boolean;
    showScrollPulse?: boolean;  // NEW: Turns the bouncing arrow on or off
}

export default function Hero({
    eyebrow,
    title,
    description,
    imageSrc = "/hero/GradeGrey.jpg",
    buttonText = "Detailed Information",
    buttonLink = "/about",
    showButton = true,
    showScrollPulse = false, 
}: HeroProps) {
    return (
        // Changed min-h-screen to min-h-[70vh] to tighten up the empty space
        <section className="relative w-full overflow-hidden flex flex-col" style={{ minWidth: "100vw", minHeight: "80vh" }}>
            <Image
                src={imageSrc}
                alt="Hero Background"
                fill
                priority
                className="object-cover object-bottom"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-[#061c26]/80 via-[#061c26]/60 to-[#061c26]" />

            {/* Main Content Centered */}
            <div className="relative z-10 flex flex-grow flex-col items-center justify-center text-center text-white px-6 mt-12">
                
                {/* THE EYEBROW: Tiny, all caps, spaced out */}
                {eyebrow && (
                    <span className="text-white/50 uppercase tracking-[0.3em] text-sm font-semibold mb-4 block">
                        {eyebrow}
                    </span>
                )}

                <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
                    {title}
                </h1>

                {description && (
                    <p className="mt-6 max-w-xl text-gray-300">
                        {description}
                    </p>
                )}

                {showButton && (
                    <div className="mt-8">
                        <Link href={buttonLink}>
                            <Button className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 rounded-full px-6 py-6 text-md font-semibold transition-all">
                                {buttonText}
                            </Button>
                        </Link>
                    </div>
                )}
            </div>

            {/* THE SCROLL INDICATOR: Anchors the bottom of the hero */}
            {showScrollPulse && (
                <div className="relative z-10 pb-8 flex justify-center w-full">
                    <ChevronDown className="w-8 h-8 text-white/40 animate-bounce" />
                </div>
            )}
        </section>
    );
}