import { NextResponse } from "next/server";
import { z } from "zod";

import { draftBuildLog } from "@/lib/build-log";

const changeSchema = z.object({
  path: z.string().min(1).max(500),
  additions: z.number().int().nonnegative().optional(),
  deletions: z.number().int().nonnegative().optional(),
  status: z.enum(["added", "modified", "deleted", "renamed"]).optional(),
});

const requestSchema = z.object({
  repository: z.string().min(1).max(250),
  commitSha: z.string().min(7).max(64),
  commitMessage: z.string().max(500),
  author: z.string().max(200).optional(),
  changes: z.array(changeSchema).max(500),
});

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_request", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // This endpoint deliberately creates drafts only. Publishing requires a
  // separate, explicit approval flow and is outside this Phase A slice.
  return NextResponse.json({ draft: draftBuildLog(parsed.data) }, { status: 201 });
}
