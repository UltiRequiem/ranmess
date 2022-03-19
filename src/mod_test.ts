import { quotableRandom } from "./mod.ts";

// TODO: Add tests
Deno.test("[randomQuotable]", async () => {
  const quote = await quotableRandom();
  console.log(quote);
});
