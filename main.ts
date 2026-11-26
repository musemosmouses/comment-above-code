import { mkdirSync, writeFileSync } from "node:fs";

// The comment above the fragile code: a warning to the next maintainer
// that swapping two lines double-emails every customer a refund —
// confessed by the developer who already did it once. One line, 97 chars.
const comment =
  "// If you swap these two lines, the refund job emails every customer twice. I know because I did.";

// The gate allows 1 to 200 characters, so refuse to write anything longer
// rather than silently shipping a line the judge would mark invalid.
if (comment.length > 200) {
  throw new Error(`entry is ${comment.length} characters, over the 200 cap`);
}

// Writing is a single deterministic step: no clock, no randomness,
// no network, nothing read before the write, no trailing newline.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, comment, "utf8");
