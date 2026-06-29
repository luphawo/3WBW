create table if not exists alerts (
  id text primary key,
  type text not null check (type in ('emergency', 'warning', 'info', 'update')),
  title text not null,
  message text not null,
  created_at text not null,
  expires_at text,
  active boolean not null default true,
  priority text not null check (priority in ('low', 'medium', 'high', 'critical'))
);

alter table alerts enable row level security;

create policy "Anyone can read alerts"
  on alerts for select using (true);

create policy "Admin can insert alerts"
  on alerts for insert with check (true);

create policy "Admin can update alerts"
  on alerts for update using (true);

create policy "Admin can delete alerts"
  on alerts for delete using (true);

create table if not exists incidents (
  id text primary key,
  type text not null check (type in ('security', 'safety', 'maintenance', 'general')),
  title text not null,
  description text not null,
  status text not null check (status in ('open', 'investigating', 'resolved')),
  reported_at text not null,
  updated_at text not null,
  reported_by text not null,
  location text not null,
  priority text not null check (priority in ('low', 'medium', 'high', 'critical'))
);

alter table incidents enable row level security;

create policy "Anyone can read incidents"
  on incidents for select using (true);

create policy "Anyone can insert incidents"
  on incidents for insert with check (true);

create policy "Admin can update incidents"
  on incidents for update using (true);

create policy "Admin can delete incidents"
  on incidents for delete using (true);

create table if not exists notices (
  id text primary key,
  title text not null,
  content text not null,
  type text not null check (type in ('notice', 'announcement', 'warning')),
  pinned boolean not null default false,
  created_at text not null,
  expires_at text,
  author text not null
);

alter table notices enable row level security;

create policy "Anyone can read notices"
  on notices for select using (true);

create policy "Admin can insert notices"
  on notices for insert with check (true);

create policy "Admin can update notices"
  on notices for update using (true);

create policy "Admin can delete notices"
  on notices for delete using (true);

create table if not exists levy_months (
  id text primary key,
  month_label text not null,
  street_counts jsonb not null default '[]'::jsonb
);

alter table levy_months enable row level security;

create policy "Anyone can read levy_months"
  on levy_months for select using (true);

create policy "Admin can insert levy_months"
  on levy_months for insert with check (true);

create policy "Admin can update levy_months"
  on levy_months for update using (true);

create policy "Admin can delete levy_months"
  on levy_months for delete using (true);

create table if not exists residents (
  id text primary key,
  name text not null,
  unit text not null default '',
  street text not null,
  role text not null check (role in ('resident', 'trustee', 'admin')),
  avatar text,
  bio text,
  joined_at text not null,
  verified boolean not null default false
);

alter table residents enable row level security;

create policy "Anyone can read residents"
  on residents for select using (true);

create policy "Admin can insert residents"
  on residents for insert with check (true);

create policy "Admin can update residents"
  on residents for update using (true);

create policy "Admin can delete residents"
  on residents for delete using (true);

create table if not exists media (
  id text primary key,
  src text not null,
  category text not null,
  caption text not null default '',
  width integer,
  height integer,
  hidden boolean not null default false
);

alter table media enable row level security;

create policy "Anyone can read media"
  on media for select using (true);

create policy "Admin can insert media"
  on media for insert with check (true);

create policy "Admin can update media"
  on media for update using (true);

create policy "Admin can delete media"
  on media for delete using (true);

create table if not exists articles (
  id text primary key,
  title text not null,
  slug text not null,
  excerpt text not null,
  content text not null,
  category jsonb not null,
  author jsonb not null,
  cover_image text not null,
  published_at text not null,
  featured boolean not null default false,
  tags jsonb not null default '[]'::jsonb,
  read_time integer not null default 1,
  comments jsonb not null default '[]'::jsonb
);

alter table articles enable row level security;

create policy "Anyone can read articles"
  on articles for select using (true);

create policy "Admin can insert articles"
  on articles for insert with check (true);

create policy "Admin can update articles"
  on articles for update using (true);

create policy "Admin can delete articles"
  on articles for delete using (true);
