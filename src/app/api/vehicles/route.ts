import { getVehicles } from "@/lib/vehicles";

export async function GET() {
  const vehicles = await getVehicles();
  return Response.json({ ok: true, vehicles });
}
