import { NextResponse } from "next/server";
import { z } from "zod";
import { addSubscriber } from "@/lib/subscribers";
const schema = z.object({ email: z.string().email().max(254), source: z.string().max(120).optional().default("site") });
export async function POST(request: Request) {
  try {
    const input = schema.safeParse(await request.json());
    if (!input.success) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    const result = await addSubscriber(input.data.email, input.data.source);
    return NextResponse.json({ ok: true, storage: result.persisted });
  } catch (error) {
    console.error("subscribe_failed", error);
    return NextResponse.json({ error: "Subscription service is unavailable. Please try again." }, { status: 500 });
  }
}
