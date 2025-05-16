'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ViewForecast = () => {
    const searchParams = useSearchParams();
    const encodedEmail = searchParams.get('e');

    const [email, setEmail] = useState('');
    const [forecasts, setForecasts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!encodedEmail) return;

        const fetchForecasts = async () => {
        try {
            // If atob fails due to bad encoding, it'll throw an error
            const decodedEmail = atob(encodedEmail);
            setEmail(decodedEmail);

            const response = await axios.get(`/api/email-forecast`, {
            params: { email: decodedEmail },
            });

            setForecasts(response.data);
        } catch (err) {
            console.error('Invalid token or API error:', err);
        } finally {
            setLoading(false);
        }
        };

        fetchForecasts();
    }, [encodedEmail]);

    if (loading) return <p>Loading...</p>;
    if (!forecasts.length) return <p>No forecasts found for {email}</p>;

    return (
        <>
        <h1>Forecast Results for {email}</h1>
        
        <ul>
            {forecasts.map((forecast: any, idx: number) => (
            <li key={idx}>
                <pre>{JSON.stringify(forecast, null, 2)}</pre>
            </li>
            ))}
        </ul>
        </>
    )
}

export default ViewForecast