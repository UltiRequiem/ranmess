import { randomQuotable } from "./mod.ts";

// TODO: Add tests
Deno.test("[randomQuotable]", async () => {
  const quote = await randomQuotable();
  console.log(quote);
});
