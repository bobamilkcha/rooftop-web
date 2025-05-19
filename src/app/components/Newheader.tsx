"use client";

import { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Header = ({ className = '' }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFinancingDropdown, setShowFinancingDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Prevent scrolling when mobile menu is open
    if (isOpen) {
      document.body.classList.add('overflow-hidden', 'lg:overflow-auto');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    // Cleanup function
    return () => document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  const handleMouseEnter = () => {
    setShowFinancingDropdown(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      if (dropdownRef.current && !dropdownRef.current.matches(':hover')) {
        setShowFinancingDropdown(false);
      }
    }, 150);
  };

  const isAboutUsPage = pathname === '/about-us';
  const isFinancingPage = pathname === '/financingplan';
  const isPowerDirectPage = pathname === '/powerdirect';
  const isInstallmentPage = pathname === '/installment';
  const isUpfrontPurchasePage = pathname === '/upfrontpurchase';
  const isInitialValuePage = pathname === '/initialvalue';
  const isFaqPage = pathname === '/faq';
  const isQuoteFormPage = pathname === '/quoteform';

  const isFinancingSubPage = isPowerDirectPage || isInstallmentPage || isUpfrontPurchasePage;

  const baseTextStyleMobile = "font-medium text-[24px] font-exo2";
  const comingSoonTextStyleMobile = "font-bold text-[12px] font-exo2";
  const baseLinkClasses = "px-4 flex items-center h-full transition-colors duration-200 text-[16px] font-exo2";

  return (
    <>
      {/* Navbar container */}
      <div className={`relative w-full z-30 ${className}`}>
        <nav className={`flex items-center py-4 px-6 md:px-12 lg:px-24 xl:px-32 transition-colors duration-300 ${
          isOpen ? "bg-[#1a1a1a]" : "bg-transparent"
        } lg:bg-transparent`}>

          {/* Logo */}
          <div className="flex-shrink-0 mr-8">
            <Image
              src="/logo.svg"
              alt="Rooftop Energy"
              width={144}
              height={48}
              className="cursor-pointer"
              onClick={() => window.location.href = "/"}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-grow justify-center items-center space-x-4 h-8">
            <Link
              href="/about-us"
              className={`px-4 flex items-center h-full transition-colors duration-200 text-[16px] font-exo2 ${isAboutUsPage ? 'bg-white text-gray-800 hover:bg-gray-100 rounded-full' : 'text-white hover:text-rtyellow-200'}`}
            >
              About us
            </Link>

            {/* Financing Dropdown Trigger */}
            <div
              className="relative px-4 h-full flex items-center"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/financingplan"
                className={`flex items-center h-8 transition-colors text-[16px] font-exo2 ${isFinancingPage || isFinancingSubPage ? 'bg-white text-gray-800 hover:bg-gray-100 rounded-full px-4 py-1' : 'text-white hover:text-rtyellow-200 px-4'}`}
              >
                Financing plans
                <svg className={`ml-2 w-4 h-4 transition-transform duration-200 ${showFinancingDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>

              {/* Dropdown Content */}
              {showFinancingDropdown && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-black/70 backdrop-blur-lg rounded-xl shadow-2xl px-8 py-6 w-[1000px] max-w-none border border-white/20"
                  onMouseEnter={handleMouseEnter}
                >
                  <div className="grid grid-cols-3 gap-6">
                    {/* Option 1: Power Direct */}
                    <Link
                      href="/powerdirect"
                      className={`group hover:bg-white/10 rounded-lg p-4 transition-colors`}
                    >
                      <h3 className={`font-bold text-white group-hover:underline group-hover:text-rtyellow-200 text-[16px] font-exo2`}>
                        Power Direct
                      </h3>
                      <p className={`text-sm text-white/80 mt-1 text-[16px] font-exo2`}>
                        Make savings from day one at zero upfront cost.
                      </p>
                    </Link>

                    {/* Option 2: Installment */}
                    <Link
                      href="/installment"
                      className={`group hover:bg-white/10 rounded-lg p-4 transition-colors`}
                    >
                      <h3 className={`font-bold text-white group-hover:underline group-hover:text-rtyellow-200 text-[16px] font-exo2`}>
                        Installment
                      </h3>
                      <p className={`text-sm text-white/80 mt-1 text-[16px] font-exo2`}>
                        Flexible monthly payments at zero upfront costs.
                      </p>
                    </Link>

                    {/* Option 3: Upfront purchase */}
                    <Link
                      href="/upfrontpurchase"
                      className={`group hover:bg-white/10 rounded-lg p-4 transition-colors`}
                    >
                      <h3 className={`font-bold text-white group-hover:underline group-hover:text-rtyellow-200 text-[16px] font-exo2`}>
                        Upfront purchase
                      </h3>
                      <p className={`text-sm text-white/80 mt-1 text-[16px] font-exo2`}>
                        One-time payment for full ownership immediately.
                      </p>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center">
              <Link
              href="/quoteform"
              className={`${baseLinkClasses} ${
                isQuoteFormPage
                  ? "bg-white text-gray-800 hover:bg-gray-100 rounded-full"
                  : "text-white hover:text-rtyellow-200"
              }`}
            >
              Get your quote
            </Link>
              {/* <span className={`bg-rtyellow-200 text-black text-[10px] leading-none px-1.5 py-1 rounded-md font-bold ml-2 font-exo2`}>
                COMING SOON
              </span> */}
            </div>

            <div className="flex items-center">
               <Link
                href="/faq"
                className={`${baseLinkClasses} ${
                  isFaqPage
                    ? "bg-white text-gray-800 hover:bg-gray-100 rounded-full"
                    : "text-white hover:text-rtyellow-200"
                }`}
              >
                FAQ
              </Link>
            </div>
            </div>

          {/* Spacer */}
          <div className="flex-grow lg:hidden"></div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden ml-auto z-50 w-12 h-12 flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className="text-2xl text-white">
              {isOpen ? "✕" : "☰"}
            </span>
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#1a1a1a] z-40 pt-24 overflow-y-auto lg:hidden transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col space-y-6 px-6 pb-8">
          <Link
            href="/about-us"
            className={`text-white hover:text-rtyellow-200 transition-colors duration-200 ${baseTextStyleMobile} ${isAboutUsPage ? 'text-rtyellow-200' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            About us
          </Link>

          {/* Mobile Financing Links */}
          <div>
            <Link
              href="/financingplan"
              className={`text-white hover:text-rtyellow-200 transition-colors duration-200 block ${baseTextStyleMobile} ${isFinancingPage || isFinancingSubPage ? 'text-rtyellow-200' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Financing plans
            </Link>
            <div className="pl-4 mt-4 space-y-4 border-l border-gray-700">
              <Link
                href="/powerdirect"
                className={`block text-gray-300 hover:text-rtyellow-200 transition-colors duration-200 ${baseTextStyleMobile} ${isPowerDirectPage ? 'text-rtyellow-200' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Power Direct
              </Link>
              <Link
                href="/installment"
                className={`block text-gray-300 hover:text-rtyellow-200 transition-colors duration-200 ${baseTextStyleMobile} ${isInstallmentPage ? 'text-rtyellow-200' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Installment
              </Link>
              <Link
                href="/upfrontpurchase"
                className={`block text-gray-300 hover:text-rtyellow-200 transition-colors duration-200 ${baseTextStyleMobile} ${isUpfrontPurchasePage ? 'text-rtyellow-200' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Upfront purchase
              </Link>
            </div>
          </div>

          {/* Mobile Get Quote */}
          <div className="mt-6">
            <Link
              href="/quoteform"
              className={`flex items-center gap-2 ${baseTextStyleMobile} text-white hover:text-rtyellow-200 cursor-pointer ${isInitialValuePage ? 'text-rtyellow-200' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Get your quote
              {/* <span className={`bg-rtyellow-200 text-black ${comingSoonTextStyleMobile} leading-none px-1.5 py-1 rounded-md font-bold rounded-tl-[12px] rounded-br-[12px] rounded-tr-[4px] rounded-bl-[4px]`}>
                COMING SOON
              </span> */}
            </Link>
          </div>

          <div className="mt-6">
            <Link
              href="/faq"
              className={`flex items-center gap-2 ${baseTextStyleMobile} text-white hover:text-rtyellow-200 cursor-pointer ${isInitialValuePage ? 'text-rtyellow-200' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              FAQ
              {/* <span className={`bg-rtyellow-200 text-black ${comingSoonTextStyleMobile} leading-none px-1.5 py-1 rounded-md font-bold rounded-tl-[12px] rounded-br-[12px] rounded-tr-[4px] rounded-bl-[4px]`}>
                COMING SOON
              </span> */}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;