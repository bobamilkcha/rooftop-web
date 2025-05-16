'use client'
import React, { useState } from 'react';
import { format } from 'date-fns';

// Mock Data (Replace with actual data fetching)
const initialQuotes = [
    { id: '1', title: "Power Direct", amount: 2350, unit: 'RM', description: 'Your new electricity independence' },
    { id: '2', title: "Installment", amount: 2500, unit: 'RM', description: 'Powering your daily needs' },
    { id: '3', title: "Upfront Purchase", amount: 48000, unit: 'RM', description: 'Sustainable energy solution' },
];

const initialBill = {
    amount: 1824,
    unit: 'RM',
    details: '42.8 sen/kWh',
    contract: '21 years with flexible exit',
    savings: [
        { type: 'Yearly', amount: 109440, unit: 'RM' },
        { type: 'Monthly', amount: 6230, unit: 'RM' },
        { type: 'Installation', amount: 456, unit: 'RM' },
    ],
};

const operatingHoursOptions = [
    { label: "08:00 - 22:00", value: "08:00 - 22:00" },
    { label: "09:00 - 23:00", value: "09:00 - 23:00" },
    { label: "24 Hours", value: "24 Hours" },
];

const kWpOptions = [
    { label: "225 kWp", value: "225" },
    { label: "500 kWp", value: "500" },
    { label: "1 MWp", value: "1000" },
];

const locationOptions = [
    { label: "Klang Jaya", value: "Klang Jaya" },
    { label: "Subang Jaya", value: "Subang Jaya" },
    { label: "Petaling Jaya", value: "Petaling Jaya" },
];

const PowerDirectQuote = () => {
    const [quotes, setQuotes] = useState(initialQuotes);
    const [bill, setBill] = useState(initialBill);
    const [date, setDate] = useState<Date>();
    const [operatingHours, setOperatingHours] = useState<string>(operatingHoursOptions[0].value);
    const [kWp, setkWp] = useState<string>(kWpOptions[0].value);
    const [location, setLocation] = useState<string>(locationOptions[0].value);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const handleRequestQuoteAgain = () => {
        alert('Requesting a new quote...');
        setQuotes(initialQuotes);
        setBill(initialBill);
    };

    const buttonStyle = {
        backgroundColor: '#FCD913',
        color: 'white',
        padding: '10px 16px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease', // Smooth transition
    };

    const buttonHoverStyle = {
        backgroundColor: '#eab308', // Darker shade on hover
    };

    return (
        <div style={{ padding: '16px' , backgroundColor: "#18181B"}}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>Your Quotes</h1>

            {/* Your Quotes Section */}
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'semibold', marginBottom: '16px' }}>Your Quotes</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                    {quotes.map((quote) => (
                        <div key={quote.id} style={{ backgroundColor: '#27272A', border: '1px solid #fcd34d', padding: '16px', borderRadius: '4px' }}>
                            <h1 style={{ backgroundColor: '#FCD913', border: '1px solid black', padding: '4px', borderRadius: '2px', position: 'relative', top: '0' }}>{quote.title}</h1>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white', paddingInline: '4px', paddingBlock: '8px' }}>
                                {quote.amount} {quote.unit}
                            </h3>
                            <p style={{ color: 'white', fontSize: '0.9rem' }}>{quote.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Your New Electricity Bill */}
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'semibold', marginBottom: '16px' }}>Your new electricity bill</h2>
                <div style={{ backgroundColor: '#eff6ff', border: '1px solid #9ecae6', padding: '16px', borderRadius: '4px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                        {bill.amount} {bill.unit}
                    </div>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '8px' }}>{bill.details}</p>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '16px' }}>{bill.contract}</p>
                    {bill.savings.map((save, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', color: '#4b5563', marginBottom: '4px' }}>
                            <span>{save.type}</span>
                            <span style={{ fontWeight: 'medium' }}>{save.amount} {save.unit}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quote Input Form */}
            <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'semibold', marginBottom: '16px' }}>Get a Quote</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                    <div>
                        <label htmlFor="operating-hours" style={{ display: 'block', marginBottom: '8px', color: '#374151' }}>Operating Hours</label>
                        <select
                            id="operating-hours"
                            value={operatingHours}
                            onChange={(e) => setOperatingHours(e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
                        >
                            {operatingHoursOptions.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="kWp" style={{ display: 'block', marginBottom: '8px', color: '#374151' }}>kWp</label>
                        <select
                            id="kWp"
                            value={kWp}
                            onChange={(e) => setkWp(e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
                        >
                            {kWpOptions.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="location" style={{ display: 'block', marginBottom: '8px', color: '#374151' }}>Location</label>
                        <select
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
                        >
                            {locationOptions.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="date" style={{ display: 'block', marginBottom: '8px', color: '#374151' }}>Date</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                id="date"
                                value={date ? format(date, 'PPP') : ''}
                                readOnly
                                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                                placeholder="Pick a date"
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
                            />
                            {isDatePickerOpen && (
                                <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 10, backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                                    {/* Basic inline date picker - consider a library for more features */}
                                    <input
                                        type="date"
                                        onChange={(e) => {
                                            if (e.target.value) {
                                                setDate(new Date(e.target.value));
                                            }
                                            setIsDatePickerOpen(false); // Close picker after selection
                                        }}
                                        style={{ padding: '8px' }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleRequestQuoteAgain}
                    style={buttonStyle}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor;
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor;
                    }}
                >
                    We'll send quote again
                </button>
            </div>
        </div>
    );
};

export default PowerDirectQuote;
