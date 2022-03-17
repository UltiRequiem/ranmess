import { build } from "https://deno.land/x/dnt/mod.ts";

const publisher = {
  name: "Eliaz Bobadilla",
  username: "ultirequiem",
  email: "eliaz.bobadilladev@gmail.com",
  site: "https://ultirequiem.com",
};

const packageConfig = {
  name: "ranmess",
  repoName: "ranmess",
  version: "2.0.1",
  description: "Quotable Wrapper and CLI Tool",
  keywords: ["quotes", "quote", "random", "random-quote"],
  license: "MIT",
  homepage: "https://ranmess.js.org",
};

await build({
  entryPoints: ["./mod.ts", {
    name: "ranmess",
    path: "./ranmess.ts",
    kind: "bin",
  }],

  outDir: "node",
  shims: {
    deno: true,
    undici: true,
  },

  // Only Support ESM
  scriptModule: false,

  package: {
    name: packageConfig.name,
    description: packageConfig.description,
    author: `${publisher.name} <${publisher.email}> (${publisher.site})`,

    version: packageConfig.version,

    homepage: packageConfig.homepage,

    funding: {
      type: "patreon",
      url: `https://www.patreon.com/${publisher.username}`,
    },

    repository: `github:${publisher.username}/${packageConfig.name}`,

    bugs: {
      url:
        `https://github.com/${publisher.username}/${packageConfig.repoName}/issues`,
      email: publisher.email,
    },

    keywords: packageConfig.keywords,
  },
});

await Deno.copyFile("license", "node/license");
await Deno.copyFile("readme.md", "node/readme.md");
