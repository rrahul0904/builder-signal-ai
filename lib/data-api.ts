const PUBLIC_DATA_API_URL = "https://ep-nameless-pine-avg6jqfm.apirest.c-11.us-east-1.aws.neon.tech/neondb/rest/v1";

export function dataApiUrl() {
  if (process.env.DATA_API_URL) return process.env.DATA_API_URL.replace(/\/$/, "");
  if (process.env.VERCEL === "1") return PUBLIC_DATA_API_URL;
  return "";
}

export async function adminExport(token: string) {
  const baseUrl = dataApiUrl();
  if (!baseUrl) throw new Error("Admin export is available only with the production data API configured.");

  const response = await fetch(`${baseUrl}/rpc/admin_export`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ p_token: token }),
    cache: "no-store",
  });

  if (response.status === 401 || response.status === 403) {
    const error = new Error("Unauthorized");
    Object.assign(error, { status: 401 });
    throw error;
  }
  if (!response.ok) throw new Error(`Admin export failed with status ${response.status}`);
  return response.json();
}
