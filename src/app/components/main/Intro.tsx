import { BsArrowRight } from 'react-icons/bs';

const Intro = () => {
    return (
    <section className="relative top-[170px] left-0 z-20 w-full px-6 md:px-0">
        <div className="text-5xl lg:text-8xl font-semibold mb-6 lg:mb-10 leading-14 lg:leading-28">
            Democratizing <br /> Solar Energy
        </div>
        <p className="text-xl font-light text-rtgray-200 mb-10">
            Making solar accessible to all Malaysian
            <span className="block lg:inline"> businesses with real solar data.</span>
        </p>

        <div className="flex flex-col items-center gap-4 mt-20">
            <button className="opacity-50 justify-center w-8/12 sm:w-6/12 lg:w-3/12 bg-rtyellow-200 text-black lg:text-sm font-semibold py-1.5 lg:py-2.5 rounded-full flex items-center gap-2 transition duration-300 ">
            Get Quote Now <BsArrowRight size={18} />
            </button>
            <div className="bg-rtyellow-200 text-black font-medium px-6 py-1.5 lg:py-2 rounded-sm rounded-tl-2xl rounded-br-2xl w-6/12 sm:w-4/12 md:w-2/12 flex items-center justify-center text-center">
            COMING SOON
            </div>
        </div>
    </section>
    )
}

export default Intro