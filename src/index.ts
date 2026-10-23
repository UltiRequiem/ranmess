/**
 * A typed client for the [Quotable](https://github.com/lukePeavey/quotable) quotes API.
 *
 * The API address is configurable: pass `baseUrl` to {@link createClient}, or set the
 * `QUOTABLE_API_URL` environment variable, so you can point it at your own deployment.
 *
 * @module
 */

/** The public Quotable host, used when nothing else is configured. */
export const DEFAULT_API_URL = "https://api.quotable.io";

/** Environment variable that overrides {@link DEFAULT_API_URL}. */
export const API_URL_ENV = "QUOTABLE_API_URL";

/** @deprecated Use {@link DEFAULT_API_URL}, or configure `baseUrl`. */
export const API_URL = DEFAULT_API_URL;

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

export type QuotableTag = (typeof QUOTABLE_TAGS)[number];

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
  /**
   * Filter random quote by tag(s). Takes a list of one or more tag names, separated by a comma
   * (meaning AND) or a pipe (meaning OR).
   */
  tags: string;
  /** Filter random quote by authorId(s), separated by a pipe (meaning OR). */
  authorId: string;
  /** Filter random quote by author name(s), separated by a pipe (meaning OR). */
  author: string;
}

export interface QuotableAuthor {
  /** A unique id for this author */
  _id: string;
  /** A brief, one paragraph bio of the author. */
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

export interface ClientOptions {
  /**
   * Base URL of a Quotable server, without a trailing endpoint, e.g. `https://quotes.example.com`.
   * Defaults to the `QUOTABLE_API_URL` environment variable, then to {@link DEFAULT_API_URL}.
   */
  baseUrl?: string;
  /** A custom `fetch`, for tests, proxies or runtimes without a global one. */
  fetch?: typeof fetch;
}

/** Thrown when the API answers with a status that is not 2xx. */
export class QuotableError extends Error {
  constructor(
    readonly status: number,
    readonly url: string,
  ) {
    super(`Quotable API request failed with status ${status}: ${url}`);
    this.name = "QuotableError";
  }
}

/**
 * Work out which server to talk to: the explicit value, then `QUOTABLE_API_URL`, then the public host.
 * Trailing slashes are removed so both `https://host` and `https://host/` work.
 */
export function resolveBaseUrl(baseUrl?: string): string {
  const env = (
    globalThis as { process?: { env?: Record<string, string | undefined> } }
  ).process?.env;

  return (baseUrl || env?.[API_URL_ENV] || DEFAULT_API_URL).replace(/\/+$/, "");
}

/** Create a client bound to one server. The functions below are the same client with the default settings. */
export function createClient(options: ClientOptions = {}) {
  async function request<T>(path: string, params: object = {}): Promise<T> {
    const url = new URL(`${resolveBaseUrl(options.baseUrl)}${path}`);

    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }

    const response = await (options.fetch ?? fetch)(url);

    if (!response.ok) {
      throw new QuotableError(response.status, url.toString());
    }

    return (await response.json()) as T;
  }

  return {
    /** @returns A random quote. */
    quotableRandom: (params: Partial<QuotableConfig> = {}) =>
      request<Quotable>("/random", params),

    /** @returns The text of a random quote. */
    cleanQuote: async () => (await request<Quotable>("/random")).content,

    /** @returns The available tags. */
    quotableTags: () => request<TagResponse[]>("/tags"),

    /** @returns The names of the available tags. */
    cleanTags: async () =>
      (await request<TagResponse[]>("/tags")).map((tag) => tag.name),

    /** @returns The data of a specific author. */
    quotableAuthor: (authorID: string) =>
      request<QuotableAuthor>(`/authors/${encodeURIComponent(authorID)}`),

    /** @returns The data of a specific quote. */
    quotableQuote: (quoteID: string) =>
      request<Quotable>(`/quotes/${encodeURIComponent(quoteID)}`),
  };
}

const client = createClient();

export const {
  quotableRandom,
  cleanQuote,
  quotableTags,
  cleanTags,
  quotableAuthor,
  quotableQuote,
} = client;
