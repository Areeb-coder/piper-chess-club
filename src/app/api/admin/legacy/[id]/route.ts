import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { LegacyEntry } from '@/lib/db/models/LegacyEntry';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const entry = await LegacyEntry.findById(id);
    if (!entry) return NextResponse.json({ error: 'Legacy entry not found' }, { status: 404 });
    return NextResponse.json(entry);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch legacy entry' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await req.json();
    const updatedEntry = await LegacyEntry.findByIdAndUpdate(id, body, { new: true });
    if (!updatedEntry) return NextResponse.json({ error: 'Legacy entry not found' }, { status: 404 });
    return NextResponse.json(updatedEntry);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to update legacy entry' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const deletedEntry = await LegacyEntry.findByIdAndDelete(id);
    if (!deletedEntry) return NextResponse.json({ error: 'Legacy entry not found' }, { status: 404 });
    return NextResponse.json({ message: 'Legacy entry deleted' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to delete legacy entry' }, { status: 500 });
  }
}
