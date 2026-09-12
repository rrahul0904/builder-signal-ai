import fs from "node:fs/promises";
import path from "node:path";
import postgres from "postgres";

export type SponsorLead = {
  name: string;
  email: string;
  company: string;
  message: string;
  createdAt: string;
};

export async function addSponsorLead(input: Omit<SponsorLead, "createdAt">) {
  const lead = { ...input, email: input.email.trim().toLowerCase() };
  const databaseUrl = process.env.DATABASE_URL;
  if (databaseUrl) {
    const sql = postgres(databaseUrl, { max: 1, prepare: false });
    try {
      await sql`insert into sponsor_leads (name, email, company, message) values (${lead.name}, ${lead.email}, ${lead.company}, ${lead.message})`;
      return { persisted: "postgres" as const };
    } finally {
      await sql.end();
    }
  }

  const dir = path.join(process.cwd(), ".data");
  const file = path.join(dir, "sponsor-leads.json");
  await fs.mkdir(dir, { recursive: true });
  let leads: SponsorLead[] = [];
  try { leads = JSON.parse(await fs.readFile(file, "utf8")); } catch { leads = []; }
  leads.push({ ...lead, createdAt: new Date().toISOString() });
  await fs.writeFile(file, JSON.stringify(leads, null, 2), "utf8");
  return { persisted: "file" as const };
}

export async function listSponsorLeads(): Promise<SponsorLead[]> {
  const databaseUrl = process.env.DATABASE_URL;
  if (databaseUrl) {
    const sql = postgres(databaseUrl, { max: 1, prepare: false });
    try {
      const rows = await sql<SponsorLead[]>`select name, email, company, message, created_at as "createdAt" from sponsor_leads order by created_at desc`;
      return rows;
    } finally {
      await sql.end();
    }
  }
  try {
    return JSON.parse(await fs.readFile(path.join(process.cwd(), ".data", "sponsor-leads.json"), "utf8"));
  } catch {
    return [];
  }
}
