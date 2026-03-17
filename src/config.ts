import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const CONFIG_FILENAME = ".tasks-fixture.json";

export interface Config {
  defaultGreeting?: string;
  timerSound?: boolean;
}

const DEFAULT_CONFIG: Config = {
  defaultGreeting: "World",
  timerSound: false,
};

/**
 * Load config from .tasks-fixture.json in the current directory.
 * Returns default values for missing keys or if config file doesn't exist.
 */
export function loadConfig(): Config {
  const configPath = join(process.cwd(), CONFIG_FILENAME);

  if (!existsSync(configPath)) {
    return { ...DEFAULT_CONFIG };
  }

  try {
    const raw = readFileSync(configPath, "utf-8");
    const parsed = JSON.parse(raw);

    return {
      defaultGreeting:
        typeof parsed.defaultGreeting === "string"
          ? parsed.defaultGreeting
          : DEFAULT_CONFIG.defaultGreeting,
      timerSound:
        typeof parsed.timerSound === "boolean"
          ? parsed.timerSound
          : DEFAULT_CONFIG.timerSound,
    };
  } catch {
    // Invalid JSON or read error - use defaults
    return { ...DEFAULT_CONFIG };
  }
}
