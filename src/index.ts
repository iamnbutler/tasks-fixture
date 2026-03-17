#!/usr/bin/env tsx

import { formatDuration, parseArgs, reverseString } from "./utils.js";

const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  console.log(`Usage: tasks-fixture [options]

Options:
  --help, -h      Show this help message
  --version, -v   Show version
  --greet NAME    Greet someone
  --timer SEC     Start a countdown timer
  --reverse TEXT  Reverse a string`);
  process.exit(0);
}

if (args.includes("--version") || args.includes("-v")) {
  console.log("tasks-fixture v0.1.0");
  process.exit(0);
}

const parsed = parseArgs(args);

if (parsed.greet) {
  console.log(`Hello, ${parsed.greet}!`);
} else if (parsed.timer) {
  const seconds = parseInt(parsed.timer, 10);
  if (isNaN(seconds) || seconds <= 0) {
    console.error("Error: --timer requires a positive integer");
    process.exit(1);
  }
  console.log(`Timer: ${formatDuration(seconds)}`);
} else if (parsed.reverse) {
  console.log(reverseString(parsed.reverse));
} else {
  console.log("tasks-fixture: no command specified. Try --help");
}
