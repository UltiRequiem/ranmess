import { API } from "./config.ts";

import { addParams } from "./depts.ts";

import type {
  Quotable,
  QuotableAuthor,
  QuotableConfig,
  TagResponse,
} from "./types.ts";

/**
 * @returns A random quote.
 */
export async function quotableRandom(params: Partial<QuotableConfig> = {}) {
  const response = await fetch(addParams(`${API}/random`, params));
  const data: Quotable = await response.json();
  return data;
}

/**
 * @returns The available tags.
 */
export async function quotableTags() {
  const response = await fetch(`${API}/tags`);
  const data: TagResponse = await response.json();
  return data;
}

/**
 * @returns The data of an specific author.
 */
export async function quotableAuthor(authorID: string) {
  const response = await fetch(`${API}/authors/${authorID}`);
  const data: QuotableAuthor = await response.json();
  return data;
}

/**
 * @returns The data of an specific quote.
 */
export async function quotableQuote(quoteID: string) {
  const response = await fetch(`${API}/quotes/${quoteID}`);
  const data: Quotable = await response.json();
  return data;
}
