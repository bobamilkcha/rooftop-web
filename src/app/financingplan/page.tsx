"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight } from "lucide-react";
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Carousel from "../components/main/Carousel";
import Header from '../components/Newheader';
import Footer from '../components/layouts/Footer';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Feature component
interface FeatureProps {
    text: string;
}

const Feature: React.FC<FeatureProps> = ({ text }) => {
    return (
        <div className="flex items-center mb-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="inline-block w-4 h-4 bg-yellow-400 rounded-full relative"
            >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-black rounded-full"></div>
            </motion.div>
            <span className="ml-2 text-sm font-['Exo_2']">{text}</span>
        </div>
    );
};

// Testimonial card component
interface TestimonialCardProps {
    company: string;
    description: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ company, description }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-[#222634] p-6 rounded-lg min-h-40 font-['Exo_2']"
        >
            <h4 className="text-lg mb-2">{company}</h4>
            <p className="text-sm text-gray-400">{description}</p>
        </motion.div>
    );
};

// Main Page Component
export default function FinancingPage() {
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
                <div className="min-h-screen bg-[#141624] text-white font-['Exo_2']">
                    <Header />

                    {/* Hero section loading state */}
                    <section className="w-full relative">
                        <div className="pt-24 md:pt-32 pb-24 md:pb-32 min-h-[500px] flex items-center w-full">
                            <div className="container mx-auto px-4">
                                <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-12">
                                    {/* Hero images skeleton */}
                                    <div className="relative w-[250px] h-[300px] md:w-auto md:h-auto mb-12 md:mb-0 flex justify-center items-center md:block">
                                        <Skeleton className="w-full h-full rounded-lg absolute md:relative md:-top-5 md:-left-5 top-0 left-0 z-0" />
                                        <Skeleton className="w-full h-full rounded-lg absolute bottom-0 right-0 md:-bottom-10 md:left-20 z-10" />
                                    </div>

                                    {/* Hero text skeleton */}
                                    <div className="max-w-xl text-center md:text-left md:ml-16 space-y-4">
                                        <Skeleton height={48} width="80%" className="mx-auto md:mx-0" />
                                        <Skeleton height={24} width="60%" className="mx-auto md:mx-0" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Gradient Separator */}
                    <div className="relative py-8 md:py-32">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0D] to-[#141624] z-0"></div>
                    </div>

                    {/* Financing Options loading */}
                    <div className="w-full bg-[#141624] pt-8 md:pt-0">
                        <section className="container mx-auto px-4">
                            <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-12 md:gap-[64px] flex-wrap">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="bg-black bg-opacity-40 rounded-[33px] p-6 w-[322px] h-[355px] md:h-[357px] flex flex-col justify-between">
                                        <div className="space-y-4">
                                            <Skeleton height={32} width="75%" className="mx-auto" />
                                            <Skeleton height={1} width={222} className="mx-auto" />
                                            <div className="space-y-3">
                                                {[1, 2, 3, 4].map((line) => (
                                                    <div key={line} className="flex items-start gap-2">
                                                        <Skeleton circle width={16} height={16} />
                                                        <Skeleton height={16} width="90%" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <Skeleton height={40} width="100%" className="rounded-full" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Spacer */}
                    <div className="py-16 md:py-32"></div>

                    {/* Comparison Table loading (hidden on mobile) */}
                    <div className="w-full bg-[#141624] hidden md:block">
                        <section className="w-full px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32">
                            <Skeleton height={32} width="200px" className="mx-auto mb-12" />
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[800px]">
                                    <thead>
                                        <tr>
                                            <th className="p-4"><Skeleton height={24} /></th>
                                            {[1, 2, 3].map((item) => (
                                                <th key={item} className="p-4">
                                                    <Skeleton height={80} className="rounded-lg" />
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((row) => (
                                            <tr key={row} className="border-b border-[#3A3F4E]">
                                                <td className="p-4"><Skeleton height={20} width="80%" /></td>
                                                {[1, 2, 3].map((cell) => (
                                                    <td key={cell} className="p-4">
                                                        <Skeleton height={60} width="90%" className="mx-auto" />
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>

                    {/* Spacer for mobile when table is hidden */}
                    <div className="py-16 md:py-32 block md:hidden"></div>

                    {/* Testimonials loading */}
                    <div className="w-full bg-[#141624]">
                        <div className="container mx-auto px-4">
                            <section className="w-full mb-12 px-4 md:px-8 lg:px-24 xl:px-32">
                                <div className='font-semibold flex items-center justify-between'>
                                    <Skeleton width={120} height={48} />
                                    <Skeleton circle width={40} height={40} />
                                </div>
                                <div className='mt-4'>
                                    <Skeleton height={24} width="100%" count={2} />
                                </div>
                            </section>
                            <section className="w-full mb-12 px-6 lg:px-12 lg:px-24 xl:px-32 my-16">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[1, 2].map((item) => (
                                        <Skeleton key={item} height={160} className="rounded-lg" />
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* CTA loading */}
                    <div className="w-full bg-[#141624] py-16">
                        <section className="container mx-auto">
                            <div className="px-4 max-w-[800px] mx-auto space-y-6">
                                <Skeleton height={48} width="100%" />
                                <Skeleton height={24} width="75%" />
                                <Skeleton height={24} width="66%" />
                                <Skeleton height={40} width={128} />
                            </div>
                        </section>
                    </div>

                    <Footer />
                </div>
            </SkeletonTheme>
        );
    }

    // Actual content when loading is complete
    return (
        <div className="min-h-screen bg-[#141624] text-white font-['Exo_2']">
            {/* Hero section */}
            <section className="bg-[url('/financingplan/Dynamic%20background.svg')] bg-cover bg-[right_-6.5rem_center] md:bg-center w-full relative">
                <Header />
                <div className="pt-24 md:pt-32 pb-24 md:pb-32 min-h-[500px] flex items-center w-full">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-12">
                            <div className="relative w-[250px] h-[300px] md:w-auto md:h-auto mb-12 md:mb-0 flex justify-center items-center md:block">
                                <motion.img
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    src="/financingplan/image 25.svg"
                                    alt="Solar panel"
                                    className="w-[200px] h-[230px] md:w-[327px] md:h-[380px] rounded-lg object-cover absolute md:relative md:-top-5 md:-left-5 top-0 left-0 z-0"
                                />
                                <motion.img
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    src="/financingplan/image 26.svg"
                                    alt="Modern building"
                                    className="w-[200px] h-[230px] md:w-[327px] md:h-[380px] rounded-lg object-cover absolute bottom-0 right-0 md:-bottom-10 md:left-20 z-10"
                                />
                            </div>
                            <div className="max-w-xl text-center md:text-left md:ml-16">
                                <motion.h1
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="text-4xl md:text-5xl font-bold mb-4"
                                >
                                    Financing Plans
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="text-base md:text-lg text-gray-300"
                                >
                                    We offer a wide range of options designed for every business.
                                </motion.p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gradient Separator */}
            <div className="relative py-8 md:py-32">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0D] to-[#141624] z-0"></div>
            </div>

            {/* Financing Options */}
            <div className="w-full bg-[#141624] pt-8 md:pt-0">
                <section className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-12 md:gap-[64px] flex-wrap">
                        {/* Power Direct */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="bg-[#080912] bg-opacity-40 rounded-[33px] p-6 w-[322px] h-[355px] md:h-[357px] flex flex-col justify-between font-['Exo_2']"
                        >
                            <div>
                                <h3 className="text-[#FCD913] text-xl font-bold mb-2 text-center">Power Direct</h3>
                                <div className="mx-auto w-[222px] h-px bg-[#3A3F4E] mb-6" />
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-start gap-2">
                                        <img src="/financingplan/HiSun.svg" alt="Sun icon" className="text-[#FCD913] mt-1 h-4 w-4 flex-shrink-0" />
                                        <span className="text-white text-base">Power purchasing agreement</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <img src="/financingplan/HiSun.svg" alt="Sun icon" className="text-[#FCD913] mt-1 h-4 w-4 flex-shrink-0" />
                                        <span className="text-white text-base">Achieve energy independence</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <img src="/financingplan/HiSun.svg" alt="Sun icon" className="text-[#FCD913] mt-1 h-4 w-4 flex-shrink-0" />
                                        <span className="text-white text-base">Zero upfront cost</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <img src="/financingplan/HiSun.svg" alt="Sun icon" className="text-[#FCD913] mt-1 h-4 w-4 flex-shrink-0" />
                                        <span className="text-white text-base">Hassle-free maintenance and efficiency guarantee</span>
                                    </li>
                                </ul>
                            </div>
                            <Link
                                href="/powerdirect"
                                className="flex items-center justify-center gap-2 bg-[#FCD913] text-black text-sm font-medium rounded-full px-4 py-2 w-full hover:bg-[#e6c812] transition-colors mt-4 md:mt-0"
                            >
                                Find out more
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </motion.div>

                        {/* Installment */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut", delay: 0.2 }}
                            className="bg-[#080912] bg-opacity-40 rounded-[33px] p-6 w-[322px] h-[355px] md:h-[357px] flex flex-col justify-between font-['Exo_2']"
                        >
                            <div>
                                <h3 className="text-[#FCD913] text-xl font-bold mb-2 text-center">Installment</h3>
                                <div className="mx-auto w-[222px] h-px bg-[#3A3F4E] mb-6" />
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-start gap-2">
                                        <img src="/financingplan/HiSun.svg" alt="Sun icon" className="text-[#FCD913] mt-1 h-4 w-4 flex-shrink-0" />
                                        <span className="text-white text-base">ROI from as low as 3 years</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <img src="/financingplan/HiSun.svg" alt="Sun icon" className="text-[#FCD913] mt-1 h-4 w-4 flex-shrink-0" />
                                        <span className="text-white text-base">Achieve energy independence</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <img src="/financingplan/HiSun.svg" alt="Sun icon" className="text-[#FCD913] mt-1 h-4 w-4 flex-shrink-0" />
                                        <span className="text-white text-base">Zero upfront cost</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <img src="/financingplan/HiSun.svg" alt="Sun icon" className="text-[#FCD913] mt-1 h-4 w-4 flex-shrink-0" />
                                        <span className="text-white text-base">Hassle-free maintenance and efficiency guarantee</span>
                                    </li>
                                </ul>
                            </div>
                            <Link
                                href="/installment"
                                className="flex items-center justify-center gap-2 bg-[#FCD913] text-black text-sm font-medium rounded-full px-4 py-2 w-full hover:bg-[#e6c812] transition-colors mt-4 md:mt-0"
                            >
                                Find out more
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </motion.div>

                        {/* Upfront Payment */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut", delay: 0.4 }}
                            className="bg-[#080912] bg-opacity-40 rounded-[33px] p-6 w-[322px] h-[355px] md:h-[357px] flex flex-col justify-between font-['Exo_2']"
                        >
                            <div>
                                <h3 className="text-[#FCD913] text-xl font-bold mb-2 text-center">Upfront Payment</h3>
                                <div className="mx-auto w-[222px] h-px bg-[#3A3F4E] mb-6" />
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-start gap-2">
                                        <img src="/financingplan/HiSun.svg" alt="Sun icon" className="text-[#FCD913] mt-1 h-4 w-4 flex-shrink-0" />
                                        <span className="text-white text-base">Maximise returns from day one</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <img src="/financingplan/HiSun.svg" alt="Sun icon" className="text-[#FCD913] mt-1 h-4 w-4 flex-shrink-0" />
                                        <span className="text-white text-base">Achieve energy independence</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <img src="/financingplan/HiSun.svg" alt="Sun icon" className="text-[#FCD913] mt-1 h-4 w-4 flex-shrink-0" />
                                        <span className="text-white text-base">Hassle-free maintenance and efficiency guarantee</span>
                                    </li>
                                </ul>
                            </div>
                            <Link
                                href="/upfrontpurchase"
                                className="flex items-center justify-center gap-2 bg-[#FCD913] text-black text-sm font-medium rounded-full px-4 py-2 w-full hover:bg-[#e6c812] transition-colors mt-4 md:mt-0"
                            >
                                Find out more
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </div>

            {/* Spacer */}
            <div className="py-16 md:py-32"></div>

            {/* Comparison Table (hidden on mobile) */}
            <div className="w-full bg-[#141624] hidden md:block">
                <section className="w-full px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="text-[#FCD913] text-2xl font-bold text-center mb-12 font-['Exo_2']"
                    >
                        What's the difference?
                    </motion.h2>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px] font-['Exo_2']">
                            <thead>
                                <tr>
                                    <th className="p-4 text-left text-white"></th>
                                    <th className="p-4 text-center w-[25%]">  {/* Added width */}
                                        <div className="bg-[#141624] rounded-lg p-4">
                                            <h4 className="text-[#FCD913] text-[20px] font-bold">Power Purchase Agreement (PPA)</h4>
                                        </div>
                                    </th>
                                    <th className="p-4 text-center w-[25%]">  {/* Added width */}
                                        <div className="bg-[#141624] rounded-lg p-4">
                                            <h4 className="text-[#FCD913] text-[20px] font-bold">Installment Purchase</h4>
                                        </div>
                                    </th>
                                    <th className="p-4 text-center w-[25%]">  {/* Added width */}
                                        <div className="bg-[#141624] rounded-lg p-4">
                                            <h4 className="text-[#FCD913] text-[20px] font-bold">Upfront Purchase</h4>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-[#3A3F4E] hover:bg-[#222634] hover:bg-opacity-[2%] transition-colors duration-200">
                                    <td className="p-4 text-[#D3D4D9] font-medium text-[20px]">Ownership</td>
                                    <td className="p-4 text-center text-white font-medium text-[16px]">No</td>
                                    <td className="p-4 text-center text-white font-medium text-[16px]">
                                        Yes
                                        <br />
                                        Customer owns the system after repayment
                                    </td>
                                    <td className="p-4 text-center text-white font-medium text-[16px]">
                                        Yes
                                        <br />
                                        Customer owns the system outright
                                    </td>
                                </tr>
                                <tr className="border-b border-[#3A3F4E] hover:bg-[#222634] hover:bg-opacity-[2%] transition-colors duration-200">
                                    <td className="p-4 text-[#D3D4D9] font-medium text-[20px]">Payment Structure</td>
                                    <td className="p-4 text-center text-white font-medium text-[16px]">
                                        Pay for energy produced
                                        <br />
                                        (per kWh)
                                    </td>
                                    <td className="p-4 text-center text-white font-medium text-[16px]">
                                        Monthly installment over
                                        <br />a fixed period
                                    </td>
                                    <td className="p-4 text-white text-center font-medium text-[16px]">One-time payment</td>
                                </tr>
                                <tr className="border-b border-[#3A3F4E] hover:bg-[#222634] hover:bg-opacity-[2%] transition-colors duration-200">
                                    <td className="p-4 text-[#D3D4D9] font-medium text-[20px]">Contract Duration</td>
                                    <td className="p-4 text-center text-white font-medium text-[16px]">
                                        Typically
                                        <br />
                                        15 years
                                    </td>
                                    <td className="p-4 text-center text-white font-medium text-[16px]">
                                        Depends on installment
                                        <br />
                                        period
                                        <br />
                                        (e.g. 5-10 years)
                                    </td>
                                    <td className="p-4 text-center text-white font-medium text-[16px]">
                                        None
                                        <br />
                                        (immediate ownership)
                                    </td>
                                </tr>
                                <tr className="border-b border-[#3A3F4E] hover:bg-[#222634] hover:bg-opacity-[2%] transition-colors duration-200">
                                    <td className="p-4 text-[#D3D4D9] font-medium text-[20px]">Maintenance & Repair Cost</td>
                                    <td className="p-4 text-center text-white font-medium text-[16px]">
                                        Cover by Rooftop Energy
                                        <br />
                                        throughout the contract
                                    </td>
                                    <td className="p-4 text-center text-white font-medium text-[16px]">
                                        Cover by Rooftop Energy
                                        <br />
                                        throughout repayment
                                        <br />
                                        period
                                    </td>
                                    <td className="p-4 text-center text-white font-medium text-[16px]">
                                        Customer may purchase
                                        <br />
                                        optional
                                        <br />
                                        Maintenance Care Package
                                    </td>
                                </tr>
                                <tr className="border-b border-[#3A3F4E] hover:bg-[#222634] hover:bg-opacity-[2%] transition-colors duration-200">
                                    <td className="p-4 text-[#D3D4D9] font-medium text-[20px]">Risk of Energy Production Fluctuation</td>
                                    <td className="p-4 text-center text-white font-medium text-[16px]">None</td>
                                    <td className="p-4 text-center text-white font-medium text-[16px]">Customer bear the risk</td>
                                    <td className="p-4 text-center text-white font-medium text-[16px]">Customer bear the risk</td>
                                </tr>
                                <tr className="border-b border-[#3A3F4E] hover:bg-[#222634] hover:bg-opacity-[2%] transition-colors duration-200">
                                    <td className="p-4 text-[#D3D4D9] font-medium text-[20px]">Return on Investment (ROI)</td>
                                    <td className="p-4 text-center text-white font-medium text-[16px]">
                                        No Direct ROI, but lower
                                        <br />
                                        monthly payment
                                    </td>
                                    <td className="p-4 text-center text-white font-medium text-[16px]">
                                        Quicker ROI than PPA due
                                        <br />
                                        to ownership option
                                    </td>
                                    <td className="p-4 text-center text-white font-medium text-[16px]">
                                        Maximum ROI due to
                                        <br />
                                        immediate ownership
                                    </td>
                                </tr>
                                <tr className="border-b border-[#3A3F4E] hover:bg-[#222634] hover:bg-opacity-[2%] transition-colors duration-200">
                                    <td className="p-4 text-[#D3D4D9] font-medium text-[20px]">Best Fit for</td>
                                    <td className="p-4 text-center text-white font-medium text-[16px]">
                                        Customers seeking low
                                        <br />
                                        upfront investment for
                                        <br />
                                        predictable energy
                                        <br />
                                        production risks
                                    </td>
                                    <td className="p-4 text-center text-white font-medium text-[16px]">
                                        Customers looking for
                                        <br />
                                        ownership with low
                                        <br />
                                        upfront cost and fixed
                                        <br />
                                        payments
                                    </td>
                                    <td className="p-4 text-center text-white font-medium text-[16px]">
                                        Customers with available
                                        <br />
                                        capital looking for
                                        <br />
                                        maximum savings and
                                        <br />
                                        independence
                                    </td>
                                </tr>
                                <tr className="border-b border-[#3A3F4E] hover:bg-[#222634] hover:bg-opacity-[2%] transition-colors duration-200">
                                    <td className="p-4 text-[#D3D4D9] font-medium text-[20px]">Additional option</td>
                                    <td className="p-4 text-center font-medium text-[16px]">N/A</td>
                                    <td className="p-4 text-center font-medium text-[16px]">N/A</td>
                                    <td className="p-4 text-center font-medium text-[16px]">
                                        Option to subscribe
                                        <br />
                                        to Maintenance Care
                                        <br />
                                        Package
                                        <br />
                                        (Annual/Monthly
                                        <br />
                                        payment)
                                    </td>
                                </tr>
                                {/* New row for the buttons */}
                                <tr>
                                    <td className="p-4 text-[#D3D4D9] font-medium text-[20px]"></td>
                                    <td className="p-4 text-center">
                                        <Link
                                            href="/powerdirect"
                                            className="flex items-center justify-center gap-2 bg-[#FCD913] text-black text-[14px] font-normal w-[206px] h-[36px] rounded-full hover:bg-[#e6c812] transition-colors mx-auto"
                                        >
                                            Power Direct
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </td>
                                    <td className="p-4 text-center">
                                        <Link
                                            href="/installment"
                                            className="flex items-center justify-center gap-2 bg-[#FCD913] text-black text-[14px] font-normal w-[206px] h-[36px] rounded-full hover:bg-[#e6c812] transition-colors mx-auto"
                                        >
                                            Installment
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </td>
                                    <td className="p-4 text-center">
                                        <Link
                                            href="/upfrontpurchase"
                                            className="flex items-center justify-center gap-2 bg-[#FCD913] text-black text-[14px] font-normal w-[206px] h-[36px] rounded-full hover:bg-[#e6c812] transition-colors mx-auto"
                                        >
                                            Upfront Purchase
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

            <div className="py-12 md:py-16"></div>
            {/* Spacer for mobile when table is hidden */}
            <div className="py-32 md:py-48 block md:hidden"></div>

            {/* Testimonials */}
            <div className="w-full bg-[#141624]">
                <div className="container mx-auto px-4">
                    <section className="w-full mb-12 px-4 md:px-8 lg:px-24 xl:px-32 font-['Exo_2']">
                        <div className='font-semibold flex items-center justify-between text-white text-xl'>
                            <img
                                src="/logo.svg"
                                alt="Rooftop Energy"
                                className="h-12 md:h-18 lg:h-20 cursor-pointer"
                            />
                            <a
                                href="/about-us"
                                className="bg-[#FCD913] w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:bg-[#FCD913]/90 transition-colors"
                            >
                                <ArrowRight className="text-black h-5 w-5 md:h-auto md:w-auto text-2xl" />
                            </a>
                        </div>
                        <div className='text-base lg:text-xl text-[#D3D4D9] mt-4'>
                            We craft quotes that reflect real solar power returns. No optimistic assumptions, just data.
                        </div>
                    </section>
                    <section className="w-full mb-12 px-6 lg:px-12 lg:px-24 xl:px-32 my-16">
                        <div className='font-semibold flex items-center justify-between text-white text-xl mb-5'>
                            <Carousel />
                        </div>
                    </section>
                </div>
            </div>

            {/* Spacer */}
            <div className="py-16 md:py-32"></div>

            {/* CTA */}
            <div className="w-full bg-[#141624]">
                <section id="pricing" className="container mx-auto font-['Exo_2']">
                    <div className="px-4 max-w-[1440px]">
                        <div className="flex flex-col max-w-[800px] mx-auto px-4 md:px-6">
                            <motion.h2
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="text-[28px] md:text-[48px] font-semibold mb-6 text-white text-left md:text-left"
                            >
                                Instant, Transparent Pricing for Your Needs
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="text-[18px] md:text-[20px] font-normal text-white mb-6 text-left md:text-left"
                            >
                                Use our calculator to get a personalized quote instantly—no email required, no strings attached!
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="text-[18px] md:text-[20px] font-normal text-white mb-8 text-left md:text-left"
                            >
                                Discover flexible plans and make informed decisions with confidence!
                            </motion.p>
                            <div className="flex items-center gap-4">
                                <button className="bg-[#FCD913] text-black py-2 px-4 rounded-tl-[16px] rounded-br-[16px] rounded-tr-[4px] rounded-bl-[4px] font-semibold text-[16px]">
                                    COMING SOON
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Spacer before footer */}
            <div className="py-12 md:py-16"></div>

            <Footer />
        </div>
    );
}

