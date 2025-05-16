"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, MotionProps, Transition, UseInViewOptions } from 'framer-motion';
import Header from '../components/Newheader';
import Footer from '../components/layouts/Footer';
import { Exo_2 } from 'next/font/google';
import ScrollButton from '../components/ScrollButton';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const exo2 = Exo_2({
    subsets: ['latin'],
    display: 'swap',
});

interface ViewportOptions {
    once?: boolean;
    margin?: string;
    amount?: 'some' | 'all' | number;
    root?: React.RefObject<Element | null> | null;
    rootMargin?: string;
}

// Reusable ScrollReveal Component using Framer Motion
const ScrollReveal = ({
    children,
    initial = { opacity: 0, y: 50 },
    whileInView = { opacity: 1, y: 0 },
    transition = { duration: 0.6 },
    viewport = { once: true },
}: {
    children: React.ReactNode;
    initial?: MotionProps["initial"];
    whileInView?: MotionProps["animate"];
    transition?: Transition;
    viewport?: ViewportOptions;
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, viewport as UseInViewOptions);

    return (
        <motion.div
            ref={ref}
            initial={initial}
            animate={isInView ? whileInView : {}}
            transition={transition}
        >
            {children}
        </motion.div>
    );
};

const HeroSection = ({ isLoading }: { isLoading: boolean }) => {
    return (
        <section className="relative w-full h-[500px] md:h-[695.16px] flex items-start justify-center pt-38 md:pt-40 mb-8 md:mb-8">
            <div className="relative container mx-auto px-4 max-w-[1440px] flex flex-col items-center z-10">
                <div className="flex flex-col items-center">
                    {isLoading ? (
                        <>
                            <Skeleton className="h-14 md:h-24 w-64 md:w-96 mb-4" />
                        </>
                    ) : (
                        <ScrollReveal>
                            <h1 className="text-[48px] md:text-[96px] font-semibold mb-4 text-center">Installment</h1>
                        </ScrollReveal>
                    )}

                    {isLoading ? (
                        <>
                            <Skeleton className="h-16 md:h-20 w-full max-w-2xl md:max-w-3xl mb-16" />
                        </>
                    ) : (
                        <ScrollReveal>
                            <p className="text-[16px] md:text-[20px] font-medium mb-16 max-w-2xl md:max-w-3xl text-center px-6 md:px-0">
                                Our <span className="text-[#FCD913]">Installment Purchase Plan</span> offers easy solar ownership with flexible monthly payments, <span className="text-[#FCD913]">zero upfront costs</span>, hassle-free maintenance.
                            </p>
                        </ScrollReveal>
                    )}

                    <div className="flex w-full justify-center md:block md:w-[250px]">
                        {isLoading ? (
                            <Skeleton className="h-12 w-48" />
                        ) : (
                            <ScrollReveal>
                                <ScrollButton />
                            </ScrollReveal>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

const FeaturesSection = ({ isLoading }: { isLoading: boolean }) => {
    const features = [
        {
            icon: <img src="/installmentpage/badge-dollar-sign.svg" alt="Cash Flow" className="w-10 h-10" />,
            title: "Cash Flow Neutral",
            description: "Monthly payments are set to be equal to your previous electricity costs. No additional cost is incurred."
        },
        {
            icon: <img src="/installmentpage/construction.svg" alt="Quote" className="w-10 h-10" />,
            title: "Instant quote",
            description: "One email through our instant quote calculator will figure out pricing."
        },
        {
            icon: <img src="/installmentpage/house-plug.svg" alt="Ownership" className="w-10 h-10" />,
            title: "Full Ownership",
            description: "Take ownership with a full ownership gate with zero upfront investment."
        },
        {
            icon: <img src="/installmentpage/battery-charging.svg" alt="Energy Control" className="w-10 h-10" />,
            title: "Energy Control",
            description: "Gain control over your energy production and electricity bills."
        }
    ];

    return (
        <section className="py-8 md:py-32 bg-[#141624] mb-8 md:mb-8">
            <div className="container mx-auto px-4 max-w-[1440px] flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-24 md:gap-y-0 md:gap-8 lg:gap-x-24">
                    {features.map((feature, index) => (
                        <ScrollReveal key={index}>
                            <div
                                className="bg-white/[0.04] p-8 rounded-[20px] w-[300px] md:w-[252px] h-[264px] md:h-[284px] flex flex-col items-center mx-auto"
                            >
                                {isLoading ? (
                                    <>
                                        <Skeleton className="w-10 h-10 mb-6" circle />
                                        <Skeleton className="h-6 w-3/4 mb-4" />
                                        <Skeleton className="h-16 w-full" count={2} />
                                    </>
                                ) : (
                                    <>
                                        <div className="text-4xl mb-6">{feature.icon}</div>
                                        <h3 className="text-[20px] font-semibold mb-4 text-white text-center">
                                            {feature.title}
                                        </h3>
                                        <p className="text-[18px] font-light text-[#9EA1AD] text-left">
                                            {feature.description}
                                        </p>
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

const WhyInstallmentSection = ({ isLoading }: { isLoading: boolean }) => {
    const benefits = [
        {
            icon: "banknote-arrow-down.svg",
            title: "Predictable Costs",
            description: "Lock in consistent monthly payments, shielding yourself from rising energy costs."
        },
        {
            icon: "shield-alert.svg",
            title: "Risk Protection",
            description: "Enjoy comprehensive, unexpected maintenance costs during the installment period."
        },
        {
            icon: "file-cog.svg",
            title: "Customizable Plans",
            description: "Choose flexible payment terms tailored to your budget and energy needs."
        },
        {
            icon: "house-plus.svg",
            title: "Increased Property Value",
            description: "Boost your property's value with a solar energy system that you'll fully own."
        }
    ];

    return (
        <section className="py-8 md:py-32 pb-4 md:pb-16 bg-[#141624] mb-8 md:mb-8">
            <div className="container mx-auto px-4 max-w-[1440px] flex flex-col items-center">
                <div className="w-full max-w-[1200px] flex flex-col">
                    <div className="w-full pl-4 lg:pl-0">
                        {isLoading ? (
                            <Skeleton className="h-10 w-48 mb-8 md:mb-16" />
                        ) : (
                            <ScrollReveal>
                                <h2 className="text-[#FCD913] text-[32px] font-bold mb-8 md:mb-16">Why Installment?</h2>
                            </ScrollReveal>
                        )}

                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-x-32 items-start justify-center">
                            <div className="w-full lg:w-[800px] flex justify-center">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 lg:gap-x-24 lg:gap-y-12 relative">
                                    {benefits.map((benefit, index) => (
                                        <ScrollReveal key={index}>
                                            <div className="w-full sm:w-[360px] relative flex flex-col">
                                                {isLoading ? (
                                                    <>
                                                        <div className="flex items-start gap-4">
                                                            <Skeleton className="w-6 h-6 mt-1" />
                                                            <div className="flex flex-col w-full">
                                                                <Skeleton className="h-7 w-3/4 mb-3" />
                                                                <Skeleton className="h-5 w-full" count={2} />
                                                            </div>
                                                        </div>
                                                        <Skeleton className="w-full h-[1px] mt-8 mb-8" />
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="flex items-start gap-4">
                                                            <div className="flex-shrink-0 w-[24px] h-[24px] mt-1">
                                                                <img
                                                                    src={`/installmentpage/${benefit.icon}`}
                                                                    alt={benefit.title}
                                                                    className="w-[24px] h-[24px]"
                                                                />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <h3 className="text-[24px] font-semibold text-white mb-3">
                                                                    {benefit.title}
                                                                </h3>
                                                                <p className="text-[18px] font-normal text-[#9EA1AD] leading-relaxed">
                                                                    {benefit.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="relative">
                                                            <div className={`w-full h-[1px] bg-[#222634] ${index === 2 ? 'mt-[32px] mb-8' : 'mt-8 mb-8'}`} />
                                                            {(index === 0 || index === 2) && index !== benefits.length - 1 ? (
                                                                <div className={`hidden lg:block absolute right-[-96px] h-[1px] bg-[#222634] w-24 ${
                                                                    index === 2 ? 'top-[32px]' : 'top-[50%]'
                                                                }`} />
                                                            ) : null}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </ScrollReveal>
                                    ))}
                                </div>
                            </div>
                            <div className="hidden lg:flex items-start">
                                {isLoading ? (
                                    <Skeleton className="w-[300px] h-[300px] rounded-[20px]" />
                                ) : (
                                    <ScrollReveal>
                                        <div className="w-[300px]">
                                            <img
                                                src="/powerdirectpage/Frame 446.svg"
                                                alt="Why Installment"
                                                className="w-[300px] h-[300px] rounded-[20px]"
                                            />
                                        </div>
                                    </ScrollReveal>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const PricingSection = ({ isLoading }: { isLoading: boolean }) => {
    return (
        <section id="pricing" className="py-8 md:py-32 pt-4 md:pt-16 bg-[#141624] mb-24 md:mb-24">
            <div className="container mx-auto px-4 max-w-[1440px]">
                <div className="flex flex-col max-w-[800px] mx-auto px-6 md:px-0">
                    {isLoading ? (
                        <>
                            <Skeleton className="h-12 md:h-16 w-full max-w-[600px] mb-6" />
                            <Skeleton className="h-6 w-full mb-6" />
                            <Skeleton className="h-6 w-full mb-8" />
                            <Skeleton className="h-10 w-40" />
                        </>
                    ) : (
                        <>
                            <ScrollReveal>
                                <h2 className="text-[32px] md:text-[48px] font-semibold mb-6 text-white">
                                    Instant, transparent pricing for your needs
                                </h2>
                            </ScrollReveal>

                            <ScrollReveal>
                                <p className="text-[20px] font-normal text-[#D3D4D9] mb-6 text-left">
                                    Use our calculator to get a personalized quote instantly—no email required, no strings attached!
                                </p>
                            </ScrollReveal>

                            <ScrollReveal>
                                <p className="text-[20px] font-normal text-[#D3D4D9] mb-8 text-left">
                                    Discover flexible plans and make informed decisions with confidence!
                                </p>
                            </ScrollReveal>

                            <ScrollReveal>
                                <div className="flex items-center gap-4">
                                    <button className="bg-[#FCD913] text-black py-2 px-4 rounded-tl-[16px] rounded-br-[16px] rounded-tr-[4px] rounded-bl-[4px] font-semibold text-[16px]">
                                        COMING SOON
                                    </button>
                                </div>
                            </ScrollReveal>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

const App = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`min-h-screen bg-[#141624] text-white ${exo2.className}`}>
            <div className="relative h-[695.16px]">
                <div className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{ backgroundImage: "url('/installmentpage/iStock-1254060111.svg')" }}>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#141624] via-transparent to-transparent"></div>
                <Header className="absolute w-full z-50 bg-transparent" />
                <HeroSection isLoading={isLoading} />
            </div>
            <FeaturesSection isLoading={isLoading} />
            <WhyInstallmentSection isLoading={isLoading} />
            <PricingSection isLoading={isLoading} />
            <div className="mt-24 md:mt-24">
                <Footer />
            </div>
        </div>
    );
};

export default function Page() {
    return (
        <SkeletonTheme baseColor="#262626" highlightColor="#333">
            <App />
        </SkeletonTheme>
    );
}