import { NextResponse } from "next/server";
import { adminExport } from "@/lib/data-api";

export async function GET(request: Request) {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    return NextResponse.json(await adminExport(token));
  } catch (error) {
    const status = typeof error === "object" && error && "status" in error ? Number(error.status) : 500;
    if (status === 401) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error("admin_export_failed", error);
    return NextResponse.json({ error: "Admin export is unavailable." }, { status: 503 });
  }
}
