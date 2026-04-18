/**
 * Single place for public env (e.g. future REST API base URL).
 * Add NEXT_PUBLIC_API_URL to .env.local when backend is ready.
 */
export function getPublicApiUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
}
