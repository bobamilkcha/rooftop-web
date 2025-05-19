'use client';

import { useRouter } from "next/navigation";

const PowerDirect = () => {
    const router = useRouter()

    return (
    <>
    <div className="flex flex-col text-white pb-20">
        {/* Progress Bar */}
        <div className="bg-rtgray-800 h-14  border-b-3 border-rtyellow-200">
            <div className='flex max-w-md w-full justify-between  px-6 m-auto h-full items-center'>
                <span className={`text-rtyellow-200`}>Power Direct</span>
                <div className={`text-rtgray-300`} onClick={()=>router.push('/direct/estimate')}> Your Estimate </div>
            </div>
        </div>

        <div className="w-full max-w-md h-full m-auto pt-16 px-6">
            <div className='text-rtyellow-200'>
                <div className="text-5xl font-bold mb-2">Power Direct</div>
                <div className="text-5xl font-bold ">Cool Tagline</div>
            </div>

            <div className='mt-20'>
                <img src="/PowerRemote.png" alt="Power Remote" className=" w-full max-w-3xl mx-auto" />
            </div>

            <div className='text-xl font-bold mt-14 mb-2'>How it works?</div>
            <div className='text-sm font-extralight'>A solar panel is a device that converts sunlight into electricity by using photovoltaic (PV) cells. PV cells are made of materials that produce excited electrons when exposed to light. </div>


            <div className='text-xl text-rtyellow-200 font-bold mt-14 mb-2'>Why rooftop energy?</div>

            <div className='text-sm font-extralight'>
                <div className="bg-rtgray-800 text-white  p-4 pt-5 w-full max-w-md  relative mt-5">
                    {/* Avatar and Quote */}
                    <div className="flex items-start gap-4 mb-12">
                        <div className="w-20 h-20 bg-gray-400 rounded-full flex-shrink-0" />
                        <div>
                            <p className="text-sm text-rtgray-300">
                                Nigel Wong, Business owner at Selara Sdn Bhd
                            </p>
                            <p className="text-sm mt-2 text-white">
                                Power remote provides the flexibility and cost saving opportunities like no other
                            </p>
                        </div>
                    </div>

                    {/* Pricing Section */}
                    <div className="flex items-end  mt-6 mb-3 gap-5">
                        <div className='flex gap-2'>
                            <div className="text-sm self-end leading-3">RM</div>
                            <div className="text-2xl font-bold leading-none">1,600</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="text-rtyellow-200 text-sm font-semibold">-33%</div>
                            <div className="text-rtgray-400 text-sm line-through">RM 2,400</div>
                        </div>
                    </div>

                    {/* Bottom Border and Label */}
                    <div className="absolute bottom-0 left-0 w-full border-t border-rtyellow-200 border-2">
                        <p className="text-xs text-rtyellow-200 text-right font-medium pr-2 -mt-5">Power remote</p>
                    </div>
                </div>
            </div>
            <div className='text-xl font-bold mt-10'>FAQ</div>
        </div>
    </div>
    </>
    )
}

export default PowerDirect