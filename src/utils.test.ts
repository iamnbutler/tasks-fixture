import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { formatDuration, parseArgs } from "./utils.js";

describe("formatDuration", () => {
  it("formats seconds only", () => {
    assert.equal(formatDuration(45), "45s");
  });

  it("formats exact minutes", () => {
    assert.equal(formatDuration(120), "2m");
  });

  it("formats minutes and seconds", () => {
    assert.equal(formatDuration(90), "1m 30s");
  });
});

describe("parseArgs", () => {
  it("parses key-value pairs", () => {
    const result = parseArgs(["--name", "Alice", "--count", "3"]);
    assert.deepEqual(result, { name: "Alice", count: "3" });
  });

  it("returns empty for no args", () => {
    assert.deepEqual(parseArgs([]), {});
  });

  it("handles boolean flags", () => {
    const result = parseArgs(["--verbose", "--name", "Bob"]);
    assert.deepEqual(result, { verbose: true, name: "Bob" });
  });

  it("handles trailing boolean flag", () => {
    const result = parseArgs(["--name", "Alice", "--debug"]);
    assert.deepEqual(result, { name: "Alice", debug: true });
  });
});
