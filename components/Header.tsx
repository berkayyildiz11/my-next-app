'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className="w-full text-zinc-900 px-6 py-0 sticky top-0 z-50 transition-shadow duration-300 bg-white"
      style={{ 
        boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)' : 'none'
      }}
    >
      <div className="header-content mx-auto">	
        <nav className="flex items-center gap-36 py-4">
            <Link href="/main-menu">
                <div className="relative w-[240px] h-[70px]">
                    <Image
                        src="/logo/logo.png"
                        alt="Platform Logo"
                        fill
                        className="object-contain"
                        priority
                        sizes="(max-width: 768px) 100vw, 240px"
                    />
                </div>
            </Link>

          <ul className="flex gap-8 font-semibold">
            <li><Link href="/us-stocks">US Stocks</Link></li>
			<li><Link href="/news">News</Link></li>
			<li><Link href="/contact">Contact</Link></li>
			<li><Link href="/about">About</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
