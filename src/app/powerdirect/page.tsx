"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Newheader";
import Footer from "../components/layouts/Footer";
import ScrollButton from "@/app/components/ScrollButton";
import { Exo_2 } from "next/font/google";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion, useInView } from "framer-motion";

const exo2 = Exo_2({ subsets: ["latin"], display: "swap" });

// Updated MarginType to match Framer Motion's expected type
type MarginType = 
  | `${number}px` 
  | `${number}%` 
  | `${number}vh` 
  | `${number}vw`
  | `${number}px ${number}px ${number}px ${number}px`;

const ScrollReveal = ({
  children,
  initial = { opacity: 0, y: 50 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.5, ease: "easeOut" },
  className,
  rootMargin = "0px 0px -100px 0px" as MarginType,
}: {
  children: React.ReactNode;
  initial?: { opacity: number; y?: number; x?: number };
  animate?: { opacity: number; y?: number; x?: number };
  transition?: { duration: number; delay?: number; ease?: string };
  className?: string;
  rootMargin?: MarginType;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SkeletonTheme baseColor="#262626" highlightColor="#333">
      <div className={`min-h-screen bg-[#141624] text-white ${exo2.className}`}>
        <div className="relative h-[695.16px]">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{
              backgroundImage: isLoading ? "none" : "url('/powerdirectpage/image 19.svg')",
            }}
          />
          {!isLoading && (
            <div className="absolute inset-0 bg-gradient-to-t from-[#141624] via-transparent to-transparent" />
          )}
          <Header className="absolute w-full z-50 bg-transparent" />
          <HeroSection isLoading={isLoading} />
        </div>

        <FeaturesSection isLoading={isLoading} />
        <WhyPowerDirectSection isLoading={isLoading} />
        <PricingSection isLoading={isLoading} />

        <div className="mt-24 md:mt-24">
          <Footer />
        </div>
      </div>
    </SkeletonTheme>
  );
};

const HeroSection: React.FC<{ isLoading: boolean }> = ({ isLoading }) => (
  <section className="relative w-full h-[500px] md:h-[695.16px] flex items-start justify-center pt-38 md:pt-40 mb-8 md:mb-8">
    <div className="relative container mx-auto px-4 max-w-[1440px] flex flex-col items-center z-10">
      <div className="flex flex-col items-center">
        {isLoading ? (
          <>
            <Skeleton height={96} width={300} className="mb-4" />
            <Skeleton height={24} width={600} className="mb-16" />
            <Skeleton height={40} width={200} />
          </>
        ) : (
          <>
            <ScrollReveal
              initial={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-[48px] md:text-[96px] font-semibold mb-4 text-center">Power Direct</h1>
            </ScrollReveal>

            <ScrollReveal
              initial={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-[16px] md:text-[20px] font-medium mb-16 max-w-2xl text-center px-6 md:px-0">
                Our <span className="text-[#FCD913]">Power Purchase Agreement (PPA)</span> product to make your switch
                to solar energy simple and affordable at{" "}
                <span className="text-[#FCD913]">zero upfront cost</span>.
              </p>
            </ScrollReveal>

            <ScrollReveal
              initial={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="flex w-full justify-center md:block md:w-[250px]">
                <ScrollButton />
              </div>
            </ScrollReveal>
          </>
        )}
      </div>
    </div>
  </section>
);

const FeaturesSection: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const features = [
    {
      icon: "/powerdirectpage/coins.svg",
      title: "Savings right now",
      description: "Immediately reduce your monthly electricity bill spendings with no additional cost.",
    },
    {
      icon: "/powerdirectpage/sticky-note.svg",
      title: "Instant quote",
      description: "Use our quote estimation tool to see your potential savings.",
    },
    {
      icon: "/powerdirectpage/handshake.svg",
      title: "Rooftop Ownership",
      description: "We will own the solar PV system and cover all related costs during the contract.",
    },
    {
      icon: "/powerdirectpage/log-out.svg",
      title: "Flexible exit plans",
      description: "Short lock-in period with exit options at various contract stages.",
    },
  ];

  return (
    <section className="py-8 md:py-32 bg-[#141624] mb-8 md:mb-8">
      <div className="container mx-auto px-4 max-w-[1440px] flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-24 md:gap-y-0 md:gap-8 lg:gap-x-24">
          {features.map((feature, index) => (
            <ScrollReveal
              key={index}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="bg-white/[0.04] p-8 rounded-[20px] w-[300px] h-[264px] md:w-[252px] md:h-[300px] flex flex-col items-center mx-auto">
                {isLoading ? (
                  <>
                    <Skeleton height={40} width={40} className="mb-6" />
                    <Skeleton height={20} width={100} className="mb-4" />
                    <Skeleton height={60} width={200} />
                  </>
                ) : (
                  <>
                    <img src={feature.icon} alt={feature.title} className="w-10 h-10 mb-6" />
                    <h3 className="text-[20px] font-semibold mb-4 text-white text-center">{feature.title}</h3>
                    <p className="text-[18px] font-light text-[#9EA1AD] text-left">{feature.description}</p>
                  </>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyPowerDirectSection: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const benefits = [
    {
      icon: "hand.svg",
      title: "Hassle-free",
      description: "We provide an end-to-end solar energy solution. Benefit from solar energy without any risk.",
    },
    {
      icon: "lock.svg",
      title: "Tariff Security",
      description: "Pre-determined energy tariff for entire duration of contract. Predictable energy costs.",
    },
    {
      icon: "plug-zap.svg",
      title: "Energy Savings",
      description: "Save on operating costs with lower energy tariffs than TNB.",
    },
    {
      icon: "container.svg",
      title: "ESG Compliances",
      description: "Move towards a more ESG compliant business by reducing your carbon footprint.",
    },
  ];

  return (
    <section className="py-8 md:py-32 pb-6 md:pb-16 bg-[#141624] mb-8 md:mb-8">
      <div className="container mx-auto px-4 max-w-[1440px] flex flex-col items-center">
        <div className="w-full max-w-[1200px] flex flex-col">
          <div className="w-full pl-4 lg:pl-0">
            <ScrollReveal>
              {isLoading ? (
                <Skeleton height={40} width={300} className="mb-16" />
              ) : (
                <h2 className="text-[#FCD913] text-[32px] font-bold mb-16">Why Power Direct?</h2>
              )}
            </ScrollReveal>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-x-32 items-start justify-center">
              <div className="w-full lg:w-[800px] flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 lg:gap-x-24 lg:gap-y-12 relative">
                  {benefits.map((benefit, index) => (
                    <ScrollReveal
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      transition={{ duration: 0.6, delay: index * 0.15 }}
                    >
                      <div className="w-full sm:w-[360px] relative flex flex-col">
                        {isLoading ? (
                          <Skeleton height={80} className="mb-8" />
                        ) : (
                          <>
                            <div className="flex items-start gap-4">
                              <img
                                src={`/powerdirectpage/${benefit.icon}`}
                                alt={benefit.title}
                                className="w-[24px] h-[24px] mt-1"
                              />
                              <div>
                                <h3 className="text-[24px] font-semibold text-white mb-3">{benefit.title}</h3>
                                <p className="text-[18px] font-normal text-[#9EA1AD] leading-relaxed">{benefit.description}</p>
                              </div>
                            </div>
                            <div className={`w-full h-[2px] bg-[#222634] ${
                              index === 0 ? 'mt-4 mb-8' :
                              index === 1 ? 'mt-4 mb-8' :
                              index === 2 ? 'mt-11.5 mb-8' :
                              'mt-4 mb-8'
                            }`} />
                            {(index === 0 || index === 2) && index !== benefits.length - 1 && (
                              <div className={`hidden lg:block absolute right-[-96px] h-[2px] bg-[#222634] w-24 ${
                                index === 2 ? 'top-[152px]' : 'top-[82%]'
                              }`} />
                            )}
                          </>
                        )}
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>

              <ScrollReveal
                initial={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {!isLoading && (
                  <div className="hidden lg:flex items-start">
                    <img
                      src="/powerdirectpage/Frame 446.svg"
                      alt="Why Power Direct"
                      className="w-[300px] h-[300px] rounded-[20px]"
                    />
                  </div>
                )}
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PricingSection: React.FC<{ isLoading: boolean }> = ({ isLoading }) => (
  <section id="pricing" className="py-8 md:py-32 pt-6 md:pt-16 bg-[#141624] mb-8 md:mb-8">
    <ScrollReveal
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 max-w-[1440px]">
        <div className="flex flex-col max-w-[800px] mx-auto px-6 md:px-0 items-start">
          {isLoading ? (
            <>
              <Skeleton height={48} width={400} className="mb-6" />
              <Skeleton height={24} width={600} className="mb-6" />
              <Skeleton height={24} width={600} className="mb-8" />
              <Skeleton height={48} width={120} />
            </>
          ) : (
            <>
              <h2 className="text-[32px] md:text-[48px] font-semibold mb-6 text-white leading-tight">
                Instant, transparent pricing for your needs
              </h2>
              <p className="text-[20px] font-normal text-[#D3D4D9] mb-6 text-left">
                Use our calculator to get a personalized quote instantly—no email required, no strings attached!
              </p>
              <p className="text-[20px] font-normal text-[#D3D4D9] mb-8 text-left">
                Discover flexible plans and make informed decisions with confidence!
              </p>
              <div className="flex items-center gap-4">
                <button className="bg-[#FCD913] text-black py-2 px-4 rounded-tl-[16px] rounded-br-[16px] rounded-tr-[4px] rounded-bl-[4px] font-semibold text-[16px]">
                  COMING SOON
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </ScrollReveal>
  </section>
);

export default function Page() {
  return <App />;
}