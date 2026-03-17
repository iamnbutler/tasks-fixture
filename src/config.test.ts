import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { writeFileSync, unlinkSync, existsSync } from "node:fs";
import { join } from "node:path";
import { loadConfig } from "./config.js";

const CONFIG_PATH = join(process.cwd(), ".tasks-fixture.json");

function cleanup() {
  if (existsSync(CONFIG_PATH)) {
    unlinkSync(CONFIG_PATH);
  }
}

describe("loadConfig", () => {
  beforeEach(cleanup);
  afterEach(cleanup);

  it("returns defaults when config file does not exist", () => {
    const config = loadConfig();
    assert.equal(config.defaultGreeting, "World");
    assert.equal(config.timerSound, false);
  });

  it("loads defaultGreeting from config", () => {
    writeFileSync(CONFIG_PATH, JSON.stringify({ defaultGreeting: "Friend" }));
    const config = loadConfig();
    assert.equal(config.defaultGreeting, "Friend");
    assert.equal(config.timerSound, false);
  });

  it("loads timerSound from config", () => {
    writeFileSync(CONFIG_PATH, JSON.stringify({ timerSound: true }));
    const config = loadConfig();
    assert.equal(config.defaultGreeting, "World");
    assert.equal(config.timerSound, true);
  });

  it("loads all config values", () => {
    writeFileSync(
      CONFIG_PATH,
      JSON.stringify({ defaultGreeting: "Developer", timerSound: true })
    );
    const config = loadConfig();
    assert.equal(config.defaultGreeting, "Developer");
    assert.equal(config.timerSound, true);
  });

  it("uses defaults for invalid types", () => {
    writeFileSync(
      CONFIG_PATH,
      JSON.stringify({ defaultGreeting: 123, timerSound: "yes" })
    );
    const config = loadConfig();
    assert.equal(config.defaultGreeting, "World");
    assert.equal(config.timerSound, false);
  });

  it("returns defaults for invalid JSON", () => {
    writeFileSync(CONFIG_PATH, "not valid json {{{");
    const config = loadConfig();
    assert.equal(config.defaultGreeting, "World");
    assert.equal(config.timerSound, false);
  });
});
