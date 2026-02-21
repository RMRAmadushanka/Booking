-- Add gallery and destination_detail columns and populate from DB.
-- Run this after packages-table.sql (or if table already exists without these columns).

alter table public.packages
  add column if not exists gallery_urls jsonb not null default '[]',
  add column if not exists destination_details jsonb not null default '[]';

-- Destination detail snippets (name, description, image_url) for building destination_details.
-- We update each package with gallery_urls (4 images) and destination_details per stop.

update public.packages set
  gallery_urls = '["https://picsum.photos/seed/pkg1/800/600","https://picsum.photos/seed/pkg1-1/1200/800","https://picsum.photos/seed/pkg1-2/1200/800","https://picsum.photos/seed/pkg1-3/1200/800"]'::jsonb,
  destination_details = '[
    {"name":"Kandy","description":"A cultural hill city known for the Temple of the Tooth and scenic lake views—perfect for heritage, local food, and relaxed evenings.","image_url":"https://picsum.photos/seed/kandy/1200/800"},
    {"name":"Sigiriya","description":"Home to the iconic Sigiriya Rock Fortress—expect panoramic viewpoints, ancient history, and nearby nature trails.","image_url":"https://picsum.photos/seed/sigiriya/1200/800"},
    {"name":"Colombo","description":"Sri Lanka''s commercial capital—great for city highlights, markets, coastal sunsets, and a smooth start/end point for your trip.","image_url":"https://picsum.photos/seed/colombo/1200/800"}
  ]'::jsonb
where id = '1';

update public.packages set
  gallery_urls = '["https://picsum.photos/seed/pkg2/800/600","https://picsum.photos/seed/pkg2-1/1200/800","https://picsum.photos/seed/pkg2-2/1200/800","https://picsum.photos/seed/pkg2-3/1200/800"]'::jsonb,
  destination_details = '[
    {"name":"Nuwara Eliya","description":"Tea country charm with misty mornings, colonial-era vibes, and lush plantations—ideal for calm scenic stops.","image_url":"https://picsum.photos/seed/nuwara-eliya/1200/800"},
    {"name":"Ella","description":"A laid-back mountain town with tea estates, hikes, and viewpoints—famous for scenic landscapes and cool weather.","image_url":"https://picsum.photos/seed/ella/1200/800"},
    {"name":"Kandy","description":"A cultural hill city known for the Temple of the Tooth and scenic lake views—perfect for heritage, local food, and relaxed evenings.","image_url":"https://picsum.photos/seed/kandy/1200/800"}
  ]'::jsonb
where id = '2';

update public.packages set
  gallery_urls = '["https://picsum.photos/seed/pkg3/800/600","https://picsum.photos/seed/pkg3-1/1200/800","https://picsum.photos/seed/pkg3-2/1200/800","https://picsum.photos/seed/pkg3-3/1200/800"]'::jsonb,
  destination_details = '[
    {"name":"Yala","description":"Sri Lanka''s top safari region—spot elephants, birds, and (with luck) leopards on guided game drives.","image_url":"https://picsum.photos/seed/yala/1200/800"},
    {"name":"Galle","description":"A coastal fort city with Dutch-colonial streets, cafés, and ocean views—great for photography and relaxed walks.","image_url":"https://picsum.photos/seed/galle/1200/800"}
  ]'::jsonb
where id = '3';

update public.packages set
  gallery_urls = '["https://picsum.photos/seed/pkg4/800/600","https://picsum.photos/seed/pkg4-1/1200/800","https://picsum.photos/seed/pkg4-2/1200/800","https://picsum.photos/seed/pkg4-3/1200/800"]'::jsonb,
  destination_details = '[
    {"name":"Bentota","description":"A beach destination for unwinding—enjoy calm sea days, river activities, and easy resort-style relaxation.","image_url":"https://picsum.photos/seed/bentota/1200/800"},
    {"name":"Galle","description":"A coastal fort city with Dutch-colonial streets, cafés, and ocean views—great for photography and relaxed walks.","image_url":"https://picsum.photos/seed/galle/1200/800"}
  ]'::jsonb
where id = '4';

update public.packages set
  gallery_urls = '["https://picsum.photos/seed/pkg5/800/600","https://picsum.photos/seed/pkg5-1/1200/800","https://picsum.photos/seed/pkg5-2/1200/800","https://picsum.photos/seed/pkg5-3/1200/800"]'::jsonb,
  destination_details = '[
    {"name":"Bentota","description":"A beach destination for unwinding—enjoy calm sea days, river activities, and easy resort-style relaxation.","image_url":"https://picsum.photos/seed/bentota/1200/800"},
    {"name":"Ella","description":"A laid-back mountain town with tea estates, hikes, and viewpoints—famous for scenic landscapes and cool weather.","image_url":"https://picsum.photos/seed/ella/1200/800"}
  ]'::jsonb
where id = '5';

update public.packages set
  gallery_urls = '["https://picsum.photos/seed/pkg6/800/600","https://picsum.photos/seed/pkg6-1/1200/800","https://picsum.photos/seed/pkg6-2/1200/800","https://picsum.photos/seed/pkg6-3/1200/800"]'::jsonb,
  destination_details = '[
    {"name":"Kandy","description":"A cultural hill city known for the Temple of the Tooth and scenic lake views—perfect for heritage, local food, and relaxed evenings.","image_url":"https://picsum.photos/seed/kandy/1200/800"},
    {"name":"Sigiriya","description":"Home to the iconic Sigiriya Rock Fortress—expect panoramic viewpoints, ancient history, and nearby nature trails.","image_url":"https://picsum.photos/seed/sigiriya/1200/800"},
    {"name":"Colombo","description":"Sri Lanka''s commercial capital—great for city highlights, markets, coastal sunsets, and a smooth start/end point for your trip.","image_url":"https://picsum.photos/seed/colombo/1200/800"},
    {"name":"Galle","description":"A coastal fort city with Dutch-colonial streets, cafés, and ocean views—great for photography and relaxed walks.","image_url":"https://picsum.photos/seed/galle/1200/800"}
  ]'::jsonb
where id = '6';

update public.packages set
  gallery_urls = '["https://picsum.photos/seed/pkg7/800/600","https://picsum.photos/seed/pkg7-1/1200/800","https://picsum.photos/seed/pkg7-2/1200/800","https://picsum.photos/seed/pkg7-3/1200/800"]'::jsonb,
  destination_details = '[
    {"name":"Colombo","description":"Sri Lanka''s commercial capital—great for city highlights, markets, coastal sunsets, and a smooth start/end point for your trip.","image_url":"https://picsum.photos/seed/colombo/1200/800"},
    {"name":"Kandy","description":"A cultural hill city known for the Temple of the Tooth and scenic lake views—perfect for heritage, local food, and relaxed evenings.","image_url":"https://picsum.photos/seed/kandy/1200/800"}
  ]'::jsonb
where id = '7';

update public.packages set
  gallery_urls = '["https://picsum.photos/seed/pkg8/800/600","https://picsum.photos/seed/pkg8-1/1200/800","https://picsum.photos/seed/pkg8-2/1200/800","https://picsum.photos/seed/pkg8-3/1200/800"]'::jsonb,
  destination_details = '[
    {"name":"Ella","description":"A laid-back mountain town with tea estates, hikes, and viewpoints—famous for scenic landscapes and cool weather.","image_url":"https://picsum.photos/seed/ella/1200/800"},
    {"name":"Yala","description":"Sri Lanka''s top safari region—spot elephants, birds, and (with luck) leopards on guided game drives.","image_url":"https://picsum.photos/seed/yala/1200/800"},
    {"name":"Nuwara Eliya","description":"Tea country charm with misty mornings, colonial-era vibes, and lush plantations—ideal for calm scenic stops.","image_url":"https://picsum.photos/seed/nuwara-eliya/1200/800"}
  ]'::jsonb
where id = '8';

update public.packages set
  gallery_urls = '["https://picsum.photos/seed/pkg9/800/600","https://picsum.photos/seed/pkg9-1/1200/800","https://picsum.photos/seed/pkg9-2/1200/800","https://picsum.photos/seed/pkg9-3/1200/800"]'::jsonb,
  destination_details = '[
    {"name":"Bentota","description":"A beach destination for unwinding—enjoy calm sea days, river activities, and easy resort-style relaxation.","image_url":"https://picsum.photos/seed/bentota/1200/800"},
    {"name":"Yala","description":"Sri Lanka''s top safari region—spot elephants, birds, and (with luck) leopards on guided game drives.","image_url":"https://picsum.photos/seed/yala/1200/800"},
    {"name":"Galle","description":"A coastal fort city with Dutch-colonial streets, cafés, and ocean views—great for photography and relaxed walks.","image_url":"https://picsum.photos/seed/galle/1200/800"}
  ]'::jsonb
where id = '9';

update public.packages set
  gallery_urls = '["https://picsum.photos/seed/pkg10/800/600","https://picsum.photos/seed/pkg10-1/1200/800","https://picsum.photos/seed/pkg10-2/1200/800","https://picsum.photos/seed/pkg10-3/1200/800"]'::jsonb,
  destination_details = '[
    {"name":"Bentota","description":"A beach destination for unwinding—enjoy calm sea days, river activities, and easy resort-style relaxation.","image_url":"https://picsum.photos/seed/bentota/1200/800"},
    {"name":"Galle","description":"A coastal fort city with Dutch-colonial streets, cafés, and ocean views—great for photography and relaxed walks.","image_url":"https://picsum.photos/seed/galle/1200/800"}
  ]'::jsonb
where id = '10';

update public.packages set
  gallery_urls = '["https://picsum.photos/seed/pkg11/800/600","https://picsum.photos/seed/pkg11-1/1200/800","https://picsum.photos/seed/pkg11-2/1200/800","https://picsum.photos/seed/pkg11-3/1200/800"]'::jsonb,
  destination_details = '[
    {"name":"Colombo","description":"Sri Lanka''s commercial capital—great for city highlights, markets, coastal sunsets, and a smooth start/end point for your trip.","image_url":"https://picsum.photos/seed/colombo/1200/800"},
    {"name":"Kandy","description":"A cultural hill city known for the Temple of the Tooth and scenic lake views—perfect for heritage, local food, and relaxed evenings.","image_url":"https://picsum.photos/seed/kandy/1200/800"},
    {"name":"Sigiriya","description":"Home to the iconic Sigiriya Rock Fortress—expect panoramic viewpoints, ancient history, and nearby nature trails.","image_url":"https://picsum.photos/seed/sigiriya/1200/800"},
    {"name":"Ella","description":"A laid-back mountain town with tea estates, hikes, and viewpoints—famous for scenic landscapes and cool weather.","image_url":"https://picsum.photos/seed/ella/1200/800"},
    {"name":"Nuwara Eliya","description":"Tea country charm with misty mornings, colonial-era vibes, and lush plantations—ideal for calm scenic stops.","image_url":"https://picsum.photos/seed/nuwara-eliya/1200/800"},
    {"name":"Yala","description":"Sri Lanka''s top safari region—spot elephants, birds, and (with luck) leopards on guided game drives.","image_url":"https://picsum.photos/seed/yala/1200/800"},
    {"name":"Galle","description":"A coastal fort city with Dutch-colonial streets, cafés, and ocean views—great for photography and relaxed walks.","image_url":"https://picsum.photos/seed/galle/1200/800"},
    {"name":"Bentota","description":"A beach destination for unwinding—enjoy calm sea days, river activities, and easy resort-style relaxation.","image_url":"https://picsum.photos/seed/bentota/1200/800"}
  ]'::jsonb
where id = '11';

update public.packages set
  gallery_urls = '["https://picsum.photos/seed/pkg12/800/600","https://picsum.photos/seed/pkg12-1/1200/800","https://picsum.photos/seed/pkg12-2/1200/800","https://picsum.photos/seed/pkg12-3/1200/800"]'::jsonb,
  destination_details = '[
    {"name":"Nuwara Eliya","description":"Tea country charm with misty mornings, colonial-era vibes, and lush plantations—ideal for calm scenic stops.","image_url":"https://picsum.photos/seed/nuwara-eliya/1200/800"},
    {"name":"Ella","description":"A laid-back mountain town with tea estates, hikes, and viewpoints—famous for scenic landscapes and cool weather.","image_url":"https://picsum.photos/seed/ella/1200/800"},
    {"name":"Kandy","description":"A cultural hill city known for the Temple of the Tooth and scenic lake views—perfect for heritage, local food, and relaxed evenings.","image_url":"https://picsum.photos/seed/kandy/1200/800"}
  ]'::jsonb
where id = '12';

update public.packages set
  gallery_urls = '["https://picsum.photos/seed/pkg13/800/600","https://picsum.photos/seed/pkg13-1/1200/800","https://picsum.photos/seed/pkg13-2/1200/800","https://picsum.photos/seed/pkg13-3/1200/800"]'::jsonb,
  destination_details = '[
    {"name":"Colombo","description":"Sri Lanka''s commercial capital—great for city highlights, markets, coastal sunsets, and a smooth start/end point for your trip.","image_url":"https://picsum.photos/seed/colombo/1200/800"},
    {"name":"Kandy","description":"A cultural hill city known for the Temple of the Tooth and scenic lake views—perfect for heritage, local food, and relaxed evenings.","image_url":"https://picsum.photos/seed/kandy/1200/800"},
    {"name":"Bentota","description":"A beach destination for unwinding—enjoy calm sea days, river activities, and easy resort-style relaxation.","image_url":"https://picsum.photos/seed/bentota/1200/800"}
  ]'::jsonb
where id = '13';

update public.packages set
  gallery_urls = '["https://picsum.photos/seed/pkg14/800/600","https://picsum.photos/seed/pkg14-1/1200/800","https://picsum.photos/seed/pkg14-2/1200/800","https://picsum.photos/seed/pkg14-3/1200/800"]'::jsonb,
  destination_details = '[
    {"name":"Colombo","description":"Sri Lanka''s commercial capital—great for city highlights, markets, coastal sunsets, and a smooth start/end point for your trip.","image_url":"https://picsum.photos/seed/colombo/1200/800"},
    {"name":"Kandy","description":"A cultural hill city known for the Temple of the Tooth and scenic lake views—perfect for heritage, local food, and relaxed evenings.","image_url":"https://picsum.photos/seed/kandy/1200/800"},
    {"name":"Ella","description":"A laid-back mountain town with tea estates, hikes, and viewpoints—famous for scenic landscapes and cool weather.","image_url":"https://picsum.photos/seed/ella/1200/800"},
    {"name":"Galle","description":"A coastal fort city with Dutch-colonial streets, cafés, and ocean views—great for photography and relaxed walks.","image_url":"https://picsum.photos/seed/galle/1200/800"}
  ]'::jsonb
where id = '14';

update public.packages set
  gallery_urls = '["https://picsum.photos/seed/pkg15/800/600","https://picsum.photos/seed/pkg15-1/1200/800","https://picsum.photos/seed/pkg15-2/1200/800","https://picsum.photos/seed/pkg15-3/1200/800"]'::jsonb,
  destination_details = '[
    {"name":"Ella","description":"A laid-back mountain town with tea estates, hikes, and viewpoints—famous for scenic landscapes and cool weather.","image_url":"https://picsum.photos/seed/ella/1200/800"},
    {"name":"Nuwara Eliya","description":"Tea country charm with misty mornings, colonial-era vibes, and lush plantations—ideal for calm scenic stops.","image_url":"https://picsum.photos/seed/nuwara-eliya/1200/800"},
    {"name":"Bentota","description":"A beach destination for unwinding—enjoy calm sea days, river activities, and easy resort-style relaxation.","image_url":"https://picsum.photos/seed/bentota/1200/800"}
  ]'::jsonb
where id = '15';
