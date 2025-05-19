'use client';

import { Coins, Handshake, LogOut } from 'lucide-react';
import { BsArrowRight } from 'react-icons/bs';

const IntroPowerDirect = () => {

    const features = [
        {
            icon: <Coins className="text-rtyellow-200 w-10 h-10"  />,
            title: 'Savings right now',
            description: 'Immediately reduce your monthly electricity bill spendings with no additional cost.',
        },
        {
            icon: <img src="/sticky-note.svg" alt="Instagram" className="w-10 h-10" />,
            title: 'Instant quote',
            description: 'Use our quote estimation tool to see your potential savings.',
        },
        {
            icon: <Handshake className="text-rtyellow-200 w-10 h-10" />,
            title: 'Rooftop Ownership',
            description: 'We will own the solar PV system and cover all related costs during the contract.',
        },
        {
            icon: <LogOut className="text-rtyellow-200 w-10 h-10" />,
            title: 'Flexible exit plans',
            description: 'Short lock-in period with exit options at various contract stages.',
        },
    ];


    return (
        <section className="relative py-15 lg:py-30 bg-rtgray-900 text-white px-8 md:px-12 lg:px-24 xl:px-32">

            <div className="space-y-1">
                <div className="text-4xl font-semibold text-rtyellow-200">
                    Introducing Power<span className="block lg:inline">Direct</span>
                </div>
                <p className="text-base lg:text-xl text-rtgray-300 mt-4">
                    An affordable solar financing plan for
                    <span className="block lg:inline"> everyday Malaysians to save from day one.</span>
                </p>
            </div>

            <div className="my-14 w-5/6 sm:w-5/12 lg:w-full mx-auto">
                <div className="grid gap-2 lg:gap-6 xl:gap-12 space-y-8 lg:space-y-0 lg:grid-cols-4">
                    {features.map((item: any, index: any) => (
                    <div key={index} className="bg-rtgray-800 rounded-xl px-6 py-6 shadow-sm flex flex-col" >
                        <div className="flex flex-col items-center text-center">
                        <div>{item.icon}</div>
                        <div className="text-xl font-semibold mt-6 lg:mt-8">{item.title}</div>
                        </div>
                        <p className="text-lg font-light text-rtgray-300 mt-6 text-center">{item.description}</p>
                    </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 items-stretch">
                <div className="col-span-1 lg:col-span-3">
                    <button className="h-full w-full bg-rtyellow-200 text-black text-xl font-semibold px-4 md:px-6 py-5 rounded-2xl flex justify-between transition">
                    Power Direct <BsArrowRight className="text-xl" />
                    </button>
                </div>
                <div className="col-span-1 lg:col-span-3">
                    <div className="w-full bg-rtgray-800 text-white px-4 md:px-6 py-5 rounded-2xl flex flex-col justify-between">
                        <div className="font-semibold flex items-center justify-between text-xl">
                            All financing plans <BsArrowRight className="text-rtyellow-200 text-xl" />
                        </div>
                        <div className="font-mono text-base text-rtgray-300 mt-4">Upfront payment, installments, and solar maintenance solutions.</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default IntroPowerDirect