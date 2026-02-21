# Create the `vehicle_rentals` table

If you see **"Could not find the table 'public.vehicle_rentals'"**, create the table in Supabase:

1. Open **[Supabase Dashboard](https://supabase.com/dashboard)** and select your project.
2. In the left sidebar, click **SQL Editor**.
3. Click **New query**.
4. Copy the **entire** contents of the file **`supabase/vehicle-rentals-table.sql`** (in this project) and paste it into the editor.
5. Click **Run** (or press Ctrl+Enter / Cmd+Enter).

You should see "Success. No rows returned." The table `public.vehicle_rentals` is now created and the rental form will work.

**Simple IDs (BK-xxxxx, VR-xxxxx):** If you already have `bookings` or `vehicle_rentals` and want short display IDs instead of long UUIDs, run **`supabase/add-short-ids.sql`** in the SQL Editor once. New bookings and rentals will then get IDs like `BK-7x2Kp9` and `VR-M3nQ8r`.
