-- Bank Ideas — Supabase schema.
-- Paste this into the Supabase SQL editor and press Run.

create table if not exists ideas (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null,
  author      text not null,
  category    text not null default 'Operations'
              check (category in ('Digital Banking', 'Customer Experience',
                                  'Operations', 'Sustainability', 'Risk & Compliance')),
  status      text not null default 'Submitted'
              check (status in ('Submitted', 'Under Review', 'Approved', 'Implemented')),
  votes       integer not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists comments (
  id         uuid primary key default gen_random_uuid(),
  idea_id    uuid not null references ideas(id) on delete cascade,
  author     text not null,
  text       text not null,
  created_at timestamptz not null default now()
);

create index if not exists comments_idea_id_idx on comments(idea_id);

-- Prototype access: this is an internal demo board with no login, so anyone
-- holding the anon key may read and write. Tighten these before real use.
alter table ideas    enable row level security;
alter table comments enable row level security;

create policy "anyone can read ideas"     on ideas    for select using (true);
create policy "anyone can add ideas"      on ideas    for insert with check (true);
create policy "anyone can update ideas"   on ideas    for update using (true);
create policy "anyone can read comments"  on comments for select using (true);
create policy "anyone can add comments"   on comments for insert with check (true);
