import fs from "node:fs/promises";
import path from "node:path";
import { dataApiUrl } from "./data-api";

export type Subscriber = { email: string; source: string; createdAt: string };

function normalize(email: string) { return email.trim().toLowerCase(); }

export async function addSubscriber(email: string, source = "site") {
  const normalized = normalize(email);
  const baseUrl = dataApiUrl();
  if (baseUrl) {
    const response = await fetch(`${baseUrl}/subscribers`, {
      method: "POST",
      headers: { "content-type": "application/json", prefer: "return=minimal" },
      body: JSON.stringify({ email: normalized, source }),
      cache: "no-store",
    });
    if (response.status === 409) return { persisted: "neon-data-api" as const, duplicate: true };
    if (!response.ok) throw new Error(`Subscriber persistence failed with status ${response.status}`);
    return { persisted: "neon-data-api" as const, duplicate: false };
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
  return { persisted: "file" as const, duplicate: Boolean(existing) };
}

export async function listSubscribers(): Promise<Subscriber[]> {
  try {
    return JSON.parse(await fs.readFile(path.join(process.cwd(), ".data", "subscribers.json"), "utf8"));
  } catch {
    return [];
  }
}
