"use client";

import { useEffect, useState } from "react";
import { LuBuilding, LuFactory } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Newheader';
import Footer from '../components/layouts/Footer';
import Link from "next/link";

// Based on Pos Malaysia Database
const postcodeAreas = [
{ range: [1000, 2800], area: 'Perlis' },
{ range: [5000, 9810], area: 'Kedah' },
{ range: [10000, 14400], area: 'Pulau Pinang' },
{ range: [15000, 18500], area: 'Kelantan' },
{ range: [30000, 36810], area: 'Perak' },
{ range: [20000, 24300], area: 'Terengganu' },
{ range: [25000, 28800], area: 'Pahang' },
{ range: [39000, 39200], area: 'Pahang' },
{ range: [40000, 48300], area: 'Selangor' },
{ range: [50000, 60000], area: 'W.P Kuala Lumpur' },
{ range: [62000, 62999], area: 'Putrajaya' },
{ range: [63000, 68100], area: 'Selangor' },
{ range: [70000, 73500], area: 'Negeri Sembilan' },
{ range: [75000, 78300], area: 'Melaka' },
{ range: [79000, 86900], area: 'Johor' },
{ range: [87000, 87301], area: 'Labuan' },
{ range: [88000, 91307], area: 'Sabah' },
{ range: [93000, 98859], area: 'Sarawak' },
];

//outliers
const specificPostcodes = {
14290: 'Bandar Baharu, Kedah',
14390: 'Bandar Baharu, Kedah',
34950: 'Bandar Baharu, Kedah',
49000: 'Bukit Fraser, Pahang',
69000: 'Genting Highlands, Pahang'
};

// getAreaFromPostcode now uses the constant above
const getAreaFromPostcode = (postcode: string): string => {
const numericPostcode = parseInt(postcode);
if (isNaN(numericPostcode)) return '';

// Check specific postcodes first
if (specificPostcodes[numericPostcode]) {
return specificPostcodes[numericPostcode];
}

// Then check ranges
for (const { range, area } of postcodeAreas) {
const [min, max] = range;
if (numericPostcode >= min && numericPostcode <= max) {
return area;
}
}

return '';
};




const initialMonthlyBill = 100;

export const useElectricBillStore = () => {
    const [steps, setSteps] = useState(1);
    const [monthlyElectricBill, setMonthlyElectricBill] = useState<number | null>(initialMonthlyBill);
    const [buildingType, setBuildingType] = useState<string | null>(null);
    const [tariff, setTariff] = useState<string | null>(null);
    const [peakPowerDemand, setPeakPowerDemand] = useState<number | null>(null);
    const [peakHourRatio, setPeakHourRatio] = useState<string | null>(null);
    const [postcode, setPostcode] = useState<string | null>(null);
    const [quote, setQuote] = useState<any | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const calculateQuote = () => {
        setIsSubmitting(true);
        let calculatedQuote: any = {};

        if (buildingType === "Commercial") {
            calculatedQuote = {
                type: "Commercial",
                solarPanels: 10,
                savings: monthlyElectricBill ? monthlyElectricBill * 0.3 : 0,
            };
        } else if (buildingType === "Industrial") {
            calculatedQuote = {
                type: "Industrial",
                solarPanels: 25,
                savings: monthlyElectricBill ? monthlyElectricBill * 0.5 : 0,
            };
        }
        setQuote(calculatedQuote);
        setTimeout(() => {
            setIsSubmitting(false);
        }, 1000);
    };

    const reset = () => {
        setSteps(1);
        setMonthlyElectricBill(initialMonthlyBill);
        setBuildingType(null);
        setTariff(null);
        setPeakPowerDemand(null);
        setPeakHourRatio(null);
        setPostcode(null);
        setQuote(null);
        setIsSubmitting(false);
    }

    return {
        steps,
        setSteps,
        monthlyElectricBill,
        setMonthlyElectricBill,
        buildingType,
        setBuildingType,
        tariff,
        setTariff,
        peakPowerDemand,
        setPeakPowerDemand,
        peakHourRatio,
        setPeakHourRatio,
        postcode,
        setPostcode,
        calculateQuote,
        quote,
        reset,
        isSubmitting
    };
};

const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
};

const CalculatePage = () => {
    const router = useRouter();
    const [nextDisabled, setNextDisabled] = useState<boolean>(true);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editStep, setEditStep] = useState<number | null>(null);
    const {
        steps,
        setSteps,
        monthlyElectricBill,
        setMonthlyElectricBill,
        buildingType,
        setBuildingType,
        tariff,
        setTariff,
        peakPowerDemand,
        setPeakPowerDemand,
        peakHourRatio,
        setPeakHourRatio,
        calculateQuote,
        quote,
        isSubmitting,
        reset
    } = useElectricBillStore();
    const [isNextButtonHovered, setIsNextButtonHovered] = useState(false);
    const [isBackButtonHovered, setIsBackButtonHovered] = useState(false);
    const [inputValue, setInputValue] = useState<string>(monthlyElectricBill?.toString() || '');

    const cn = (...classes: (string | boolean | undefined | null)[]): string => {
        return classes.filter(Boolean).join(' ');
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        const numericValue = parseFloat(value);
        setMonthlyElectricBill(isNaN(numericValue) ? null : numericValue);
    };

    const handleNext = () => {
        if (isEditing && editStep !== null) {
            setSteps(7);
            setIsEditing(false);
            setEditStep(null);
        } else if (steps < 7) {
            setSteps(steps + 1);
        }
    };

    const handleBack = () => {
        if (isEditing && editStep !== null) {
            setSteps(7);
            setIsEditing(false);
            setEditStep(null);
        } else if (steps > 1) {
            setSteps(steps - 1);
        }
    };

    const handleEdit = (step: number) => {
        setIsEditing(true);
        setEditStep(step);
        setSteps(step);
    };

    const handleGetQuote = () => {
        calculateQuote();
    };

    const [postcode, setPostcode] = useState('');
    const [area, setArea] = useState('');
    useEffect(() => {
  if (postcode.length >= 4) {
    setArea(getAreaFromPostcode(postcode));
  } else {
    setArea('');
  }
}, [postcode]);

    const handlePostcodeChange = (newPostcode: string) => {
    setPostcode(newPostcode);
    const detectedArea = getAreaFromPostcode(newPostcode);
    setArea(detectedArea);
    };
    useEffect(() => {
        if (steps === 1 && monthlyElectricBill !== null && monthlyElectricBill > 0) {
            setNextDisabled(false);
        } else if (steps === 2 && buildingType) {
            setNextDisabled(false);
        } else if (steps === 3 && tariff) {
            setNextDisabled(false);
        } else if (steps === 4 && peakPowerDemand !== null && peakPowerDemand > 0) {
            setNextDisabled(false);
        } else if (steps === 5 && postcode) {
            setNextDisabled(false);
        } else if (steps === 6 && peakHourRatio) {
            setNextDisabled(false);
        } else {
            setNextDisabled(true);
        }
    }, [steps, buildingType, tariff, peakPowerDemand, peakHourRatio, postcode, monthlyElectricBill]);

    useEffect(() => {
        if (monthlyElectricBill !== null) {
            setInputValue(monthlyElectricBill.toString());
        }
    }, [monthlyElectricBill]);

    const nextButtonClasses = `font-medium py-3 px-6 rounded-full focus:outline-none focus:shadow-outline w-[240px] h-[48px] ${
        nextDisabled
            ? 'opacity-50 cursor-not-allowed bg-[#FFDA63] text-rtgray-900'
            : isNextButtonHovered
            ? 'bg-rtwhite text-rtgray-900 cursor-pointer'
            : 'bg-rtyellow-200 text-rtgray-900 cursor-pointer'
    }`;

    const getQuoteButtonClasses = `font-medium py-3 px-6 rounded-full focus:outline-none focus:shadow-outline w-[240px] h-[48px] ${
        isSubmitting
            ? 'opacity-50 cursor-not-allowed bg-[#FFDA63] text-rtgray-900'
            : isNextButtonHovered
            ? 'bg-rtwhite text-rtgray-900 cursor-pointer'
            : 'bg-rtyellow-200 text-rtgray-900 cursor-pointer'
    }`;

    const backButtonClasses = `bg-transparent border border-[#6B7280] text-white font-medium py-3 px-6 rounded-full focus:outline-none focus:shadow-outline w-[240px] h-[48px] ${
        isBackButtonHovered ? 'bg-rtwhite text-rtgray-900 cursor-pointer border-rtwhite' : ''
    }`;

    return (
        <div className="min-h-screen bg-rtgray-900 text-white flex flex-col items-center font-exo2">
            <Header />
            <div className="pt-20 pb-16 px-8 md:px-32 lg:px-48 flex flex-col items-center flex-grow w-full">
                {/* Progress Bar */}
                <div className="w-full max-w-[1200px] h-[60px] bg-rtgray-1000 flex items-center justify-between px-6 mb-8"
                style={{ borderRadius: '1000px' }}
                >
                {/* Container: main style, dimensions, and flex layout. */}

                <h2 className="text-md text-gray-300 font-medium">Estimate your quote</h2>
                {/* Title: updated to medium size font (text-md). */}

                <div className="rounded-xl h-1 overflow-hidden w-[218px] flex items-center">
                    {/* Progress Bar Track: adjusted height and width to accommodate segment dimensions, using rounded-xl for pill shape. */}
                    {[1, 2, 3, 4, 5, 6].map((step) => (
                    <div
                        key={step}
                        className={`h-4 rounded-xl transition-all duration-300 ease-in-out flex-none relative overflow-hidden`}
                        style={{
                        backgroundColor: steps > step ? '#22C55E' : steps === step ? '#FCD913' : '#28282B',
                        width: '35px',
                        marginRight: step < 6 ? '3px' : '0', // Adjust spacing for the new width
                        }}
                    ></div>
                    ))}
                </div>
                </div>

                {/* Step Content */}
                <div className="w-full max-w-md px-6 flex flex-col h-full m-auto">
                    <AnimatePresence mode='wait'>
                        {steps === 1 && (
                            <motion.div
                                key={1}
                                variants={stepVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="space-y-6 flex flex-col justify-center"
                            >
                                <div>
                                    <label className="block text-base mb-1">Monthly electricity bill</label>
                                    <div className="relative mb-6 flex items-center">
                                        <div className="absolute left-3 text-rtgray-300 text-2xl font-medium pointer-events-none flex items-center h-full">RM</div>
                                        <input
                                            type="text"
                                            id="monthlyBill"
                                            className="shadow appearance-none border border-rtgray-800 rounded w-full h-[60px] py-2 pl-16 text-rtyellow-200 leading-tight focus:outline-none focus:shadow-outline bg-rtgray-1000 text-left text-2xl font-medium placeholder-gray-400"
                                            placeholder="0"
                                            value={inputValue}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {steps === 2 && (
                            <motion.div
                                key={2}
                                variants={stepVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="flex flex-col w-full md:-ml-14 "
                            >
                                <h2 className="text-lg mb-6 text-left">Your building type</h2>
                                <div className="flex flex-col md:flex-row gap-3 w-full min-w-0 md:min-w-[624px] ">
                                    <button
                                        onClick={() => setBuildingType("Commercial")}
                                        className={cn(
                                            "flex flex-col items-center justify-center gap-3",
                                            "w-full md:w-[250px] h-[148px] rounded-xl",
                                            "transition-all duration-300 border hover:scale-105",
                                            buildingType === "Commercial"
                                                ? "border-rtyellow-200 text-black bg-rtyellow-200 shadow-[0_0_20px_rgba(252,217,19,0.35)]"
                                                : "bg-rtgray-800 border-rtgray-700 text-white"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center",
                                            "transition-all duration-300 ",
                                            buildingType === "Commercial" 
                                                ? "bg-rtorange-300" 
                                                : "bg-rtgray-700"
                                        )}>
                                            <LuBuilding className={cn(
                                                "w-5 h-5 transition-all duration-300",
                                                buildingType === "Commercial" 
                                                    ? "text-[#331E00]" 
                                                    : "text-gray-400"
                                            )} />
                                        </div>
                                        <span className="text-lg">Commercial</span>
                                    </button>

                                    <button
                                        onClick={() => setBuildingType("Industrial")}
                                        className={cn(
                                            "flex flex-col items-center justify-center gap-3",
                                            "w-full md:w-[250px] h-[148px] rounded-xl",
                                            "transition-all duration-300 border hover:scale-105",
                                            buildingType === "Industrial"
                                                ? "border-rtyellow-200 text-black bg-rtyellow-200 shadow-[0_0_20px_rgba(252,217,19,0.35)]"
                                                : "bg-rtgray-800 border-rtgray-700 text-white"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center",
                                            "transition-all duration-300",
                                            buildingType === "Industrial" 
                                                ? "bg-rtorange-300" 
                                                : "bg-rtgray-700"
                                        )}>
                                            <LuFactory className={cn(
                                                "w-5 h-5 transition-all duration-300",
                                                buildingType === "Industrial" 
                                                    ? "text-[#331E00]" 
                                                    : "text-gray-400"
                                            )} />
                                        </div>
                                        <span className="text-lg">Industrial</span>
                                    </button>
                                </div>

                                <p className="text-sm text-gray-400 mt-6 text-left">
                                    <a href="#" className="underline hover:text-rtyellow-200 transition-colors">
                                        Difference between commercial and industrial businesses
                                    </a>
                                </p>
                            </motion.div>
                        )}

                        {steps === 3 && (
                            <motion.div
                            key={3}
                            variants={stepVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="space-y-6 flex flex-col w-full max-w-3xl mx-auto px-2 sm:px-4"
                            >
                                <h2 className="text-lg">Your Tariff</h2>
                                <div className="w-full overflow-visible">
                                    <div className="flex justify-center"> {/* ✅ Add this wrapper */}
                                        <div className="grid grid-cols-1 gap-3 w-full items-center sm:w-auto">
                                        {Array.from({ length: 4 }).map((_, index) => {
                                            const tempTariff = `Tariff ${index + 1}`;
                                            return (
                                            <button
                                                key={index}
                                                onClick={() => setTariff(tempTariff)}
                                                className={cn(
                                                "flex flex-row gap-3 items-center rounded-lg p-3 cursor-pointer",
                                                "transition-all duration-300 border hover:scale-105",
                                                "w-full sm:w-[284px] h-[60px]",
                                                tariff === tempTariff
                                                    ? "border-rtyellow-200 text-black bg-rtyellow-200 shadow-[0_0_15px_rgba(252,217,19,0.35)]"
                                                    : "bg-rtgray-800 border-rtgray-700 text-white"
                                                )}
                                            >
                                                <div className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center",
                                                "transition-all duration-300",
                                                tariff === tempTariff 
                                                    ? "bg-rtorange-300" 
                                                    : "bg-rtgray-700"
                                                )}>
                                                <img 
                                                    src="/B.svg" 
                                                    alt="" 
                                                    className={cn(
                                                    "transition-all duration-300",
                                                    tariff === tempTariff 
                                                        ? "filter brightness-0" 
                                                        : ""
                                                    )} 
                                                />
                                                </div>
                                                <span className="text-sm truncate">{tempTariff}</span>
                                            </button>
                                            );
                                        })}
                                        </div>
                                    </div>
                                    </div>

                                <div className="space-y-2">
                                    <p className="text-left text-sm text-gray-400">
                                        <a href="#" className="underline hover:text-rtyellow-200 transition-colors">
                                            Where to find my tariff?
                                        </a>
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {steps === 4 && (
                            <motion.div
                                key={4}
                                variants={stepVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="space-y-6 flex flex-col justify-center"
                            >
                                <div>
                                    <label className="block text-base mb-6">Peak power demand</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            className="w-full bg-transparent border border-gray-600 rounded-lg p-3 text-rtyellow-200 placeholder-gray-400 pr-10"
                                            value={peakPowerDemand ?? ""}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setPeakPowerDemand(value === "" ? null : Number(value));
                                            }}
                                            placeholder="0"
                                        />
                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            kW
                                        </span>
                                    </div>
                                    <p className="text-left text-sm text-gray-400 mt-2">
                                        <a href="#" className="underline hover:text-rtyellow-200 transition-colors">
                                            Where to find my peak power demand?
                                        </a>
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {steps === 5 && (
                            <motion.div
                                key={5}
                                variants={stepVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="space-y-6 flex flex-col justify-center"
                            >
                                <div>
                                    <label className="block text-base mb-1">Building Postcode</label>
                                    <input
                                        type="text"
                                        className="w-full bg-transparent border border-gray-600 rounded-lg p-3 text-rtyellow-200 placeholder-gray-400"
                                        value={postcode ?? ""}
                                        onChange={(e) => {
                                            const input = e.target.value;
                                            if (/^\d*$/.test(input)) setPostcode(input); // Only digits allowed
                                            }}
                                        placeholder="Enter your postcode (numbers only)"
                                    />
                                    {postcode && !area && (
                                        <div className="text-red-400 text-sm font-medium mt-5">
                                        Invalid postcode. Please enter a valid Malaysian postcode.
                                        </div>
                                    )}
                                    {area && (
                                        <div className="text-yellow-400 font-medium flex items-center gap-2 mt-8">
                                        <img
                                            src="/map-pin-check.svg"
                                            alt="Area Icon"
                                            className="w-8 h-8 rounded-full border border-yellow-400 p-1 bg-yellow-500"
                                        />
                                        Area in {area}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {steps === 6 && (
                            <motion.div
                                key={6}
                                variants={stepVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="flex flex-col -ml-40 w-full"
                            >
                                <label className="block text-base mb-6 text-left">Business Operational Hours</label>
                                <div className="flex gap-3 w-full">
                                    <button
                                        onClick={() => setPeakHourRatio("0800-1700")}
                                        className={cn(
                                            "flex flex-col items-center justify-center gap-3 flex-shrink-0",
                                            "w-[230px] h-[128px] rounded-xl",
                                            "transition-all duration-300 border hover:scale-105",
                                            peakHourRatio === "0800-1700"
                                                ? "border-rtyellow-200 text-black bg-rtyellow-200 shadow-[0_0_15px_rgba(252,217,19,0.35)]"
                                                : "bg-rtgray-800 border-rtgray-700 text-white"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-12 h-12 rounded-full flex items-center justify-center",
                                            "transition-all duration-300",
                                            peakHourRatio === "0800-1700" 
                                                ? "bg-rtorange-300" 
                                                : "bg-rtgray-700"
                                        )}>
                                            <img 
                                                src="/quoteform/sun.svg" 
                                                alt="Standard Business" 
                                                className={cn(
                                                    "w-6 h-6 transition-all duration-300",
                                                    peakHourRatio === "0800-1700" 
                                                        ? "filter brightness-0" 
                                                        : ""
                                                )} 
                                            />
                                        </div>
                                        <div className="text-center">
                                            <div className="text-sm">0800 - 1700</div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => setPeakHourRatio("0800-2200")}
                                        className={cn(
                                            "flex flex-col items-center justify-center gap-3 flex-shrink-0",
                                            "w-[230px] h-[128px] rounded-xl",
                                            "transition-all duration-300 border hover:scale-105",
                                            peakHourRatio === "0800-2200"
                                                ? "border-rtyellow-200 text-black bg-rtyellow-200 shadow-[0_0_15px_rgba(252,217,19,0.35)]"
                                                : "bg-rtgray-800 border-rtgray-700 text-white"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-12 h-12 rounded-full flex items-center justify-center",
                                            "transition-all duration-300",
                                            peakHourRatio === "0800-2200" 
                                                ? "bg-rtorange-300" 
                                                : "bg-rtgray-700"
                                        )}>
                                            <img 
                                                src="/quoteform/sunset.svg" 
                                                alt="Daytime Operation" 
                                                className={cn(
                                                    "w-6 h-6 transition-all duration-300",
                                                    peakHourRatio === "0800-2200" 
                                                        ? "filter brightness-0" 
                                                        : ""
                                                )} 
                                            />
                                        </div>
                                        <div className="text-center">
                                            <div className="text-sm">0800 - 2200</div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => setPeakHourRatio("24-hours")}
                                        className={cn(
                                            "flex flex-col items-center justify-center gap-3 flex-shrink-0",
                                            "w-[230px] h-[128px] rounded-xl",
                                            "transition-all duration-300 border hover:scale-105",
                                            peakHourRatio === "24-hours"
                                                ? "border-rtyellow-200 text-black bg-rtyellow-200 shadow-[0_0_15px_rgba(252,217,19,0.35)]"
                                                : "bg-rtgray-800 border-rtgray-700 text-white"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-12 h-12 rounded-full flex items-center justify-center",
                                            "transition-all duration-300",
                                            peakHourRatio === "24-hours" 
                                                ? "bg-rtorange-300" 
                                                : "bg-rtgray-700"
                                        )}>
                                            <img 
                                                src="/quoteform/moon-star.svg" 
                                                alt="24 Hours" 
                                                className={cn(
                                                    "w-6 h-6 transition-all duration-300",
                                                    peakHourRatio === "24-hours" 
                                                        ? "filter brightness-0" 
                                                        : ""
                                                )} 
                                            />
                                        </div>
                                        <div className="text-center">
                                            <div className="text-sm">24 Hours</div>
                                        </div>
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {steps === 7 && (
                            <motion.div
                                key={7}
                                variants={stepVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="space-y-6 flex flex-col justify-center items-center w-[600px] -ml-25"
                                style={{ backgroundColor: 'transparent', border: 'none' }}
                            >
                                <h2 className="text-2xl font-bold mb-6">Check your details</h2>
                                <div className="rounded-lg p-6 w-full space-y-4">
                                    <div className="flex flex-col items-start justify-between">
                                        <span className="text-lg mb-1" style={{ fontSize: '14px', color: 'rtgray-300' }}>Monthly electricity bill</span>
                                        <div className="flex justify-between items-center w-full">
                                            <span className="text-rtwhite font-medium" style={{ fontSize: '20px' }}>{monthlyElectricBill?.toFixed(2)}</span>
                                            <div className="rounded-[1000px] overflow-hidden" style={{ width: '100px', height: '46px' }}>
                                                <button
                                                    onClick={() => handleEdit(1)}
                                                    className="text-sm text-gray-400 hover:text-white focus:outline-none"
                                                    style={{
                                                        borderRadius: '1000px',
                                                        border: '1px solid rgba(156, 163, 175, 0.5)',
                                                        width: '100%',
                                                        height: '100%',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start justify-between">
                                        <span className="text-lg mb-1" style={{ fontSize: '14px', color: 'rtgray-300' }}>Your building type</span>
                                        <div className="flex justify-between items-center w-full">
                                            <span className="text-white" style={{ fontSize: '20px' }}>{buildingType}</span>
                                            <div className="rounded-[1000px] overflow-hidden" style={{ width: '100px', height: '46px' }}>
                                                <button
                                                    onClick={() => handleEdit(2)}
                                                    className="text-sm text-gray-400 hover:text-white focus:outline-none"
                                                    style={{
                                                        borderRadius: '1000px',
                                                        border: '1px solid rgba(156, 163, 175, 0.5)',
                                                        width: '100%',
                                                        height: '100%',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start justify-between">
                                        <span className="text-lg mb-1" style={{ fontSize: '14px', color: 'rtgray-300' }}>Your tariff</span>
                                        <div className="flex justify-between items-center w-full">
                                            <span className="text-white" style={{ fontSize: '20px' }}>{tariff}</span>
                                            <div className="rounded-[1000px] overflow-hidden" style={{ width: '100px', height: '46px' }}>
                                                <button
                                                    onClick={() => handleEdit(3)}
                                                    className="text-sm text-gray-400 hover:text-white focus:outline-none"
                                                    style={{
                                                        borderRadius: '1000px',
                                                        border: '1px solid rgba(156, 163, 175, 0.5)',
                                                        width: '100%',
                                                        height: '100%',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start justify-between">
                                        <span className="text-lg mb-1" style={{ fontSize: '14px', color: 'rtgray-300' }}>Peak hour demand</span>
                                        <div className="flex justify-between items-center w-full">
                                            <span className="text-white" style={{ fontSize: '20px' }}>{peakPowerDemand} kW</span>
                                            <div className="rounded-[1000px] overflow-hidden" style={{ width: '100px', height: '46px' }}>
                                                <button
                                                    onClick={() => handleEdit(4)}
                                                    className="text-sm text-gray-400 hover:text-white focus:outline-none"
                                                    style={{
                                                        borderRadius: '1000px',
                                                        border: '1px solid rgba(156, 163, 175, 0.5)',
                                                        width: '100%',
                                                        height: '100%',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start justify-between">
                                        <span className="text-lg mb-1" style={{ fontSize: '14px', color: 'rtgray-300' }}>Building postcode</span>
                                        <div className="flex justify-between items-center w-full">
                                            <span className="text-white" style={{ fontSize: '20px' }}>{postcode}</span>
                                            <div className="rounded-[1000px] overflow-hidden" style={{ width: '100px', height: '46px' }}>
                                                <button
                                                    onClick={() => handleEdit(5)}
                                                    className="text-sm text-gray-400 hover:text-white focus:outline-none"
                                                    style={{
                                                        borderRadius: '1000px',
                                                        border: '1px solid rgba(156, 163, 175, 0.5)',
                                                        width: '100%',
                                                        height: '100%',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start justify-between">
                                        <span className="text-lg mb-1" style={{ fontSize: '14px', color: 'rtgray-300' }}>Business operational hours</span>
                                        <div className="flex justify-between items-center w-full">
                                            <span className="text-white" style={{ fontSize: '20px' }}>{peakHourRatio}</span>
                                            <div className="rounded-[1000px] overflow-hidden" style={{ width: '100px', height: '46px' }}>
                                                <button
                                                    onClick={() => handleEdit(6)}
                                                    className="text-sm text-gray-400 hover:text-white focus:outline-none"
                                                    style={{
                                                        borderRadius: '1000px',
                                                        border: '1px solid rgba(156, 163, 175, 0.5)',
                                                        width: '100%',
                                                        height: '100%',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                <div className="w-full max-w-[1200px] flex justify-between mt-8">
                    <button
                        className={backButtonClasses}
                        onClick={handleBack}
                        onMouseEnter={() => setIsBackButtonHovered(true)}
                        onMouseLeave={() => setIsBackButtonHovered(false)}
                        disabled={steps === 1 && !isEditing}
                    >
                        {isEditing ? 'Cancel' : '← Back'}
                    </button>
                    
                    {steps < 6 ? (
                        <button
                            className={nextButtonClasses}
                            onClick={handleNext}
                            disabled={nextDisabled}
                            onMouseEnter={() => !nextDisabled && setIsNextButtonHovered(true)}
                            onMouseLeave={() => setIsNextButtonHovered(false)}
                        >
                            {isEditing ? 'Confirm' : 'Next →'}
                        </button>
                    ) : steps === 6 ? (
                        <button
                            className={nextButtonClasses}
                            onClick={handleNext}
                            disabled={nextDisabled}
                            onMouseEnter={() => !nextDisabled && setIsNextButtonHovered(true)}
                            onMouseLeave={() => setIsNextButtonHovered(false)}
                        >
                            {isEditing ? 'Confirm' : 'View Quote →'}
                        </button>
                    ) : (
                        <Link href="/quotesummary">
                        <button
                            className={getQuoteButtonClasses}
                            onClick={handleGetQuote}
                            disabled={isSubmitting}
                            onMouseEnter={() => !isSubmitting && setIsNextButtonHovered(true)}
                            onMouseLeave={() => setIsNextButtonHovered(false)}
                        >
                            {isSubmitting ? "Submitting..." : "Get my quote"}
                        </button>
                        </Link>
                    )}
                </div>
            </div>
            <div className="w-full">
                <Footer />
            </div>
        </div>
    );
};

export default CalculatePage;