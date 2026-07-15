import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { TeamMember } from '@/lib/db/models/TeamMember';

export async function GET() {
  try {
    await connectToDatabase();
    const teamMembers = await TeamMember.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(teamMembers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const newMember = await TeamMember.create(body);
    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
  }
}
