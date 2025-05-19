'use client'
import React from 'react';
import Header from '../components/Newheader';
import Footer from '../components/layouts/Footer';
import YourQuotesSection from '../components/YourQuoteSection';
import YourDetailsSection from '../components/YourDetailsSection';



export default function QuoteSummaryPage() {
    

  return (
    <div className="bg-rtgray-900 text-white min-h-screen">
      <Header /> 

      <main className="px-6 md:px-12 lg:px-24 xl:px-32 py-12 font-exo2">
        <YourQuotesSection />
        <YourDetailsSection />
      </main>

      <Footer /> 
    </div>
  );
}
