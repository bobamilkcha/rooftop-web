"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, MotionProps, Transition, UseInViewOptions } from 'framer-motion';
import Header from '../components/Newheader';
import Footer from '../components/layouts/Footer';
import { Exo_2 } from 'next/font/google';
import ScrollButton from '@/app/components/ScrollButton';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const exo2 = Exo_2({
    subsets: ['latin'],
    display: 'swap',
});

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
    viewport?: UseInViewOptions;
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, viewport);

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
                        <Skeleton className="h-14 md:h-24 w-64 md:w-96 mb-4" />
                    ) : (
                        <ScrollReveal>
                            <h1 className="text-[48px] md:text-[96px] font-semibold mb-4 text-center">Upfront Purchase</h1>
                        </ScrollReveal>
                    )}
                    {isLoading ? (
                        <Skeleton className="h-16 md:h-20 w-full max-w-2xl md:max-w-3xl mb-16" count={2} />
                    ) : (
                        <ScrollReveal>
                            <p className="text-[16px] md:text-[20px] font-medium mb-16 max-w-2xl md:max-w-3xl text-center px-6 md:px-0">
                                An upfront purchase involves a <span className="text-rtyellow-200">one-time payment</span> to own the solar system outright.
                                This option eliminates long-term contracts, giving customers <span className="text-rtyellow-200">full control and ownership immediately</span>.
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
            icon: <img src="/upfrontpurchasepage/key-square.svg" alt="Ownership" className="w-10 h-10" />,
            title: "Ownership",
            description: "Immediate ownership of the system with a one-time payment."
        },
        {
            icon: <img src="/upfrontpurchasepage/sticky-note.svg" alt="Maximum ROI" className="w-10 h-10" />,
            title: "Maximum ROI",
            description: "Offers the highest return on investment due to immediate ownership."
        },
        {
            icon: <img src="/upfrontpurchasepage/atom.svg" alt="Independence" className="w-10 h-10" />,
            title: "Independence",
            description: "Ideal for customers with available capital seeking energy independence."
        },
        {
            icon: <img src="/upfrontpurchasepage/cross.svg" alt="Maintenance" className="w-10 h-10" />,
            title: "Maintenance Package",
            description: "Option to subscribe for maintenance care on an annual or monthly basis."
        }
    ];

    return (
        <section className="py-16 md:py-32 bg-rtgray-900">
            <div className="container mx-auto px-4 max-w-[1440px] flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-24 md:gap-y-0 md:gap-8 lg:gap-x-24">
                    {features.map((feature, index) => (
                        <ScrollReveal key={index}>
                            <div
                                className="bg-white/[0.04] p-8 rounded-[20px] w-[300px] md:w-[252px] h-[264px] md:h-[284px] flex flex-col items-center mx-auto"
                            >
                                {isLoading ? (
                                    <>
                                        <Skeleton className="w-10 h-10 mb-6" circle />
                                        <Skeleton className="h-6 w-3/4 mb-4" />
                                        <Skeleton className="h-4 w-full" count={3} />
                                    </>
                                ) : (
                                    <>
                                        <div className="text-4xl mb-6">{feature.icon}</div>
                                        <h3 className="text-[20px] font-semibold mb-4 text-white text-center">
                                            {feature.title}
                                        </h3>
                                        <p className="text-[18px] font-light text-rtgray-400 text-left">
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

const WhyUpfrontPurchaseSection = ({ isLoading }: { isLoading: boolean }) => {
    const benefits = [
        {
            icon: "settings.svg",
            title: "Customization",
            description: "Freedom to modify the system without restrictions"
        },
        {
            icon: "cable.svg",
            title: "Energy Independence",
            description: "Immediate ownership ensures self-sufficiency and control."
        },
        {
            icon: "wallet-cards.svg",
            title: "Interest-Free",
            description: "No ongoing installment payments, reducing total costs."
        },
        {
            icon: "hand-coins.svg",
            title: "Long-Term Savings",
            description: "Maximum return on investment by avoiding monthly payments."
        }
    ];

    return (
        <section className="py-16 md:py-32 pb-8 md:pb-16 bg-rtgray-900">
            <div className="container mx-auto px-4 max-w-[1440px]">
                <div className="w-full">
                    <div className="w-full pl-4 lg:pl-0">
                        {isLoading ? (
                            <Skeleton className="h-10 w-48 mb-16" />
                        ) : (
                            <ScrollReveal>
                                <h2 className="text-rtyellow-200 text-[32px] font-bold mb-16 text-left">Why Upfront Purchase?</h2>
                            </ScrollReveal>
                        )}
                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-x-32">
                            <div className="w-full">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 lg:gap-x-24 lg:gap-y-12">
                                    {benefits.map((benefit, index) => (
                                        <ScrollReveal key={index}>
                                            <div className="w-full sm:w-full relative">
                                                {isLoading ? (
                                                    <>
                                                        <div className="flex items-start gap-4">
                                                            <Skeleton className="w-6 h-6 mt-1" circle />
                                                            <div className="flex-1">
                                                                <Skeleton className="h-7 w-3/4 mb-3" />
                                                                <Skeleton className="h-4 w-full" count={2} />
                                                            </div>
                                                        </div>
                                                        <Skeleton className="w-full h-[1px] mt-4 mb-8" />
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="flex items-start gap-4">
                                                            <div className="flex-shrink-0 w-[24px] h-[24px] mt-1">
                                                                <img
                                                                    src={`/upfrontpurchasepage/${benefit.icon}`}
                                                                    alt={benefit.title}
                                                                    className="w-[24px] h-[24px]"
                                                                />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <h3 className="text-[24px] font-semibold text-white mb-3 text-left">
                                                                    {benefit.title}
                                                                </h3>
                                                                <p className="text-[18px] font-normal text-rtgray-400 leading-relaxed text-left">
                                                                    {benefit.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className={`w-full h-[2px] bg-rtgray-800 ${
                                                            index === 0 ? 'mt-4 mb-8' :
                                                            index === 1 ? 'mt-4 mb-8' :
                                                            index === 2 ? 'mt-4 mb-8' :
                                                            'mt-4 mb-8'
                                                        }`} />
                                                        {(index === 0 || index === 2) && index !== benefits.length - 1 && (
                                                            <div className={`hidden lg:block absolute right-[-96px] h-[2px] bg-rtgray-800 w-24 ${
                                                                index === 2 ? 'top-[122px]' : 'top-[99%]'
                                                            }`} />
                                                        )}
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
                                                alt="Why Upfront Purchase"
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
        <section id="pricing" className="py-16 md:py-32 pt-8 md:pt-16 bg-rtgray-900">
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
                                <p className="text-[20px] font-normal text-rtgray-300 mb-6 text-left">
                                    Use our calculator to get a personalized quote instantly—no email required, no strings attached!
                                </p>
                            </ScrollReveal>
                            <ScrollReveal>
                                <p className="text-[20px] font-normal text-rtgray-300 mb-8 text-left">
                                    Discover flexible plans and make informed decisions with confidence!
                                </p>
                            </ScrollReveal>
                            <ScrollReveal>
                                <div className="flex items-center gap-4">
                                    <button className="bg-rtyellow-200 text-black py-2 px-4 rounded-tl-[16px] rounded-br-[16px] rounded-tr-[4px] rounded-bl-[4px] font-semibold text-[16px]">
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

const UpfrontPurchasePage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`min-h-screen bg-rtgray-900 text-white ${exo2.className}`}>
            <div className="relative h-[695.16px]">
                {isLoading ? (
                    <Skeleton className="absolute inset-0" />
                ) : (
                    <>
                        <Header className="absolute w-full z-50 bg-transparent" />
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-40"
                            style={{ backgroundImage: "url('/upfrontpurchasepage/bgup.png')" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-rtgray-900 via-transparent to-transparent"></div>
                    </>
                )}
                <HeroSection isLoading={isLoading} />
            </div>
            <FeaturesSection isLoading={isLoading} />
            <WhyUpfrontPurchaseSection isLoading={isLoading} />
            <PricingSection isLoading={isLoading} />
            <div className="mt-24 md:mt-24">
                <Footer />
            </div>
        </div>
    );
};

export default UpfrontPurchasePage;