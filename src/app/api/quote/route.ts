import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { name, email, comments, result } = await req.json()

        if (!name || !email || !comments || !result) {
            return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
        }

        // Check if user exists
        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            user = await prisma.user.create({
                data: { name, email }
            });
        }

        // Save quote
        const savedQuote = await prisma.quote.create({
            data: {
                userId: user.id,
                comments: comments,
                results: JSON.stringify(result)
            }
        })

        const encodedEmail = Buffer.from(email).toString('base64')
        const link = `${process.env.NEXT_URL}/view-forecast?e=${encodedEmail}`

        
        return NextResponse.json({ quote: savedQuote }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
