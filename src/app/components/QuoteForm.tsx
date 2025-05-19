'use client';
import React from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

interface QuoteFormProps {
  step: number;
  postcode: string;
  area: string;
  onPostcodeChange: (newPostcode: string) => void;
  onNext: () => void;
  onBack: () => void;
  isValidPostcode: boolean;
}


const QuoteForm: React.FC<QuoteFormProps> = ({
  step,
  postcode,
  area,
  onPostcodeChange,
  onNext,
  onBack,
  isValidPostcode,
}) => {
  return (
    <div className="bg-[#18181B] min-h-screen w-full flex flex-col">

     {/* Step progress + Quote label */}
    <div className="flex flex-col sm:flex-row items-center justify-center mt-8 px-4">
    <div className="bg-black rounded-full p-2 w-full max-w-xl flex flex-col sm:flex-row items-center justify-between">
        <span className="text-white text-sm font-medium mb-2 sm:mb-0 sm:ml-4">
        Estimate your quote
        </span>
        <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => {
            let colorClass = 'bg-gray-700'; // Default: upcoming
            if (i < step - 1) {
            colorClass = 'bg-green-500'; // Completed steps
            } else if (i === step - 1) {
            colorClass = 'bg-yellow-400'; // Current step
            }
            return (
            <div
                key={i}
                className={`h-2 w-6 rounded-full ${colorClass}`}
            />
            );
        })}
        </div>
    </div>
    </div>


      {/* Form Card */}
      <div className="flex-grow flex top-10 justify-center px-4 py-10">
        <div className="w-full max-w-2xl">
          <div className="text-white p-6 sm:p-8 rounded-lg mt-4 max-w-md w-full mx-auto">
            <div className="mb-6">
              <label
                htmlFor="postcode"
                className="block text-md font-semibold text-gray-300 py-8"
              >
                Building post code
              </label>
              <input
                type="text"
                id="postcode"
                className="border border-black p-3 block w-full font-semibold text-lg rounded-md bg-black text-rtyellow-200 shadow-sm focus:border-rtyellow-200 focus:ring-rtyellow-200 sm:text-sm"
                value={postcode}
                onChange={(e) => onPostcodeChange(e.target.value)}
              />
              {postcode && !area && (
                <div className="text-red-400 text-sm font-medium mt-5">
                  Invalid postcode. Please enter a valid Malaysian postcode.
                </div>
              )}
              {area && (
                <div className="text-yellow-400 font-medium flex items-center gap-2 mt-8">
                  <img
                    src="/map-pin-check.svg"
                    alt="Area Icon"
                    className="w-8 h-8 rounded-full border border-yellow-400 p-1 bg-yellow-500"
                  />
                  Area in {area}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 px-2 sm:px-0">

            {step > 1 && (
              <button
                onClick={onBack}
                className="w-full sm:w-auto border hover:bg-white text-white hover:text-black border-white py-2 px-18 rounded-full focus:outline-none focus:shadow-outline transition-all duration-300"
              >
                <FaArrowLeft className="inline mr-2" /> Back
              </button>
            )}
            <button
              onClick={onNext}
              disabled={!isValidPostcode}
              className={`w-full sm:w-auto py-2 px-18 rounded-full focus:outline-none focus:shadow-outline transition-all duration-300
                ${isValidPostcode
                  ? 'bg-yellow-500 hover:bg-yellow-400 text-gray-900'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'}
              `}
            >
              Next <FaArrowRight className="inline ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;

