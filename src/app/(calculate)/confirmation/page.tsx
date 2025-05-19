'use client';

import { useElectricBillStore } from "@/store/useElectricBillStore"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const ConfirmationPage = () => {
    const { steps, setSteps, monthlyElectricBill, buildingType, tariff, peakPowerDemand, peakHourRatio, address, setQuote } = useElectricBillStore()
    const router = useRouter()
    const [nextDisabled, setNextDisabled] = useState<boolean>(true)

    useEffect(() => {
        if (!monthlyElectricBill && !buildingType && !tariff && !peakPowerDemand && !address) {
            return router.push("/")
        }
    }, []);

    
    useEffect(() => {
        if (buildingType && monthlyElectricBill && buildingType && tariff && peakPowerDemand && peakHourRatio && address) {
            setNextDisabled(false)
        } else {
            setNextDisabled(true) // Ensure button is disabled when any input is missing
        }
    }, [monthlyElectricBill, buildingType, tariff, peakPowerDemand, peakHourRatio, address])


    const handleEstimateQuote = async () => {
        if (nextDisabled) return; // Prevent calling API if the button is disabled
        
        const payload = {
            address: address || "", // Ensure it's a string
            "monthly-bill": monthlyElectricBill ? Math.floor(monthlyElectricBill).toString() : "0",
            "tariff-category": tariff ? tariff.split(" ")[1] : "",
            "peak-power-demand": peakPowerDemand ? peakPowerDemand.toString() : "0.00",
            "operation-hours": peakHourRatio || "",
        }
        console.log("payload", payload)

        try {
            const params = new URLSearchParams(payload)
    
            const response = await axios.get(`${process.env.FORECAST_URL}/forecast?${params}`, {
                timeout: 300000,
            })
    
            console.log("API Response:", response.data)
            setQuote(response.data)

            router.push("/request-quote")
        } catch (error) {
            console.error("Error fetching estimate:", error)
        }
    }

    return (
    <>
    <div className="flex flex-col flex-grow items-center text-white">
        {/* Progress Bar */}
        <div className="bg-rtgray-800 w-full h-14 flex items-center justify-between px-6">
            <span className="text-white">Confirmation</span>
            <div className="flex gap-2">
                <div className={`w-4 h-1 bg-[#BA8002]`}></div>
                <div className={`w-4 h-1 bg-[#BA8002]`}></div>
                <div className={`w-4 h-1 bg-[#BA8002]`}></div>
                <div className={`w-4 h-1 bg-[#BA8002]`}></div>
            </div>
        </div>
                

        <div className="w-full max-w-md space-y-4 px-6 flex flex-col h-full mt-5">
            <h1 className="text-2xl font-bold mb-6">Check Your Details</h1>

            <div className="mb-4 flex justify-between items-center">
                <div>
                    <h3 className="font-medium">Tariff Category</h3>
                    <p>{tariff || "Not found"}</p>
                </div>
                <button className="text-sm bg-rtyellow-200 text-black px-2 py-1 rounded hover:bg-[#BA8002]" onClick={()=> {
                    setSteps(3)
                    router.push("/calculate")
                }}>
                    Edit
                </button>
            </div>

            <div className="mb-4 flex justify-between items-center">
                <div>
                    <h3 className="font-medium">Building Type</h3>
                    <p>{buildingType || "Not found"}</p>
                </div>
                <button className="text-sm bg-rtyellow-200 text-black px-2 py-1 rounded hover:bg-[#BA8002]" onClick={()=> {
                    setSteps(2)
                    router.push("/calculate")
                }}>
                    Edit
                </button>
            </div>

            <div className="mb-4 flex justify-between items-center">
                <div>
                    <h3 className="font-medium">Peak Power Demand</h3>
                    <p>{peakPowerDemand ? peakPowerDemand + "kW" : "Not found"}</p>
                </div>
                <button className="text-sm bg-rtyellow-200 text-black px-2 py-1 rounded hover:bg-[#BA8002]" onClick={()=> {
                    setSteps(4)
                    router.push("/calculate")
                }}>
                    Edit
                </button>
            </div>

            <div className="mb-4 flex justify-between items-center">
                <div>
                    <h3 className="font-medium">Peak Hour Ratio</h3>
                    <p>{peakHourRatio || "Not found"}</p>
                </div>
                <button className="text-sm bg-rtyellow-200 text-black px-2 py-1 rounded hover:bg-[#BA8002]" onClick={()=> {
                    setSteps(4)
                    router.push("/calculate")
                }}>
                    Edit
                </button>
            </div>
            
            
            <div className="mb-4 flex justify-between items-center">
                <div>
                    <h3 className="font-medium">Address</h3>
                    <p>{address || "Not found"}</p>
                </div>
                <button className="text-sm bg-rtyellow-200 text-black px-2 py-1 rounded hover:bg-[#BA8002]" onClick={()=> {
                    setSteps(4)
                    router.push("/calculate")
                }}>
                    Edit
                </button>
            </div>
            
            <div className="mb-4 flex justify-between items-center">
                <div>
                    <h3 className="font-medium">Monthly Bills (RM)</h3>
                    <p>{monthlyElectricBill || "Not found"}</p>
                </div>
                {/* <button className="text-sm bg-rtyellow-200 text-black px-2 py-1 rounded hover:bg-[#BA8002]">
                    Edit
                </button> */}
            </div>
           
        </div>
    </div>
    {/* Footer - Positioned at the Bottom */}
    <div className="w-full px-6 pb-6 mt-auto justify-items-center">
        <button disabled={nextDisabled} onClick={()=>{handleEstimateQuote()}} className={`w-full max-w-md p-3 text-md font-medium rounded-md flex items-center justify-center ${nextDisabled ? "bg-gray-600 cursor-not-allowed" : "bg-rtyellow-200 text-black hover:bg-rtyellow-200 transform hover:scale-105 cursor-pointer duration-300"}`} >
            {"Estimate your quote"} →
        </button>
        <button onClick={()=> {
            setSteps(4) 
            router.push("/calculate")
        }} className={`w-full max-w-md mt-3 p-3 text-md font-medium rounded-md flex items-center justify-center cursor-pointer duration-300`} >
            ← Back 
        </button>
    </div>
    </>
    )
}

export default ConfirmationPage