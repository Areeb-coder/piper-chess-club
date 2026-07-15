import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { LegacyEntry } from '@/lib/db/models/LegacyEntry';

export async function GET() {
  try {
    await connectToDatabase();
    const entries = await LegacyEntry.find().sort({ year: -1, createdAt: -1 });
    return NextResponse.json(entries);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch legacy entries' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const newEntry = await LegacyEntry.create(body);
    return NextResponse.json(newEntry, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create legacy entry' }, { status: 500 });
  }
}
