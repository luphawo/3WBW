drop table if exists articles cascade;
drop table if exists incidents cascade;
drop table if exists alerts cascade;
drop table if exists notices cascade;
drop table if exists levy_months cascade;
drop table if exists residents cascade;
drop table if exists media cascade;

create table if not exists alerts (
  "id" text primary key,
  "type" text not null,
  "title" text not null,
  "message" text not null,
  "createdAt" text not null,
  "expiresAt" text,
  "active" boolean not null default true,
  "priority" text not null
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
  "id" text primary key,
  "type" text not null,
  "title" text not null,
  "description" text not null,
  "status" text not null,
  "reportedAt" text not null,
  "updatedAt" text not null,
  "reportedBy" text not null,
  "location" text not null,
  "priority" text not null
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
  "id" text primary key,
  "title" text not null,
  "content" text not null,
  "type" text not null,
  "pinned" boolean not null default false,
  "createdAt" text not null,
  "expiresAt" text,
  "author" text not null
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
  "id" text primary key,
  "monthLabel" text not null,
  "streetCounts" jsonb not null default '[]'::jsonb
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
  "id" text primary key,
  "name" text not null,
  "unit" text not null default '',
  "street" text not null,
  "role" text not null,
  "avatar" text,
  "bio" text,
  "joinedAt" text not null,
  "verified" boolean not null default false
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
  "id" text primary key,
  "src" text not null,
  "category" text not null,
  "caption" text not null default '',
  "width" integer,
  "height" integer,
  "hidden" boolean not null default false
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
  "id" text primary key,
  "title" text not null,
  "slug" text not null,
  "excerpt" text not null,
  "content" text not null,
  "category" jsonb not null,
  "author" jsonb not null,
  "coverImage" text not null,
  "publishedAt" text not null,
  "featured" boolean not null default false,
  "tags" jsonb not null default '[]'::jsonb,
  "readTime" integer not null default 1,
  "comments" jsonb not null default '[]'::jsonb
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
