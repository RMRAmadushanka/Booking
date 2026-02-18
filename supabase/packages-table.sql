-- Run this in Supabase SQL Editor to create the packages table and seed 15 packages.

-- Create table
create table if not exists public.packages (
  id text primary key,
  title text not null,
  description text not null,
  image_url text not null,
  package_type text not null,
  destinations jsonb not null default '[]',
  duration text not null,
  price numeric not null,
  rating numeric not null,
  best_for jsonb not null default '[]',
  highlights jsonb not null default '[]',
  created_at timestamptz default now()
);

-- Enable read for everyone (no auth required for listing packages)
alter table public.packages enable row level security;

create policy "Allow public read on packages"
  on public.packages for select
  using (true);

-- Optional: only allow insert/update with service role (no policy = only service_role)
-- So no need for insert policy for anon users.

-- Truncate and seed (run after table exists)
truncate table public.packages;

insert into public.packages (id, title, description, image_url, package_type, destinations, duration, price, rating, best_for, highlights) values
('1', 'Cultural Triangle Explorer', 'Discover the ancient wonders of Sri Lanka''s Cultural Triangle, including Sigiriya Rock Fortress, ancient cities of Anuradhapura and Polonnaruwa, and the sacred city of Kandy.', 'https://picsum.photos/seed/pkg1/800/600', 'Cultural Tours', '["Kandy", "Sigiriya", "Colombo"]', '7-10 Days', 1200, 4.8, '["Family", "Couples"]', '["Sigiriya Rock", "Temple of the Tooth", "Ancient Cities"]'),
('2', 'Tea Country & Mountain Adventure', 'Experience the breathtaking beauty of Sri Lanka''s hill country, from the misty tea plantations of Nuwara Eliya to the scenic train journey to Ella.', 'https://picsum.photos/seed/pkg2/800/600', 'Adventure Tours', '["Nuwara Eliya", "Ella", "Kandy"]', '4-6 Days', 850, 4.9, '["Couples", "Solo Travelers"]', '["Tea Plantations", "Nine Arch Bridge", "Mountain Views"]'),
('3', 'Wildlife Safari Adventure', 'Embark on an unforgettable safari in Yala National Park, home to leopards, elephants, and diverse birdlife, combined with beach relaxation in Galle.', 'https://picsum.photos/seed/pkg3/800/600', 'Wildlife Tours', '["Yala", "Galle"]', '4-6 Days', 950, 4.7, '["Family", "Groups"]', '["Leopard Spotting", "Elephant Herds", "Bird Watching"]'),
('4', 'Tropical Beach Paradise', 'Relax on pristine beaches in Bentota and Galle, enjoy water sports, explore colonial architecture, and indulge in fresh seafood.', 'https://picsum.photos/seed/pkg4/800/600', 'Beach Holidays', '["Bentota", "Galle"]', '4-6 Days', 700, 4.6, '["Couples", "Family"]', '["Beach Relaxation", "Water Sports", "Colonial Fort"]'),
('5', 'Romantic Honeymoon Escape', 'A luxurious romantic getaway featuring private beach villas, candlelit dinners, spa treatments, and exclusive experiences for couples.', 'https://picsum.photos/seed/pkg5/800/600', 'Honeymoon Packages', '["Bentota", "Ella"]', '7-10 Days', 1800, 4.9, '["Couples"]', '["Private Villas", "Spa Treatments", "Romantic Dinners"]'),
('6', 'Luxury Heritage Journey', 'Experience Sri Lanka in ultimate luxury with 5-star accommodations, private guides, exclusive access to heritage sites, and fine dining.', 'https://picsum.photos/seed/pkg6/800/600', 'Luxury Tours', '["Kandy", "Sigiriya", "Colombo", "Galle"]', '10+ Days', 3500, 5.0, '["Couples", "Groups"]', '["5-Star Hotels", "Private Guides", "Fine Dining"]'),
('7', 'Quick Colombo & Kandy Tour', 'A short but comprehensive tour covering the capital Colombo and the cultural capital Kandy, perfect for first-time visitors.', 'https://picsum.photos/seed/pkg7/800/600', 'Cultural Tours', '["Colombo", "Kandy"]', '1-3 Days', 450, 4.5, '["Solo Travelers", "Couples"]', '["Temple of the Tooth", "Colombo City Tour", "Cultural Shows"]'),
('8', 'Adventure & Wildlife Combo', 'Combine thrilling adventures in the hill country with exciting wildlife safaris in Yala National Park for the ultimate Sri Lankan experience.', 'https://picsum.photos/seed/pkg8/800/600', 'Adventure Tours', '["Ella", "Yala", "Nuwara Eliya"]', '7-10 Days', 1100, 4.8, '["Groups", "Family"]', '["Hiking", "Safari", "Scenic Trains"]'),
('9', 'Beach & Wildlife Discovery', 'Explore the southern coast beaches and embark on wildlife safaris, combining relaxation with adventure in one perfect package.', 'https://picsum.photos/seed/pkg9/800/600', 'Wildlife Tours', '["Bentota", "Yala", "Galle"]', '7-10 Days', 1050, 4.7, '["Family", "Couples"]', '["Beach Time", "Safari", "Turtle Watching"]'),
('10', 'Luxury Beach Retreat', 'Indulge in a premium beachfront experience with world-class resorts, private beaches, spa treatments, and gourmet cuisine.', 'https://picsum.photos/seed/pkg10/800/600', 'Luxury Tours', '["Bentota", "Galle"]', '4-6 Days', 2200, 4.9, '["Couples"]', '["5-Star Resorts", "Private Beaches", "Spa & Wellness"]'),
('11', 'Complete Island Explorer', 'The ultimate comprehensive tour covering all major destinations from cultural sites to beaches, wildlife, and hill country.', 'https://picsum.photos/seed/pkg11/800/600', 'Cultural Tours', '["Colombo", "Kandy", "Sigiriya", "Ella", "Nuwara Eliya", "Yala", "Galle", "Bentota"]', '10+ Days', 2500, 4.8, '["Groups", "Family"]', '["All Major Sites", "Complete Experience", "Flexible Itinerary"]'),
('12', 'Romantic Hill Country', 'A romantic journey through the misty mountains, tea plantations, and scenic landscapes perfect for couples seeking tranquility.', 'https://picsum.photos/seed/pkg12/800/600', 'Honeymoon Packages', '["Nuwara Eliya", "Ella", "Kandy"]', '7-10 Days', 1600, 4.9, '["Couples"]', '["Tea Estates", "Mountain Views", "Romantic Stays"]'),
('13', 'Family Fun Explorer', 'Designed for families with kids: wildlife safaris, beach days, cultural shows, and comfortable stays suitable for all ages.', 'https://picsum.photos/seed/pkg13/800/600', 'Cultural Tours', '["Colombo", "Kandy", "Bentota"]', '7-10 Days', 1350, 4.7, '["Family"]', '["Kid-Friendly Activities", "Beach & Safari", "Cultural Shows"]'),
('14', 'Solo Backpacker Trail', 'A budget-friendly adventure for solo travelers: hostels, trains, and key highlights from Colombo to Ella and the coast.', 'https://picsum.photos/seed/pkg14/800/600', 'Adventure Tours', '["Colombo", "Kandy", "Ella", "Galle"]', '7-10 Days', 650, 4.6, '["Solo Travelers"]', '["Scenic Trains", "Budget Stays", "Flexible Itinerary"]'),
('15', 'Wellness & Nature Retreat', 'Rejuvenate with yoga, nature walks, and peaceful stays in the hills and by the ocean. Ideal for mindfulness and relaxation.', 'https://picsum.photos/seed/pkg15/800/600', 'Luxury Tours', '["Ella", "Nuwara Eliya", "Bentota"]', '7-10 Days', 1900, 4.9, '["Couples", "Solo Travelers"]', '["Yoga & Meditation", "Nature Walks", "Spa & Wellness"]');
