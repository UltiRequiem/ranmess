import { addParams } from "https://deno.land/x/add_params@v1.2.0/mod.ts";

export const QUOTABLE_TAGS = [
  "business",
  "education",
  "faith",
  "famous-quotes",
  "friendship",
  "future",
  "happiness",
  "history",
  "inspirational",
  "life",
  "literature",
  "love",
  "nature",
  "politics",
  "proverb",
  "religion",
  "science",
  "success",
  "technology",
  "wisdom",
] as const;

export type QuotableTag = typeof QUOTABLE_TAGS[number];

export interface Quotable {
  _id: string;
  content: string;
  author: string;
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
  tags: string[];
}

export interface QuotableConfig {
  /** The maximum length in characters */
  maxLength: number;
  /** The minimum length in characters */
  minLength: number;
  /** Filter random quote by tag(s). Takes a list of one or more tag names,
   * separated by a comma (meaning AND) or a pipe (meaning OR).
   * A comma separated list will match quotes that have all of the given tags.
   * While a pipe (|) separated list will match quotes that have either of the
   * provided tags.
   */
  tags: string;
  /**
   * Filter random quote by authorId(s). Takes a list of one or more authorId,
   * separated by a pipe (meaning OR). A pipe (|) separated list will match
   * quotes that have either of the provided authorId.
   */
  authorId: string;
  /**
   * Filter random quote by author(s). Takes a list of one or more author names,
   * separated by a pipe (meaning OR). A pipe (|) separated list will match
   * quotes that have either of the provided author name.
   */
  author: string;
}

export interface QuotableAuthor {
  /** A unique id for this author */
  _id: string;
  /** A brief, one paragraph bio of the author. Source wiki API. */
  bio: string;
  /** A one-line description of the author. */
  description: string;
  /** The link to the author's wikipedia page or official website. */
  link: string;
  /** The authors full name. */
  name: string;
  /** A slug is a URL-friendly ID derived from the authors name. */
  slug: string;
  /** The number of quotes by this author. */
  quoteCount: string;
}

export interface TagResponse {
  _id: string;
  name: QuotableTag;
  dateAdded: string;
  dateModified: string;
  quoteCount: number;
}

export const API_URL = "https://api.quotable.io";

/**
 * @returns A random quote.
 */
export async function quotableRandom(
  params: Partial<QuotableConfig> = {},
): Promise<Quotable> {
  const response = await fetch(addParams(`${API_URL}/random`, params));
  return response.json();
}

/**
 * @returns The text of a quote.
 */
export async function cleanQuote() {
  const { content } = await quotableRandom();
  return content;
}

/**
 * @returns The available tags.
 */
export async function quotableTags(): Promise<TagResponse[]> {
  const response = await fetch(`${API_URL}/tags`);
  return response.json();
}

/**
 * @returns All the available tags.
 */
export async function cleanTags() {
  const tags = await quotableTags();
  return tags.map((tag) => tag.name);
}

/**
 * @returns The data of an specific author.
 */
export async function quotableAuthor(
  authorID: string,
): Promise<QuotableAuthor> {
  const response = await fetch(`${API_URL}/authors/${authorID}`);
  return response.json();
}

/**
 * @returns The data of an specific quote.
 */
export async function quotableQuote(quoteID: string): Promise<Quotable> {
  const response = await fetch(`${API_URL}/quotes/${quoteID}`);
  return response.json();
}
