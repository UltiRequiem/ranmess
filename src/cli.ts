#!/usr/bin/env node
import { parseArgs } from "node:util";
import {
  API_URL_ENV,
  DEFAULT_API_URL,
  createClient,
  resolveBaseUrl,
} from "./index.js";

const HELP = `Usage: ranmess [times] [--api-url <url>]

Print random quotes.

Options:
  --api-url <url>  Base URL of a Quotable server (default: $${API_URL_ENV} or ${DEFAULT_API_URL})
  -h, --help       Show this help
`;

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    "api-url": { type: "string" },
    help: { type: "boolean", short: "h" },
  },
});

if (values.help) {
  console.log(HELP);
  process.exit(0);
}

const times = Number.parseInt(positionals[0] ?? "1", 10);

if (Number.isNaN(times) || times < 1) {
  console.error(`The input "${positionals[0]}" is not a positive number.`);
  process.exit(1);
}

const client = createClient({ baseUrl: values["api-url"] });
const paint = (code: number, text: string) =>
  process.stdout.isTTY ? `\u001B[${code}m${text}\u001B[0m` : text;

try {
  // ten at a time, so a big number does not open hundreds of connections
  for (let done = 0; done < times; done += 10) {
    const batch = await Promise.all(
      Array.from({ length: Math.min(10, times - done) }, () =>
        client.quotableRandom(),
      ),
    );

    for (const { content, author } of batch) {
      console.log(`${paint(34, content)} \n - ${paint(32, author)} \n`);
    }
  }
} catch (error) {
  console.error(
    `Could not get a quote from ${resolveBaseUrl(values["api-url"])}.`,
  );
  console.error(
    `Pass --api-url or set ${API_URL_ENV} to point at a running Quotable server.`,
  );
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
