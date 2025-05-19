"use client";

import Header from '../components/layouts/Header';

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="bg-rtgray-900 min-h-screen font-exo2 flex flex-col">
            <Header className="bg-rtgray-900"/>
            {children}
        </main>
    );
}

export default DefaultLayout
