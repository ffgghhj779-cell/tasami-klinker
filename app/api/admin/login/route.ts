import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  isAdminPasswordConfigured,
  setAdminSession,
  verifyAdminPassword,
} from '@/lib/admin-session';

const loginSchema = z.object({
  password: z.string().min(1),
});

export async function POST(request: Request) {
  if (!isAdminPasswordConfigured()) {
    return NextResponse.json(
      { success: false, message: 'Admin access is not configured' },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { password } = loginSchema.parse(body);

    if (!verifyAdminPassword(password)) {
      return NextResponse.json(
        { success: false, message: 'Incorrect password' },
        { status: 401 }
      );
    }

    await setAdminSession();

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid request' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
