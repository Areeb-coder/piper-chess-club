import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { TeamMember } from '@/lib/db/models/TeamMember';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const member = await TeamMember.findById(id);
    if (!member) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }
    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch team member' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await req.json();
    const updatedMember = await TeamMember.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!updatedMember) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }
    return NextResponse.json(updatedMember);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const deletedMember = await TeamMember.findByIdAndDelete(id);
    if (!deletedMember) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Team member deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
  }
}
