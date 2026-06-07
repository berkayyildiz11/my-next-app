import Link from "next/link";

export default function Footer(){
    return(
        <footer className="bg-slate-900 text-gray-400 mt-20">
            <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
                {/* Brand */}
                <div>
                    <h2 className="text-white font-semibold text-lg">
                        FinSense
                    </h2>
                    <p className="mt-2 text-sm">
                        Real-Time Financial Analysis and Fair Value Prediction Platform
                    </p>
                </div>

                {/* Navigation */}{/* will be handled later */}
                <div>
                    <h3 className="text-white font-medium mb-3">Navigation</h3>
                    <ul className="space-y-2">
                        <li><Link href="/">Dashboard</Link></li>
                        <li><Link href="/us-stocks">Stocks</Link></li>
                        <li><Link href="/news">News</Link></li>
                        <li><Link href="/about">About</Link></li>
                    </ul>
                </div>

                {/* Social */}{/* will be handled later */}
                <div>
                    <h3 className="text-white font-medium mb-3">Links</h3>
                    <ul className="space-y-2">
                        <li><Link href="https://github.com/berkayyildiz11/my-next-app" 
                            target="_blank" rel="noopener noreferrer">GitHub</Link></li>
                        <li><Link href="https://github.com/berkayyildiz11/rtfa-ml-backend" 
                            target="_blank" rel="noopener noreferrer">Documentation</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className="text-center text-xs border-t border-slate-700 py-4">
                    © 2026 FinSense. All rights reserved.
                </div>
            </div>
        </footer>
    );
}