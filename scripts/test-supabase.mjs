/**
 * Quick connectivity test for Supabase (run: node --env-file=.env.local scripts/test-supabase.mjs)
 */
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const testRef = `RFQ-TEST-${Date.now()}`;

const { data, error } = await supabase
  .from('contact_submissions')
  .insert({
    reference_id: testRef,
    company: 'Test Company Ltd',
    country_port: 'Syria / Latakia',
    quantity: '5,000 tons',
    email: 'test@example.com',
    phone: '+966500000000',
    notes: 'Automated connection test — safe to delete',
    lang: 'en',
  })
  .select('id, reference_id, created_at')
  .single();

if (error) {
  console.error('INSERT FAILED:', error.message);
  if (error.message?.includes('contact_submissions') || error.code === '42P01') {
    console.error('\nTable may not exist. Run supabase/migrations/001_contact_submissions.sql in Supabase SQL Editor.');
  }
  process.exit(1);
}

console.log('INSERT OK:', data);

const { count, error: countError } = await supabase
  .from('contact_submissions')
  .select('*', { count: 'exact', head: true });

if (countError) {
  console.error('COUNT FAILED:', countError.message);
  process.exit(1);
}

console.log('TOTAL ROWS:', count);

// Clean up test row
await supabase.from('contact_submissions').delete().eq('reference_id', testRef);
console.log('Test row deleted. Supabase connection verified.');
