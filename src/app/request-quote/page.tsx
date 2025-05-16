'use client';

import React, { useEffect, useState } from 'react'
import Header from '../components/layouts/Header'
import { useElectricBillStore } from '@/store/useElectricBillStore';
import { useRouter } from "next/navigation";
import axios from 'axios';

const RequestQoutePage = () => {
    const [nextDisabled, setNextDisabled] = useState<boolean>(false)
    const [formData, setFormData] = useState({ name: '', email: '', comments: '' })
    const [loading, setLoading] = useState(false)
    const { quote } = useElectricBillStore()
    const router = useRouter()

    useEffect(() => {
        if (!quote) {
            return router.push("/")
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const payload = {
            "name": formData.name,
            "email": formData.email,
            "comments":formData.comments,
            "result": quote
        }
        try {
            const response = await axios.post('/api/quote', payload, {
                headers: { 'Content-Type': 'application/json' }
            });
    
            alert('Quote submitted successfully!');
            // setFormData({ name: '', email: '', comments: '' });
        } catch (error: any) {
            console.error('Submission failed', error);
            alert(`Error: ${error.response?.data?.message || 'An error occurred while submitting the quote'}`);
        }

        setLoading(false);
    }

    return (
        <main className="bg-[#141624] font-exo2">
            <div className="flex flex-col text-white h-screen">
                <Header/>
                <div className="w-full max-w-md h-full m-auto flex flex-col px-6 pb-10">
                    <div className="text-[#FCD913]">
                        <div className="text-2xl font-bold mb-2">Request a full quote</div>
                    </div>

                    {/* Ensure form takes full height */}
                    <form className="flex flex-col flex-1 space-y-4 pt-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm text-[#E6E6EA] mb-2">Name</label>
                            <input type="text" onChange={handleChange} name="name" className="px-2 bg-[#141624] text-white w-full border border-[#E6E6EA] rounded-md h-10" />
                        </div>
                        <div>
                            <label className="block text-sm text-[#E6E6EA] mb-2">Email</label>
                            <input type="email" onChange={handleChange} name="email" className="px-2 bg-[#141624] text-white w-full border border-[#E6E6EA] rounded-md h-10" />
                        </div>
                        <div className="">
                            <label className="block text-sm text-[#E6E6EA] mb-2">Additional comments</label>
                            <textarea name="comments" onChange={handleChange} rows={5} className="px-2 bg-[#141624] text-white w-full border border-[#E6E6EA] rounded-md h-full" />
                        </div>

                        {/* Button sticks to the bottom */}
                        <div className="mt-auto">
                            <button type="submit" className={`w-full max-w-md p-3 text-md font-medium rounded-md flex items-center justify-center 
                                ${nextDisabled ? "bg-gray-600 cursor-not-allowed" : "bg-[#FCD913] text-black hover:bg-[#FCD913] transform hover:scale-105 cursor-pointer duration-300"}`}>
                                Send →
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default RequestQoutePage