"use client";
import Image from 'next/image';
import QuoteInput from './components/QuoteInput';
import PopularFaq from './components/main/PopularFaq';
import Header from './components/Newheader';
import Footer from './components/layouts/Footer';
import { BsArrowRight } from 'react-icons/bs';
import Carousel from './components/main/Carousel';
import ContactForm from './components/main/contactus';
import IntroPowerDirect from './components/main/IntroPowerDirect';
import Intro from './components/main/Intro';
import { Exo_2 } from 'next/font/google';
import { Coins, Handshake, LogOut } from 'lucide-react';
import Link from "next/link";
import React, { useState, useEffect, useRef } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion, useInView, UseInViewOptions } from 'framer-motion';

const exo2 = Exo_2({
  subsets: ['latin'],
  display: 'swap',
});

const cn = (...classes: (string | undefined)[]): string => {
  return classes.filter((cls): cls is string => typeof cls === 'string').join(' ');
};

interface ScrollRevealProps {
  children: React.ReactNode;
  initial?: { opacity: number; y?: number; x?: number };
  animate?: { opacity: number; y?: number; x?: number };
  transition?: { duration: number; delay?: number; ease?: string };
  className?: string;
  viewport?: UseInViewOptions;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  initial = { opacity: 0, y: 50 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.5, ease: "easeOut" },
  className,
  viewport = { once: true, margin: "0px 0px -100px 0px" },
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, viewport);

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={transition}
      className={cn("relative", className)}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const features: { icon: React.ReactNode; title: string; description: string }[] = [
    {
      icon: <Coins className="text-rtyellow-200 w-10 h-10" />,
      title: 'Savings right now',
      description: 'Immediately reduce your monthly electricity bill with no additional cost',
    },
    {
      icon: <img src="/sticky-note.svg" alt="Sticky Note Icon" className="w-10 h-10" />,
      title: 'Instant quote',
      description: 'Use our quote estimation tool to see your potential savings.',
    },
    {
      icon: <Handshake className="text-rtyellow-200 w-10 h-10" />,
      title: 'Rooftop Ownership',
      description: 'We will own the solar PV system and cover all related costs during the contract.',
    },
    {
      icon: <LogOut className="text-rtyellow-200 w-10 h-10" />,
      title: 'Flexible exit plans',
      description: 'Short lock-in period with exit options at various contract stages.',
    },
  ];

  return (
    <SkeletonTheme baseColor="#222634" highlightColor="#4D5261">
      <div className={`min-h-screen bg-rtgray-900 text-white ${exo2.className}`}>
        <div className="relative">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{ backgroundImage: "url('/main/solar-background-horizontal.png')" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-rtgray-900 via-transparent to-transparent"></div>

          <Header className="absolute w-full z-50 bg-transparent" />

          <section className="relative w-full h-[500px] lg:h-[695.16px] flex items-start justify-center pt-16">
            <div className="relative container mx-auto max-w-[1440px] z-10 px-6 lg:px-[120px]">
              {isLoading ? (
                <>
                  <div className="mb-6 lg:mb-10">
                    <Skeleton height={60} width="60%" />
                    <Skeleton height={60} width="40%" style={{ marginTop: '0.5rem' }} />
                  </div>
                  <div className="mb-24">
                    <Skeleton height={28} width="80%" />
                    <Skeleton height={28} width="30%" style={{ marginTop: '0.5rem' }} />
                  </div>
                  <div className="flex flex-col items-center mt-12">
                    <Skeleton height={40} width={250} borderRadius="9999px" className="mb-4" />
                    <Skeleton height={32} width={126} />
                  </div>
                </>
              ) : (
                <>
                  <div className="text-5xl lg:text-8xl font-semibold mb-6 lg:mb-10">
                    Democratizing <br /> Solar Energy
                  </div>
                  <p className="text-xl font-light text-rtgray-200 mb-24">
                    Making solar accessible to all Malaysian businesses
                  </p>
                  <div className="flex flex-col items-center mt-12">
                    <Link href="/quoteform">
                    <button className="opacity-50 justify-center w-[250px] h-[40px] mb-4 bg-rtyellow-200 text-black text-[14px] lg:text-sm font-semibold rounded-full flex items-center gap-3 transition duration-300">
                      Get Quote Now <BsArrowRight size={18} />
                    </button>
                    </Link>
                    <div className="bg-rtyellow-200 text-[13px] text-black font-medium w-[126px] h-[32px] px-4 rounded-sm rounded-tl-2xl rounded-br-2xl flex items-center justify-center text-center">
                      COMING SOON
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>
        </div>

        <section className="mt-28 lg:mt-16 bg-rtgray-900">
          <div className="container mx-auto lg:px-[120px] max-w-[1440px]">
            <div className="mb-16">
              {isLoading ? (
                <>
                  <Skeleton height={40} width="40%" className="mb-4" />
                  <Skeleton count={2} height={24} width="70%" style={{ marginTop: '0.5rem' }} />
                </>
              ) : (
                <ScrollReveal className='px-12 lg:px-0'>
                  <div className="text-4xl font-semibold text-rtyellow-200 mb-4">
                    Introducing Power <span className="block lg:inline">Direct</span>
                  </div>
                  <p className="text-base lg:text-xl text-rtgray-300 mt-4">
                    An affordable solar financing plan for
                    <span className="block lg:inline"> everyday Malaysian to save from day one.</span>
                  </p>
                </ScrollReveal>
              )}
            </div>

            <div className="grid gap-2 lg:gap-6 xl:gap-12 md:grid-cols-2 xl:grid-cols-4 space-y-8 lg:space-y-0 lg:mb  mb-16">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-[300px] lg:w-[252px] h-[264px] lg:h-[282px] bg-rtgray-800 rounded-xl px-6 py-[24px] flex flex-col mb-12 lg:mb-0 mx-auto"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div>
                        <Skeleton circle height={40} width={40} />
                      </div>
                      <div className="mt-6 lg:mt-8 w-3/4">
                        <Skeleton height={28} />
                      </div>
                    </div>
                    <div className="mt-6 text-left">
                      <Skeleton count={3} height={20} />
                    </div>
                  </div>
                ))
              ) : (
                features.map((item, index) => (
                  <ScrollReveal
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="w-[300px] lg:w-[252px] h-[264px] lg:h-[282px] bg-rtgray-800 rounded-xl px-6 py-[24px] flex flex-col mb-12 lg:mb-0 mx-auto"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div>{item.icon}</div>
                      <div className="text-xl font-semibold mt-6 lg:mt-8">{item.title}</div>
                    </div>
                    <p className="text-lg font-light text-rtgray-300 mt-6 text-left">{item.description}</p>
                  </ScrollReveal>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="mb-16 bg-rtgray-900">
          <div className="container mx-auto px-6 lg:px-[120px] max-w-[1440px]">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 items-stretch pt-8 lg:pt-0">
              {isLoading ? (
                <>
                  <div className="col-span-1 lg:col-span-3">
                    <div className="group w-full lg:h-[110px] bg-rtgray-800 px-4 lg:px-6 py-5 rounded-2xl flex flex-col justify-center">
                      <div className="font-semibold flex items-center justify-between text-[20px]">
                        <Skeleton height={24} width="30%" />
                        <Skeleton circle height={24} width={24} />
                      </div>
                      <div className="font-mono text-base text-left mt-1">
                        <Skeleton count={2} height={18} />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 lg:col-span-3">
                    <div className="group w-full lg:h-[110px] bg-rtgray-800 px-4 lg:px-6 py-5 rounded-2xl flex flex-col justify-center">
                      <div className="font-semibold flex items-center justify-between text-[20px]">
                        <Skeleton height={24} width="40%" />
                        <Skeleton circle height={24} width={24} />
                      </div>
                      <div className="font-mono text-base text-left mt-1">
                        <Skeleton count={2} height={18} />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-span-1 lg:col-span-3">
                    <Link href="/powerdirect" className="group w-full lg:h-[110px] bg-rtgray-800 px-4 lg:px-6 py-5 rounded-2xl flex flex-col justify-center transition hover:bg-rtyellow-200">
                      <div className="font-semibold flex items-center justify-between text-[20px] text-white group-hover:text-black -mt-0.5">
                        Power Direct
                        <BsArrowRight className="text-rtyellow-200 text-xl group-hover:text-black" />
                      </div>
                      <div className="font-mono text-base text-left text-rtgray-300 mt-1 group-hover:text-black">
                        An affordable solar financing plan for everyday Malaysians to save from day one.
                      </div>
                    </Link>
                  </div>
                  <div className="col-span-1 lg:col-span-3">
                    <Link href="/financingplan" className="group w-full lg:h-[110px] bg-rtgray-800 px-4 lg:px-6 py-5 rounded-2xl flex flex-col justify-center transition hover:bg-rtyellow-200">
                      <div className="font-semibold flex items-center justify-between text-[20px] text-white group-hover:text-black">
                        All financing plans
                        <BsArrowRight className="text-rtyellow-200 text-xl group-hover:text-black" />
                      </div>
                      <div className="font-mono text-base text-left text-rtgray-300 mt-1 group-hover:text-black">
                        Upfront payment, installments, and solar maintenance solutions.
                      </div>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="w-full mb-12 lg:my-16 px-6 lg:px-[120px]">
          {isLoading ? (
            <>
              <div className="font-semibold flex items-center justify-between text-white text-xl">
                <Skeleton height={50} width={150} />
                <Skeleton circle height={48} width={48} />
              </div>
              <div className="font-mono text-base lg:text-xl mt-4">
                <Skeleton height={24} width="80%" />
              </div>
            </>
          ) : (
            <ScrollReveal>
              <div className="font-semibold flex items-center justify-between text-white text-xl">
                <Link href="/about-us">
                  <img src="/logo.svg" alt="Rooftop Energy" className="h-18 lg:h-20 cursor-pointer" />
                </Link>
                <Link href="/about-us" className="bg-rtyellow-200 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition hover:opacity-80">
                  <BsArrowRight className="text-black text-2xl" />
                </Link>
              </div>
              <div className="font-mono text-base lg:text-xl text-rtgray-300 mt-4">
                We craft quotes that reflect real solar power returns. No optimistic assumptions, just data.
              </div>
            </ScrollReveal>
          )}
        </section>

        {isLoading && (
          <section className="w-full mb-12 px-6 lg:px-32 my-16">
            <Skeleton height={250} />
          </section>
        )}

        {!isLoading && (
          <section className="w-full mb-12 px-6 lg:px-32 my-16">
            <div className="font-semibold flex items-center justify-between text-white text-xl mb-5">
              <Carousel />
            </div>
          </section>
        )}

        {isLoading && (
          <section className="my-16 bg-rtgray-900 px-6 lg:px-[120px]">
            <div className="container mx-auto max-w-[1440px] flex flex-col items-center">
              <Skeleton height={40} width="30%" className="mb-8" />
              <Skeleton height={60} count={3} style={{ marginBottom: '1rem' }} />
            </div>
          </section>
        )}

        {!isLoading && (
          <section className="my-16 bg-rtgray-900 px-6 lg:px-[120px]">
            <div className="container mx-auto max-w-[1440px] flex flex-col items-center">
              <PopularFaq />
            </div>
          </section>
        )}

        {isLoading && (
          <section className="my-16 bg-rtgray-900 px-6 lg:px-[120px]">
            <Skeleton height={40} width="30%" className="mb-8" />
            <Skeleton height={300} />
          </section>
        )}

        {!isLoading && (
          <section className="my-16 bg-rtgray-900 px-6 lg:px-[120px]">
            <ContactForm />
          </section>
        )}

        <Footer />
      </div>
    </SkeletonTheme>
  );
}