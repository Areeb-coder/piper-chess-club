import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { Event } from '@/lib/db/models/Event';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const resolvedParams = await params;
    const event = await Event.findById(resolvedParams.id);
    if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const resolvedParams = await params;
    const body = await request.json();
    const updatedEvent = await Event.findByIdAndUpdate(resolvedParams.id, body, { new: true });
    if (!updatedEvent) return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    return NextResponse.json(updatedEvent);
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const resolvedParams = await params;
    const deletedEvent = await Event.findByIdAndDelete(resolvedParams.id);
    if (!deletedEvent) return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    return NextResponse.json({ message: 'Event deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}
