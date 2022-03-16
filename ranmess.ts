import { randomQuotable } from "./mod.ts";

try {
  const quote = await randomQuotable();
  console.log(` ${quote.content} \n  - ${quote.author}`);
} catch (e) {
  console.log(e);
}
