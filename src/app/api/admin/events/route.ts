import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { Event } from '@/lib/db/models/Event';

export async function GET() {
  try {
    await connectToDatabase();
    const events = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json(events);
  } catch (error) {
    console.error('Fetch Events Error:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const newEvent = await Event.create(body);
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error: any) {
    console.error('Create Event Error:', error);
    if (error.code === 11000) {
      return NextResponse.json({ error: 'An event with this slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
