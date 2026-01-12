import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative w-full overflow-hidden" style={{ minWidth: "100wh" }}>
            <Image
                src="/hero/GradeGrey.jpg"
                alt="Hero Image"
                fill
                priority
                className="object-cover object-bottom"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-[#061c26]/80 via-[#061c26]/60 to-[#061c26]" />

            <div className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center text-white px-6">
                <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
                    <span className="text-white-300">US</span> Stocks
                    <br />
                    Real-Time Data Visualization and Analysis Platform
                </h1>

            <p className="mt-6 max-w-xl text-gray-300">
                Real-time stock data, in-depth analysis, and
                a user-friendly interface to empower your investment decisions.
            </p>

            <button className="mt-10 rounded-full bg-white px-8 py-4 text-sm font-semifold text-black hover:bg-gray-200 transition">
                Detailed Information
            </button>
            </div>
        </section>
    );
}