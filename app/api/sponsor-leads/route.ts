import { NextResponse } from "next/server";
import { z } from "zod";
import { addSponsorLead } from "@/lib/leads";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().email().max(254),
  company: z.string().trim().min(2).max(160),
  message: z.string().trim().min(10).max(2000),
});

export async function POST(request: Request) {
  try {
    const input = schema.safeParse(await request.json());
    if (!input.success) return NextResponse.json({ error: "Complete every field with valid information." }, { status: 400 });
    const result = await addSponsorLead(input.data);
    return NextResponse.json({ ok: true, storage: result.persisted });
  } catch (error) {
    console.error("sponsor_lead_failed", error);
    return NextResponse.json({ error: "Request service is unavailable. Please try again." }, { status: 500 });
  }
}
