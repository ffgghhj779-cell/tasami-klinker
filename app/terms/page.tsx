import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions | TASAMI INDUSTRIAL',
  description: 'Terms and conditions for TASAMI INDUSTRIAL website and services.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-bg-alt py-16 px-4">
      <div className="container max-w-3xl">
        <Link href="/" className="text-sm font-bold text-primary hover:underline mb-8 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-text-main mb-2">Terms & Conditions</h1>
        <p className="text-sm text-text-secondary mb-10 font-english">الشروط والأحكام</p>

        <div className="prose prose-sm max-w-none space-y-6 text-text-secondary leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-text-main mb-2">General</h2>
            <p>
              This website is operated by TASAMI INDUSTRIAL for business-to-business clinker supply
              information and quote requests. By using this site, you agree to these terms.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-text-main mb-2">Quotations & Orders</h2>
            <p>
              Information on this site is indicative. Binding offers are issued separately following
              verification of quantity, destination, and payment terms. Standard payment is via
              Letter of Credit (LC) at sight unless otherwise agreed in writing.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-text-main mb-2">Technical Documents</h2>
            <p>
              Downloaded specifications, certificates, and market reports are provided for evaluation
              purposes. Specifications on shipped product are governed by the applicable contract and
              SGS documentation per shipment.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-text-main mb-2">Governing Law</h2>
            <p>
              These terms are governed by the laws of the Kingdom of Saudi Arabia. Disputes shall be
              subject to the competent courts in the Kingdom.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
