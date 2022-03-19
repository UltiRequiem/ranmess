import { API } from "./src/config.ts";

import { addParams } from "./src/depts.ts";

import type {
  Quotable,
  QuotableAuthor,
  QuotableConfig,
  TagResponse,
} from "./src/types.ts";

/**
 * @returns A random quote.
 */
export async function quotableRandom(params: Partial<QuotableConfig> = {}) {
  const response = await fetch(addParams(`${API}/random`, params));
  const data = await response.json();
  return data as Quotable;
}

/**
 * @returns The available tags.
 */
export async function quotableTags() {
  const response = await fetch(`${API}/tags`);
  const data = await response.json();
  return data as TagResponse;
}

/**
 * @returns The data of an specific author.
 */
export async function quotableAuthor(authorID: string) {
  const response = await fetch(`${API}/authors/${authorID}`);
  const data = await response.json();
  return data as QuotableAuthor;
}

/**
 * @returns The data of an specific quote.
 */
export async function quotableQuote(quoteID: string) {
  const response = await fetch(`${API}/quotes/${quoteID}`);
  const data = await response.json();
  return data as Quotable;
}
