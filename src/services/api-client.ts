import { getPublicApiUrl } from "@/lib/env";

/**
 * Central HTTP entry for future backend calls.
 * UI stays in features/; swap endpoints here when API changes.
 */
export async function apiFetch(
  path: string,
  init?: RequestInit,
): Promise<Response> {
  const base = getPublicApiUrl();
  const url = path.startsWith("http") ? path : `${base}${path}`;
  return fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
}
