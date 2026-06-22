import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/admin-session';
import { createAdminClient, isSupabaseConfigured } from '@/lib/supabase/server';
import type { ContactSubmission } from '@/lib/types/database';

export async function GET() {
  const isAuthed = await verifyAdminSession();
  if (!isAuthed) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { success: false, message: 'Database is not configured' },
      { status: 503 }
    );
  }

  try {
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Admin] Supabase fetch error:', error.message);
      return NextResponse.json(
        { success: false, message: 'Failed to fetch leads' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, leads: (data ?? []) as ContactSubmission[] });
  } catch (error) {
    console.error('[Admin] Unexpected error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
