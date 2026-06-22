import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/admin-session';

export async function GET() {
  const authenticated = await verifyAdminSession();
  return NextResponse.json({ authenticated });
}
