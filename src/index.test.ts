import { afterEach, describe, expect, it, vi } from "vitest";
import {
  API_URL_ENV,
  DEFAULT_API_URL,
  QuotableError,
  createClient,
  resolveBaseUrl,
} from "./index.js";

const quote = {
  _id: "abc",
  content: "Be yourself.",
  author: "Someone",
  authorSlug: "someone",
  length: 12,
  dateAdded: "2020-01-01",
  dateModified: "2020-01-01",
  tags: ["life"],
};

/** A `fetch` that answers with `body` and remembers every URL it was asked for. */
function fakeFetch(body: unknown, status = 200) {
  const calls: string[] = [];
  const fetch = (async (url: URL | RequestInfo) => {
    calls.push(String(url));

    return new Response(JSON.stringify(body), { status });
  }) as typeof globalThis.fetch;

  return { fetch, calls };
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("resolveBaseUrl", () => {
  it("falls back to the public host", () => {
    vi.stubEnv(API_URL_ENV, "");

    expect(resolveBaseUrl()).toBe(DEFAULT_API_URL);
  });

  it("uses the environment variable when set", () => {
    vi.stubEnv(API_URL_ENV, "https://env.example.com");

    expect(resolveBaseUrl()).toBe("https://env.example.com");
  });

  it("prefers an explicit value over the environment", () => {
    vi.stubEnv(API_URL_ENV, "https://env.example.com");

    expect(resolveBaseUrl("https://explicit.example.com")).toBe(
      "https://explicit.example.com",
    );
  });

  it("ignores trailing slashes", () => {
    expect(resolveBaseUrl("https://host.example.com///")).toBe(
      "https://host.example.com",
    );
  });
});

describe("createClient", () => {
  it("requests the configured server", async () => {
    const { fetch, calls } = fakeFetch(quote);

    const result = await createClient({
      baseUrl: "https://quotes.example.com/",
      fetch,
    }).quotableRandom();

    expect(result).toEqual(quote);
    expect(calls).toEqual(["https://quotes.example.com/random"]);
  });

  it("supports a server mounted under a path", async () => {
    const { fetch, calls } = fakeFetch(quote);

    await createClient({
      baseUrl: "https://example.com/quotes-api",
      fetch,
    }).quotableQuote("xyz");

    expect(calls).toEqual(["https://example.com/quotes-api/quotes/xyz"]);
  });

  it("reads the environment variable on every call", async () => {
    const { fetch, calls } = fakeFetch(quote);
    const client = createClient({ fetch });

    vi.stubEnv(API_URL_ENV, "https://first.example.com");
    await client.quotableRandom();
    vi.stubEnv(API_URL_ENV, "https://second.example.com");
    await client.quotableRandom();

    expect(calls.map((url) => new URL(url).origin)).toEqual([
      "https://first.example.com",
      "https://second.example.com",
    ]);
  });

  it("sends only the filters that are set", async () => {
    const { fetch, calls } = fakeFetch(quote);

    await createClient({
      baseUrl: "https://h.example.com",
      fetch,
    }).quotableRandom({
      tags: "life|love",
      maxLength: 80,
    });

    const url = new URL(calls[0] ?? "");

    expect(url.searchParams.get("tags")).toBe("life|love");
    expect(url.searchParams.get("maxLength")).toBe("80");
    expect(url.searchParams.has("minLength")).toBe(false);
  });

  it("returns just the text or the tag names for the clean helpers", async () => {
    const quotes = createClient({
      baseUrl: "https://h.example.com",
      fetch: fakeFetch(quote).fetch,
    });
    const tags = createClient({
      baseUrl: "https://h.example.com",
      fetch: fakeFetch([{ name: "life" }, { name: "love" }]).fetch,
    });

    expect(await quotes.cleanQuote()).toBe("Be yourself.");
    expect(await tags.cleanTags()).toEqual(["life", "love"]);
  });

  it("encodes ids in the path", async () => {
    const { fetch, calls } = fakeFetch({});

    await createClient({
      baseUrl: "https://h.example.com",
      fetch,
    }).quotableAuthor("a b/c");

    expect(calls).toEqual(["https://h.example.com/authors/a%20b%2Fc"]);
  });

  it("throws a QuotableError with the status for a failed request", async () => {
    const client = createClient({
      baseUrl: "https://h.example.com",
      fetch: fakeFetch({}, 503).fetch,
    });

    await expect(client.quotableTags()).rejects.toMatchObject({
      name: "QuotableError",
      status: 503,
    });
    await expect(client.quotableTags()).rejects.toBeInstanceOf(QuotableError);
  });
});
