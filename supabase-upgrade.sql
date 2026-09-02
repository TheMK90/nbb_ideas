-- Bank Ideas — upgrade + example data.
-- Paste this into the Supabase SQL editor and press Run. Safe to run once.
--
-- It does two things:
--   1. adds the `category` column the insights charts group by
--   2. seeds fourteen example ideas, spread over the last eight weeks, so the
--      board and its charts have something real to show.

-- 1. Category ------------------------------------------------------------

alter table ideas
  add column if not exists category text not null default 'Operations'
  check (category in (
    'Digital Banking',
    'Customer Experience',
    'Operations',
    'Sustainability',
    'Risk & Compliance'
  ));

-- 2. Example data --------------------------------------------------------

insert into ideas (title, description, author, category, status, votes, created_at) values
  ('Arabic-first mobile onboarding',
   'Let new customers open an account entirely in Arabic on mobile, including document capture and the terms summary.',
   'Layla Ahmed', 'Digital Banking', 'Approved', 47, now() - interval '54 days'),

  ('Same-day card replacement at branches',
   'Print and activate replacement debit cards in branch instead of posting them, cutting a five-day wait to fifteen minutes.',
   'Omar Hassan', 'Customer Experience', 'Implemented', 61, now() - interval '49 days'),

  ('Paperless account opening',
   'Replace the printed application pack with a signed digital form. Saves roughly 40,000 sheets of paper a year.',
   'Fatima Al Sayed', 'Sustainability', 'Implemented', 38, now() - interval '45 days'),

  ('Salary advance for SME payroll clients',
   'Offer employees of our SME payroll customers a small advance against confirmed salary, repaid automatically on payday.',
   'Yousif Khalid', 'Digital Banking', 'Under Review', 29, now() - interval '38 days'),

  ('Branch queue predictor in the app',
   'Show live and predicted branch waiting times so customers can pick a quieter time or a nearer branch.',
   'Noor Abdulla', 'Customer Experience', 'Approved', 42, now() - interval '35 days'),

  ('Automated sanctions screening triage',
   'Score screening alerts by risk so analysts open the ones that matter first instead of working a flat queue.',
   'Hessa Al Mannai', 'Risk & Compliance', 'Under Review', 24, now() - interval '31 days'),

  ('Solar canopies over branch car parks',
   'Cover staff and customer parking with solar canopies — shade in summer and a measurable cut in grid draw.',
   'Ali Rashed', 'Sustainability', 'Under Review', 33, now() - interval '28 days'),

  ('One-tap standing order changes',
   'Let customers pause, resize or cancel a standing order from the transaction itself, without a service request.',
   'Mariam Juma', 'Digital Banking', 'Approved', 51, now() - interval '24 days'),

  ('Shared onboarding checklist for corporate clients',
   'Give corporate clients a live checklist of outstanding documents instead of a chain of emails.',
   'Khalid Nasser', 'Operations', 'Under Review', 19, now() - interval '20 days'),

  ('Voice authentication for the call centre',
   'Authenticate callers by voice in the first ten seconds and drop the security question script.',
   'Sara Ebrahim', 'Customer Experience', 'Submitted', 27, now() - interval '16 days'),

  ('Merge duplicate KYC document requests',
   'Check what the bank already holds before asking a customer for a document again.',
   'Ahmed Salman', 'Operations', 'Submitted', 22, now() - interval '12 days'),

  ('Carbon footprint on card statements',
   'Show an estimated carbon figure per spending category, with one suggested change each month.',
   'Dana Al Khalifa', 'Sustainability', 'Submitted', 16, now() - interval '9 days'),

  ('Fraud alerts customers can answer',
   'Replace the do-not-reply fraud SMS with an in-app prompt the customer can confirm or reject in one tap.',
   'Jassim Bucheeri', 'Risk & Compliance', 'Submitted', 31, now() - interval '5 days'),

  ('Retire the internal fax gateway',
   'Fourteen processes still route through fax. Map them, move them to secure email, and switch the gateway off.',
   'Reem Al Doseri', 'Operations', 'Submitted', 12, now() - interval '2 days');

-- A few comments so threads are not empty.
insert into comments (idea_id, author, text, created_at)
select id, 'Huda Salem',
       'Retail has asked for this in every quarterly review. Strong support from the branch network.',
       created_at + interval '2 days'
from ideas where title = 'Arabic-first mobile onboarding';

insert into comments (idea_id, author, text, created_at)
select id, 'Mohammed Tariq',
       'We piloted this in two branches last quarter — the card printer paid for itself in avoided courier costs.',
       created_at + interval '3 days'
from ideas where title = 'Same-day card replacement at branches';

insert into comments (idea_id, author, text, created_at)
select id, 'Aisha Kanoo',
       'Worth checking against the record retention policy before we drop the printed pack entirely.',
       created_at + interval '1 day'
from ideas where title = 'Paperless account opening';

insert into comments (idea_id, author, text, created_at)
select id, 'Nasser Al Binali',
       'The alert volume is the real problem. Even a rough risk score would help the team a lot.',
       created_at + interval '4 days'
from ideas where title = 'Automated sanctions screening triage';

insert into comments (idea_id, author, text, created_at)
select id, 'Zahra Mahmood',
       'Please make the confirmation prompt work offline too — customers abroad hit this most.',
       created_at + interval '1 day'
from ideas where title = 'Fraud alerts customers can answer';
