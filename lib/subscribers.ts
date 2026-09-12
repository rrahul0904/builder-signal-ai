import fs from "node:fs/promises";
import path from "node:path";
import postgres from "postgres";

export type Subscriber = { email: string; source: string; createdAt: string };

function normalize(email: string) { return email.trim().toLowerCase(); }

export async function addSubscriber(email: string, source = "site") {
  const normalized = normalize(email);
  const databaseUrl = process.env.DATABASE_URL;
  if (databaseUrl) {
    const sql = postgres(databaseUrl, { max: 1, prepare: false });
    try {
      await sql`insert into subscribers (email, source) values (${normalized}, ${source}) on conflict (email) do update set source = excluded.source`;
      return { persisted: "postgres" as const };
    } finally {
      await sql.end();
    }
  }

  const dir = path.join(process.cwd(), ".data");
  const file = path.join(dir, "subscribers.json");
  await fs.mkdir(dir, { recursive: true });
  let subscribers: Subscriber[] = [];
  try { subscribers = JSON.parse(await fs.readFile(file, "utf8")); } catch { subscribers = []; }
  const existing = subscribers.find((item) => item.email === normalized);
  if (!existing) {
    subscribers.push({ email: normalized, source, createdAt: new Date().toISOString() });
    await fs.writeFile(file, JSON.stringify(subscribers, null, 2), "utf8");
  }
  return { persisted: "file" as const };
}

export async function listSubscribers(): Promise<Subscriber[]> {
  const databaseUrl = process.env.DATABASE_URL;
  if (databaseUrl) {
    const sql = postgres(databaseUrl, { max: 1, prepare: false });
    try {
      const rows = await sql<Subscriber[]>`select email, source, created_at as "createdAt" from subscribers order by created_at desc`;
      return rows;
    } finally {
      await sql.end();
    }
  }
  try {
    return JSON.parse(await fs.readFile(path.join(process.cwd(), ".data", "subscribers.json"), "utf8"));
  } catch {
    return [];
  }
}
