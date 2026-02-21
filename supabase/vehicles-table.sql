-- Run this in Supabase SQL Editor to create the vehicles table and seed 15 vehicles.

-- Create table
create table if not exists public.vehicles (
  id text primary key,
  title text not null,
  description text not null,
  image_url text not null,
  vehicle_type text not null,
  brand text not null,
  model text not null,
  year int4 not null,
  transmission text not null,
  fuel_type text not null,
  seats int4 not null,
  price_per_day numeric not null,
  rating numeric not null,
  location text not null,
  features jsonb not null default '[]',
  is_available boolean not null default true,
  gallery_urls jsonb not null default '[]',
  created_at timestamptz default now()
);

alter table public.vehicles enable row level security;

create policy "Allow public read on vehicles"
  on public.vehicles for select
  using (true);

-- Seed vehicles (Picsum images for reliability)
truncate table public.vehicles;

insert into public.vehicles (id, title, description, image_url, vehicle_type, brand, model, year, transmission, fuel_type, seats, price_per_day, rating, location, features, is_available) values
('v1', 'Toyota Land Cruiser Prado', 'Experience luxury and power with this premium SUV, perfect for exploring Sri Lanka''s diverse terrain.', 'https://picsum.photos/seed/vehicle-v1/800/600', 'SUV', 'Toyota', 'Land Cruiser Prado', 2023, 'Automatic', 'Diesel', 7, 120, 4.9, 'Colombo', '["GPS Navigation", "Leather Seats", "Climate Control", "Bluetooth"]', true),
('v2', 'Honda Civic Elegance', 'Sleek and fuel-efficient sedan ideal for city tours and comfortable long-distance travel.', 'https://picsum.photos/seed/vehicle-v2/800/600', 'Sedan', 'Honda', 'Civic', 2024, 'Automatic', 'Petrol', 5, 65, 4.7, 'Colombo', '["Apple CarPlay", "Backup Camera", "Cruise Control", "USB Ports"]', true),
('v3', 'Mercedes-Benz E-Class', 'Premium luxury sedan with cutting-edge technology and superior comfort for executive travel.', 'https://picsum.photos/seed/vehicle-v3/800/600', 'Luxury', 'Mercedes-Benz', 'E-Class', 2024, 'Automatic', 'Petrol', 5, 180, 4.9, 'Colombo', '["Massage Seats", "Panoramic Roof", "Premium Sound", "WiFi Hotspot"]', true),
('v4', 'Toyota Hiace Grand Cabin', 'Spacious van perfect for group travel, family trips, and airport transfers with ample luggage space.', 'https://picsum.photos/seed/vehicle-v4/800/600', 'Van', 'Toyota', 'Hiace', 2023, 'Automatic', 'Diesel', 12, 95, 4.6, 'Airport', '["Air Conditioning", "Large Luggage Space", "USB Charging", "Tinted Windows"]', true),
('v5', 'Suzuki Swift Sport', 'Compact and agile hatchback, perfect for navigating city streets and tight parking spaces.', 'https://picsum.photos/seed/vehicle-v5/800/600', 'Compact', 'Suzuki', 'Swift', 2024, 'Manual', 'Petrol', 5, 35, 4.5, 'Kandy', '["Fuel Efficient", "Easy Parking", "Bluetooth", "ABS Brakes"]', true),
('v6', 'BMW 3 Series Convertible', 'Feel the wind in your hair as you cruise along Sri Lanka''s scenic coastal roads.', 'https://picsum.photos/seed/vehicle-v6/800/600', 'Convertible', 'BMW', '3 Series', 2023, 'Automatic', 'Petrol', 4, 200, 4.8, 'Galle', '["Soft Top", "Sport Mode", "Premium Audio", "Heated Seats"]', true),
('v7', 'Porsche 911 Carrera', 'Legendary sports car for the ultimate driving experience on Sri Lanka''s winding mountain roads.', 'https://picsum.photos/seed/vehicle-v7/800/600', 'Sports', 'Porsche', '911 Carrera', 2024, 'Automatic', 'Petrol', 2, 350, 5.0, 'Colombo', '["Sport Exhaust", "Launch Control", "Track Mode", "Carbon Fiber Interior"]', true),
('v8', 'Toyota Prius Hybrid', 'Eco-friendly hybrid vehicle with excellent fuel economy for environmentally conscious travelers.', 'https://picsum.photos/seed/vehicle-v8/800/600', 'Sedan', 'Toyota', 'Prius', 2024, 'Automatic', 'Hybrid', 5, 55, 4.6, 'Colombo', '["Eco Mode", "Regenerative Braking", "Smart Key", "Touch Display"]', true),
('v9', 'Tesla Model 3', 'All-electric premium sedan with cutting-edge autopilot features and zero emissions.', 'https://picsum.photos/seed/vehicle-v9/800/600', 'Sedan', 'Tesla', 'Model 3', 2024, 'Automatic', 'Electric', 5, 150, 4.9, 'Colombo', '["Autopilot", "Supercharging", "Glass Roof", "Premium Connectivity"]', true),
('v10', 'Nissan X-Trail Adventure', 'Versatile crossover SUV ideal for both city driving and off-road adventures.', 'https://picsum.photos/seed/vehicle-v10/800/600', 'SUV', 'Nissan', 'X-Trail', 2023, 'Automatic', 'Petrol', 7, 85, 4.5, 'Kandy', '["All-Wheel Drive", "Roof Rails", "Hill Start Assist", "360° Camera"]', true),
('v11', 'Range Rover Velar', 'Ultimate luxury SUV combining sophisticated design with exceptional performance.', 'https://picsum.photos/seed/vehicle-v11/800/600', 'Luxury', 'Land Rover', 'Range Rover Velar', 2024, 'Automatic', 'Diesel', 5, 250, 4.9, 'Colombo', '["Terrain Response", "Air Suspension", "Meridian Sound", "Head-Up Display"]', true),
('v12', 'Honda Fit City Runner', 'Ultra-compact hatchback with surprising interior space and excellent maneuverability.', 'https://picsum.photos/seed/vehicle-v12/800/600', 'Compact', 'Honda', 'Fit', 2023, 'Manual', 'Petrol', 5, 30, 4.4, 'Ella', '["Magic Seats", "Eco Assist", "Multi-Angle Camera", "Lane Watch"]', true),
('v13', 'Mercedes-Benz V-Class', 'Premium luxury van offering first-class comfort for VIP transfers and family groups.', 'https://picsum.photos/seed/vehicle-v13/800/600', 'Van', 'Mercedes-Benz', 'V-Class', 2024, 'Automatic', 'Diesel', 8, 180, 4.8, 'Colombo', '["Captain Seats", "Ambient Lighting", "Privacy Glass", "Electric Doors"]', true),
('v14', 'Mazda MX-5 Miata', 'Classic roadster delivering pure driving joy on coastal roads and scenic routes.', 'https://picsum.photos/seed/vehicle-v14/800/600', 'Convertible', 'Mazda', 'MX-5 Miata', 2024, 'Manual', 'Petrol', 2, 110, 4.7, 'Bentota', '["Retractable Hardtop", "Bose Audio", "Sport Suspension", "Limited Slip Diff"]', true),
('v15', 'Audi RS6 Avant', 'High-performance sports wagon combining practicality with supercar-level speed.', 'https://picsum.photos/seed/vehicle-v15/800/600', 'Sports', 'Audi', 'RS6 Avant', 2024, 'Automatic', 'Petrol', 5, 280, 4.9, 'Colombo', '["Quattro AWD", "Matrix LED", "Virtual Cockpit", "Sport Differential"]', true);
