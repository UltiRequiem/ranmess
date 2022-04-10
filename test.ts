import {
  cleanQuote,
  cleanTags,
  quotableAuthor,
  quotableQuote,
  quotableRandom,
  quotableTags,
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

Deno.test("[cleanQuote]", async () => {
  const quote = await cleanQuote();
  console.log(quote);
});

Deno.test("[cleanTags]", async () => {
  const quote = await cleanTags();
  console.log(quote);
});
