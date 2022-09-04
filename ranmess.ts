import { Command } from "https://deno.land/x/cliffy@v0.25.0/command/mod.ts";
import { colors } from "https://deno.land/x/cliffy@v0.25.0/ansi/mod.ts";

import pLimit from "https://esm.sh/p-limit@4.0.0";

import { quotableRandom } from "./mod.ts";

const root = new Command()
  .name("ranmess")
  .version("2.2.0")
  .description("Get random quotes.")
  .arguments("[times]");

let {
  args: [length = 1],
} = await root.parse(Deno.args);

if (typeof length !== "number") {
  const parsed = parseInt(length, 10);

  if (Number.isNaN(parsed)) {
    const error = colors.red(`The input "${length}" is not a number.`);

    console.error(error);

    Deno.exit(1);
  }

  length = parsed;
}

async function printQuote() {
  const quote = await quotableRandom();

  const content = colors.blue(quote.content);
  const author = colors.green(quote.author);

  console.log(`${content} \n - ${author} \n`);
}

const limit = pLimit(10);

const limitedQuote = () => limit(printQuote);

Promise.all(Array.from({ length }, limitedQuote));
