import { NextResponse } from 'next/server';
import { sendOtpEmail } from '@/lib/mail';
import connectToDatabase from '@/lib/db/mongodb';
import { Otp } from '@/lib/db/models/Otp';
import { signJwtToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    // Verify against env variables
    if (
      username !== process.env.ADMIN_USERNAME ||
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    await connectToDatabase();

    // Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Store in DB (will auto-expire in 5 minutes due to TTL index)
    await Otp.deleteMany({ email }); // clear old OTPs
    await Otp.create({ email, otp: otpCode });

    // Send email
    await sendOtpEmail(email, otpCode);

    // Create a temporary JWT for the OTP verification phase
    const pendingToken = await signJwtToken({ email }, { exp: '5m' });

    const response = NextResponse.json({ message: 'OTP sent successfully' }, { status: 200 });
    
    // Set pending-otp cookie
    response.cookies.set('pending-otp', pendingToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 5, // 5 minutes
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
