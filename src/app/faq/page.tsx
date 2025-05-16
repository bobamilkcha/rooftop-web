'use client'
import React, { useState } from "react";
import Faq from "../components/main/Faq";
import Header from '../components/Newheader';
import Footer from '../components/layouts/Footer';

const FaqPage = () => {
  const [query, setQuery] = useState("");
  return (
    <div className="bg-[#141624] flex flex-col min-h-screen w-screen">
      <Header />
      
      <main className="flex flex-col items-center justify-center flex-grow px-4 py-10">
        <div className="w-full max-w-5xl">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search questions..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full p-2 mb-6 rounded border border-gray-600 bg-[#222634] text-white"
          />
          {/* Pass search query to Faq */}
          <Faq searchQuery={query} />
        </div>
      </main>

      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
};

export default FaqPage;
