import { API } from "./config.ts";

import type { Quotable, QuotableConfig } from "./types.ts";

export async function randomQuotable(params: Partial<QuotableConfig> = {}) {
  const response = await fetch(addParams(`${API}/random`, params));
  const data = await response.json();
  return data as Quotable;
}

// move to external package later
function addParams(
  url: string,
  params: { [key: string]: string | number },
): string {
  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return `${url}?${query}`;
}
