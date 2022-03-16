# ranmess

A [Quotable](https://github.com/lukePeavey/quotable) API Wrapper and CLI Tool.

## CLI

### Install

- Deno

```sh
deno install --allow-net https://deno.land/x/ranmess/ranmess.ts
```

- Node.js

```sh
npm install -g ranmess
```

### Usage

```sh
ranmess
```

A random quote and its author will be printed!

## Library

### Usage Example

```typescript
import { randomQuotable } from "https://deno.land/x/ranmess/mod.ts";

const quote = await randomQuotable();
console.log(` ${quote.content} \n  - ${quote.author}`);
```

On Node.js the API is the same but the import is 👇

```typescript
import { randomQuotable } from "ranmess";
```

Check the [cli source](./ranmess.ts) for more.

[Documentation](https://doc.deno.land/https://deno.land/x/ranmess/mod.ts)

## Support

Open an Issue, I will check it a soon as possible 👀

If you want to hurry me up a bit
[send me a tweet](https://twitter.com/intent/tweet?text=%40UltiRequiem%20) 😆

Consider [supporting me on Patreon](https://patreon.com/UltiRequiem) if you like
my work 🚀

Don't forget to start the repo ⭐

## Alternatives

I also developed this in [Go](https://github.com/UltiRequiem/quotable),
[Rust](https://github.com/UltiRequiem/ruquotes), and
[Python](https://github.com/UltiRequiem/quoteran).

## Licence

Licensed under the MIT License.
