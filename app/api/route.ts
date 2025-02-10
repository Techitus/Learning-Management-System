// app/api/route.ts
import dbConnect from '@/database/connection';
import { NextResponse } from 'next/server';

export async function GET() {
    console.log("GET route hit");
    try {
        await dbConnect();
        console.log("Connection successful");
        return NextResponse.json({ 
            message: 'Connected to database via GET' 
        });
    } catch (error) {
        console.error('API route error:', error);
        return NextResponse.json(
            { error: 'Failed to connect to database' },
            { status: 500 }
        );
    }
}

export async function POST() {
    console.log("POST route hit");
    try {
        await dbConnect();
        console.log("Connection successful");
        return NextResponse.json({ 
            message: 'Connected to database via POST' 
        });
    } catch (error) {
        console.error('API route error:', error);
        return NextResponse.json(
            { error: 'Failed to connect to database' },
            { status: 500 }
        );
    }
}