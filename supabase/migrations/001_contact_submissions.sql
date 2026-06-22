-- TASAMI INDUSTRIAL: Contact form leads table
-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query)

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  reference_id text not null unique,
  company text not null,
  country_port text not null,
  quantity text not null,
  email text not null,
  phone text not null,
  notes text,
  lang text check (lang in ('ar', 'en')),
  created_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

create index if not exists contact_submissions_email_idx
  on public.contact_submissions (email);

alter table public.contact_submissions enable row level security;

-- No public RLS policies: the Next.js server uses the service role key.
-- Do not expose SUPABASE_SERVICE_ROLE_KEY to the browser.

comment on table public.contact_submissions is 'RFQ / contact form leads from tasami-industrial.com';
