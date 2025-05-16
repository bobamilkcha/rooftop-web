"use client";
import Header from "../components/layouts/Header";
import { FaArrowRight } from "react-icons/fa";

const PowerRemotePage = () => {
    return (
        <main className="bg-[#141624] min-h-screen font-exo2">
            <Header />
            <div className="px-6 mt-4">
                <div className="flex justify-between items-center border-b-2 border-[#FCD913] pb-2">
                    <h1 className="text-white text-2xl font-bold">Power Remote</h1>
                    <button className="bg-[#FCD913] text-black px-4 py-2 rounded-lg font-medium flex items-center">
                        Estimate my quote <FaArrowRight className="ml-2" />
                    </button>
                </div>
                <h2 className="text-[#FCD913] text-5xl font-bold mt-8">Power Remote Cool Tagline</h2>
                <img src="/PowerRemote.png" alt="Power Remote" className="mt-4 w-full max-w-3xl mx-auto" />
                <h1 className="text-[#FCD913] text-1xl font-bold mt-8">How it works?</h1>
                <p className="text-white text-lg text-center mt-4 max-w-3xl mx-auto">
                    A solar panel is a device that converts sunlight into electricity by using photovoltaic (PV) cells. PV cells are made of materials that produce excited electrons when exposed to light.
                </p>
                <h1 className="text-[#FCD913] text-1xl font-bold mt-8">Why rooftop energy?</h1>
                
                {/* Review Card Section */}
                <div className="bg-[#222634] p-6 rounded-lg mt-6 max-w-3xl mx-auto text-white flex items-center">
                    <img src="/reviewer-image.jpg" alt="Reviewer" className="w-24 h-24 rounded-full mr-6" />
                    <div>
                        <p className="mt-4">Nigel Wong, Business owner at Selara Sdn Bhd</p>
                        <p className="mt-4 italic">"Power remote provides the flexibility and cost saving opportunities like no other"</p>
                        <div className="flex items-center mt-4">
                            <span className="text-white text-xl font-bold">RM1,600</span>
                            <span className="text-[#FCD913] text-xl font-bold mx-2">-33%</span>
                            <span className="text-gray-400 text-xl line-through">RM2,400</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PowerRemotePage;