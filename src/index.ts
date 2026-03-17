#!/usr/bin/env tsx

import { formatDuration, parseArgs } from "./utils.js";
import { loadConfig } from "./config.js";

const args = process.argv.slice(2);
const config = loadConfig();

if (args.includes("--help") || args.includes("-h")) {
  console.log(`Usage: tasks-fixture [options]

Options:
  --help, -h     Show this help message
  --version, -v  Show version
  --greet NAME   Greet someone
  --timer SEC    Start a countdown timer`);
  process.exit(0);
}

if (args.includes("--version") || args.includes("-v")) {
  console.log("tasks-fixture v0.1.0");
  process.exit(0);
}

const parsed = parseArgs(args);

if ("greet" in parsed) {
  const name = parsed.greet || config.defaultGreeting;
  console.log(`Hello, ${name}!`);
} else if (parsed.timer) {
  const seconds = parseInt(parsed.timer, 10);
  if (isNaN(seconds) || seconds <= 0) {
    console.error("Error: --timer requires a positive integer");
    process.exit(1);
  }
  const bell = config.timerSound ? "\u0007" : "";
  console.log(`Timer: ${formatDuration(seconds)}${bell}`);
} else {
  console.log("tasks-fixture: no command specified. Try --help");
}
