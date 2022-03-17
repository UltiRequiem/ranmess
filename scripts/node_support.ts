import { build } from "https://deno.land/x/dnt/mod.ts";

const username = "ultirequiem";

const packageName = "ranmess";
const description = "Quotable Wrapper and CLI Tool";

const outDir = "node";

await build({
  entryPoints: ["./mod.ts", {
    name: "ranmess",
    path: "./ranmess.ts",
    kind: "bin",
  }],
  outDir,
  shims: {
    deno: true,
    undici: true,
  },
  scriptModule: false,
  package: {
    name: `${packageName}`,
    version: Deno.args[0],
    description,
    license: "MIT",
    homepage: "https://github.com/UltiRequiem/ranmess",
    repository: {
      type: "git",
      url: `git+https://github.com/${username}/${packageName}.git`,
    },
    bugs: {
      url: `https://github.com/${username}/${packageName}/issues`,
    },
    keywords: ["random", "random", "quotes", "quotable"],
  },
});

await Deno.copyFile("license", "node/license");
await Deno.copyFile("readme.md", "node/readme.md");
