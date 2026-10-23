# ranmess

A typed Quotable API client and CLI with a configurable API URL.

[![npm](https://img.shields.io/npm/v/ranmess?logo=npm&color=cb3837)](https://www.npmjs.com/package/ranmess)
[![npm downloads](https://img.shields.io/npm/dm/ranmess?color=cb3837)](https://www.npmjs.com/package/ranmess)
[![CI](https://github.com/UltiRequiem/ranmess/actions/workflows/ci.yaml/badge.svg)](https://github.com/UltiRequiem/ranmess/actions/workflows/ci.yaml)
[![codecov](https://codecov.io/gh/UltiRequiem/ranmess/graph/badge.svg)](https://codecov.io/gh/UltiRequiem/ranmess)

A typed client and command line tool for the [Quotable](https://github.com/lukePeavey/quotable) quotes API.

> Quotable is a free, open source quotations API.

## Install

```sh
npm install ranmess
```

## Use your own API server

The public `api.quotable.io` host is no longer available, so point ranmess at a Quotable server you run (the
project is open source and easy to deploy). The base URL is read, in this order, from:

1. the `baseUrl` option (or `--api-url` in the CLI),
2. the `QUOTABLE_API_URL` environment variable,
3. the public default, `https://api.quotable.io`.

Give it the server address only, without `/random` or any other endpoint. A path prefix is fine
(`https://example.com/quotes-api`).

## Usage

ESM only, types included: the same import works in Node.js, Bun and browsers.

```javascript
import { createClient, quotableRandom } from "ranmess";

// the server from QUOTABLE_API_URL (or the default)
const quote = await quotableRandom();
console.log(`${quote.content} - ${quote.author}`);

// or a specific server, for this client only
const mine = createClient({ baseUrl: "https://quotes.example.com" });

await mine.quotableRandom({ tags: "life|love", maxLength: 100 });
await mine.cleanTags(); //=> ["business", "education", ...]
await mine.quotableAuthor("yBDYq_Vtnuw");
await mine.quotableQuote("9gCEJkS5uaRS");
```

Requests that do not answer with a 2xx status throw a `QuotableError` that carries the status and the URL. You can
also pass your own `fetch` to `createClient`.

## CLI

```sh
npm install -g ranmess

QUOTABLE_API_URL=https://quotes.example.com ranmess      # one quote
ranmess 3 --api-url https://quotes.example.com           # three quotes
```

## Other languages

The same quotes tool exists in [Rust](https://github.com/UltiRequiem/ruquotes),
[Python](https://github.com/UltiRequiem/quoteran) and [Go](https://github.com/UltiRequiem/quotable). They all
read the server from `QUOTABLE_API_URL` and accept an `--api-url` flag too.

## Support

Open an Issue, I will check it as soon as possible 👀

Don't forget to star the repo ⭐

## Licence

Licensed under the MIT License 📄
