"use client";
import Link from "next/link";
import { useState } from "react";

const Header = ({ className = '' }: { className?: string }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className={`absolute top-0 left-0 w-full z-30  transition-colors duration-300 ${ isOpen ? "bg-[#222634]" : "bg-transparent" }`} >
            <nav className={`relative flex justify-between items-center pt-2 px-6 md:px-12 lg:px-24 xl:px-32 ${className}`}>
                {/* Logo */}
                <img src="/logo.svg" alt="Rooftop Energy" className="h-18 cursor-pointer" onClick={() => (window.location.href = "/")} />

                {/* Centered Desktop Navigation */}
                <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 gap-8 lg:gap-16 text-white text-base">
                    <Link href="/about-us">About us</Link>
                    <Link href="/#">Get your quote</Link>
                    <Link href="/#">Power Remote</Link>
                    <Link href="/powerdirect">Power Direct</Link>
                </div>

        
                {/* Mobile Menu Button */}
                <button className="text-2xl text-white lg:hidden" onClick={() => setIsOpen(!isOpen)} > ☰ </button>
            </nav>
                  
            {/* Dropdown Menu (Mobile) */}
            <div className={`absolute top-full left-0 py-3 w-full bg-[#222634] text-white flex flex-col items-center transition-all duration-300 ${ isOpen ? "max-h-60 opacity-100 z-10 translate-y-0" : "max-h-0 opacity-0 overflow-hidden -translate-y-4" }`} >
                <Link href="/about-us" className="py-2 w-full text-center hover:bg-gray-700"> About us </Link>
                <Link href="/#" className="py-2 w-full text-center hover:bg-gray-700"> Get your quote </Link>
                <Link href="/#" className="py-2 w-full text-center hover:bg-gray-700"> Power Remote </Link>
                <Link href="/powerdirect" className="py-2 w-full text-center hover:bg-gray-700"> Power Direct </Link>
            </div>
        </div>
    )
}

export default Header