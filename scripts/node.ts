import { buildPackage } from "https://deno.land/x/ultirequiem@0.0.15/node.ts";

buildPackage(
  {
    repoName: "ranmess",
    description: "Quotable Wrapper and CLI Tool.",
    homepage: "https://ranmess.js.org",
    keywords: ["quotes", "quote", "random", "random-quote"],
    version: "2.3.0",
  },
  {
    supportCJS: false,
    typeCheck: false,
    entryPoints: [
      "./mod.ts",
      { kind: "bin", name: "ranmess", path: "./ranmess.ts" },
    ],
  },
);
