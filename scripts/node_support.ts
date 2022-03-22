import { buildPackage } from "https://deno.land/x/ultirequiem/node_support.ts";

await buildPackage({
  repoName: "@ultirequiem/ranmess",
  description: "Quotable Wrapper and CLI Tool.",
  homepage: "https://ranmess.js.org",
  keywords: ["quotes", "quote", "random", "random-quote"],
  version: "2.1.6",
}, { supportCJS: false, shims: { undici: true, deno: true } });
