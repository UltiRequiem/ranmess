import {
  quotableRandom,
  quotableTags,
  quotableAuthor,
  quotableQuote,
} from "./mod.ts";

Deno.test("[quotableRandom]", async () => {
  const quote = await quotableRandom();
  console.log(quote);
});

Deno.test("[quotableTags]", async () => {
  const quote = await quotableTags();
  console.log(quote);
});


Deno.test("[quotableAuthor]", async () => {
  const quote = await quotableAuthor("yBDYq_Vtnuw");
  console.log(quote);
});


Deno.test("[quotableQuote]", async () => {
  const quote = await quotableQuote("9gCEJkS5uaRS");
  console.log(quote);
});
