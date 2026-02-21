-- Run this in Supabase SQL Editor to add short_id column to bookings and vehicle_rentals.
-- After this, new bookings/rentals will get a simple ID like BK-7x2Kp9 or VR-M3nQ8r.

-- Bookings: add short_id (optional; existing rows stay with long uuid, new rows get short_id from the app)
alter table public.bookings
  add column if not exists short_id text unique;

-- Vehicle rentals: add short_id
alter table public.vehicle_rentals
  add column if not exists short_id text unique;
