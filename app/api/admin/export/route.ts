import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { listSponsorLeads } from "@/lib/leads";
import { listSubscribers } from "@/lib/subscribers";

function authorized(request: Request) {
  const expected = process.env.ADMIN_API_TOKEN;
  if (!expected) return false;
  const supplied = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  const expectedBuffer = Buffer.from(expected);
  const suppliedBuffer = Buffer.from(supplied);
  return expectedBuffer.length === suppliedBuffer.length && timingSafeEqual(expectedBuffer, suppliedBuffer);
}

export async function GET(request: Request) {
  if (!process.env.ADMIN_API_TOKEN) return NextResponse.json({ error: "Admin export is not configured." }, { status: 503 });
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const [subscribers, sponsorLeads] = await Promise.all([listSubscribers(), listSponsorLeads()]);
  return NextResponse.json({ exportedAt: new Date().toISOString(), subscribers, sponsorLeads });
}
