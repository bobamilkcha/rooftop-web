'use client';

import useMounted from "@/hooks/useMounted";
import { Flame, Handshake, MountainSnow, ShieldUser, Trophy } from "lucide-react";
import { useMediaQuery } from "react-responsive";

export default function OurValues() {
    const isMounted = useMounted();
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });

    if (!isMounted) return null;

    const bgImageStyle = {
        backgroundImage: isMobile
            ? `linear-gradient(to right, rgba(24,24,27,1) 40%, rgba(24,24,27,0.7) 200%, rgba(24,24,27,0.2), rgba(24,24,27,0)), url('/aboutus/our-values.svg')`
            : `linear-gradient(to right, rgba(24,24,27,1) 50%, rgba(24,24,27,0.2), rgba(24,24,27,0)), url('/aboutus/our-values.svg')`,
        backgroundSize: "cover",
        backgroundPosition: "right",
        backgroundRepeat: "no-repeat",
    };

    // Responsive card sizing
    const cardSize = isMobile ? "w-[301px] h-[301px]" :
        isTablet ? "w-[30%] h-[320px]" :
        "w-[30%] h-[301px]";

    // Responsive text sizing
    const titleSize = isMobile ? "text-2xl" : "text-3xl";
    const descSize = isMobile ? "text-lg" : "text-xl";
    const iconSize = isMobile ? "w-16 h-16" : "w-20 h-20";

    return (
        <section className="relative py-8 md:py-32 lg:pt-16 pb-4 md:pb-16 text-white bg-rtgray-900 overflow-hidden" style={bgImageStyle}>
            <div className="container mx-auto px-4 max-w-[1440px] flex flex-col items-center">
                <div className="w-5/6 mx-auto pt-12">
                    <h2 className="text-center text-3xl md:text-4xl font-semibold mb-12 md:mb-[96px]">Our Values</h2>

                    {/* Top Row - 3 Cards */}
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 text-center">
                        {/* Passion Card */}
                        <div className={`${cardSize} flex flex-col items-center justify-center mb-6 lg:mb-0 p-4 md:p-6 backdrop-blur-md bg-rtgray-700/30 border border-rtgray-400/50 rounded-xl shadow-lg`}>
                            <div className={`text-rtyellow-200 mb-3 md:mb-4`}><Flame className={`${iconSize}`} strokeWidth={1} /></div>
                            <h3 className={`${titleSize} font-semibold mb-4 md:mb-6`}>Passion</h3>
                            <p className={`${descSize} font-normal`}>Proud of the work we do to contribute to a greener future for Malaysia.</p>
                        </div>

                        {/* Respect Card */}
                        <div className={`${cardSize} flex flex-col items-center justify-center mb-6 lg:mb-0 p-4 md:p-6 backdrop-blur-md bg-rtgray-700/30 border border-rtgray-400/50 rounded-xl shadow-lg`}>
                            <div className={`text-rtyellow-200 mb-3 md:mb-4`}><Handshake className={`${iconSize}`} strokeWidth={1} /></div>
                            <h3 className={`${titleSize} font-semibold mb-4 md:mb-6`}>Respect</h3>
                            <p className={`${descSize} font-normal`}>Respect for our customer, competitors and stakeholders.</p>
                        </div>

                        {/* Integrity Card */}
                        <div className={`${cardSize} flex flex-col items-center justify-center mb-12 lg:mb-0 p-4 md:p-6 backdrop-blur-md bg-rtgray-700/30 border border-rtgray-400/50 rounded-xl shadow-lg`}>
                            <div className={`text-rtyellow-200 mb-3 md:mb-4`}><ShieldUser className={`${iconSize}`} strokeWidth={1} /></div>
                            <h3 className={`${titleSize} font-semibold mb-4 md:mb-6`}>Integrity</h3>
                            <p className={`${descSize} font-normal`}>Transparency and honesty at our core.</p>
                        </div>
                    </div>

                    {/* Bottom Row - 2 Cards */}
                    <div className="flex flex-col lg:flex-row items-center justify-center text-center lg:mt-12">
                        {/* Determination Card */}
                        <div className={`${cardSize} flex flex-col items-center justify-center mb-12 lg:mb-0 p-4 md:p-6 backdrop-blur-md bg-rtgray-700/30 border border-rtgray-400/50 rounded-xl shadow-lg lg:mr-6`}>
                            <div className={`text-rtyellow-200 mb-3 md:mb-4`}><MountainSnow className={`${iconSize}`} strokeWidth={1} /></div>
                            <h3 className={`${titleSize} font-semibold mb-4 md:mb-6`}>Determination</h3>
                            <p className={`${descSize} font-normal`}>We embrace challenges to solve complex problems.</p>
                        </div>

                        {/* Excellence Card */}
                        <div className={`${cardSize} flex flex-col items-center justify-center mb-6 lg:mb-0 p-4 md:p-6 backdrop-blur-md bg-rtgray-700/30 border border-rtgray-400/50 rounded-xl shadow-lg lg:ml-6`}>
                            <div className={`text-rtyellow-200 mb-3 md:mb-4`}><Trophy className={`${iconSize}`} strokeWidth={1} /></div>
                            <h3 className={`${titleSize} font-semibold mb-4 md:mb-6`}>Excellence</h3>
                            <p className={`${descSize} font-normal`}>Our promise to deliver to the highest standards.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}