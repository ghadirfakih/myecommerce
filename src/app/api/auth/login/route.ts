// app/api/auth/login/route.ts

import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';// Assuming you have a Prisma client setup
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Validate the data
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 400 });
    }

    // Compare the password with the hashed password in the database
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Login successful', user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
