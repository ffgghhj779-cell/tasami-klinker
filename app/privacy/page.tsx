import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | TASAMI INDUSTRIAL',
  description: 'Privacy policy for TASAMI INDUSTRIAL website and contact services.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-bg-alt py-16 px-4">
      <div className="container max-w-3xl">
        <Link href="/" className="text-sm font-bold text-primary hover:underline mb-8 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-text-main mb-2">Privacy Policy</h1>
        <p className="text-sm text-text-secondary mb-10 font-english">سياسة الخصوصية</p>

        <div className="prose prose-sm max-w-none space-y-6 text-text-secondary leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-text-main mb-2">Information We Collect</h2>
            <p>
              When you submit a quote request through our contact form, we collect your company name,
              country and port, quantity requirements, email, phone number, and any optional notes you provide.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-text-main mb-2">How We Use Your Data</h2>
            <p>
              We use submitted information solely to respond to your inquiry, prepare quotations,
              and coordinate clinker supply. We do not sell your personal data to third parties.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-text-main mb-2">Data Storage</h2>
            <p>
              Submissions are stored securely in our database infrastructure. Access is restricted to
              authorized TASAMI INDUSTRIAL personnel.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-text-main mb-2">Contact</h2>
            <p>
              For privacy-related questions, email{' '}
              <a href="mailto:info@tasami-industrial.com" className="text-primary font-semibold">
                info@tasami-industrial.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
