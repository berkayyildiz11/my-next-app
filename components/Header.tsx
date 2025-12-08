'use client';

import Link from "next/link";
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
      className="w-full text-white px-6 py-9 sticky top-0 z-50 transition-shadow duration-300"
      style={{ 
        backgroundColor: 'var(--background)',
        boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)' : 'none'
      }}
    >
      <div className="header-content mx-auto">
        <nav className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            <Link href="/">My Website</Link>
          </h1>

          <ul className="flex gap-6">
            <li><Link href="/main-menu">Main Menu</Link></li>
            <li><Link href="/us-stocks">US Stocks</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
