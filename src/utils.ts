/**
 * Format a duration in seconds to a human-readable string.
 * @param seconds - The duration in seconds to format
 * @returns A human-readable string like "30s", "5m", or "2m 15s"
 */
export function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (secs === 0) {
    return `${mins}m`;
  }
  return `${mins}m ${secs}s`;
}

/**
 * Parse CLI arguments into key-value pairs.
 * Supports --key value format.
 * @param args - Array of command-line arguments to parse
 * @returns An object mapping argument keys to their values
 */
export function parseArgs(args: string[]): Record<string, string> {
  const result: Record<string, string> = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]!;
    if (arg.startsWith("--") && i + 1 < args.length) {
      const key = arg.slice(2);
      const value = args[i + 1]!;
      if (!value.startsWith("--")) {
        result[key] = value;
        i++;
      }
    }
  }
  return result;
}
