import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient, isSupabaseConfigured } from '@/lib/supabase/server';
import { sendLeadNotificationEmail } from '@/lib/email';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

const contactSchema = z.object({
  company: z.string().min(1).max(500),
  countryPort: z.string().min(1).max(500),
  quantity: z.string().min(1).max(200),
  email: z.string().email().max(320),
  phone: z.string().min(5).max(30),
  notes: z.string().max(5000).optional(),
  lang: z.enum(['ar', 'en']).optional(),
  website: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limit = rateLimit(ip);
    if (!limit.allowed) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429, headers: limit.retryAfter ? { 'Retry-After': String(limit.retryAfter) } : {} }
      );
    }

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

    if (data.website) {
      return NextResponse.json({ success: true, message: 'Request received successfully', id: 'RFQ-OK' });
    }

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

    try {
      await sendLeadNotificationEmail({ ...insertPayload, reference_id: saved.reference_id });
    } catch (emailErr) {
      console.error('[Contact] Email notification failed:', emailErr);
    }

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
