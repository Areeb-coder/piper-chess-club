import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { Otp } from '@/lib/db/models/Otp';
import { signJwtToken, verifyJwtToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { otp } = await request.json();
    const cookieStore = await cookies();
    const pendingToken = cookieStore.get('pending-otp')?.value;

    if (!pendingToken) {
      return NextResponse.json({ error: 'Session expired. Please login again.' }, { status: 401 });
    }

    const payload = await verifyJwtToken(pendingToken);
    if (!payload || !payload.email) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    await connectToDatabase();

    const otpRecord = await Otp.findOne({ email: payload.email, otp });

    if (!otpRecord) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }

    // OTP verified successfully. Delete the record.
    await Otp.deleteOne({ _id: otpRecord._id });

    // Issue the main admin token
    const adminToken = await signJwtToken({ email: payload.email, role: 'admin' }, { exp: '1h' });

    const response = NextResponse.json({ message: 'Verified successfully' }, { status: 200 });

    // Clear pending token and set admin token
    response.cookies.delete('pending-otp');
    response.cookies.set('admin-token', adminToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60, // 1 hour
    });

    return response;
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
