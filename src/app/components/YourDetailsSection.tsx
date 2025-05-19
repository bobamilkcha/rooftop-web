'use client';
import {useElectricBillStore} from "../quoteform/page";
import { motion } from "framer-motion";
import React from "react";
import { useSearchParams } from 'next/navigation';

const YourDetailsSection = () => { 
    const searchParams = useSearchParams();

  const monthlyBill = searchParams.get('monthlyBill');
  const buildingType = searchParams.get('buildingType');
  const tariff = searchParams.get('tariff');
  const peakDemand = searchParams.get('peakDemand');
  const postcode = searchParams.get('postcode');
  const peakHourRatio = searchParams.get('peakHourRatio');
    const monthlyElectricBill = monthlyBill ? parseFloat(monthlyBill) : 0;
    const peakPowerDemand = peakDemand ? parseFloat(peakDemand) : 0;
    const { steps, setSteps } = useElectricBillStore();
    const { setMonthlyElectricBill, setBuildingType, setTariff, setPeakPowerDemand, setPostcode, setPeakHourRatio } = useElectricBillStore();
    

  // Placeholder for your edit handler, replace with your actual logic
  const handleEdit = (stepNumber: number) => {
    setSteps(stepNumber);
  };

  return (
    <div className="flex justify-center mx-auto bg-gray-900">
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6 flex flex-col justify-center items-center w-[600px]"
      style={{ backgroundColor: 'transparent', border: 'none' }}
    >
      <h2 className="self-start text-3xl font-semibold mb-6">Your details</h2>
      <div className="rounded-lg p-6 w-full space-y-4">
        {/* Monthly electricity bill */}
        <div className="flex flex-col items-start justify-between">
          <span className="text-lg mb-1" style={{ fontSize: '14px', color: 'rtgray-300' }}>Monthly electricity bill</span>
          <div className="flex justify-between items-center w-full">
            <span className="text-rtwhite font-medium" style={{ fontSize: '20px' }}>{monthlyElectricBill?.toFixed(2)}</span>
            <div className="rounded-[1000px] overflow-hidden" style={{ width: '100px', height: '46px' }}>
              <button
                onClick={() => handleEdit(1)}
                className="text-sm text-gray-400 hover:text-white focus:outline-none"
                style={{
                  borderRadius: '1000px',
                  border: '1px solid rgba(156, 163, 175, 0.5)',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Building Type */}
        <div className="flex flex-col items-start justify-between">
          <span className="text-lg mb-1" style={{ fontSize: '14px', color: 'rtgray-300' }}>Your building type</span>
          <div className="flex justify-between items-center w-full">
            <span className="text-white" style={{ fontSize: '20px' }}>{buildingType}</span>
            <div className="rounded-[1000px] overflow-hidden" style={{ width: '100px', height: '46px' }}>
              <button
                onClick={() => handleEdit(2)}
                className="text-sm text-gray-400 hover:text-white focus:outline-none"
                style={{
                  borderRadius: '1000px',
                  border: '1px solid rgba(156, 163, 175, 0.5)',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Tariff */}
        <div className="flex flex-col items-start justify-between">
          <span className="text-lg mb-1" style={{ fontSize: '14px', color: 'rtgray-300' }}>Your tariff</span>
          <div className="flex justify-between items-center w-full">
            <span className="text-white" style={{ fontSize: '20px' }}>{tariff}</span>
            <div className="rounded-[1000px] overflow-hidden" style={{ width: '100px', height: '46px' }}>
              <button
                onClick={() => handleEdit(3)}
                className="text-sm text-gray-400 hover:text-white focus:outline-none"
                style={{
                  borderRadius: '1000px',
                  border: '1px solid rgba(156, 163, 175, 0.5)',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Peak hour demand */}
        <div className="flex flex-col items-start justify-between">
          <span className="text-lg mb-1" style={{ fontSize: '14px', color: 'rtgray-300' }}>Peak hour demand</span>
          <div className="flex justify-between items-center w-full">
            <span className="text-white" style={{ fontSize: '20px' }}>{peakPowerDemand} kW</span>
            <div className="rounded-[1000px] overflow-hidden" style={{ width: '100px', height: '46px' }}>
              <button
                onClick={() => handleEdit(4)}
                className="text-sm text-gray-400 hover:text-white focus:outline-none"
                style={{
                  borderRadius: '1000px',
                  border: '1px solid rgba(156, 163, 175, 0.5)',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Building postcode */}
        <div className="flex flex-col items-start justify-between">
          <span className="text-lg mb-1" style={{ fontSize: '14px', color: 'rtgray-300' }}>Building postcode</span>
          <div className="flex justify-between items-center w-full">
            <span className="text-white" style={{ fontSize: '20px' }}>{postcode}</span>
            <div className="rounded-[1000px] overflow-hidden" style={{ width: '100px', height: '46px' }}>
              <button
                onClick={() => handleEdit(5)}
                className="text-sm text-gray-400 hover:text-white focus:outline-none"
                style={{
                  borderRadius: '1000px',
                  border: '1px solid rgba(156, 163, 175, 0.5)',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Business operational hours */}
        <div className="flex flex-col items-start justify-between">
          <span className="text-lg mb-1" style={{ fontSize: '14px', color: 'rtgray-300' }}>Business operational hours</span>
          <div className="flex justify-between items-center w-full">
            <span className="text-white" style={{ fontSize: '20px' }}>{peakHourRatio}</span>
            <div className="rounded-[1000px] overflow-hidden" style={{ width: '100px', height: '46px' }}>
              <button
                onClick={() => handleEdit(6)}
                className="text-sm text-gray-400 hover:text-white focus:outline-none"
                style={{
                  borderRadius: '1000px',
                  border: '1px solid rgba(156, 163, 175, 0.5)',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
    </div>
  );
};

export default YourDetailsSection;
