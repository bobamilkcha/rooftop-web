"use client";

import { useEffect, useState } from "react";
import { LuBuilding, LuFactory } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from 'framer-motion';

// Mock initial value from  src\app\initialvalue\page.tsx
const initialMonthlyBill = 100;

//  Zustand store
const useElectricBillStore = () => {
    const [steps, setSteps] = useState(1); // Start at step 1
    const [monthlyElectricBill, setMonthlyElectricBill] = useState<number | null>(initialMonthlyBill); // Use the initial value
    const [buildingType, setBuildingType] = useState<string | null>(null);
    const [tariff, setTariff] = useState<string | null>(null);
    const [peakPowerDemand, setPeakPowerDemand] = useState<number | null>(null);
    const [peakHourRatio, setPeakHourRatio] = useState<string | null>(null);
    const [postcode, setPostcode] = useState<string | null>(null);

    const [quote, setQuote] = useState<any | null>(null); // Add quote state
    const [isSubmitting, setIsSubmitting] = useState(false);

    const calculateQuote = () => {
        setIsSubmitting(true); // Start submission process
        // Mock calculation - replace with your actual logic
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
        setMonthlyElectricBill(initialMonthlyBill); // Reset to initial value
        setBuildingType(null);
        setTariff(null);
        setPeakPowerDemand(null);
        setPeakHourRatio(null);
        setPostcode(null);
        setQuote(null);
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

const INDUSTRIAL_TARIFF = ["Tariff D", "Tariff E1", "Tariff E2", "Tariff E3"];
const COMMERCIAL_TARIFF = ["Tariff B", "Tariff C1", "Tariff C2", "Tariff C3", "Tariff C4"];

// Animation Variants
const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
};

const CalculatePage = () => {
    const router = useRouter();
    const [nextDisabled, setNextDisabled] = useState<boolean>(true);
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
        postcode,
        setPostcode,
        calculateQuote,
        quote,
        isSubmitting,
        reset
    } = useElectricBillStore();
    const [isNextButtonHovered, setIsNextButtonHovered] = useState(false);
    const [isBackButtonHovered, setIsBackButtonHovered] = useState(false);
    const [inputValue, setInputValue] = useState<string>(monthlyElectricBill?.toString() || ''); // Local state for input

    // Utility function for combining class names (simplified)
    const cn = (...classes: (string | boolean | undefined | null)[]): string => {
        return classes.filter(Boolean).join(' ');
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value); // Update local input state
        const numericValue = parseFloat(value);
        setMonthlyElectricBill(isNaN(numericValue) ? null : numericValue); // Update Zustand state
    };

    const handleNext = () => {
        if (steps < 6) {
            setSteps(steps + 1);
        } else if (steps === 6) {
            calculateQuote(); // Calculate before navigating
            setSteps(7); // Manually set step to 7 to show quote.
        }
    };

    const handleBack = () => {
        if (steps > 1) setSteps(steps - 1); // Prevent going back before the first step
    };

    useEffect(() => {
        if (steps === 1 && monthlyElectricBill !== null && monthlyElectricBill > 0) {
            setNextDisabled(false);
        }
        else if (steps === 2 && buildingType) {
            setNextDisabled(false);
        } else if (steps === 3 && tariff) {
            setNextDisabled(false);
        } else if (steps === 4 && peakPowerDemand !== null && peakPowerDemand > 0) {
            setNextDisabled(false);
        } else if (steps === 5 && postcode) { // Postcode validation
            setNextDisabled(false);
        } else if (steps === 6 && peakHourRatio) {
            setNextDisabled(false);
        } else {
            setNextDisabled(true);
        }
    }, [steps, buildingType, tariff, peakPowerDemand, peakHourRatio, postcode, router, monthlyElectricBill]);

    useEffect(() => {
        // Update local input state when monthlyElectricBill changes in Zustand
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

    const backButtonClasses = `bg-transparent border border-[#6B7280] text-white font-medium py-3 px-6 rounded-full focus:outline-none focus:shadow-outline w-[240px] h-[48px] ${
        isBackButtonHovered ? 'bg-rtwhite text-rtgray-900 cursor-pointer border-rtwhite' : ''
        }`;

    const submitButtonClasses = `font-medium py-3 px-6 rounded-full focus:outline-none focus:shadow-outline w-[240px] h-[48px] ${
        isSubmitting
            ? 'opacity-50 cursor-not-allowed bg-gray-500 text-white'
            : 'bg-[#4CAF50] text-white hover:bg-[#45a049] cursor-pointer'
        }`;

    useEffect(() => {
        if (quote) {
            console.log("Calculated Quote:", quote);
        }
    }, [quote]);

    return (
        <div className="min-h-screen bg-rtgray-900 text-white flex flex-col items-center font-exo2">
            <div className="pt-20 pb-16 px-8 md:px-32 lg:px-48 flex flex-col items-center flex-grow w-full">
                {/* Progress Bar */}
                <div className="w-full max-w-[1200px] mb-8">
                    <h2 className="text-lg text-gray-400 mb-2">Estimate your quote</h2>
                    <div className="bg-[#28282B] rounded-full h-2 overflow-hidden w-full">
                        <div className={cn(
                            "h-full rounded-full",
                            steps === 1 ? "w-1/5 bg-[#FFDA63]" :
                            steps === 2 ? "w-2/5 bg-[#FFDA63]" :
                                steps === 3 ? "w-3/5 bg-[#FFDA63]" :
                                    steps === 4 ? "w-4/5 bg-[#FFDA63]" :
                                        steps === 5 ? "w-full bg-[#FFDA63]" :
                                            "w-0"
                        )}></div>
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
                                className="space-y-6 flex flex-col justify-center"
                            >
                                <h2 className="text-lg">Your building type</h2>
                                <div className="flex gap-[12px] flex-col sm:flex-row">
                                    <button
                                        onClick={() => setBuildingType("Commercial")}
                                        className={cn(
                                            "flex flex-col items-center gap-3 w-full sm:w-[400px] h-[146px]",
                                            "rounded-2xl transition-all duration-300",
                                            "bg-rtgray-800 border-rtgray-600 text-rtgray-400",
                                            buildingType === "Commercial" &&
                                            "border-rtyellow-200 text-rtyellow-200 bg-rtgray-900 shadow-[0_0_15px_rgba(252,217,19,100)]"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "w-14 h-14 rounded-full flex items-center justify-center",
                                                buildingType === "Commercial" ? "bg-rtgray-800" : "bg-rtgray-700"
                                            )}
                                        >
                                            <LuBuilding />
                                        </div>
                                        <span className="text-lg">Commercial</span>
                                    </button>

                                    <button
                                        onClick={() => setBuildingType("Industrial")}
                                        className={cn(
                                            "flex flex-col items-center gap-3 w-full sm:w-[400px] h-[146px]",
                                            "rounded-2xl transition-all duration-300",
                                            "bg-rtgray-800 border-rtgray-600 text-rtgray-400",
                                            buildingType === "Industrial" &&
                                            "border-rtyellow-200 text-rtyellow-200 bg-rtgray-900 shadow-[0_0_15px_rgba(252,217,19,100)]"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "w-14 h-14 rounded-full flex items-center justify-center",
                                                buildingType === "Industrial" ? "bg-rtgray-800" : "bg-rtgray-700"
                                            )}
                                        >
                                            <LuFactory />
                                        </div>
                                        <span className="text-lg">Industrial</span>
                                    </button>
                                </div>

                                <p className="text-sm text-gray-400">
                                    <a href="#" className="underline">
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
                                className="space-y-6 flex flex-col justify-center"
                            >
                                <h2 className="text-lg">Your Tariff</h2>
                                <div className="max-h-90 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-rtgray-500 scrollbar-track-rtgray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-w-1 m-0 p-2">
                                    {buildingType === "Industrial"
                                        ? INDUSTRIAL_TARIFF.map((tar, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setTariff(tar)}
                                                className={cn(
                                                    "flex flex-row gap-3 w-full rounded-lg p-4 cursor-pointer",
                                                    "bg-rtgray-800 border-gray-600 text-rtgray-300",
                                                    tariff === tar &&
                                                    "border-rtyellow-200 text-rtyellow-200 bg-rtgray-900 shadow-[0_0_8px_rgba(252,217,19,100)]"
                                                )}
                                            >
                                                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-rtgray-700">
                                                    <img src="B.svg" alt="" />
                                                </div>
                                                <span className="items-center flex">{tar}</span>
                                            </button>
                                        ))
                                        : COMMERCIAL_TARIFF.map((tar, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setTariff(tar)}
                                                className={cn(
                                                    "flex flex-row gap-3 w-full rounded-lg p-4 cursor-pointer",
                                                    "bg-rtgray-800 border-gray-600 text-rtgray-300",
                                                    tariff === tar &&
                                                    "border-rtyellow-200 text-rtyellow-200 bg-rtgray-900 shadow-[0_0_8px_rgba(252,217,19,100)]"
                                                )}
                                            >
                                                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-rtgray-700">
                                                    <img src="B.svg" alt="" />
                                                </div>
                                                <span className="items-center flex">{tar}</span>
                                            </button>
                                        ))}
                                </div>
                                <p className="text-center text-sm text-gray-400">
                                    <a href="#" className="underline">
                                        Where to find my tariff?
                                    </a>
                                </p>
                                <p className="text-center text-sm text-gray-400">
                                    <a href="#" className="underline">
                                        I don't know for now, use an average
                                    </a>
                                </p>
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
                                    <label className="block text-base mb-1">Peak power demand</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            className="w-full bg-transparent border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 pr-10"
                                            value={peakPowerDemand ?? ""}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setPeakPowerDemand(value === "" ? null : Number(value));
                                            }}
                                            placeholder="Enter peak power demand in kW"
                                        />
                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            kW
                                        </span>
                                    </div>
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
                                        className="w-full bg-transparent border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400"
                                        value={postcode ?? ""}
                                        onChange={(e) => setPostcode(e.target.value)}
                                        placeholder="Enter your postcode (numbers only)"
                                    />
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
                                className="space-y-6 flex flex-col justify-center"
                            >
                                <div>
                                    <label className="block text-base mb-1">Business Operational Hours</label>
                                    <select
                                        className="w-full bg-rtgray-800 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-rtyellow-200 focus:outline-none appearance-none"
                                        value={peakHourRatio ?? ""}
                                        onChange={(e) => setPeakHourRatio(e.target.value)}
                                    >
                                        <option value="">Select operational hours</option>
                                        <option value="0800-2200">0800 - 2200</option>
                                        <option value="0800-1700">0800 - 1700</option>
                                        <option value="24-hours">24 hours</option>
                                    </select>
                                </div>
                            </motion.div>
                        )}
                        {steps === 7 && quote && (
                            <motion.div
                                key={7}
                                variants={stepVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="space-y-6 flex flex-col justify-center items-center"
                            >
                                <h2 className="text-2xl font-bold mb-6">Check your details</h2>
                                <div className="bg-rtgray-800 rounded-lg p-6 border border-gray-600 shadow-md w-full max-w-[400px] space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg">Monthly electricity bill</span>
                                        <span className="text-rtyellow-200 font-medium">RM {monthlyElectricBill?.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg">Your building type</span>
                                        <span className="text-white">{buildingType}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg">Your tariff</span>
                                        <span className="text-white">{tariff}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg">Peak hour demand</span>
                                        <span className="text-white">{peakPowerDemand} kW</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg">Building postcode</span>
                                        <span className="text-white">{postcode}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg">Business operational hours</span>
                                        <span className="text-white">{peakHourRatio}</span>
                                    </div>
                                </div>
                                <button
                                    className={submitButtonClasses}
                                    onClick={() => {
                                        reset();
                                    }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Submitting..." : "Get my quote"}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Navigation Buttons aligned with Progress Bar */}
                <div className="w-full max-w-[1200px] flex justify-between mt-8">
                    <button
                        className={backButtonClasses}
                        onClick={handleBack}
                        onMouseEnter={() => setIsBackButtonHovered(true)}
                        onMouseLeave={() => setIsBackButtonHovered(false)}
                        disabled={steps === 1}
                    >
                        ← Back
                    </button>
                    <button
                        className={nextButtonClasses}
                        onClick={handleNext}
                        disabled={nextDisabled}
                        onMouseEnter={() => !nextDisabled && setIsNextButtonHovered(true)}
                        onMouseLeave={() => setIsNextButtonHovered(false)}
                    >
                        {steps === 6 ? "View Quote" : "Next"} →
                    </button>
                </div>
            </div>
            <div className="w-full">
                
            </div>
        </div>
    );
};

export default CalculatePage;