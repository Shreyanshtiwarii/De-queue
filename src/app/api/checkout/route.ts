import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { items, totalPrice, totalWeight } = body;

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
        }

        // Generate a unique receipt ID
        const receiptId = `REC-${crypto.randomUUID().split('-')[0].toUpperCase()}`;

        const transaction = {
            receiptId,
            items,
            totalPrice,
            totalWeight,
            timestamp: new Date().toISOString(),
            status: 'SUCCESS',
        };

        // In a real app, we would save this to a database
        console.log('Transaction logged:', transaction);

        return NextResponse.json(transaction);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
