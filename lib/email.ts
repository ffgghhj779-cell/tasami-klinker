import { Resend } from 'resend';
import type { ContactSubmissionInsert } from '@/lib/types/database';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendLeadNotificationEmail(
  lead: ContactSubmissionInsert & { reference_id: string }
): Promise<void> {
  if (!resend || !process.env.RESEND_NOTIFY_EMAIL) return;

  const from = process.env.RESEND_FROM_EMAIL || 'TASAMI <onboarding@resend.dev>';

  await resend.emails.send({
    from,
    to: process.env.RESEND_NOTIFY_EMAIL,
    subject: `New RFQ: ${lead.reference_id} — ${lead.company}`,
    html: `
      <h2>New Quote Request — TASAMI INDUSTRIAL</h2>
      <p><strong>Reference:</strong> ${lead.reference_id}</p>
      <p><strong>Company:</strong> ${lead.company}</p>
      <p><strong>Country & Port:</strong> ${lead.country_port}</p>
      <p><strong>Quantity:</strong> ${lead.quantity}</p>
      <p><strong>Email:</strong> <a href="mailto:${lead.email}">${lead.email}</a></p>
      <p><strong>Phone:</strong> ${lead.phone}</p>
      <p><strong>Notes:</strong> ${lead.notes || '—'}</p>
      <p><strong>Language:</strong> ${lead.lang || '—'}</p>
      <hr />
      <p style="color:#666;font-size:12px;">View all leads in the admin dashboard.</p>
    `,
  });
}
