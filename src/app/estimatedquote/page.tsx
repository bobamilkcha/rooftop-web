"use client";
import { useState } from "react";
import Header from "../components/layouts/Header";
import { FaSun, FaPencilAlt, FaRedo } from "react-icons/fa"; // Import icons
import { FiRotateCcw } from "react-icons/fi";

const EstimatedQuotePage = () => {
    const [activeTab, setActiveTab] = useState("Monthly")

    return (
        <main className="bg-rtgray-900 min-h-screen font-exo2 pb-10">
            <Header />
            <div className=" text-rtyellow-200">
                <div className="bg-rtgray-800 w-full h-14 flex items-center px-6 font-semibold text-[#19px]">Your estimated quote</div>

                {/* Billing Period Options */}
                <div className="w-full flex justify-center my-8 mx-auto">
                    <div className="inline-flex p-1 bg-rtgray-900 rounded-full border border-rtgray-700 w-96 justify-between">
                        {["Monthly", "Yearly", "20 years"].map((tab) => (
                            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-full text-sm font-medium w-full ${ activeTab === tab ? "bg-rtgray-50 text-black shadow" : "text-rtgray-50 hover:bg-gray-700/30" } `} >
                            {tab}
                            </button>
                        ))}
                    </div>
                </div>
                    
                <div className="px-3">
                    <div className="w-full justify-self-center max-w-4xl mt-6 overflow-x-auto scrollbar-thin scrollbar-thumb-rtgray-500 scrollbar-track-rtgray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-w-1 pb-2 md:pb-4">
                        <div className="flex space-x-2">
                            <div className="flex-shrink-0 w-90 rounded-lg flex flex-col justify-start items-start text-white border border-gray-400 p-4">
                                <h3 className="text-xl font-semibold mb-4 text-rtgray-300">Current Spending</h3>

                                <div className="my-4 w-full flex justify-center">
                                    <img src={`/CurrentSpending.png`} alt={"Current Spending"} className="w-80 object-contain" />
                                </div>

                                <p className="text-xl font-medium text-white">57,600 <span className="text-sm text-rtgray-400">kWh/year</span></p>
                                <p className="text-sm font-medium text-rtgray-400 mt-2">Commercial | C1 Medium Voltage</p>

                                <div className="text-center w-full mt-9">
                                    <div className="text-2xl font-bold"><span className="text-base font-medium mr-2">RM</span>2,400</div>
                                </div>
                            </div>

                            <div className="flex-shrink-0 w-90 rounded-lg h-full flex flex-col justify-start items-start text-white border border-gray-400 p-4">
                                <h3 className="text-xl font-semibold mb-4 text-rtgray-300">Power Direct</h3>

                                <div className="my-4 w-full flex justify-center">
                                    <img src={`/PowerDirect.png`} alt={"Current Spending"} className="w-80 object-contain" />
                                </div>

                                <div className="flex justify-center items-center gap-2">
                                    <img src="sun.svg" alt="sun" className="w-4 h-4" />
                                    <div className="text-sm text-rtgray-300">Achieve energy independance and security</div>
                                </div>
                                <div className="flex justify-center items-center gap-2">
                                    <img src="sun.svg" alt="sun" className="w-4 h-4" />
                                    <div className="text-sm text-rtgray-300">Zero upfront cost</div>
                                </div>
                                <div className={`text-center w-full mt-9`}>
                                    <h3 className="text-xl font-bold">RM 1,600</h3>
                                    <p className="text-gray-400 text-sm">
                                        <span className="line-through">RM 2,400</span>{" "}
                                        <span className="text-rtyellow-200 font-bold">-33%</span>
                                    </p>
                                </div>
                                <button className="mt-5 w-full py-2 bg-rtyellow-200 text-black rounded-lg">
                                    Get detailed quote now
                                </button>
                            </div>

                            <div className="flex-shrink-0 w-90 rounded-lg h-full flex flex-col justify-start items-start text-white border border-gray-400 p-4">
                                <h3 className="text-xl font-semibold mb-4 text-rtgray-300">Upfront purchase / loans</h3>

                                <div className="my-4 w-full flex justify-center">
                                    <img src={`/PowerDirect.png`} alt={"Current Spending"} className="w-80 object-contain" />
                                </div>

                                <div className="flex justify-center items-center gap-2">
                                    <img src="sun.svg" alt="sun" className="w-4 h-4" />
                                    <div className="text-sm text-rtgray-300">Achieve energy independance and security</div>
                                </div>
                                <div className="flex justify-center items-center gap-2">
                                    <img src="sun.svg" alt="sun" className="w-4 h-4" />
                                    <div className="text-sm text-rtgray-300">Maximum savings</div>
                                </div>
                                <div className={`text-center w-full mt-9`}>
                                    <h3 className="text-xl font-bold">RM 1,600</h3>
                                    <p className="text-gray-400 text-sm">
                                        <span className="line-through">RM 2,400</span>{" "}
                                        <span className="text-rtyellow-200 font-bold">-33%</span>
                                    </p>
                                </div>

                                <button className="mt-5 w-full py-2 bg-rtyellow-200 text-black rounded-lg">
                                    Get detailed quote now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Change details */}
                <div className="w-full mx-auto max-w-md mt-10 text-sm text-gray-400 px-6 flex justify-center items-center gap-4">
                    <a href="#">Change details</a>
                    <img src="edit.svg" alt="Quote" className="w-5 h-5" />
                </div>

                {/* Restart */}
                <div className="w-full mx-auto  max-w-md mt-6 text-sm text-gray-400 px-6 flex justify-center items-center gap-4">
                    <a href="#">Delete and restart</a>
                    <FiRotateCcw className="w-5 h-5" />
                </div>
            </div>
        </main>
    );
};

export default EstimatedQuotePage;

// Hide scrollbar for a cleaner look
const styles = `
    .no-scrollbar::-webkit-scrollbar {
        display: none;
    }
    .no-scrollbar {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }
`;
<style>{styles}</style>
