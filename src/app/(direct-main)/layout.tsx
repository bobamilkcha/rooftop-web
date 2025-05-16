"use client";

import Footer from '../components/layouts/Footer';
import Header from '../components/layouts/Header';

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="bg-[#141624] min-h-screen font-exo2 flex flex-col">
            <Header className="bg-[#141624]"/>
            {children}
            <Footer/>
        </main>
    );
}

export default DefaultLayout
