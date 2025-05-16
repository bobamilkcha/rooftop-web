import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');

        if (!email || typeof email !== 'string') return NextResponse.json({ error: 'Invalid email' }, { status: 400 });

        const forecasts = await prisma.quote.findMany({
            where: { user : { email : email } },
            orderBy: { createdAt: 'desc' },
        })

        return NextResponse.json(forecasts, { status: 200 });
    } catch (error) {
        console.error('Error fetching forecasts:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
