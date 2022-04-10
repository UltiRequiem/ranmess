import { addParams } from "https://deno.land/x/add_params@v0.1.0/mod.ts";

import type {
  Quotable,
  QuotableAuthor,
  QuotableConfig,
  TagResponse,
} from "./types.ts";

export const API_URL = "https://api.quotable.io";

/**
 * @returns A random quote.
 */
export async function quotableRandom(params: Partial<QuotableConfig> = {}) {
  const response = await fetch(addParams(`${API_URL}/random`, params));
  const data = await response.json();
  return data as Quotable;
}

/**
 * @returns The available tags.
 */
export async function quotableTags() {
  const response = await fetch(`${API_URL}/tags`);
  const data = await response.json();
  return data as TagResponse;
}

/**
 * @returns The data of an specific author.
 */
export async function quotableAuthor(authorID: string) {
  const response = await fetch(`${API_URL}/authors/${authorID}`);
  const data = await response.json();
  return data as QuotableAuthor;
}

/**
 * @returns The data of an specific quote.
 */
export async function quotableQuote(quoteID: string) {
  const response = await fetch(`${API_URL}/quotes/${quoteID}`);
  const data = await response.json();
  return data as Quotable;
}

export type { Quotable, QuotableAuthor, QuotableConfig, TagResponse };
