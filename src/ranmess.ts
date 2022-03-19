import { quotableRandom } from "../mod.ts";

const quote = await quotableRandom();
console.log(` ${quote.content} \n  - ${quote.author}`);
