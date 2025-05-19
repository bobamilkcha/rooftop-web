"use client";

import { usePowerDirectSTore } from "@/store/usePowerDirectStore";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { FaSolarPanel } from "react-icons/fa";

const DirectEstimate = () => {
    const router = useRouter()
    const [nextDisabled, setNextDisabled] = useState<boolean>(true)
    const [step, setStep] = useState(1)
    const { preference, setPreference, dayUsage, setDayUsage } = usePowerDirectSTore()
    const [activeTab, setActiveTab] = useState("Monthly")

    const handleNext = () => {
        if (step < 4) {
            setNextDisabled(true)
            setStep(step + 1)
        } else if (step == 4) {
            router.push('/estimatedquote')
        }
    }
  
    const handleBack = () => {
        if (step > 1) setStep(step - 1)
    }

    useEffect(() => {
        // console.log(step, preference, dayUsage)
        if (step === 1 && preference !== "") {
            setNextDisabled(false)
        } else if (step === 2 && dayUsage !== "") {
            setNextDisabled(false)
        }
    }, [step, dayUsage, preference])
    

    return (
    <>
    <div className="flex flex-col text-white">
        {/* Progress Bar */}
        <div className="bg-rtgray-800 h-14  border-b-3 border-rtyellow-200">
            <div className='flex max-w-md w-full justify-between  px-6 m-auto h-full items-center'>
                <span className={`text-rtgray-300`} onClick={()=>router.push('/direct')}>Power Direct</span>
                <div className={`text-rtyellow-200`} > Your Estimate </div>
            </div>
        </div>

        {step === 1 && (
        <div className="w-full max-w-md h-full m-auto pt-8 px-4">
            <div className='text-rtyellow-200'>
                <div className="text-2xl font-bold mb-2">To get an accurate estimate</div>
            </div>
            
            <div className={`mt-12 text-sm text-rtgray-300`}>Battery energy storage system (BESS)</div>
            
            

            <div onClick={()=>setPreference("choose-for-me")} className={`mt-4 p-3 py-5 border rounded-sm cursor-pointer transition-all duration-300 ${preference == "choose-for-me" ? "border-rtyellow-200 text-rtyellow-200 bg-rtgray-900 shadow-[0_0_8px_rgba(252,217,19,100)]": "bg-rtgray-800 border-gray-600 text-gray-400"}`}>
                <div className="text-sm font-semibold mb-3">Choose for me</div>
                <div className="text-xs">Find the biggest savings with or without</div>
            </div>

            <div onClick={()=>setPreference("include")} className={`mt-4 p-3 py-5 border rounded-sm cursor-pointer transition-all duration-300  ${preference == "include" ? "border-rtyellow-200 text-rtyellow-200 bg-rtgray-900 shadow-[0_0_8px_rgba(252,217,19,100)]": "bg-rtgray-800 border-gray-600 text-gray-400"}`}>
                <div className="text-sm font-semibold mb-3">Include</div>
                <div className="text-xs">Achieve energy independence</div>
            </div>

            <div onClick={()=>setPreference("exclude")} className={`mt-4 p-3 py-5 border rounded-sm cursor-pointer transition-all duration-300  ${preference == "exclude" ? "border-rtyellow-200 text-rtyellow-200 bg-rtgray-900 shadow-[0_0_8px_rgba(252,217,19,100)]": "bg-rtgray-800 border-gray-600 text-gray-400"}`}>
                <div className="text-sm font-semibold mb-3">Exclude</div>
                <div className="text-xs">Suggested for businesses operating in the day</div>
            </div>

            <div className="text-center w-full max-w-md text-sm self-center text-gray-400 m-0 mt-10 my-auto">
                <a href="#" className="underline">Do I need a BESS?</a>
            </div> 
        </div>
        )}

        {step === 2 && (
        <div className="w-full max-w-md h-full m-auto pt-8 px-4">
            <div className='text-rtyellow-200'>
                <div className="text-2xl font-bold mb-2">To get an accurate estimate</div>
            </div>
            
            <div className={`mt-12 text-sm text-rtgray-300`}>Business energy usage</div>

            <div onClick={()=>setDayUsage("day")} className={`mt-4 p-3 py-5 border rounded-sm cursor-pointer transition-all duration-300 ${dayUsage == "day" ? "border-rtyellow-200 text-rtyellow-200 bg-rtgray-900 shadow-[0_0_8px_rgba(252,217,19,100)]": "bg-rtgray-800 border-gray-600 text-gray-400"}`}>
                <div className="text-sm font-semibold mb-3">Day</div>
                <div className="text-xs">what time</div>
            </div>

            <div onClick={()=>setDayUsage("day-night")} className={`mt-4 p-3 py-5 border rounded-sm cursor-pointer transition-all duration-300 ${dayUsage == "day-night" ? "border-rtyellow-200 text-rtyellow-200 bg-rtgray-900 shadow-[0_0_8px_rgba(252,217,19,100)]": "bg-rtgray-800 border-gray-600 text-gray-400"}`}>
                <div className="text-sm font-semibold mb-3">Day and night</div>
                <div className="text-xs">what time roughly</div>
            </div>

            <div onClick={()=>setDayUsage("24-hour")} className={`mt-4 p-3 py-5 border rounded-sm cursor-pointer transition-all duration-300 ${dayUsage == "24-hour" ? "border-rtyellow-200 text-rtyellow-200 bg-rtgray-900 shadow-[0_0_8px_rgba(252,217,19,100)]": "bg-rtgray-800 border-gray-600 text-gray-400"}`}>
                <div className="text-sm font-semibold mb-3">24 hours</div>
                <div className="text-xs">fill this later</div>
            </div>

        </div>
        )}

        {step === 3 && (
        <div className="w-full max-w-md h-full m-auto pt-8 px-4">
            <div className='text-rtyellow-200'>
                <div className="text-2xl font-bold mb-2">Your refined estimate</div>
            </div>
            
            <div className="w-full flex justify-center my-8 mx-auto">
                <div className="inline-flex p-1 bg-rtgray-900 rounded-full border border-rtgray-700 w-100 justify-between">
                    {["Monthly", "Yearly", "20 years"].map((tab) => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-1 rounded-full text-sm font-medium w-full ${ activeTab === tab ? "bg-rtgray-50 text-black shadow" : "text-rtgray-50 hover:bg-gray-700/30" } `} >
                        {tab}
                        </button>
                    ))}
                </div>


            </div>

            <div className="flex items-end gap-4 my-8">
                <div className="text-2xl font-bold"><span className="text-base font-light">RM </span>1,600 <span className="text-base font-light ml-2">/month</span></div>
                <div className="text-rtyellow-200 font-semibold text-2xl ml-4">-33% <span className="text-rtgray-300 line-through text-base font-light ml-4">RM 2,400</span></div>
            </div>


            {/* Stats Section */}
            <div className="space-y-2">
                {/* 1st Stat */}
                <div className="flex justify-between items-center bg-rtgray-1000 p-3 pt-1 rounded-lg h-16">
                    <div className="flex gap-4">
                        <div className="text-2xl font-bold">24</div>
                        <div className="text-xs text-gray-400">remote solar panels</div>
                    </div>
                    <FaSolarPanel className="text-3xl text-yellow-500" />
                </div>

                {/* 2nd Stat */}
                <div className="flex justify-between items-center bg-rtgray-1000 p-3 pt-1 rounded-lg h-16">
                    <div className="flex gap-4">
                        <div className="text-2xl font-bold">-50k</div>
                        <div className="text-xs text-gray-400">tonne CO₂/year</div>
                    </div>
                    <FaSolarPanel className="text-3xl text-yellow-500" />
                </div>


                {/* 3rd Stat */}
                <div className="flex justify-between items-center bg-rtgray-1000 p-3 pt-1 rounded-lg h-16">
                    <div className="flex gap-4">
                        <div className="text-2xl font-bold">5</div>
                        <div className="text-xs text-gray-400">year contract with flexible exit</div>
                    </div>
                    <FaSolarPanel className="text-3xl text-yellow-500" />
                </div>
            </div>

            {/* Energy Usage Distribution */}
            <div>
                <div className="text-sm text-rtgray-200 mb-4 mt-10">Energy usage distribution</div>
                <div className="w-full h-8 bg-rtgray-1000 rounded-md flex items-center">
                    <div className="bg-rtorange-200 h-full rounded-l-md w-3/5 flex items-center justify-start pl-4 text-xs text-rtgray-900 font-bold">
                        Power remote
                    </div>
                    <div className="flex-grow h-full flex items-center justify-end pr-4 text-xs">TNB</div>
                </div>
                <div className="flex justify-between text-sm text-gray-400 mt-4">
                    <span className="text-rtyellow-200">30 sen/kWh</span>
                    <span className="text-rtgray-200">50 sen/kWh</span>
                </div>
            </div>
        </div>
        )}

    </div>

    {step !== 3 && (
    <div className="w-full px-4 pb-6 mt-auto justify-items-center">
        <button onClick={handleNext} disabled={nextDisabled} className={`w-full max-w-md p-3 text-md font-medium rounded-md flex items-center justify-center ${!nextDisabled ? "bg-rtyellow-200 text-black hover:bg-rtyellow-200 transform hover:scale-105 cursor-pointer duration-300" : "bg-gray-600 cursor-not-allowed"} `} >
            {step === 2 ? "Refine my quote" : "Next"} →
        </button>
        <button onClick={handleBack} disabled={step===1} className={`w-full max-w-md mt-3 p-3 text-md font-medium rounded-md flex items-center justify-center cursor-pointer duration-300`} >
            ← Back 
        </button>
    </div>
    )}
    
    {step === 3 && (
        <div className="mt-10 md:mt-auto">
            <div className="w-full border-t-2 border-rtyellow-200"></div>
            <div className="w-full max-w-md mx-auto px-4 py-6 self-center flex justify-between gap-4 ">
                <button className="flex-1 border border-white py-2 rounded-lg flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V8a2 2 0 012-2h2m8 0h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m-4 4v-4m0 0H9m3 0h3" />
                </svg>
                Print
                </button>
                <button className="flex-1 bg-rtyellow-200 text-black py-2 rounded-lg flex items-center justify-center gap-2 font-bold">
                Contact us
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                </button>
            </div>
        </div>
    )}

    </>
    )
}

export default DirectEstimate