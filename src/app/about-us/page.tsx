"use client";

import React, { useState, useEffect, useRef } from "react";
import { Exo_2 } from "next/font/google";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Footer from "../components/layouts/Footer";
import PopularFaq from "../components/main/PopularFaq";
import Header from "../components/Newheader";
import Carousel from '../components/main/Carousel';
import OurValues from "./(components)/OurValues";
import { motion, useInView, UseInViewOptions } from 'framer-motion';

const exo2 = Exo_2({
    subsets: ['latin'],
    display: 'swap',
});

// Utility function
const cn = (...classes: string[]): string => {
    return classes.filter(Boolean).join(' ');
};

interface ScrollRevealProps {
    children: React.ReactNode;
    initial?: { opacity: number; y?: number; x?: number };
    animate?: { opacity: number; y?: number; x?: number };
    transition?: { duration: number; delay?: number; ease?: string };
    className?: string;
    rootMargin?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    initial = { opacity: 0, y: 50 },
    animate = { opacity: 1, y: 0 },
    transition = { duration: 0.5, ease: "easeOut" },
    className = "", // Provide a default empty string
    rootMargin = "0px 0px -100px 0px",
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, rootMargin: rootMargin } as UseInViewOptions);

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

const AboutUs = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <SkeletonTheme baseColor="#262626" highlightColor="#333">
                <div className={`min-h-screen bg-[#141624] text-white ${exo2.className}`}>
                    <Header className="absolute w-full z-50 bg-transparent" />

                    {/* Hero section skeleton */}
                    <section className="relative w-full h-[695.16px] flex flex-col items-center justify-center pt-38 md:pt-40">
                        <Skeleton width={451} height={64} className="mb-4" />
                        <Skeleton width="70%" height={30} />
                    </section>

                    {/* Vision & Mission skeleton */}
                    <section className="py-8 md:py-32 bg-[#141624]">
                        <div className="container mx-auto px-4 max-w-[1440px]">
                            <div className="flex flex-col lg:flex-row rounded-xl overflow-hidden gap-8">
                                <div className="flex-1 text-end">
                                    <Skeleton width={120} height={40} className="mb-4" />
                                    <Skeleton count={3} height={20} />
                                </div>
                                <div className="flex-1 text-start">
                                    <Skeleton width={120} height={40} className="mb-4" />
                                    <Skeleton count={3} height={20} />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Our Values skeleton */}
                    <section className="py-16 bg-[#141624]">
                        <div className="container mx-auto px-4 max-w-[1440px]">
                            <Skeleton width={200} height={40} className="mx-auto mb-12" />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[1, 2, 3].map((item) => (
                                    <Skeleton key={item} height={250} />
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Why Rooftop Energy skeleton */}
                    <section className="py-32 bg-[#141624]">
                        <div className="container mx-auto px-4 max-w-[1440px] text-center">
                            <Skeleton width={250} height={40} className="mx-auto mb-12" />
                            <Skeleton count={5} height={20} width="70%" className="mx-auto" />
                        </div>
                    </section>

                    {/* Our Projects skeleton */}
                    <section className="w-full mb-12 px-6 lg:px-12 xl:px-32">
                        <Skeleton width={200} height={40} className="mx-auto mb-12" />
                        <Skeleton height={300} />
                    </section>

                    {/* FAQ skeleton */}
                    <section className="pt-24 pb-24 bg-[#141624]">
                        <div className="container mx-auto px-4 max-w-[1440px] flex flex-col items-center">
                            <Skeleton width={150} height={40} className="mb-8" />
                            <div className="w-full space-y-4">
                                {[1, 2, 3, 4].map((item) => (
                                    <Skeleton key={item} height={60} />
                                ))}
                            </div>
                        </div>
                    </section>

                    <Footer />
                </div>
            </SkeletonTheme>
        );
    }

    // Real content once loading is finished
    return (
        <div className={`min-h-screen bg-[#141624] text-white ${exo2.className}`}>
            <div className="relative h-[695.16px]">
                <div className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{ backgroundImage: "url('/aboutus/abouts-us.svg')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#141624] via-transparent to-transparent"></div>

                <Header className="absolute w-full z-50 bg-transparent" />

                <section className="relative w-full h-[500px] md:h-[695.16px] flex items-start justify-center pt-20 md:pt-20">
                    <div className="relative container mx-auto px-4 max-w-[1440px] flex flex-col items-center z-10">
                        <div className="flex flex-col items-center">
                            <img src="/logo.svg" alt="Rooftop Energy" className="w-[276px] md:w-[451px] text-center mb-4 " />
                            <p className="text-[16px] md:text-[20px] font-medium mb-8 max-w-2xl md:max-w-4xl text-center px-6 md:px-0">
                                <span className="text-[#FFFFFF]">Precision. Power. Progress. <br className="hidden md:block" /></span>
                                <span className="text-[#FCD913]">At Rooftop Energy</span> , we partner with businesses to unlock the true potential of solar power. <br className="hidden md:block" />
                                <span className="text-[#FFFFFF]">With world-class expertise, innovative solutions, and a commitment to progress, we deliver clean energy systems that drive operational savings, enhance resilience, and contribute to a sustainable future. </span>
                                <span className="text-[#FFFFFF]">We envision a Malaysia where every business leads with purpose and power — and it all starts on the rooftop.</span>
                                <span className="text-[#FFFFFF]">A proud member of the Dynasynergy Group</span>
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            <section className="py-8 md:py-32 bg-[#141624]">
                <div className="container mx-auto px-4 max-w-[1440px] flex justify-center">
                    <div className="w-5/6 mx-auto my-10">
                        <div className="flex flex-col lg:flex-row rounded-xl text-white overflow-hidden">

                            <div className="flex-1 lg:border-r-3 lg:pr-12 border-[#FCD913] text-start lg:text-end">
                                <ScrollReveal>
                                    <h3 className="text-4xl font-semibold text-[#FCD913] mb-4">Vision</h3>
                                    <p className="text-2xl text-gray-300 mb-6 md:mb-0">
                                        To be a leading energy provider in the renewables space, empowering seamless access to sustainable energy solutions
                                    </p>
                                </ScrollReveal>
                            </div>

                            <div className="flex-1 pt-[50px] lg:pt-0 lg:pl-12 text-start">
                                <ScrollReveal>
                                    <h3 className="text-4xl font-semibold text-[#FCD913] mb-4">Mission</h3>
                                    <p className="text-2xl text-gray-300">
                                        To provide affordable and high-quality energy solutions that empower users to lower their carbon footprint and energy cost
                                    </p>
                                </ScrollReveal>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <OurValues />

            <section className="py-32 md:pt-16 bg-[#141624]">
                <div className="container mx-auto px-4 max-w-[1440px]">
                    <div className="w-5/6 mx-auto text-center text-white">
                        <ScrollReveal>
                            <h2 className="text-3xl font-semibold text-[#FCD913] mb-12 whitespace-nowrap">
                                Why Rooftop Energy?
                            </h2>
                            <p className="text-xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
                                As a subsidiary of Dynasynergy Group, Rooftop Energy Tech Sdn Bhd drives the growth of on-grid solar energy with
                                <span className="font-semibold text-[#FCD913]"> advanced software and data analytics</span>. We specialize in enhancing solar PV efficiency for commercial and industrial sectors,
                                <span className="font-semibold text-[#FCD913]"> maximizing performance</span> and returns for our stakeholders.
                            </p>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            <section className="w-full mb-12 px-6 lg:px-12 xl:px-32 my-16">
                <h2 className="text-3xl text-center font-semibold text-white mb-12 whitespace-nowrap">
                    Our Projects
                </h2>
                <Carousel />
            </section>

            <section className="pt-24 pb-24 bg-[#141624]">
                <div className="container mx-auto px-4 max-w-[1440px] flex flex-col items-center">
                    <PopularFaq />
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AboutUs;