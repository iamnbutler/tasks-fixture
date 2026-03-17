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

  it("formats exact hours", () => {
    assert.equal(formatDuration(3600), "1h");
  });

  it("formats hours and minutes", () => {
    assert.equal(formatDuration(3660), "1h 1m");
  });

  it("formats hours and seconds", () => {
    assert.equal(formatDuration(3601), "1h 1s");
  });

  it("formats hours, minutes, and seconds", () => {
    assert.equal(formatDuration(3661), "1h 1m 1s");
  });

  it("formats multiple hours", () => {
    assert.equal(formatDuration(7322), "2h 2m 2s");
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

  it("ignores flags without values", () => {
    const result = parseArgs(["--verbose", "--name", "Bob"]);
    assert.deepEqual(result, { verbose: "--name" });
  });
});
