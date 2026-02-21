-- Run this in Supabase SQL Editor to create the vehicle_rentals table for rental requests.

create table if not exists public.vehicle_rentals (
  id uuid primary key default gen_random_uuid(),
  short_id text unique,
  vehicle_id text not null,
  vehicle_title text not null,
  traveler_name text not null,
  email text not null,
  start_date date not null,
  end_date date not null,
  pickup_location text not null,
  notes text,
  price_per_day numeric not null,
  total_price numeric not null,
  number_of_days int4 not null,
  created_at timestamptz default now()
);

alter table public.vehicle_rentals enable row level security;

create policy "Allow public read on vehicle_rentals"
  on public.vehicle_rentals for select
  using (true);

create policy "Allow insert for all"
  on public.vehicle_rentals for insert
  with check (true);
