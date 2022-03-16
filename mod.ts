import { API } from "./config.ts";

import { addParams } from "./depts.ts";

import type { Quotable, QuotableConfig } from "./types.ts";

export async function randomQuotable(params: Partial<QuotableConfig> = {}) {
  const response = await fetch(addParams(`${API}/random`, params));
  const data = await response.json();
  return data as Quotable;
}
