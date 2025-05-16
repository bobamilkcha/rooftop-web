import { NextRequest, NextResponse } from 'next/server'
import pdfParse from "pdf-parse";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get("pdf") as File | null

        if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 })

        const buffer = Buffer.from(await file.arrayBuffer())
        const data = await pdfParse(buffer)
        
        const text = data.text
        
        // ---------------------------
        // 1. Tariff Category (TARIF)
        const tariffMatch = text.match(/TARIF\s*(?:\n|:)?\s*([^\n]+)/)
        const tariffFullFormat = tariffMatch ? tariffMatch[1].trim() : null
        const buildingType = tariffFullFormat ? tariffFullFormat.split(':')[0] : null
        const tariffCategory = tariffFullFormat ? tariffFullFormat.split(':')[1] : null

        // ---------------------------
        // 2. Peak Power Demand (Kehendak Maksima Tertinggi)
        const peakPowerMatch = text.match(/Kehendak Maksima Tertinggi[^]*?([\d,]+\.\d+\s*kW)/i)
        const peakPower = peakPowerMatch ? peakPowerMatch[1].trim().replace(/\s*kW$/, '') : null

        // ---------------------------
        // 3. Monthly Bill Amounts (Caj Bulanan)
        const monthlySectionMatch = text.match(/Caj Bulanan \(RM\)([\s\S]*?)Maklumat Tambahan/i)
        const monthlySection = monthlySectionMatch ? monthlySectionMatch[1] : ""
        
        const months = Array.from(monthlySection.matchAll(/([A-Z]{3}-\d{2})/g)).map(m => m[1])
        const amounts = Array.from(monthlySection.matchAll(/RM([\d,]+\.\d{2})/g)).map(m => parseFloat(m[1].replace(",", "")))

        const monthlyBills: Record<string, number> = {}
        let totalMonthlyBill = 0
        let count = 0
        months.forEach((month, index) => {
            if (amounts[index] !== undefined) {
                monthlyBills[month] = amounts[index]
                totalMonthlyBill += amounts[index]
                count++
            }
        })
        
        const averageMonthlyBill = count > 0 ? totalMonthlyBill / count : 0

        // ---------------------------
        // 4. Address (ALAMAT PREMIS)
        let address: string | null = null
        const addressIndex = text.indexOf("ALAMAT PREMIS")
        const stopIndex = text.indexOf("LPC")
        if (addressIndex !== -1) {
            const addressLines = text
                .slice(addressIndex + "ALAMAT PREMIS".length, stopIndex)
                .split("\n")
                .map(line => line.trim())
                .filter(line => line.length > 0)

                address = addressLines.join("\n")  
                const regex = /(\d{5})\s+([\w\s]+)\s+([A-Z]+)/;
                const match = address.match(regex)
                if (match) {
                    address = `${match[1]} ${match[2].trim()} ${match[3].trim()}`;
                }
        }

        return NextResponse.json({
            success: true,
            data: {
                tariff_category: buildingType,
                building_type: tariffCategory,
                peak_power_demand: peakPower,
                monthly_bills: averageMonthlyBill.toFixed(2),
                address: address,
            }
        })
        
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to parse PDF' },
            { status: 500 }
        )
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
}