"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useElectricBillStore } from "@/store/useElectricBillStore";
import axios from "axios";

const QuoteInput = () => {
    const router = useRouter()
    const [bill, setBill] = useState("")
    const {setMonthlyElectricBill, setAddress, setBuildingType, setPeakHourRatio, setPeakPowerDemand, setTariff } = useElectricBillStore()
    
    const handleSubmit = () => {
        if (file) {
            handleSubmitPDF()
        } else {
            const parsedBill = parseFloat(bill)
            if (!isNaN(parsedBill)) {
                setMonthlyElectricBill(parsedBill)
                router.push("/calculate")
            }
        }
    }

    const [file, setFile] = useState<File | null>(null)
    const [extractedData, setExtractedData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setFile(e.target.files[0])
      }
    }
  
  
    const handleSubmitPDF = async () => {
        if (!file) return

        setIsLoading(true)
        
        try {
            const formData = new FormData()
            formData.append('pdf', file)

            const response = await axios.post('/api/extract-pdf', formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                }
            })

            if (response.status) {
                setExtractedData(response.data.data)
                setAddress(response.data.data["address"])
                setTariff(response.data.data["tariff_category"])
                setBuildingType(response.data.data["building_type"])
                setMonthlyElectricBill(response.data.data["monthly_bills"])
                setPeakPowerDemand(response.data.data["peak_power_demand"])
                router.push('/confirmation')
            } else {
                setError(response.data.error || 'Failed to extract data')
            }
        } catch (err) {
            setError('Failed to upload PDF')
        } finally {
            setIsLoading(false)
        }
    }
    

    return (
        <section className="relative px-8 pt-6 md:pt-2 text-start my-14 md:my-6">
            <div className="text-4xl md:text-[111px] font-medium md:font-semibold w-full">
                Democratizing 
            </div>
            <div className="text-4xl md:text-[111px] font-medium md:font-semibold w-full mb-5 md:mb-10">
                Solar Energy
            </div>
            <p className="text-base leading-5 md:text-2xl font-extralight">Making solar accessible to all Malaysian businesses.</p>

            <div className="mt-10 md:mt-16 p-6 md:p-16 flex flex-col gap-2 md:gap-6 lg:gap-10 rounded-2xl shadow-lg bg-[rgba(0,0,0,0.4)] backdrop-blur-3xl border border-gray-200/40 sm:max-w-lg md:max-w-2xl 2xl:max-w-5xl mx-auto">
                
                <div className="flex flex-row justify-between mb-4 gap-2">
                    <div className="text-lg font-semibold text-white">Estimate your quote</div>
                    <div className="self-center">
                        <div className="flex gap-1">
                            <div className="w-4 h-1 bg-[#FCD913]"></div>
                            <div className="w-4 h-1 bg-gray-500"></div>
                            <div className="w-4 h-1 bg-gray-500"></div>
                            <div className="w-4 h-1 bg-gray-500"></div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <p className="text-sm">Monthly electricity bill</p>
                    <input 
                        type="number" 
                        placeholder="RM" 
                        value={bill}
                        onChange={(e) => setBill(e.target.value)}
                        className="w-full p-2 mt-2 bg-gray-800/40 text-white border border-gray-700 rounded-md focus:ring-1 focus:ring-[#FCD913]"
                    />
                </div>
                <div className="text-center text-base my-1">or</div>

                <div className="mb-4">
                    <label htmlFor="file-upload" className="flex justify-center gap-2 mb-2 font-medium cursor-pointer text-white py-2 px-4 rounded text-center border border-dashed">
                        <img src="upload.svg" alt=""/>Upload TNB Bill
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        required
                    />
                </div>


                <button onClick={handleSubmit} className="w-full mt-4 bg-[#FCD913] text-black p-2 rounded-md font-medium hover:bg-[#FCD913] transition transform hover:scale-105 cursor-pointer duration-300">
                    Calculate now →
                </button>
            </div>
        </section>
    )
}

export default QuoteInput