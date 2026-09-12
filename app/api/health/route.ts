import { NextResponse } from "next/server";
export function GET(){ return NextResponse.json({ok:true,service:"builder-signal-ai",time:new Date().toISOString()}); }
