import type { FoundComposers } from "@db/queries/searchComposers";

function getBaseUrl(): string {
  const port = window.location.port ? `:${window.location.port}` : "";
  return `${window.location.protocol}//${window.location.hostname}${port}`;
}

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return (await response.json()) as T;
}
export async function getSearchComposersData(): Promise<FoundComposers> {
  return await fetchJson(`${getBaseUrl()}/composers/search`);
}
