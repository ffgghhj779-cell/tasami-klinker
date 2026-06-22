import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient, isSupabaseConfigured } from '@/lib/supabase/server';

const contactSchema = z.object({
  company: z.string().min(1).max(500),
  countryPort: z.string().min(1).max(500),
  quantity: z.string().min(1).max(200),
  email: z.string().email().max(320),
  phone: z.string().min(5).max(30),
  notes: z.string().max(5000).optional(),
  lang: z.enum(['ar', 'en']).optional(),
});

export async function POST(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        {
          success: false,
          message: 'Database is not configured. Please contact the site administrator.',
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const data = contactSchema.parse(body);
    const referenceId = `RFQ-${Date.now()}`;

    const supabase = createAdminClient();

    const insertPayload = {
      reference_id: referenceId,
      company: data.company.trim(),
      country_port: data.countryPort.trim(),
      quantity: data.quantity.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      notes: data.notes?.trim() || null,
      lang: data.lang ?? null,
    };

    const { data: row, error } = await supabase
      .from('contact_submissions')
      .insert(insertPayload)
      .select('id, reference_id')
      .single();

    if (error || !row) {
      console.error('[Contact] Supabase insert error:', error?.message);
      return NextResponse.json(
        { success: false, message: 'Failed to save submission' },
        { status: 500 }
      );
    }

    const saved = row as { id: string; reference_id: string };

    return NextResponse.json({
      success: true,
      message: 'Request received successfully',
      id: saved.reference_id,
      uuid: saved.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    console.error('[Contact] Unexpected error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
