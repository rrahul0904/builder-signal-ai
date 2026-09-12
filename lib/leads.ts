import fs from "node:fs/promises";
import path from "node:path";
import { dataApiUrl } from "./data-api";

export type SponsorLead = {
  name: string;
  email: string;
  company: string;
  message: string;
  createdAt: string;
};

export async function addSponsorLead(input: Omit<SponsorLead, "createdAt">) {
  const lead = { ...input, email: input.email.trim().toLowerCase() };
  const baseUrl = dataApiUrl();
  if (baseUrl) {
    const response = await fetch(`${baseUrl}/sponsor_leads`, {
      method: "POST",
      headers: { "content-type": "application/json", prefer: "return=minimal" },
      body: JSON.stringify(lead),
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`Sponsor lead persistence failed with status ${response.status}`);
    return { persisted: "neon-data-api" as const };
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
  try {
    return JSON.parse(await fs.readFile(path.join(process.cwd(), ".data", "sponsor-leads.json"), "utf8"));
  } catch {
    return [];
  }
}
