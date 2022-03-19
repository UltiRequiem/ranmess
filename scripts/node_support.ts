import { build } from "https://deno.land/x/dnt@0.22.0/mod.ts";

const publisher = {
  name: "Eliaz Bobadilla",
  username: "ultirequiem",
  email: "eliaz.bobadilladev@gmail.com",
  site: "https://ultirequiem.com",
};

const packageConfig = {
  name: "ranmess",
  repoName: "ranmess",
  version: "2.1.4",
  description: "Quotable Wrapper and CLI Tool",
  keywords: ["quotes", "quote", "random", "random-quote"],
  license: "MIT",
  homepage: "https://ranmess.js.org",
};

await build({
  entryPoints: ["./mod.ts", {
    name: packageConfig.name,
    path: `./${packageConfig.name}.ts`,
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

    browser: "./browser.js",

    homepage: packageConfig.homepage,
    license: packageConfig.license,

    funding: {
      type: "patreon",
      url: `https://www.patreon.com/${publisher.username}`,
    },

    repository: `github:${publisher.username}/${packageConfig.repoName}`,

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

const bundle = Deno.run({
  cmd: ["deno", "bundle", "mod.ts", "node/browser.js"],
});

await bundle.status();
