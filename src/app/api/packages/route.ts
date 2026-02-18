import { getPackages } from "@/lib/packages";

export async function GET() {
  const packages = await getPackages();
  return Response.json({ ok: true, packages });
}
