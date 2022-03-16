import { randomQuotable } from "./mod.ts";

const quote = await randomQuotable();
console.log(` ${quote.content} \n  - ${quote.author}`);
