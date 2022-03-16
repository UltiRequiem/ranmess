# ranmess

A [Quotable](https://github.com/lukePeavey/quotable) API Wrapper and CLI Tool.

## CLI

```sh
ranmess
```

## Usage Example

```
import { randomQuotable } from "https://deno.land/x/ranmess/mod.ts";

try {
  const quote = await randomQuotable();
  console.log(` ${quote.content} \n  - ${quote.author}`);
} catch (e) {
  console.log(e);
}
```

## Support

Open an Issue, I will check it a soon as possible 👀

If you want to hurry me up a bit
[send me a tweet](https://twitter.com/intent/tweet?text=%40UltiRequiem%20) 😆

Consider [supporting me on Patreon](https://patreon.com/UltiRequiem) if you like my work 🚀

Don't forget to start the repo ⭐

## Alternatives

I also developed this in [Go](https://github.com/UltiRequiem/quotable),
[Rust](https://github.com/UltiRequiem/ruquotes),
and [Python](https://github.com/UltiRequiem/quoteran).

## Licence

Licensed under the MIT License.
