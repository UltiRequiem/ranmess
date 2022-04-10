import { buildPackage } from "https://deno.land/x/ultirequiem@0.0.12/node_support.ts";

buildPackage(
  {
    repoName: "ranmess",
    description: "Quotable Wrapper and CLI Tool.",
    homepage: "https://ranmess.js.org",
    keywords: ["quotes", "quote", "random", "random-quote"],
    version: "2.2.0",
  },
  {
    supportCJS: false,
    check: false,
    entryPoints: [
      "./mod.ts",
      { kind: "bin", name: "ranmess", path: "./ranmess.ts" },
    ],
  },
);
